"use client"

import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

// Reuse existing AIResponse components (NO DUPLICATION!)
import Heading from "./core/Heading"
import Quote from "./core/Quote"
import type { HeadingLevel } from "./types"

interface EnhancedMarkdownRendererProps {
  content: string
  className?: string
}

export default function EnhancedMarkdownRenderer({
  content,
  className,
}: EnhancedMarkdownRendererProps) {
  return (
    <div className={cn("markdown-content", className)}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          // Headings - Reuse Heading component
          h1: ({ children }) => (
            <Heading level={1} content={String(children)} />
          ),
          h2: ({ children }) => (
            <Heading level={2} content={String(children)} />
          ),
          h3: ({ children }) => (
            <Heading level={3} content={String(children)} />
          ),

          // Paragraphs
          p: ({ children }) => (
            <p className="text-sm sm:text-base leading-relaxed break-words mb-2 sm:mb-3 text-foreground">
              {children}
            </p>
          ),

          // Code blocks - Reuse CodeBlock styling
          code: ({ className, children, ...props }: any) => {
            const match = /language-(\w+)/.exec(className || "")
            const language = match ? match[1] : ""
            const inline = !language

            if (!inline && language) {
              return (
                <div className="my-3 sm:my-4 rounded-lg overflow-hidden border border-border">
                  <div className="bg-muted/50 px-3 py-1.5 sm:px-4 sm:py-2 border-b border-border">
                    <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase">
                      {language}
                    </span>
                  </div>
                  <div className="overflow-x-auto relative">
                    <SyntaxHighlighter
                      language={language}
                      style={vscDarkPlus}
                      customStyle={{
                        margin: 0,
                        padding: "0.75rem",
                        background: "var(--color-card)",
                        fontSize: "0.75rem",
                      }}
                      codeTagProps={{
                        style: {
                          fontFamily: "var(--font-mono)",
                        },
                      }}
                      className="sm:!text-sm sm:!p-4"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                    {/* Scroll indicator */}
                    <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card/80 to-transparent pointer-events-none sm:hidden" />
                  </div>
                </div>
              )
            }

            // Inline code
            return (
              <code
                className="bg-primary/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-xs sm:text-sm font-mono break-all"
                {...props}
              >
                {children}
              </code>
            )
          },

          // Blockquote - Reuse Quote component
          blockquote: ({ children }) => (
            <Quote content={String(children)} />
          ),

          // Lists
          ul: ({ children }) => (
            <ul className="my-2 sm:my-3 space-y-1.5 sm:space-y-2">
              {children}
            </ul>
          ),
          ol: ({ children, start }) => (
            <ol className="my-2 sm:my-3 space-y-1.5 sm:space-y-2" start={start}>
              {children}
            </ol>
          ),
          li: ({ children, ordered }: any) => {
            // Check if it's a task list item
            const childArray = Array.isArray(children) ? children : [children]
            const firstChild = childArray[0]
            
            if (
              typeof firstChild === "object" &&
              firstChild !== null &&
              "type" in firstChild &&
              firstChild.type === "input"
            ) {
              // Task list item
              const checked = (firstChild as any).props?.checked || false
              const text = childArray.slice(1).join("")
              
              return (
                <li className="flex gap-2 sm:gap-3 items-start ml-1 sm:ml-2">
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled
                    className="mt-1 h-4 w-4 sm:h-5 sm:w-5 rounded border-2 border-muted-foreground/30"
                  />
                  <span
                    className={cn(
                      "text-sm sm:text-base leading-relaxed break-words flex-1",
                      checked && "line-through text-muted-foreground"
                    )}
                  >
                    {text}
                  </span>
                </li>
              )
            }

            // Regular list item
            if (ordered) {
              return (
                <li className="flex gap-2 sm:gap-3 ml-1 sm:ml-2">
                  <span className="text-sm sm:text-base text-foreground leading-relaxed break-words flex-1">
                    {children}
                  </span>
                </li>
              )
            }

            return (
              <li className="flex gap-2 sm:gap-3 ml-1 sm:ml-2">
                <span className="text-primary font-bold text-sm sm:text-base flex-shrink-0 mt-0.5">
                  •
                </span>
                <span className="text-sm sm:text-base text-foreground leading-relaxed break-words flex-1">
                  {children}
                </span>
              </li>
            )
          },

          // Tables - Reuse MarkdownTable styling
          table: ({ children }) => (
            <div className="my-3 sm:my-4 rounded-lg border border-border overflow-hidden">
              <div className="overflow-x-auto relative">
                <table className="w-full text-sm">{children}</table>
                {/* Scroll indicator */}
                <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card/80 to-transparent pointer-events-none sm:hidden" />
              </div>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-muted/50 border-b border-border">
              {children}
            </thead>
          ),
          tbody: ({ children }) => <tbody>{children}</tbody>,
          tr: ({ children, isHeader }: any) => (
            <tr
              className={cn(
                !isHeader && "border-b border-border last:border-0 transition-colors",
                !isHeader && "hover:bg-accent/30"
              )}
            >
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold text-foreground text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="px-3 py-2 sm:px-4 sm:py-3 text-foreground/90 text-[13px] sm:text-sm break-words leading-relaxed">
              {children}
            </td>
          ),

          // Links
          a: ({ href, children }) => (
            <a
              href={href}
              className="text-primary underline hover:text-primary/80 transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              {children}
            </a>
          ),

          // Strong/Bold
          strong: ({ children }) => (
            <strong className="font-bold text-foreground">{children}</strong>
          ),

          // Emphasis/Italic
          em: ({ children }) => (
            <em className="italic text-foreground/80">{children}</em>
          ),

          // Strikethrough (from GFM)
          del: ({ children }) => (
            <del className="line-through text-muted-foreground">{children}</del>
          ),

          // Horizontal rule
          hr: () => (
            <div className="my-3 sm:my-4">
              <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
            </div>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}
