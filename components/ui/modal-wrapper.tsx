/**
 * Reusable modal wrapper component
 * Follows DRY principle by centralizing modal structure
 */

import { Button } from "./button"
import { X } from "lucide-react"
import type { ReactNode } from "react"

interface ModalWrapperProps {
	isOpen: boolean
	onClose: () => void
	title: string
	description?: string
	icon?: ReactNode
	children: ReactNode
	maxWidth?: "sm" | "md" | "lg"
}

export function ModalWrapper({
	isOpen,
	onClose,
	title,
	description,
	icon,
	children,
	maxWidth = "md",
}: ModalWrapperProps) {
	if (!isOpen) return null

	const maxWidthClass = {
		sm: "md:max-w-sm",
		md: "md:max-w-md",
		lg: "md:max-w-lg",
	}[maxWidth]

	return (
		<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in flex items-center justify-center p-3 sm:p-4">
			<div className={`w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] ${maxWidthClass}`}>
				<div className="rounded-lg border border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in zoom-in-95">
					<div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
						{icon && (
							<div className="flex-shrink-0 rounded-lg bg-primary/10 p-1.5 sm:p-2">
								{icon}
							</div>
						)}
						<div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
							<h3 className="font-semibold text-sm sm:text-base text-card-foreground">
								{title}
							</h3>
							{description && (
								<p className="text-xs sm:text-sm text-muted-foreground">
									{description}
								</p>
							)}
						</div>
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
							onClick={onClose}
						>
							<X className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					</div>
					{children}
				</div>
			</div>
		</div>
	)
}
