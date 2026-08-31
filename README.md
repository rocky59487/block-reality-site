# Block Reality — project site

[![CurseForge](https://img.shields.io/badge/CurseForge-Block%20Reality-f16436?style=for-the-badge&logo=curseforge&logoColor=white)](https://www.curseforge.com/minecraft/mc-mods/block-reality)
[![Mod Repo](https://img.shields.io/badge/GitHub-Mod%20Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rocky59487/block-reality)
[![Site Repo](https://img.shields.io/badge/GitHub-Site%20Repo-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/rocky59487/block-reality-site)
[![Live Site](https://img.shields.io/badge/Website-Live%20Site-e0533d?style=for-the-badge&logo=googlechrome&logoColor=white)](https://rocky59487.github.io/block-reality-site/)
[![Minecraft](https://img.shields.io/badge/Minecraft-1.20.1-358b46?style=for-the-badge&logo=minecraft&logoColor=white)](https://www.curseforge.com/minecraft/mc-mods/block-reality)
[![Forge](https://img.shields.io/badge/Forge-47.x-dfa843?style=for-the-badge)](https://www.curseforge.com/minecraft/mc-mods/block-reality)

The development site for [Block Reality](https://github.com/rocky59487/block-reality),
a Minecraft Forge mod that runs real finite element analysis on structures you build.

## Quick Links

| Resource | Badge / Link | Description |
|---|---|---|
| **CurseForge** | [![CurseForge](https://img.shields.io/badge/CurseForge-Download-f16436?style=flat-square&logo=curseforge&logoColor=white)](https://www.curseforge.com/minecraft/mc-mods/block-reality) | Official mod release page on CurseForge |
| **Mod Repository** | [![GitHub](https://img.shields.io/badge/GitHub-block--reality-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rocky59487/block-reality) | Source code for Minecraft Forge mod & FEA solver |
| **Site Repository** | [![GitHub](https://img.shields.io/badge/GitHub-block--reality--site-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/rocky59487/block-reality-site) | Documentation & landing site source repository |
| **Live Site** | [![Website](https://img.shields.io/badge/Web-Live%20Docs-e0533d?style=flat-square&logo=googlechrome&logoColor=white)](https://rocky59487.github.io/block-reality-site/) | Official interactive documentation & install guide |

**Live Site:** <https://rocky59487.github.io/block-reality-site/>

Built from scratch with plain HTML and CSS, no framework. This is also where the
devlogs live.

## Run it locally

No build step. Open `index.html` in a browser, or use a live-reload server:

```bash
npx serve .
```

## Layout

| File | What it is |
|---|---|
| `index.html` | landing page — what the mod is, and what it is not |
| `install.html` | installation guide, currently v0.3c |
| `usage.html` | usage guide — blocks, lenses, HUD, commands |
| `devlog.html` | the devlogs |
| `editor.html` | local tool for generating devlog entries |
| `style.css` | all styling |
| `main.js` | link prefetch and the click particle burst |
| `favicon.svg` | site icon |
| `img/` | screenshots, WebP |
| `install/` | the mod jar the install page serves, plus its hash |

## Keeping it in step with the mod

The site documents a specific release. When the mod ships a new one:

1. Copy the new `blockreality-<version>.jar` from the mod repo's `dist/` into `install/`,
   delete the old one, and regenerate the hash:

   ```bash
   cd install && sha256sum blockreality-*.jar > SHA256SUMS.txt
   ```

   The line it prints must match the one in the release's own `SHA256SUMS.txt`.
   `install/** -text` in `.gitattributes` is what keeps it matching — without it,
   line-ending conversion rewrites the payload and every published hash goes stale.

2. Update the version in `install.html` (the tagline, the download button, the
   `#verify` hash) and the version badge in `index.html`.

3. Re-read `dist/START-HERE.txt` in the mod repo against `install.html` and
   `usage.html`. That file is the release's own description of itself, so it is the
   thing to diff against — the block table, the command list and the engine search
   order have all changed across releases.

## Images

Screenshots are WebP, resized to 1600 px wide. Body text maxes out around 600 px,
so anything larger is bytes nobody sees. To add one:

```bash
python -c "
from PIL import Image
im = Image.open('shot.png').convert('RGB')
if im.width > 1600: im = im.resize((1600, round(im.height*1600/im.width)), Image.LANCZOS)
im.save('img/shot.webp', 'WEBP', quality=82, method=6)
print(im.size)
"
```

Put the printed size into the `width`/`height` attributes so the layout does not
jump while the image loads.

## Related Links

- [CurseForge — Block Reality](https://www.curseforge.com/minecraft/mc-mods/block-reality) — Official mod release & downloads
- [GitHub — Block Reality Mod Repository](https://github.com/rocky59487/block-reality) — Minecraft mod source & FEA engine
- [GitHub — Block Reality Site Repository](https://github.com/rocky59487/block-reality-site) — Site source code
- [Live Documentation Site](https://rocky59487.github.io/block-reality-site/) — Online guide & docs
