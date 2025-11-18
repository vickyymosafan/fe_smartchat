"use client"

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { vscDarkPlus } from "react-syntax-highlighter/dist/esm/styles/prism"
import { cn } from "@/lib/utils"

interface CodeBlockProps {
  language: string
  code: string
  className?: string
}

export default function CodeBlock({ language, code, className }: CodeBlockProps) {
  return (
    <div className={cn("my-3 sm:my-4 rounded-lg overflow-hidden border border-border", className)}>
      {/* Language Label */}
      <div className="bg-muted/50 px-3 py-1.5 sm:px-4 sm:py-2 border-b border-border">
        <span className="text-xs sm:text-sm font-mono text-muted-foreground uppercase">
          {language || "code"}
        </span>
      </div>

      {/* Code Content */}
      <div className="overflow-x-auto relative">
        <SyntaxHighlighter
          language={language || "text"}
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
        >
          {code}
        </SyntaxHighlighter>
        {/* Scroll indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card/80 to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  )
}
