// src/types/index.ts
// TypeScript types — these describe the shape of our data
// Using these prevents bugs and gives you autocomplete in VSCode

export type Job = {
  id: string;
  title: string;
  company: string;
  logo?: string | null;
  location: string;
  type: string;           // "Full-time", "Remote", etc.
  experience: string;     // "Fresher", "1-3 years", etc.
  salary?: string | null;
  description: string;
  requirements: string;
  benefits?: string | null;
  applyUrl?: string | null;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string | null;
  category?: Category | null;
};

export type Blog = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string | null;
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  views: number;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string | null;
  category?: Category | null;
};

export type InterviewQuestion = {
  id: string;
  question: string;
  answer: string;
  difficulty: string;  // "Easy", "Medium", "Hard"
  tags: string[];
  isPublished: boolean;
  isFeatured: boolean;
  createdAt: Date;
  updatedAt: Date;
  categoryId?: string | null;
  category?: Category | null;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  type: string;    // "job", "blog", "interview"
  color?: string | null;
  createdAt: Date;
};

// For forms — we omit auto-generated fields
export type JobFormData = Omit<Job, "id" | "createdAt" | "updatedAt" | "category">;
export type BlogFormData = Omit<Blog, "id" | "createdAt" | "updatedAt" | "category" | "views">;
export type QuestionFormData = Omit<InterviewQuestion, "id" | "createdAt" | "updatedAt" | "category">;
export type CategoryFormData = Omit<Category, "id" | "createdAt">;
