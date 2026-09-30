# Mibbles Press Kit

This folder is what `/press` exposes to journalists, bloggers, and partners. Run `npm run package:press-kit` to rebuild the master ZIP after changing assets.

## Folder structure

```
public/press-kit/
├── mibbles-press-kit.zip      ← master archive (auto-generated)
├── README.md                   ← this file
├── boilerplate.txt             ← short + long company blurbs
├── logos/                      ← SVG + PNG, wordmark + monogram, light + dark
│   ├── logo-wordmark-dark.svg
│   ├── logo-wordmark-light.svg
│   ├── logo-monogram-dark.svg
│   ├── logo-monogram-light.svg
│   └── (PNG fallbacks)
├── app-icon.png                ← 1024×1024
├── screenshots-iphone.zip      ← 10 high-resolution iPhone JPGs (1320×2868)
├── screenshots-ipad.zip        ← 10 high-resolution iPad JPGs (2064×2752)
├── founder-headshots.zip       ← founders photo
└── brand-colors.txt            ← hex codes for reference
```

## When you update assets

1. Replace the relevant ZIP or source asset.
2. Run `npm run package:press-kit` from the repo root.
3. Commit and deploy.

## Brand colors

- **Cream** — `#FAFAF7` (background)
- **Ink** — `#1A1A1A` (text)
- **Terracotta** — `#E27D5F` (accent)

Use the wordmark logo on cream backgrounds. Use the light variant on the
ink-900 background. The monogram is for favicons, app icons, and tight
spaces where the wordmark won't fit.
