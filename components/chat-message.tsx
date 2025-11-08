"use client"

import { formatDistanceToNow } from "date-fns"
import { id } from "date-fns/locale"
import type { ChatMessage as ChatMessageType } from "@/types/chat"

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isUser = message.role === "user"
  const isError = message.role === "error"

  return (
    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
      <div
        className={`${
          isUser
            ? "max-w-xs rounded-lg bg-primary text-primary-foreground px-4 py-3 sm:px-5 sm:py-3"
            : isError
            ? "max-w-2xl rounded-lg bg-destructive/10 border border-destructive/20 text-destructive px-4 py-3 sm:px-5 sm:py-3"
            : "w-full bg-transparent text-foreground px-4 sm:px-6 lg:px-8"
        }`}
      >
        {isUser ? (
          <p className="text-sm sm:text-base">{message.content}</p>
        ) : isError ? (
          <div className="space-y-2">
            <p className="text-sm font-semibold">⚠️ Error</p>
            <p className="text-sm">{message.content}</p>
          </div>
        ) : (
          <div className="space-y-3 text-sm sm:text-base max-w-4xl">
            <MarkdownContent content={message.content} />
          </div>
        )}
        <p className={`mt-2 text-xs ${isUser ? "opacity-60" : isError ? "opacity-70" : "opacity-50 text-muted-foreground"}`}>
          {formatDistanceToNow(new Date(message.timestamp), {
            locale: id,
            addSuffix: true,
          })}
        </p>
      </div>
    </div>
  )
}

function MarkdownContent({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```|`[^`]*`)/g)

  return (
    <>
      {parts.map((part, idx) => {
        // Code block dengan triple backtick
        if (part.startsWith("```")) {
          const codeContent = part.replace(/```[\w]*\n?/, "").replace(/```$/, "")
          return (
            <pre key={idx} className="bg-background/50 rounded p-3 overflow-x-auto my-3 border border-border">
              <code className="text-xs sm:text-sm font-mono text-foreground">{codeContent}</code>
            </pre>
          )
        }

        // Inline code dengan backtick tunggal
        if (part.startsWith("`") && part.endsWith("`")) {
          return (
            <code key={idx} className="bg-primary/20 px-2 py-1 rounded text-xs font-mono">
              {part.slice(1, -1)}
            </code>
          )
        }

        // Parse markdown text
        return <ParsedText key={idx} text={part} />
      })}
    </>
  )
}

function ParsedText({ text }: { text: string }) {
  const lines = text.split("\n")
  const elements = []

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith("# ")) {
      elements.push(
        <div key={i} className="mt-4 mb-3">
          <h1 className="font-bold text-2xl text-foreground">{line.slice(2)}</h1>
          <div className="h-px bg-gradient-to-r from-primary/50 to-transparent mt-2" />
        </div>,
      )
      continue
    }

    if (line.startsWith("## ")) {
      elements.push(
        <div key={i} className="mt-3 mb-2">
          <h2 className="font-bold text-xl text-foreground">{line.slice(3)}</h2>
          <div className="h-px bg-border mt-1" />
        </div>,
      )
      continue
    }

    if (line.startsWith("### ")) {
      elements.push(
        <h3 key={i} className="font-semibold text-lg text-foreground mt-2 mb-1">
          {line.slice(4)}
        </h3>,
      )
      continue
    }

    if (line.startsWith("#### ")) {
      elements.push(
        <h4 key={i} className="font-semibold text-base text-foreground/90 mt-1 mb-1">
          {line.slice(5)}
        </h4>,
      )
      continue
    }

    if (line.match(/^\d+\.\s+/)) {
      const match = line.match(/^(\d+)\.\s+(.+)$/)
      if (match) {
        elements.push(
          <div key={i} className="flex gap-3 ml-2 my-1">
            <span className="font-semibold text-primary min-w-6">{match[1]}.</span>
            <p className="flex-1 leading-relaxed">
              <FormattedText text={match[2]} />
            </p>
          </div>,
        )
      }
      continue
    }

    if (line.startsWith("- ")) {
      elements.push(
        <div key={i} className="flex gap-3 ml-2 my-1">
          <span className="text-primary font-bold">•</span>
          <p className="flex-1 leading-relaxed">
            <FormattedText text={line.slice(2)} />
          </p>
        </div>,
      )
      continue
    }

    if (line.startsWith("> ")) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-primary bg-primary/5 pl-4 py-2 my-2 rounded italic text-muted-foreground"
        >
          <FormattedText text={line.slice(2)} />
        </blockquote>,
      )
      continue
    }

    if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
      elements.push(
        <div key={i} className="my-3">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>,
      )
      continue
    }

    // Empty line
    if (line.trim() === "") {
      elements.push(<div key={i} className="h-2" />)
      continue
    }

    // Regular paragraph text
    elements.push(
      <p key={i} className="mb-2 leading-relaxed text-foreground">
        <FormattedText text={line} />
      </p>,
    )
  }

  return <>{elements}</>
}

function FormattedText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_|\[[^\]]+\]$$[^)]+$$)/g)

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith("**") && part.endsWith("**")) {
          return (
            <strong key={idx} className="font-bold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }

        if (part.startsWith("__") && part.endsWith("__")) {
          return (
            <strong key={idx} className="font-bold text-foreground">
              {part.slice(2, -2)}
            </strong>
          )
        }

        // Italic with single asterisk
        if (part.startsWith("*") && part.endsWith("*")) {
          return (
            <em key={idx} className="italic text-foreground/80">
              {part.slice(1, -1)}
            </em>
          )
        }

        // Italic with single underscore
        if (part.startsWith("_") && part.endsWith("_")) {
          return (
            <em key={idx} className="italic text-foreground/80">
              {part.slice(1, -1)}
            </em>
          )
        }

        // Link
        if (part.startsWith("[") && part.includes("](")) {
          const match = part.match(/\[([^\]]+)\]$$([^)]+)$$/)
          if (match) {
            return (
              <a
                key={idx}
                href={match[2]}
                className="text-primary underline hover:text-primary/80 transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                {match[1]}
              </a>
            )
          }
        }

        return (
          <span key={idx} className="text-foreground">
            {part}
          </span>
        )
      })}
    </>
  )
}
