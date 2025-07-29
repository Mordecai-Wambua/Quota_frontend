"use client";

import { useCallback, useRef, useState } from "react";
import { getArticles } from "@/lib/api";
import type { ArticleList } from "@/components/constants";
import { applyDelay, mergeUniqueArticles } from "@/utils/articleHelpers";

export function useArticleLoader(initialCategory: string) {
  const [articles, setArticles] = useState<ArticleList[]>([]);
  const [nextPage, setNextPage] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isFetchingMore, setIsFetchingMore] = useState(false);

  const refreshDelayRef = useRef<NodeJS.Timeout | null>(null);
  const fetchMoreDelayRef = useRef<NodeJS.Timeout | null>(null);


  const loadArticles = useCallback(
    async (categoryOverride?: string, isInitial = false) => {
      if (isInitial) {
        setIsRefreshing(true);
      } else {
        setIsFetchingMore(true);
      }

      try {
        const data = await getArticles(
          categoryOverride ?? (initialCategory === "All" ? "All" : initialCategory),
          !isInitial
        );

        if (isInitial) {
          applyDelay(() => {
            setArticles(data.results);
            setNextPage(data.next);
            setIsRefreshing(false);
          }, 600, refreshDelayRef);
        } else {
          applyDelay(() => {
            setArticles((prev) => mergeUniqueArticles(prev, data.results));
            setNextPage(data.next);
            setIsFetchingMore(false);
          }, 600, fetchMoreDelayRef);
        }

      } catch (error) {
        console.error("Error loading articles:", error);
        setIsRefreshing(false);
        setIsFetchingMore(false);
      }
    },
    [initialCategory]
  );


  const clearDelays = () => {
    if (refreshDelayRef.current) clearTimeout(refreshDelayRef.current);
    if (fetchMoreDelayRef.current) clearTimeout(fetchMoreDelayRef.current);
  };

  return {
    articles,
    setArticles,
    nextPage,
    isRefreshing,
    isFetchingMore,
    loadArticles,
    clearDelays,
    setNextPage,
  };
}
