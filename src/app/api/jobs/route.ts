export const dynamic = "force-dynamic";

// src/app/api/jobs/route.ts
// GET /api/jobs — get all jobs
// POST /api/jobs — create a new job (admin only)

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET — fetch all active jobs (public)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const q = searchParams.get("q");
    const category = searchParams.get("category");
    const experience = searchParams.get("experience");
    const type = searchParams.get("type");

    const jobs = await prisma.job.findMany({
      where: {
        isActive: true,
        ...(q && {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { company: { contains: q, mode: "insensitive" } },
          ],
        }),
        ...(category && { category: { slug: category } }),
        ...(experience && { experience }),
        ...(type && { type }),
      },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });

    return NextResponse.json(jobs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch jobs" }, { status: 500 });
  }
}

// POST — create a new job (requires admin login)
export async function POST(request: NextRequest) {
  // Check authentication
  const session = await auth();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();

    // Basic validation
    if (!body.title || !body.company || !body.location || !body.description || !body.requirements) {
      return NextResponse.json(
        { error: "Missing required fields: title, company, location, description, requirements" },
        { status: 400 }
      );
    }

    const job = await prisma.job.create({
      data: {
        title: body.title,
        company: body.company,
        logo: body.logo || null,
        location: body.location,
        type: body.type || "Full-time",
        experience: body.experience || "Fresher",
        salary: body.salary || null,
        description: body.description,
        requirements: body.requirements,
        benefits: body.benefits || null,
        applyUrl: body.applyUrl || null,
        isActive: body.isActive ?? true,
        isFeatured: body.isFeatured ?? false,
        categoryId: body.categoryId || null,
      },
    });

    return NextResponse.json(job, { status: 201 });
  } catch (error) {
    console.error("Error creating job:", error);
    return NextResponse.json({ error: "Failed to create job" }, { status: 500 });
  }
}
