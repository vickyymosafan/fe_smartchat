import { cn } from "@/lib/utils"

interface BulletedListProps {
  items: string[]
  className?: string
}

export default function BulletedList({ items, className }: BulletedListProps) {
  return (
    <ul className={cn("my-2 sm:my-3 space-y-1.5 sm:space-y-2", className)}>
      {items.map((item, index) => (
        <li key={index} className="flex gap-2 sm:gap-3 ml-1 sm:ml-2">
          <span className="text-primary font-bold text-sm sm:text-base flex-shrink-0 mt-0.5">
            •
          </span>
          <span className="text-sm sm:text-base text-foreground leading-relaxed break-words flex-1">
            {item}
          </span>
        </li>
      ))}
    </ul>
  )
}
