// @/components/skeletons/PostDetailSkeleton.tsx
"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export function PostDetailSkeleton() {
  return (
    <SkeletonTheme
      baseColor="#2d2d2d"
      highlightColor="#3c3c3c"
    >
    <div className="min-h-screen bg-background text-foreground" aria-busy="true">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">

        {/* Back link skeleton */}
        <div className="mb-4">
          <Skeleton height={36} width={128} borderRadius={8} />
        </div>

        {/* Content skeleton */}
        <div className="prose prose-invert max-w-none tiptap space-y-6">
          {/* Title */}
          <div className="space-y-3">
            <Skeleton height={48} width="80%" />
            <Skeleton height={24} width="60%" />
          </div>

          {/* Paragraphs */}
          <div className="space-y-4 pt-6">
            <div className="space-y-2">
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="92%" />
              <Skeleton height={16} width="85%" />
            </div>

            <div className="space-y-2">
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="75%" />
              <Skeleton height={16} width="80%" />
              <Skeleton height={16} width="66%" />
            </div>

            <div className="pt-4">
              <Skeleton height={32} width="66%" />
            </div>

            <div className="space-y-2">
              <Skeleton height={16} width="100%" />
              <Skeleton height={16} width="83%" />
              <Skeleton height={16} width="75%" />
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-border opacity-40 my-10" />

        {/* Metadata */}
        <div className="rounded-md border border-border bg-muted/10 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          {/* Published */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <Skeleton height={16} width={64} />
            </div>
            <Skeleton height={16} width={80} />
          </div>

          {/* Topic */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span>🏷️</span>
              <Skeleton height={16} width={48} />
            </div>
            <Skeleton height={16} width={96} />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-1">
              <span>✍️</span>
              <Skeleton height={16} width={56} />
            </div>
            <Skeleton height={16} width={80} />
          </div>
        </div>
      </main>
    </div>
    </SkeletonTheme>
  );
}
