import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

// Authorized users for the hackathon phase
const ALLOWED_EMAILS = [
  "abhilesh_ug_25@ece.nits.ac.in",
  "finder_ug_25@ece.nits.ac.in", // corrected per user intent for domain
  "finder_ug_25@dept.nits.ac.in",
  "owner_ug_25@dept.nits.ac.in",
  "test_ug_25@dept.nits.ac.in",
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Institute Email",
      credentials: {
        email: { label: "Institute Email", type: "email", placeholder: "abhilesh_ug_25@ece.nits.ac.in" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        // Security: Strictly enforce whitelist for production
        if (!ALLOWED_EMAILS.includes(email)) {
          return null;
        }

        // For hackathon demo: accept a fixed password
        if (password !== "demo123") {
          return null;
        }

        try {
          // Synchronize user with database on every login (Upsert)
          const user = await prisma.user.upsert({
            where: { email },
            update: { name: email.split("@")[0].replace(/_/g, " ") },
            create: {
              email,
              name: email.split("@")[0].replace(/_/g, " "),
              role: "USER",
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (error) {
          console.error("Auth database sync error:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // On initial sign-in, persist the database user ID
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
