/**
 * Base component prop interfaces for LSP compliance
 * All component implementations must follow these contracts
 */

import type { ReactNode } from "react"

/**
 * Base props that all components should accept
 */
export interface BaseComponentProps {
	className?: string
	children?: ReactNode
}

/**
 * Base props for message components
 */
export interface MessageComponentProps extends BaseComponentProps {
	message: {
		id: string
		role: string
		content: string
		timestamp: Date
	}
}

/**
 * Base props for input components
 */
export interface InputComponentProps extends BaseComponentProps {
	value?: string
	onChange?: (value: string) => void
	onSubmit?: (value: string) => void
	disabled?: boolean
	placeholder?: string
}

/**
 * Base props for button components
 */
export interface ButtonComponentProps extends BaseComponentProps {
	onClick?: () => void
	disabled?: boolean
	variant?: string
	size?: string
}

/**
 * Base props for modal/dialog components
 */
export interface ModalComponentProps extends BaseComponentProps {
	isOpen: boolean
	onClose: () => void
	title?: string
}

/**
 * Base props for list item components
 */
export interface ListItemComponentProps<T> extends BaseComponentProps {
	item: T
	isActive?: boolean
	onClick?: (item: T) => void
	onEdit?: (item: T) => void
	onDelete?: (item: T) => void
}
