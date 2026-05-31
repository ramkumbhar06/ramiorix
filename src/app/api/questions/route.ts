export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// src/app/api/questions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  try {
    const questions = await prisma.interviewQuestion.findMany({
      where: { isPublished: true },
      include: { category: true },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    });
    return NextResponse.json(questions);
  } catch {
    return NextResponse.json({ error: "Failed to fetch questions" }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await request.json();
    if (!body.question || !body.answer) {
      return NextResponse.json({ error: "Question and answer are required" }, { status: 400 });
    }

    const question = await prisma.interviewQuestion.create({
      data: {
        question: body.question,
        answer: body.answer,
        difficulty: body.difficulty || "Medium",
        tags: body.tags || [],
        isPublished: body.isPublished ?? true,
        isFeatured: body.isFeatured ?? false,
        categoryId: body.categoryId || null,
      },
    });
    return NextResponse.json(question, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Failed to create question" }, { status: 500 });
  }
}
