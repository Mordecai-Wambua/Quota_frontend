import { Node } from "@tiptap/core"

export const Title = Node.create({
  name: "title",

  group: "block",
  content: "text*",
  defining: true,

  parseHTML() {
    return [{ tag: "h1" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['h1', { class: 'title text-center text-4xl font-bold mb-4', ...HTMLAttributes }, 0];
  }
})
