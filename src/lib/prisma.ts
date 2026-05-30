// src/lib/prisma.ts
// This creates ONE Prisma client instance and reuses it
// Without this, each API call would create a new DB connection — bad!

import { PrismaClient } from "@prisma/client";

// Store the client on the global object in development to prevent
// "too many connections" errors when Next.js hot-reloads
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ["query"], // Logs all queries in development (remove in production)
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
