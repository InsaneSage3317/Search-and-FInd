import { PrismaClient } from '@prisma/client';
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import * as dotenv from 'dotenv';
dotenv.config();

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  const validZones = [
    'Main Library', 'Hostel 1', 'Hostel 2', 'Hostel 3', 'Hostel 4', 'Hostel 5',
    'Hostel 6', 'Hostel 7', 'Hostel 8', 'Admin Block', 'CSE Department',
    'ECE Department', 'EE Department', 'ME Department', 'Civil Department',
    'Gym & Sports Complex', 'SAC'
  ];

  console.log("Upserting valid zones...");
  for (const name of validZones) {
    await prisma.zone.upsert({
      where: { name },
      update: {},
      create: { name }
    });
  }

  console.log("Cleaning up invalid zones...");
  const existingZones = await prisma.zone.findMany();
  for (const zone of existingZones) {
    if (!validZones.includes(zone.name)) {
      try {
        await prisma.zone.delete({ where: { id: zone.id } });
        console.log(`Deleted old zone: ${zone.name}`);
      } catch (error) {
        console.log(`Could not delete zone ${zone.name}. It probably has items attached. Re-assigning its items to the Main Library...`);
        
        // Find main library
        const mainLibrary = await prisma.zone.findUnique({ where: { name: 'Main Library' } });
        if (mainLibrary) {
          await prisma.item.updateMany({
            where: { zoneId: zone.id },
            data: { zoneId: mainLibrary.id }
          });
          // Now safe to delete
          await prisma.zone.delete({ where: { id: zone.id } });
          console.log(`Successfully migrated items and deleted old zone: ${zone.name}`);
        }
      }
    }
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
