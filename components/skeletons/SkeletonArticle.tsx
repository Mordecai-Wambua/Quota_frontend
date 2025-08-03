// @/components/skeletons/SkeletonArticle.tsx
"use client";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonArticle() {
  return (
    <SkeletonTheme baseColor="#2d2d2d" highlightColor="#3c3c3c">
      <div className="flex items-start justify-between pb-5 border-b border-dashed border-[#2a2a2a] cursor-pointer">
        <div className="flex-1 space-y-2">
          {/* Title placeholder */}
          <Skeleton height={16} width="66%" borderRadius={4} />
          {/* Description placeholder */}
          <Skeleton height={12} width="83%" borderRadius={4} />
        </div>

        {/* Date placeholder */}
        <div className="ml-4">
          <Skeleton height={16} width={80} borderRadius={4} />
        </div>
      </div>
    </SkeletonTheme>
  );
}
