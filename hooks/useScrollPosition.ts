/**
 * Scroll Position Hook
 * Deteksi posisi scroll dan badge "Pesan baru"
 */

"use client";

import { useState, useEffect, useCallback } from "react";

export function useScrollPosition(
	scrollRef: React.RefObject<HTMLDivElement | null>,
	messageCount: number,
) {
	const [isAtBottom, setIsAtBottom] = useState(true);
	const [hasNewMessage, setHasNewMessage] = useState(false);
	const [lastMessageCount, setLastMessageCount] = useState(messageCount);

	const checkScrollPosition = useCallback(() => {
		const container = scrollRef.current;
		if (!container) return;

		const threshold = 100;
		const atBottom =
			container.scrollHeight - container.scrollTop - container.clientHeight <
			threshold;

		setIsAtBottom(atBottom);

		// Reset badge jika user scroll ke bawah
		if (atBottom) {
			setHasNewMessage(false);
		}
	}, [scrollRef]);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		container.addEventListener("scroll", checkScrollPosition);
		checkScrollPosition();

		return () => container.removeEventListener("scroll", checkScrollPosition);
	}, [scrollRef, checkScrollPosition]);

	// Deteksi pesan baru
	useEffect(() => {
		if (messageCount > lastMessageCount && !isAtBottom) {
			setHasNewMessage(true);
		}
		setLastMessageCount(messageCount);
	}, [messageCount]); // eslint-disable-line react-hooks/exhaustive-deps

	const scrollToBottom = useCallback(() => {
		const container = scrollRef.current;
		if (!container) return;

		container.scrollTo({
			top: container.scrollHeight,
			behavior: "smooth",
		});
		setHasNewMessage(false);
	}, [scrollRef]);

	return {
		isAtBottom,
		hasNewMessage,
		scrollToBottom,
	};
}
