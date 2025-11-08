/**
 * DateSeparator Component
 * Separator tanggal antar pesan
 */

"use client";

interface DateSeparatorProps {
	label: string;
}

export function DateSeparator({ label }: DateSeparatorProps) {
	return (
		<div className="flex items-center justify-center my-6" role="separator">
			<div className="flex-1 border-t border-neutral-200" />
			<span className="px-4 text-xs font-medium text-neutral-500 uppercase tracking-wide">
				{label}
			</span>
			<div className="flex-1 border-t border-neutral-200" />
		</div>
	);
}
