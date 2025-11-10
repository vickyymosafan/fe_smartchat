"use client"

import { Button } from "@/components/ui/button"
import { X, Download } from "lucide-react"
import IOSInstallInstructions from "./ios-install-instructions"

interface PWAInstallModalProps {
	isOpen: boolean
	onClose: () => void
	onInstall: () => Promise<void>
	deviceType: "android" | "ios" | "desktop" | "unknown"
	canInstall: boolean
	isInstalled: boolean
}

export default function PWAInstallModal({
	isOpen,
	onClose,
	onInstall,
	deviceType,
	canInstall,
	isInstalled,
}: PWAInstallModalProps) {
	if (!isOpen) return null

	const handleInstall = async () => {
		await onInstall()
		onClose()
	}

	// Show message if already installed
	if (isInstalled) {
		return (
			<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
					<div className="rounded-lg border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
						<div className="flex items-start gap-3 mb-4">
							<div className="flex-shrink-0 rounded-lg bg-green-500/10 p-2">
								<Download className="h-6 w-6 text-green-500" />
							</div>
							<div className="flex-1 space-y-1">
								<h3 className="font-semibold text-base text-card-foreground">
									Aplikasi Sudah Terinstall
								</h3>
								<p className="text-sm text-muted-foreground">
									ChatSmart sudah terinstall di perangkat Anda
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 flex-shrink-0"
								onClick={onClose}
							>
								<X className="h-5 w-5" />
							</Button>
						</div>
						<Button onClick={onClose} className="w-full" size="sm">
							OK
						</Button>
					</div>
				</div>
			</div>
		)
	}

	// Show message if cannot install
	if (!canInstall || deviceType === "unknown") {
		return (
			<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
				<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
					<div className="rounded-lg border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
						<div className="flex items-start gap-3 mb-4">
							<div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
								<Download className="h-6 w-6 text-primary" />
							</div>
							<div className="flex-1 space-y-1">
								<h3 className="font-semibold text-base text-card-foreground">
									Install ChatSmart
								</h3>
								<p className="text-sm text-muted-foreground">
									Aplikasi ini dapat diinstall melalui browser yang mendukung PWA
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8 flex-shrink-0"
								onClick={onClose}
							>
								<X className="h-5 w-5" />
							</Button>
						</div>
						<Button onClick={onClose} className="w-full" size="sm">
							OK
						</Button>
					</div>
				</div>
			</div>
		)
	}

	return (
		<>
			{/* Android/Desktop Install Modal */}
			{(deviceType === "android" || deviceType === "desktop") && (
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
					<div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md mx-4">
						<div className="rounded-lg border border-border bg-card p-6 shadow-2xl animate-in zoom-in-95">
							<div className="flex items-start gap-3 mb-4">
								<div className="flex-shrink-0 rounded-lg bg-primary/10 p-2">
									<Download className="h-6 w-6 text-primary" />
								</div>
								<div className="flex-1 space-y-1">
									<h3 className="font-semibold text-base text-card-foreground">
										Install ChatSmart
									</h3>
									<p className="text-sm text-muted-foreground">
										Install aplikasi ini untuk akses lebih cepat dan pengalaman yang lebih baik
									</p>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="h-8 w-8 flex-shrink-0"
									onClick={onClose}
								>
									<X className="h-5 w-5" />
								</Button>
							</div>
							<div className="flex gap-2">
								<Button onClick={handleInstall} className="flex-1" size="sm">
									<Download className="mr-2 h-4 w-4" />
									Install Sekarang
								</Button>
								<Button variant="outline" onClick={onClose} size="sm">
									Batal
								</Button>
							</div>
						</div>
					</div>
				</div>
			)}

			{/* iOS Install Instructions */}
			{deviceType === "ios" && (
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in">
					<div className="fixed bottom-0 left-0 right-0 rounded-t-2xl border-t border-border bg-card p-6 shadow-2xl animate-in slide-in-from-bottom-5">
						<div className="flex items-start justify-between mb-4">
							<div className="flex items-center gap-3">
								<div className="rounded-lg bg-primary/10 p-2">
									<Download className="h-6 w-6 text-primary" />
								</div>
								<div>
									<h3 className="font-semibold text-base text-card-foreground">
										Install ChatSmart
									</h3>
									<p className="text-xs text-muted-foreground">
										Tambahkan ke Home Screen
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-8 w-8"
								onClick={onClose}
							>
								<X className="h-5 w-5" />
							</Button>
						</div>

						<IOSInstallInstructions />

						<Button onClick={onClose} className="w-full mt-4" variant="outline">
							Mengerti
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
