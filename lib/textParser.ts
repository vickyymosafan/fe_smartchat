/**
 * Text Parser Utility
 * Parsing teks terstruktur untuk rendering ala ChatGPT
 * Mendukung heading, list, code, table, blockquote, dll
 */

import React from "react";

export interface ParsedBlock {
	type:
		| "heading"
		| "subheading"
		| "paragraph"
		| "numberedList"
		| "bulletList"
		| "checklist"
		| "blockquote"
		| "codeBlock"
		| "table"
		| "divider";
	content: string | string[] | TableRow[];
	language?: string; // untuk code block
	level?: number; // untuk nested list
}

export interface TableRow {
	cells: string[];
	isHeader?: boolean;
}

/**
 * Parse teks menjadi array of structured blocks
 */
export function parseText(text: string): ParsedBlock[] {
	const lines = text.split("\n");
	const blocks: ParsedBlock[] = [];
	let i = 0;

	while (i < lines.length) {
		const line = lines[i];

		// Skip empty lines
		if (line.trim() === "") {
			i++;
			continue;
		}

		// Divider: ---
		if (/^-{3,}$/.test(line.trim())) {
			blocks.push({ type: "divider", content: "" });
			i++;
			continue;
		}

		// Code block: ```
		if (line.trim().startsWith("```")) {
			const language = line.trim().slice(3).trim() || "text";
			const codeLines: string[] = [];
			i++;
			while (i < lines.length && !lines[i].trim().startsWith("```")) {
				codeLines.push(lines[i]);
				i++;
			}
			blocks.push({
				type: "codeBlock",
				content: codeLines.join("\n"),
				language,
			});
			i++; // skip closing ```
			continue;
		}

		// Blockquote: > text
		if (line.trim().startsWith("> ")) {
			blocks.push({
				type: "blockquote",
				content: line.trim().slice(2),
			});
			i++;
			continue;
		}

		// Table: | col1 | col2 |
		if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
			const tableRows: TableRow[] = [];
			while (
				i < lines.length &&
				lines[i].trim().startsWith("|") &&
				lines[i].trim().endsWith("|")
			) {
				const cells = lines[i]
					.trim()
					.slice(1, -1)
					.split("|")
					.map((c) => c.trim());
				const isHeader = i === 0 || /^[-:| ]+$/.test(lines[i]);
				if (!isHeader || i === 0) {
					tableRows.push({ cells, isHeader: i === 0 });
				}
				i++;
			}
			if (tableRows.length > 0) {
				blocks.push({ type: "table", content: tableRows });
			}
			continue;
		}

		// Checklist: [ ] or [x]
		if (/^\s*\[([ x])\]\s+/.test(line)) {
			blocks.push({ type: "checklist", content: line.trim() });
			i++;
			continue;
		}

		// Numbered list: 1. or 1) or just starting with number
		if (/^\s*\d+[.)]\s+/.test(line)) {
			const listItems: string[] = [];
			while (i < lines.length && /^\s*\d+[.)]\s+/.test(lines[i])) {
				// Remove leading whitespace and store the item
				listItems.push(lines[i].trim());
				i++;
			}
			blocks.push({ type: "numberedList", content: listItems });
			continue;
		}

		// Bullet list: •
		if (/^\s*[•]\s+/.test(line)) {
			const listItems: string[] = [];
			while (i < lines.length && /^\s*[•]\s+/.test(lines[i])) {
				listItems.push(lines[i].trim());
				i++;
			}
			blocks.push({ type: "bulletList", content: listItems });
			continue;
		}

		// Heading: ALL CAPS atau diikuti ===
		if (
			line === line.toUpperCase() &&
			line.length > 3 &&
			/[A-Z]/.test(line)
		) {
			blocks.push({ type: "heading", content: line.trim() });
			i++;
			continue;
		}

		// Subheading: ends with : atau starts with keywords
		if (
			line.trim().endsWith(":") ||
			/^(Ringkasan|Langkah|Catatan|Kesimpulan|Tujuan|Hasil)/i.test(
				line.trim(),
			)
		) {
			blocks.push({ type: "subheading", content: line.trim() });
			i++;
			continue;
		}

		// Default: paragraph
		blocks.push({ type: "paragraph", content: line.trim() });
		i++;
	}

	return blocks;
}

/**
 * Parse inline formatting (bold, italic, code, links)
 */
export function parseInlineFormatting(text: string): React.ReactNode[] {
	// Implementasi sederhana untuk inline code `code`
	const parts: React.ReactNode[] = [];
	const regex = /`([^`]+)`/g;
	let lastIndex = 0;
	let match;

	while ((match = regex.exec(text)) !== null) {
		// Add text before match
		if (match.index > lastIndex) {
			parts.push(text.slice(lastIndex, match.index));
		}
		// Add inline code
		parts.push(
			React.createElement(
				"code",
				{
					key: match.index,
					className:
						"px-1.5 py-0.5 bg-neutral-100 text-neutral-900 rounded text-sm font-mono",
				},
				match[1],
			),
		);
		lastIndex = regex.lastIndex;
	}

	// Add remaining text
	if (lastIndex < text.length) {
		parts.push(text.slice(lastIndex));
	}

	return parts.length > 0 ? parts : [text];
}
