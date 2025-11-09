# PWA Realtime Update Documentation

## 🔄 Overview

PWA sekarang mendukung **realtime auto-update** yang akan otomatis mendeteksi versi baru dan memberikan prompt untuk update.

## ✨ Features

### 1. **Auto-Detection**
- ✅ Check for updates every 60 seconds
- ✅ Detect new service worker immediately
- ✅ Show update prompt when new version available

### 2. **Update Prompt**
- ✅ Beautiful notification UI
- ✅ "Update Sekarang" button
- ✅ "Nanti" option (dismissable)
- ✅ Auto-reload after update

### 3. **Smart Caching Strategy**
- ✅ **Network First** for HTML pages (always latest)
- ✅ **Cache First** for static assets (fast loading)
- ✅ Background updates for cached assets
- ✅ Offline fallback

### 4. **Seamless Updates**
- ✅ Skip waiting - activate immediately
- ✅ Claim clients - take control instantly
- ✅ Auto-reload page after activation
- ✅ No manual refresh needed

## 🏗️ Architecture

### Service Worker Strategy

```javascript
// Install: Cache assets + Skip Waiting
install → cache files → skipWaiting()

// Activate: Clean old caches + Claim clients + Notify
activate → delete old caches → claim() → notify clients

// Fetch: Network first for HTML, Cache first for assets
fetch HTML → network → cache → fallback
fetch assets → cache → background update → network
```

### Update Flow

```
1. New deployment
   ↓
2. Service worker detects update
   ↓
3. Install new service worker
   ↓
4. Show update prompt to user
   ↓
5. User clicks "Update Sekarang"
   ↓
6. Skip waiting + Activate new SW
   ↓
7. Auto-reload page
   ↓
8. User sees latest version
```

## 🎨 UI Components

### Update Prompt

**Location:** Bottom-right corner

**Design:**
- Card with shadow
- Refresh icon
- Title: "Update Tersedia"
- Description: "Versi baru aplikasi tersedia..."
- Buttons: "Update Sekarang" | "Nanti"

**Behavior:**
- Appears when new version detected
- Dismissable (click "Nanti")
- Auto-reload on "Update Sekarang"
- Slide-in animation

## 🔧 Configuration

### Update Check Interval

Edit `frontend/components/service-worker-register.tsx`:

```typescript
// Check for updates every 60 seconds
setInterval(() => {
  registration.update()
}, 60000) // Change this value (in milliseconds)
```

**Examples:**
- 30 seconds: `30000`
- 1 minute: `60000` (current)
- 5 minutes: `300000`
- 10 minutes: `600000`

### Cache Version

Edit `frontend/public/sw.js`:

```javascript
const CACHE_NAME = 'chatsmart-v2'; // Increment for updates
```

**Important:** Increment version number when you want to force cache refresh.

### Caching Strategy

**Network First (HTML):**
```javascript
// Always get latest HTML
fetch(request) → cache → fallback to cache if offline
```

**Cache First (Assets):**
```javascript
// Fast loading from cache
cache → background update → fallback to network
```

## 🧪 Testing

### Test Update Flow

1. **Deploy Version 1:**
   ```bash
   git add .
   git commit -m "v1"
   git push
   ```

2. **Open app in browser**
   - Service worker registers
   - App loads normally

3. **Make changes and deploy Version 2:**
   ```bash
   # Make some changes
   git add .
   git commit -m "v2"
   git push
   ```

4. **Wait 60 seconds (or refresh)**
   - Update prompt should appear
   - Click "Update Sekarang"
   - Page reloads with new version

### Test Offline Mode

1. Open app
2. Open DevTools > Network
3. Select "Offline"
4. Refresh page
5. App should still work (cached)

### Test Background Update

1. Open app
2. Keep app open
3. Deploy new version
4. Wait 60 seconds
5. Update prompt appears
6. Click update
7. New version loads

## 📊 Monitoring

### Browser Console Logs

**Service Worker:**
```
[SW] Installing new service worker...
[SW] Caching app shell
[SW] Skip waiting - activate immediately
[SW] Activating new service worker...
[SW] Deleting old cache: chatsmart-v1
[SW] Claiming clients - take control immediately
[SW] Notifying client about update
```

