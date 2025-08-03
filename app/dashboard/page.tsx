"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

import { dashboard } from "@/lib/api";
import SkeletonDashboard from "@/components/skeletons/SkeletonDashboard";
import { categories } from "@/app/data";

interface Post {
  url: string;
  id: number;
  slug: string;
  title: string;
  category: string;
  description: string;
  featured: boolean;
  created_at: string;
}

interface DashboardData {
  welcome_message: string;
  last_login: string;
  email: string;
  first_name: string;
  last_name: string;
  role: string;
  posts_count: number;
  posts: Post[];
}

interface PaginatedResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: DashboardData;
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState("All");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [hasNext, setHasNext] = useState(false);
  const [hasPrevious, setHasPrevious] = useState(false);
  const [availableTopics, setAvailableTopics] = useState<string[]>([]);

  const fetchDashboard = async () => {
    try {
      setLoading(true);
      const res: PaginatedResponse = await dashboard(page, selectedTopic);
      setData(res.results);
      setHasNext(!!res.next);
      setHasPrevious(!!res.previous);

      const total = res.count || 0;
      setPageCount(total > 0 ? Math.ceil(total / 10) : 1);

      setAvailableTopics(categories);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setTimeout(() => setLoading(false), 300);
    }
  };

  useEffect(() => {
    (async () => {
      await fetchDashboard();
    })();
  }, [page, selectedTopic]);


  if (loading) return <SkeletonDashboard />;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  const hasPosts = (data?.posts_count ?? 0) > 0;


  return (
    <div className="min-h-screen bg-background text-white">
    <AnimatePresence mode="wait">
      {loading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <SkeletonDashboard />
        </motion.div>
      ) : error ? (
        <motion.p
          key="error"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="p-6 text-red-500"
        >
          Error: {error}
        </motion.p>
      ) : (
        <motion.div
          key="dashboard"
          layout
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
        <main className="max-w-4xl mx-auto px-6 py-16">
        {/* Main Section */}
        <section className="mb-12 bg-[#1f1f1f] rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl text-center font-bold mb-4 text-gray-700">
            {data?.welcome_message}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-center">
            <p><span className="font-medium">Email:</span> {data?.email}</p>
            <p><span className="font-medium">Role:</span> {data?.role}</p>
            <p><span className="font-medium">Last login:</span> {new Date(data!.last_login).toLocaleString()}</p>
            <p><span className="font-medium">Posts written:</span> {data?.posts_count}</p>
          </div>
        </section>

        {/* Topic Filter Header */}
        {selectedTopic !== "All" && (
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => {
                setSelectedTopic("All");
                setPage(1);
              }}
              className="text-sm bg-gray-400 px-3 py-1.5 rounded-full hover:text-white transition-colors border border-[#2a2a2a]"
            >
              ⤺ All writing
            </button>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold">{selectedTopic}</h1>
          </div>
        )}

        {/* Create Button */}
        <div className="flex justify-end mb-6">
          <Link
            href="/write"
            className="inline-block bg-gray-700 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium shadow"
          >
            + Create New
          </Link>
        </div>

        {/* Topics */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            {availableTopics.map((topic) => (
              <button
                key={topic}
                onClick={() => {
                  setSelectedTopic(topic);
                  setPage(1);
                }}
                className={`text-sm border-none bg-transparent transition-colors flex items-center gap-1 ${
                  selectedTopic === topic
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs">↳</span> {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Posts */}
        <section className="border-t border-[#2a2a2a] pt-10">
          <div className="transition-all duration-300 space-y-5">
            {hasPosts ? (
              data!.posts.map((post) => (
                <div
                  key={post.id}
                  className="flex items-start justify-between pb-5 border-b border-dashed border-[#2a2a2a]"
                >
                  <div>
                    <Link
                      href={`/articles/${post.slug}`}
                      className="text-lg font-semibold text-gray-500 hover:underline transition-colors"
                    >
                      {post.title}
                    </Link>
                    <p className="text-sm text-gray-400 mt-1 line-clamp-2">{post.description}</p>
                  </div>
                  <p className="text-sm text-gray-500 whitespace-nowrap pl-4">
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No posts in this topic yet.</p>
            )}
          </div>

          {/* Pagination Controls */}
          {hasPosts && (
            <div className="mt-10 flex justify-center items-center gap-4 text-sm">
              <button
                disabled={!hasPrevious}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                className={`px-3 py-1 rounded border border-[#2a2a2a] transition-colors bg-gray-700 ${
                  hasPrevious
                    ? "text-white hover:bg-gray-600"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Prev
              </button>

              <span className="text-gray-300">
                <strong>{page}</strong> of {pageCount}
              </span>

              <button
                disabled={!hasNext}
                onClick={() => setPage((prev) => prev + 1)}
                className={`px-3 py-1 rounded border border-[#2a2a2a] transition-colors bg-gray-700 ${
                  hasNext
                    ? "text-white hover:bg-gray-600"
                    : "text-gray-500 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          )}
        </section>
      </main>

        </motion.div>
      )}
    </AnimatePresence>
    </div>
  );
}
