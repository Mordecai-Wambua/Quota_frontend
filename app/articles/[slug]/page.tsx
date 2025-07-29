"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { getArticle } from "@/lib/api";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit],
    content: "",
    editable: false,
  });

  useEffect(() => {
    if (slug) getArticle(slug as string).then(setPost);
  }, [slug]);

  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post?.content]);

  if (!post || !editor) {
    return <p className="p-6 text-muted-foreground">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-10">
        {/* Back link */}
        <div>
          <Link
            href="/articles"
            className="inline-flex items-center text-sm px-3 py-1.5 bg-muted hover:bg-muted/70 text-muted-foreground rounded-full"
          >
            ⤺ All articles
          </Link>
        </div>

        {/* Title */}
        <h1 className="text-4xl sm:text-5xl font-serif font-bold leading-tight tracking-tight">
          {post.title}
        </h1>

        {/* Description */}
        {post.description && (
          <p className="text-lg sm:text-xl text-muted-foreground font-light max-w-2xl">
            {post.description}
          </p>
        )}

        {/* Divider */}
        <hr className="border-border my-6" />

        {/* Metadata */}
        <div className="flex gap-10 text-sm text-muted-foreground">
          <div>
            <p className="text-muted-foreground font-medium mb-0.5">Published</p>
            <p className="text-white">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className="text-muted-foreground font-medium mb-0.5">Topic</p>
            <p className="text-white">{post.category ?? "Uncategorized"}</p>
          </div>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none tiptap">
          <EditorContent editor={editor} />
        </div>
      </main>
    </div>
  );
}
