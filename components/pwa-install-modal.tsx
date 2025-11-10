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
			<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in flex items-center justify-center p-3 sm:p-4">
				<div className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-md">
					<div className="rounded-lg border border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in zoom-in-95">
						<div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
							<div className="flex-shrink-0 rounded-lg bg-green-500/10 p-1.5 sm:p-2">
								<Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />
							</div>
							<div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
								<h3 className="font-semibold text-sm sm:text-base text-card-foreground">
									Aplikasi Sudah Terinstall
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground">
									ChatSmart sudah terinstall di perangkat Anda
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
								onClick={onClose}
							>
								<X className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</div>
						<Button onClick={onClose} className="w-full text-xs sm:text-sm" size="sm">
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
			<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in flex items-center justify-center p-3 sm:p-4">
				<div className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-md">
					<div className="rounded-lg border border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in zoom-in-95">
						<div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
							<div className="flex-shrink-0 rounded-lg bg-primary/10 p-1.5 sm:p-2">
								<Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
							</div>
							<div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
								<h3 className="font-semibold text-sm sm:text-base text-card-foreground">
									Install ChatSmart
								</h3>
								<p className="text-xs sm:text-sm text-muted-foreground">
									Aplikasi ini dapat diinstall melalui browser yang mendukung PWA
								</p>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
								onClick={onClose}
							>
								<X className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</div>
						<Button onClick={onClose} className="w-full text-xs sm:text-sm" size="sm">
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
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm animate-in fade-in flex items-center justify-center p-3 sm:p-4">
					<div className="w-full max-w-[calc(100vw-1.5rem)] sm:max-w-[calc(100vw-2rem)] md:max-w-md">
						<div className="rounded-lg border border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in zoom-in-95">
							<div className="flex items-start gap-2 sm:gap-3 mb-3 sm:mb-4">
								<div className="flex-shrink-0 rounded-lg bg-primary/10 p-1.5 sm:p-2">
									<Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
								</div>
								<div className="flex-1 space-y-0.5 sm:space-y-1 min-w-0">
									<h3 className="font-semibold text-sm sm:text-base text-card-foreground">
										Install ChatSmart
									</h3>
									<p className="text-xs sm:text-sm text-muted-foreground">
										Install aplikasi ini untuk akses lebih cepat dan pengalaman yang lebih baik
									</p>
								</div>
								<Button
									variant="ghost"
									size="icon"
									className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
									onClick={onClose}
								>
									<X className="h-4 w-4 sm:h-5 sm:w-5" />
								</Button>
							</div>
							<div className="flex flex-col xs:flex-row gap-2">
								<Button onClick={handleInstall} className="flex-1 text-xs sm:text-sm" size="sm">
									<Download className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
									Install Sekarang
								</Button>
								<Button variant="outline" onClick={onClose} className="text-xs sm:text-sm" size="sm">
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
					<div className="fixed bottom-0 left-0 right-0 max-h-[90vh] overflow-y-auto rounded-t-2xl border-t border-border bg-card p-4 sm:p-5 md:p-6 shadow-2xl animate-in slide-in-from-bottom-5">
						<div className="flex items-start justify-between mb-3 sm:mb-4 gap-2">
							<div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
								<div className="rounded-lg bg-primary/10 p-1.5 sm:p-2 flex-shrink-0">
									<Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
								</div>
								<div className="min-w-0">
									<h3 className="font-semibold text-sm sm:text-base text-card-foreground">
										Install ChatSmart
									</h3>
									<p className="text-[10px] sm:text-xs text-muted-foreground">
										Tambahkan ke Home Screen
									</p>
								</div>
							</div>
							<Button
								variant="ghost"
								size="icon"
								className="h-7 w-7 sm:h-8 sm:w-8 flex-shrink-0"
								onClick={onClose}
							>
								<X className="h-4 w-4 sm:h-5 sm:w-5" />
							</Button>
						</div>

						<IOSInstallInstructions />

						<Button onClick={onClose} className="w-full mt-3 sm:mt-4 text-xs sm:text-sm" variant="outline">
							Mengerti
						</Button>
					</div>
				</div>
			)}
		</>
	)
}
