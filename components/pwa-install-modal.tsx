"use client"

import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { ModalWrapper } from "@/components/ui/modal-wrapper"
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

	// Already installed state
	if (isInstalled) {
		return (
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				title="Aplikasi Sudah Terinstall"
				description="ChatSmart sudah terinstall di perangkat Anda"
				icon={<Download className="h-5 w-5 sm:h-6 sm:w-6 text-green-500" />}
			>
				<Button onClick={onClose} className="w-full text-xs sm:text-sm" size="sm">
					OK
				</Button>
			</ModalWrapper>
		)
	}

	// Cannot install state
	if (!canInstall || deviceType === "unknown") {
		return (
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				title="Install ChatSmart"
				description="Aplikasi ini dapat diinstall melalui browser yang mendukung PWA"
				icon={<Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
			>
				<Button onClick={onClose} className="w-full text-xs sm:text-sm" size="sm">
					OK
				</Button>
			</ModalWrapper>
		)
	}

	// Android/Desktop install
	if (deviceType === "android" || deviceType === "desktop") {
		return (
			<ModalWrapper
				isOpen={isOpen}
				onClose={onClose}
				title="Install ChatSmart"
				description="Install aplikasi ini untuk akses lebih cepat dan pengalaman yang lebih baik"
				icon={<Download className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />}
			>
				<div className="flex flex-col xs:flex-row gap-2">
					<Button onClick={handleInstall} className="flex-1 text-xs sm:text-sm" size="sm">
						<Download className="mr-1.5 sm:mr-2 h-3.5 w-3.5 sm:h-4 sm:w-4" />
						Install Sekarang
					</Button>
					<Button variant="outline" onClick={onClose} className="text-xs sm:text-sm" size="sm">
						Batal
					</Button>
				</div>
			</ModalWrapper>
		)
	}

	// iOS install instructions
	if (deviceType === "ios") {
		return (
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
							<Download className="h-4 w-4 sm:h-5 sm:w-5" />
						</Button>
					</div>

					<IOSInstallInstructions />

					<Button onClick={onClose} className="w-full mt-3 sm:mt-4 text-xs sm:text-sm" variant="outline">
						Mengerti
					</Button>
				</div>
			</div>
		)
	}

	return null
}
