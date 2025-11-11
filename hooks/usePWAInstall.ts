"use client"

import { useState, useEffect } from "react"
import { detectDeviceType, isAppInstalled, type DeviceType } from "@/lib/device-detection"
import { PWA_INSTALL_DISMISSED_KEY } from "@/lib/constants"
import { localStorage } from "@/lib/storage"

interface BeforeInstallPromptEvent extends Event {
	prompt: () => Promise<void>
	userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

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
		const installed = isAppInstalled()
		if (installed) {
			setIsInstalled(true)
			setCanInstall(false)
			return
		}

		const device = detectDeviceType()
		setDeviceType(device)

		if (device === "ios") {
			setCanInstall(true)
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
		localStorage.setItem(PWA_INSTALL_DISMISSED_KEY, Date.now().toString())
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
