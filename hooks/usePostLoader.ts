"use client";

import { useEffect, useState, useRef } from "react";
import { getArticle } from "@/lib/api";
import { applyDelay } from "@/utils/articleHelpers";

export function usePostLoader(slug: string | undefined) {
  const [post, setPost] = useState<any>(null);
  const [isBooting, setIsBooting] = useState(true);
  const delayRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!slug) return;

    // Wait a tick before starting fetch to allow first render with skeleton
    const start = setTimeout(async () => {
      const data = await getArticle(slug);
      applyDelay(() => {
        setPost(data);
        setIsBooting(false);
      }, 600, delayRef);
    }, 0); // change this to 50ms if needed

    return () => {
      clearTimeout(start);
      if (delayRef.current) clearTimeout(delayRef.current);
    };
  }, [slug]);

  return { post, isBooting };
}
