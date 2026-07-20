# Haze Note

Haze Note is a macOS-first Obsidian theme with a soft neutral glass frame, local 4K wallpapers, a focused reading surface, and Chinese Style Settings labels.

![Haze Note preview](screenshots/screenshot.png)

## Highlights

- Six original 4K wallpapers embedded directly in `theme.css`.
- Neutral light and graphite dark modes, with one adjustable glass-opacity control.
- A continuous top frame, rounded bottom utility areas, and readable status/backlink text at low opacity.
- SF Mono / Menlo typography with `LXGW WenKai Mono` as the Chinese fallback.
- No remote assets, audio, or runtime background blur.

## Installation

1. Download `theme.css` and `manifest.json` from this repository.
2. Create `Haze Note` under your vault's `.obsidian/themes/` directory.
3. Put both files in that directory and enable **Haze Note** from **Settings → Appearance**.

## Development

The distributable `theme.css` embeds the six wallpapers. To rebuild it after changing `src/theme.template.css` or an image:

```bash
node scripts/build-theme.mjs
```

The source wallpapers are in `assets/wallpapers/`.

## Scope

This repository contains the public theme only. The optional local folder-color plugin, personal vault configuration, test notes, and development feedback are intentionally not included.

## License

MIT. See [LICENSE](LICENSE).
