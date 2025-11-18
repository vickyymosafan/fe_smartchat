import { cn } from "@/lib/utils"

interface QuoteProps {
  content: string
  author?: string
  className?: string
}

export default function Quote({ content, author, className }: QuoteProps) {
  return (
    <blockquote className={cn(
      "border-l-4 border-primary bg-primary/5 pl-3 sm:pl-4 pr-3 py-2 sm:py-3 my-3 sm:my-4 rounded-r-lg",
      className
    )}>
      <p className="text-sm sm:text-base italic text-foreground/90 leading-relaxed break-words">
        {content}
      </p>
      {author && (
        <footer className="mt-2 text-xs sm:text-sm text-muted-foreground">
          — {author}
        </footer>
      )}
    </blockquote>
  )
}
