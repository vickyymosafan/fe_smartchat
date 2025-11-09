"use client"

import { useEffect, useState, useMemo } from "react"
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion"

interface SplashScreenProps {
  onComplete?: () => void
}

// Generate particles for floating effect
const generateParticles = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
  }))
}

export default function SplashScreen({ onComplete }: SplashScreenProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isMobile, setIsMobile] = useState(false)
  
  // Mouse position for parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  
  // Parallax transforms
  const logoX = useTransform(mouseX, [-500, 500], [-20, 20])
  const logoY = useTransform(mouseY, [-500, 500], [-20, 20])
  const bgX = useTransform(mouseX, [-500, 500], [-10, 10])
  const bgY = useTransform(mouseY, [-500, 500], [-10, 10])

  // Generate particles once
  const particles = useMemo(() => generateParticles(30), [])

  useEffect(() => {
    // Check if mobile
    setIsMobile(window.innerWidth < 768)
    
    // Hide splash screen after 3 seconds
    const timer = setTimeout(() => {
      setIsVisible(false)
      if (onComplete) {
        setTimeout(onComplete, 800) // Wait for exit animation
      }
    }, 3000)

    return () => clearTimeout(timer)
  }, [onComplete])

  // Track mouse position for parallax (desktop only)
  useEffect(() => {
    if (isMobile) return

    const handleMouseMove = (e: MouseEvent) => {
      const centerX = window.innerWidth / 2
      const centerY = window.innerHeight / 2
      mouseX.set(e.clientX - centerX)
      mouseY.set(e.clientY - centerY)
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
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
          {/* Liquid Morphing Background */}
          <div className="absolute inset-0 overflow-hidden">
            {/* Layer 1 - Primary gradient */}
            <motion.div
              style={!isMobile ? { x: bgX, y: bgY } : {}}
              animate={{
                scale: [1, 1.3, 1.1, 1],
                rotate: [0, 90, 180, 270, 360],
                opacity: [0.15, 0.25, 0.2, 0.15],
              }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-0 left-0 w-full h-full rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-blue-500/30 blur-3xl"
            />
            
            {/* Layer 2 - Secondary gradient */}
            <motion.div
              style={!isMobile ? { x: useTransform(bgX, (x) => -x), y: useTransform(bgY, (y) => -y) } : {}}
              animate={{
                scale: [1.2, 1, 1.3, 1.2],
                rotate: [360, 270, 180, 90, 0],
                opacity: [0.2, 0.15, 0.25, 0.2],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute bottom-0 right-0 w-full h-full rounded-full bg-gradient-to-tl from-blue-500/30 via-cyan-500/20 to-primary/30 blur-3xl"
            />

            {/* Animated circles */}
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.1, 0.2, 0.1],
                x: [0, 50, 0],
                y: [0, -30, 0],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-primary/20 blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                opacity: [0.1, 0.2, 0.1],
                x: [0, -50, 0],
                y: [0, 30, 0],
              }}
              transition={{
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1,
              }}
              className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-blue-500/20 blur-3xl"
            />
          </div>

          {/* Floating Particles */}
          {!isMobile && (
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
            className="relative z-10 flex flex-col items-center gap-8"
            style={!isMobile ? { x: logoX, y: logoY } : {}}
          >
            {/* Animated Logo */}
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 20,
                duration: 0.8,
              }}
              className="relative"
            >
              {/* Outer Ring 1 - Fastest */}
              <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ 
                  rotate: 360,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  rotate: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { delay: 0.1, duration: 0.5 },
                  scale: { delay: 0.1, duration: 0.5 },
                }}
                className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary w-24 h-24 sm:w-32 sm:h-32"
              />

              {/* Middle Ring - Medium speed */}
              <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ 
                  rotate: -360,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  rotate: {
                    duration: 4,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { delay: 0.2, duration: 0.5 },
                  scale: { delay: 0.2, duration: 0.5 },
                }}
                className="absolute inset-2 rounded-full border-4 border-blue-500/20 border-b-blue-500 w-20 h-20 sm:w-28 sm:h-28"
              />

              {/* Inner Ring - Slowest */}
              <motion.div
                initial={{ opacity: 0, scale: 1.5 }}
                animate={{ 
                  rotate: 360,
                  opacity: 1,
                  scale: 1,
                }}
                transition={{
                  rotate: {
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  },
                  opacity: { delay: 0.3, duration: 0.5 },
                  scale: { delay: 0.3, duration: 0.5 },
                }}
                className="absolute inset-4 rounded-full border-2 border-purple-500/20 border-r-purple-500 w-16 h-16 sm:w-24 sm:h-24"
              />

              {/* Logo Circle */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
                className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-br from-primary via-blue-500 to-purple-600 shadow-2xl shadow-primary/50 flex items-center justify-center overflow-hidden"
              >
                {/* Shimmer Effect */}
                <motion.div
                  animate={{
                    x: ["-200%", "200%"],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 w-1/2 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                />

                {/* Inner Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-2 rounded-full bg-white/20 blur-md"
                />

                {/* SC Text with Glitch */}
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="relative text-4xl sm:text-5xl font-bold text-white z-10"
                  style={{
                    textShadow: "0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(59,130,246,0.5)",
                  }}
                >
                  SC
                </motion.span>
              </motion.div>

              {/* Pulse Effect 1 */}
              <motion.div
                animate={{
                  scale: [1, 1.8, 1],
                  opacity: [0.5, 0, 0.5],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                }}
                className="absolute inset-0 rounded-full bg-primary/30 w-24 h-24 sm:w-32 sm:h-32"
              />

              {/* Pulse Effect 2 */}
              <motion.div
                animate={{
                  scale: [1, 2, 1],
                  opacity: [0.3, 0, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                }}
                className="absolute inset-0 rounded-full bg-blue-500/30 w-24 h-24 sm:w-32 sm:h-32"
              />
            </motion.div>

            {/* App Name with Glitch Effect */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="text-center space-y-2"
            >
              <div className="relative">
                {/* Main Text */}
                <motion.h1
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-foreground via-primary via-blue-500 to-foreground bg-clip-text text-transparent bg-[length:200%_auto]"
                  style={{
                    filter: "drop-shadow(0 0 10px rgba(59,130,246,0.3))",
                  }}
                >
                  SmartChat
                </motion.h1>
                
                {/* Glitch Effect Layers */}
                <motion.h1
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [-2, 2, -2],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                  }}
                  className="absolute inset-0 text-3xl sm:text-4xl font-bold text-red-500/50"
                  style={{ mixBlendMode: "screen" }}
                >
                  SmartChat
                </motion.h1>
                <motion.h1
                  animate={{
                    opacity: [0, 0.7, 0],
                    x: [2, -2, 2],
                  }}
                  transition={{
                    duration: 0.3,
                    repeat: Infinity,
                    repeatDelay: 3,
                    delay: 0.1,
                  }}
                  className="absolute inset-0 text-3xl sm:text-4xl font-bold text-blue-500/50"
                  style={{ mixBlendMode: "screen" }}
                >
                  SmartChat
                </motion.h1>
              </div>
              
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-sm sm:text-base text-muted-foreground font-medium"
              >
                AI Assistant
              </motion.p>
            </motion.div>

            {/* Loading Dots - Enhanced */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="flex gap-3"
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  animate={{
                    scale: [1, 1.8, 1],
                    opacity: [0.3, 1, 0.3],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                  className="w-2.5 h-2.5 rounded-full bg-gradient-to-br from-primary to-blue-500 shadow-lg shadow-primary/50"
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Bottom Text with Animation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4 }}
            className="absolute bottom-8 text-center space-y-2"
          >
            <motion.p
              animate={{
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="text-xs text-muted-foreground font-medium"
            >
              Powered by AI Technology
            </motion.p>
            
            {/* Progress Bar */}
            <div className="w-32 h-1 bg-muted/20 rounded-full overflow-hidden mx-auto">
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: "100%" }}
                transition={{
                  duration: 2.5,
                  ease: "easeInOut",
                }}
                className="h-full w-1/2 bg-gradient-to-r from-transparent via-primary to-transparent"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
