/**
 * useMobile hook
 * Detects if the current device is mobile based on screen width
 * Uses 768px as the breakpoint (matches Tailwind's md breakpoint)
 */

import { useState, useEffect } from "react"

export function useMobile(breakpoint: number = 768): boolean {
	const [isMobile, setIsMobile] = useState(false)

	useEffect(() => {
		const checkMobile = () => {
			setIsMobile(window.innerWidth < breakpoint)
		}

		// Set initial state
		checkMobile()

		// Listen to resize events
		window.addEventListener("resize", checkMobile)
		return () => window.removeEventListener("resize", checkMobile)
	}, [breakpoint])

	return isMobile
}
