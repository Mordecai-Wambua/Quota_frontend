import { getArticles } from "@/lib/api";
import ArticlePage from "@/components/articles/ArticlePage";

interface Props {
    searchParams: Promise<{ category?: string }>;
}

export default async function Page({ searchParams }: Props) {
    const resolvedSearchParams = await searchParams;
    const category = resolvedSearchParams?.category ?? "All";
    const data = await getArticles(category);

    return (
      <ArticlePage
        initialCategory={category}
        initialArticles={data.results}
        initialNextPage={data.next}
      />
    );
}