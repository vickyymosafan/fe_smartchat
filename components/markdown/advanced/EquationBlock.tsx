import { cn } from "@/lib/utils"

interface EquationBlockProps {
  formula: string
  inline?: boolean
  className?: string
}

export default function EquationBlock({ formula, inline = false, className }: EquationBlockProps) {
  if (inline) {
    return (
      <code className={cn(
        "bg-primary/10 px-2 py-1 rounded text-sm font-mono text-foreground",
        className
      )}>
        {formula}
      </code>
    )
  }

  return (
    <div className={cn(
      "my-3 sm:my-4 rounded-lg border border-border bg-muted/20 p-4 sm:p-6 overflow-x-auto",
      className
    )}>
      <div className="flex items-center justify-center">
        <code className="text-base sm:text-lg md:text-xl font-mono text-foreground text-center break-all">
          {formula}
        </code>
      </div>
    </div>
  )
}
