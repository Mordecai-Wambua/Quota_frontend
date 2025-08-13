import Link from "next/link";
import type { ArticleList } from "@/components/constants";

interface NewArticlesProps {
  articles: ArticleList[];
}

export const NewArticles = ({ articles }: NewArticlesProps) => {
  return (
    <section className="max-w-5xl mx-auto px-6 py-10 border-t border-border article-list">
      <div className="container">
      <div className="flex items-center justify-between mb-8">
        <h2 className="text-2xl font-serif mb-4">New posts</h2>
        <Link href="/articles" className="text-sm text-muted-foreground hover:text-accent transition-colors flex items-center gap-1">
          All Articles
          <span className="text-base">→</span>
        </Link>
      </div>

      <div className="max-w-4xl mx-auto space-y-4">
        {articles.map((article, index) => (
          <Link
            href={`/articles/${article.slug}`}
            key={article.slug}
            className={`flex items-start justify-between py-5 ${
              index < articles.length - 1 ? 'border-b border-dashed article-divider' : ''
            }`}
          >
            <div>
              <h3 className="article-title text-base">
                {article.title}
              </h3>
              <p className="article-description text-sm mt-1">
                {article.description}
              </p>
            </div>
            <p className="article-meta whitespace-nowrap pl-4">
              {new Date(article.created_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
      </div>
      </div>
    </section>
  );
};