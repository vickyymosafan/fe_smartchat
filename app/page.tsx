/**
 * Main Chat Page
 * Halaman utama aplikasi chat yang menampilkan ChatContainer
 */

"use client";

import React from "react";
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
import { useChat } from "@/hooks/useChat";
import { useToast } from "@/hooks/useToast";
import { ToastContainer } from "@/components/Toast";

export default function ChatPage() {
	const { resetChat } = useChat();
	const { toasts, showToast, removeToast } = useToast();

	const handleNewChat = () => {
		if (confirm("Mulai obrolan baru? Riwayat chat akan dihapus.")) {
			resetChat();
			showToast("Obrolan baru dimulai", "success");
		}
	};

	// Keyboard shortcuts
	const handleKeyDown = (e: KeyboardEvent) => {
		// Ctrl/Cmd + K untuk fokus input
		if ((e.ctrlKey || e.metaKey) && e.key === "k") {
			e.preventDefault();
			const textarea = document.querySelector("textarea");
			textarea?.focus();
		}
	};

	React.useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, []);

	return (
		<main className="h-screen flex flex-col bg-neutral-50 overflow-hidden">
			<h1 className="sr-only">Aplikasi Chat AI</h1>

			{/* Header */}
			<header className="flex-shrink-0 bg-white border-b border-neutral-200 px-4 py-3 sm:px-6 shadow-sm">
				<div className="max-w-[700px] mx-auto flex items-center justify-between">
					<h2 className="text-lg font-semibold text-neutral-900">Chat AI</h2>
					<button
						onClick={handleNewChat}
						className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 rounded px-3 py-1.5"
						aria-label="Mulai obrolan baru"
					>
						Obrolan Baru
					</button>
				</div>
			</header>

			{/* Chat container */}
			<div className="flex-1 flex items-center justify-center overflow-hidden px-4 sm:px-6 py-4">
				<div className="w-full max-w-[700px] h-full">
					<ChatContainer />
				</div>
			</div>

			{/* Toast notifications */}
			<ToastContainer toasts={toasts} onClose={removeToast} />
		</main>
	);
}
