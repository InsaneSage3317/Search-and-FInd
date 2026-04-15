-- FindIt NIT Silchar - Database Schema
-- Run this in Supabase SQL Editor: Dashboard > SQL Editor > New Query

-- Create enums
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');
CREATE TYPE "ItemType" AS ENUM ('LOST', 'FOUND');
CREATE TYPE "Status" AS ENUM ('REPORTED', 'MATCHED', 'VERIFYING', 'HANDOVER', 'RESOLVED');

-- User table (Auth.js compatible)
CREATE TABLE "User" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT,
    "email" TEXT,
    "emailVerified" TIMESTAMP(3),
    "image" TEXT,
    "role" "Role" NOT NULL DEFAULT 'USER',
    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- Account table (Auth.js)
CREATE TABLE "Account" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "userId" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    CONSTRAINT "Account_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX "Account_provider_providerAccountId_key" ON "Account"("provider", "providerAccountId");

-- Session table (Auth.js)
CREATE TABLE "Session" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "sessionToken" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL,
    CONSTRAINT "Session_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE
);
CREATE UNIQUE INDEX "Session_sessionToken_key" ON "Session"("sessionToken");

-- VerificationToken table (Auth.js)
CREATE TABLE "VerificationToken" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" TIMESTAMP(3) NOT NULL
);
CREATE UNIQUE INDEX "VerificationToken_token_key" ON "VerificationToken"("token");
CREATE UNIQUE INDEX "VerificationToken_identifier_token_key" ON "VerificationToken"("identifier", "token");

-- Zone table
CREATE TABLE "Zone" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "name" TEXT NOT NULL,
    CONSTRAINT "Zone_pkey" PRIMARY KEY ("id")
);
CREATE UNIQUE INDEX "Zone_name_key" ON "Zone"("name");

-- Item table
CREATE TABLE "Item" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "identifyingDetail" TEXT,
    "type" "ItemType" NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'REPORTED',
    "category" TEXT NOT NULL,
    "imageUrl" TEXT,
    "zoneId" TEXT NOT NULL,
    "finderId" TEXT,
    "ownerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "resolvedAt" TIMESTAMP(3),
    CONSTRAINT "Item_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Item_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id"),
    CONSTRAINT "Item_finderId_fkey" FOREIGN KEY ("finderId") REFERENCES "User"("id"),
    CONSTRAINT "Item_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id")
);

-- Report table
CREATE TABLE "Report" (
    "id" TEXT NOT NULL DEFAULT gen_random_uuid()::text,
    "type" "ItemType" NOT NULL,
    "description" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "zoneId" TEXT NOT NULL,
    "itemId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Report_pkey" PRIMARY KEY ("id"),
    CONSTRAINT "Report_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id"),
    CONSTRAINT "Report_zoneId_fkey" FOREIGN KEY ("zoneId") REFERENCES "Zone"("id"),
    CONSTRAINT "Report_itemId_fkey" FOREIGN KEY ("itemId") REFERENCES "Item"("id")
);

-- Seed campus zones
INSERT INTO "Zone" ("id", "name") VALUES
    (gen_random_uuid()::text, 'Main Library'),
    (gen_random_uuid()::text, 'Central Canteen'),
    (gen_random_uuid()::text, 'Hostel 1'),
    (gen_random_uuid()::text, 'Hostel 2'),
    (gen_random_uuid()::text, 'Hostel 3'),
    (gen_random_uuid()::text, 'Hostel 4'),
    (gen_random_uuid()::text, 'Hostel 5'),
    (gen_random_uuid()::text, 'Hostel 6'),
    (gen_random_uuid()::text, 'Hostel 7'),
    (gen_random_uuid()::text, 'Hostel 8'),
    (gen_random_uuid()::text, 'Admin Block'),
    (gen_random_uuid()::text, 'CSE Department'),
    (gen_random_uuid()::text, 'ECE Department'),
    (gen_random_uuid()::text, 'EE Department'),
    (gen_random_uuid()::text, 'ME Department'),
    (gen_random_uuid()::text, 'Civil Department'),
    (gen_random_uuid()::text, 'Gym & Sports Complex'),
    (gen_random_uuid()::text, 'Auditorium'),
    (gen_random_uuid()::text, 'Main Gate');

-- Trigger to auto-update updatedAt column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW."updatedAt" = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_item_updated_at
    BEFORE UPDATE ON "Item"
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
