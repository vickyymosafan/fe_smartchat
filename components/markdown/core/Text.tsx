import { cn } from "@/lib/utils"
import type { TextVariant } from "../types"

interface TextProps {
  content: string
  variant?: TextVariant
  className?: string
}

export default function Text({ content, variant = "default", className }: TextProps) {
  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    subtle: "text-muted-foreground/70",
  }

  return (
    <p className={cn(
      "text-sm sm:text-base leading-relaxed break-words mb-2 sm:mb-3",
      variantClasses[variant],
      className
    )}>
      {content}
    </p>
  )
}
