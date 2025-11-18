/**
 * Type definitions for AI Response Markdown System
 * Comprehensive markdown element types for structured content rendering
 */

export type HeadingLevel = 1 | 2 | 3

export type TextVariant = "default" | "muted" | "subtle"

export type CalloutVariant = "info" | "warning" | "success" | "error"

export type ColumnCount = 2 | 3 | 4 | 5

export interface HeadingElement {
  type: "heading"
  level: HeadingLevel
  content: string
}

export interface TextElement {
  type: "text"
  content: string
  variant?: TextVariant
}

export interface CodeBlockElement {
  type: "code"
  language: string
  code: string
}

export interface QuoteElement {
  type: "quote"
  content: string
  author?: string
}

export interface CalloutElement {
  type: "callout"
  variant: CalloutVariant
  content: string
  title?: string
}

export interface BulletedListElement {
  type: "bulleted-list"
  items: string[]
}

export interface NumberedListElement {
  type: "numbered-list"
  items: string[]
  start?: number
}

export interface TodoItem {
  text: string
  checked: boolean
}

export interface TodoListElement {
  type: "todo-list"
  items: TodoItem[]
}

export interface ToggleBlockElement {
  type: "toggle"
  title: string
  content: MarkdownElement[]
  defaultOpen?: boolean
}

export interface TableElement {
  type: "table"
  headers: string[]
  rows: string[][]
}

export interface EquationElement {
  type: "equation"
  formula: string
  inline?: boolean
}

export interface MultiColumnElement {
  type: "multi-column"
  columns: ColumnCount
  content: MarkdownElement[][]
}

export interface SyncedBlockElement {
  type: "synced-block"
  id: string
  content: MarkdownElement[]
}

export type MarkdownElement =
  | HeadingElement
  | TextElement
  | CodeBlockElement
  | QuoteElement
  | CalloutElement
  | BulletedListElement
  | NumberedListElement
  | TodoListElement
  | ToggleBlockElement
  | TableElement
  | EquationElement
  | MultiColumnElement
  | SyncedBlockElement
