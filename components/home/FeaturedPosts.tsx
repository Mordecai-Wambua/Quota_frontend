import Link from "next/link";
import type { ArticleList } from "@/components/constants";

interface FeaturedArticlesProps {
  articles: ArticleList[];
}

export const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  const featuredPosts = articles.filter(article => article.featured).slice(0, 3);

  if (featuredPosts.length === 0) return null;

  return (
    <section className="max-w-5xl mx-auto py-10 border-t border-border">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-serif mb-4">Featured Posts</h2>
          <div className="w-16 h-px bg-accent mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-4">
          {featuredPosts.map((article) => (
            <Link
              href={`/articles/${article.slug}`}
              key={article.slug}
              className="group flex items-center justify-between px-6 py-5 bg-card rounded-lg border border-border hover:border-accent/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground">
                    {article.category}
                  </span>
                  <span className="text-xs text-muted-foreground">
                    {new Date(article.created_at).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <h3 className="text-lg font-medium group-hover:text-accent transition-colors">
                  {article.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-1 line-clamp-1">
                  {article.description}
                </p>
              </div>
              <div className="w-8 h-8 rounded-full border border-border flex items-center justify-center group-hover:bg-accent/10 transition-colors ml-4">
                <span className="text-muted-foreground group-hover:text-accent transition-colors">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};