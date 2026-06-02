// src/app/fresher/page.tsx

import { Metadata } from "next";
import Link from "next/link";

import { prisma } from "@/lib/prisma";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

import {
  GraduationCap,
  FileText,
  MessageSquare,
  Briefcase,
  ArrowRight,
  CheckCircle,
  Star,
  Target,
  Lightbulb,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Fresher Career Guide",
  description:
    "Complete guidance for fresh graduates to kickstart their career journey.",
};

const roadmapSteps = [
  {
    icon: GraduationCap,
    step: "01",
    title: "Identify Your Skills",
    desc:
      "Assess your academic skills, projects, internships, and interests. Know what you're good at.",
    color: "bg-blue-100 text-blue-600",

    tips: [
      "List technical skills from your coursework",
      "Note any projects or side work",
      "Identify soft skills",
    ],
  },

  {
    icon: FileText,
    step: "02",
    title: "Build Your Resume",
    desc:
      "Create a clean, one-page resume that highlights your education, skills, and projects.",

    color: "bg-purple-100 text-purple-600",

    tips: [
      "Use a clean, ATS-friendly format",
      "Add 2-3 strong projects",
      "Quantify achievements where possible",
    ],
  },

  {
    icon: Target,
    step: "03",
    title: "Target the Right Roles",
    desc:
      "Focus on entry-level roles that match your skills. Don't apply to everything.",

    color: "bg-orange-100 text-orange-600",

    tips: [
      "Research companies you admire",
      "Look for 'Fresher' or '0-1 year' roles",
      "Apply to 5-10 quality roles daily",
    ],
  },

  {
    icon: MessageSquare,
    step: "04",
    title: "Prepare for Interviews",
    desc:
      "Practice common HR questions and domain-specific technical questions.",

    color: "bg-teal-100 text-teal-600",

    tips: [
      "Practice 'Tell me about yourself'",
      "Prepare STAR method answers",
      "Research the company beforehand",
    ],
  },

  {
    icon: Briefcase,
    step: "05",
    title: "Land Your First Job",
    desc:
      "Follow up after applications, stay positive, and negotiate your offer confidently.",

    color: "bg-green-100 text-green-600",

    tips: [
      "Send thank-you emails after interviews",
      "Don't accept the first offer blindly",
      "Keep learning during job hunt",
    ],
  },
];

