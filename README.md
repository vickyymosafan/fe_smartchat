# Smartchat Frontend

Aplikasi chat frontend yang dibangun dengan Next.js 15, TypeScript, dan Tailwind CSS. Aplikasi ini menyediakan antarmuka chat yang responsif, accessible, dan profesional untuk berkomunikasi dengan backend AI, dilengkapi dengan fitur chat history management.

## 📋 Daftar Isi

- [Fitur](#-fitur)
- [Teknologi](#-teknologi)
- [Prasyarat](#-prasyarat)
- [Instalasi](#-instalasi)
- [Konfigurasi Environment](#-konfigurasi-environment)
- [Menjalankan Aplikasi](#-menjalankan-aplikasi)
- [Build untuk Production](#-build-untuk-production)
- [Struktur Proyek](#-struktur-proyek)
- [Deployment ke Vercel](#-deployment-ke-vercel)
- [Troubleshooting](#-troubleshooting)
- [Dokumentasi Tambahan](#-dokumentasi-tambahan)

## ✨ Fitur

### Core Features
- 💬 **Chat Real-time**: Kirim dan terima pesan dari AI dengan respons cepat
- 📚 **Chat History Management**: Simpan, lihat, dan kelola riwayat percakapan
- 🔄 **Session Management**: Persistent session tracking dengan sessionStorage
- 🗂️ **Sidebar History**: Collapsible sidebar dengan daftar chat histories
- ✏️ **Rename & Delete**: Edit judul chat atau hapus riwayat yang tidak diperlukan
- 🆕 **New Chat**: Mulai percakapan baru tanpa menghapus riwayat sebelumnya

### UI/UX Features
- 🎨 **UI Modern**: Desain clean dan profesional dengan Tailwind CSS
- 📱 **Responsive**: Tampilan optimal di semua ukuran layar (mobile, tablet, desktop)
- ♿ **Accessible**: Kepatuhan WCAG 2.1 AA dengan ARIA labels dan keyboard navigation
- 🎭 **Loading States**: Visual feedback untuk semua operasi async
- 🌐 **Bahasa Indonesia**: Semua teks UI dalam bahasa Indonesia

### Technical Features
- 🔒 **Secure**: PIN-based authentication dengan token management
- ⚡ **Performance**: Optimized queries dan bundle size
- ✅ **Type-Safe**: Full TypeScript dengan strict mode
- 🎯 **SOLID Principles**: Arsitektur yang maintainable dan extensible
- 🔄 **Auto-refresh**: History list otomatis update saat ada perubahan

## 🛠 Teknologi

### Core

- **[Next.js 15](https://nextjs.org/)** - React framework dengan App Router
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS 3](https://tailwindcss.com/)** - Utility-first CSS framework

### UI Components

- **[Radix UI](https://www.radix-ui.com/)** - Accessible component primitives
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library
- **[class-variance-authority](https://cva.style/)** - Component variants management
- **[clsx](https://github.com/lukeed/clsx)** - Conditional className utility

### Font

- **[Geist](https://vercel.com/font)** - Modern font family via next/font

### Development Tools

- **ESLint 9** - Code linting
- **eslint-config-next** - Next.js ESLint configuration
- **PostCSS** - CSS processing

## 📦 Prasyarat

Pastikan sistem Anda memiliki:

- **Node.js** versi 18.17 atau lebih tinggi
- **npm** versi 9 atau lebih tinggi (atau package manager lain seperti yarn, pnpm)
- **Git** untuk version control

Cek versi yang terinstall:

```bash
node --version
npm --version
```

## 🚀 Instalasi

### 1. Clone Repository

```bash
git clone <repository-url>
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

Atau menggunakan package manager lain:

```bash
# Yarn
yarn install

# pnpm
pnpm install
```

### 3. Setup Environment Variables

Copy file `.env.example` menjadi `.env.local`:

```bash
# Windows (Command Prompt)
copy .env.example .env.local

# Windows (PowerShell)
Copy-Item .env.example .env.local

# Linux/Mac
cp .env.example .env.local
```

Edit file `.env.local` dan sesuaikan dengan konfigurasi Anda (lihat bagian [Konfigurasi Environment](#-konfigurasi-environment)).

## 🔧 Konfigurasi Environment

### Environment Variables

Aplikasi ini memerlukan environment variable berikut:

#### `NEXT_PUBLIC_API_BASE_URL` (REQUIRED)

URL base untuk backend API yang menangani request chat.

**Format:**
```
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
```

**Contoh untuk berbagai environment:**

```bash
# Development (lokal)
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001

# Staging
NEXT_PUBLIC_API_BASE_URL=https://backend-staging.vercel.app

# Production
NEXT_PUBLIC_API_BASE_URL=https://backend-app.vercel.app
```

**⚠️ PENTING:**
- Variabel ini WAJIB diisi, aplikasi tidak akan berjalan tanpa ini
- Gunakan HTTPS untuk production environment
- Pastikan backend sudah dikonfigurasi CORS untuk menerima request dari frontend
- Prefix `NEXT_PUBLIC_` diperlukan agar variabel dapat diakses di browser

### File Environment

- **`.env.local`** - Environment variables untuk development lokal (JANGAN commit ke Git)
- **`.env.example`** - Template environment variables (commit ke Git)
- **`.env.production`** - Environment variables untuk production (opsional)

## 💻 Menjalankan Aplikasi

### Development Mode

Jalankan development server dengan hot reload:

```bash
npm run dev
```

Aplikasi akan berjalan di [http://localhost:3000](http://localhost:3000)

**Fitur Development Mode:**
- Hot Module Replacement (HMR)
- Fast Refresh
- Error overlay
- Source maps

### Linting

Jalankan ESLint untuk check code quality:

```bash
npm run lint
```

Fix linting issues secara otomatis:

```bash
npm run lint -- --fix
```

## 🏗 Build untuk Production

### 1. Build Aplikasi

```bash
npm run build
```

Perintah ini akan:
- Compile TypeScript
- Optimize dan bundle code
- Generate static pages
- Create production-ready build di folder `.next`

### 2. Test Production Build Lokal

```bash
npm run start
```

Aplikasi production akan berjalan di [http://localhost:3000](http://localhost:3000)

**⚠️ Catatan:** Pastikan sudah menjalankan `npm run build` sebelum `npm run start`

### 3. Verifikasi Build

Cek bahwa:
- ✅ Build berhasil tanpa error
- ✅ Aplikasi berjalan dengan baik di production mode
- ✅ Semua fitur berfungsi normal
- ✅ Performance optimal (cek di browser DevTools)

## 📁 Struktur Proyek

```
frontend/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout dengan Geist font
│   ├── page.tsx                 # Main chat page dengan PIN auth
│   └── globals.css              # Global styles dan Tailwind directives
│
├── components/                   # React components
│   ├── chatbot-interface.tsx    # Main chat interface dengan sidebar
│   ├── chat-header.tsx          # Header dengan reset dan sidebar toggle
│   ├── chat-input.tsx           # Input field dengan auto-expand
│   ├── chat-message.tsx         # Message bubble dengan timestamp
│   ├── sidebar.tsx              # Collapsible sidebar dengan history list
│   ├── history-item.tsx         # Single history item dengan actions
│   ├── pin-auth.tsx             # PIN authentication component
│   ├── splash-screen.tsx        # Loading splash screen
│   ├── pwa-install-prompt.tsx   # PWA installation prompt
│   ├── service-worker-register.tsx # Service worker registration
│   └── ui/                      # Reusable UI components
│       ├── button.tsx           # Button component dengan variants
│       └── textarea.tsx         # Textarea component
│
├── hooks/                        # Custom React hooks
│   ├── useAuth.ts               # Authentication state management
│   ├── useChat.ts               # Chat state dan message handling
│   ├── useChatHistory.ts        # Chat history CRUD operations
│   └── useAutoScroll.ts         # Auto-scroll functionality
│
├── lib/                          # Utility libraries
│   ├── api.ts                   # Chat API service layer
│   ├── api-config.ts            # API configuration dan headers
│   ├── auth-api.ts              # Authentication API
│   ├── chat-history-api.ts      # Chat history API
│   ├── session.ts               # Session management utilities
│   ├── message-factory.ts       # Message creation utilities
│   ├── styles.ts                # Shared style utilities
│   └── utils.ts                 # General utility functions
│
├── types/                        # TypeScript type definitions
│   └── chat.ts                  # Chat-related types dan interfaces
│
├── public/                       # Static assets
│   ├── icons/                   # PWA icons
│   ├── screenshots/             # PWA screenshots
│   ├── manifest.json            # PWA manifest
│   └── sw.js                    # Service worker
│
├── scripts/                      # Build scripts
│   └── generate-icons.js        # Icon generation script
│
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (gitignored)
├── .gitignore                   # Git ignore rules
├── components.json              # Shadcn UI configuration
├── eslint.config.mjs            # ESLint configuration
├── next.config.ts               # Next.js configuration
├── package.json                 # Dependencies dan scripts
├── postcss.config.mjs           # PostCSS configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── tsconfig.json                # TypeScript configuration
├── vercel.json                  # Vercel deployment configuration
├── CHANGELOG.md                 # Version history dan changes
├── README.md                    # Dokumentasi ini
├── ACCESSIBILITY.md             # Dokumentasi aksesibilitas
└── SECURITY.md                  # Dokumentasi keamanan
```

### Penjelasan Folder

- **`app/`** - Next.js App Router untuk routing dan layouts
- **`components/`** - Reusable React components dengan single responsibility
  - **`ui/`** - Base UI components (buttons, inputs, etc)
- **`hooks/`** - Custom hooks untuk state management dan side effects
- **`lib/`** - Service layer, API clients, dan utility functions
- **`types/`** - TypeScript type definitions dan interfaces
- **`public/`** - Static files dan PWA assets
- **`scripts/`** - Build dan utility scripts

## 🚢 Deployment ke Vercel

### Prasyarat Deployment

- [x] Akun Vercel (gratis di [vercel.com](https://vercel.com))
- [x] Repository Git (GitHub, GitLab, atau Bitbucket)
- [x] Backend API sudah deployed dan accessible
- [x] CORS dikonfigurasi di backend untuk allow frontend origin

### Langkah-langkah Deployment

#### 1. Push Code ke Git Repository

```bash
git add .
git commit -m "feat: initial commit"
git push origin main
```

#### 2. Import Project ke Vercel

1. Login ke [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **"New Project"**
3. Import repository dari GitHub/GitLab/Bitbucket
4. Select repository **frontend**

#### 3. Configure Project

Vercel akan auto-detect Next.js project. Verifikasi settings:

- **Framework Preset:** Next.js
- **Root Directory:** `./` (atau sesuaikan jika frontend di subfolder)
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.next` (auto-detected)
- **Install Command:** `npm install` (auto-detected)

#### 4. Set Environment Variables

Di Vercel dashboard, tambahkan environment variable:

**Key:** `NEXT_PUBLIC_API_BASE_URL`  
**Value:** `https://your-backend-api.vercel.app` (URL backend production)

**Cara menambahkan:**
1. Go to **Project Settings**
2. Click **Environment Variables**
3. Add variable dengan key dan value di atas
4. Select environment: **Production**, **Preview**, **Development**
5. Click **Save**

#### 5. Deploy

1. Click **"Deploy"**
2. Tunggu build process selesai (biasanya 1-3 menit)
3. Vercel akan memberikan URL deployment (e.g., `https://your-app.vercel.app`)

#### 6. Verifikasi Deployment

Cek bahwa:
- ✅ Aplikasi dapat diakses di URL Vercel
- ✅ Chat functionality berfungsi normal
- ✅ API calls ke backend berhasil
- ✅ Tidak ada error di browser console
- ✅ Responsive di berbagai device

### Continuous Deployment

Setelah setup awal, Vercel akan otomatis deploy:

- **Push ke `main` branch** → Deploy ke production
- **Pull Request** → Deploy preview untuk testing
- **Push ke branch lain** → Deploy preview (opsional)

### Custom Domain (Opsional)

1. Go to **Project Settings** → **Domains**
2. Add custom domain (e.g., `chat.yourdomain.com`)
3. Follow DNS configuration instructions
4. Vercel akan otomatis provision SSL certificate

## 🔧 Troubleshooting

### Problem: Aplikasi tidak bisa connect ke backend

**Gejala:**
- Error message "Koneksi gagal" di chat
- Network error di browser console
- API calls gagal

**Solusi:**

1. **Cek environment variable:**
   ```bash
   # Pastikan .env.local ada dan berisi:
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   ```

2. **Cek backend sudah running:**
   ```bash
   # Test backend API
   curl http://localhost:3001/api/chat
   ```

3. **Cek CORS configuration di backend:**
   - Backend harus allow origin dari frontend
   - Development: `http://localhost:3000`
   - Production: `https://your-app.vercel.app`

4. **Restart development server:**
   ```bash
   # Stop server (Ctrl+C)
   # Start ulang
   npm run dev
   ```

### Problem: Build gagal dengan TypeScript error

**Gejala:**
- `npm run build` gagal
- TypeScript compilation errors

**Solusi:**

1. **Cek TypeScript errors:**
   ```bash
   npx tsc --noEmit
   ```

2. **Fix type errors di code**

3. **Clear cache dan rebuild:**
   ```bash
   rm -rf .next
   npm run build
   ```

### Problem: Styling tidak muncul atau broken

**Gejala:**
- Tailwind classes tidak apply
- Layout broken
- No styling

**Solusi:**

1. **Cek Tailwind configuration:**
   - Pastikan `tailwind.config.js` ada
   - Cek content paths sudah benar

2. **Cek globals.css:**
   - Pastikan Tailwind directives ada:
     ```css
     @tailwind base;
     @tailwind components;
     @tailwind utilities;
     ```

3. **Clear cache:**
   ```bash
   rm -rf .next
   npm run dev
   ```

### Problem: Font tidak load (Montserrat)

**Gejala:**
- Font fallback ke system font
- Montserrat tidak muncul

**Solusi:**

1. **Cek internet connection** (font load dari Google Fonts)

2. **Cek app/layout.tsx:**
   ```typescript
   import { Montserrat } from 'next/font/google'
   
   const montserrat = Montserrat({
     subsets: ['latin'],
     variable: '--font-montserrat',
   })
   ```

3. **Clear browser cache** dan reload

### Problem: Environment variable tidak terbaca

**Gejala:**
- Error "NEXT_PUBLIC_API_BASE_URL tidak dikonfigurasi"
- Undefined environment variable

**Solusi:**

1. **Pastikan file .env.local ada:**
   ```bash
   # Windows
   dir .env.local
   
   # Linux/Mac
   ls -la .env.local
   ```

2. **Pastikan format benar:**
   ```bash
   # BENAR
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
   
   # SALAH (ada spasi)
   NEXT_PUBLIC_API_BASE_URL = http://localhost:3001
   ```

3. **Restart development server** (environment variables hanya load saat startup)

4. **Cek prefix NEXT_PUBLIC_:**
   - Environment variables di browser HARUS pakai prefix `NEXT_PUBLIC_`

### Problem: Port 3000 sudah digunakan

**Gejala:**
- Error "Port 3000 is already in use"

**Solusi:**

1. **Gunakan port lain:**
   ```bash
   # Windows
   set PORT=3001 && npm run dev
   
   # Linux/Mac
   PORT=3001 npm run dev
   ```

2. **Kill process di port 3000:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # Linux/Mac
   lsof -ti:3000 | xargs kill -9
   ```

### Problem: Deployment gagal di Vercel

**Gejala:**
- Build failed di Vercel
- Deployment error

**Solusi:**

1. **Cek build logs di Vercel dashboard**

2. **Test build lokal:**
   ```bash
   npm run build
   ```

3. **Cek environment variables di Vercel:**
   - Pastikan `NEXT_PUBLIC_API_BASE_URL` sudah diset

4. **Cek Node.js version:**
   - Vercel default: Node.js 18.x
   - Sesuaikan di `package.json` jika perlu:
     ```json
     "engines": {
       "node": ">=18.17.0"
     }
     ```

### Problem: Slow performance

**Gejala:**
- Aplikasi lambat
- High bundle size
- Slow page load

**Solusi:**

1. **Analyze bundle size:**
   ```bash
   npm run build
   # Check output untuk bundle sizes
   ```

2. **Check Network tab di browser DevTools:**
   - Cek request yang lambat
   - Optimize API calls

3. **Enable production mode untuk testing:**
   ```bash
   npm run build
   npm run start
   ```

4. **Check Lighthouse score:**
   - Open Chrome DevTools
   - Run Lighthouse audit
   - Follow recommendations

## 📚 Dokumentasi Tambahan

### Dokumentasi Lengkap

- **[ACCESSIBILITY.md](./ACCESSIBILITY.md)** - Panduan aksesibilitas dan WCAG compliance
- **[SECURITY.md](./SECURITY.md)** - Security best practices dan audit checklist

### Dokumentasi Eksternal

- **[Next.js Documentation](https://nextjs.org/docs)** - Next.js features dan API
- **[React Documentation](https://react.dev/)** - React concepts dan hooks
- **[Tailwind CSS Documentation](https://tailwindcss.com/docs)** - Tailwind utility classes
- **[TypeScript Documentation](https://www.typescriptlang.org/docs/)** - TypeScript handbook
- **[Vercel Documentation](https://vercel.com/docs)** - Deployment dan hosting

### NPM Scripts Reference

| Script | Command | Deskripsi |
|--------|---------|-----------|
| `dev` | `npm run dev` | Jalankan development server dengan hot reload |
| `build` | `npm run build` | Build aplikasi untuk production |
| `start` | `npm run start` | Jalankan production server (setelah build) |
| `lint` | `npm run lint` | Run ESLint untuk check code quality |

## 🤝 Kontribusi

Untuk berkontribusi pada project ini:

1. Fork repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'feat: add amazing feature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

### Commit Convention

Gunakan [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

## 📄 License

Project ini adalah private dan proprietary.

## 📞 Support

Jika mengalami masalah atau memiliki pertanyaan:

1. Check [Troubleshooting](#-troubleshooting) section
2. Check [Issues](https://github.com/your-repo/issues) di GitHub
3. Create new issue dengan detail lengkap

---

**Dibuat dengan ❤️ menggunakan Next.js, TypeScript, dan Tailwind CSS**

**Versi:** 3.0.0  
**Terakhir diperbarui:** 10 November 2025

## 📝 Changelog

Lihat [CHANGELOG.md](./CHANGELOG.md) untuk detail perubahan di setiap versi.

### Latest Updates (v3.0.0)

- ✨ Chat history management dengan CRUD operations
- 🗂️ Sidebar dengan daftar riwayat percakapan
- 🔄 Session management dan persistence
- ⚡ Optimized database queries (N+1 fix)
- 🐛 Bug fixes untuk history loading
