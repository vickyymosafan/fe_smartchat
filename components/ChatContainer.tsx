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
	const { messages, isLoading, sendMessage, retryLastMessage } = useChat();

	const handleExampleClick = (prompt: string) => {
		sendMessage(prompt);
	};

	return (
		<section
			className="w-full h-full bg-white rounded-2xl shadow-lg flex flex-col overflow-hidden border border-neutral-200"
			role="region"
			aria-label="Area percakapan chat"
		>
			{/* Message list dengan empty state, date separator, dan scroll behavior */}
			<MessageList
				messages={messages}
				isLoading={isLoading}
				onRetry={retryLastMessage}
				onExampleClick={handleExampleClick}
			/>

			{/* Input area - selalu menempel di bawah */}
			<MessageInput onSend={sendMessage} isLoading={isLoading} />
		</section>
	);
}
