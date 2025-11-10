export function handleError(err: any, defaultMessage: string): string {
	const message = err?.message || defaultMessage
	console.error(defaultMessage, err)
	return message
}
