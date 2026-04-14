# PITFALLS.md — Smart Lost & Found Critical Risks

## 1. Opportunistic Claims (High Risk)
- **Pitfall**: Users "guessing" proof to steal items (especially cash/electronics).
- **Prevention Strategy**: NEVER show the "Hidden Detail" in the public listing. Require mandatory Admin mediation for items over a certain value ($50+ or electronics).
- **Phase Mapping**: Phase 3 (Verification)

## 2. Spatial Indexing Oversimplification
- **Pitfall**: GPS being used instead of Zones, leading to matching failures due to indoor drift.
- **Prevention Strategy**: Use a fixed dropdown for "Building/Zone" and only use GPS as a secondary reference "pin".
- **Phase Mapping**: Phase 2 (Grid System)

## 3. False Positive Fatigue
- **Pitfall**: Users get too many "Match!?" notifications for generic items like "black water bottle".
- **Prevention Strategy**: Implement a strict "Confidence Score" threshold (>70%) before notifying the user. Below that, just show them in a "Suggested for you" list inside the app.
- **Phase Mapping**: Phase 2 (Matching Engine)

## 4. Privacy Leaks
- **Pitfall**: Showing the owner's name/contact info too early.
- **Prevention Strategy**: Use an internal chat system or keep contact info hidden until the PIN/QR handover phase is reached.
- **Phase Mapping**: Phase 4 (Security & Polish)

---
*Last updated: 2026-04-14T19:24:11Z*
