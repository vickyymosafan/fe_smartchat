# PWA Icons

Folder ini berisi icon untuk Progressive Web App (PWA).

## Required Icons

Anda perlu membuat icon dengan ukuran berikut:
- icon-72x72.png
- icon-96x96.png
- icon-128x128.png
- icon-144x144.png
- icon-152x152.png
- icon-192x192.png
- icon-384x384.png
- icon-512x512.png

## Cara Membuat Icons

### Opsi 1: Menggunakan Online Tool
1. Buka https://www.pwabuilder.com/imageGenerator
2. Upload logo Anda (minimal 512x512px)
3. Download semua ukuran icon
4. Letakkan di folder ini

### Opsi 2: Menggunakan Figma/Photoshop
1. Buat artboard dengan ukuran yang dibutuhkan
2. Export sebagai PNG dengan nama yang sesuai
3. Pastikan background transparan atau sesuai brand

### Opsi 3: Menggunakan CLI Tool
```bash
npm install -g pwa-asset-generator
pwa-asset-generator logo.png ./public/icons
```

## Design Guidelines

- **Maskable Icons**: Pastikan elemen penting berada di safe zone (80% dari canvas)
- **Background**: Gunakan warna solid atau gradient yang sesuai brand
- **Padding**: Berikan padding 10-20% untuk maskable icons
- **Format**: PNG dengan transparansi
- **Quality**: High resolution, optimized untuk web

## Testing

Setelah menambahkan icons, test dengan:
1. Chrome DevTools > Application > Manifest
2. Lighthouse PWA audit
3. Install di device untuk melihat hasil actual
