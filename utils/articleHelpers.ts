// utils/articles.ts (optional if extracting helpers externally)
import type { ArticleList } from "@/components/constants";

export function applyDelay(
  callback: () => void,
  delay: number,
  ref: React.MutableRefObject<NodeJS.Timeout | null>
) {
  ref.current = setTimeout(() => {
    callback();
    ref.current = null;
  }, delay);
}

export function mergeUniqueArticles(
  current: ArticleList[],
  incoming: ArticleList[]
): ArticleList[] {
  const ids = new Set(current.map((a) => a.id));
  return [...current, ...incoming.filter((a) => !ids.has(a.id))];
}
