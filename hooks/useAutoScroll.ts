/**
 * Custom Hook untuk Auto-Scroll Behavior
 * Otomatis scroll ke bawah ketika ada pesan baru
 */

"use client";

import { useRef, useEffect } from "react";
import type { ChatMessage } from "@/types/chat";

/**
 * Return type untuk useAutoScroll hook
 */
interface UseAutoScrollReturn {
	scrollRef: React.RefObject<HTMLDivElement | null>;
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

	// Auto scroll ke bottom saat ada pesan baru
	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	}, [messages]);

	return {
		scrollRef,
	};
}
