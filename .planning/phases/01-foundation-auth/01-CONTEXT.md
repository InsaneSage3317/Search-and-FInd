# Phase 01: Foundation & Auth - Context

**Gathered:** 2026-04-15
**Status:** Ready for planning
**Source:** User discussion (implementation plan approval)

<domain>
## Phase Boundary
This phase establishes the technical foundation for the Smart Lost & Found system, including the Next.js shell, authentication, and the initial database schema on Supabase.

</domain>

<decisions>
## Implementation Decisions

### Technical Stack
- **Frontend/Backend**: Next.js 16 (App Router).
- **Styling**: Tailwind CSS + shadcn/ui.
- **Database**: PostgreSQL on **Supabase** via Prisma ORM.
- **Authentication**: **Auth.js (NextAuth)** with Email/Magic-Links and domain restriction.

### Authentication & Authorization
- [LOCKED] Users must use institute emails (`*@*.nits.ac.in`, e.g., `abhilesh_ug_25@ece.nits.ac.in`).
- [LOCKED] Any user with a valid institute email can report items.
- [LOCKED] Role-based access: Basic users (Finders/Owners) and Admin users (Mediation).

### User's Discretion
- The agent's choice of specific shadcn components for the layout.
- The agent's choice of specific Prisma models/fields (beyond required ones).
- The agent's choice of hosting/deployment setup (beyond Supabase DB).

</decisions>

<canonical_refs>
## Canonical References

**Downstream agents MUST read these before planning or implementing.**

### Project Planning
- [.planning/PROJECT.md](file:///d:/Projects/Hackathon/Search%20and%20Find/.planning/PROJECT.md) — Core vision and boundaries.
- [.planning/REQUIREMENTS.md](file:///d:/Projects/Hackathon/Search%20and%20Find/.planning/REQUIREMENTS.md) — Acceptance criteria for AUTH and REPT.
- [.planning/research/STACK.md](file:///d:/Projects/Hackathon/Search%20and%20Find/.planning/research/STACK.md) — Domain research for matching and search.

### External Documentation
- [Auth.js Documentation](https://authjs.dev/) — For email provider and domain restriction patterns.
- [Prisma x Supabase Guide](https://www.prisma.io/supabase) — For connecting Next.js to Supabase.
- [shadcn/ui Documentation](https://ui.shadcn.com/) — For component installation.

</canonical_refs>

<specifics>
## Specific Ideas
- The landing page should feel premium and trustworthy, immediately explaining the tiered verification concept.
- The auth flow should perform a regex check or domain check on the email before allowing signup.

</specifics>

<deferred>
## Deferred Ideas
- Location heatmap (Phase 7).
- Trust/Reputation scores (Phase 7).

</deferred>

---

*Phase: 01-foundation-auth*
*Context gathered: 2026-04-15 after plan approval*
