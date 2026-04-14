# Requirements: Smart Lost & Found Management System

**Defined:** 2026-04-14
**Core Value:** Connecting the right owner with their lost item as quickly and securely as possible through intelligent matching and tiered verification.

## v1 Requirements

### Authentication & Authorization
- [ ] **AUTH-01**: User can sign up/login with campus email.
- [ ] **AUTH-02**: Admin users have access to the mediation dashboard.
- [ ] **AUTH-03**: User session is maintained securely.

### Item Reporting
- [ ] **REPT-01**: User can submit a "Lost" report with category, description, and "Identifying Feature" (private).
- [ ] **REPT-02**: User can submit a "Found" report with photos and description.
- [ ] **REPT-03**: Users must select a campus "Zone" (Library, Hostel, etc.) for every report.

### Matching Engine
- [ ] **MTCH-01**: System extracts keywords from reports to find initial matches.
- [ ] **MTCH-02**: System applies fuzzy-text search (Fuse.js) to catch typos/variations.
- [ ] **MTCH-03**: System filters matches by Zone (same zone or adjacent zones).
- [ ] **MTCH-04**: System filters matches by Time (Found timestamp must be > Lost timestamp).
- [ ] **MTCH-05**: Match Confidence Score determines if a user is notified (>70%).

### Verification Workflow
- [ ] **VRFY-01**: Claimant must answer the "Hidden Detail" question for Level 1 (Misc) items.
- [ ] **VRFY-02**: Claimant must upload/provide proof (photo or specific serial) for Level 2 (High-Value) items.
- [ ] **VRFY-03**: System generates a unique 6-digit handover PIN for approved matches.
- [ ] **VRFY-04**: Finder enters claimant's PIN to finalize the "Resolved" status.

### Admin Dashboard
- [ ] **ADMN-01**: Admin can view all High-Value claims and approve/reject them.
- [ ] **ADMN-02**: Admin can mark an item as "Stored at Safe Zone" (Central Office).
- [ ] **ADMN-03**: Admin logs of all handovers for audit trails.

### Status Tracking & Notifications
- [ ] **STAT-01**: User receives in-app notifications when a "High Confidence Match" is found.
- [ ] **STAT-02**: Real-time status updates: Reported -> Matched -> Verifying -> Handover -> Resolved.

## v2 Requirements (Planned)

### Advanced Analytics
- **ANAL-01**: Location-based heatmap visualization for administrators.
- **ANAL-02**: Predictive "Hotspot" alerts based on historical loss data.

### Reputation System
- **REPT-01**: "Trust Score" awarded to users for successful returns.
- **REPT-02**: Automatic flagging of accounts with excessive failed claims.

### Mobile-Native Features
- **MOB-01**: Push notifications for immediate match alerts.
- **MOB-02**: Offline-first reporting for areas with poor campus Wi-Fi.

## Out of Scope

| Feature | Reason |
|---------|--------|
| Monetary Rewards | To prevent perverse incentives and bounty hunting. |
| Global Search | Restricted to the campus ecosystem for privacy. |
| Shipping/Courier | System only manages coordination of physical handovers. |

## Traceability

| Requirement | Phase | Status |
|-------------|-------|--------|
| AUTH-01 | Phase 1 | Pending |
| AUTH-02 | Phase 1 | Pending |
| REPT-01 | Phase 1 | Pending |
| REPT-02 | Phase 1 | Pending |
| REPT-03 | Phase 1 | Pending |
| MTCH-01 | Phase 2 | Pending |
| MTCH-02 | Phase 2 | Pending |
| MTCH-03 | Phase 2 | Pending |
| MTCH-04 | Phase 2 | Pending |
| MTCH-05 | Phase 3 | Pending |
| VRFY-01 | Phase 3 | Pending |
| VRFY-02 | Phase 4 | Pending |
| VRFY-03 | Phase 4 | Pending |
| VRFY-04 | Phase 4 | Pending |
| ADMN-01 | Phase 5 | Pending |
| ADMN-02 | Phase 5 | Pending |
| STAT-01 | Phase 3 | Pending |
| STAT-02 | Phase 2 | Pending |

**Coverage:**
- v1 requirements: 17 total
- Mapped to phases: 17
- Unmapped: 0 ✓

---
*Requirements defined: 2026-04-14*
*Last updated: 2026-04-14 after initialization*
