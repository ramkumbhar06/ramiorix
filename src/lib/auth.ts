// src/lib/auth.ts
// NextAuth v5 configuration
// This sets up Google login for admins only

import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./prisma";

// The list of emails allowed to access the admin panel
// Add your email here!
const ADMIN_EMAILS = [
  "kumbhar6609@gmail.com",
  // Add more admin emails here
];

export const { handlers, auth, signIn, signOut } = NextAuth({
  // Use Prisma to store sessions and users in the database
  adapter: PrismaAdapter(prisma),

  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],

  callbacks: {
    // This runs on every sign-in attempt
    async signIn({ user }) {
      // Only allow emails in our admin list
      if (user.email && ADMIN_EMAILS.includes(user.email)) {
        return true; // Allow login
      }
      return false; // Block login
    },

    // Add extra info to the session token
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
      }
      return session;
    },
  },

  pages: {
    signIn: "/login", // Our custom login page
    error: "/login",  // Redirect errors to login page
  },
});
