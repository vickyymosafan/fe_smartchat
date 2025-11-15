# PWA Screenshots

This folder contains screenshots for the Progressive Web App (PWA) installation prompts.

## Required Screenshots

For optimal PWA experience, you should provide:

### Desktop Screenshot
- **Filename**: `desktop.png`
- **Size**: 1280x720 pixels (16:9 ratio)
- **Form Factor**: `wide`
- **Purpose**: Shown in desktop PWA installation prompts

### Mobile Screenshot
- **Filename**: `mobile.png`
- **Size**: 750x1334 pixels (9:16 ratio)
- **Form Factor**: `narrow`
- **Purpose**: Shown in mobile PWA installation prompts

## Current Status

⚠️ Screenshots need to be created for UMJ Assistant application.

## How to Create Screenshots

1. **Desktop Screenshot**:
   - Open the app in a desktop browser
   - Set viewport to 1280x720
   - Take a screenshot of the main interface
   - Save as `desktop.png`

2. **Mobile Screenshot**:
   - Open the app in mobile view (DevTools)
   - Set viewport to 750x1334
   - Take a screenshot of the main interface
   - Save as `mobile.png`

## Usage

These screenshots are referenced in `/public/manifest.json`:

```json
"screenshots": [
  {
    "src": "/screenshots/desktop.png",
    "sizes": "1280x720",
    "type": "image/png",
    "form_factor": "wide"
  },
  {
    "src": "/screenshots/mobile.png",
    "sizes": "750x1334",
    "type": "image/png",
    "form_factor": "narrow"
  }
]
```

## Best Practices

- Use actual app screenshots, not mockups
- Show the main features of the app
- Ensure good contrast and readability
- Include the UMJ branding
- Avoid text-heavy screenshots
- Show the app in use, not empty states
