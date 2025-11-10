"use client"

import { useState } from "react"
import { MessageCircle, MoreHorizontal, Pencil, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import type { ChatHistory } from "@/types/services"

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
			} catch (error) {
				setEditTitle(history.title)
			}
		} else {
			setEditTitle(history.title)
		}
		setIsEditing(false)
	}

	const handleCancelEdit = () => {
		setIsEditing(false)
		setEditTitle(history.title)
	}

	const handleDelete = async () => {
		setIsDeleting(true)
		try {
			await onDelete(history.id)
		} catch (error) {
			setIsDeleting(false)
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
			className={`group relative flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 rounded-lg transition-colors cursor-pointer ${
				isDeleting ? "opacity-50" : ""
			} ${
				isActive 
					? "bg-sidebar-accent" 
					: "hover:bg-sidebar-accent"
			}`}
		>
			<MessageCircle className={`h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0 ${
				isActive ? "text-sidebar-primary" : "text-sidebar-foreground/60"
			}`} />

			{isEditing ? (
				<input
					type="text"
					value={editTitle}
					onChange={(e) => setEditTitle(e.target.value)}
					onClick={(e) => e.stopPropagation()}
					onKeyDown={(e) => {
						if (e.key === "Enter") handleSaveRename()
						if (e.key === "Escape") handleCancelEdit()
					}}
					onBlur={handleSaveRename}
					className="flex-1 bg-sidebar-accent text-sidebar-foreground text-[10px] sm:text-xs px-1.5 sm:px-2 py-0.5 sm:py-1 rounded border border-sidebar-border focus:outline-none focus:ring-1 focus:ring-sidebar-primary min-w-0"
					autoFocus
					disabled={isDeleting}
				/>
			) : (
				<>
					<p className={`flex-1 text-[10px] sm:text-xs truncate min-w-0 ${
						isActive ? "text-sidebar-primary font-medium" : "text-sidebar-foreground"
					}`}>
						{history.title}
					</p>

					<div className="relative flex-shrink-0">
						<Button
							size="icon"
							variant="ghost"
							onClick={(e) => {
								e.stopPropagation()
								setShowMenu(!showMenu)
							}}
							className="h-5 w-5 sm:h-6 sm:w-6 opacity-0 group-hover:opacity-100 transition-opacity"
							disabled={isDeleting}
						>
							<MoreHorizontal className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
						</Button>

						{showMenu && (
							<>
								<div
									className="fixed inset-0 z-[60]"
									onClick={() => setShowMenu(false)}
								/>
								<div className="absolute right-0 top-full mt-1 bg-sidebar border border-sidebar-border rounded-lg shadow-lg z-[70] py-1 min-w-[100px] sm:min-w-[120px]">
									<button
										onClick={(e) => {
											e.stopPropagation()
											setIsEditing(true)
											setShowMenu(false)
										}}
										className="w-full flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-sidebar-foreground hover:bg-sidebar-accent transition-colors"
									>
										<Pencil className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
										Rename
									</button>
									<button
										onClick={(e) => {
											e.stopPropagation()
											setShowMenu(false)
											handleDelete()
										}}
										className="w-full flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3 py-1 sm:py-1.5 text-[10px] sm:text-xs text-destructive hover:bg-destructive/10 transition-colors"
									>
										<Trash2 className="h-2.5 w-2.5 sm:h-3 sm:w-3" />
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
