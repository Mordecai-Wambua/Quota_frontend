// @/components/skeletons/SkeletonDashboard.tsx
"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonDashboard() {
  return (
    <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
      <div className="min-h-screen bg-background text-white">
        <main className="max-w-4xl mx-auto px-6 py-16 space-y-12">

          {/* Welcome section */}
          <section className="bg-[#1f1f1f] rounded-xl p-6 shadow-lg space-y-6">
            <Skeleton height={32} width="60%" className="mx-auto" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-center">
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
              <Skeleton height={20} />
            </div>
          </section>

          {/* Filter + Create New */}
          <div className="flex justify-between items-center mb-6">
            <Skeleton height={32} width={160} borderRadius={999} />
            <Skeleton height={36} width={120} borderRadius={8} />
          </div>

          {/* Topics */}
          <section className="mb-10 space-y-3">
            <Skeleton height={20} width={100} />
            <div className="flex flex-wrap gap-4">
              {[...Array(5)].map((_, i) => (
                <Skeleton key={i} height={20} width={80 + i * 10} />
              ))}
            </div>
          </section>

          {/* Posts */}
          <section className="border-t border-[#2a2a2a] pt-10 space-y-5">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-start justify-between pb-5 border-b border-dashed border-[#2a2a2a]"
              >
                <div className="flex-1 space-y-2">
                  <Skeleton height={16} width="70%" />
                  <Skeleton height={12} width="90%" />
                </div>
                <Skeleton height={16} width={80} />
              </div>
            ))}
          </section>

        </main>
      </div>
    </SkeletonTheme>
  );
}
