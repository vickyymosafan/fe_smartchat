"use client"

import { useState } from "react"
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic"
import { Button } from "./ui/button"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/utils/time-format"

export default function BackgroundMusicPlayer() {
	const {
		playlist,
		currentTrack,
		isPlaying,
		volume,
		currentTime,
		duration,
		isLoading,
		togglePlay,
		nextTrack,
		previousTrack,
		setVolume,
		seek,
	} = useBackgroundMusic()

	const [isExpanded, setIsExpanded] = useState(false)

	// Loading state
	if (isLoading) {
		return (
			<div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
				<div className="w-14 h-14 bg-background/95 backdrop-blur-sm border rounded-lg shadow-lg animate-pulse" />
			</div>
		)
	}

	// Empty state
	if (playlist.length === 0 || !currentTrack) {
		return null
	}

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0

	return (
		<>
			{/* Mobile: Bottom sheet */}
			<div
				className={cn(
					"fixed inset-x-0 bottom-0 z-50 transition-transform duration-300 sm:hidden",
					isExpanded ? "translate-y-0" : "translate-y-full"
				)}
			>
				<div className="bg-background/98 backdrop-blur-md border-t shadow-2xl">
					{/* Drag handle */}
					<div className="flex justify-center pt-2 pb-1">
						<button
							onClick={() => setIsExpanded(false)}
							className="w-12 h-1 bg-muted-foreground/30 rounded-full"
							aria-label="Close player"
						/>
					</div>

					<div className="px-4 pb-6 space-y-4">
						{/* Track info */}
						<div className="text-center space-y-1">
							<h3 className="text-base font-semibold truncate">
								{currentTrack.title}
							</h3>
							{currentTrack.artist && (
								<p className="text-sm text-muted-foreground truncate">
									{currentTrack.artist}
								</p>
							)}
						</div>

						{/* Progress bar */}
						<div className="space-y-2">
							<input
								type="range"
								min="0"
								max={duration || 100}
								value={currentTime}
								onChange={(e) => seek(Number(e.target.value))}
								className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer"
								style={{
									background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`,
								}}
								aria-label="Seek"
							/>
							<div className="flex justify-between text-xs text-muted-foreground">
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>

						{/* Controls */}
						<div className="flex items-center justify-center gap-4">
							<Button
								variant="ghost"
								size="lg"
								onClick={previousTrack}
								className="h-12 w-12 p-0 rounded-full"
								aria-label="Previous track"
							>
								<span className="text-xl">⏮</span>
							</Button>

							<Button
								variant="default"
								size="lg"
								onClick={togglePlay}
								className={cn(
									"h-16 w-16 p-0 rounded-full shadow-lg",
									isPlaying && "animate-pulse"
								)}
								aria-label={isPlaying ? "Pause" : "Play"}
							>
								<span className="text-2xl">{isPlaying ? "⏸" : "▶"}</span>
							</Button>

							<Button
								variant="ghost"
								size="lg"
								onClick={nextTrack}
								className="h-12 w-12 p-0 rounded-full"
								aria-label="Next track"
							>
								<span className="text-xl">⏭</span>
							</Button>
						</div>

						{/* Volume control */}
						<div className="flex items-center gap-3">
							<button
								onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
								className="text-lg"
								aria-label={volume === 0 ? "Unmute" : "Mute"}
							>
								{volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
							</button>
							<input
								type="range"
								min="0"
								max="100"
								value={volume * 100}
								onChange={(e) => setVolume(Number(e.target.value) / 100)}
								className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer"
								style={{
									background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`,
								}}
								aria-label="Volume"
							/>
							<span className="text-xs text-muted-foreground w-8 text-right">
								{Math.round(volume * 100)}%
							</span>
						</div>
					</div>
				</div>
			</div>

			{/* Desktop: Floating card */}
			<div className="hidden sm:block fixed bottom-4 right-4 md:bottom-6 md:right-6 z-50">
				<div
					className={cn(
						"bg-background/95 backdrop-blur-md border rounded-xl shadow-2xl transition-all duration-300 ease-in-out",
						isExpanded
							? "w-80 md:w-96 p-4 md:p-5"
							: "w-14 h-14 md:w-16 md:h-16 p-0 hover:scale-105"
					)}
				>
					{isExpanded ? (
						// Expanded view
						<div className="space-y-3 md:space-y-4">
							{/* Header */}
							<div className="flex items-center justify-between">
								<div className="flex items-center gap-2">
									<span className="text-lg md:text-xl">🎵</span>
									<span className="text-xs md:text-sm font-medium text-muted-foreground">
										Now Playing
									</span>
								</div>
								<Button
									variant="ghost"
									size="sm"
									onClick={() => setIsExpanded(false)}
									className="h-7 w-7 p-0 hover:bg-muted"
									aria-label="Minimize player"
								>
									<span className="text-sm">✕</span>
								</Button>
							</div>

							{/* Track info */}
							<div className="space-y-1">
								<h3 className="text-sm md:text-base font-semibold truncate">
									{currentTrack.title}
								</h3>
								{currentTrack.artist && (
									<p className="text-xs md:text-sm text-muted-foreground truncate">
										{currentTrack.artist}
									</p>
								)}
							</div>

							{/* Progress bar */}
							<div className="space-y-2">
								<input
									type="range"
									min="0"
									max={duration || 100}
									value={currentTime}
									onChange={(e) => seek(Number(e.target.value))}
									className="w-full h-1 bg-muted rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
									style={{
										background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${progress}%, hsl(var(--muted)) ${progress}%, hsl(var(--muted)) 100%)`,
									}}
									aria-label="Seek"
								/>
								<div className="flex justify-between text-xs text-muted-foreground">
									<span>{formatTime(currentTime)}</span>
									<span>{formatTime(duration)}</span>
								</div>
							</div>

							{/* Controls */}
							<div className="flex items-center justify-center gap-2 md:gap-3">
								<Button
									variant="ghost"
									size="sm"
									onClick={previousTrack}
									className="h-9 w-9 md:h-10 md:w-10 p-0 rounded-full hover:bg-muted"
									aria-label="Previous track"
								>
									<span className="text-base md:text-lg">⏮</span>
								</Button>

								<Button
									variant="default"
									size="sm"
									onClick={togglePlay}
									className={cn(
										"h-12 w-12 md:h-14 md:w-14 p-0 rounded-full shadow-lg hover:scale-105 transition-transform",
										isPlaying && "animate-pulse"
									)}
									aria-label={isPlaying ? "Pause" : "Play"}
								>
									<span className="text-xl md:text-2xl">
										{isPlaying ? "⏸" : "▶"}
									</span>
								</Button>

								<Button
									variant="ghost"
									size="sm"
									onClick={nextTrack}
									className="h-9 w-9 md:h-10 md:w-10 p-0 rounded-full hover:bg-muted"
									aria-label="Next track"
								>
									<span className="text-base md:text-lg">⏭</span>
								</Button>
							</div>

							{/* Volume control */}
							<div className="flex items-center gap-2 md:gap-3">
								<button
									onClick={() => setVolume(volume === 0 ? 0.5 : 0)}
									className="text-base md:text-lg hover:scale-110 transition-transform"
									aria-label={volume === 0 ? "Unmute" : "Mute"}
								>
									{volume === 0 ? "🔇" : volume < 0.5 ? "🔉" : "🔊"}
								</button>
								<input
									type="range"
									min="0"
									max="100"
									value={volume * 100}
									onChange={(e) => setVolume(Number(e.target.value) / 100)}
									className="flex-1 h-1 bg-muted rounded-lg appearance-none cursor-pointer hover:h-1.5 transition-all"
									style={{
										background: `linear-gradient(to right, hsl(var(--primary)) 0%, hsl(var(--primary)) ${volume * 100}%, hsl(var(--muted)) ${volume * 100}%, hsl(var(--muted)) 100%)`,
									}}
									aria-label="Volume"
								/>
								<span className="text-xs text-muted-foreground w-8 text-right">
									{Math.round(volume * 100)}%
								</span>
							</div>
						</div>
					) : (
						// Minimized view
						<Button
							variant="default"
							size="sm"
							onClick={() => setIsExpanded(true)}
							className="h-full w-full p-0 rounded-xl"
							aria-label="Open music player"
						>
							<span className="text-2xl md:text-3xl">
								{isPlaying ? "⏸" : "🎵"}
							</span>
						</Button>
					)}
				</div>
			</div>

			{/* Mobile: Floating button (when collapsed) */}
			<div className="sm:hidden fixed bottom-4 right-4 z-50">
				{!isExpanded && (
					<Button
						variant="default"
						size="lg"
						onClick={() => setIsExpanded(true)}
						className={cn(
							"h-14 w-14 p-0 rounded-full shadow-lg",
							isPlaying && "animate-pulse"
						)}
						aria-label="Open music player"
					>
						<span className="text-2xl">{isPlaying ? "⏸" : "🎵"}</span>
					</Button>
				)}
			</div>
		</>
	)
}
