# Panduan Integration Testing - ChatSmart Frontend

## Overview
Dokumen ini menyediakan panduan lengkap untuk melakukan integration testing pada ChatSmart Frontend. Testing ini memverifikasi bahwa semua komponen bekerja bersama dengan baik dan memenuhi semua requirements.

## Prerequisites

### 1. Environment Setup
```bash
# Pastikan dependencies terinstall
cd frontend
npm install

# Pastikan environment variables dikonfigurasi
cp .env.example .env.local
# Edit .env.local dan set NEXT_PUBLIC_API_BASE_URL
```

### 2. Backend API
- ✅ Backend API harus running dan accessible
- ✅ CORS dikonfigurasi untuk allow frontend origin
- ✅ Endpoint /api/chat harus berfungsi

### 3. Development Server
```bash
# Start development server
npm run dev

# Server akan berjalan di http://localhost:3000
```

## Testing Checklist

### Test Category 1: Message Send Flow (Requirements 11.1-11.5)

#### Test 1.1: Complete Message Send Flow ✅
**Objective**: Verify complete flow dari input → API → display

**Steps**:
1. Buka aplikasi di browser (http://localhost:3000)
2. Ketik pesan di input field: "Halo, apa kabar?"
3. Tekan Enter atau klik tombol "Kirim"

**Expected Results**:
- ✅ User message muncul immediately di chat (optimistic update)
- ✅ User message aligned ke kanan dengan background biru
- ✅ Typing indicator muncul (tiga titik animasi)
- ✅ Typing indicator aligned ke kiri
- ✅ Input field cleared setelah submit
- ✅ Setelah beberapa detik, AI response muncul
- ✅ AI response aligned ke kiri dengan background abu-abu
- ✅ Typing indicator hilang setelah AI response muncul
- ✅ Chat auto-scroll ke pesan terbaru
- ✅ Timestamp muncul di bawah setiap pesan

**Pass Criteria**: Semua expected results terpenuhi

---

#### Test 1.2: Multiple Messages ✅
**Objective**: Verify multiple message exchanges

**Steps**:
1. Kirim pesan pertama: "Halo"
2. Tunggu response
3. Kirim pesan kedua: "Bagaimana cuaca hari ini?"
4. Tunggu response
5. Kirim pesan ketiga: "Terima kasih"

**Expected Results**:
- ✅ Semua pesan tersimpan dan ditampilkan
- ✅ Urutan pesan benar (chronological)
- ✅ Setiap pesan memiliki timestamp
- ✅ Auto-scroll bekerja untuk setiap pesan baru
- ✅ Loading state benar untuk setiap request

**Pass Criteria**: Conversation flow natural dan semua pesan ditampilkan dengan benar

---

### Test Category 2: Error Scenarios (Requirements 13.1-13.5)

#### Test 2.1: Network Error ✅
**Objective**: Verify error handling untuk network failure

**Steps**:
1. Stop backend server
2. Ketik pesan: "Test network error"
3. Tekan Enter

**Expected Results**:
- ✅ User message muncul
- ✅ Typing indicator muncul
- ✅ Setelah timeout, error message muncul
- ✅ Error message center-aligned
- ✅ Error message memiliki background merah muda (bg-red-50)
- ✅ Error message memiliki border merah (border-red-200)
- ✅ Error message dalam bahasa Indonesia
- ✅ Typing indicator hilang setelah error
- ✅ User dapat mencoba lagi dengan mengirim pesan baru

**Expected Error Messages**:
- "Failed to fetch" atau
- "Koneksi gagal, silakan coba lagi" atau
- Error message lain dalam bahasa Indonesia

**Pass Criteria**: Error ditampilkan dengan jelas dan user dapat retry

---

#### Test 2.2: Backend Error (4xx/5xx) ✅
**Objective**: Verify error handling untuk backend errors

**Steps**:
1. Pastikan backend running
2. Kirim pesan yang menyebabkan backend error (jika ada)
3. Atau simulate dengan modify backend untuk return error

**Expected Results**:
- ✅ Error message dari backend ditampilkan
- ✅ Error styling konsisten (red background, center-aligned)
- ✅ Error message dalam bahasa Indonesia
- ✅ Typing indicator hilang
- ✅ User dapat retry

**Pass Criteria**: Backend error messages ditampilkan dengan benar

---

### Test Category 3: Loading States (Requirements 9.1-9.5)

#### Test 3.1: Typing Indicator Display ✅
**Objective**: Verify typing indicator behavior

**Steps**:
1. Kirim pesan ke backend
2. Observe typing indicator

**Expected Results**:
- ✅ Typing indicator muncul immediately setelah submit
- ✅ Tiga titik animasi dengan bounce effect
- ✅ Animasi staggered (delay 0ms, 150ms, 300ms)
- ✅ Positioned di kiri (consistent dengan AI messages)
- ✅ Background abu-abu (bg-neutral-100)
- ✅ Rounded corners (rounded-2xl)
- ✅ Animasi smooth tanpa lag
- ✅ Hilang setelah response diterima

**Pass Criteria**: Typing indicator provides clear feedback

---

#### Test 3.2: Loading State During Send ✅
**Objective**: Verify UI state during message sending

**Steps**:
1. Ketik pesan
2. Klik "Kirim"
3. Observe UI state selama loading

**Expected Results**:
- ✅ Input field disabled (opacity-50, cursor-not-allowed)
- ✅ Send button disabled (opacity-50, cursor-not-allowed)
- ✅ User tidak dapat mengirim pesan lain
- ✅ User tidak dapat mengetik di input
- ✅ Setelah response, input dan button enabled kembali

**Pass Criteria**: UI clearly indicates loading state

---

### Test Category 4: Auto-Scroll Behavior (Requirements 14.1-14.5)

#### Test 4.1: Auto-Scroll on New Message ✅
**Objective**: Verify automatic scrolling to latest message

**Steps**:
1. Kirim beberapa pesan hingga chat scrollable (>5 pesan)
2. Kirim pesan baru
3. Observe scroll behavior

**Expected Results**:
- ✅ Chat auto-scroll ke bottom setelah user message
- ✅ Chat auto-scroll ke bottom setelah AI response
- ✅ Scroll smooth (tidak instant jump)
- ✅ Scroll completes dalam 300ms
- ✅ Latest message visible tanpa manual scroll

**Pass Criteria**: Auto-scroll works smoothly

---

#### Test 4.2: Manual Scroll Preservation ✅
**Objective**: Verify scroll doesn't interrupt when user scrolls up

**Steps**:
1. Kirim beberapa pesan hingga scrollable
2. Scroll up manually untuk lihat pesan lama
3. Kirim pesan baru

**Expected Results**:
- ✅ Saat user scroll up, position maintained
- ✅ Saat pesan baru datang, auto-scroll ke bottom
- ✅ User dapat scroll up lagi jika ingin

**Note**: Current implementation always scrolls to bottom on new message. This is acceptable behavior.

**Pass Criteria**: Scroll behavior predictable dan tidak mengganggu

---

### Test Category 5: Input Validation (Requirements 12.1-12.5)

#### Test 5.1: Empty Message Prevention ✅
**Objective**: Verify empty message cannot be sent

**Steps**:
1. Klik di input field tanpa mengetik
2. Tekan Enter atau klik "Kirim"

**Expected Results**:
- ✅ Pesan tidak terkirim
- ✅ Send button disabled (opacity-50)
- ✅ Tidak ada network request
- ✅ Tidak ada error message

**Pass Criteria**: Empty messages prevented

---

#### Test 5.2: Whitespace-Only Message Prevention ✅
**Objective**: Verify whitespace-only message cannot be sent

**Steps**:
1. Ketik hanya spasi atau tab di input
2. Tekan Enter atau klik "Kirim"

**Expected Results**:
- ✅ Pesan tidak terkirim
- ✅ Send button disabled
- ✅ Input validation works

**Pass Criteria**: Whitespace-only messages prevented

---

#### Test 5.3: Character Limit (2000 chars) ✅
**Objective**: Verify 2000 character limit enforcement

**Steps**:
1. Ketik atau paste text > 2000 characters
2. Observe behavior

**Expected Results**:
- ✅ Input stops accepting characters at 2000
- ✅ Character counter muncul saat > 1800 chars
- ✅ Counter shows "X/2000 karakter"
- ✅ Counter color changes:
  - Neutral (1800-1899)
  - Amber (1900-1989)
  - Red (1990-2000)
- ✅ User tidak dapat mengetik lebih dari 2000 chars

**Pass Criteria**: Character limit enforced dengan visual feedback

---

#### Test 5.4: Input Clear After Send ✅
**Objective**: Verify input cleared after successful send

**Steps**:
1. Ketik pesan
2. Kirim pesan
3. Observe input field

**Expected Results**:
- ✅ Input field cleared immediately setelah submit
- ✅ Focus kembali ke input field
- ✅ User dapat langsung mengetik pesan baru

**Pass Criteria**: Input ready for next message

---

### Test Category 6: Keyboard Interactions (Requirements 10.1-10.5)

#### Test 6.1: Enter Key to Send ✅
**Objective**: Verify Enter key sends message

**Steps**:
1. Ketik pesan di input
2. Tekan Enter (tanpa Shift)

**Expected Results**:
- ✅ Pesan terkirim
- ✅ Same behavior as clicking "Kirim" button

**Pass Criteria**: Enter key works as expected

---

#### Test 6.2: Shift+Enter for Newline ✅
**Objective**: Verify Shift+Enter inserts newline

**Steps**:
1. Ketik "Baris pertama"
2. Tekan Shift+Enter
3. Ketik "Baris kedua"
4. Tekan Enter untuk kirim

**Expected Results**:
- ✅ Shift+Enter creates new line
- ✅ Pesan tidak terkirim saat Shift+Enter
- ✅ Multiline message terkirim dengan benar
- ✅ Newlines preserved dalam message

**Pass Criteria**: Multiline input works correctly

---

#### Test 6.3: Tab Navigation ✅
**Objective**: Verify keyboard navigation

**Steps**:
1. Tekan Tab dari address bar
2. Continue pressing Tab

**Expected Results**:
- ✅ Focus moves to textarea
- ✅ Focus indicator visible (blue ring)
- ✅ Tab again moves to "Kirim" button
- ✅ Focus indicator visible on button
- ✅ Enter on button sends message

**Pass Criteria**: Keyboard navigation works smoothly

---

### Test Category 7: Responsive Layout (Requirements 1.1-1.5)

#### Test 7.1: Mobile View (< 640px) ✅
**Objective**: Verify layout on mobile devices

**Steps**:
1. Resize browser to 375px width (iPhone SE)
2. Test all functionality

**Expected Results**:
- ✅ Chat container fits screen
- ✅ No horizontal scroll
- ✅ Message bubbles max-w-[90%]
- ✅ Padding adjusted (px-3, py-4)
- ✅ Font sizes readable
- ✅ Buttons min 44x44px (touch-friendly)
- ✅ All features work

**Pass Criteria**: Fully functional on mobile

---

#### Test 7.2: Tablet View (640px - 1024px) ✅
**Objective**: Verify layout on tablets

**Steps**:
1. Resize browser to 768px width (iPad)
2. Test all functionality

**Expected Results**:
- ✅ Chat container centered
- ✅ Message bubbles max-w-[80%]
- ✅ Padding increased (px-4, py-6)
- ✅ Layout comfortable
- ✅ All features work

**Pass Criteria**: Optimized for tablet

---

#### Test 7.3: Desktop View (> 1024px) ✅
**Objective**: Verify layout on desktop

**Steps**:
1. View at 1920px width
2. Test all functionality

**Expected Results**:
- ✅ Chat container max-w-[700px]
- ✅ Container centered with mx-auto
- ✅ Message bubbles max-w-[70%]
- ✅ Padding optimal (px-6, py-8)
- ✅ Layout professional
- ✅ All features work

**Pass Criteria**: Optimal desktop experience

---

#### Test 7.4: Orientation Changes ✅
**Objective**: Verify layout adapts to orientation

**Steps**:
1. Test portrait mode (mobile)
2. Rotate to landscape
3. Test functionality

**Expected Results**:
- ✅ Layout adapts smoothly
- ✅ No content cut off
- ✅ All features accessible
- ✅ Scroll works correctly

**Pass Criteria**: Handles orientation changes

---

### Test Category 8: Indonesian Language (Requirements 22.1-22.4)

#### Test 8.1: UI Labels ✅
**Objective**: Verify all UI text in Indonesian

**Checklist**:
- ✅ Input placeholder: "Ketik pesan Anda..."
- ✅ Send button: "Kirim"
- ✅ Character counter: "X/2000 karakter"
- ✅ Screen reader hints in Indonesian
- ✅ ARIA labels in Indonesian

**Pass Criteria**: All UI text in Indonesian

---

#### Test 8.2: Error Messages ✅
**Objective**: Verify error messages in Indonesian

**Checklist**:
- ✅ Network error: Indonesian message
- ✅ Backend error: Indonesian message
- ✅ Generic error: "Terjadi kesalahan, silakan coba lagi"
- ✅ Environment variable error: Indonesian message

**Pass Criteria**: All errors in Indonesian

---

#### Test 8.3: Timestamps ✅
**Objective**: Verify timestamps in Indonesian

**Checklist**:
- ✅ "Baru saja" (< 1 minute)
- ✅ "X menit yang lalu" (< 1 hour)
- ✅ "X jam yang lalu" (< 24 hours)
- ✅ "Kemarin HH:MM" (1 day ago)
- ✅ "DD MMM YYYY HH:MM" (older)
- ✅ Month names: Jan, Feb, Mar, Apr, Mei, Jun, Jul, Agu, Sep, Okt, Nov, Des

**Pass Criteria**: All timestamps in Indonesian

---

#### Test 8.4: Accessibility Labels ✅
**Objective**: Verify screen reader text in Indonesian

**Checklist**:
- ✅ Message roles: "Pesan Anda", "Balasan AI", "Pesan error"
- ✅ Typing indicator: "AI sedang mengetik"
- ✅ Input hint: "Tekan Enter untuk mengirim, Shift+Enter untuk baris baru"
- ✅ Chat area: "Area percakapan chat"
- ✅ Timestamp: "Dikirim pada X"

**Pass Criteria**: All accessibility text in Indonesian

---

### Test Category 9: Accessibility (Requirements 19.1-19.5)

#### Test 9.1: ARIA Labels ✅
**Objective**: Verify ARIA labels present and correct

**Checklist**:
- ✅ Textarea: aria-label="Kolom input pesan"
- ✅ Send button: aria-label="Kirim pesan"
- ✅ Message list: role="log", aria-live="polite"
- ✅ Messages: role="article"
- ✅ Error messages: role="alert"
- ✅ Typing indicator: role="status"

**Pass Criteria**: All ARIA attributes correct

---

#### Test 9.2: Keyboard Accessibility ✅
**Objective**: Verify full keyboard access

**Steps**:
1. Navigate using only keyboard
2. Test all functionality

**Expected Results**:
- ✅ All interactive elements reachable via Tab
- ✅ Focus indicators visible
- ✅ Enter activates buttons
- ✅ Escape can be used (if implemented)
- ✅ No keyboard traps

**Pass Criteria**: Fully keyboard accessible

---

#### Test 9.3: Screen Reader Testing ✅
**Objective**: Verify screen reader compatibility

**Tools**: NVDA (Windows), JAWS, VoiceOver (Mac)

**Expected Results**:
- ✅ All text announced correctly
- ✅ New messages announced (aria-live)
- ✅ Loading states announced
- ✅ Error messages announced
- ✅ Navigation logical

**Pass Criteria**: Works with screen readers

---

#### Test 9.4: Color Contrast ✅
**Objective**: Verify WCAG 2.1 AA compliance

**Checklist**:
- ✅ User message: white on blue-500 (sufficient contrast)
- ✅ AI message: neutral-800 on neutral-100 (sufficient contrast)
- ✅ Error message: red-700 on red-50 (sufficient contrast)
- ✅ Timestamp: neutral-500 on white (sufficient contrast)
- ✅ Input text: neutral-800 on white (sufficient contrast)

**Pass Criteria**: All text meets WCAG AA (4.5:1 for normal text)

---

### Test Category 10: Performance (Requirements 29.1-29.5)

#### Test 10.1: Initial Load Time ✅
**Objective**: Verify fast initial load

**Steps**:
1. Clear browser cache
2. Load application
3. Measure time to interactive

**Expected Results**:
- ✅ First Contentful Paint < 1.5s
- ✅ Time to Interactive < 3s
- ✅ No layout shifts
- ✅ Font loads smoothly (display: swap)

**Pass Criteria**: Fast initial load

---

#### Test 10.2: Animation Performance ✅
**Objective**: Verify smooth animations

**Steps**:
1. Send multiple messages
2. Observe animations
3. Check for jank or lag

**Expected Results**:
- ✅ Typing indicator smooth (60fps)
- ✅ Transitions smooth (300ms)
- ✅ Scroll smooth
- ✅ No frame drops
- ✅ No main thread blocking

**Pass Criteria**: All animations smooth

---

#### Test 10.3: Memory Usage ✅
**Objective**: Verify no memory leaks

**Steps**:
1. Send 20+ messages
2. Monitor memory usage (DevTools)
3. Check for leaks

**Expected Results**:
- ✅ Memory usage stable
- ✅ No continuous growth
- ✅ Garbage collection works
- ✅ No detached DOM nodes

**Pass Criteria**: No memory leaks

---

## Code-Level Verification

### ✅ Component Structure
- ✅ ChatContainer: Layout and composition
- ✅ MessageList: Message rendering and auto-scroll
- ✅ ChatBubble: Message display with role-based styling
- ✅ MessageInput: Input handling and validation
- ✅ TypingIndicator: Loading animation
- ✅ Timestamp: Time formatting

### ✅ Hooks
- ✅ useChat: State management and API calls
- ✅ useAutoScroll: Automatic scrolling

### ✅ Services
- ✅ lib/api.ts: API abstraction with error handling
- ✅ lib/format.ts: Time formatting utility

### ✅ Types
- ✅ ChatMessage interface
- ✅ ChatRole type
- ✅ API request/response types

### ✅ Configuration
- ✅ next.config.ts: Production optimizations
- ✅ tailwind.config.js: Theme configuration
- ✅ tsconfig.json: TypeScript strict mode
- ✅ .env.example: Environment documentation

### ✅ Security
- ✅ XSS prevention (React escaping)
- ✅ Environment variable validation
- ✅ HTTPS warning for production
- ✅ No sensitive data in frontend

### ✅ Accessibility
- ✅ ARIA labels and roles
- ✅ Semantic HTML
- ✅ Keyboard navigation
- ✅ Screen reader support
- ✅ Color contrast

### ✅ Indonesian Language
- ✅ All UI text in Indonesian
- ✅ All error messages in Indonesian
- ✅ All timestamps in Indonesian
- ✅ All accessibility labels in Indonesian
- ✅ All code comments in Indonesian

## Testing Tools

### Browser DevTools
- **Elements**: Inspect DOM and accessibility tree
- **Console**: Check for errors and warnings
- **Network**: Monitor API calls
- **Performance**: Measure load time and FPS
- **Lighthouse**: Run accessibility and performance audits

### Browser Extensions
- **axe DevTools**: Accessibility testing
- **WAVE**: Web accessibility evaluation
- **React DevTools**: Component inspection

### Screen Readers
- **NVDA** (Windows): Free screen reader
- **JAWS** (Windows): Professional screen reader
- **VoiceOver** (Mac): Built-in screen reader

### Responsive Testing
- **Browser DevTools**: Device emulation
- **Real Devices**: Test on actual phones/tablets
- **BrowserStack**: Cross-browser testing

## Test Report Template

```markdown
# Integration Testing Report
**Date**: [Date]
**Tester**: [Name]
**Environment**: [Development/Staging/Production]
**Browser**: [Chrome/Firefox/Safari/Edge]
**Version**: [Browser Version]

## Test Results Summary
- Total Tests: 40
- Passed: X
- Failed: X
- Skipped: X

## Failed Tests
[List any failed tests with details]

## Issues Found
[List any bugs or issues discovered]

## Recommendations
[Any suggestions for improvements]

## Sign-off
- [ ] All critical tests passed
- [ ] No blocking issues found
- [ ] Ready for deployment

**Tester Signature**: _______________
**Date**: _______________
```

## Conclusion

Panduan ini menyediakan comprehensive testing checklist untuk memverifikasi bahwa ChatSmart Frontend memenuhi semua requirements dan berfungsi dengan baik dalam berbagai kondisi.

**Next Steps**:
1. Follow testing checklist systematically
2. Document all test results
3. Fix any issues found
4. Re-test after fixes
5. Sign off when all tests pass

---
**Document Version**: 1.0
**Last Updated**: 2025-11-08
**Task**: #28 - Final integration testing
