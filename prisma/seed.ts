import { PrismaClient } from '@prisma/client'
import { PrismaPg } from "@prisma/adapter-pg"
import { Pool } from "pg"
import * as dotenv from 'dotenv'

dotenv.config()

const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
})
const adapter = new PrismaPg(pool)
const prisma = new PrismaClient({ adapter })

async function main() {
  const zones = [
    'Main Library',
    'Central Canteen',
    'Hostel 1',
    'Hostel 2',
    'Hostel 3',
    'Hostel 4',
    'Hostel 5',
    'Hostel 6',
    'Hostel 7',
    'Hostel 8',
    'Admin Block',
    'CSE Department',
    'ECE Department',
    'EE Department',
    'ME Department',
    'Civil Department',
    'Gym & Sports Complex',
    'Auditorium',
    'Main Gate'
  ]

  console.log('Seeding zones...')

  for (const zoneName of zones) {
    await prisma.zone.upsert({
      where: { name: zoneName },
      update: {},
      create: { name: zoneName },
    })
  }

  console.log('Seeding finished.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
