# STACK.md — Smart Lost & Found Technical Stack (2025)

## Primary Framework
- **Frontend/Backend**: **Next.js 15 (App Router)**
    - **Rationale**: Single-repo codebase, server-side rendering for SEO (helping lost items show up in searches if enabled), and fast API route development.
    - **Confidence**: High

## State & Data
- **Database**: **PostgreSQL (via Prisma or Drizzle ORM)**
    - **Rationale**: Relational data is crucial for the matching engine (complex joins between lost/found reports and users). PostGIS extension allows for superior grid/zone spatial queries if we move beyond a simple ID-based grid.
    - **Confidence**: High
- **Search/Matching**: **Fuse.js** (Client-side/Server-side fuzzy search)
    - **Rationale**: Lightweight, no external dependency like Elastisearch needed for campus scale. Excellent for "iPhone" vs "iPhone 13" fuzzy matching.
    - **Confidence**: Moderate (FlexSearch is a faster alternative if dataset grows > 10,000 items).

## Spatiotemporal Logic
- **Location**: **Custom Grid System (logical zones)** stored as Enum or separate table.
    - **Rationale**: GPS is unreliable indoors. Building/Room/Zone IDs are more actionable for students.
- **Time**: **UTC ISO Strings** with `date-fns` for decay calculations.

## Verification & Security
- **Authentication**: **NextAuth.js (Auth.js)** with Campus SSO (if available) or email verification.
    - **Rationale**: Must ensure claimants are real campus members.
- **Handover**: **`qrcode` library** for generating unique handover PINs/QRs.

## Media Handling
- **Image Storage**: **Cloudinary or AWS S3** with local caching.
    - **Rationale**: High-res photos of found items are essential for verification.

## What NOT to use
- **Plain React (Client-only)**: Lack of SEO and heavier initial load.
- **NoSQL (MongoDB)**: Harder to maintain strict relationships for the matching scoring engine.
- **Elasticsearch**: Overkill for campus scale and adds significant infra cost.

---
*Last updated: 2026-04-14T19:24:11Z*
