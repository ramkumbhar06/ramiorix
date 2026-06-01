// src/app/layout.tsx

import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { ThemeProvider } from "@/components/ui/ThemeProvider";
import PageLoader from "@/components/ui/PageLoader";
import "@/styles/globals.css";

// Plus Jakarta Sans — modern, clean, premium-looking
// Much better than the default system font for a career platform
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Ramiorix — Jobs, Career Guidance & Interview Prep",
    template: "%s | Ramiorix",
  },
  description: "Ramiorix is your all-in-one career platform — discover job opportunities, prepare for interviews, read career blogs, and get fresher guidance.",
  keywords: ["jobs", "career", "interview questions", "fresher jobs", "career guidance", "job portal India"],
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
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={plusJakarta.variable}>
      <head />
      <body className="font-sans antialiased transition-colors duration-300">
        <ThemeProvider>
          {/* Top progress bar — shows on every page navigation */}
          <PageLoader />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}