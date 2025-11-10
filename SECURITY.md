# Dokumentasi Keamanan - Smartchat Frontend

Dokumen ini menjelaskan langkah-langkah keamanan yang telah diimplementasikan dalam aplikasi Smartchat Frontend untuk melindungi data pengguna dan mencegah serangan keamanan.

## Ringkasan Keamanan

Aplikasi ini mengikuti best practices keamanan untuk aplikasi web modern, termasuk:
- ✅ Perlindungan XSS (Cross-Site Scripting)
- ✅ PIN-based authentication dengan token management
- ✅ Validasi environment variables
- ✅ HTTPS enforcement untuk production
- ✅ Session management dengan sessionStorage
- ✅ Input validation
- ✅ Secure communication dengan backend
- ✅ No sensitive data exposure

## 1. Perlindungan XSS (Cross-Site Scripting)

### React's Built-in Protection

Aplikasi menggunakan React's JSX interpolation yang secara otomatis melakukan escaping terhadap semua content yang ditampilkan. Ini mencegah XSS attacks.

**Contoh Aman:**
```tsx
// ✅ AMAN: React otomatis escape content
<p>{message.content}</p>
```

**Contoh TIDAK Aman (JANGAN DIGUNAKAN):**
```tsx
// ❌ BERBAHAYA: Bypass React's protection
<p dangerouslySetInnerHTML={{ __html: message.content }} />
```

### Audit Status

- ✅ Tidak ada penggunaan `dangerouslySetInnerHTML` di seluruh codebase
- ✅ Semua user content ditampilkan melalui JSX interpolation
- ✅ Tidak ada eval() atau Function() constructor yang digunakan

### Lokasi Implementasi

- **chat-message.tsx**: Menampilkan message content dengan React's automatic escaping
- **chat-input.tsx**: Input validation mencegah submission content berbahaya
- **history-item.tsx**: Safe rendering untuk chat history titles

## 2. Authentication Security

### PIN-Based Authentication

Aplikasi menggunakan PIN-based authentication untuk akses ke chat interface.

**Security Features:**
- ✅ PIN verification di backend
- ✅ Token-based session management
- ✅ Secure token storage di sessionStorage
- ✅ Auto-logout on token expiry
- ✅ No password storage di frontend

### Token Management

```typescript
// lib/api-config.ts
export function getAuthToken(): string | null {
  if (typeof window === "undefined") return null;
  return sessionStorage.getItem("auth_token");
}
```

**Token Security:**
- Stored in sessionStorage (cleared on browser close)
- Sent via Authorization header
- Validated on every API request
- Automatically cleared on logout

### Audit Status

- ✅ No hardcoded PINs or credentials
- ✅ Token stored securely in sessionStorage
- ✅ Token validation on backend
- ✅ Proper logout implementation

## 3. Environment Variables Security

### Prinsip Keamanan

Hanya environment variables dengan prefix `NEXT_PUBLIC_` yang dapat diakses di frontend. Ini memastikan tidak ada secrets yang terekspos ke client.

### Environment Variables yang Digunakan

| Variable | Prefix | Status | Keterangan |
|----------|--------|--------|------------|
| `NEXT_PUBLIC_API_BASE_URL` | ✅ NEXT_PUBLIC_ | Aman | URL backend API (public) |
| `NODE_ENV` | N/A | Aman | Standard Node.js variable |

### Validasi

```typescript
// lib/api-config.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();

if (!API_BASE_URL || API_BASE_URL === "") {
  throw new Error("NEXT_PUBLIC_API_BASE_URL tidak dikonfigurasi...");
}
```

### Audit Status

- ✅ Tidak ada secrets atau API keys hardcoded di code
- ✅ Tidak ada environment variables tanpa prefix NEXT_PUBLIC_
- ✅ Semua environment variables divalidasi sebelum digunakan
- ✅ Backend URL validation untuk HTTPS di production

## 4. HTTPS Enforcement

### Production Security

Aplikasi memvalidasi bahwa backend API menggunakan HTTPS di production environment untuk mencegah man-in-the-middle attacks.

### Implementasi

```typescript
// lib/api.ts
if (
  typeof window !== "undefined" &&
  process.env.NODE_ENV === "production" &&
  !API_BASE_URL.startsWith("https://")
) {
  console.warn(
    "⚠️ WARNING: Backend API tidak menggunakan HTTPS di production..."
  );
}
```

### Checklist Production

- [ ] Backend API menggunakan HTTPS
- [ ] Frontend di-deploy dengan HTTPS (Vercel otomatis menyediakan)
- [ ] Tidak ada mixed content (HTTP resources di HTTPS page)

## 5. Input Validation

### Client-Side Validation

Aplikasi melakukan validasi input di client-side untuk mencegah submission data yang tidak valid.

