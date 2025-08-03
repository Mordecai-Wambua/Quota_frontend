import { Editor } from "@tiptap/core"
import {createArticle} from "@/lib/api";
import toast from "react-hot-toast";

interface SavePayload {
    title: string
    description: string
    editor: Editor | null
    onSuccess: (slug: string) => void
}

function isEditorEmpty(editor: Editor): boolean {
    const json = editor.getJSON();

    if (!json.content || json.content.length === 0) return true;

    return json.content.every((node: any) => {
        if (node.type !== "paragraph") return false;

        if (!node.content || node.content.length === 0) return true;

        return node.content.every((inner: any) => {
            return inner.type === "text" && (!inner.text || !inner.text.trim());
        });
    });
}



export async function saveEditorContent({ title, description, editor, onSuccess }: SavePayload) {
    if (!editor || !title.trim() || !description.trim() ) {
        toast.error("Title and description are required.")
        return
    }

    if (isEditorEmpty(editor)) {
        toast.error("Editor content cannot be empty.");
        return;
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
        toast.success("Article saved!");
        onSuccess(savedArticle.slug)
    } catch (err: any) {
        toast.error(err.message || "Failed to save article.");
    }
}
