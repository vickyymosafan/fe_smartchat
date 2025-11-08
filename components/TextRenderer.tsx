/**
 * TextRenderer Component
 * Render teks terstruktur ala ChatGPT
 */

"use client";

import { parseText, parseInlineFormatting, type ParsedBlock } from "@/lib/textParser";

interface TextRendererProps {
	content: string;
}

export function TextRenderer({ content }: TextRendererProps) {
	const blocks = parseText(content);

	return (
		<div className="space-y-3">
			{blocks.map((block, index) => (
				<BlockRenderer key={index} block={block} />
			))}
		</div>
	);
}

function BlockRenderer({ block }: { block: ParsedBlock }) {
	switch (block.type) {
		case "heading":
			return (
				<h3 className="text-xl font-bold text-neutral-900 mb-2">
					{block.content as string}
				</h3>
			);

		case "subheading":
			return (
				<h4 className="text-lg font-semibold text-neutral-800 mb-1.5">
					{block.content as string}
				</h4>
			);

		case "paragraph":
			return (
				<p className="text-[16px] leading-[1.7] text-neutral-900">
					{parseInlineFormatting(block.content as string)}
				</p>
			);

		case "numberedList":
			return (
				<ol className="list-decimal list-inside space-y-2 ml-2">
					{(block.content as string[]).map((item, i) => (
						<li key={i} className="text-[16px] leading-[1.7] text-neutral-900">
							{parseInlineFormatting(item.replace(/^\d+[.)]\s+/, ""))}
						</li>
					))}
				</ol>
			);

		case "bulletList":
			return (
				<ul className="space-y-2 ml-2">
					{(block.content as string[]).map((item, i) => (
						<li
							key={i}
							className="text-[16px] leading-[1.7] text-neutral-900 flex items-start gap-2"
						>
							<span className="text-neutral-600 mt-1">•</span>
							<span>{parseInlineFormatting(item.replace(/^[•]\s+/, ""))}</span>
						</li>
					))}
				</ul>
			);

		case "checklist":
			const checked = (block.content as string).includes("[x]");
			const text = (block.content as string).replace(/^\s*\[([ x])\]\s+/, "");
			return (
				<div className="flex items-start gap-2">
					<input
						type="checkbox"
						checked={checked}
						readOnly
						className="mt-1.5 w-4 h-4 rounded border-neutral-300"
					/>
					<span
						className={`text-[16px] leading-[1.7] ${checked ? "line-through text-neutral-500" : "text-neutral-900"}`}
					>
						{parseInlineFormatting(text)}
					</span>
				</div>
			);

		case "blockquote":
			return (
				<blockquote className="border-l-4 border-neutral-300 pl-4 italic text-neutral-700">
					{parseInlineFormatting(block.content as string)}
				</blockquote>
			);

		case "codeBlock":
			return (
				<pre className="bg-neutral-900 text-neutral-100 rounded-lg p-4 overflow-x-auto">
					<code className="text-sm font-mono">{block.content as string}</code>
				</pre>
			);

		case "table":
			return (
				<div className="overflow-x-auto">
					<table className="min-w-full border border-neutral-200 text-sm">
						<tbody>
							{(block.content as Array<{ isHeader: boolean; cells: string[] }>).map((row, i: number) => (
								<tr key={i} className={row.isHeader ? "bg-neutral-100" : ""}>
									{row.cells.map((cell: string, j: number) => {
										const Tag = row.isHeader ? "th" : "td";
										return (
											<Tag
												key={j}
												className="border border-neutral-200 px-3 py-2 text-left"
											>
												{cell}
											</Tag>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			);

		case "divider":
			return <hr className="border-t border-neutral-200 my-4" />;

		default:
			return null;
	}
}
