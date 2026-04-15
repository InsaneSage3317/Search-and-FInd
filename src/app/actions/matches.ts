"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { runFullMatching, findMatchesForItem, type MatchableItem, type MatchResult } from "@/lib/matching";

/**
 * Convert DB items to MatchableItem format
 */
function toMatchable(item: {
  id: string;
  title: string;
  description: string;
  category: string;
  type: "LOST" | "FOUND";
  zoneId: string;
  zone: { name: string };
  createdAt: Date;
}): MatchableItem {
  return {
    id: item.id,
    title: item.title,
    description: item.description,
    category: item.category,
    type: item.type,
    zoneId: item.zoneId,
    zoneName: item.zone.name,
    createdAt: new Date(item.createdAt),
  };
}

/**
 * Find matches for a specific item
 */
export async function getMatchesForItem(itemId: string) {
  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: { zone: true },
  });

  if (!item) return [];

  // Get all REPORTED items of the opposite type
  const candidates = await prisma.item.findMany({
    where: {
      type: item.type === "LOST" ? "FOUND" : "LOST",
      status: "REPORTED",
    },
    include: { zone: true },
  });

  const matchableItem = toMatchable(item);
  const matchableCandidates = candidates.map(toMatchable);

  return findMatchesForItem(matchableItem, matchableCandidates);
}

/**
 * Run matching engine across all active items and return results
 */
export async function runMatching() {
  const items = await prisma.item.findMany({
    where: { status: "REPORTED" },
    include: { zone: true },
  });

  const matchableItems = items.map(toMatchable);
  return runFullMatching(matchableItems);
}

/**
 * Get matches relevant to the current user (items they reported)
 */
export async function getMyMatches(): Promise<MatchResult[]> {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return [];

  // Get user's items
  const myItems = await prisma.item.findMany({
    where: {
      OR: [
        { finderId: user.id },
        { ownerId: user.id },
      ],
      status: "REPORTED",
    },
    include: { zone: true },
  });

  if (myItems.length === 0) return [];

  // Get all opposite-type candidates
  const allCandidates = await prisma.item.findMany({
    where: { status: "REPORTED" },
    include: { zone: true },
  });

  const allMatches: MatchResult[] = [];
  const seen = new Set<string>();

  for (const item of myItems) {
    const matchable = toMatchable(item);
    const candidates = allCandidates
      .filter((c) => c.type !== item.type)
      .map(toMatchable);
    
    const matches = findMatchesForItem(matchable, candidates);
    for (const match of matches) {
      const key = `${match.lostItemId}:${match.foundItemId}`;
      if (!seen.has(key)) {
        seen.add(key);
        allMatches.push(match);
      }
    }
  }

  return allMatches.sort((a, b) => b.score - a.score);
}
