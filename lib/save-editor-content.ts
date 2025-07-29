// lib/save-editor-content.ts
import { Editor } from "@tiptap/core"
import {createArticle} from "@/lib/api";

interface SavePayload {
    title: string
    description: string
    editor: Editor | null
}

export async function saveEditorContent({ title, description, editor }: SavePayload) {
    if (!editor || !title.trim() || !description.trim() ) {
        console.warn("Missing required fields")
        return
    }

    const content = editor.getJSON()
    const payload = {
        title,
        description,
        category: "Testing",
        featured: true,
        content
    }
    

    try {
        const savedArticle = await createArticle(payload)
        console.log("Article saved successfully:", savedArticle);
        return savedArticle
    } catch (err: any) {
        console.error("Failed to save article:", err);
        // toast.error(error.message || "Failed to save article.");
        throw err;
    }
}
