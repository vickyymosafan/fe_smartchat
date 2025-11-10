/**
 * usePinInput hook
 * Separates PIN input logic from UI components
 * Handles PIN state, validation, and keyboard interactions
 */

import { useState, useRef, useEffect, KeyboardEvent, ClipboardEvent } from "react"

interface UsePinInputProps {
	length?: number
	onComplete?: (pin: string) => void
	autoSubmit?: boolean
}

interface UsePinInputReturn {
	pins: string[]
	inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>
	handleChange: (index: number, value: string) => void
	handleKeyDown: (index: number, e: KeyboardEvent<HTMLInputElement>) => void
	handlePaste: (e: ClipboardEvent<HTMLInputElement>) => void
	reset: () => void
	isComplete: boolean
	fullPin: string
}

export function usePinInput({
	length = 6,
	onComplete,
	autoSubmit = true,
}: UsePinInputProps = {}): UsePinInputReturn {
	const [pins, setPins] = useState<string[]>(Array(length).fill(""))
	const inputRefs = useRef<(HTMLInputElement | null)[]>([])

	// Auto-focus first input on mount
	useEffect(() => {
		inputRefs.current[0]?.focus()
	}, [])

	const isComplete = pins.every((pin) => pin !== "")
	const fullPin = pins.join("")

	// Auto-submit when all pins filled
	useEffect(() => {
		if (isComplete && autoSubmit && onComplete) {
			onComplete(fullPin)
		}
	}, [isComplete, autoSubmit, fullPin, onComplete])

	const handleChange = (index: number, value: string) => {
		// Only allow numbers
		if (value && !/^\d$/.test(value)) return

		const newPins = [...pins]
		newPins[index] = value
		setPins(newPins)

		// Auto-advance to next input
		if (value && index < length - 1) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handleKeyDown = (index: number, e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "Backspace") {
			e.preventDefault()

			const newPins = [...pins]

			if (pins[index]) {
				// Clear current box
				newPins[index] = ""
				setPins(newPins)
			} else if (index > 0) {
				// Move to previous box and clear it
				newPins[index - 1] = ""
				setPins(newPins)
				inputRefs.current[index - 1]?.focus()
			}
		} else if (e.key === "ArrowLeft" && index > 0) {
			inputRefs.current[index - 1]?.focus()
		} else if (e.key === "ArrowRight" && index < length - 1) {
			inputRefs.current[index + 1]?.focus()
		}
	}

	const handlePaste = (e: ClipboardEvent<HTMLInputElement>) => {
		e.preventDefault()

		const pastedData = e.clipboardData.getData("text").trim()

		const regex = new RegExp(`^\\d{${length}}$`)
		if (!regex.test(pastedData)) return

		const newPins = pastedData.split("")
		setPins(newPins)

		// Focus last input
		inputRefs.current[length - 1]?.focus()
	}

	const reset = () => {
		setPins(Array(length).fill(""))
		inputRefs.current[0]?.focus()
	}

	return {
		pins,
		inputRefs,
		handleChange,
		handleKeyDown,
		handlePaste,
		reset,
		isComplete,
		fullPin,
	}
}
