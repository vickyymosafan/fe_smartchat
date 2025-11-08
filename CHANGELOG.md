# Changelog

## [2.0.0] - 2025-11-08

### Added
- **Text Renderer**: Parsing dan rendering teks terstruktur ala ChatGPT
  - Heading dan subheading
  - Numbered list dan bullet list
  - Checklist dengan checkbox
  - Blockquote
  - Code block dengan syntax highlighting
  - Table sederhana
  - Inline code formatting
  - Divider

- **Date Separator**: Separator tanggal otomatis (Hari ini, Kemarin, tanggal lengkap)

- **Empty State**: Tampilan awal dengan contoh prompt yang bisa diklik

- **Toast Notifications**: Feedback visual untuk aksi seperti "Disalin"

- **Scroll Behavior**:
  - Auto-scroll conditional (hanya jika user di bottom)
  - Badge "Pesan baru" saat ada pesan baru dan user scroll ke atas
  - Tombol scroll to bottom dengan badge

- **Action Buttons**:
  - Tombol Salin untuk pesan AI (muncul saat hover)
  - Tombol Kirim Ulang untuk pesan user terakhir
  - Tombol Obrolan Baru di header

- **Keyboard Shortcuts**:
  - Enter: Kirim pesan
  - Shift+Enter: Baris baru
  - Ctrl/Cmd+K: Fokus ke input

- **Auto-expand Textarea**: Input otomatis membesar sesuai konten (max 200px)

- **Character Counter**: Indikator sisa karakter (muncul saat mendekati limit 2000)

- **Loading Indicator**: Spinner animasi saat mengirim pesan

### Changed
- **Typography**: Font Montserrat dengan fallback Inter, Roboto, Arial
- **Line Height**: 1.7 untuk readability optimal
- **Max Width**: 600-700px untuk panjang baris optimal
- **Spacing**: Konsisten dengan kelipatan 4px
- **Colors**: Kontras AA compliant
- **Animations**: Smooth transitions 200ms
- **Focus Ring**: Jelas untuk aksesibilitas keyboard

### Improved
- **Accessibility**:
  - ARIA labels lengkap
  - Keyboard navigation penuh
  - Screen reader friendly
  - Focus management
  - Live regions untuk pesan baru

- **Responsiveness**:
  - Mobile-first design
  - Safe area support
  - No horizontal scroll
  - Touch-friendly targets (min 44px)

- **Performance**:
  - Optimized re-renders
  - Efficient scroll detection
  - Lazy evaluation

### Fixed
- Scroll behavior yang lebih natural
- Timestamp format yang lebih readable
- Error handling yang lebih baik
- Memory leaks pada event listeners

## [1.0.0] - Initial Release
- Basic chat interface
- Message sending and receiving
- Simple styling
