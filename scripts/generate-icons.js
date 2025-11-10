/**
 * SmartChat Icon Generator Script
 * Generates PWA icons from smartchat4.png logo
 * 
 * Usage: 
 * 1. Install sharp: npm install --save-dev sharp
 * 2. Run: node scripts/generate-icons.js
 * 
 * This script resizes smartchat4.png to all required PWA icon sizes
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is installed
let sharp;
try {
  sharp = require('sharp');
} catch (error) {
  console.error('❌ Error: sharp is not installed!');
  console.log('\n📦 Please install sharp first:');
  console.log('   npm install --save-dev sharp');
  console.log('\n   Then run this script again.');
  process.exit(1);
}

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Paths
const sourceImage = path.join(__dirname, '../public/smartchat4.png');
const iconsDir = path.join(__dirname, '../public/icons');

// Check if source image exists
if (!fs.existsSync(sourceImage)) {
  console.error('❌ Error: smartchat4.png not found in public folder!');
  console.log('\n📁 Please make sure smartchat4.png exists at:');
  console.log(`   ${sourceImage}`);
  process.exit(1);
}

// Create icons directory if it doesn't exist
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

console.log('🎨 Generating PWA icons from smartchat4.png...\n');

// Generate PNG icons for each size
const generateIcons = async () => {
  // Generate PWA icons
  for (const size of sizes) {
    const filename = `icon-${size}x${size}.png`;
    const filepath = path.join(iconsDir, filename);
    
    try {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(filepath);
      
      console.log(`✅ Generated ${filename}`);
    } catch (error) {
      console.error(`❌ Failed to generate ${filename}:`, error.message);
    }
  }
  
  // Generate favicon.ico (32x32)
  const faviconPath = path.join(__dirname, '../public/favicon.ico');
  try {
    await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(faviconPath);
    
    console.log(`✅ Generated favicon.ico`);
  } catch (error) {
    console.error(`❌ Failed to generate favicon.ico:`, error.message);
  }
  
  console.log('\n🎉 All SmartChat icons generated successfully!');
  console.log('📁 PWA Icons: public/icons/');
  console.log('📁 Favicon: public/favicon.ico');
  console.log('\n✨ Your PWA now uses the SmartChat logo!');
  console.log('\n💡 Clear browser cache (Ctrl+Shift+R) to see the new favicon');
};

generateIcons().catch(error => {
  console.error('❌ Error generating icons:', error);
  process.exit(1);
});
