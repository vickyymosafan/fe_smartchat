"use client"

import { MessageCircle, Pencil, Trash2, Check, X } from "lucide-react"
import type { ChatHistory } from "@/types/services"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { useMobile } from "@/hooks/useMobile"

interface HistoryItemProps {
	history: ChatHistory
	onHistoryClick?: (history: ChatHistory) => void
	onRename?: (id: string, newTitle: string) => Promise<ChatHistory>
	onDelete?: (id: string) => Promise<void>
	isActive?: boolean
	onEditingChange?: (isEditing: boolean) => void
	useModalOnMobile?: boolean // Optional: use modal instead of inline editing on mobile
}

export default function HistoryItem({
	history,
	onHistoryClick,
	onRename,
	onDelete,
	isActive = false,
	onEditingChange,
	useModalOnMobile = true, // Default to modal on mobile for better UX
}: HistoryItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [showRenameModal, setShowRenameModal] = useState(false)
	const [editTitle, setEditTitle] = useState(history.title)
	const [isDeleting, setIsDeleting] = useState(false)
	const isMobile = useMobile()

	// Notify parent when editing state changes
	useEffect(() => {
		onEditingChange?.(isEditing || showRenameModal)
	}, [isEditing, showRenameModal, onEditingChange])

	const handleHistoryClick = () => {
		if (!isEditing && onHistoryClick) {
			onHistoryClick(history)
		}
	}

	const handleSaveRename = async () => {
		const trimmedTitle = editTitle.trim()
		
		// If empty or unchanged, just cancel
		if (!trimmedTitle || trimmedTitle === history.title) {
			setIsEditing(false)
			setShowRenameModal(false)
			setEditTitle(history.title)
			return
		}

		try {
			await onRename?.(history.id, trimmedTitle)
			setIsEditing(false)
			setShowRenameModal(false)
		} catch (error) {
			console.error("Failed to rename:", error)
			setEditTitle(history.title)
			setIsEditing(false)
			setShowRenameModal(false)
		}
	}

	const handleCancelRename = () => {
		setIsEditing(false)
		setShowRenameModal(false)
		setEditTitle(history.title)
	}

	const handleEditClick = (e: React.MouseEvent) => {
		e.stopPropagation()
		if (isMobile && useModalOnMobile) {
			setShowRenameModal(true)
		} else {
			setIsEditing(true)
		}
	}

	const handleDelete = async () => {
		if (!onDelete) return
		
		setIsDeleting(true)
		try {
			await onDelete(history.id)
		} catch (error) {
			console.error("Failed to delete:", error)
			setIsDeleting(false)
		}
	}

	return (
		<>
			<div
				className={`group relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg transition-colors ${
					isActive 
						? "" 
						: ""
				} ${isDeleting ? "opacity-50" : ""}`}
			>
				<MessageCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${
					isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
				}`} />

				{isEditing ? (
					<>
						<input
							type="text"
							value={editTitle}
							onChange={(e) => setEditTitle(e.target.value)}
							onKeyDown={(e) => {
								if (e.key === "Enter") {
									e.preventDefault()
									handleSaveRename()
								}
								if (e.key === "Escape") {
									handleCancelRename()
								}
							}}
							onBlur={isMobile ? undefined : handleSaveRename}
							className="flex-1 text-[10px] sm:text-xs bg-sidebar border border-sidebar-primary rounded px-1.5 py-0.5 text-sidebar-foreground focus:outline-none focus:ring-1 focus:ring-sidebar-primary"
							autoFocus
							disabled={isDeleting}
						/>
						{/* Explicit Save/Cancel buttons for mobile */}
						{isMobile && (
							<div className="flex items-center gap-0.5 flex-shrink-0">
								<Button
									size="icon"
									variant="ghost"
									onClick={(e) => {
										e.stopPropagation()
										handleSaveRename()
									}}
									className="h-6 w-6 hover:bg-sidebar-accent"
									disabled={isDeleting}
								>
									<Check className="h-4 w-4 text-green-500" />
								</Button>
								<Button
									size="icon"
									variant="ghost"
									onClick={(e) => {
										e.stopPropagation()
										handleCancelRename()
									}}
									className="h-6 w-6 hover:bg-sidebar-accent"
									disabled={isDeleting}
								>
									<X className="h-4 w-4 text-red-500" />
								</Button>
							</div>
						)}
					</>
				) : (
				<>
					<p
						onClick={handleHistoryClick}
						className={`flex-1 text-[10px] sm:text-xs truncate min-w-0 cursor-pointer ${
							isActive ? "text-sidebar-primary font-medium" : "text-sidebar-foreground"
						}`}
					>
						{history.title}
					</p>
					<div className="flex md:hidden items-center gap-0.5 flex-shrink-0">
						{onRename && (
							<Button
								size="icon"
								variant="ghost"
								onClick={handleEditClick}
								className="h-5 w-5 sm:h-6 sm:w-6"
								disabled={isDeleting}
							>
								<Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sidebar-foreground/60" />
							</Button>
						)}
						{onDelete && (
							<Button
								size="icon"
								variant="ghost"
								onClick={(e) => {
									e.stopPropagation()
									handleDelete()
								}}
								className="h-5 w-5 sm:h-6 sm:w-6"
								disabled={isDeleting}
							>
								<Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
							</Button>
						)}
					</div>
					<div className="hidden md:group-hover:flex items-center gap-0.5 flex-shrink-0">
						{onRename && (
							<Button
								size="icon"
								variant="ghost"
								onClick={handleEditClick}
								className="h-5 w-5 sm:h-6 sm:w-6"
								disabled={isDeleting}
							>
								<Pencil className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-sidebar-foreground/60" />
							</Button>
						)}
						{onDelete && (
							<Button
								size="icon"
								variant="ghost"
								onClick={(e) => {
									e.stopPropagation()
									handleDelete()
								}}
								className="h-5 w-5 sm:h-6 sm:w-6"
								disabled={isDeleting}
							>
								<Trash2 className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-red-500" />
							</Button>
						)}
					</div>
				</>
			)}
			</div>

			{/* Rename Modal for Mobile (Optional Enhancement) */}
			{useModalOnMobile && (
				<Dialog open={showRenameModal} onOpenChange={setShowRenameModal}>
					<DialogContent onClose={handleCancelRename}>
						<DialogHeader>
							<DialogTitle>Rename Chat</DialogTitle>
							<DialogDescription>
								Enter a new name for this chat conversation.
							</DialogDescription>
						</DialogHeader>
						<div className="space-y-4 py-4">
							<input
								type="text"
								value={editTitle}
								onChange={(e) => setEditTitle(e.target.value)}
								onKeyDown={(e) => {
									if (e.key === "Enter") {
										e.preventDefault()
										handleSaveRename()
									}
									if (e.key === "Escape") {
										handleCancelRename()
									}
								}}
								className="w-full px-3 py-2 text-sm bg-sidebar border border-sidebar-border rounded-md text-sidebar-foreground focus:outline-none focus:ring-2 focus:ring-sidebar-primary"
								placeholder="Enter chat name..."
								autoFocus
								disabled={isDeleting}
							/>
						</div>
						<div className="flex justify-end gap-2">
							<Button
								variant="outline"
								onClick={handleCancelRename}
								disabled={isDeleting}
								size="sm"
							>
								Cancel
							</Button>
							<Button
								onClick={handleSaveRename}
								disabled={isDeleting}
								size="sm"
								className="bg-sidebar-primary hover:bg-sidebar-primary/90"
							>
								Save
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			)}
		</>
	)
}
