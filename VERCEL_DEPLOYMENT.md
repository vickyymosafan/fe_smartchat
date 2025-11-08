# Panduan Deployment ke Vercel

## Overview
Dokumen ini memberikan panduan lengkap untuk deploy ChatSmart Frontend ke Vercel. Aplikasi ini sudah dikonfigurasi dan siap untuk deployment tanpa konfigurasi tambahan.

## Prerequisites

### 1. Akun dan Repository
- ✅ Akun Vercel (gratis di [vercel.com](https://vercel.com))
- ✅ Repository GitHub/GitLab/Bitbucket dengan kode frontend
- ✅ Backend API sudah di-deploy dan accessible

### 2. Verifikasi Konfigurasi Lokal
Sebelum deploy, pastikan aplikasi berjalan dengan baik secara lokal:

```bash
# Install dependencies
npm install

# Test development build
npm run dev

# Test production build
npm run build
npm start
```

## Vercel Compatibility Checklist

### ✅ Next.js Configuration
**File**: `next.config.ts`

```typescript
const nextConfig: NextConfig = {
  reactStrictMode: true,      // ✅ Vercel compatible
  poweredByHeader: false,     // ✅ Vercel compatible
  compress: true,             // ✅ Vercel compatible
};
```

**Status**: Semua konfigurasi kompatibel dengan Vercel

### ✅ App Router Architecture
- ✅ Menggunakan Next.js 16.0.1 dengan App Router
- ✅ Struktur folder `app/` sesuai standar
- ✅ Server Components dan Client Components terpisah dengan baik
- ✅ Metadata API digunakan dengan benar

**Struktur App Router**:
```
app/
├── layout.tsx          # Root layout (Server Component)
├── page.tsx            # Main page (Client Component)
└── globals.css         # Global styles
```

### ✅ Environment Variables
- ✅ Menggunakan prefix `NEXT_PUBLIC_` untuk client-side variables
- ✅ `.env.local` ada di `.gitignore`
- ✅ `.env.example` terdokumentasi dengan baik
- ✅ Validasi environment variable di `lib/api.ts`

**Required Environment Variables**:
- `NEXT_PUBLIC_API_BASE_URL` - URL backend API (REQUIRED)

### ✅ Dependencies
- ✅ Semua dependencies kompatibel dengan Vercel
- ✅ Tidak ada custom server
- ✅ Tidak ada native modules yang tidak supported
- ✅ Package.json memiliki scripts standar

### ✅ Build Configuration
- ✅ Build command: `npm run build` (auto-detected)
- ✅ Output directory: `.next` (auto-detected)
- ✅ Install command: `npm install` (auto-detected)
- ✅ Node version: Compatible dengan Vercel (Node 18+)

## Step-by-Step Deployment

### Metode 1: Deploy via Vercel Dashboard (Recommended)

#### Step 1: Connect Repository
1. Login ke [vercel.com](https://vercel.com)
2. Click **"Add New..."** → **"Project"**
3. Import repository GitHub/GitLab/Bitbucket Anda
4. Pilih repository `chatsmart` atau nama repository Anda

#### Step 2: Configure Project
Vercel akan auto-detect Next.js project. Verifikasi settings:

**Framework Preset**: Next.js ✅ (auto-detected)

**Root Directory**: `frontend` (jika monorepo) atau `.` (jika standalone)

**Build Settings**:
- Build Command: `npm run build` ✅
- Output Directory: `.next` ✅
- Install Command: `npm install` ✅

**Node.js Version**: 18.x atau 20.x (recommended)

#### Step 3: Configure Environment Variables
Tambahkan environment variables di Vercel dashboard:

1. Scroll ke section **"Environment Variables"**
2. Add variable:
   - **Name**: `NEXT_PUBLIC_API_BASE_URL`
   - **Value**: URL backend production Anda (contoh: `https://backend-app.vercel.app`)
   - **Environment**: Production, Preview, Development (pilih semua)

**Contoh**:
```
Name: NEXT_PUBLIC_API_BASE_URL
Value: https://your-backend.vercel.app
Environments: ✓ Production ✓ Preview ✓ Development
```

**⚠️ PENTING**:
- Gunakan HTTPS untuk production
- Pastikan backend sudah dikonfigurasi CORS untuk menerima request dari frontend domain
- Jangan tambahkan trailing slash di URL

#### Step 4: Deploy
1. Click **"Deploy"**
2. Tunggu build process selesai (~1-2 menit)
3. Vercel akan memberikan URL deployment (contoh: `https://chatsmart-frontend.vercel.app`)

#### Step 5: Verify Deployment
1. Buka URL deployment
2. Test chat functionality
3. Verify API connection ke backend
4. Check console untuk errors

### Metode 2: Deploy via Vercel CLI

#### Install Vercel CLI
```bash
npm install -g vercel
```

#### Login
```bash
vercel login
```

#### Deploy
```bash
# Dari folder frontend
cd frontend

# Deploy ke production
vercel --prod

# Atau deploy ke preview
vercel
```

#### Set Environment Variables via CLI
```bash
# Set production environment variable
vercel env add NEXT_PUBLIC_API_BASE_URL production

# Kemudian masukkan value: https://your-backend.vercel.app
```

## Post-Deployment Configuration

### 1. Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add custom domain (contoh: `chat.yourdomain.com`)
3. Configure DNS records sesuai instruksi Vercel
4. Update backend CORS untuk allow custom domain

### 2. Backend CORS Configuration
Pastikan backend mengizinkan frontend domain:

```typescript
// Backend CORS config
const allowedOrigins = [
  'http://localhost:3000',                    // Development
  'https://chatsmart-frontend.vercel.app',    // Production
  'https://your-custom-domain.com',           // Custom domain (if any)
];
```

### 3. Environment Variables per Environment
Vercel mendukung environment variables berbeda untuk:
- **Production**: Branch `main` atau `master`
- **Preview**: Pull requests dan branch lain
- **Development**: Local development

**Best Practice**:
```
Production:   NEXT_PUBLIC_API_BASE_URL=https://api.production.com
Preview:      NEXT_PUBLIC_API_BASE_URL=https://api.staging.com
Development:  NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

## Continuous Deployment

### Automatic Deployments
Vercel otomatis deploy ketika:
- ✅ Push ke branch `main` → Production deployment
- ✅ Push ke branch lain → Preview deployment
- ✅ Open pull request → Preview deployment dengan unique URL

### Deployment Workflow
```
1. Developer push code ke GitHub
   ↓
2. Vercel detect changes
   ↓
3. Vercel run build
   ↓
4. Build success → Deploy to edge network
   ↓
5. Deployment URL ready
```

### Preview Deployments
Setiap pull request mendapat unique preview URL:
- URL format: `https://chatsmart-frontend-git-branch-name-username.vercel.app`
- Perfect untuk testing sebelum merge ke production
- Isolated environment dengan environment variables sendiri

## Monitoring and Analytics

### 1. Vercel Analytics (Optional)
Enable analytics untuk monitoring:
1. Go to Project Settings → Analytics
2. Enable Vercel Analytics
3. View real-time metrics di dashboard

### 2. Build Logs
Access build logs untuk debugging:
1. Go to Deployments
2. Click deployment
3. View build logs dan runtime logs

### 3. Performance Monitoring
Vercel provides:
- ✅ Core Web Vitals
- ✅ Page load times
- ✅ API response times
- ✅ Error tracking

## Troubleshooting

### Build Failures

#### Error: "Module not found"
**Solution**:
```bash
# Clear cache dan rebuild
rm -rf .next node_modules
npm install
npm run build
```

#### Error: "Environment variable not defined"
**Solution**:
1. Check Vercel dashboard → Settings → Environment Variables
2. Ensure `NEXT_PUBLIC_API_BASE_URL` is set
3. Redeploy after adding variables

#### Error: "Build exceeded maximum duration"
**Solution**:
- Optimize dependencies
- Check for infinite loops in build process
- Contact Vercel support untuk increase limits

### Runtime Errors

#### Error: "Failed to fetch" atau CORS errors
**Solution**:
1. Verify backend CORS configuration
2. Check `NEXT_PUBLIC_API_BASE_URL` value
3. Ensure backend is accessible from Vercel edge network
4. Check backend logs untuk rejected requests

#### Error: "Hydration mismatch"
**Solution**:
- Ensure server and client render same content
- Check for browser-only APIs used in server components
- Review client/server component boundaries

### Performance Issues

#### Slow page loads
**Solution**:
1. Enable Vercel Analytics untuk identify bottlenecks
2. Optimize images dengan next/image
3. Implement code splitting
4. Check backend API response times

## Rollback Strategy

### Rollback to Previous Deployment
1. Go to Deployments tab
2. Find previous working deployment
3. Click **"..."** → **"Promote to Production"**
4. Confirm rollback

**Note**: Rollback instant, tidak perlu rebuild

## Security Best Practices

### 1. Environment Variables
- ✅ Never commit `.env.local` to repository
- ✅ Use `NEXT_PUBLIC_` prefix only untuk truly public values
- ✅ Rotate secrets regularly
- ✅ Use different values untuk production dan preview

### 2. HTTPS
- ✅ Vercel automatically provides HTTPS
- ✅ Ensure backend also uses HTTPS
- ✅ No mixed content (HTTP + HTTPS)

### 3. Headers
- ✅ `poweredByHeader: false` already configured
- ✅ Vercel adds security headers automatically
- ✅ Consider adding CSP headers if needed

## Cost Optimization

### Vercel Free Tier Limits
- ✅ 100 GB bandwidth per month
- ✅ Unlimited deployments
- ✅ Automatic HTTPS
- ✅ Edge network (CDN)

**Tips untuk stay within free tier**:
- Optimize images dan assets
- Use caching effectively
- Monitor bandwidth usage di dashboard

## Maintenance

### Regular Tasks
- [ ] Monitor deployment logs weekly
- [ ] Review analytics monthly
- [ ] Update dependencies quarterly
- [ ] Test preview deployments before merging
- [ ] Backup environment variables configuration

### Updates
```bash
# Update Next.js dan dependencies
npm update
npm run build  # Test locally
git commit -am "chore: update dependencies"
git push       # Auto-deploy to Vercel
```

## Support Resources

### Documentation
- [Vercel Next.js Documentation](https://vercel.com/docs/frameworks/nextjs)
- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Vercel CLI Documentation](https://vercel.com/docs/cli)

### Community
- [Vercel Discord](https://vercel.com/discord)
- [Next.js GitHub Discussions](https://github.com/vercel/next.js/discussions)
- [Vercel Support](https://vercel.com/support)

## Deployment Checklist

Gunakan checklist ini sebelum deploy:

### Pre-Deployment
- [ ] Build berhasil locally (`npm run build`)
- [ ] Production server tested (`npm start`)
- [ ] Environment variables documented di `.env.example`
- [ ] Backend API accessible dan CORS configured
- [ ] `.gitignore` includes `.env.local`
- [ ] No sensitive data di code

### Deployment
- [ ] Repository connected to Vercel
- [ ] Framework preset: Next.js
- [ ] Root directory configured (if monorepo)
- [ ] Environment variables set di Vercel dashboard
- [ ] `NEXT_PUBLIC_API_BASE_URL` points to production backend
- [ ] Deploy button clicked

### Post-Deployment
- [ ] Deployment successful (check build logs)
- [ ] Application accessible via Vercel URL
- [ ] Chat functionality working
- [ ] API connection successful
- [ ] No console errors
- [ ] Backend receiving requests
- [ ] CORS working correctly
- [ ] Font loading correctly
- [ ] Responsive design working

### Optional
- [ ] Custom domain configured
- [ ] Analytics enabled
- [ ] Error tracking setup
- [ ] Performance monitoring active

## Conclusion

ChatSmart Frontend sudah **100% ready untuk Vercel deployment**. Semua konfigurasi sudah optimal dan kompatibel dengan Vercel platform.

### Key Points
✅ Next.js App Router fully compatible
✅ Environment variables properly configured
✅ Build process optimized
✅ No Vercel-incompatible configurations
✅ Security best practices implemented
✅ Continuous deployment ready

**Estimated Deployment Time**: 2-3 menit untuk first deployment

**Next Steps**: Follow Step-by-Step Deployment section untuk deploy aplikasi Anda.

---
**Document Version**: 1.0
**Last Updated**: 2025-11-08
**Task**: #27 - Prepare for Vercel deployment
**Status**: ✅ Complete
