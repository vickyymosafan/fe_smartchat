interface MusicIconProps {
	className?: string
	size?: number
}

export function MusicIcon({ className = "", size = 24 }: MusicIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M12 3v10.55c-.59-.34-1.27-.55-2-.55-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4V7h4V3h-6z" />
		</svg>
	)
}

export function PlayIcon({ className = "", size = 24 }: MusicIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M8 5v14l11-7z" />
		</svg>
	)
}

export function PauseIcon({ className = "", size = 24 }: MusicIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
		</svg>
	)
}

export function SkipNextIcon({ className = "", size = 24 }: MusicIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
		</svg>
	)
}

export function SkipPreviousIcon({ className = "", size = 24 }: MusicIconProps) {
	return (
		<svg
			width={size}
			height={size}
			viewBox="0 0 24 24"
			fill="currentColor"
			className={className}
			xmlns="http://www.w3.org/2000/svg"
		>
			<path d="M6 6h2v12H6V6zm3.5 6l8.5 6V6l-8.5 6z" />
		</svg>
	)
}
