/**
 * @deprecated Use MarkdownRenderer instead
 * Kept for backward compatibility
 */
import MarkdownRenderer from "./markdown-renderer"

export default function MarkdownContent({ content }: { content: string }) {
	return <MarkdownRenderer content={content} />
}
