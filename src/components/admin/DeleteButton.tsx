"use client";

// src/components/admin/DeleteButton.tsx
// Reusable delete button used in all admin tables
// Shows a confirmation dialog before deleting

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";

type Props = {
  id: string;
  type: "job" | "blog" | "question" | "category";
  label?: string;
};

// Maps type to the correct API endpoint
const API_MAP = {
  job: "/api/jobs",
  blog: "/api/blog",
  question: "/api/questions",
  category: "/api/categories",
};

export default function DeleteButton({ id, type, label }: Props) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    try {
      const res = await fetch(`${API_MAP[type]}/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        router.refresh(); // Reload the page data
      } else {
        alert("Failed to delete. Please try again.");
      }
    } catch {
      alert("Something went wrong.");
    } finally {
      setIsDeleting(false);
      setShowConfirm(false);
    }
  }

  return (
    <>
      {/* Delete Trigger Button */}
      <button
        onClick={() => setShowConfirm(true)}
        className="p-1.5 rounded-lg text-neutral-400 hover:text-red-500 hover:bg-red-50 transition-colors"
        title={label || "Delete"}
        disabled={isDeleting}
      >
        <Trash2 size={14} />
      </button>

      {/* Confirmation Dialog — simple overlay */}
      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-white rounded-2xl p-6 max-w-sm w-full mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
          >
            <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
              <Trash2 size={20} className="text-red-500" />
            </div>
            <h3 className="font-semibold text-neutral-800 text-center mb-2">
              Confirm Delete
            </h3>
            <p className="text-sm text-neutral-500 text-center mb-6">
              This action cannot be undone. Are you sure you want to delete this {type}?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 btn-ghost"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex-1 bg-red-500 text-white px-4 py-2.5 rounded-xl font-medium text-sm hover:bg-red-600 transition-colors disabled:opacity-50"
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
