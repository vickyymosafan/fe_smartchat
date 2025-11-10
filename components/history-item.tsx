"use client"

import { useState } from "react"
import { MessageCircle, MoreHorizontal, Pencil, Trash2, Check, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ChatHistory } from "@/lib/chat-history-api"

interface HistoryItemProps {
	history: ChatHistory
	onRename: (id: string, newTitle: string) => Promise<void>
	onDelete: (id: string) => Promise<void>
	onHistoryClick?: (history: ChatHistory) => void
	isActive?: boolean
}

export default function HistoryItem({
	history,
	onRename,
	onDelete,
	onHistoryClick,
	isActive = false,
}: HistoryItemProps) {
	const [isEditing, setIsEditing] = useState(false)
	const [editTitle, setEditTitle] = useState(history.title)
	const [showMenu, setShowMenu] = useState(false)
	const [isDeleting, setIsDeleting] = useState(false)

	const handleSaveRename = async () => {
		if (editTitle.trim() && editTitle !== history.title) {
			try {
				await onRename(history.id, editTitle.trim())
				setIsEditing(false)
			} catch (error) {
				// Error handled by parent
				setEditTitle(history.title)
			}
		} else {
			setIsEditing(false)
			setEditTitle(history.title)
		}
	}

	const handleCancelEdit = () => {
		setIsEditing(false)
		setEditTitle(history.title)
	}

	const handleDelete = async () => {
		if (window.confirm("Hapus riwayat chat ini?")) {
			setIsDeleting(true)
			try {
				await onDelete(history.id)
			} catch (error) {
				setIsDeleting(false)
			}
		}
	}

	const handleHistoryClick = () => {
		if (!isEditing && !isDeleting && onHistoryClick) {
			onHistoryClick(history)
		}
	}

	return (
		<div
			onClick={handleHistoryClick}
			className={`group relative flex items-center gap-2 p-2 rounded-lg transition-colors cursor-pointer ${
				isDeleting ? "opacity-50" : ""
			} ${
				isActive 
					? "bg-sidebar-accent border border-sidebar-primary/50" 
					: "hover:bg-sidebar-accent"
			}`}
		>
			<MessageCircle className={`h-4 w-4 flex-shrink-0 ${
				isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
			}`} />

			{isEditing ? (
				<div className="flex-1 flex items-center gap-1">
					<input
						type="text"
						value={editTitle}
						onChange={(e) => setEditTitle(e.target.value)}
						onKeyDown={(e) => {
							if (e.key === "Enter") handleSaveRename()
							if (e.key === "Escape") handleCancelEdit()
						}}
						className="flex-1 bg-sidebar-accent text-sidebar-foreground text-xs px-2 py-1 rounded border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-sidebar-primary"
						autoFocus
						disabled={isDeleting}
					/>
					<Button
						size="icon"
						variant="ghost"
						onClick={handleSaveRename}
						className="h-6 w-6"
						disabled={isDeleting}
					>
						<Check className="h-3 w-3 text-green-500" />
					</Button>
					<Button
						size="icon"
						variant="ghost"
						onClick={handleCancelEdit}
						className="h-6 w-6"
						disabled={isDeleting}
					>
						<X className="h-3 w-3 text-red-500" />
					</Button>
				</div>
			) : (
				<>
					<p className={`flex-1 text-xs truncate ${
						isActive ? "text-sidebar-primary font-medium" : "text-sidebar-foreground"
					}`}>
						{history.title}
					</p>

					<div className="relative">
						<Button
							size="icon"
							variant="ghost"
							onClick={(e) => {
								e.stopPropagation()
								setShowMenu(!showMenu)
							}}
							className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
							disabled={isDeleting}
						>
							<MoreHorizontal className="h-3 w-3" />
						</Button>

						{showMenu && (
							<>
								<div
									className="fixed inset-0 z-10"
									onClick={() => setShowMenu(false)}
								/>
								<div className="absolute right-0 top-full mt-1 bg-sidebar border border-sidebar-border rounded-lg shadow-lg z-20 py-1 min-w-[120px]">
									<button
										onClick={() => {
											setIsEditing(true)
											setShowMenu(false)
										}}
										className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
									>
										<Pencil className="h-3 w-3" />
										Rename
									</button>
									<button
										onClick={() => {
											setShowMenu(false)
											handleDelete()
										}}
										className="w-full flex items-center gap-2 px-3 py-1.5 text-xs text-destructive hover:bg-destructive/10 transition-colors"
									>
										<Trash2 className="h-3 w-3" />
										Delete
									</button>
								</div>
							</>
						)}
					</div>
				</>
			)}
		</div>
	)
}
