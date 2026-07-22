# Haze Note

Haze Note is a macOS-first Obsidian theme built around a calm glass workspace, focused reading, and practical Chinese Style Settings controls.

![Haze Note preview](screenshots/screenshot.png)

## Highlights

- Four bundled wallpaper presets: desert sunset, blue-violet dusk, warm paper, and graphite.
- Neutral light and graphite dark modes with adjustable workspace and popup opacity.
- A continuous, rounded top frame with consistent tab, title, sidebar, and status surfaces.
- Focused reading controls for content width, body size, line height, paragraph spacing, and title layout.
- SF Mono / Menlo typography with `LXGW WenKai Mono` as the Chinese fallback.
- Local assets only: no remote images, audio, or runtime background blur.

## Installation

1. Download `theme.css` and `manifest.json` from this repository.
2. Create `Haze Note` under your vault's `.obsidian/themes/` directory.
3. Put both files in that directory and enable **Haze Note** from **Settings → Appearance**.

## Development

The distributable `theme.css` embeds four optimized WebP wallpaper presets and enforces a 280 KB size ceiling. Install `cwebp`, then rebuild after changing `src/theme.template.css` or an image:

```bash
node scripts/build-theme.mjs
```

Wallpaper source files are kept in `assets/wallpapers/`. Haze Note works without any companion plugin; the optional local Haze Note Folders plugin can override the selected preset with an image stored inside a vault.

## Scope

This repository contains the public theme only. The optional local folder-color plugin, personal vault configuration, test notes, and development feedback are intentionally not included.

## License

MIT. See [LICENSE](LICENSE).
