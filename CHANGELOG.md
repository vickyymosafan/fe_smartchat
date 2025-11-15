# Changelog

All notable changes to the Smartchat frontend will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.0.3] - 2025-11-15

### Fixed
- **History Loading Bug**: Fixed critical issue where chat history messages were not loading
  - Corrected field name mismatch: frontend was sending `userId` but backend expected `sessionId`
  - Messages now properly saved with correct session references
  - History messages load correctly when clicking history items
  - Added comprehensive logging for debugging session and message retrieval

### Added
- **Diagnostic Tools**: Added script to analyze and fix session data inconsistencies
  - `npm run fix-session-data` to analyze session data
  - `npm run fix-session-data -- --fix` to repair message counts
  - Detailed logging for session lookup and message retrieval

### Changed
- **API Interface**: Updated `ChatApiRequest` interface to use `sessionId` instead of `userId`
- **Backend Logging**: Enhanced logging in `getChatHistory` for better debugging
- **Frontend Logging**: Added detailed request/response logging in chat service

### Technical Details
- Fixed session ID mapping between user-facing ID and internal database ID
- Ensured messages are saved with correct internal session ID reference
- Improved error tracking for session-related operations

## [3.0.2] - 2025-11-11

### Removed
- **History Management**: Removed rename and delete functionality from chat history
  - Removed rename history feature
  - Removed delete history feature
  - Simplified history item UI (read-only display)
  - History list now only supports viewing and switching between conversations

- **New Chat Logic**: Removed "Percakapan Baru" (New Chat) functionality
  - Button UI retained for consistency
  - Reset chat logic disabled
  - Session reset functionality removed
  - Users can only navigate between existing conversations

### Changed
- **History Item**: Simplified to display-only component
  - Removed edit mode
  - Removed action menu (rename/delete buttons)
  - Cleaner, simpler UI focused on navigation

- **Chat Interface**: New Chat button now non-functional
  - Button remains visible for UI consistency
  - No action triggered on click
  - Focus shifted to history navigation only

## [3.0.1] - 2025-11-11

### Fixed
- **Session Reset Bug**: Fixed 500 error when sending message after deleting chat history
  - Chat now automatically resets when deleting the currently active history
  - Prevents sending messages with deleted sessionId
  - Ensures clean state after history deletion

## [3.0.0] - 2025-11-10

### Added
- **Chat History Management**: Complete sidebar with chat history CRUD operations
  - Display all chat histories across sessions
  - Create history automatically on first message
  - Rename chat history with inline editing
  - Delete chat history with confirmation
  - Active history highlighting
  - Click to load previous conversations

- **Session Management**: Persistent session tracking
  - SessionStorage-based session persistence
  - Unique session ID generation
  - Session switching between chats
  - "Percakapan Baru" button to start fresh chat

- **History Sidebar**: Collapsible sidebar with chat list
  - Mobile-responsive with overlay
  - Smooth animations and transitions
  - Empty state for no histories
  - Loading states during operations
  - Hover actions for rename/delete

- **API Layer Improvements**:
  - Centralized API configuration
  - Auth token management
  - Chat history endpoints integration
  - Session-based message loading

### Changed
- **Chat Interface**: Enhanced with history support
  - Load messages from specific sessions
  - Track current active session
  - Auto-refresh history list on new chat
  - Improved loading states

- **Message Loading**: Optimized history retrieval
  - Load all histories on mount
  - Switch between sessions seamlessly
  - Convert backend message format to frontend

### Fixed
- **History Loading Bug**: Messages now load correctly when clicking history items
  - Fixed sessionId to internal ID mapping
  - Proper session lookup before message query
  - Correct API endpoint usage

- **New Chat Behavior**: Creating new chat now preserves previous histories
  - New sessionId generation on "Percakapan Baru"
  - History list shows all previous chats
  - No overwriting of existing histories

### Performance
- **Optimized Queries**: Reduced database calls
  - Single query for all histories with session data
  - Eliminated N+1 query problem
  - Faster history list loading

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

## [1.0.0] - 2025-11-01

### Added
- Basic chat interface
- Message sending and receiving
- Simple styling
- PIN-based authentication
- Real-time AI responses via n8n webhook
