/**
 * Application Configuration
 * Centralized configuration for easy customization without modifying component code
 */

export const APP_CONFIG = {
	// Branding
	branding: {
		appName: "Smartchat",
		appTitle: "Smartchat Assistant",
		tagline: "Mulai percakapan dengan AI untuk bantuan, saran, dan pertanyaan",
		chatTitle: "Chat",
		logoText: "SC",
		subtitle: "AI Assistant",
	},

	// UI Breakpoints (matching Tailwind config)
	breakpoints: {
		xs: 375,      // Small mobile
		sm: 640,      // Mobile large
		md: 768,      // Tablet portrait
		lg: 1024,     // Tablet landscape / Small laptop
		xl: 1280,     // Desktop
		xxl: 1536,    // Large desktop
		// Legacy support
		mobile: 768,
		tablet: 1024,
		desktop: 1280,
	},

	// Chat Configuration
	chat: {
		placeholder: "Tanyakan sesuatu... (Enter untuk kirim, Shift+Enter untuk baris baru)",
		helperText: "Smartchat Assistant siap membantu Anda",
		maxInputHeight: 120,
		loadingText: "Memuat riwayat chat...",
		emptyHistoryText: "Belum ada riwayat",
		suggestions: [
			"Apa saja jalur pendaftaran yang tersedia untuk calon mahasiswa baru Unmuh Jember?",
			"Kapan Universitas Muhammadiyah Jember didirikan dan siapa yang mendirikannya?",
			"Apa saja jenis beasiswa yang tersedia di Unmuh Jember?",
			"Dengan siapa saja Program Studi Pendidikan Olahraga menjalin kerjasama di tingkat lokal?",
		],
	},

	// Sidebar Configuration
	sidebar: {
		newChatLabel: "Percakapan Baru",
		historyLabel: "RIWAYAT",
		aboutLabel: "Tentang",
		loadingText: "Loading...",
	},

	// About Dialog Configuration
	about: {
		title: "Tentang Smartchat",
		description: "Chatbot cerdas untuk informasi Universitas Muhammadiyah Jember",
		teamTitle: "Tim Pengembang",
		copyright: "© 2025 Smartchat - Universitas Muhammadiyah Jember",
		credits: "vickymosafan x adrian reswara",
		team: [
			{
				id: "vm",
				name: "Vickymosafan",
				role: "Developer & Dataset PMB",
				description: "Mengumpulkan dataset dari PMB Universitas Muhammadiyah Jember",
				initials: "VM",
				color: "bg-blue-500",
			},
			{
				id: "ar",
				name: "Adrian Reswara",
				role: "Dataset Collector",
				description: "Mengumpulkan dataset dari unmuhjember.ac.id",
				initials: "AR",
				color: "bg-green-500",
			},
		],
	},

	// Splash Screen Configuration
	splash: {
		duration: 3000,
		exitAnimationDuration: 800,
	},


} as const

export type AppConfig = typeof APP_CONFIG
