# Comprehensive AI Response Markdown System

A complete, component-based markdown rendering system with 15+ elements, full responsive design, and accessibility features.

## 🎯 Features

- ✅ **15+ Markdown Elements**: Headings, text, code, quotes, callouts, lists, tables, equations, and more
- ✅ **Fully Responsive**: Mobile-first design with breakpoints for all devices
- ✅ **Accessible**: WCAG compliant with ARIA labels and keyboard navigation
- ✅ **Type-Safe**: Full TypeScript support with comprehensive type definitions
- ✅ **Dark Mode**: Seamless support using CSS variables
- ✅ **Zero Duplication**: Clean component-based architecture
- ✅ **Performance**: Optimized rendering with React best practices

## 📦 Installation

All dependencies are already installed:
- `react-syntax-highlighter` - Code syntax highlighting
- `@radix-ui/react-checkbox` - Accessible checkboxes
- `@radix-ui/react-collapsible` - Collapsible sections
- `lucide-react` - Icons

## 🚀 Quick Start

### For String-Based Markdown (Recommended for Chat)

```typescript
import { EnhancedMarkdownRenderer } from "@/components/markdown"

export default function ChatMessage({ content }: { content: string }) {
  return <EnhancedMarkdownRenderer content={content} />
}
```

**Features:**
- ✅ Tables (GitHub Flavored Markdown)
- ✅ Syntax highlighting for code blocks
- ✅ Task lists with checkboxes
- ✅ Strikethrough text
- ✅ All standard markdown features

### For Structured Data

```typescript
import { AIResponse } from "@/components/markdown"
import type { MarkdownElement } from "@/components/markdown"

const elements: MarkdownElement[] = [
  { type: "heading", level: 1, content: "Hello World" },
  { type: "text", content: "This is a paragraph" },
  { type: "code", language: "typescript", code: "const x = 42" }
]

export default function Page() {
  return <AIResponse elements={elements} />
}
```

## 📚 Available Components

### Core Components

#### Heading
```typescript
{ type: "heading", level: 1 | 2 | 3, content: string }
```
- H1: Large heading with gradient underline
- H2: Medium heading with solid underline
- H3: Small heading without underline

#### Text
```typescript
{ type: "text", content: string, variant?: "default" | "muted" | "subtle" }
```
- Default: Normal text color
- Muted: Secondary text color
- Subtle: Lighter text color

#### CodeBlock
```typescript
{ type: "code", language: string, code: string }
```
- Syntax highlighting with react-syntax-highlighter
- Language label
- Horizontal scroll for long lines

#### Quote
```typescript
{ type: "quote", content: string, author?: string }
```
- Blockquote with left border
- Optional author attribution

#### Callout
```typescript
{ type: "callout", variant: "info" | "warning" | "success" | "error", content: string, title?: string }
```
- Info: Blue color scheme
- Warning: Yellow color scheme
- Success: Green color scheme
- Error: Red color scheme

### List Components

#### BulletedList
```typescript
{ type: "bulleted-list", items: string[] }
```
- Unordered list with bullet points
- Responsive spacing

#### NumberedList
```typescript
{ type: "numbered-list", items: string[], start?: number }
```
- Ordered list with numbers
- Custom start number

#### TodoList
```typescript
{ type: "todo-list", items: { text: string, checked: boolean }[] }
```
- Interactive checkboxes
- State management
- Accessible with ARIA

#### ToggleBlock
```typescript
{ type: "toggle", title: string, content: MarkdownElement[], defaultOpen?: boolean }
```
- Collapsible sections
- Nested content support
- Smooth animations

### Advanced Components

#### MarkdownTable
```typescript
{ type: "table", headers: string[], rows: string[][] }
```
- Responsive table
- Alternating row colors
- Hover effects
- Horizontal scroll on mobile

#### EquationBlock
```typescript
{ type: "equation", formula: string, inline?: boolean }
```
- Display mathematical equations
- Inline or block display
- Monospace font

#### MultiColumnLayout
```typescript
{ type: "multi-column", columns: 2 | 3 | 4 | 5, content: MarkdownElement[][] }
```
- Responsive grid layout
- 2-5 columns support
- Automatic stacking on mobile

#### SyncedBlock
```typescript
{ type: "synced-block", id: string, content: MarkdownElement[] }
```
- Shared content blocks
- Visual indicator with ID
- Nested content support

## 🎨 Styling

All components use the existing design system:

### Colors
- `--foreground` - Main text
- `--muted-foreground` - Secondary text
- `--primary` - Emphasis, links
- `--destructive` - Errors
- `--border` - Borders
- `--card` - Card backgrounds

