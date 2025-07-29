import Link from "next/link";

import type { ArticleList } from "@/components/constants";

interface FeaturedArticlesProps {
  articles: ArticleList[];
}

export const FeaturedArticles = ({ articles }: FeaturedArticlesProps) => {
  const featuredPosts = articles.filter(articles => articles.featured).slice(0, 3);
    return (

        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-border mt-16">
            <h2 className="text-2xl font-serif mb-8">Featured posts</h2>
            <div className="rounded-xl overflow-hidden space-y-1">
                {featuredPosts.map((article, index) => {
                    const isFirst = index === 0;
                    const isLast = index === articles.length - 1;

                    return (
                      <Link
                        href={`/articles/${article.slug}`}
                        key={article.slug}
                        className={`group flex items-center justify-between px-6 py-5 bg-[#1a1a1a] transition-colors duration-200 hover:bg-[#222] ${
                          isFirst ? 'rounded-t-xl' : ''
                        } ${isLast ? 'rounded-b-xl' : ''}`}
                      >
                            <div>
                                <h3 className="text-base font-semibold">{article.title}</h3>
                                <p className="text-sm text-gray-400 mt-1">{article.description}</p>
                            </div>

                            <div className="w-6 h-6 rounded-full border border-gray-600 flex items-center justify-center group-hover:bg-[#1f1f1f] transition-all">
                                <span className="text-white text-sm">→</span>
                            </div>
                      </Link>
                    );
                })}
            </div>
        </section>
    );
};
