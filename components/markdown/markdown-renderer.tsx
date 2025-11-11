/**
 * Simplified markdown renderer
 * Combines parsing and formatting logic for better cohesion
 */

interface MarkdownRendererProps {
	content: string
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
	// Split by code blocks first
	const parts = content.split(/(```[\s\S]*?```|`[^`]*`)/g)

	return (
		<>
			{parts.map((part, idx) => {
				// Code block
				if (part.startsWith("```")) {
					const codeContent = part.replace(/```[\w]*\n?/, "").replace(/```$/, "")
					return (
						<pre key={idx} className="bg-background/50 rounded p-2 sm:p-3 overflow-x-auto my-2 sm:my-3 border border-border">
							<code className="text-[10px] sm:text-xs md:text-sm font-mono text-foreground break-all">
								{codeContent}
							</code>
						</pre>
					)
				}

				// Inline code
				if (part.startsWith("`") && part.endsWith("`")) {
					return (
						<code key={idx} className="bg-primary/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-mono break-all">
							{part.slice(1, -1)}
						</code>
					)
				}

				// Parse text content
				return <TextContent key={idx} text={part} />
			})}
		</>
	)
}

function TextContent({ text }: { text: string }) {
	const lines = text.split("\n")
	const elements = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		// Headers
		if (line.startsWith("# ")) {
			elements.push(
				<div key={i} className="mt-3 mb-2 sm:mt-4 sm:mb-3">
					<h1 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground break-words">
						{line.slice(2)}
					</h1>
					<div className="h-px bg-gradient-to-r from-primary/50 to-transparent mt-1 sm:mt-2" />
				</div>
			)
			continue
		}

		if (line.startsWith("## ")) {
			elements.push(
				<div key={i} className="mt-2.5 mb-1.5 sm:mt-3 sm:mb-2">
					<h2 className="font-bold text-base sm:text-lg md:text-xl text-foreground break-words">
						{line.slice(3)}
					</h2>
					<div className="h-px bg-border mt-1" />
				</div>
			)
			continue
		}

		if (line.startsWith("### ")) {
			elements.push(
				<h3 key={i} className="font-semibold text-sm sm:text-base md:text-lg text-foreground mt-2 mb-1 break-words">
					{line.slice(4)}
				</h3>
			)
			continue
		}

		// Lists
		if (line.match(/^\d+\.\s+/)) {
			const match = line.match(/^(\d+)\.\s+(.+)$/)
			if (match) {
				elements.push(
					<div key={i} className="flex gap-2 sm:gap-3 ml-1 sm:ml-2 my-0.5 sm:my-1">
						<span className="font-semibold text-primary min-w-4 sm:min-w-6 text-xs sm:text-sm">
							{match[1]}.
						</span>
						<p className="flex-1 leading-relaxed break-words">
							<FormattedText text={match[2]} />
						</p>
					</div>
				)
			}
			continue
		}

		if (line.startsWith("- ")) {
			elements.push(
				<div key={i} className="flex gap-2 sm:gap-3 ml-1 sm:ml-2 my-0.5 sm:my-1">
					<span className="text-primary font-bold text-xs sm:text-sm">•</span>
					<p className="flex-1 leading-relaxed break-words">
						<FormattedText text={line.slice(2)} />
					</p>
				</div>
			)
			continue
		}

		// Blockquote
		if (line.startsWith("> ")) {
			elements.push(
				<blockquote
					key={i}
					className="border-l-2 sm:border-l-4 border-primary bg-primary/5 pl-2 sm:pl-4 py-1.5 sm:py-2 my-1.5 sm:my-2 rounded italic text-muted-foreground text-xs sm:text-sm break-words"
				>
					<FormattedText text={line.slice(2)} />
				</blockquote>
			)
			continue
		}

		// Horizontal rule
		if (line.trim() === "---" || line.trim() === "***") {
			elements.push(
				<div key={i} className="my-2 sm:my-3">
					<div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
				</div>
			)
			continue
		}

		// Empty line
		if (line.trim() === "") {
			elements.push(<div key={i} className="h-1.5 sm:h-2" />)
			continue
		}

		// Regular paragraph
		elements.push(
			<p key={i} className="mb-1.5 sm:mb-2 leading-relaxed text-foreground break-words">
				<FormattedText text={line} />
			</p>
		)
	}

	return <>{elements}</>
}

function FormattedText({ text }: { text: string }) {
	const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g)

	return (
		<>
			{parts.map((part, idx) => {
				// Bold
				if (part.startsWith("**") && part.endsWith("**")) {
					return (
						<strong key={idx} className="font-bold text-foreground">
							{part.slice(2, -2)}
						</strong>
					)
				}

				// Italic
				if (part.startsWith("*") && part.endsWith("*")) {
					return (
						<em key={idx} className="italic text-foreground/80">
							{part.slice(1, -1)}
						</em>
					)
				}

				// Link
				if (part.startsWith("[") && part.includes("](")) {
					const match = part.match(/\[([^\]]+)\]\(([^)]+)\)/)
					if (match) {
						return (
							<a
								key={idx}
								href={match[2]}
								className="text-primary underline hover:text-primary/80 transition-colors"
								target="_blank"
								rel="noopener noreferrer"
							>
								{match[1]}
							</a>
						)
					}
				}

				return <span key={idx}>{part}</span>
			})}
		</>
	)
}
