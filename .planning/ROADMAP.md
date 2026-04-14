# Roadmap: Smart Lost & Found Management System

## Overview

This project builds an intelligent, multi-layered lost and found system for campus use. We will progress from building the core reporting foundation to implementing a complex spatiotemporal matching engine and a secure, tiered verification workflow, ending with administrative tools and security polish.

## Phases

- [ ] **Phase 1: Foundation & Auth** - Core project setup, Auth, and basic multi-form reporting.
- [ ] **Phase 2: Reporting & Grid** - Implementation of the Zone/Grid system and Lost/Found report storage.
- [ ] **Phase 3: Matching Engine** - Building the spatiotemporal similarity logic (Text + Space + Time).
- [ ] **Phase 4: Verification Workflow** - Implementing tiered proof methods (Q&A and High-Value uploads).
- [ ] **Phase 5: Secure Handover** - PIN/QR generation and handover state machine.
- [ ] **Phase 6: Admin Hub & Mediation** - Dashboard for admins and claim resolution tools.
- [ ] **Phase 7: Security & Reputation** - Fraud detection, trust scores, and final UX polish.

## Phase Details

### Phase 1: Foundation & Auth
**Goal**: Deliver a working Next.js shell with authenticated reporting.
**Depends on**: Nothing
**Requirements**: AUTH-01, AUTH-02, AUTH-03
**Success Criteria**:
  1. User can sign up/login with a campus email.
  2. The application shell is available on both desktop and mobile views.
  3. Database schema supports basic User and Report models.
**Plans**: 2 plans
- [ ] 01-01: Next.js setup with Auth.js and Prisma/PostgreSQL.
- [ ] 01-02: Base UI components and Layout.

### Phase 2: Reporting & Grid
**Goal**: Enable users to report items with precise location data.
**Depends on**: Phase 1
**Requirements**: REPT-01, REPT-02, REPT-03, STAT-02
**Success Criteria**:
  1. Users can submit Lost and Found reports with photos.
  2. Location selection uses a standardized Grid/Zone dropdown.
  3. Items are stored correctly with timestamps and status: "Reported".
**Plans**: 2 plans
- [ ] 02-01: Campus Zone/Grid system implementation and DB seeding.
- [ ] 02-02: Lost/Found reporting forms with media uploads.

### Phase 3: Matching Engine
**Goal**: Automatically connect lost items with potential found items.
**Depends on**: Phase 2
**Requirements**: MTCH-01, MTCH-02, MTCH-03, MTCH-04, STAT-01
**Success Criteria**:
  1. Fuse.js fuzzy matching identifies text similarities in titles/descriptions.
  2. Matches are filtered by Zone proximity and Temporal validity (Found > Lost).
  3. Users receive a "Potential Match" notification when score > 70%.
**Plans**: 2 plans
- [ ] 03-01: Core Matching logic and scoring algorithm.
- [ ] 03-02: Background match processing and Notification triggers.

### Phase 4: Verification Workflow
**Goal**: Secure the claim process through multi-tier verification.
**Depends on**: Phase 3
**Requirements**: VRFY-01, VRFY-02, MTCH-05
**Success Criteria**:
  1. Level 1 items require a matching "Hidden Detail" answer.
  2. Level 2/High-Value items require proof-of-identity or extra photos.
  3. Claimants can track their verification status in real-time.
**Plans**: 2 plans
- [ ] 04-01: Tiered verification form logic and state management.
- [ ] 04-02: Identity proof upload handling for High-Value items.

### Phase 5: Secure Handover
**Goal**: Physically resolve the loss through PIN/QR verification.
**Depends on**: Phase 4
**Requirements**: VRFY-03, VRFY-04
**Success Criteria**:
  1. Approved claims generate a unique 6-digit PIN/QR code.
  2. Entering the PIN in the finder's app updates the status to "Resolved".
  3. Digital handover "receipt" is stored in the database.
**Plans**: 2 plans
- [ ] 05-01: PIN/QR generation and scanning logic.
- [ ] 05-02: Resolution workflow and success state UI.

### Phase 6: Admin Hub & Mediation
**Goal**: Provide tools for campus staff to manage the ecosystem.
**Depends on**: Phase 5
**Requirements**: ADMN-01, ADMN-02, ADMN-03
**Success Criteria**:
  1. Admin dashboard shows all High-Value claims for review.
  2. Admins can manage the "Safe Zone" central repository status.
  3. Audit trail shows history of all system-mediated returns.
**Plans**: 2 plans
- [ ] 06-01: Admin dashboard and claim mediation interface.
- [ ] 06-02: Audit logging and repository management.

### Phase 7: Security & Reputation
**Goal**: Polish the system and protect against fraud.
**Depends on**: Phase 6
**Requirements**: REPT-01, REPT-02, ANAL-01 (V2 target)
**Success Criteria**:
  1. Reputation scores are tracked based on return/claim history.
  2. Fraud detection flags suspicious claim patterns for admin review.
  3. The system feels premium and responsive on all devices.
**Plans**: 2 plans
- [ ] 07-01: Trust/Reputation logic implementation.
- [ ] 07-02: UX polish, final testing, and launch.

## Progress

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Auth | 0/2 | Not started | - |
| 2. Reporting & Grid | 0/2 | Not started | - |
| 3. Matching Engine | 0/2 | Not started | - |
| 4. Verification Workflow | 0/2 | Not started | - |
| 5. Secure Handover | 0/2 | Not started | - |
| 6. Admin Hub & Mediation | 0/2 | Not started | - |
| 7. Security & Reputation | 0/2 | Not started | - |

---
*Roadmap defined: 2026-04-14*
*Last updated: 2026-04-14 after initialization*
