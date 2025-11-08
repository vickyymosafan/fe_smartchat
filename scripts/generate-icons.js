/**
 * Simple Icon Generator Script
 * Generates placeholder PWA icons if you don't have them yet
 * 
 * Usage: node scripts/generate-icons.js
 * 
 * Note: This creates simple colored squares as placeholders.
 * Replace with actual branded icons for production!
 */

const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '../public/icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG placeholder for each size
sizes.forEach(size => {
  const svg = `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#000000;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#333333;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad)" rx="${size * 0.15}"/>
  <text 
    x="50%" 
    y="50%" 
    font-family="Arial, sans-serif" 
    font-size="${size * 0.3}" 
    font-weight="bold"
    fill="white" 
    text-anchor="middle" 
    dominant-baseline="middle"
  >SC</text>
  <text 
    x="50%" 
    y="${size * 0.75}" 
    font-family="Arial, sans-serif" 
    font-size="${size * 0.08}" 
    fill="white" 
    text-anchor="middle" 
    opacity="0.8"
  >SmartChat</text>
</svg>`.trim();

  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svg);
  console.log(`✅ Generated ${filename}`);
});

console.log('\n🎉 All placeholder icons generated!');
console.log('📁 Location: public/icons/');
console.log('\n⚠️  IMPORTANT: These are placeholder SVG icons.');
console.log('   For production, replace with actual PNG icons using:');
console.log('   - https://www.pwabuilder.com/imageGenerator');
console.log('   - Or design your own in Figma/Photoshop');
console.log('\n💡 SVG icons work for testing, but PNG is recommended for better compatibility.');
