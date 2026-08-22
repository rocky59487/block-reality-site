# Block Reality — project site

The development site for [Block Reality](https://github.com/rocky59487/block-reality),
a Minecraft Forge mod that runs real finite element analysis on structures you build.

**Live:** <https://rocky59487.github.io/block-reality-site/>

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
| `index.html` | landing page — what the mod is and how it works |
| `install.html` | installation guide, mod + `br-sidecar` engine |
| `usage.html` | usage guide — blocks, lenses, HUD, commands |
| `devlog.html` | the devlogs |
| `editor.html` | local tool for generating devlog entries |
| `style.css` | all styling |
| `img/` | screenshots and GIFs |
| `install/` | the release payload the install page links to |

## Related

- [Block Reality (the mod)](https://github.com/rocky59487/block-reality)
