/**
 * Result type for consistent error handling (LSP compliance)
 * Ensures all functions have predictable return types
 */

export type Result<T, E = Error> =
	| { success: true; data: T }
	| { success: false; error: E }

export function success<T>(data: T): Result<T> {
	return { success: true, data }
}

export function failure<E = Error>(error: E): Result<never, E> {
	return { success: false, error }
}

export function isSuccess<T, E>(result: Result<T, E>): result is { success: true; data: T } {
	return result.success
}

export function isFailure<T, E>(result: Result<T, E>): result is { success: false; error: E } {
	return !result.success
}

/**
 * Unwrap result or throw error
 */
export function unwrap<T>(result: Result<T>): T {
	if (isSuccess(result)) {
		return result.data
	}
	throw result.error
}

/**
 * Unwrap result or return default value
 */
export function unwrapOr<T>(result: Result<T>, defaultValue: T): T {
	if (isSuccess(result)) {
		return result.data
	}
	return defaultValue
}

/**
 * Map result data if success
 */
export function mapResult<T, U>(result: Result<T>, fn: (data: T) => U): Result<U> {
	if (isSuccess(result)) {
		return success(fn(result.data))
	}
	return result as Result<U>
}

/**
 * Wrap async function to return Result
 */
export async function wrapAsync<T>(fn: () => Promise<T>): Promise<Result<T>> {
	try {
		const data = await fn()
		return success(data)
	} catch (error) {
		return failure(error instanceof Error ? error : new Error(String(error)))
	}
}
