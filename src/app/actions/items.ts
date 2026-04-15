"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

/**
 * Ensure user exists in DB (auto-create from session for Credentials provider)
 */
async function ensureUser() {
  const session = await auth();
  if (!session?.user?.email) return null;

  const user = await prisma.user.upsert({
    where: { email: session.user.email },
    update: {},
    create: {
      email: session.user.email,
      name: session.user.name || session.user.email.split("@")[0],
    },
  });

  return user;
}

export async function createItem(formData: FormData) {
  const user = await ensureUser();
  if (!user) {
    return { error: "You must be signed in to report an item." };
  }

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const identifyingDetail = formData.get("identifyingDetail") as string;
  const type = formData.get("type") as "LOST" | "FOUND";
  const category = formData.get("category") as string;
  const zoneId = formData.get("zoneId") as string;

  if (!title || !description || !type || !category || !zoneId) {
    return { error: "Please fill in all required fields." };
  }

  if (type !== "LOST" && type !== "FOUND") {
    return { error: "Invalid item type." };
  }

  try {
    const item = await prisma.item.create({
      data: {
        title,
        description,
        identifyingDetail: identifyingDetail || null,
        type,
        category,
        zoneId,
        ...(type === "FOUND"
          ? { finderId: user.id }
          : { ownerId: user.id }),
      },
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/search");
    return { success: true, itemId: item.id };
  } catch (e) {
    console.error("Error creating item:", e);
    return { error: "Failed to create item. Please try again." };
  }
}

export async function getItems(filters?: {
  type?: "LOST" | "FOUND";
  category?: string;
  zoneId?: string;
  search?: string;
}) {
  const where: Record<string, unknown> = {};

  if (filters?.type) where.type = filters.type;
  if (filters?.category) where.category = filters.category;
  if (filters?.zoneId) where.zoneId = filters.zoneId;
  if (filters?.search) {
    where.OR = [
      { title: { contains: filters.search, mode: "insensitive" } },
      { description: { contains: filters.search, mode: "insensitive" } },
    ];
  }

  const items = await prisma.item.findMany({
    where,
    include: {
      zone: true,
      finder: { select: { name: true, email: true } },
      owner: { select: { name: true, email: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return items;
}

export async function getItemById(id: string) {
  const item = await prisma.item.findUnique({
    where: { id },
    include: {
      zone: true,
      finder: { select: { id: true, name: true, email: true } },
      owner: { select: { id: true, name: true, email: true } },
    },
  });
  return item;
}

export async function getMyItems() {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return [];

  const items = await prisma.item.findMany({
    where: {
      OR: [
        { finderId: user.id },
        { ownerId: user.id },
      ],
    },
    include: { zone: true },
    orderBy: { createdAt: "desc" },
  });

  return items;
}

/**
 * Claim an item: if FOUND item → current user claims ownership.
 * If LOST item → current user reports they found it.
 * Updates status to MATCHED.
 */
export async function claimItem(itemId: string) {
  const user = await ensureUser();
  if (!user) {
    return { error: "You must be signed in to claim an item." };
  }

  if (!itemId) {
    return { error: "Item ID is required." };
  }

  try {
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item) {
      return { error: "Item not found." };
    }

    if (item.status === "RESOLVED" || item.status === "HANDOVER") {
      return { error: "This item has already been claimed or resolved." };
    }

    // Prevent self-claiming
    if (item.finderId === user.id || item.ownerId === user.id) {
      return { error: "You cannot claim your own item." };
    }

    // FOUND item → user claims as owner; LOST item → user reports they found it
    const updateData = item.type === "FOUND"
      ? { ownerId: user.id, status: "MATCHED" as const }
      : { finderId: user.id, status: "MATCHED" as const };

    await prisma.item.update({
      where: { id: itemId },
      data: updateData,
    });

    revalidatePath("/dashboard");
    revalidatePath("/dashboard/search");
    revalidatePath("/dashboard/history");
    revalidatePath(`/dashboard/item/${itemId}`);
    return { success: true };
  } catch (e) {
    console.error("Error claiming item:", e);
    return { error: "Failed to claim item. Please try again." };
  }
}

/**
 * Get dashboard statistics for the current user.
 */
export async function getDashboardStats() {
  const session = await auth();
  if (!session?.user?.email) {
    return { reported: 0, matches: 0, recovered: 0 };
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) {
    return { reported: 0, matches: 0, recovered: 0 };
  }

  const [reported, matches, recovered] = await Promise.all([
    prisma.item.count({
      where: {
        OR: [{ finderId: user.id }, { ownerId: user.id }],
      },
    }),
    prisma.item.count({
      where: {
        OR: [{ finderId: user.id }, { ownerId: user.id }],
        status: "MATCHED",
      },
    }),
    prisma.item.count({
      where: {
        OR: [{ finderId: user.id }, { ownerId: user.id }],
        status: "RESOLVED",
      },
    }),
  ]);

  return { reported, matches, recovered };
}

/**
 * Get recent activity for the current user (last 5 items).
 */
export async function getRecentActivity() {
  const session = await auth();
  if (!session?.user?.email) return [];

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) return [];

  const items = await prisma.item.findMany({
    where: {
      OR: [{ finderId: user.id }, { ownerId: user.id }],
    },
    include: { zone: true },
    orderBy: { updatedAt: "desc" },
    take: 5,
  });

  return items;
}
