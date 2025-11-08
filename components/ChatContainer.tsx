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
 *
 * @returns Chat container element with messages and input
 *
 * @example
 * <ChatContainer />
 */
export function ChatContainer() {
	// Use chat hook untuk state management
	const { messages, isLoading, sendMessage } = useChat();

	return (
		<div className="w-full max-w-[700px] h-[500px] sm:h-[550px] md:h-[600px] lg:h-[650px] bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden">
			{/* Message list dengan auto-scroll */}
			<MessageList messages={messages} isLoading={isLoading} />

			{/* Input area untuk mengirim pesan */}
			<MessageInput onSend={sendMessage} isLoading={isLoading} />
		</div>
	);
}
