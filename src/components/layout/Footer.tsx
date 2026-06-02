// src/components/layout/Footer.tsx

import Link from "next/link";
import {
  Mail,
  Twitter,
  Linkedin,
  Github,
} from "lucide-react";

import { prisma } from "@/lib/prisma";

const footerLinks = {
  Platform: [
    { label: "Browse Jobs", href: "/jobs" },
    { label: "Interview Prep", href: "/interview" },
    { label: "Career Blog", href: "/blog" },
    { label: "Fresher Guide", href: "/fresher" },
  ],

  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

export default async function Footer() {

  const interviewCategories =
    await prisma.category.findMany({
      where: {
        type: "interview",
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 4,
    });

  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="container-custom pt-16 pb-8">

        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 pb-12 border-b border-neutral-800">

          {/* Brand */}
          <div className="lg:col-span-2">

            <Link
              href="/"
              className="flex items-center gap-2 mb-4"
            >
              <div className="w-8 h-8 bg-brand-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  R
                </span>
              </div>

              <span className="font-display text-xl text-white">
                Ramiorix
              </span>
            </Link>

            <p className="text-sm leading-relaxed mb-6 max-w-xs">
              Your all-in-one career platform.
              Discover opportunities, prepare
              for interviews, and grow your
              career with expert guidance.
            </p>

            {/* Newsletter */}
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-3 py-2 bg-neutral-900 border border-neutral-700 rounded-lg text-sm text-white placeholder:text-neutral-600 focus:outline-none focus:border-brand-500"
              />

              <button className="px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-medium hover:bg-brand-600 transition-colors">
                Subscribe
              </button>
            </div>

            <p className="text-xs mt-2 text-neutral-600">
              No spam. Career tips every week.
            </p>
          </div>

          {/* Platform Links */}
          {Object.entries(footerLinks).map(
            ([section, links]) => (
              <div key={section}>
                <h4 className="text-sm font-semibold text-white mb-4">
                  {section}
                </h4>

                <ul className="space-y-2.5">
                  {links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm hover:text-white transition-colors"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )
          )}

          {/* Dynamic Interview Topics */}
          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Interview Topics
            </h4>

            <ul className="space-y-2.5">

              {interviewCategories.map((cat) => (
                <li key={cat.id}>
                  <Link
                    href={`/interview?category=${cat.slug}`}
                    className="text-sm hover:text-white transition-colors"
                  >
                    {cat.name}
                  </Link>
                </li>
              ))}

            </ul>
          </div>

        </div>

        {/* Bottom */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8">

          <p className="text-sm text-neutral-600">
            © {new Date().getFullYear()}
            {" "}
            Ramiorix.
            {" "}
            All rights reserved.
          </p>

          {/* Socials */}
          <div className="flex items-center gap-3">

            {[
              {
                icon: Twitter,
                href: "https://twitter.com",
                label: "Twitter",
              },

              {
                icon: Linkedin,
                href: "https://linkedin.com",
                label: "LinkedIn",
              },

              {
                icon: Github,
                href: "https://github.com",
                label: "GitHub",
              },

              {
                icon: Mail,
                href: "mailto:hello@ramiorix.com",
                label: "Email",
              },
            ].map(
              ({
                icon: Icon,
                href,
                label,
              }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-neutral-800 text-neutral-400 hover:bg-neutral-700 hover:text-white transition-all duration-200"
                >
                  <Icon size={14} />
                </a>
              )
            )}

          </div>
        </div>

      </div>
    </footer>
  );
}