/**
 * Simplified splash screen component
 * Follows KISS principle - removed unnecessary complexity
 */

"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { APP_CONFIG } from "@/lib/app-config"

interface SplashScreenSimpleProps {
	onComplete?: () => void
	duration?: number
	exitDuration?: number
}

export default function SplashScreenSimple({
	onComplete,
	duration = APP_CONFIG.splash.duration,
	exitDuration = APP_CONFIG.splash.exitAnimationDuration,
}: SplashScreenSimpleProps) {
	const [isVisible, setIsVisible] = useState(true)

	useEffect(() => {
		const timer = setTimeout(() => {
			setIsVisible(false)
			if (onComplete) {
				setTimeout(onComplete, exitDuration)
			}
		}, duration)

		return () => clearTimeout(timer)
	}, [onComplete, duration, exitDuration])

	return (
		<AnimatePresence>
			{isVisible && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0, scale: 1.1 }}
					transition={{ duration: 0.5, ease: "easeInOut" }}
					className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
				>
					{/* Background gradient */}
					<motion.div
						animate={{
							scale: [1, 1.1, 1],
							opacity: [0.2, 0.3, 0.2],
						}}
						transition={{
							duration: 4,
							repeat: Infinity,
							ease: "easeInOut",
						}}
						className="absolute inset-0 bg-gradient-to-br from-primary/20 via-purple-500/10 to-blue-500/20 blur-3xl"
					/>

					{/* Logo */}
					<motion.div className="relative z-10 flex flex-col items-center gap-6 sm:gap-8">
						<motion.img
							src="/smartchat4.png"
							alt="SmartChat Logo"
							initial={{ opacity: 0, scale: 0.8 }}
							animate={{ opacity: 1, scale: 1 }}
							transition={{
								delay: 0.2,
								duration: 0.5,
								type: "spring",
								stiffness: 200,
							}}
							className="w-48 h-48 sm:w-64 sm:h-64 md:w-72 md:h-72 object-contain"
						/>

						{/* Loading dots */}
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
							className="flex gap-2 sm:gap-3"
						>
							{[0, 1, 2].map((i) => (
								<motion.div
									key={i}
									animate={{
										scale: [1, 1.3, 1],
										opacity: [0.4, 1, 0.4],
									}}
									transition={{
										duration: 1,
										repeat: Infinity,
										delay: i * 0.15,
										ease: "easeInOut",
									}}
									className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-primary"
								/>
							))}
						</motion.div>

						{/* Credits */}
						<motion.p
							initial={{ opacity: 0 }}
							animate={{ opacity: [0.5, 1, 0.5] }}
							transition={{
								delay: 0.8,
								duration: 2,
								repeat: Infinity,
								ease: "easeInOut",
							}}
							className="text-xs sm:text-sm text-muted-foreground"
						>
							{APP_CONFIG.about.credits}
						</motion.p>
					</motion.div>
				</motion.div>
			)}
		</AnimatePresence>
	)
}
