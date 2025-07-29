import Link from "next/link";

import type { ArticleList } from "@/components/constants";

interface NewPostsProps {
  articles: ArticleList[];
}


export const NewArticles = ({ articles }: NewPostsProps) => {

    return (
        <section className="max-w-4xl mx-auto px-6 py-16 border-t border-[#2a2a2a] mt-16">
            <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-serif ">New posts</h2>
                <Link href="/articles" className="text-sm text-gray-400 hover:text-gray-300 transition-colors flex items-center gap-1">
                    All Articles
                  <span className="text-base">→</span>
                </Link>
            </div>

            <div>
                {articles.map((article, index) => (
                  <Link
                    href={`/articles/${article.slug}`}
                    key={article.slug}
                    className={`flex items-start justify-between py-5 ${
                    index < articles.length - 1 ? 'border-b border-dashed border-[#2a2a2a]' : ''
                    }`}
                    >
                        <div>
                            <h3 className="text-sm font-semibold ">
                                {article.title}
                            </h3>
                            <p className="text-sm text-gray-400 mt-1">
                                {article.description}
                            </p>
                        </div>
                        <p className="text-base text-gray-500 whitespace-nowrap pl-4">
                          {new Date(article.created_at).toLocaleDateString()}
                        </p>
                  </Link>
                ))}
            </div>
        </section>
    );
};
