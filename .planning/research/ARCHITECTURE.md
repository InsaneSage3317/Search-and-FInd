# ARCHITECTURE.md — Smart Lost & Found System Architecture

## Component Boundaries
1. **Core Matching Engine (CME)**:
    - Independent logic module that takes a new `LostReport` or `FoundReport` and queries the DB for candidates.
    - Output: A list of `MatchCandidate` with confidence scores.
2. **Verification Handler (VH)**:
    - Manages the state machine for claims.
    - Routes high-value items to "Admin Mediation" and low-value to "P2P Questioning".
3. **Notification Hub**:
    - Triggers emails/web-push when a potential match is found.

## Data Flow
- **Reporting**: User -> Next.js API -> Postgres (Reports Table).
- **Matching Trigger**: Post-report -> CME -> Postgres (Matches Table).
- **Claiming**: User -> Match -> VH -> Admin/Finder Notification.
- **Resolution**: QR Scan -> VH -> Mark Resolved.

## Suggested Build Order
1. **Foundation**: Database schema, Auth, and basic multi-form reporting.
2. **Search & Grid**: Implementation of the Zone/Grid system and Fuse.js fuzzy search.
3. **Matching Engine**: The logic that combines text + location + time into a score.
4. **Verification Tiers**: Building the Q&A and PIN/QR handover logic.
5. **Admin & Analytics**: Dashboard and Heatmap visualization.

---
*Last updated: 2026-04-14T19:24:11Z*
