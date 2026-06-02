// src/components/home/CategoriesSection.tsx

import Link from "next/link";

import {
  BarChart3,
  Users,
  Database,
  Building2,
  Globe,
  Zap,
  Landmark,
  Briefcase,
  Laptop2,
  GraduationCap,
  Calculator,
  ShieldCheck,
  Headphones,
} from "lucide-react";

type Category = {
  id: string;
  name: string;
  slug: string;
};

type Props = {
  categories: Category[];
};

// Colors mapping
const colorMap: Record<string, string> = {

  banking:
    "bg-blue-500/10 text-blue-400 border border-blue-500/20",

  "data-analyst":
    "bg-purple-500/10 text-purple-400 border border-purple-500/20",

  freshers:
    "bg-yellow-500/10 text-yellow-300 border border-yellow-500/20",

  internship:
    "bg-pink-500/10 text-pink-400 border border-pink-500/20",

  "us-mortgage":
    "bg-teal-500/10 text-teal-300 border border-teal-500/20",

  software:
    "bg-indigo-500/10 text-indigo-300 border border-indigo-500/20",

  sql:
    "bg-orange-500/10 text-orange-300 border border-orange-500/20",

  remote:
    "bg-green-500/10 text-green-300 border border-green-500/20",

  nonprofit:
    "bg-red-500/10 text-red-300 border border-red-500/20",
};

export default function CategoriesSection({
  categories,
}: Props) {

  return (
    <section className="py-20 bg-neutral-50 dark:bg-neutral-950">

      <div className="container-custom">

        {/* Section Header */}
        <div className="text-center mb-12">

          <h2 className="section-heading">
            Browse by Category
          </h2>

          <p className="section-sub">
            Explore opportunities across industries and specializations
          </p>

        </div>

        {/* Categories Grid */}
        <div className="
          grid
          grid-cols-2
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-5
          gap-5
          justify-center
        ">

          {categories.map((cat) => {

            const slug =
              cat.slug.toLowerCase();

            const name =
              cat.name.toLowerCase();

            // Default Icon
            let Icon = Zap;

            // Banking
            if (
              slug.includes("bank") ||
              name.includes("bank")
            ) {
              Icon = Landmark;
            }

            // Data / Analyst
            else if (
              slug.includes("data") ||
              name.includes("data") ||
              slug.includes("analyst")
            ) {
              Icon = BarChart3;
            }

            // Software / Tech
            else if (
              slug.includes("software") ||
              slug.includes("developer") ||
              slug.includes("technical") ||
              slug.includes("engineer")
            ) {
              Icon = Laptop2;
            }

            // SQL / Database
            else if (
              slug.includes("sql") ||
              slug.includes("database")
            ) {
              Icon = Database;
            }

            // HR / Recruitment
            else if (
              slug.includes("hr") ||
              slug.includes("recruit")
            ) {
              Icon = Users;
            }

            // Freshers / Graduates
            else if (
              slug.includes("fresher") ||
              slug.includes("graduate")
            ) {
              Icon = GraduationCap;
            }

            // Internship
            else if (
              slug.includes("intern")
            ) {
              Icon = Briefcase;
            }

            // Mortgage
            else if (
              slug.includes("mortgage")
            ) {
              Icon = Building2;
            }

            // Remote
            else if (
              slug.includes("remote")
            ) {
              Icon = Globe;
            }

            // Support
            else if (
              slug.includes("support")
            ) {
              Icon = Headphones;
            }

            // Security
            else if (
              slug.includes("security")
            ) {
              Icon = ShieldCheck;
            }

            // Finance / Accounts
            else if (
              slug.includes("finance") ||
              slug.includes("account")
            ) {
              Icon = Calculator;
            }

            // Fallback Color
            const color =
              colorMap[slug] ||
              "bg-brand-500/10 text-brand-300 border border-brand-500/20";

            return (

              <Link
                key={cat.id}
                href={`/jobs?category=${cat.slug}`}
                className="
                  card
                  p-5
                  min-h-[150px]
                  max-w-[280px]
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center
                  gap-4
                  group
                  no-underline
                  bg-white
                  dark:bg-neutral-900/80
                  border
                  border-neutral-200
                  dark:border-neutral-800
                  hover:border-brand-500/30
                  transition-all
                  duration-300
                "
              >

                {/* Icon */}
                <div
                  className={`
                    w-12
                    h-12
                    rounded-2xl
                    flex
                    items-center
                    justify-center
                    backdrop-blur-sm
                    shadow-sm
                    ${color}
                  `}
                >
                  <Icon size={20} />
                </div>

                {/* Content */}
                <div className="w-full">

                  <div className="
                    font-medium
                    text-neutral-800
                    dark:text-white
                    text-sm
                    group-hover:text-brand-400
                    transition-colors
                  ">
                    {cat.name}
                  </div>

                  <div className="
                    text-xs
                    text-neutral-400
                    mt-1
                  ">
                    Browse jobs
                  </div>

                </div>

              </Link>

            );
          })}

        </div>

      </div>

    </section>
  );
}