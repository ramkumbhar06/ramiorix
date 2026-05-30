// src/app/layout.tsx
// Root layout — wraps every single page in the app
// Think of this as the "shell" of your website

import type { Metadata } from "next";
import "@/styles/globals.css";

// ── Metadata for SEO ──
export const metadata: Metadata = {
  title: {
    default: "Ramiorix — Jobs, Career Guidance & Interview Prep",
    template: "%s | Ramiorix", // Pages can customize: "Find Jobs | Ramiorix"
  },
  description:
    "Ramiorix is your all-in-one career platform — discover job opportunities, prepare for interviews, read career blogs, and get fresher guidance.",
  keywords: [
    "jobs",
    "career",
    "interview questions",
    "fresher jobs",
    "career guidance",
    "job portal India",
  ],
  authors: [{ name: "Ramiorix" }],
  creator: "Ramiorix",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Ramiorix",
    title: "Ramiorix — Jobs, Career Guidance & Interview Prep",
    description: "Your all-in-one career platform for jobs and growth.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramiorix",
    description: "Your all-in-one career platform.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Fonts are imported in globals.css */}
      </head>
      <body className="font-sans antialiased bg-white text-neutral-900">
        {children}
      </body>
    </html>
  );
}
