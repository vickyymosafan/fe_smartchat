"use client"

import { useRef, useEffect } from "react"
import type { ChatMessage } from "@/types/chat"

interface UseAutoScrollReturn {
	scrollRef: React.RefObject<HTMLDivElement | null>
}

export function useAutoScroll(messages: ChatMessage[]): UseAutoScrollReturn {
	const scrollRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (scrollRef.current) {
			scrollRef.current.scrollTo({
				top: scrollRef.current.scrollHeight,
				behavior: "smooth",
			})
		}
	}, [messages])

	return {
		scrollRef,
	}
}
