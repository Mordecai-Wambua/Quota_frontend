// hooks/usePostEditor.ts
import { useMemo } from "react";
import { useEditor, Editor } from "@tiptap/react";

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

export function usePostEditor(enabled: boolean): Editor | null {
  const editor = useMemo(() => {
    if (!enabled) return null;

    return useEditor({
      immediatelyRender: false,
      editable: false,
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
    });
  }, [enabled]);

  return editor;
}
