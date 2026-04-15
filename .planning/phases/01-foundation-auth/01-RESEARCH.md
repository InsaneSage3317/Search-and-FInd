# Phase 01: Foundation & Auth - Research

## Technical Approach: Next.js 15 + Auth.js + Supabase

### 1. Authentication Domain Restriction
To restrict signups to `*@*.nits.ac.in`, we will use the `signIn` callback in the Auth.js configuration.
- **Implementation**:
    ```javascript
    callbacks: {
      async signIn({ user, account, profile }) {
        if (user.email?.endsWith("@department.nits.ac.in") || user.email?.match(/^[a-z_0-9]+-[0-9]+@[a-z.]+\.nits\.ac\.in$/)) {
          return true;
        }
        return false; // Reject others
      },
    }
    ```
- **Provider**: `EmailProvider` (Magic links) is preferred for institutional emails to avoid password management overhead.

### 2. Database: Supabase + Prisma
Supabase provides a PostgreSQL database. For Next.js (Serverless/Edge), we should use the **Supavisor** connection string to handle connection pooling effectively.
- **Connection String**: Use the `Transaction` mode URL (port 6543) for the `DATABASE_URL` in Prisma.
- **Schema**:
    - `User`: id, name, email, role (USER/ADMIN).
    - `Item`: id, type (LOST/FOUND), title, description, identifies (hidden), zoneId, reporterId, status, createdAt.
    - `Zone`: id, name (e.g., "Library", "Hostel 1").

### 3. UI Foundation: shadcn/ui
- **Installation**: Use `npx shadcn@latest init` to set up the registry and Tailwind config.
- **Components**: Install `Button`, `Input`, `Card`, `Form`, `Select` initially.
- **Theme**: Dark mode by default for a premium feel.

### 4. Validation Architecture
- **Dimension 1 (Auth)**: Redirect `/dashboard` to `/login` if unauthenticated.
- **Dimension 2 (Domain)**: Attempt to login with `someone@gmail.com` -> expect failure.
- **Dimension 3 (Schema)**: `npx prisma db push` must succeed against the live Supabase instance.

### 5. Potential Pitfalls
- **Connection Timeouts**: Ensure Supavisor is configured; otherwise, serverless functions might exhaust DB connections.
- **Email Delivery**: Need an SMTP provider (e.g., Resend or Supabase default) for Magic Links to work.

---
*Phase: 01-foundation-auth*
*Research completed: 2026-04-15*
