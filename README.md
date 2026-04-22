# FindIt @ NIT Silchar 🔍

**FindIt** is a premium, smart lost-and-found recovery platform designed exclusively for the **NIT Silchar** campus. It streamlines the process of returning lost items by using automated matching logic, high-fidelity campus visualization, and a secure handover lifecycle.

---

## 🚀 How It Works

FindIt transitions the campus lost-and-found from manual notice boards to a digital-first ecosystem:

1.  **Reporting**: Users authenticate via a secure, passwordless **Magic Link** sent exclusively to their authorized Institute Email (`@*.nits.ac.in`). Once verified, they can report either a **LOST** or **FOUND** item, tagging it with a specific campus zone (e.g., Library, Gymkhana, Hostel 9).
2.  **Smart Matching**: The system instantly runs a fuzzy matching algorithm to compare descriptions. If a possible match is found, both parties are notified on their dashboard.
3.  **The Handover**: Users can securely claim items. The reporter of a "Found" item can then verify the claimant and mark the item as **Resolved** once the physical handover is complete.
4.  **Campus Insights**: Students can view a live **Campus Heatmap** to see hotspots where items are frequently lost or found, helping them be more cautious in specific areas.

---

## 🛠️ Technical Stack

Built with modern, high-performance technologies:

-   **Frontend**: [Next.js 15+](https://nextjs.org) (App Router), [React 19](https://react.dev).
-   **Styling**: [Tailwind CSS](https://tailwindcss.com) with [Shadcn/UI](https://ui.shadcn.com) for a premium, glassmorphic aesthetic.
-   **Backend**: [Next.js Server Actions](https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations) (Eliminates the need for a separate API layer).
-   **Database**: [PostgreSQL](https://www.postgresql.org) hosted on [Supabase](https://supabase.com).
-   **ORM**: [Prisma](https://www.prisma.io) with connection pooling and typed client.
-   **Authentication**: [Auth.js v5 (Beta)](https://authjs.dev) with custom institute email whitelisting.
-   **Languages**: 100% **TypeScript**, JSX, CSS.

---

## ✨ Unique Features

### 🧠 Automated Matching Engine
Unlike a simple search gallery, FindIt uses a search-scoring system that automatically detects potential overlaps between new reports and existing items, drastically reducing recovery time.

### 🗺️ Interactive Campus Heatmap
A custom-built SVG visualization of the NIT Silchar campus layout. It dynamically renders report density per zone using a color-graded thermal scale, providing real-time geographical insights.

### 🔐 Secure Handover Lifecycle
Implements a strict state machine (`REPORTED` -> `MATCHED` -> `RESOLVED`) that prevents accidental claims and ensures only the original finder or verified claimant can finalize a recovery.

### 🏛️ NITS Ecosystem Integration
Enforces an institute-only sign-in policy by strictly whitelisting verified `@*.nits.ac.in` email addresses, ensuring a safe and trusted community for campus belongings.

---

## 🛠️ Local Development

1.  **Clone the Repo**:
    ```bash
    git clone https://github.com/InsaneSage3317/Search-and-FInd.git
    ```
2.  **Install Dependencies**:
    ```bash
    npm install
    ```
3.  **Setup Environment**:
    Create a `.env` file with your `DATABASE_URL` and `AUTH_SECRET`.
4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

---
*Created with ❤️ for the NIT Silchar Campus Community.*
