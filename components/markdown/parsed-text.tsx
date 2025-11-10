import FormattedText from "./formatted-text"

export default function ParsedText({ text }: { text: string }) {
	const lines = text.split("\n")
	const elements = []

	for (let i = 0; i < lines.length; i++) {
		const line = lines[i]

		if (line.startsWith("# ")) {
			elements.push(
				<div key={i} className="mt-3 mb-2 sm:mt-4 sm:mb-3">
					<h1 className="font-bold text-lg sm:text-xl md:text-2xl text-foreground break-words">{line.slice(2)}</h1>
					<div className="h-px bg-gradient-to-r from-primary/50 to-transparent mt-1 sm:mt-2" />
				</div>,
			)
			continue
		}

		if (line.startsWith("## ")) {
			elements.push(
				<div key={i} className="mt-2.5 mb-1.5 sm:mt-3 sm:mb-2">
					<h2 className="font-bold text-base sm:text-lg md:text-xl text-foreground break-words">{line.slice(3)}</h2>
					<div className="h-px bg-border mt-1" />
				</div>,
			)
			continue
		}

		if (line.startsWith("### ")) {
			elements.push(
				<h3 key={i} className="font-semibold text-sm sm:text-base md:text-lg text-foreground mt-2 mb-1 break-words">
					{line.slice(4)}
				</h3>,
			)
			continue
		}

		if (line.startsWith("#### ")) {
			elements.push(
				<h4 key={i} className="font-semibold text-xs sm:text-sm md:text-base text-foreground/90 mt-1 mb-1 break-words">
					{line.slice(5)}
				</h4>,
			)
			continue
		}

		if (line.match(/^\d+\.\s+/)) {
			const match = line.match(/^(\d+)\.\s+(.+)$/)
			if (match) {
				elements.push(
					<div key={i} className="flex gap-2 sm:gap-3 ml-1 sm:ml-2 my-0.5 sm:my-1">
						<span className="font-semibold text-primary min-w-4 sm:min-w-6 text-xs sm:text-sm">{match[1]}.</span>
						<p className="flex-1 leading-relaxed break-words">
							<FormattedText text={match[2]} />
						</p>
					</div>,
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
				</div>,
			)
			continue
		}

		if (line.startsWith("> ")) {
			elements.push(
				<blockquote
					key={i}
					className="border-l-2 sm:border-l-4 border-primary bg-primary/5 pl-2 sm:pl-4 py-1.5 sm:py-2 my-1.5 sm:my-2 rounded italic text-muted-foreground text-xs sm:text-sm break-words"
				>
					<FormattedText text={line.slice(2)} />
				</blockquote>,
			)
			continue
		}

		if (line.trim() === "---" || line.trim() === "***" || line.trim() === "___") {
			elements.push(
				<div key={i} className="my-2 sm:my-3">
					<div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
				</div>,
			)
			continue
		}

		if (line.trim() === "") {
			elements.push(<div key={i} className="h-1.5 sm:h-2" />)
			continue
		}

		elements.push(
			<p key={i} className="mb-1.5 sm:mb-2 leading-relaxed text-foreground break-words">
				<FormattedText text={line} />
			</p>,
		)
	}

	return <>{elements}</>
}
