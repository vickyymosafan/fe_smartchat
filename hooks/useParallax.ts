/**
 * Parallax effect hook
 * Separates parallax logic from UI components (SoC)
 */

import { useEffect } from "react"
import { useMotionValue, useTransform, type MotionValue } from "framer-motion"

interface UseParallaxReturn {
	mouseX: MotionValue<number>
	mouseY: MotionValue<number>
	logoX: MotionValue<number>
	logoY: MotionValue<number>
	bgX: MotionValue<number>
	bgY: MotionValue<number>
	bgXInverted: MotionValue<number>
	bgYInverted: MotionValue<number>
}

export function useParallax(enabled: boolean): UseParallaxReturn {
	const mouseX = useMotionValue(0)
	const mouseY = useMotionValue(0)

	const logoX = useTransform(mouseX, [-500, 500], [-20, 20])
	const logoY = useTransform(mouseY, [-500, 500], [-20, 20])
	const bgX = useTransform(mouseX, [-500, 500], [-10, 10])
	const bgY = useTransform(mouseY, [-500, 500], [-10, 10])
	const bgXInverted = useTransform(bgX, (x) => -x)
	const bgYInverted = useTransform(bgY, (y) => -y)

	useEffect(() => {
		if (!enabled) return

		let rafId: number | null = null
		let lastX = 0
		let lastY = 0

		const handleMouseMove = (e: MouseEvent) => {
			lastX = e.clientX
			lastY = e.clientY

			if (rafId === null) {
				rafId = requestAnimationFrame(() => {
					const centerX = window.innerWidth / 2
					const centerY = window.innerHeight / 2
					mouseX.set(lastX - centerX)
					mouseY.set(lastY - centerY)
					rafId = null
				})
			}
		}

		window.addEventListener("mousemove", handleMouseMove, { passive: true })
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
			if (rafId !== null) {
				cancelAnimationFrame(rafId)
			}
		}
	}, [enabled, mouseX, mouseY])

	return { mouseX, mouseY, logoX, logoY, bgX, bgY, bgXInverted, bgYInverted }
}
