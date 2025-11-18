"use client"

import { useState } from "react"
import * as Collapsible from "@radix-ui/react-collapsible"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"
import type { MarkdownElement } from "../types"

interface ToggleBlockProps {
  title: string
  content: MarkdownElement[]
  defaultOpen?: boolean
  className?: string
  renderElement: (element: MarkdownElement, index: number) => React.ReactNode
}

export default function ToggleBlock({
  title,
  content,
  defaultOpen = false,
  className,
  renderElement,
}: ToggleBlockProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  return (
    <Collapsible.Root
      open={isOpen}
      onOpenChange={setIsOpen}
      className={cn("my-3 sm:my-4 rounded-lg border border-border bg-card", className)}
    >
      <Collapsible.Trigger
        className="flex w-full items-center gap-2 px-3 py-2.5 sm:px-4 sm:py-3 text-left hover:bg-accent/50 transition-colors rounded-lg"
        aria-expanded={isOpen}
      >
        <ChevronRight
          className={cn(
            "h-4 w-4 sm:h-5 sm:w-5 text-muted-foreground transition-transform flex-shrink-0",
            isOpen && "rotate-90"
          )}
        />
        <span className="text-sm sm:text-base font-medium text-foreground flex-1 break-words">
          {title}
        </span>
      </Collapsible.Trigger>

      <Collapsible.Content className="overflow-hidden data-[state=closed]:animate-[collapsible-up_200ms_ease-out] data-[state=open]:animate-[collapsible-down_200ms_ease-out]">
        <div className="px-3 pb-3 sm:px-4 sm:pb-4 pt-1 border-t border-border">
          {content.map((element, index) => renderElement(element, index))}
        </div>
      </Collapsible.Content>
    </Collapsible.Root>
  )
}
