// src/app/api/auth/[...nextauth]/route.ts
// This handles ALL NextAuth requests: /api/auth/signin, /api/auth/signout, etc.
// The [...nextauth] means "catch all routes under /api/auth/"

import { handlers } from "@/lib/auth";

// Export GET and POST handlers from NextAuth
export const { GET, POST } = handlers;
