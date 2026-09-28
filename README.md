# khalid.vsl — Video Editor & Motion Designer

Single-file portfolio site for **khalid.vsl** — talking-head video editing & motion design for doctors, educators, and personal brands.

## Contents

- `index.html` — the entire site in one self-contained file (HTML + inline CSS + inline JS). No build step, no dependencies.

## Live site

Published with GitHub Pages — open **Settings → Pages** to see the URL, or visit
`https://khaliddynamic.github.io/portfolio/`

## Tech notes

- **Player:** each project plays via its Vimeo embed in a native `<dialog>` modal
- **Config:** the inline `CONFIG` object in `index.html` is the single source of truth for projects, contact links, showreel, and form behavior
- **Posters:** loaded from Vimeo's CDN with an inline-SVG fallback (no runtime API dependency)
- **No trackers:** no third-party analytics or cookies

## Updating

1. Edit `index.html`
2. Commit & push to `main` — Pages deploys automatically

```bash
git add index.html
git commit -m "update portfolio"
git push
```