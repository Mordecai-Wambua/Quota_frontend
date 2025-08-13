"use client";

import { useEffect, useState } from "react";
import { FeaturedArticles } from "@/components/home/FeaturedPosts";
import { NewArticles } from "@/components/home/NewPosts";
import { getArticles } from "@/lib/api";
import type { ArticleList, PaginatedResponse } from "@/components/constants";
import {WelcomeSection} from "@/components/home/WelcomeSection";

export default function HomePage() {
  const [articles, setArticles] = useState<PaginatedResponse<ArticleList> | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const data = await getArticles();
        if (!data?.results) {
          setError("No articles found.");
          return;
        }
        setArticles(data);
      } catch (err: any) {
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white px-4">
        <p className={`text-lg text-center ${error ? "text-red-500" : "text-gray-300"}`}>
          {error ? error : "Loading..."}
        </p>
      </div>
    );
  }

  if (!articles) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-white px-4">
        <p className="text-red-500 text-center">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <WelcomeSection/>
      <FeaturedArticles articles={articles.results} />
      <NewArticles articles={articles.results} />
    </div>
  );
}
