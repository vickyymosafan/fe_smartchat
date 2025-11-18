"use client"

import { useBackgroundMusic } from "@/hooks/useBackgroundMusic"
import { cn } from "@/lib/utils"
import { formatTime } from "@/lib/utils/time-format"
import {
	MusicIcon,
	PlayIcon,
	PauseIcon,
	SkipNextIcon,
	SkipPreviousIcon,
} from "./icons/music-icon"

interface MusicSettingsProps {
	isOpen: boolean
}

export default function MusicSettings({ isOpen }: MusicSettingsProps) {
	const {
		playlist,
		currentTrack,
		isPlaying,
		currentTime,
		duration,
		isLoading,
		togglePlay,
		nextTrack,
		previousTrack,
	} = useBackgroundMusic()

	if (isLoading || playlist.length === 0 || !currentTrack) {
		return null
	}

	const progress = duration > 0 ? (currentTime / duration) * 100 : 0

	return (
		<div className="border-t border-sidebar-border">
			{isOpen ? (
				<div className="p-2.5 space-y-2">
					{/* Header */}
					<div className="flex items-center gap-1.5">
						<MusicIcon className="text-sidebar-foreground/60" size={12} />
						<p className="text-[10px] text-sidebar-foreground/60 font-semibold">
							Musik Latar
						</p>
					</div>

					{/* Current Track Info */}
					<div className="space-y-1.5">
						<div className="flex-1 min-w-0">
							<h4 className="text-xs font-semibold text-sidebar-foreground truncate leading-tight">
								{currentTrack.title}
							</h4>
							{currentTrack.artist && (
								<p className="text-[10px] text-sidebar-foreground/60 truncate leading-tight mt-0.5">
									{currentTrack.artist}
								</p>
							)}
						</div>

						{/* Progress Bar */}
						<div className="space-y-0.5">
							<div className="h-1 bg-sidebar-accent rounded-full overflow-hidden">
								<div
									className="h-full bg-sidebar-primary transition-all duration-300"
									style={{ width: `${progress}%` }}
								/>
							</div>
							<div className="flex justify-between text-[10px] text-sidebar-foreground/50">
								<span>{formatTime(currentTime)}</span>
								<span>{formatTime(duration)}</span>
							</div>
						</div>
					</div>

					{/* Playback Controls */}
					<div className="flex items-center justify-center gap-1.5 pt-0.5">
						<button
							onClick={previousTrack}
							className="p-1.5 hover:bg-sidebar-accent rounded-full transition-colors"
							aria-label="Lagu sebelumnya"
						>
							<SkipPreviousIcon className="text-sidebar-foreground/70" size={14} />
						</button>

						<button
							onClick={togglePlay}
							className={cn(
								"p-1.5 bg-sidebar-primary hover:bg-sidebar-primary/90 rounded-full transition-all",
								"hover:scale-105 active:scale-95"
							)}
							aria-label={isPlaying ? "Jeda" : "Putar"}
						>
							{isPlaying ? (
								<PauseIcon className="text-sidebar-primary-foreground" size={14} />
							) : (
								<PlayIcon className="text-sidebar-primary-foreground" size={14} />
							)}
						</button>

						<button
							onClick={nextTrack}
							className="p-1.5 hover:bg-sidebar-accent rounded-full transition-colors"
							aria-label="Lagu berikutnya"
						>
							<SkipNextIcon className="text-sidebar-foreground/70" size={14} />
						</button>
					</div>

					{/* Playlist Info */}
					<div className="pt-1.5 border-t border-sidebar-border">
						<p className="text-[10px] text-sidebar-foreground/50 text-center">
							{playlist.length} lagu dalam playlist
						</p>
					</div>
				</div>
			) : (
				/* Collapsed State - Icon Only */
				<div className="hidden md:flex flex-col items-center py-2">
					<button
						onClick={togglePlay}
						className={cn(
							"p-1.5 hover:bg-sidebar-accent rounded-full transition-all",
							isPlaying && "animate-pulse"
						)}
						aria-label={isPlaying ? "Jeda" : "Putar"}
					>
						{isPlaying ? (
							<PauseIcon className="text-sidebar-foreground/70" size={16} />
						) : (
							<MusicIcon className="text-sidebar-foreground/70" size={16} />
						)}
					</button>
				</div>
			)}
		</div>
	)
}
