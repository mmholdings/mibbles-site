# Mibbles Press Kit

This folder is what `/press` exposes to journalists, bloggers, and partners. Drop your real
assets in here, then run `pnpm package:press-kit` to (re)build the master ZIP.

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
├── screenshots-iphone/         ← iPhone 15 Pro screenshots (1290×2796)
├── screenshots-ipad/           ← iPad screenshots (2048×2732)
├── founder-headshots/          ← high-res portraits
└── brand-colors.txt            ← hex codes for reference
```

## When you update assets

1. Drop the new files into the relevant subfolder.
2. Run `pnpm package:press-kit` from the repo root.
3. Commit and deploy.

## Brand colors

- **Cream** — `#FAFAF7` (background)
- **Ink** — `#1A1A1A` (text)
- **Terracotta** — `#E27D5F` (accent)

Use the wordmark logo on cream backgrounds. Use the light variant on the
ink-900 background. The monogram is for favicons, app icons, and tight
spaces where the wordmark won't fit.
