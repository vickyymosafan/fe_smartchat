/**
 * TypingIndicator Component
 * Menampilkan animasi tiga titik untuk indikasi AI sedang mengetik
 */

"use client";

/**
 * Component untuk menampilkan typing indicator
 *
 * Responsibilities:
 * - Render three animated dots
 * - Apply consistent styling with AI messages
 * - Create smooth wave animation effect
 * - Provide accessibility for screen readers
 *
 * @returns Animated typing indicator element
 *
 * @example
 * {isLoading && <TypingIndicator />}
 */
export function TypingIndicator() {
	return (
		<div
			className="flex justify-start"
			role="status"
			aria-live="polite"
			aria-label="AI sedang mengetik"
		>
			<div className="bg-neutral-50 border border-neutral-200 rounded-2xl px-4 py-3 shadow-sm">
				<div className="flex gap-1.5" aria-hidden="true">
					<span
						className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
						style={{ animationDelay: "0ms" }}
					/>
					<span
						className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
						style={{ animationDelay: "150ms" }}
					/>
					<span
						className="w-2 h-2 bg-neutral-500 rounded-full animate-bounce"
						style={{ animationDelay: "300ms" }}
					/>
				</div>
				<span className="sr-only">AI sedang mengetik balasan</span>
			</div>
		</div>
	);
}
