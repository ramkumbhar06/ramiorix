"use client";

// src/components/ui/PageLoader.tsx
// Shows a thin animated progress bar at the top when navigating pages
// Fixes the "nothing happening when I click" problem

import { useEffect, useState, Suspense } from "react";
import { usePathname, useSearchParams } from "next/navigation";

function LoaderInner() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setLoading(true);
    setProgress(20);

    const t1 = setTimeout(() => setProgress(50), 150);
    const t2 = setTimeout(() => setProgress(75), 400);
    const t3 = setTimeout(() => setProgress(90), 700);
    const t4 = setTimeout(() => {
      setProgress(100);
      setTimeout(() => {
        setLoading(false);
        setProgress(0);
      }, 300);
    }, 900);

    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearTimeout(t3); clearTimeout(t4);
    };
  }, [pathname, searchParams]);

  if (!loading && progress === 0) return null;

  return (
    <>
      {/* Top progress bar */}
      <div className="fixed top-0 left-0 right-0 z-[9999] h-[3px]">
        <div
          className="h-full bg-gradient-to-r from-brand-500 to-brand-400 transition-all duration-300 ease-out rounded-r-full"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Subtle overlay so user knows something is happening */}
      {loading && progress < 90 && (
        <div className="fixed bottom-6 right-6 z-[9999] bg-neutral-900 dark:bg-neutral-800 text-white text-xs px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Loading...
        </div>
      )}
    </>
  );
}

export default function PageLoader() {
  return (
    <Suspense fallback={null}>
      <LoaderInner />
    </Suspense>
  );
}