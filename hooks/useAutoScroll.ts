/**
 * Custom Hook untuk Auto-Scroll Behavior
 * Otomatis scroll ke bawah ketika ada pesan baru
 */

"use client";

import { useRef, useEffect, useState } from "react";
import type { ChatMessage } from "@/types/chat";

/**
 * Return type untuk useAutoScroll hook
 */
interface UseAutoScrollReturn {
	scrollRef: React.RefObject<HTMLDivElement | null>;
	isAtBottom: boolean;
}

/**
 * Custom hook untuk mengelola automatic scrolling ke pesan terbaru
 *
 * Responsibilities:
 * - Create ref for scroll container
 * - Scroll to bottom when messages change
 * - Smooth scroll behavior
 *
 * @param messages - Array of chat messages yang akan di-monitor
 * @returns Object berisi scrollRef untuk di-attach ke scroll container
 *
 * @example
 * const { scrollRef } = useAutoScroll(messages);
 *
 * return (
 *   <div ref={scrollRef} className="overflow-y-auto">
 *     {messages.map(msg => <ChatBubble key={msg.id} message={msg} />)}
 *   </div>
 * );
 */
export function useAutoScroll(messages: ChatMessage[]): UseAutoScrollReturn {
	// Create ref untuk scroll container
	const scrollRef = useRef<HTMLDivElement>(null);
	const [isAtBottom, setIsAtBottom] = useState(true);

	// Check if user is at bottom
	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const handleScroll = () => {
			const threshold = 100;
			const atBottom =
				container.scrollHeight - container.scrollTop - container.clientHeight <
				threshold;
			setIsAtBottom(atBottom);
		};

		container.addEventListener("scroll", handleScroll);
		handleScroll();

		return () => container.removeEventListener("scroll", handleScroll);
	}, []);

	// Auto scroll hanya jika user di bottom
	useEffect(() => {
		if (scrollRef.current && isAtBottom) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages, isAtBottom]);

	return {
		scrollRef,
		isAtBottom,
	};
}
