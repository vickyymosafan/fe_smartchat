"use client"

import { cn } from "@/lib/utils"
import type { MarkdownElement } from "./types"

// Core Components
import Heading from "./core/Heading"
import Text from "./core/Text"
import CodeBlock from "./core/CodeBlock"
import Quote from "./core/Quote"
import Callout from "./core/Callout"

// List Components
import BulletedList from "./lists/BulletedList"
import NumberedList from "./lists/NumberedList"
import TodoList from "./lists/TodoList"
import ToggleBlock from "./lists/ToggleBlock"

// Advanced Components
import MarkdownTable from "./advanced/MarkdownTable"
import EquationBlock from "./advanced/EquationBlock"
import MultiColumnLayout from "./advanced/MultiColumnLayout"
import SyncedBlock from "./advanced/SyncedBlock"

interface AIResponseProps {
  elements: MarkdownElement[]
  className?: string
}

export default function AIResponse({ elements, className }: AIResponseProps) {
  const renderElement = (element: MarkdownElement, index: number): React.ReactNode => {
    const key = `element-${index}`

    switch (element.type) {
      case "heading":
        return <Heading key={key} level={element.level} content={element.content} />

      case "text":
        return <Text key={key} content={element.content} variant={element.variant} />

      case "code":
        return <CodeBlock key={key} language={element.language} code={element.code} />

      case "quote":
        return <Quote key={key} content={element.content} author={element.author} />

      case "callout":
        return (
          <Callout
            key={key}
            variant={element.variant}
            content={element.content}
            title={element.title}
          />
        )

      case "bulleted-list":
        return <BulletedList key={key} items={element.items} />

      case "numbered-list":
        return (
          <NumberedList key={key} items={element.items} start={element.start} />
        )

      case "todo-list":
        return <TodoList key={key} items={element.items} />

      case "toggle":
        return (
          <ToggleBlock
            key={key}
            title={element.title}
            content={element.content}
            defaultOpen={element.defaultOpen}
            renderElement={renderElement}
          />
        )

      case "table":
        return (
          <MarkdownTable key={key} headers={element.headers} rows={element.rows} />
        )

      case "equation":
        return (
          <EquationBlock key={key} formula={element.formula} inline={element.inline} />
        )

      case "multi-column":
        return (
          <MultiColumnLayout
            key={key}
            columns={element.columns}
            content={element.content}
            renderElement={renderElement}
          />
        )

      case "synced-block":
        return (
          <SyncedBlock
            key={key}
            id={element.id}
            content={element.content}
            renderElement={renderElement}
          />
        )

      default:
        return null
    }
  }

  return (
    <div className={cn("space-y-1", className)}>
      {elements.map((element, index) => renderElement(element, index))}
    </div>
  )
}
