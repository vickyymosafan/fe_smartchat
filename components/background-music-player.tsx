"use client"

import { useState } from "react"
import { useBackgroundMusic } from "@/hooks/useBackgroundMusic"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/utils/time-format"
import {
	MusicIcon,
	PlayIcon,
	PauseIcon,
	SkipNextIcon,
	SkipPreviousIcon,
	CloseIcon,
} from "./icons/music-icon"

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
			<div className="fixed top-4 right-4 z-40">
				<div className="w-12 h-12 bg-white border border-gray-200 rounded-full shadow-lg animate-pulse" />
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
			{/* Minimized Button - Top Right */}
			{!isExpanded && (
				<button
					onClick={() => setIsExpanded(true)}
					className={cn(
						"fixed top-4 right-4 z-40",
						"w-12 h-12 sm:w-14 sm:h-14",
						"bg-white hover:bg-gray-50",
						"border border-gray-200",
						"rounded-full shadow-lg",
						"flex items-center justify-center",
						"transition-all duration-200",
						"hover:scale-105 active:scale-95",
						isPlaying && "animate-pulse"
					)}
					aria-label="Open music player"
				>
					{isPlaying ? (
						<PauseIcon className="text-black" size={20} />
					) : (
						<MusicIcon className="text-black" size={20} />
					)}
				</button>
			)}

			{/* Expanded Player - Minimalist Pill Design */}
			{isExpanded && (
				<div className="fixed top-4 right-4 z-40">
					<div
						className={cn(
							"bg-white/30 backdrop-blur-lg",
							"border border-gray-200/30",
							"rounded-full shadow-xl",
							"px-4 py-3",
							"animate-in slide-in-from-top-2 duration-300",
							"flex items-center gap-3"
						)}
					>
						{/* Track info - Compact */}
						<div className="flex flex-col min-w-0">
							<div className="flex items-center gap-2">
								<MusicIcon className="text-white flex-shrink-0" size={14} />
								<h3 className="text-xs font-semibold text-white truncate">
									{currentTrack.title}
								</h3>
							</div>
							<div className="flex items-center gap-2 mt-0.5">
								<span className="text-[10px] text-white/70">
									{formatTime(currentTime)}
								</span>
								<div className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden min-w-[80px]">
									<div
										className="h-full bg-white transition-all duration-300"
										style={{ width: `${progress}%` }}
									/>
								</div>
								<span className="text-[10px] text-white/70">
									{formatTime(duration)}
								</span>
							</div>
						</div>

						{/* Controls - Inline */}
						<div className="flex items-center gap-1 flex-shrink-0">
							<button
								onClick={previousTrack}
								className="p-1 hover:bg-white/10 rounded-full transition-colors"
								aria-label="Previous track"
							>
								<SkipPreviousIcon className="text-white" size={16} />
							</button>

							<button
								onClick={togglePlay}
								className={cn(
									"p-2 bg-white hover:bg-white/90 rounded-full transition-all",
									"hover:scale-110 active:scale-95",
									isPlaying && "animate-pulse"
								)}
								aria-label={isPlaying ? "Pause" : "Play"}
							>
								{isPlaying ? (
									<PauseIcon className="text-black" size={14} />
								) : (
									<PlayIcon className="text-black" size={14} />
								)}
							</button>

							<button
								onClick={nextTrack}
								className="p-1 hover:bg-white/10 rounded-full transition-colors"
								aria-label="Next track"
							>
								<SkipNextIcon className="text-white" size={16} />
							</button>

							<button
								onClick={() => setIsExpanded(false)}
								className="p-1 hover:bg-white/10 rounded-full transition-colors ml-1"
								aria-label="Close player"
							>
								<CloseIcon className="text-white" size={14} />
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
