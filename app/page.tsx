/**
 * Main Chat Page
 * Halaman utama aplikasi chat yang menampilkan ChatContainer
 */

"use client";

import { ChatContainer } from "@/components/ChatContainer";

/**
 * Component untuk halaman chat utama
 *
 * Responsibilities:
 * - Mark as "use client" untuk client-side rendering
 * - Render ChatContainer component
 * - Provide page-level structure dengan centered layout
 * - Apply background color dan padding
 * - Provide semantic structure and accessibility
 *
 * @returns Chat page dengan container yang ter-center
 *
 * @example
 * // Digunakan sebagai default export untuk app/page.tsx
 * export default function ChatPage()
 */
export default function ChatPage() {
	return (
		<main className="h-screen flex flex-col bg-neutral-50 overflow-hidden">
			{/* Page title untuk screen readers */}
			<h1 className="sr-only">Aplikasi Chat AI</h1>

			{/* Header tipis */}
			<header className="flex-shrink-0 bg-white border-b border-neutral-200 px-4 py-3 sm:px-6">
				<div className="max-w-[700px] mx-auto flex items-center justify-between">
					<h2 className="text-lg font-semibold text-neutral-900">Chat AI</h2>
					<button
						className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200"
						aria-label="Mulai obrolan baru"
					>
						Obrolan Baru
					</button>
				</div>
			</header>

			{/* Chat container - full height */}
			<div className="flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-6 py-4">
				<div className="w-full max-w-[700px] h-full">
					<ChatContainer />
				</div>
			</div>
		</main>
	);
}
