"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useEditor, EditorContent } from "@tiptap/react";
import toast from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

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
      StarterKit.configure({ horizontalRule: false }),
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
      setTimeout(() => {
        getArticle(slug as string)
          .then((data) => setPost(data))
          .catch((error) => toast.error(error.message))
          .finally(() => setIsLoading(false));
      }, 2000);
    }
  }, [slug]);

  useEffect(() => {
    if (editor && post?.content) {
      editor.commands.setContent(post.content);
    }
  }, [editor, post?.content]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <AnimatePresence mode="wait">
        {isLoading || !post || !editor ? (
          // Skeleton phase
          <motion.div
            key="skeleton"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeInOut" } }}
          >
            <PostDetailSkeleton />
          </motion.div>
        ) : (
          // Content phase with morph
          <motion.main
            key="content"
            layoutId="post-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: "easeInOut" }}
            className="max-w-4xl mx-auto px-6 space-y-12 py-6"
          >
            {/* Back link */}
            <motion.div layoutId="back-link">
              <Link
                href="/articles"
                className="inline-flex items-center gap-2 bg-muted text-muted-foreground px-4 py-2 rounded-md hover:bg-muted/80 transition-colors text-sm font-medium shadow-sm"
              >
                <span className="text-lg">←</span> All articles
              </Link>
            </motion.div>

            {/* Content */}
            <motion.div layoutId="post-body" className="prose prose-invert max-w-none tiptap mt-6">
              <EditorContent editor={editor} />
            </motion.div>

            {/* Divider */}
            <motion.hr layoutId="divider" className="border-border opacity-40 my-10" />

            {/* Metadata */}
            <motion.div
              layoutId="post-meta"
              className="rounded-md border border-border bg-muted/10 p-2 sm:p-4 grid gap-4 sm:gap-6 text-sm [grid-template-columns:repeat(auto-fit,minmax(100px,1fr))] justify-items-center"
            >
              {/* Published */}
              <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
                <p className="text-muted-foreground font-semibold flex items-center gap-1 flex-wrap">
                  <span>📅</span> <span>Published</span>
                </p>
                <p className="text-foreground break-words">
                  {new Date(post.created_at).toLocaleDateString(undefined, {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </p>
              </div>

              {/* Topic */}
              <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
                <p className="text-muted-foreground font-semibold flex items-center gap-1 flex-wrap">
                  <span>🏷️</span> <span>Topic</span>
                </p>
                <p className="text-foreground break-words">{post.category}</p>
              </div>

              {/* Author */}
              <div className="flex flex-col gap-1 items-center text-center sm:items-start sm:text-left">
                <p className="text-muted-foreground font-semibold flex items-center gap-1 flex-wrap">
                  <span>✍️</span> <span>Author</span>
                </p>
                <p className="text-foreground break-words">{post.author}</p>
              </div>
            </motion.div>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  );
}
