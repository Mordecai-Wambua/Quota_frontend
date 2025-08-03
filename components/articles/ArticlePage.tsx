"use client"

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { useArticleLoader } from "@/hooks/useArticleLoader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import SkeletonArticle from "@/components/skeletons/SkeletonArticle";
import { categories } from "@/app/data";
import { ArticleList } from "@/components/constants";

interface Props {
  initialArticles: ArticleList[];
  initialNextPage: string | null;
  initialCategory: string;
}

export default function ArticlePage({ initialArticles, initialNextPage, initialCategory }: Props) {
  const isFirstRender = useRef(true);
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [isBooting, setIsBooting] = useState(true);


  const {
    articles,
    setArticles,
    nextPage,
    isRefreshing,
    isFetchingMore,
    loadArticles,
    clearDelays,
    setNextPage
  } = useArticleLoader(selectedCategory);

  useEffect(() => {
    if (isFirstRender.current) {
      setArticles(initialArticles);
      setNextPage(initialNextPage);
      isFirstRender.current = false;
      setIsBooting(false);
      return;
    }

    setArticles([]);
    setNextPage(null);
    loadArticles( initialCategory === "All" ? "All" : initialCategory, true);
  }, [initialCategory]);

  useEffect(() => clearDelays, []);

  const loaderRef = useInfiniteScroll({
    hasMore: !!nextPage,
    loading: isFetchingMore,
    onLoadMore: () => loadArticles(nextPage!),
    delay: 500,
  });


  return (
    <div className="min-h-screen bg-background">
      <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Category Filter Header */}
        {selectedCategory !== "All" && (
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedCategory("All");
                router.push("/articles");
              }}
              className="text-sm bg-gray-400 px-3 py-1.5 rounded-full hover:text-white transition-colors border border-[#2a2a2a]"
            >
              ⤺ All writing
            </button>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold">
              {selectedCategory}
            </h1>
          </div>
        )}

        {/* Topics List */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => {
                  if (selectedCategory === category) return;
                  setSelectedCategory(category);
                  router.push(`/articles?category=${encodeURIComponent(category)}`);
                }}

                className={`text-sm border-none bg-transparent transition-colors flex items-center gap-1 ${
                  selectedCategory === category
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs">↳</span>
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Posts */}
        <section className="border-t border-[#2a2a2a] pt-10">
          <div className="transition-all duration-300 space-y-5">
            {/* Initial Boot Skeletons */}
            {isBooting &&
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonArticle key={`skeleton-boot-${i}`} />
              ))}

            {/* Articles */}
            {!isBooting &&
              articles.length > 0 &&
              articles.map((article) => (
                <Link
                  key={article.id}
                  href={`/articles/${article.slug}`}
                  className="block"
                >
                  <div className="flex items-start justify-between pb-5 border-b border-dashed border-[#2a2a2a] cursor-pointer">
                    <div>
                      <h3 className="text-sm font-semibold">{article.title}</h3>
                      <p className="text-sm text-gray-400 mt-1">
                        {article.description}
                      </p>
                    </div>
                    {article.created_at && (
                      <p className="text-sm text-gray-500 whitespace-nowrap pl-4">
                        {new Date(article.created_at).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </Link>
              ))}

            {/* Refresh or Infinite Scroll Skeletons */}
            {!isBooting && (isRefreshing || isFetchingMore) &&
              Array.from({ length: 5 }).map((_, i) => (
                <SkeletonArticle key={`skeleton-${isRefreshing ? "refresh" : "fetch"}-${i}`} />
              ))}



            {/* Empty state */}
            {!isBooting && !isRefreshing && articles.length === 0 && (
              <p className="text-gray-500">No articles in this topic yet.</p>
            )}

          </div>


          {/* Loader */}
          <div
            ref={loaderRef}
            className="h-10 mt-6 text-center text-sm text-gray-500"
          >
            {nextPage && !isFetchingMore && "Scroll to load more"}

          </div>


        </section>
      </main>
    </div>
  );
}
