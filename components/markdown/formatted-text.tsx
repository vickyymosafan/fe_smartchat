export default function FormattedText({ text }: { text: string }) {
	const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_|\[[^\]]+\]$[^)]+$)/g)

	return (
		<>
			{parts.map((part, idx) => {
				if (part.startsWith("**") && part.endsWith("**")) {
					return (
						<strong key={idx} className="font-bold text-foreground">
							{part.slice(2, -2)}
						</strong>
					)
				}

				if (part.startsWith("__") && part.endsWith("__")) {
					return (
						<strong key={idx} className="font-bold text-foreground">
							{part.slice(2, -2)}
						</strong>
					)
				}

				if (part.startsWith("*") && part.endsWith("*")) {
					return (
						<em key={idx} className="italic text-foreground/80">
							{part.slice(1, -1)}
						</em>
					)
				}

				if (part.startsWith("_") && part.endsWith("_")) {
					return (
						<em key={idx} className="italic text-foreground/80">
							{part.slice(1, -1)}
						</em>
					)
				}

				if (part.startsWith("[") && part.includes("](")) {
					const match = part.match(/\[([^\]]+)\]$([^)]+)$/)
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

				return (
					<span key={idx} className="text-foreground">
						{part}
					</span>
				)
			})}
		</>
	)
}
