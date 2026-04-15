"use server";

import { prisma } from "@/lib/db";

export async function getZones() {
  const zones = await prisma.zone.findMany({
    orderBy: { name: "asc" },
  });
  return zones;
}
