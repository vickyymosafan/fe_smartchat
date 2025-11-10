import { Share, Plus } from "lucide-react"

export default function IOSInstallInstructions() {
	return (
		<div className="space-y-3 sm:space-y-4">
			<p className="text-xs sm:text-sm text-muted-foreground">
				Untuk menginstall aplikasi ini di iPhone Anda:
			</p>

			<div className="space-y-2 sm:space-y-3">
				<div className="flex gap-2 sm:gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
						1
					</div>
					<div className="flex-1 pt-0.5 sm:pt-1">
						<p className="text-xs sm:text-sm text-card-foreground">
							Tap tombol <strong>Share</strong>{" "}
							<Share className="inline h-3.5 w-3.5 sm:h-4 sm:w-4 mx-0.5 sm:mx-1" /> di bagian bawah
							browser Safari
						</p>
					</div>
				</div>

				<div className="flex gap-2 sm:gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
						2
					</div>
					<div className="flex-1 pt-0.5 sm:pt-1">
						<p className="text-xs sm:text-sm text-card-foreground">
							Scroll ke bawah dan tap{" "}
							<strong>"Add to Home Screen"</strong>{" "}
							<Plus className="inline h-3.5 w-3.5 sm:h-4 sm:w-4 mx-0.5 sm:mx-1" />
						</p>
					</div>
				</div>

				<div className="flex gap-2 sm:gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-primary/10 text-primary font-semibold text-xs sm:text-sm">
						3
					</div>
					<div className="flex-1 pt-0.5 sm:pt-1">
						<p className="text-xs sm:text-sm text-card-foreground">
							Tap <strong>"Add"</strong> di pojok kanan atas
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-lg bg-muted/50 p-2.5 sm:p-3 border border-border">
				<p className="text-[10px] sm:text-xs text-muted-foreground">
					💡 <strong>Tips:</strong> Setelah diinstall, Anda bisa membuka
					ChatSmart langsung dari Home Screen seperti aplikasi native!
				</p>
			</div>
		</div>
	)
}
