import { cn } from "@/lib/utils"

interface MarkdownTableProps {
  headers: string[]
  rows: string[][]
  className?: string
}

export default function MarkdownTable({ headers, rows, className }: MarkdownTableProps) {
  return (
    <div className={cn("my-3 sm:my-4 rounded-lg border border-border overflow-hidden", className)}>
      <div className="overflow-x-auto relative">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-muted/50 border-b border-border">
              {headers.map((header, index) => (
                <th
                  key={index}
                  className="px-3 py-2 sm:px-4 sm:py-3 text-left font-semibold text-foreground text-xs sm:text-sm whitespace-normal sm:whitespace-nowrap"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn(
                  "border-b border-border last:border-0 transition-colors",
                  rowIndex % 2 === 0 ? "bg-card" : "bg-muted/20",
                  "hover:bg-accent/30"
                )}
              >
                {row.map((cell, cellIndex) => (
                  <td
                    key={cellIndex}
                    className="px-3 py-2 sm:px-4 sm:py-3 text-foreground/90 text-[13px] sm:text-sm break-words leading-relaxed"
                  >
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        {/* Scroll indicator */}
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-card/80 to-transparent pointer-events-none sm:hidden" />
      </div>
    </div>
  )
}
