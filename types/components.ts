/**
 * Component prop interfaces
 */

/**
 * Base props for message components
 */
export interface MessageComponentProps {
	message: {
		id: string
		role: string
		content: string
		timestamp: Date
	}
	className?: string
}