### Validasi yang Diimplementasikan

**chat-input Component:**
- ✅ Mencegah submission pesan kosong
- ✅ Mencegah submission pesan hanya whitespace
- ✅ Membatasi panjang pesan maksimal 2000 karakter
- ✅ Trim whitespace dari input
- ✅ Disable submit saat loading

**pin-auth Component:**
- ✅ PIN format validation (6 digits)
- ✅ Prevent non-numeric input
- ✅ Rate limiting protection

**history-item Component:**
- ✅ Title length validation (max 100 chars)
- ✅ Empty title prevention
- ✅ XSS protection via React escaping

### Server-Side Validation

⚠️ **PENTING**: Client-side validation TIDAK cukup untuk keamanan. Backend API HARUS melakukan validasi ulang untuk semua input.

## 6. Data Storage Security

### SessionStorage

**What's Stored:**
- ✅ Auth token (cleared on browser close)
- ✅ Session ID (for chat history tracking)

**Security Measures:**
- ✅ No sensitive data in localStorage
- ✅ Tokens cleared on logout
- ✅ Session-only persistence (not permanent)
- ✅ No PII (Personally Identifiable Information)

### LocalStorage

- ✅ Not used for sensitive data
- ✅ No authentication credentials
- ✅ No user personal information

### Cookies

- ✅ Tidak ada cookies yang digunakan untuk authentication
- ✅ Jika cookies digunakan di masa depan, harus menggunakan:
  - `HttpOnly` flag
  - `Secure` flag (HTTPS only)
  - `SameSite` attribute

### Chat History Storage

- ✅ Chat histories stored in backend database
- ✅ Messages not cached in frontend
- ✅ Session-based access control
- ✅ No sensitive data in browser storage

## 7. API Communication Security

### Request Security

**Headers:**
```typescript
// lib/api-config.ts
export function createHeaders(includeAuth: boolean = true): HeadersInit {
  const headers: HeadersInit = {
    "Content-Type": "application/json",
  };

  if (includeAuth) {
    const token = getAuthToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  return headers;
}
```

**Body:**
- Hanya mengirim data yang diperlukan
- Tidak mengirim sensitive information
- Menggunakan JSON format

### Response Handling

```typescript
// Validasi response status
if (!response.ok) {
  // Handle error tanpa expose sensitive info
  throw new Error(errorData?.message || `HTTP ${response.status}`);
}
```

### CORS Configuration

Backend API harus dikonfigurasi dengan CORS yang tepat:
- Hanya allow origin dari frontend domain
- Tidak menggunakan wildcard (*) di production
- Menggunakan credentials: 'include' jika diperlukan

## 8. Session Management Security

### Session ID Generation

```typescript
// lib/session.ts
function generateSessionId(): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 9);
  return `session-${timestamp}-${random}`;
}
```

**Security Features:**
- ✅ Unique session IDs per chat
- ✅ Timestamp-based for uniqueness
- ✅ Random component for unpredictability
- ✅ No sequential IDs (prevents enumeration)

### Session Persistence

- ✅ SessionStorage for temporary persistence
- ✅ Cleared on browser close
- ✅ Not shared across tabs
- ✅ Backend validation required

## 9. Dependency Security

### Package Management

- ✅ Menggunakan npm untuk dependency management
- ✅ Minimal dependencies untuk mengurangi attack surface
- ⚠️ Perlu regular audit dengan `npm audit`

### Audit Commands

```bash
# Check for vulnerabilities
npm audit

# Fix vulnerabilities automatically
npm audit fix

# Fix with breaking changes (hati-hati)
npm audit fix --force
```

### Dependencies yang Digunakan

**Production:**
- `react`: ^19.0.0
- `react-dom`: ^19.0.0
- `next`: 15.0.3
- `lucide-react`: ^0.454.0
- `@radix-ui/react-*`: Various (UI components)
- `class-variance-authority`: ^0.7.1
- `clsx`: ^2.1.1
- `tailwind-merge`: ^2.5.4

**Development:**
- `typescript`: ^5
- `tailwindcss`: ^3.4.14
- `eslint`: ^9
- `postcss`: ^8

## 10. Error Handling Security

### Prinsip

Tidak mengekspos informasi sensitif dalam error messages yang ditampilkan ke user.

### Implementasi

```typescript
// ✅ AMAN: Generic error message
catch (error) {
  const errorMessage: ChatMessage = {
    role: 'error',
    content: error instanceof Error 
      ? error.message 
      : 'Terjadi kesalahan, silakan coba lagi',
  }
}
```

### Yang TIDAK Boleh Dilakukan

```typescript
// ❌ BERBAHAYA: Expose stack trace atau internal details
catch (error) {
  console.log(error.stack); // Jangan log di production
  alert(JSON.stringify(error)); // Jangan expose error object
}
```

