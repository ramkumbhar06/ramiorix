"use client";

// src/components/home/NewsletterSection.tsx

import { useState } from "react";
import { Mail, ArrowRight } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");
    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="py-20 bg-neutral-950">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center">

          {/* Icon */}
          <div className="w-14 h-14 bg-brand-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Mail size={24} className="text-brand-400" />
          </div>

          {/* Heading */}
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4">
            Stay Ahead in Your Career
          </h2>
          <p className="text-neutral-400 text-lg mb-8">
            Get weekly job alerts, interview tips, and career insights
            delivered straight to your inbox.
          </p>

          {/* Form */}
          {status === "success" ? (
            <div className="bg-green-500/20 border border-green-500/30 text-green-400 px-6 py-4 rounded-xl">
              🎉 You&apos;re subscribed! Welcome to the Ramiorix community.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 bg-neutral-900 border border-neutral-700 rounded-xl text-white placeholder:text-neutral-500 focus:outline-none focus:border-brand-500 text-sm transition-colors"
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {status === "loading" ? "Subscribing..." : "Subscribe Free"}
                {status !== "loading" && <ArrowRight size={16} />}
              </button>
            </form>
          )}

          {status === "error" && (
            <p className="text-red-400 text-sm mt-3">
              Something went wrong. Please try again.
            </p>
          )}

          <p className="text-neutral-600 text-xs mt-4">
            No spam, ever. Unsubscribe anytime.
          </p>

        </div>
      </div>
    </section>
  );
}
