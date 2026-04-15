import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Domain validation regex for NIT Silchar emails
const NITS_EMAIL_REGEX = /^[a-zA-Z0-9_.+-]+@([a-zA-Z0-9-]+\.)?nits\.ac\.in$/;

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Credentials({
      name: "Institute Email",
      credentials: {
        email: { label: "Institute Email", type: "email", placeholder: "name_ug_25@ece.nits.ac.in" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (!email || !password) return null;

        // Validate NIT Silchar email domain
        if (!NITS_EMAIL_REGEX.test(email)) {
          throw new Error("Only NIT Silchar institute emails are allowed");
        }

        // TODO: Replace with Prisma DB lookup once Supabase is connected
        // For now, accept any valid NITS email with password "demo123"
        if (password === "demo123") {
          return {
            id: email,
            email: email,
            name: email.split("@")[0].replace(/_/g, " "),
          };
        }

        return null;
      },
    }),
  ],
  callbacks: {
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
