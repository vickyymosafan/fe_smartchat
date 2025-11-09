# 🔐 Authentication Session Management

## Overview

Implementasi session management yang memastikan user harus memasukkan PIN setiap kali close aplikasi/website.

## Implementation Strategy

### 1. **sessionStorage** (Primary Solution)
Token disimpan di `sessionStorage` instead of `localStorage`:
- ✅ Token cleared otomatis saat browser tab closed
- ✅ Token cleared otomatis saat browser closed
- ✅ Token cleared otomatis saat PWA closed/killed
- ✅ Token NOT shared across tabs (setiap tab perlu login sendiri)

### 2. **Page Visibility API** (Enhanced Security)
Auto-logout setelah 5 menit inactive:
- ✅ Detect saat app minimize/background
- ✅ Track last active time
- ✅ Auto logout jika elapsed time > 5 minutes
- ✅ Update activity on mouse/keyboard/touch events

### 3. **Activity Tracking**
Track user activity untuk prevent premature logout:
- Mouse movement
- Keyboard input
- Touch events
- Page visibility changes

## Technical Details

### Constants
```typescript
const AUTH_TOKEN_KEY = "auth_token"
const LAST_ACTIVE_KEY = "last_active_time"
const INACTIVE_TIMEOUT_MS = 5 * 60 * 1000 // 5 minutes
```

### Storage Location
- **Before**: `localStorage` (persistent across sessions)
- **After**: `sessionStorage` (cleared on close)

### Files Modified
1. `frontend/hooks/useAuth.ts` - Main authentication logic
2. `frontend/lib/api.ts` - Chat API token retrieval

## Behavior Matrix

| Scenario | Token Status | User Action Required |
|----------|--------------|---------------------|
| Close browser tab | ❌ Cleared | ✅ Re-enter PIN |
| Close browser | ❌ Cleared | ✅ Re-enter PIN |
| Close PWA app | ❌ Cleared | ✅ Re-enter PIN |
| Minimize PWA < 5 min | ✅ Valid | ❌ No action |
| Minimize PWA > 5 min | ❌ Expired | ✅ Re-enter PIN |
| Switch tab < 5 min | ✅ Valid | ❌ No action |
| Switch tab > 5 min | ❌ Expired | ✅ Re-enter PIN |
| Refresh page | ✅ Valid | ❌ No action |
| Open new tab | ❌ No token | ✅ Re-enter PIN |

## User Experience Flow

### First Time Login
1. User opens app
2. Splash screen appears
3. PIN input screen appears
4. User enters PIN (182001)
5. Token stored in sessionStorage
6. Chat interface appears

### Close and Reopen
1. User closes browser/tab/PWA
2. sessionStorage cleared automatically
3. User reopens app
4. Splash screen appears
5. PIN input screen appears (token not found)
6. User must re-enter PIN

### Minimize and Return (< 5 min)
1. User minimizes PWA
2. lastActiveTime stored
3. User returns within 5 minutes
4. Token still valid
5. Chat interface continues

### Minimize and Return (> 5 min)
1. User minimizes PWA
2. lastActiveTime stored
3. User returns after 5+ minutes
4. Session expired detected
5. Auto logout triggered
6. PIN input screen appears

## Security Benefits

### 1. **Session Isolation**
- Each browser tab has separate session
- Token not shared across tabs
- Prevents unauthorized access from other tabs

### 2. **Auto Cleanup**
- Token cleared on browser close
- No persistent credentials
- Reduces attack surface

### 3. **Inactivity Protection**
- Auto logout after 5 minutes inactive
- Prevents unauthorized access on unattended devices
- Configurable timeout duration

### 4. **Activity Tracking**
- Real-time activity monitoring
- Prevents premature logout during active use
- Smooth user experience

## Configuration

### Adjust Timeout Duration
Edit `INACTIVE_TIMEOUT_MS` in `frontend/hooks/useAuth.ts`:

```typescript
// 5 minutes (default)
const INACTIVE_TIMEOUT_MS = 5 * 60 * 1000

// 10 minutes
const INACTIVE_TIMEOUT_MS = 10 * 60 * 1000

// 1 minute (testing)
const INACTIVE_TIMEOUT_MS = 1 * 60 * 1000
```

### Disable Auto-Logout
Remove or comment out the visibility tracking useEffect:

```typescript
// Comment out this entire useEffect to disable auto-logout
useEffect(() => {
  // ... visibility tracking code
}, [isAuthenticated])
```

## Testing

### Test Close Behavior
1. Login dengan PIN
2. Close browser/tab/PWA
3. Reopen app
4. ✅ Should show PIN input screen

### Test Inactivity Timeout
1. Login dengan PIN
2. Minimize app or switch tab
3. Wait 5+ minutes
4. Return to app
5. ✅ Should auto logout and show PIN input

### Test Activity Tracking
1. Login dengan PIN
2. Keep using app (move mouse, type, etc)
3. Wait 5+ minutes while active
4. ✅ Should NOT logout (activity tracked)

### Test Refresh
1. Login dengan PIN
2. Refresh page (F5 or Cmd+R)
3. ✅ Should remain logged in (sessionStorage persists)

## Backend Compatibility

Backend token validation remains unchanged:
- Token stored in-memory Map
- 24 hour expiry
- Validates on each API call

Frontend session management is independent:
- Frontend: sessionStorage + 5 min inactivity
- Backend: in-memory + 24 hour expiry
- Whichever expires first triggers re-authentication

## Migration Notes

### From localStorage to sessionStorage
No migration needed:
- Old tokens in localStorage will be ignored
- Users will need to re-login once
- sessionStorage takes over automatically

### Backward Compatibility
None required:
- Breaking change is intentional
- Improves security posture
- Users expect to re-login after close

## Troubleshooting

### Issue: Auto logout too aggressive
**Solution**: Increase `INACTIVE_TIMEOUT_MS`

### Issue: Token not cleared on close
**Solution**: Verify using sessionStorage (not localStorage)

### Issue: Activity not tracked
**Solution**: Check event listeners are attached

### Issue: Multiple tabs logout each other
**Expected behavior**: Each tab has separate session

## Future Enhancements

### Optional: Remember Me
Add checkbox to use localStorage for persistent sessions:
```typescript
const storage = rememberMe ? localStorage : sessionStorage
```

### Optional: Biometric Auth
Add fingerprint/face recognition for quick re-login

### Optional: Session Transfer
Allow transferring session between tabs (advanced)

## Summary

✅ Token cleared on browser/tab/PWA close
✅ Auto logout after 5 minutes inactive
✅ Activity tracking prevents premature logout
✅ Secure session management
✅ Smooth user experience
✅ Configurable timeout duration

User must re-enter PIN setiap kali close aplikasi! 🔒
