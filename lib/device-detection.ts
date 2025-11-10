export type DeviceType = "android" | "ios" | "desktop" | "unknown"

export function detectDeviceType(): DeviceType {
	if (typeof window === "undefined") return "unknown"
	
	const userAgent = navigator.userAgent.toLowerCase()
	const isIOS = /iphone|ipad|ipod/.test(userAgent)
	const isAndroid = /android/.test(userAgent)
	
	if (isIOS) return "ios"
	if (isAndroid) return "android"
	if (!isIOS && !isAndroid) return "desktop"
	
	return "unknown"
}

export function isAppInstalled(): boolean {
	if (typeof window === "undefined") return false
	
	const isStandalone = window.matchMedia("(display-mode: standalone)").matches
	const isIOSStandalone = (window.navigator as any).standalone === true
	
	return isStandalone || isIOSStandalone
}
