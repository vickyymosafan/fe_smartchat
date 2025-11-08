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
 *
 * @returns Chat page dengan container yang ter-center
 *
 * @example
 * // Digunakan sebagai default export untuk app/page.tsx
 * export default function ChatPage()
 */
export default function ChatPage() {
	return (
		<div className="min-h-screen flex items-center justify-center bg-neutral-50 p-4">
			<ChatContainer />
		</div>
	);
}
