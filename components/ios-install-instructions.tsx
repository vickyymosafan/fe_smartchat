import { Share, Plus } from "lucide-react"

export default function IOSInstallInstructions() {
	return (
		<div className="space-y-4">
			<p className="text-sm text-muted-foreground">
				Untuk menginstall aplikasi ini di iPhone Anda:
			</p>

			<div className="space-y-3">
				<div className="flex gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
						1
					</div>
					<div className="flex-1 pt-1">
						<p className="text-sm text-card-foreground">
							Tap tombol <strong>Share</strong>{" "}
							<Share className="inline h-4 w-4 mx-1" /> di bagian bawah
							browser Safari
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
						2
					</div>
					<div className="flex-1 pt-1">
						<p className="text-sm text-card-foreground">
							Scroll ke bawah dan tap{" "}
							<strong>"Add to Home Screen"</strong>{" "}
							<Plus className="inline h-4 w-4 mx-1" />
						</p>
					</div>
				</div>

				<div className="flex gap-3">
					<div className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-semibold text-sm">
						3
					</div>
					<div className="flex-1 pt-1">
						<p className="text-sm text-card-foreground">
							Tap <strong>"Add"</strong> di pojok kanan atas
						</p>
					</div>
				</div>
			</div>

			<div className="rounded-lg bg-muted/50 p-3 border border-border">
				<p className="text-xs text-muted-foreground">
					💡 <strong>Tips:</strong> Setelah diinstall, Anda bisa membuka
					ChatSmart langsung dari Home Screen seperti aplikasi native!
				</p>
			</div>
		</div>
	)
}
