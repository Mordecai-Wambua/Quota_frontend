"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";

// -- Tip tap ---
import { StarterKit } from "@tiptap/starter-kit";
import { Title } from "@/components/tiptap-node/title-node/title-node-extension";
import { Description } from "@/components/tiptap-node/description-node/description-node-extension";
import { HorizontalRule } from "@/components/tiptap-node/horizontal-rule-node/horizontal-rule-node-extension";
import { Image } from "@tiptap/extension-image";
import { TaskItem, TaskList } from "@tiptap/extension-list";
import { TextAlign } from "@tiptap/extension-text-align";
import { Typography } from "@tiptap/extension-typography";
import { Highlight } from "@tiptap/extension-highlight";
import { Subscript } from "@tiptap/extension-subscript";
import { Superscript } from "@tiptap/extension-superscript";

import { getArticle } from "@/lib/api";
import { PostDetailSkeleton } from "@/components/skeletons/PostDetailSkeleton";

export default function PostDetail() {
  const { slug } = useParams();
  const [post, setPost] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      Title,
      Description,
      Image,
      StarterKit.configure({
        horizontalRule: false,
      }),
      HorizontalRule,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      TaskList,
      TaskItem.configure({ nested: true }),
      Highlight.configure({ multicolor: true }),
      Superscript,
      Subscript,
      Typography,
    ],
    content: "",
    editable: false,
  });

  useEffect(() => {
    if (slug) {
      setIsLoading(true);
      console.log("Starting to load article..."); // Debug log
      // Add delay for testing
      setTimeout(() => {
        getArticle(slug as string)
          .then((data) => {
            console.log("Article loaded:", data); // Debug log
            setPost(data);
          })
          .catch((error) => {
            console.error("Error loading article:", error); // Debug log
          })
          .finally(() => {
            console.log("Loading finished"); // Debug log
            setIsLoading(false);
          });
      }, 2000); // 2 second delay
    }
  }, [slug]);

  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post?.content]);

  // Debug logs
  console.log("Render state:", { isLoading, post: !!post, editor: !!editor });

  // Show skeleton while loading or if editor/post is not ready
  if (isLoading || !post || !editor) {
    console.log("Showing skeleton"); // Debug log
    return <PostDetailSkeleton />;
  }

  console.log("Showing main content"); // Debug log

  return (
    <div className="min-h-screen bg-background text-foreground animate-fade-in">
      <main className="max-w-3xl mx-auto px-6 py-16 space-y-12">

        {/* Back link */}
        <div className="mb-4">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm font-medium shadow-sm"
          >
            <span className="text-lg">←</span> All articles
          </Link>
        </div>

        {/* Content */}
        <div className="prose prose-invert max-w-none tiptap">
          <EditorContent editor={editor} />
        </div>

        {/* Divider */}
        <hr className="border-border opacity-40 my-10" />

        {/* Metadata */}
        <div className="rounded-md border border-border bg-muted/10 p-6 grid grid-cols-1 sm:grid-cols-3 gap-6 text-sm">
          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-semibold flex items-center gap-1">
              <span>📅</span> Published
            </p>
            <p className="text-foreground">
              {new Date(post.created_at).toLocaleDateString(undefined, {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-semibold flex items-center gap-1">
              <span>🏷️</span> Topic
            </p>
            <p className="text-foreground">{post.category ?? "Uncategorized"}</p>
          </div>

          <div className="flex flex-col gap-1">
            <p className="text-muted-foreground font-semibold flex items-center gap-1">
              <span>✍️</span> Author
            </p>
            <p className="text-foreground">{post.author ?? "Anonymous"}</p>
          </div>
        </div>

      </main>
    </div>
  );
}