**App:**
```
[App] Service Worker registered: /
[App] New service worker found
[App] Service worker state: installed
[App] New version available!
[App] Activating new service worker
[App] Controller changed - reloading page
```

### DevTools Inspection

**Application Tab:**
1. Service Workers section
   - Check registration status
   - See active/waiting workers
   - Force update

2. Cache Storage
   - View cached files
   - Check cache version
   - Clear cache

3. Network Tab
   - See cache hits (from ServiceWorker)
   - Monitor network requests
   - Test offline mode

## 🚀 Deployment

### Automatic Updates

**No configuration needed!**

When you deploy:
1. Push to GitHub
2. Vercel auto-deploys
3. New service worker generated
4. Users get update prompt automatically

### Force Update

To force all users to update:

1. **Increment cache version:**
   ```javascript
   // frontend/public/sw.js
   const CACHE_NAME = 'chatsmart-v3'; // v2 → v3
   ```

2. **Deploy:**
   ```bash
   git add .
   git commit -m "chore: force cache update"
   git push
   ```

3. **Result:**
   - All users get update prompt
   - Old cache deleted
   - Fresh content loaded

## 🐛 Troubleshooting

### Issue: Update prompt not showing

**Check:**
1. Service worker registered? (Console logs)
2. New version deployed? (Check Vercel)
3. Wait 60 seconds for update check
4. Hard refresh (Ctrl+Shift+R)

**Solution:**
```javascript
// Manually trigger update check
navigator.serviceWorker.getRegistration()
  .then(reg => reg.update())
```

### Issue: Old version still showing

**Check:**
1. Cache version incremented?
2. Service worker activated?
3. Page reloaded after update?

**Solution:**
1. Clear cache in DevTools
2. Unregister service worker
3. Hard refresh
4. Re-register service worker

### Issue: Update loop (keeps reloading)

**Check:**
1. Service worker code has errors?
2. Cache name conflicts?
3. Multiple registrations?

**Solution:**
1. Check console for errors
2. Ensure unique cache names
3. Unregister all service workers
4. Fix errors and redeploy

### Issue: Offline mode not working

**Check:**
1. Service worker active?
2. Files cached?
3. Network strategy correct?

**Solution:**
1. Check Application > Cache Storage
2. Verify cached files
3. Test with DevTools offline mode

## 📈 Performance

### Update Detection

- **Check interval:** 60 seconds
- **Network overhead:** Minimal (HEAD request)
- **User impact:** None (background check)

### Update Installation

- **Download time:** Depends on changes
- **Installation:** Immediate (skipWaiting)
- **Activation:** Instant (claim clients)
- **Reload:** < 1 second

### Caching Benefits

- **First load:** Normal speed
- **Cached load:** 10-100x faster
- **Offline:** Full functionality
- **Background updates:** No user wait

## 🎯 Best Practices

### ✅ Do's

- Increment cache version on major changes
- Test update flow before production
- Monitor service worker logs
- Keep update check interval reasonable (60s)
- Show clear update prompts
- Auto-reload after update

### ❌ Don'ts

- Don't check for updates too frequently (< 30s)
- Don't force update without user consent
- Don't cache sensitive data
- Don't ignore service worker errors
- Don't forget to test offline mode

## 🔮 Future Enhancements

- [ ] Background sync for offline actions
- [ ] Push notifications for updates
- [ ] Differential updates (only changed files)
- [ ] Update size indicator
- [ ] Changelog in update prompt
- [ ] Silent updates option
- [ ] Update scheduling (update at specific time)

## 📝 Summary

**PWA Realtime Update Features:**
- ✅ Auto-detection every 60 seconds
- ✅ Beautiful update prompt
- ✅ One-click update
- ✅ Auto-reload after update
- ✅ Network-first for HTML
- ✅ Cache-first for assets
- ✅ Offline support
- ✅ Background updates

**User Experience:**
1. App checks for updates automatically
2. Prompt appears when new version available
3. User clicks "Update Sekarang"
4. Page reloads with latest version
5. Seamless, no manual refresh needed

**Developer Experience:**
1. Deploy new version
2. Users get notified automatically
3. No manual intervention needed
4. Monitor via console logs

---

**PWA is now production-ready with realtime updates!** 🎉
