/**
 * PWA Install Hook
 * Manage PWA installation state and logic
 */

"use client"

import { useState, useEffect } from "react"

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

type DeviceType = "android" | "ios" | "desktop" | "unknown"

interface UsePWAInstallReturn {
	canInstall: boolean
	isInstalled: boolean
	deviceType: DeviceType
	showInstallPrompt: () => void
	installPWA: () => Promise<void>
	dismissPrompt: () => void
}

export function usePWAInstall(): UsePWAInstallReturn {
	const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
	const [deviceType, setDeviceType] = useState<DeviceType>("unknown")
	const [isInstalled, setIsInstalled] = useState(false)
	const [canInstall, setCanInstall] = useState(false)

	useEffect(() => {
		// Detect device type
		const userAgent = navigator.userAgent.toLowerCase()
		const isIOS = /iphone|ipad|ipod/.test(userAgent)
		const isAndroid = /android/.test(userAgent)
		const isStandalone = window.matchMedia("(display-mode: standalone)").matches
		const isIOSStandalone = (window.navigator as any).standalone === true

		if (isStandalone || isIOSStandalone) {
			setIsInstalled(true)
			setCanInstall(false)
			return
		}

		if (isIOS) {
			setDeviceType("ios")
			setCanInstall(true)
		} else if (isAndroid) {
			setDeviceType("android")
		} else {
			setDeviceType("desktop")
		}

		// Listen for beforeinstallprompt event (Android/Desktop)
		const handleBeforeInstallPrompt = (e: Event) => {
			e.preventDefault()
			setDeferredPrompt(e as BeforeInstallPromptEvent)
			setCanInstall(true)
		}

		window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt)

		return () => {
			window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt)
		}
	}, [])

	const showInstallPrompt = () => {
		// This will be handled by parent component showing modal
	}

	const installPWA = async () => {
		if (!deferredPrompt) return

		deferredPrompt.prompt()
		const { outcome } = await deferredPrompt.userChoice

		if (outcome === "accepted") {
			setDeferredPrompt(null)
			setCanInstall(false)
			setIsInstalled(true)
		}
	}

	const dismissPrompt = () => {
		localStorage.setItem("pwa-install-dismissed", Date.now().toString())
	}

	return {
		canInstall,
		isInstalled,
		deviceType,
		showInstallPrompt,
		installPWA,
		dismissPrompt,
	}
}
