import ParsedText from "./parsed-text"

export default function MarkdownContent({ content }: { content: string }) {
	const parts = content.split(/(```[\s\S]*?```|`[^`]*`)/g)

	return (
		<>
			{parts.map((part, idx) => {
				if (part.startsWith("```")) {
					const codeContent = part.replace(/```[\w]*\n?/, "").replace(/```$/, "")
					return (
						<pre key={idx} className="bg-background/50 rounded p-2 sm:p-3 overflow-x-auto my-2 sm:my-3 border border-border">
							<code className="text-[10px] sm:text-xs md:text-sm font-mono text-foreground break-all">{codeContent}</code>
						</pre>
					)
				}

				if (part.startsWith("`") && part.endsWith("`")) {
					return (
						<code key={idx} className="bg-primary/20 px-1.5 py-0.5 sm:px-2 sm:py-1 rounded text-[10px] sm:text-xs font-mono break-all">
							{part.slice(1, -1)}
						</code>
					)
				}

				return <ParsedText key={idx} text={part} />
			})}
		</>
	)
}
