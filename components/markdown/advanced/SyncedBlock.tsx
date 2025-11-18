import { cn } from "@/lib/utils"
import { Link2 } from "lucide-react"
import type { MarkdownElement } from "../types"

interface SyncedBlockProps {
  id: string
  content: MarkdownElement[]
  className?: string
  renderElement: (element: MarkdownElement, index: number) => React.ReactNode
}

export default function SyncedBlock({
  id,
  content,
  className,
  renderElement,
}: SyncedBlockProps) {
  return (
    <div
      className={cn(
        "my-3 sm:my-4 rounded-lg border-2 border-dashed border-primary/30 bg-primary/5 p-3 sm:p-4",
        className
      )}
    >
      {/* Synced Block Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-primary/20">
        <Link2 className="h-4 w-4 text-primary" />
        <span className="text-xs sm:text-sm font-medium text-primary">
          Synced Block: {id}
        </span>
      </div>

      {/* Content */}
      <div className="space-y-2">
        {content.map((element, index) => renderElement(element, index))}
      </div>
    </div>
  )
}
