import { Node } from "@tiptap/core"

export const Description = Node.create({
  name: "description",

  group: "block",
  content: "text*",
  defining: true,

  parseHTML() {
    return [{ tag: "p", class: "description" }]
  },

  renderHTML({ HTMLAttributes }) {
    return ['p', { class: 'description text-center text-lg text-[#888888FF] mb-6', ...HTMLAttributes }, 0];
  }
})
