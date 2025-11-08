/**
 * MessageList Component
 * Menampilkan daftar pesan chat dengan auto-scroll dan typing indicator
 */

"use client";

import type { ChatMessage } from "@/types/chat";
import { ChatBubble } from "./ChatBubble";
import { TypingIndicator } from "./TypingIndicator";
import { DateSeparator } from "./DateSeparator";
import { EmptyState } from "./EmptyState";
import { useAutoScroll } from "@/hooks/useAutoScroll";
import { useScrollPosition } from "@/hooks/useScrollPosition";
import { formatDateSeparator, isSameDay } from "@/lib/dateUtils";

/**
 * Props untuk MessageList component
 */
interface MessageListProps {
	/** Array of chat messages yang akan ditampilkan */
	messages: ChatMessage[];

	/** Status loading untuk menampilkan typing indicator */
	isLoading: boolean;

	/** Callback untuk retry message */
	onRetry?: () => void;

	/** Callback untuk example prompt click */
	onExampleClick?: (prompt: string) => void;
}

/**
 * Component untuk menampilkan list of messages
 *
 * Responsibilities:
 * - Render array of messages
 * - Apply consistent spacing
 * - Show typing indicator when loading
 * - Use useAutoScroll hook for automatic scrolling
 * - Implement ARIA live region for accessibility
 *
 * @param props - MessageListProps berisi messages dan isLoading
 * @returns Message list element with auto-scroll
 *
 * @example
 * <MessageList messages={messages} isLoading={isLoading} />
 */
export function MessageList({
	messages,
	isLoading,
	onRetry,
	onExampleClick,
}: MessageListProps) {
	const { scrollRef } = useAutoScroll(messages);
	const { hasNewMessage, scrollToBottom } = useScrollPosition(
		scrollRef,
		messages.length,
	);

	// Cari index pesan user terakhir
	const lastUserMessageIndex = messages
		.map((m, i) => (m.role === "user" ? i : -1))
		.filter((i) => i !== -1)
		.pop();

	// Empty state
	if (messages.length === 0 && !isLoading) {
		return (
			<div className="flex-1 overflow-hidden">
				<EmptyState onExampleClick={onExampleClick || (() => {})} />
			</div>
		);
	}

	return (
		<div className="flex-1 relative overflow-hidden">
			<div
				ref={scrollRef}
				role="log"
				aria-live="polite"
				aria-atomic="false"
				aria-relevant="additions"
				className="h-full overflow-y-auto px-4 py-4 sm:px-5 sm:py-5 md:px-6 md:py-6 scroll-smooth"
			>
				<div className="space-y-3">
					{messages.map((message, index) => {
						// Cek apakah perlu date separator
						const showDateSeparator =
							index === 0 ||
							!isSameDay(message.timestamp, messages[index - 1].timestamp);

						const isLastUserMessage = index === lastUserMessageIndex;

						return (
							<div key={message.id}>
								{/* Date separator */}
								{showDateSeparator && (
									<DateSeparator label={formatDateSeparator(message.timestamp)} />
								)}

								{/* Message bubble */}
								<div
									role="article"
									aria-label={`Pesan dari ${message.role}`}
									className="animate-fadeIn"
								>
									<ChatBubble
										message={message}
										onRetry={isLastUserMessage ? onRetry : undefined}
										isLastUserMessage={isLastUserMessage}
									/>
								</div>
							</div>
						);
					})}

					{/* Typing indicator */}
					{isLoading && (
						<div className="animate-fadeIn">
							<TypingIndicator />
						</div>
					)}
				</div>
			</div>

			{/* Scroll to bottom button dengan badge */}
			{hasNewMessage && (
				<button
					onClick={scrollToBottom}
					className="absolute bottom-6 right-6 p-3 bg-white border border-neutral-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 z-10"
					aria-label="Scroll ke bawah - Pesan baru"
				>
					<svg
						className="w-5 h-5 text-neutral-700"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M19 14l-7 7m0 0l-7-7m7 7V3"
						/>
					</svg>
					<span className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
					<span className="absolute -top-8 right-0 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
						Pesan baru
					</span>
				</button>
			)}
		</div>
	);
}
