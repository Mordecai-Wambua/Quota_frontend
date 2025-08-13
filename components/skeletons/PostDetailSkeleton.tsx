"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

export function PostDetailSkeleton() {
  return (
    <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
      <motion.div
        layoutId="post-wrapper"
        className="max-w-4xl mx-auto px-6 space-y-12 py-6"
      >
        {/* Back link skeleton */}
        <motion.div layoutId="back-link">
          <Skeleton height={36} width={128} borderRadius={8} />
        </motion.div>

        {/* Content skeleton */}
        <motion.div layoutId="post-body" className="prose prose-invert max-w-none tiptap space-y-6">
          {/* Title + description */}
          <div className="space-y-4">
            <Skeleton height={40} width="70%" />
            <Skeleton height={24} width="60%" />
          </div>

          {/* Paragraph blocks */}
          <div className="space-y-4 pt-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="space-y-2">
                <Skeleton height={20} width="100%" />
                <Skeleton height={20} width="95%" />
                <Skeleton height={20} width="85%" />
              </div>
            ))}
          </div>
        </motion.div>

        {/* Divider */}
        <motion.hr
          layoutId="divider"
          className="border-border opacity-40 my-10"
          style={{ borderColor: "#3c3c3c" }}
        />

        {/* Metadata skeleton */}
        <motion.div
          layoutId="post-meta"
          className="rounded-md border border-border bg-muted/10 p-2 sm:p-4 grid gap-4 sm:gap-6 text-sm [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] justify-items-center"
        >
          {/* Published */}
          <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-1">
              <span>📅</span>
              <Skeleton height={14} width={70} />
            </div>
            <Skeleton height={16} width={90} />
          </div>

          {/* Topic */}
          <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-1">
              <span>🏷️</span>
              <Skeleton height={14} width={60} />
            </div>
            <Skeleton height={16} width={80} />
          </div>

          {/* Author */}
          <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
            <div className="flex items-center gap-1">
              <span>✍️</span>
              <Skeleton height={14} width={60} />
            </div>
            <Skeleton height={16} width={80} />
          </div>
        </motion.div>
      </motion.div>
    </SkeletonTheme>
  );
}
