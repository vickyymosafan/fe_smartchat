"use client"

import { useState } from "react"
import * as Checkbox from "@radix-ui/react-checkbox"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"
import type { TodoItem } from "../types"

interface TodoListProps {
  items: TodoItem[]
  className?: string
}

export default function TodoList({ items: initialItems, className }: TodoListProps) {
  const [items, setItems] = useState(initialItems)

  const handleToggle = (index: number) => {
    setItems(prev => prev.map((item, i) =>
      i === index ? { ...item, checked: !item.checked } : item
    ))
  }

  return (
    <div className={cn("my-2 sm:my-3 space-y-2 sm:space-y-2.5", className)}>
      {items.map((item, index) => (
        <div key={index} className="flex gap-2 sm:gap-3 items-start ml-1 sm:ml-2">
          <Checkbox.Root
            checked={item.checked}
            onCheckedChange={() => handleToggle(index)}
            className={cn(
              "flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded border-2 transition-colors mt-0.5",
              item.checked
                ? "bg-primary border-primary"
                : "border-muted-foreground/30 hover:border-muted-foreground/50"
            )}
            aria-label={`Todo: ${item.text}`}
          >
            <Checkbox.Indicator>
              <Check className="h-3 w-3 sm:h-4 sm:w-4 text-primary-foreground" />
            </Checkbox.Indicator>
          </Checkbox.Root>
          <span
            className={cn(
              "text-sm sm:text-base leading-relaxed break-words flex-1",
              item.checked
                ? "line-through text-muted-foreground"
                : "text-foreground"
            )}
          >
            {item.text}
          </span>
        </div>
      ))}
    </div>
  )
}