### Responsive Breakpoints
- `xs`: 375px - Small mobile
- `sm`: 640px - Mobile large
- `md`: 768px - Tablet
- `lg`: 1024px - Laptop
- `xl`: 1280px - Desktop
- `2xl`: 1536px - Large desktop

## 📱 Responsive Design

### Multi-Column Layouts
```
2 columns: 1 col mobile → 2 cols tablet+
3 columns: 1 col mobile → 2 cols tablet → 3 cols desktop
4 columns: 1 col mobile → 2 cols tablet → 4 cols desktop
5 columns: 1 col mobile → 2 cols tablet → 3 cols medium → 5 cols desktop
```

### Text Scaling
All text automatically scales based on screen size using responsive Tailwind classes.

## ♿ Accessibility

- ✅ Semantic HTML (`<h1>`, `<ul>`, `<table>`, etc.)
- ✅ ARIA labels on interactive elements
- ✅ Keyboard navigation support
- ✅ High contrast colors
- ✅ Focus indicators
- ✅ Screen reader friendly

## 🔧 Advanced Usage

### Nested Content

```typescript
const elements: MarkdownElement[] = [
  {
    type: "toggle",
    title: "Click to expand",
    content: [
      { type: "heading", level: 3, content: "Nested Heading" },
      { type: "text", content: "Nested text content" },
      {
        type: "bulleted-list",
        items: ["Nested", "List", "Items"]
      }
    ]
  }
]
```

### Multi-Column with Mixed Content

```typescript
{
  type: "multi-column",
  columns: 3,
  content: [
    [
      { type: "heading", level: 3, content: "Column 1" },
      { type: "text", content: "First column content" }
    ],
    [
      { type: "code", language: "js", code: "console.log('Column 2')" }
    ],
    [
      { type: "callout", variant: "info", content: "Column 3 callout" }
    ]
  ]
}
```

## 📊 Demo

See `demo-data.ts` for a comprehensive example with all features.

## 🏗️ Architecture

```
frontend/components/markdown/
├── core/               # Basic elements
│   ├── Heading.tsx
│   ├── Text.tsx
│   ├── CodeBlock.tsx
│   ├── Quote.tsx
│   └── Callout.tsx
├── lists/              # List components
│   ├── BulletedList.tsx
│   ├── NumberedList.tsx
│   ├── TodoList.tsx
│   └── ToggleBlock.tsx
├── advanced/           # Advanced features
│   ├── MarkdownTable.tsx
│   ├── EquationBlock.tsx
│   ├── MultiColumnLayout.tsx
│   └── SyncedBlock.tsx
├── AIResponse.tsx      # Main renderer
├── types.ts            # TypeScript types
├── demo-data.ts        # Demo examples
└── index.ts            # Exports
```

## 🚫 Migration from Old System

### Before (Old MarkdownRenderer)
```typescript
import MarkdownRenderer from "@/components/markdown/markdown-renderer"

<MarkdownRenderer content={markdownString} />
```
**Limitations:** No tables, no syntax highlighting, no task lists

### After (EnhancedMarkdownRenderer) ⭐ **CURRENT**
```typescript
import { EnhancedMarkdownRenderer } from "@/components/markdown"

<EnhancedMarkdownRenderer content={markdownString} />
```
**Features:** Tables, syntax highlighting, task lists, strikethrough, all GFM features

### Alternative (AIResponse for Structured Data)
```typescript
import { AIResponse } from "@/components/markdown"

<AIResponse elements={markdownElements} />
```
**Use case:** When you have structured data instead of markdown strings

## 🔄 System Architecture

```
Backend (n8n) → Markdown String
                      ↓
         EnhancedMarkdownRenderer
         (react-markdown + remark-gfm)
                      ↓
              Reuses Components:
              - Heading.tsx
              - Quote.tsx
              - CodeBlock styling
              - MarkdownTable styling
                      ↓
              Rendered HTML
              (Full features)
```

**No Code Duplication:** EnhancedMarkdownRenderer reuses all AIResponse components for consistent styling and behavior.

## 🎯 Best Practices

1. **Use TypeScript types** for type safety
2. **Keep content arrays flat** when possible
3. **Use appropriate variants** for visual hierarchy
4. **Test responsive behavior** on all breakpoints
5. **Provide alt text** for images (if added)
6. **Use semantic elements** for better SEO

## 📝 License

MIT - Part of Smartchat AI Assistant project

## 👨‍💻 Author

Vicky Mosafan - Universitas Muhammadiyah Jember
