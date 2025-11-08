/**
 * ScrollToBottom Component
 * Tombol untuk scroll ke bawah ketika user scroll ke atas
 */

"use client";

import { useEffect, useState } from "react";

interface ScrollToBottomProps {
	/** Ref ke scroll container */
	scrollRef: React.RefObject<HTMLDivElement>;
	/** Jumlah pesan untuk trigger visibility */
	messageCount: number;
}

/**
 * Component untuk tombol scroll to bottom
 *
 * @param props - ScrollToBottomProps
 * @returns Floating scroll button
 */
export function ScrollToBottom({ scrollRef, messageCount }: ScrollToBottomProps) {
	const [showButton, setShowButton] = useState(false);

	useEffect(() => {
		const container = scrollRef.current;
		if (!container) return;

		const handleScroll = () => {
			// Show button jika user scroll ke atas (tidak di bottom)
			const isAtBottom =
				container.scrollHeight - container.scrollTop - container.clientHeight < 100;
			setShowButton(!isAtBottom && messageCount > 3);
		};

		container.addEventListener("scroll", handleScroll);
		handleScroll(); // Check initial state

		return () => container.removeEventListener("scroll", handleScroll);
	}, [scrollRef, messageCount]);

	const scrollToBottom = () => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			});
		}
	};

	if (!showButton) return null;

	return (
		<button
			onClick={scrollToBottom}
			className="absolute bottom-24 right-6 p-3 bg-white border border-neutral-300 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 z-10"
			aria-label="Scroll ke bawah"
			title="Pesan baru"
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
		</button>
	);
}
