import NextAuth from "next-auth";
import Nodemailer from "next-auth/providers/nodemailer";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/db";

// Domain check regex for NIT Silchar emails (e.g., student@ece.nits.ac.in)
const NITS_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.)?nits\.ac\.in$/;

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  providers: [
    Nodemailer({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Security: Enforce NIT Silchar domain check for magic links
      if (user.email && !NITS_EMAIL_REGEX.test(user.email)) {
        return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      // On initial sign-in, persist the database user ID
      if (user?.id) {
        token.sub = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
});
