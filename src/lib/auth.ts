// src/lib/auth.ts
// NextAuth v5 configuration

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

// Add YOUR Google email here to get admin access
const ADMIN_EMAILS = [
  "kumbhar6609@gmail.com",
  // Add more admin emails here
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    async signIn({ user }) {
      if (user.email && ADMIN_EMAILS.includes(user.email)) {
        return true;
      }
      return false;
    },
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login",  // ← FIXED: was /admin/login which caused redirects
    error: "/login",
  },
});