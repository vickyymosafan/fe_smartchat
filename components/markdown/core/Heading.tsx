import { cn } from "@/lib/utils"
import type { HeadingLevel } from "../types"

interface HeadingProps {
  level: HeadingLevel
  content: string
  className?: string
}

export default function Heading({ level, content, className }: HeadingProps) {
  const baseClasses = "font-bold text-foreground break-words"

  if (level === 1) {
    return (
      <div className={cn("mt-4 mb-3 sm:mt-6 sm:mb-4", className)}>
        <h1 className={cn("text-xl sm:text-2xl md:text-3xl lg:text-4xl", baseClasses)}>
          {content}
        </h1>
        <div className="h-px bg-gradient-to-r from-primary/50 via-primary/30 to-transparent mt-2 sm:mt-3" />
      </div>
    )
  }

  if (level === 2) {
    return (
      <div className={cn("mt-3 mb-2 sm:mt-4 sm:mb-3", className)}>
        <h2 className={cn("text-lg sm:text-xl md:text-2xl", baseClasses)}>
          {content}
        </h2>
        <div className="h-px bg-border mt-1.5 sm:mt-2" />
      </div>
    )
  }

  return (
    <h3 className={cn("text-base sm:text-lg md:text-xl font-semibold text-foreground mt-3 mb-2 break-words", className)}>
      {content}
    </h3>
  )
}
