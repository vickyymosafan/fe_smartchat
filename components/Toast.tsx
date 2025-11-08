/**
 * Toast Component
 * Notifikasi feedback singkat
 */

"use client";

import { useEffect } from "react";
import type { Toast as ToastType } from "@/hooks/useToast";

interface ToastProps {
	toast: ToastType;
	onClose: (id: string) => void;
}

export function Toast({ toast, onClose }: ToastProps) {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose(toast.id);
		}, 2000);

		return () => clearTimeout(timer);
	}, [toast.id, onClose]);

	const bgColor = {
		success: "bg-green-600",
		error: "bg-red-600",
		info: "bg-blue-600",
	}[toast.type];

	return (
		<div
			className={`${bgColor} text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 animate-fadeIn`}
			role="alert"
		>
			{toast.type === "success" && (
				<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
					<path
						fillRule="evenodd"
						d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
						clipRule="evenodd"
					/>
				</svg>
			)}
			<span className="text-sm font-medium">{toast.message}</span>
		</div>
	);
}

interface ToastContainerProps {
	toasts: ToastType[];
	onClose: (id: string) => void;
}

export function ToastContainer({ toasts, onClose }: ToastContainerProps) {
	if (toasts.length === 0) return null;

	return (
		<div
			className="fixed bottom-6 right-6 z-50 space-y-2"
			aria-live="polite"
			aria-atomic="true"
		>
			{toasts.map((toast) => (
				<Toast key={toast.id} toast={toast} onClose={onClose} />
			))}
		</div>
	);
}
