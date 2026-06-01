"use client";

// src/components/ui/ThemeProvider.tsx
// Wraps the whole app so dark/light mode works everywhere
// "attribute=class" means it adds class="dark" to <html> tag

import { ThemeProvider as NextThemesProvider } from "next-themes";

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem={true}
      disableTransitionOnChange={false}
    >
      {children}
    </NextThemesProvider>
  );
}