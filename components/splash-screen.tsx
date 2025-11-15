"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"
import { APP_CONFIG } from "@/lib/app-config"

interface SplashScreenProps {
  onComplete?: () => void
  appName?: string
  subtitle?: string
  logoText?: string
  credits?: string
  duration?: number
  exitDuration?: number
}

export default function SplashScreen({ 
  onComplete,
  appName = APP_CONFIG.branding.appName,
  subtitle = APP_CONFIG.branding.subtitle,
  logoText = APP_CONFIG.branding.logoText,
  credits = APP_CONFIG.about.credits,
  duration = APP_CONFIG.splash.duration,
  exitDuration = APP_CONFIG.splash.exitAnimationDuration,
}: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  const [isClient, setIsClient] = useState(false)
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Parallax transforms - ALL at top level (Rules of Hooks)
  const logoX = useTransform(mouseX, [-500, 500], [-20, 20])
  const logoY = useTransform(mouseY, [-500, 500], [-20, 20])
  const bgX = useTransform(mouseX, [-500, 500], [-10, 10])
  const bgY = useTransform(mouseY, [-500, 500], [-10, 10])
  
  // Inverted transforms for Layer 2 (opposite direction)
  const bgXInverted = useTransform(bgX, (x) => -x)
  const bgYInverted = useTransform(bgY, (y) => -y)

  // Generate particles only on client side to avoid hydration mismatch
  const particles = useMemo(() => {
    if (!isClient) return []
    return Array.from({ length: 10 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 2,
      duration: Math.random() * 4 + 3,
      delay: Math.random() * 2,
    }))
  }, [isClient])

  useEffect(() => {
    // Mark as client-side rendered
    setIsClient(true)
    
    // Check if mobile
    setIsMobile(window.innerWidth < 768)
    
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, exitDuration)
      }
    }, duration)

    return () => clearTimeout(timer)
  }, [onComplete, duration, exitDuration])

  // Track mouse position for parallax (desktop only, throttled for performance)
  useEffect(() => {
    if (isMobile) return

    let rafId: number | null = null
    let lastX = 0
    let lastY = 0

    const handleMouseMove = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY

      // Use requestAnimationFrame for smooth updates
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
  }, [isMobile, mouseX, mouseY])

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.2, filter: "blur(20px)" }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-gradient-to-br from-background via-background to-primary/5 overflow-hidden"
        >
          {/* Optimized Background - Reduced layers and blur intensity */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Primary gradient - Simplified animation */}
            <motion.div
              style={!isMobile ? { x: bgX, y: bgY, willChange: "transform, opacity" } : { willChange: "transform, opacity" }}
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.15, 0.25, 0.15],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/30 blur-xl"
            />
            
            {/* Secondary gradient - Simplified animation */}
            <motion.div
              style={!isMobile ? { x: bgXInverted, y: bgYInverted, willChange: "transform, opacity" } : { willChange: "transform, opacity" }}
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.2, 0.15, 0.2],
              }}
              transition={{
                duration: 35,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-blue-500/30 via-cyan-500/20 to-primary/30 blur-xl"
            />
          </div>

          {/* Floating Particles - Only render on client */}
          {!isMobile && isClient && particles.length > 0 && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {particles.map((particle) => (
                <motion.div
                  key={particle.id}
                  initial={{
                    x: `${particle.x}vw`,
                    y: `${particle.y}vh`,
                    opacity: 0,
                  }}
                  animate={{
                    y: [`${particle.y}vh`, `${particle.y - 20}vh`, `${particle.y}vh`],
                    x: [`${particle.x}vw`, `${particle.x + 10}vw`, `${particle.x}vw`],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    delay: particle.delay,
                    ease: "easeInOut",
                  }}
                  className="absolute rounded-full bg-primary/40"
                  style={{
                    width: particle.size,
                    height: particle.size,
                  }}
                />
              ))}
            </div>
          )}

          {/* Logo Container with Parallax */}
          <motion.div 
            className="relative z-10 flex flex-col items-center gap-6 sm:gap-8"
            style={!isMobile ? { x: logoX, y: logoY, willChange: "transform" } : {}}
          >
            {/* UMJ Logo - Large & Prominent */}
            <motion.img
              src="/UMJ.png"
              alt="UMJ Logo"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ 
                opacity: 1, 
                scale: 1,
              }}
              transition={{ 
                delay: 0.2,
                duration: 0.6,
                type: "spring",
                stiffness: 200,
                damping: 20
              }}
              className="w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 object-contain"
            />

            {/* Loading Dots Animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex gap-2 xs:gap-2.5 sm:gap-3"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.3, 1, 0.3],
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 xs:w-3 xs:h-3 sm:w-3.5 sm:h-3.5 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-lg shadow-primary/50"
                />
              ))}
            </motion.div>

            {/* Credits Text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{
                delay: 1,
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-[10px] xs:text-xs sm:text-sm text-muted-foreground font-medium"
            >
              {credits}
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
