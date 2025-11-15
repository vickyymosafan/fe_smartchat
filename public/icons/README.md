# PWA Icons

This folder contains Progressive Web App (PWA) icons generated from the UMJ logo.

## Icon Sizes

All icons are generated from `/public/UMJ.png`:

- `icon-72x72.png` - Small mobile icon
- `icon-96x96.png` - Mobile icon
- `icon-128x128.png` - Standard mobile icon
- `icon-144x144.png` - High-res mobile icon
- `icon-152x152.png` - iOS icon
- `icon-192x192.png` - Standard PWA icon
- `icon-384x384.png` - Large PWA icon
- `icon-512x512.png` - Extra large PWA icon

## Regenerating Icons

To regenerate all icons from the source logo:

```bash
npm run generate-icons
```

This script will:
1. Read `/public/UMJ.png` as the source image
2. Generate all required PWA icon sizes
3. Create a new `favicon.ico` file

## Source Logo

- **Source File**: `/public/UMJ.png`
- **Logo**: Universitas Muhammadiyah Jember (UMJ)
- **Format**: PNG with transparency

## Usage

These icons are referenced in:
- `/public/manifest.json` - PWA manifest
- `/app/layout.tsx` - HTML head links
- `/public/sw.js` - Service worker cache

## Notes

- Icons are automatically generated with transparent backgrounds
- All icons maintain the aspect ratio of the source logo
- Icons use `contain` fit to preserve logo proportions
