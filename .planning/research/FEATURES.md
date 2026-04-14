# FEATURES.md — Smart Lost & Found Feature Dimensions

## Table Stakes (Must Have)
- **Report lost/found items**: Photos, description, category, last seen location (zone), and timestamp.
- **Smart Search**: Fuzzy search across titles and descriptions.
- **Spatiotemporal Matching**: Automatic suggestions based on "where + when".
- **Claim Workflow**: Button to claim an item, triggering owner-to-finder or owner-to-admin communication.
- **Verification Tier 1**: "Secret Detail" question/answer for low-value items.
- **Real-time Status**: Tracking items from "Reported" -> "Matched" -> "Verified" -> "Resolved".

## Differentiators (Competitive Advantage)
- **Handover PIN/QR**: Crypographic proof that the item was physically handed over to the right person.
- **Grid-based Proximity**: Suggesting items found in the "Library" to someone who lost an item in the adjacent "Student Union".
- **Heatmap Analytics**: Showing "Hot Zones" where most items are lost to help campus admins place collection boxes.
- **Reputation System**: Users earn "Trust Points" for returning high-value items and lose them for failed/fraudulent claims.

## Anti-Features (Will NOT Build)
- **Monetary Rewards**: To prevent "bounty hunting" or users purposely taking items just to get a reward.
- **External Public Search**: Keeping the database internal to the campus for privacy and security.
- **Physical Courier Integration**: Keeping it simple with "Safe Zone" physical handovers.

## Feature Dependencies
1. **SSO Auth** -> Required for **Reputation System**.
2. **Grid Matrix** -> Required for **Proximity Matching**.
3. **Admin Dashboard** -> Required for **High-Value Item Mediation**.

---
*Last updated: 2026-04-14T19:24:11Z*
