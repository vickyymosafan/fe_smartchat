/**
 * ChatContainer Component
 * Container utama untuk chat interface yang menggabungkan MessageList dan MessageInput
 */

"use client";

import { useChat } from "@/hooks/useChat";
import { MessageList } from "./MessageList";
import { MessageInput } from "./MessageInput";

/**
 * Component untuk container utama chat interface
 *
 * Responsibilities:
 * - Provide layout structure
 * - Apply max-width, padding, background
 * - Compose MessageList and MessageInput
 * - Use useChat hook for state management
 * - Provide semantic structure and accessibility
 *
 * @returns Chat container element with messages and input
 *
 * @example
 * <ChatContainer />
 */
export function ChatContainer() {
	// Use chat hook untuk state management
	const { messages, isLoading, sendMessage } = useChat();

	// Empty state check
	const isEmpty = messages.length === 0;

	return (
		<section
			className="w-full h-full bg-white rounded-2xl shadow-md flex flex-col overflow-hidden"
			role="region"
			aria-label="Area percakapan chat"
		>
			{/* Message list dengan auto-scroll atau empty state */}
			{isEmpty ? (
				<div className="flex-1 flex items-center justify-center px-6 py-8">
					<div className="max-w-md text-center space-y-6">
						<div className="space-y-2">
							<h3 className="text-2xl font-bold text-neutral-900">
								Mulai Percakapan
							</h3>
							<p className="text-base text-neutral-600 leading-relaxed">
								Tanyakan apa saja yang Anda butuhkan
							</p>
						</div>

						{/* Contoh prompt */}
						<div className="space-y-3">
							<p className="text-sm font-semibold text-neutral-700">
								Contoh pertanyaan:
							</p>
							<div className="space-y-2">
								{[
									"Apa Visi Misi dari Teknik Prodi Informatika?",
									"Minta contoh surat rasmi untuk kampus",
									"Siapa Kaprodi dari Teknik Prodi Mesin?",
								].map((example, index) => (
									<button
										key={index}
										onClick={() => sendMessage(example)}
										className="w-full text-left px-4 py-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl text-sm text-neutral-700 transition-colors duration-200 border border-neutral-200"
									>
										{example}
									</button>
								))}
							</div>
						</div>
					</div>
				</div>
			) : (
				<MessageList messages={messages} isLoading={isLoading} />
			)}

			{/* Input area untuk mengirim pesan - selalu menempel di bawah */}
			<MessageInput onSend={sendMessage} isLoading={isLoading} />
		</section>
	);
}
