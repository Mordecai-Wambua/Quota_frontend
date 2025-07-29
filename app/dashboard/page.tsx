"use client";

import { useEffect, useState } from "react";
import { dashboard } from "@/lib/api";

interface Post {
  id: number;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
  slug: string;
  content_html: string;
  created_at: string;
  author: string;

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

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState("All");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const res = await dashboard();
        setData(res);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  if (loading) return <p className="p-6">Loading dashboard...</p>;
  if (error) return <p className="p-6 text-red-500">Error: {error}</p>;

  const topics = ["All", ...Array.from(new Set(data?.posts.map((p) => p.category)))];

  const filteredPosts =
    selectedTopic === "All"
      ? data!.posts
      : data!.posts.filter((post) => post.category === selectedTopic);

  return (
    <div className="min-h-screen bg-background text-white">
      <main className="max-w-4xl mx-auto px-6 py-16">

        {/* Welcome Section */}
        <section className="mb-12 bg-[#1f1f1f] rounded-xl p-6 shadow-lg">
          <h1 className="text-3xl text-center font-bold mb-4 text-gray-700">
            {data?.welcome_message}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-center">
            <p>
              <span className="font-medium ">Email:</span> {data?.email}
            </p>
            <p>
              <span className="font-medium ">Role:</span> {data?.role}
            </p>
            <p>
              <span className="font-medium ">Last login:</span>{" "}
              {new Date(data!.last_login).toLocaleString()}
            </p>
            <p>
              <span className="font-medium ">Posts written:</span> {data?.posts_count}
            </p>

          </div>
        </section>

        {/* Filter Header */}
        {selectedTopic !== "All" && (
          <div className="mb-6 flex items-center gap-4">
            <button
              onClick={() => setSelectedTopic("All")}
              className="text-sm bg-gray-400 px-3 py-1.5 rounded-full hover:text-white transition-colors border border-[#2a2a2a]"
            >
              ⤺ All writing
            </button>
            <h1 className="text-xl sm:text-2xl font-serif font-semibold">{selectedTopic}</h1>
          </div>
        )}

        {/* Topics */}
        <section className="mb-10">
          <h2 className="text-lg font-semibold mb-4">Topics</h2>
          <div className="flex flex-wrap gap-6 text-sm text-gray-400">
            {topics.map((topic) => (
              <button
                key={topic}
                onClick={() => setSelectedTopic(topic)}
                className={`text-sm border-none bg-transparent transition-colors flex items-center gap-1 ${
                  selectedTopic === topic
                    ? "text-white font-medium"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                <span className="text-xs">↳</span>
                {topic}
              </button>
            ))}
          </div>
        </section>

        {/* Posts Section */}
        <section className="border-t border-[#2a2a2a] pt-10">
          <h2 className="sr-only">
            {selectedTopic === "All" ? "All Articles" : `${selectedTopic} Articles`}
          </h2>
          <div className="transition-all duration-300 space-y-5">
            {filteredPosts.length > 0 ? (
              filteredPosts.map((post) => (
                <div
                  key={post.id}
                  className={`flex items-start justify-between pb-5                    
                      "border-b border-dashed border-[#2a2a2a]"                      
                  `}
                >
                  <div>
                    <a
                      href={post.url}
                      className="text-lg font-semibold text-gray-500 hover:underline transition-colors "
                    >
                      {post.title}
                    </a>
                    <div
                      className="text-sm text-gray-400 mt-1 line-clamp-2"
                    />
                    {post.description}
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
        </section>
      </main>
    </div>
  );
}
