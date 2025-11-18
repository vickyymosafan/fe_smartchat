"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { musicService, type BackgroundMusic } from "@/lib/services/music-service"

interface UseBackgroundMusicReturn {
	playlist: BackgroundMusic[]
	currentTrack: BackgroundMusic | null
	isPlaying: boolean
	volume: number
	currentTime: number
	duration: number
	isLoading: boolean
	play: () => void
	pause: () => void
	togglePlay: () => void
	nextTrack: () => void
	previousTrack: () => void
	setVolume: (volume: number) => void
	seek: (time: number) => void
}

const STORAGE_KEY = "background-music-preferences"

export function useBackgroundMusic(): UseBackgroundMusicReturn {
	const [playlist, setPlaylist] = useState<BackgroundMusic[]>([])
	const [currentIndex, setCurrentIndex] = useState(0)
	const [isPlaying, setIsPlaying] = useState(false)
	const [volume, setVolumeState] = useState(0.5)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)
	const [isLoading, setIsLoading] = useState(true)
	
	const audioRef = useRef<HTMLAudioElement | null>(null)

	// Load music playlist
	useEffect(() => {
		async function loadPlaylist() {
			setIsLoading(true)
			const music = await musicService.getAllMusic()
			setPlaylist(music)
			setIsLoading(false)
		}
		loadPlaylist()
	}, [])

	// Load user preferences
	useEffect(() => {
		try {
			const saved = localStorage.getItem(STORAGE_KEY)
			if (saved) {
				const prefs = JSON.parse(saved)
				setVolumeState(prefs.volume ?? 0.5)
			}
		} catch (error) {
			console.error("[useBackgroundMusic] Error loading preferences:", error)
		}
	}, [])

	// Save user preferences
	useEffect(() => {
		try {
			localStorage.setItem(
				STORAGE_KEY,
				JSON.stringify({ volume })
			)
		} catch (error) {
			console.error("[useBackgroundMusic] Error saving preferences:", error)
		}
	}, [volume])

	// Initialize audio element
	useEffect(() => {
		if (typeof window === "undefined") return

		const audio = new Audio()
		audio.volume = volume
		audio.loop = false

		audio.addEventListener("timeupdate", () => {
			setCurrentTime(audio.currentTime)
		})

		audio.addEventListener("loadedmetadata", () => {
			setDuration(audio.duration)
		})

		audio.addEventListener("ended", () => {
			// Auto play next track
			setCurrentIndex((prev) => (prev + 1) % playlist.length)
		})

		audio.addEventListener("error", (e) => {
			const target = e.target as HTMLAudioElement
			const error = target?.error
			const src = target?.src || ""
			
			// Ignore errors for empty src or page URL (initialization state)
			if (!src || src === window.location.href) {
				return
			}
			
			console.error("[useBackgroundMusic] Audio error:", {
				code: error?.code,
				message: error?.message,
				url: src,
				errorType: error?.code === 1 ? "MEDIA_ERR_ABORTED" :
					error?.code === 2 ? "MEDIA_ERR_NETWORK" :
					error?.code === 3 ? "MEDIA_ERR_DECODE" :
					error?.code === 4 ? "MEDIA_ERR_SRC_NOT_SUPPORTED" :
					"UNKNOWN"
			})
			
			setIsPlaying(false)
			
			// Auto skip to next track on error
			if (playlist.length > 1) {
				setTimeout(() => {
					setCurrentIndex((prev) => (prev + 1) % playlist.length)
				}, 1000)
			}
		})

		audioRef.current = audio

		return () => {
			audio.pause()
			audio.src = ""
		}
	}, [playlist.length, volume])

	// Update audio source when track changes
	useEffect(() => {
		if (!audioRef.current || playlist.length === 0) return

		const currentTrack = playlist[currentIndex]
		if (!currentTrack) return

		audioRef.current.src = currentTrack.url
		audioRef.current.load()

		if (isPlaying) {
			audioRef.current.play().catch((error) => {
				console.error("[useBackgroundMusic] Play error:", error)
				setIsPlaying(false)
			})
		}
	}, [currentIndex, playlist, isPlaying])

	const play = useCallback(() => {
		if (!audioRef.current) return

		audioRef.current.play()
			.then(() => {
				setIsPlaying(true)
			})
			.catch((error) => {
				console.error("[useBackgroundMusic] Play error:", error)
				// Browser autoplay policy blocked
				setIsPlaying(false)
			})
	}, [])

	const pause = useCallback(() => {
		if (!audioRef.current) return
		audioRef.current.pause()
		setIsPlaying(false)
	}, [])

	const togglePlay = useCallback(() => {
		if (isPlaying) {
			pause()
		} else {
			play()
		}
	}, [isPlaying, play, pause])

	const nextTrack = useCallback(() => {
		setCurrentIndex((prev) => (prev + 1) % playlist.length)
	}, [playlist.length])

	const previousTrack = useCallback(() => {
		setCurrentIndex((prev) => (prev - 1 + playlist.length) % playlist.length)
	}, [playlist.length])

	const setVolume = useCallback((newVolume: number) => {
		const clampedVolume = Math.max(0, Math.min(1, newVolume))
		setVolumeState(clampedVolume)
		if (audioRef.current) {
			audioRef.current.volume = clampedVolume
		}
	}, [])

	const seek = useCallback((time: number) => {
		if (!audioRef.current) return
		audioRef.current.currentTime = time
		setCurrentTime(time)
	}, [])

	// Keyboard shortcuts
	useEffect(() => {
		if (typeof window === "undefined") return

		const handleKeyPress = (e: KeyboardEvent) => {
			// Ignore if user is typing in input/textarea
			if (
				e.target instanceof HTMLInputElement ||
				e.target instanceof HTMLTextAreaElement
			) {
				return
			}

			switch (e.key) {
				case " ":
					e.preventDefault()
					togglePlay()
					break
				case "ArrowLeft":
					e.preventDefault()
					previousTrack()
					break
				case "ArrowRight":
					e.preventDefault()
					nextTrack()
					break
				case "ArrowUp":
					e.preventDefault()
					setVolume(Math.min(1, volume + 0.1))
					break
				case "ArrowDown":
					e.preventDefault()
					setVolume(Math.max(0, volume - 0.1))
					break
				case "m":
				case "M":
					e.preventDefault()
					setVolume(volume === 0 ? 0.5 : 0)
					break
			}
		}

		window.addEventListener("keydown", handleKeyPress)
		return () => window.removeEventListener("keydown", handleKeyPress)
	}, [togglePlay, previousTrack, nextTrack, volume, setVolume])

	// Media Session API for lock screen controls
	useEffect(() => {
		if (typeof window === "undefined" || !("mediaSession" in navigator)) return
		if (!playlist[currentIndex]) return

		const track = playlist[currentIndex]

		navigator.mediaSession.metadata = new MediaMetadata({
			title: track.title,
			artist: track.artist || "Unknown Artist",
			artwork: [
				{ src: "/icons/icon-192x192.png", sizes: "192x192", type: "image/png" },
				{ src: "/icons/icon-512x512.png", sizes: "512x512", type: "image/png" },
			],
		})

		navigator.mediaSession.setActionHandler("play", play)
		navigator.mediaSession.setActionHandler("pause", pause)
		navigator.mediaSession.setActionHandler("previoustrack", previousTrack)
		navigator.mediaSession.setActionHandler("nexttrack", nextTrack)

		return () => {
			navigator.mediaSession.setActionHandler("play", null)
			navigator.mediaSession.setActionHandler("pause", null)
			navigator.mediaSession.setActionHandler("previoustrack", null)
			navigator.mediaSession.setActionHandler("nexttrack", null)
		}
	}, [currentIndex, playlist, play, pause, previousTrack, nextTrack])

	return {
		playlist,
		currentTrack: playlist[currentIndex] || null,
		isPlaying,
		volume,
		currentTime,
		duration,
		isLoading,
		play,
		pause,
		togglePlay,
		nextTrack,
		previousTrack,
		setVolume,
		seek,
	}
}
