"use client"

import { Editor } from "@tiptap/core"
import { useCallback } from "react"
import toast from "react-hot-toast"
import { createArticle } from "@/lib/api"

export interface SaveOptions {
  editor: Editor | null
  onSuccess: (slug: string) => void
}

function getTextFromNode(node: any): string {
  if (!node?.content || !Array.isArray(node.content)) return ""
  const textNode = node.content.find((n: any) => n.type === "text")
  return textNode?.text?.trim() || ""
}

// function isEditorEmpty(editor: Editor): boolean {
//   const json = editor.getJSON()
//   if (!json.content || json.content.length === 0) return true
//
//   return json.content.every((node: any) => {
//     if (node.type !== "paragraph") return false
//     if (!node.content || node.content.length === 0) return true
//     return node.content.every(
//       (inner: any) => inner.type === "text" && !inner.text?.trim()
//     )
//   })
// }

function isEditorEmpty(editor: Editor): boolean {
  const json = editor.getJSON();
  if (!json.content || json.content.length === 0) return true;

  return !json.content.some((node: any) => {
    // Skip title and description
    if (["title", "description"].includes(node.type)) return false;

    // Paragraph with no meaningful text
    if (node.type === "paragraph") {
      return node.content?.some(
        (inner: any) => inner.type === "text" && inner.text?.trim()
      );
    }

    // Nodes like image or codeBlock, etc.
    // Consider them non-empty if they exist
    return true;
  });
}

export const useSaveEditor = () => {
  return useCallback(async ({ editor, onSuccess }: SaveOptions) => {
    if (!editor) {
      toast.error("Editor is not ready.")
      return
    }

    const content = editor.getJSON()

    const title = getTextFromNode(
      content.content?.find((node: any) => node.type === "title")
    )
    const description = getTextFromNode(
      content.content?.find((node: any) => node.type === "description")
    )

    if (!title || !description) {
      toast.error("Title and description are required.")
      return
    }

    if (isEditorEmpty(editor)) {
      toast.error("Article body cannot be empty.")
      return
    }

    const payload = {
      title,
      description,
      category: "Testing",
      featured: true,
      content,
    }

    try {
      const savedArticle = await toast.promise(
        createArticle(payload),
        {
          loading: "Saving article...",
          success: "Article saved!",
          error: "Failed to save article.",
        }
      )
      onSuccess(savedArticle.slug)
    } catch (err: any) {
      // Already handled by toast.promise, this is fallback for unexpected issues
      console.error("Unexpected error:", err)
    }
  }, [])
}