export default async function FresherPage() {

  // Fetch real fresher jobs
  const fresherJobs =
    await prisma.job.findMany({
      where: {
        isActive: true,

        OR: [

          {
            experience: {
              contains: "fresher",
              mode: "insensitive",
            },
          },

          {
            title: {
              contains: "fresher",
              mode: "insensitive",
            },
          },

        ],
      },

      orderBy: {
        createdAt: "desc",
      },

      take: 6,
    });

  return (
    <div className="min-h-screen flex flex-col">

      <Navbar />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-to-br from-brand-950 to-neutral-900 py-20 text-center">

          <div className="container-custom">

            <div className="
              inline-flex
              items-center
              gap-2
              px-4
              py-1.5
              bg-brand-500/20
              text-brand-300
              rounded-full
              text-sm
              mb-6
              border
              border-brand-500/30
            ">

              <Star size={14} />

              Fresher Career Guidance

            </div>

            <h1 className="font-display text-5xl text-white mb-4">
              Your Career Starts Here
            </h1>

            <p className="
              text-neutral-400
              text-lg
              max-w-xl
              mx-auto
              mb-8
            ">

              A complete roadmap for fresh graduates to land their first job,
              prepare for interviews, and build a successful career.

            </p>

            <div className="flex gap-3 justify-center">

              <Link
                href="/jobs?experience=fresher"
                className="btn-primary"
              >
                Browse Fresher Jobs
              </Link>

              <Link
                href="/interview?category=hr-interview"
                className="
                  btn-ghost
                  border-white/20
                  text-white
                  hover:bg-white/10
                "
              >
                Practice Interviews
              </Link>

            </div>

          </div>

        </section>

        {/* Roadmap */}
        <section className="py-20 bg-neutral-50">

          <div className="container-custom">

            <div className="text-center mb-12">

              <h2 className="section-heading">
                Your 5-Step Career Roadmap
              </h2>

              <p className="section-sub">
                Follow this roadmap to go from graduate to employed
              </p>

            </div>

            <div className="
              space-y-5
              max-w-3xl
              mx-auto
            ">

              {roadmapSteps.map((step) => (

                <div
                  key={step.step}
                  className="card p-6"
                >

                  <div className="flex items-start gap-5">

                    <div className={`
                      w-12
                      h-12
                      rounded-2xl
                      flex
                      items-center
                      justify-center
                      shrink-0
                      ${step.color}
                    `}>

                      <step.icon size={22} />

                    </div>

                    <div className="flex-1">

                      <div className="
                        flex
                        items-center
                        gap-3
                        mb-1
                      ">

                        <span className="
                          text-xs
                          font-mono
                          text-neutral-400
                        ">
                          Step {step.step}
                        </span>

                        <h3 className="
                          font-semibold
                          text-neutral-800
                        ">
                          {step.title}
                        </h3>

                      </div>

                      <p className="
                        text-neutral-500
                        text-sm
                        mb-3
                      ">
                        {step.desc}
                      </p>

                      <ul className="space-y-1">

                        {step.tips.map((tip) => (

                          <li
                            key={tip}
                            className="
                              flex
                              items-center
                              gap-2
                              text-xs
                              text-neutral-600
                            "
                          >

                            <CheckCircle
                              size={12}
                              className="
                                text-green-500
                                shrink-0
                              "
                            />

                            {tip}

                          </li>

                        ))}

                      </ul>

                    </div>

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

        {/* Real Fresher Jobs */}
        <section className="py-20 bg-white">

          <div className="container-custom">

            <div className="text-center mb-12">

              <h2 className="section-heading">
                Top Roles for Freshers
              </h2>

              <p className="section-sub">
                Latest fresher opportunities from your platform
              </p>

            </div>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
              max-w-5xl
              mx-auto
            ">

              {fresherJobs.map((job) => (

                <Link
                  key={job.id}
                  href={`/jobs/${job.id}`}
                  className="card p-5 group"
                >

                  <h3 className="
                    font-semibold
                    text-neutral-800
                    mb-1
                    group-hover:text-brand-600
                    transition-colors
                  ">
                    {job.title}
                  </h3>

                  <p className="
                    text-brand-600
                    font-medium
                    text-sm
                    mb-2
                  ">
                    {job.salary || "Salary Not Disclosed"}
                  </p>

                  <p className="
                    text-xs
                    text-neutral-500
                    mb-3
                  ">
                    {job.company}
                  </p>

                  <span className="
                    text-xs
                    text-brand-500
                    flex
                    items-center
                    gap-1
                  ">

                    View Jobs

                    <ArrowRight size={11} />

                  </span>

                </Link>

              ))}

            </div>

          </div>

        </section>

        {/* Quick Tips */}
        <section className="py-20 bg-brand-50">

          <div className="
            container-custom
            text-center
            max-w-2xl
            mx-auto
          ">

            <Lightbulb
              size={36}
              className="
                text-brand-500
                mx-auto
                mb-4
              "
            />

            <h2 className="section-heading mb-4">
              Quick Tips for Freshers
            </h2>

            <div className="
              grid
              grid-cols-1
              sm:grid-cols-2
              gap-3
              text-left
              mt-8
            ">

              {[
                "Apply to at least 5 jobs every day",
                "Customize your resume for each role",
                "Learn one in-demand skill (SQL, Excel, Python)",
                "Build a LinkedIn profile and keep it updated",
                "Practice mock interviews with friends",
                "Don't fear rejection — it's part of the process",
                "Follow company pages for updates",
                "Network with seniors from your college",
              ].map((tip) => (

                <div
                  key={tip}
                  className="
                    flex
                    items-start
                    gap-2
                    bg-white
                    rounded-xl
                    p-3
                    border
                    border-brand-100
                  "
                >

                  <CheckCircle
                    size={14}
                    className="
                      text-brand-500
                      mt-0.5
                      shrink-0
                    "
                  />

                  <span className="
                    text-sm
                    text-neutral-700
                  ">
                    {tip}
                  </span>

                </div>

              ))}

            </div>

            <Link
              href="/jobs?experience=fresher"
              className="
                btn-primary
                mt-8
                inline-flex
                items-center
                gap-2
              "
            >

              Find Your First Job

              <ArrowRight size={16} />

            </Link>

          </div>

        </section>

      </main>

      <Footer />

    </div>
  );
}