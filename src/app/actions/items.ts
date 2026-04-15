"use server";

import { prisma } from "@/lib/db";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";

export async function createItem(formData: FormData) {
  const session = await auth();
  if (!session?.user?.id) {
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
          ? { finderId: session.user.id }
          : { ownerId: session.user.id }),
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
  if (!session?.user?.id) return [];

  const items = await prisma.item.findMany({
    where: {
      OR: [
        { finderId: session.user.id },
        { ownerId: session.user.id },
      ],
    },
    include: { zone: true },
    orderBy: { createdAt: "desc" },
  });

  return items;
}
