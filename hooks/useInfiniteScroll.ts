import { useEffect, useRef } from "react";

type UseInfiniteScrollProps = {
  hasMore: boolean;
  loading: boolean;
  onLoadMore: () => void;
  root?: HTMLElement | null;
  delay?: number;
};

export function useInfiniteScroll({
                                    hasMore,
                                    loading,
                                    onLoadMore,
                                    root = null,
                                    delay = 300,
                                  }: UseInfiniteScrollProps) {
  const observerRef = useRef<IntersectionObserver | null>(null);
  const debounceRef = useRef<NodeJS.Timeout | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(
      entries => {
        const firstEntry = entries[0];
        if (
          firstEntry.isIntersecting &&
          hasMore &&
          !loading &&
          !debounceRef.current
        ) {
          debounceRef.current = setTimeout(() => {
            onLoadMore();
            debounceRef.current = null;
          }, delay);
        }
      },
      { root, threshold: 1 }
    );

    const loaderEl = loaderRef.current;
    if (loaderEl) observerRef.current.observe(loaderEl);

    return () => {
      if (loaderEl) observerRef.current?.unobserve(loaderEl);
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [hasMore, loading, onLoadMore, root, delay]);

  return loaderRef;
}
