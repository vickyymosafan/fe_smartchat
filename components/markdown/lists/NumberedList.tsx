import { cn } from "@/lib/utils"

interface NumberedListProps {
  items: string[]
  start?: number
  className?: string
}

export default function NumberedList({ items, start = 1, className }: NumberedListProps) {
  return (
    <ol className={cn("my-2 sm:my-3 space-y-1.5 sm:space-y-2", className)} start={start}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 sm:gap-3 ml-1 sm:ml-2">
          <span className="font-semibold text-primary text-sm sm:text-base flex-shrink-0 min-w-[1.5rem] sm:min-w-[2rem]">
            {start + index}.
          </span>
          <span className="text-sm sm:text-base text-foreground leading-relaxed break-words flex-1">
            {item}
          </span>
        </li>
      ))}
    </ol>
  )
}
