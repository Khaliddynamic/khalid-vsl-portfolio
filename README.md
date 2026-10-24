# khalid.vsl — Video Editor & Motion Designer

Minimal, type-led portfolio for **khalid.vsl** — talking-head video editing and motion
graphics for doctors, educators, and personal brands.

Palette: deep navy `#070B14`, cyan `#00D2FF`, off-white `#F3F7FC`.

## Structure

The site is one editorial sequence:

1. **Hero** — oversized role statement, availability meta, short lead, selected-work links
2. **Selected work** — a full-bleed, endlessly looping horizontal rail of nine posters;
   one frame sits centred at full opacity, the neighbours fade with distance, and clicking a
   frame plays the Vimeo video right inside that card
3. **Services** — three deliverables-led columns
4. **Process** — four numbered steps
5. **Contact** — direct channels (WhatsApp / Instagram / email) and a minimal enquiry form
6. **Footer** — brand, year, back to top

No cards, gradients, or decorative panels — structure comes from hairline rules, generous
whitespace, and the type scale.

## Two builds

| Build | Entry | Content source | Run |
| --- | --- | --- | --- |
| **Live site** (single file, deployed) | `index.html` | inline `CONFIG` object | `npm run dev` → `/` |
| **React/Vite app** (same design) | `app.html` | `src/data/portfolio.js` | `npm run dev:app` → `/app.html` |

Both use the same CSS design system (`src/index.css` is the React copy of the live styles).

> The deployed artifact is still the single file `index.html`. The React app is an optional
> componentised version of the same layout.

## Commands

```bash
npm install
npm run dev        # live single-file site at http://localhost:5173/
npm run dev:app    # React build at http://localhost:5173/app.html
npm run build      # builds both entries into dist/
npm run lint
```

## Updating content

- **Live site:** edit the `CONFIG` object in `index.html` (brand, projects, contact links,
  form behaviour). Drop the file in, commit, push — Netlify auto-deploys `main`.
- **React app:** edit `src/data/portfolio.js`, then the matching component if the structure
  changes.

## Player & forms

- The work rail is image-only (no captions or titles) and loops: the card list is rendered
  three times and silently recentred, so there is always work to the left and right of the
  visible frame.
- One card is centred at full opacity; the others fade with distance from the middle. The
  arrows step one card per click and wrap around, and the rail also scrolls by swipe,
  click-drag, trackpad, and the arrow keys.
- Clicking a poster builds the Vimeo embed inside that card (sound on) and keeps the poster
  visible until playback starts. Clicking the same poster or the × stops it; starting another
  card replaces the player. Filtering also clears it.
- The native `<dialog>` player remains in `index.html` for the optional showreel CTA.
- The enquiry form can send via WhatsApp (pre-filled draft) or email through FormSubmit, with
  a mailto draft fallback. No data is stored on the site.

## Files

```
index.html               live single-file portfolio (HTML + CSS + JS)
app.html                 React entry
src/App.jsx              section composition
src/index.css            design system (navy + cyan minimal)
src/data/portfolio.js    projects, services, process, contact
src/components/          Hero, Work, Services, Process, Contact, StickyNav, Footer
```
