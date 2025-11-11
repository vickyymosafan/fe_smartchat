/**
 * useSplashScreen hook
 * Separates splash screen storage logic from UI components
 * Handles splash screen state and persistence
 */

import { useState, useEffect } from "react"
import { SPLASH_SHOWN_KEY } from "@/lib/constants"
import { sessionStorageAdapter } from "@/lib/storage"

interface UseSplashScreenReturn {
	showSplash: boolean
	completeSplash: () => void
}

export function useSplashScreen(): UseSplashScreenReturn {
	const [showSplash, setShowSplash] = useState(true)

	useEffect(() => {
		const splashShown = sessionStorageAdapter.getItem(SPLASH_SHOWN_KEY)
		if (splashShown) {
			setShowSplash(false)
		}
	}, [])

	const completeSplash = () => {
		sessionStorageAdapter.setItem(SPLASH_SHOWN_KEY, "true")
		setShowSplash(false)
	}

	return {
		showSplash,
		completeSplash,
	}
}