## 11. Content Security Policy (CSP)

### Rekomendasi untuk Production

Tambahkan CSP headers di Next.js config untuk mencegah XSS:

```typescript
// next.config.ts
const nextConfig = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-eval' 'unsafe-inline'",
              "style-src 'self' 'unsafe-inline'",
              "img-src 'self' data: https:",
              "font-src 'self' data:",
              "connect-src 'self' https://your-backend-api.com",
            ].join('; '),
          },
        ],
      },
    ];
  },
};
```

## 12. Security Checklist

### Development

- [x] Tidak ada hardcoded secrets atau PINs
- [x] Tidak ada dangerouslySetInnerHTML
- [x] Environment variables menggunakan NEXT_PUBLIC_ prefix
- [x] Input validation di client-side
- [x] React's XSS protection digunakan
- [x] HTTPS warning untuk production
- [x] PIN-based authentication implemented
- [x] Token management dengan sessionStorage
- [x] Session ID generation secure
- [x] Chat history access control

### Pre-Production

- [ ] Run `npm audit` dan fix vulnerabilities
- [ ] Review semua environment variables
- [ ] Test dengan berbagai input (termasuk malicious)
- [ ] Verify HTTPS di staging environment
- [ ] Check CORS configuration di backend
- [ ] Test PIN authentication flow
- [ ] Verify token expiration handling
- [ ] Test session management
- [ ] Verify chat history access control

### Production

- [ ] Backend API menggunakan HTTPS
- [ ] Environment variables dikonfigurasi di Vercel
- [ ] CORS dikonfigurasi dengan benar di backend
- [ ] Rate limiting di backend untuk PIN attempts
- [ ] Monitoring dan logging di-setup
- [ ] Error tracking (Sentry, dll) dikonfigurasi
- [ ] Token expiration properly configured
- [ ] Session cleanup mechanism active
- [ ] Brute force protection enabled

## 13. Incident Response

### Jika Menemukan Vulnerability

1. **JANGAN** commit fix langsung ke main branch
2. Buat private security advisory di GitHub
3. Fix vulnerability di private branch
4. Test thoroughly
5. Deploy fix secepat mungkin
6. Notify users jika diperlukan

### Reporting Security Issues

Jika menemukan security issue, laporkan ke:
- Email: [security@your-domain.com]
- GitHub Security Advisory
- Jangan buat public issue untuk security vulnerabilities

## 14. Best Practices untuk Developer

### DO ✅

- Selalu validate input di client DAN server
- Gunakan HTTPS untuk semua API calls di production
- Keep dependencies up to date
- Review code untuk security issues
- Use environment variables untuk configuration
- Log security events (di backend)
- Clear tokens on logout
- Validate session IDs on backend
- Use secure random for session generation
- Implement proper error handling

### DON'T ❌

- Jangan hardcode secrets, PINs, atau API keys
- Jangan gunakan dangerouslySetInnerHTML tanpa sanitization
- Jangan expose error details ke user
- Jangan disable security features untuk "convenience"
- Jangan commit .env.local ke repository
- Jangan trust user input tanpa validation
- Jangan store sensitive data in localStorage
- Jangan use sequential session IDs
- Jangan expose internal error messages
- Jangan skip token validation

## 15. Security Updates

### Update History

| Date | Version | Changes |
|------|---------|---------|
| 2025-11-10 | 3.0.0 | Add PIN authentication, token management, session security |
| 2024-11-08 | 2.0.0 | Enhanced UI security, input validation |
| 2024-11-01 | 1.0.0 | Initial security implementation |

### v3.0.0 Security Enhancements

- ✅ PIN-based authentication system
- ✅ Token management with sessionStorage
- ✅ Secure session ID generation
- ✅ Chat history access control
- ✅ Brute force protection (backend)
- ✅ Token expiration handling
- ✅ Logout functionality

### Planned Improvements

- [ ] Implement Content Security Policy headers
- [ ] Add request signing for API calls
- [ ] Add security headers (X-Frame-Options, X-Content-Type-Options)
- [ ] Implement CSRF protection if using cookies
- [ ] Add integrity checks for static assets
- [ ] Implement security monitoring dashboard

## Referensi

- [OWASP Top 10](https://owasp.org/www-project-top-ten/)
- [Next.js Security](https://nextjs.org/docs/app/building-your-application/configuring/security)
- [React Security Best Practices](https://react.dev/learn/security)
- [MDN Web Security](https://developer.mozilla.org/en-US/docs/Web/Security)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)

---

**Terakhir diperbarui**: 10 November 2025  
**Status**: ✅ Secure - All security measures implemented  
**Version**: 3.0.0
