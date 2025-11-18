import { cn } from "@/lib/utils"
import { Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { CalloutVariant } from "../types"

interface CalloutProps {
  variant: CalloutVariant
  content: string
  title?: string
  className?: string
}

export default function Callout({ variant, content, title, className }: CalloutProps) {
  const config = {
    info: {
      icon: Info,
      bgClass: "bg-blue-500/10",
      borderClass: "border-blue-500/30",
      iconClass: "text-blue-600 dark:text-blue-400",
      titleClass: "text-blue-700 dark:text-blue-300",
    },
    warning: {
      icon: AlertTriangle,
      bgClass: "bg-yellow-500/10",
      borderClass: "border-yellow-500/30",
      iconClass: "text-yellow-600 dark:text-yellow-400",
      titleClass: "text-yellow-700 dark:text-yellow-300",
    },
    success: {
      icon: CheckCircle2,
      bgClass: "bg-green-500/10",
      borderClass: "border-green-500/30",
      iconClass: "text-green-600 dark:text-green-400",
      titleClass: "text-green-700 dark:text-green-300",
    },
    error: {
      icon: XCircle,
      bgClass: "bg-destructive/10",
      borderClass: "border-destructive/30",
      iconClass: "text-destructive",
      titleClass: "text-destructive",
    },
  }

  const { icon: Icon, bgClass, borderClass, iconClass, titleClass } = config[variant]

  return (
    <div
      className={cn(
        "rounded-lg border p-3 sm:p-4 my-3 sm:my-4",
        bgClass,
        borderClass,
        className
      )}
      role={variant === "error" || variant === "warning" ? "alert" : undefined}
    >
      <div className="flex gap-2 sm:gap-3">
        <Icon className={cn("h-5 w-5 flex-shrink-0 mt-0.5", iconClass)} />
        <div className="flex-1 min-w-0">
          {title && (
            <h4 className={cn("font-semibold text-sm sm:text-base mb-1", titleClass)}>
              {title}
            </h4>
          )}
          <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed break-words">
            {content}
          </p>
        </div>
      </div>
    </div>
  )
}
