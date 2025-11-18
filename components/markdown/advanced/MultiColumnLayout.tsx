import { cn } from "@/lib/utils"
import type { ColumnCount, MarkdownElement } from "../types"

interface MultiColumnLayoutProps {
  columns: ColumnCount
  content: MarkdownElement[][]
  className?: string
  renderElement: (element: MarkdownElement, index: number) => React.ReactNode
}

export default function MultiColumnLayout({
  columns,
  content,
  className,
  renderElement,
}: MultiColumnLayoutProps) {
  const gridClasses = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5",
  }

  return (
    <div
      className={cn(
        "grid gap-3 sm:gap-4 md:gap-6 my-3 sm:my-4",
        gridClasses[columns],
        className
      )}
    >
      {content.map((columnContent, columnIndex) => (
        <div
          key={columnIndex}
          className="space-y-2 sm:space-y-3 p-3 sm:p-4 rounded-lg border border-border bg-card"
        >
          {columnContent.map((element, elementIndex) =>
            renderElement(element, elementIndex)
          )}
        </div>
      ))}
    </div>
  )
}
