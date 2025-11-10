/**
 * useResponsiveSidebar hook
 * Separates responsive sidebar logic from UI components
 * Handles window resize events and sidebar state management
 */

import { useState, useEffect } from "react"

interface UseResponsiveSidebarProps {
	breakpoint?: number
	defaultOpen?: boolean
}

interface UseResponsiveSidebarReturn {
	isOpen: boolean
	toggle: () => void
	open: () => void
	close: () => void
}

export function useResponsiveSidebar({
	breakpoint = 768,
	defaultOpen = false,
}: UseResponsiveSidebarProps = {}): UseResponsiveSidebarReturn {
	const [isOpen, setIsOpen] = useState(defaultOpen)

	useEffect(() => {
		const handleResize = () => {
			setIsOpen(window.innerWidth >= breakpoint)
		}

		// Set initial state
		handleResize()

		// Listen to resize events
		window.addEventListener("resize", handleResize)
		return () => window.removeEventListener("resize", handleResize)
	}, [breakpoint])

	const toggle = () => setIsOpen((prev) => !prev)
	const open = () => setIsOpen(true)
	const close = () => setIsOpen(false)

	return {
		isOpen,
		toggle,
		open,
		close,
	}
}
