/**
 * EmptyState Component
 * Tampilan awal ketika belum ada pesan
 */

"use client";

interface EmptyStateProps {
	onExampleClick: (prompt: string) => void;
}

const EXAMPLE_PROMPTS = [
	"Ringkas materi kuliah ini menjadi poin penting",
	"Buat rencana belajar satu minggu",
	"Tulis email sopan untuk dosen pembimbing",
];

export function EmptyState({ onExampleClick }: EmptyStateProps) {
	return (
		<div className="flex flex-col items-center justify-center h-full px-4 py-12">
			<div className="max-w-md text-center space-y-6">
				{/* Icon */}
				<div className="flex justify-center">
					<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
						<svg
							className="w-8 h-8 text-blue-600"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
							/>
						</svg>
					</div>
				</div>

				{/* Title */}
				<h2 className="text-2xl font-semibold text-neutral-900">
					Mulai obrolan
				</h2>

				{/* Description */}
				<p className="text-neutral-600 leading-relaxed">
					Tanyakan apa saja, dapatkan jawaban cerdas dari AI
				</p>

				{/* Example prompts */}
				<div className="space-y-3 pt-4">
					<p className="text-sm font-medium text-neutral-700">
						Coba contoh ini:
					</p>
					{EXAMPLE_PROMPTS.map((prompt, index) => (
						<button
							key={index}
							onClick={() => onExampleClick(prompt)}
							className="w-full text-left px-4 py-3 bg-white border border-neutral-200 rounded-xl hover:border-blue-300 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 group"
						>
							<span className="text-sm text-neutral-700 group-hover:text-blue-700">
								{prompt}
							</span>
						</button>
					))}
				</div>
			</div>
		</div>
	);
}
