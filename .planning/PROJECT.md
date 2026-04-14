# Smart Lost & Found Management System (Campus)

## What This Is

An intelligent lost and found platform for campus communities that helps users recover lost items efficiently. It uses spatiotemporal matching and fuzzy text similarity to connect finders with owners, while enforcing a multi-tiered verification workflow to ensure secure item recovery.

## Core Value

Connecting the right owner with their lost item as quickly and securely as possible through intelligent matching and tiered verification.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] **Item Reporting**: Comprehensive fields for lost/found reports (Category, Keywords, Brand/Color, Photo).
- [ ] **Spatiotemporal Matching Engine**:
    - [ ] Keyword extraction and Fuzzy matching (Levenstein similarity).
    - [ ] Grid-based location mapping (Library, Hostel, etc.) with proximity logic.
    - [ ] Time-window filtering (Found > Lost) and decay prioritization (48-hour window).
- [ ] **Tiered Verification Workflow**:
    - [ ] Level 1 (Misc): "Hidden Detail" Q&A for low-stakes items.
    - [ ] Level 2 (Personal): Photo proof and specific description for wallets/keys.
    - [ ] Level 3 (High-Value): Serial number verification + PIN/QR code for physical handover.
- [ ] **Admin Mediation Hub**: Dashboard for admins to verify high-value claims and mediate "Safe Zone" handovers.
- [ ] **Status Tracking**: Live updates on claim progress (Reported -> Matched -> Verifying -> Handover -> Resolved).
- [ ] **Location-based Heatmap**: Visual mapping of lost/found hotspots for administrative planning.
- [ ] **Trust/Reputation System**: Metric to discourage false claims and reward honest finders.

### Out of Scope

- **Global/General Public Use**: Restricted strictly to the campus ecosystem.
- **Physical Transport/Storage Logistics**: The system facilitates matching and handover coordination, not the physical delivery of items.
- **Financial Rewards System**: Monetary rewards for reporting are excluded to prevent perverse incentives.

## Context

- **Environment**: Campus setting (students, faculty, staff).
- **Need**: Current manual systems are unorganized, lead to low recovery rates, and are vulnerable to false claims.
- **Verification Priority**: There is a high risk of theft or "opportunistic claiming" for high-value items, hence the tiered approach.

## Constraints

- **Tech Stack**: Next.js/React (Modern Web Stack) - Standard for responsive performance and ease of deployment.
- **Deployment**: Must be accessible via both PC and mobile browsers (Responsive Web).
- **Security**: Must handle personal identification data securely (IDs, serial numbers).

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js/React Stack | Modern, robust, and supports both mobile/desktop browsers seamlessly. | — Pending |
| Grid-based Location | Simplifies matching over raw text input while allowing proximity logic. | — Pending |
| Tiered Verification | Balances user friction with security needs based on item value. | — Pending |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition** (via `/gsd-transition`):
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone** (via `/gsd-complete-milestone`):
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-04-14T19:10:41.630Z after initialization*
