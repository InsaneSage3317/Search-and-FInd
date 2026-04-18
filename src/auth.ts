import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from "@/lib/db";

// Domain check regex for NIT Silchar emails (e.g., student@ece.nits.ac.in)
const NITS_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.)?nits\.ac\.in$/;

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

        // Security: Enforce NIT Silchar domain check
        if (!NITS_EMAIL_REGEX.test(email)) {
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
