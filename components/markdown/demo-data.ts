/**
 * Demo data for AI Response Markdown System
 * Shows all available features and components
 */

import type { MarkdownElement } from "./types"

export const demoElements: MarkdownElement[] = [
  // Heading H1
  {
    type: "heading",
    level: 1,
    content: "Comprehensive AI Response System",
  },

  // Text with variants
  {
    type: "text",
    content: "This is a demonstration of the comprehensive markdown rendering system with support for all major content types.",
    variant: "default",
  },

  // Callout Info
  {
    type: "callout",
    variant: "info",
    title: "Information",
    content: "This system supports 15+ different markdown elements with full responsive design and accessibility features.",
  },

  // Heading H2
  {
    type: "heading",
    level: 2,
    content: "Core Features",
  },

  // Bulleted List
  {
    type: "bulleted-list",
    items: [
      "Semantic HTML with proper heading hierarchy",
      "Fully responsive across all devices",
      "Accessible with ARIA labels and keyboard navigation",
      "Dark mode support with CSS variables",
      "Syntax highlighted code blocks",
    ],
  },

  // Heading H3
  {
    type: "heading",
    level: 3,
    content: "Code Example",
  },

  // Code Block
  {
    type: "code",
    language: "typescript",
    code: `import { AIResponse } from "@/components/markdown"

const elements: MarkdownElement[] = [
  { type: "heading", level: 1, content: "Hello World" },
  { type: "text", content: "This is a paragraph" }
]

export default function Page() {
  return <AIResponse elements={elements} />
}`,
  },

  // Quote
  {
    type: "quote",
    content: "Design is not just what it looks like and feels like. Design is how it works.",
    author: "Steve Jobs",
  },

  // Heading H2
  {
    type: "heading",
    level: 2,
    content: "List Types",
  },

  // Numbered List
  {
    type: "numbered-list",
    items: [
      "First item in ordered list",
      "Second item with automatic numbering",
      "Third item with responsive spacing",
    ],
    start: 1,
  },

  // Todo List
  {
    type: "todo-list",
    items: [
      { text: "Interactive checkbox with state management", checked: true },
      { text: "Accessible with ARIA labels", checked: true },
      { text: "Try clicking to toggle", checked: false },
    ],
  },

  // Heading H2
  {
    type: "heading",
    level: 2,
    content: "Callout Variants",
  },

  // Callout Warning
  {
    type: "callout",
    variant: "warning",
    title: "Warning",
    content: "This is a warning callout with yellow color scheme and alert icon.",
  },

  // Callout Success
  {
    type: "callout",
    variant: "success",
    title: "Success",
    content: "This is a success callout with green color scheme and check icon.",
  },

  // Callout Error
  {
    type: "callout",
    variant: "error",
    title: "Error",
    content: "This is an error callout with red color scheme and X icon.",
  },

  // Heading H2
  {
    type: "heading",
    level: 2,
    content: "Advanced Features",
  },

  // Table
  {
    type: "table",
    headers: ["Feature", "Status", "Description"],
    rows: [
      ["Responsive Design", "✅", "Works on all devices"],
      ["Accessibility", "✅", "WCAG compliant"],
      ["Performance", "✅", "Optimized rendering"],
      ["Dark Mode", "✅", "Full support"],
    ],
  },

  // Equation Block
  {
    type: "equation",
    formula: "E = mc²",
    inline: false,
  },

  // Toggle Block
  {
    type: "toggle",
    title: "Click to expand: Nested Content Example",
    defaultOpen: false,
    content: [
      {
        type: "text",
        content: "This content is hidden by default and can be toggled.",
      },
      {
        type: "bulleted-list",
        items: [
          "Nested lists work perfectly",
          "Smooth animations on expand/collapse",
          "Accessible with keyboard navigation",
        ],
      },
    ],
  },

  // Multi-Column Layout
  {
    type: "multi-column",
    columns: 3,
    content: [
      [
        { type: "heading", level: 3, content: "Column 1" },
        { type: "text", content: "Content in first column with responsive grid layout." },
      ],
      [
        { type: "heading", level: 3, content: "Column 2" },
        { type: "text", content: "Content in second column that stacks on mobile." },
      ],
      [
        { type: "heading", level: 3, content: "Column 3" },
        { type: "text", content: "Content in third column with automatic spacing." },
      ],
    ],
  },

  // Synced Block
  {
    type: "synced-block",
    id: "shared-content-1",
    content: [
      {
        type: "text",
        content: "This is a synced block that can be referenced across multiple locations.",
      },
      {
        type: "callout",
        variant: "info",
        content: "Synced blocks are useful for content that appears in multiple places.",
      },
    ],
  },

  // Final Text
  {
    type: "text",
    content: "This comprehensive system provides everything needed for rich content rendering in modern web applications.",
    variant: "muted",
  },
]
