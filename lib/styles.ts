/**
 * Reusable style utilities
 * Menghindari duplikasi className patterns
 */

import { cn } from "@/lib/utils";

/**
 * Container max-width classes
 */
export const containerMaxWidth = "max-w-3xl lg:max-w-4xl xl:max-w-5xl 2xl:max-w-6xl";

/**
 * Responsive padding untuk main container
 */
export const containerPadding = "px-3 py-4 sm:px-4 sm:py-6 md:px-6 lg:px-8";

/**
 * Responsive padding untuk header/footer
 */
export const headerPadding = "px-3 py-2.5 sm:px-4 sm:py-3 md:px-6";

/**
 * Icon size variants
 */
export const iconSizes = {
	sm: "h-3.5 w-3.5 sm:h-4 sm:w-4",
	md: "h-4 w-4 sm:h-5 sm:w-5",
	lg: "h-5 w-5 sm:h-6 sm:w-6",
} as const;

/**
 * Gap spacing variants
 */
export const gaps = {
	sm: "gap-1.5 sm:gap-2",
	md: "gap-2 sm:gap-3",
	lg: "gap-3 sm:gap-4",
} as const;

/**
 * Text size variants
 */
export const textSizes = {
	xs: "text-[10px] sm:text-xs",
	sm: "text-xs sm:text-sm",
	base: "text-xs sm:text-sm md:text-base",
	lg: "text-sm sm:text-base md:text-lg",
} as const;

/**
 * Helper untuk membuat container dengan max-width dan padding
 */
export function getContainerClasses(additionalClasses?: string) {
	return cn("mx-auto", containerMaxWidth, additionalClasses);
}

/**
 * Helper untuk icon button sizes
 */
export function getIconButtonClasses(size: "sm" | "md" = "md") {
	const sizeClasses = size === "sm" 
		? "h-7 w-7 sm:h-8 sm:w-8" 
		: "h-8 w-8 sm:h-9 sm:w-9";
	return sizeClasses;
}
