import { FeaturedArticles } from "@/components/home/FeaturedPosts";
import { NewArticles } from "@/components/home/NewPosts";
import { getArticles } from '@/lib/api'
import type { ArticleList, PaginatedResponse } from "@/components/constants";

export default async function HomePage() {
  const articles: PaginatedResponse<ArticleList> = await getArticles();

  return (
        <div className="min-h-screen bg-background">
            <FeaturedArticles articles={articles.results} />
            <NewArticles articles={articles.results}/>
        </div>
    );
};