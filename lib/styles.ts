/**
 * Reusable style utilities
 * Menghindari duplikasi className patterns
 */

/**
 * Container max-width classes
 */
export const containerMaxWidth = "max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl"

/**
 * Responsive padding untuk main container
 */
export const containerPadding = "px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8"

/**
 * Responsive padding untuk header/footer
 */
export const headerPadding = "px-3 py-2.5 sm:px-4 sm:py-3 md:px-6"

/**
 * Icon size variants
 */
export const iconSizes = {
	sm: "h-3.5 w-3.5 sm:h-4 sm:w-4",
	md: "h-4 w-4 sm:h-5 sm:w-5",
	lg: "h-5 w-5 sm:h-6 sm:w-6",
} as const

/**
 * Gap spacing variants
 */
export const gaps = {
	sm: "gap-1.5 sm:gap-2",
	md: "gap-2 sm:gap-3",
	lg: "gap-3 sm:gap-4",
} as const

/**
 * Text size variants
 */
export const textSizes = {
	xs: "text-[10px] sm:text-xs",
	sm: "text-xs sm:text-sm",
	base: "text-xs sm:text-sm md:text-base",
	lg: "text-sm sm:text-base md:text-lg",
	xl: "text-base sm:text-lg md:text-xl lg:text-2xl",
} as const

/**
 * Modal/Dialog responsive classes
 */
export const modalContainer = "fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4"
export const modalContent = "relative bg-card rounded-lg shadow-2xl w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-md lg:max-w-lg max-h-[90vh] overflow-y-auto"
export const modalPadding = "p-4 sm:p-5 md:p-6"

/**
 * Button size variants for responsive design
 */
export const buttonSizes = {
	sm: "h-7 w-7 sm:h-8 sm:w-8",
	md: "h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10",
	lg: "h-9 w-9 sm:h-10 sm:w-10 md:h-11 md:w-11",
} as const

/**
 * Input/Form element responsive classes
 */
export const inputSizes = {
	sm: "h-8 sm:h-9 text-xs sm:text-sm",
	md: "h-9 sm:h-10 md:h-11 text-sm sm:text-base",
	lg: "h-10 sm:h-11 md:h-12 text-base sm:text-lg",
} as const


