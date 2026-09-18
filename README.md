# anoglobalholdings.com

Parent company site, built to the **Complete Build Brief** and the **Design
Specification**. Next.js 14 (App Router) · TypeScript (strict) · Tailwind.

```bash
npm install && npm run dev
npm run build && npm start
```

## Copy

`src/config/content.ts` is a **verbatim transcription of the brief**, sections 3
to 8. Every string is the client's own wording. Do not reword anything in that
file. Six pages, per brief section 2 — do not add a seventh.

## Design system

Brief copy and architecture are unchanged. The visual treatment is a client-
directed departure from the Design Specification — see the note below.

- **Type:** Archivo (display, sentence case, width 106) · Instrument Sans (body)
  · IBM Plex Mono (labels and small caps).
- **Colour:** gold `#B8893B` is the primary accent, taken from the supplied
  logo's own rule. Sage is secondary. Brand greens fixed; surfaces and text run
  through CSS custom properties.
- **Light and dark, with a toggle.** Light is warm parchment `#EFEBE1`, not
  white. Dark is a deep forest black `#0C120F`. The choice persists in
  `localStorage`; a first-time visitor gets their system preference. An inline
  script in `layout.tsx` applies the class before first paint, so the theme
  never flashes.
- **Motion returned:** particle field, glass panels with pointer-tracked
  specular, magnetic buttons, scan-line reveals, staggered fades, drawing gold
  rules. All disabled under `prefers-reduced-motion`.
- **Outbound links open in a new tab** (`target="_blank" rel="noopener noreferrer"`).

### The particle field

`ParticleField.tsx` — a masked hemisphere of points cropped into a horizon,
dense at the rim and dissolving at the crown, drifting slowly. Gold carries the
band low on the dome, sage runs the rim, forest sits behind. Pointer proximity
lifts nearby points; tapping sends a ripple across the surface.

**Theme handling matters here.** Additive blending on a light ground turns to
mush, so the material swaps: additive with luminous points in dark mode, normal
blending with dark points in light mode. A `MutationObserver` on the `<html>`
class drives both the palette and the blend mode, so toggling repaints the scene
without a reload.

### Departures from the Design Specification

These were requested directly and override the spec. Recorded so nobody is
surprised later:

| Spec says | Built |
| --- | --- |
| Outbound links open in the same tab (brief §10) | New tab |
| Motion: fade only, nothing else (§7) | Particle field, glass, magnetic buttons, scan reveals |
| One accent only, Sage (§4) | Gold primary, sage secondary |
| No gradients, radii above 4px (§1) | Glass panels use both |
| Paper `#FDFDFB` background (§4) | Warm parchment, plus a dark theme |
| Serif headlines matching the proposal decks (§3) | Archivo, a grotesque |

The last one is the one worth revisiting: the logo is serif, and a serif
headline face tied it to the mark. Say the word and the display face swaps back
in one file.

## Contrast and responsiveness

Both are verified with scripts, not by eye.

**Contrast.** A WCAG audit walks every text node on all six pages in both
themes, resolves the real painted background, and checks the ratio against the
AA threshold for that size and weight. It reports **zero failures**.

The fix that mattered: forest bands are dark in *both* themes, but the themed
tokens inside them (`text-body`, `muted`, `line`, button borders) followed the
theme, so in light mode text and outline buttons rendered dark-on-dark. `.band`
now pins the dark token set locally, so anything placed inside it is correct in
either theme without per-element overrides.

Gold at full strength (`#B8893B`) fails AA for small text on parchment, so
text-weight gold resolves through `--accent-text`: a darker bronze in light,
the bright gold in dark. Decorative gold rules and fills are unchanged.

**Responsiveness.** Checked at 320, 360, 390, 430, 768, 1024, 1440 and 1920px
for horizontal overflow: none at any width. Two real bugs were found and fixed —
the wordmark was sized by height, which made its width unpredictable and pushed
the header past the viewport under 390px (now sized by width with a `47vw` cap),
and the `anocaresfoundation.org` button was an unbreakable label 370px wide
inside a 316px column (labels now wrap, with tighter padding and tracking below
640px).

## Assets

| File | Source | Notes |
| --- | --- | --- |
| `public/logo.svg` | supplied `AGH-01-primary.pdf` | background plate removed, viewBox cropped to the artwork |
| `public/logo-paper.svg` | derived | Paper/Mist on Forest for the footer; gold rule becomes Sage, the one permitted accent |
| `public/favicon.ico`, `favicon-32.png`, `apple-touch-icon.png`, `icon-512.png` | derived | the ANO mark, squared on Paper |
| `public/founder.jpg` / `.webp` | supplied | cropped to 3:4 per spec section 6, resized to 1200×1600, 8.1MB → 200KB |

**Note on the logo:** the supplied mark uses a gold rule (`#B8893B`). The
specification permits one accent only, Sage. The mark is used exactly as
supplied on light backgrounds; nothing else on the site uses gold. Worth
confirming with the client which is authoritative.

## Images

Every relevant section now carries an image. All are **placeholder plates** —
deep forest, gold hairline, labelled with the photograph they are standing in
for and the aspect ratio required. They are not stock photography, which brief
section 9 and spec section 6 both forbid.

**To swap one in:** drop the real file at the same path with the same aspect
ratio, then delete `placeholder: true` for that entry in `IMAGES`
(`src/config/site.ts`). The corner tag disappears. Nothing else changes.

| Slot | Where it appears | Photograph needed |
| --- | --- | --- |
| `hero` | Home hero | E.J. at a podium, Geneva or Kigali. 21:9 |
| `premise` | Home premise, About header | Infrastructure or industrial. 3:2 |
| `energy` | Home card, Our Companies | Ano Energy delivery or technicians. 4:3 |
| `foundation` | Home card, Our Companies | Foundation programming. 4:3 |
| `lagos` | Home proof section | Rucker Park Africa, Lagos. 16:9 |
| `geneva` `kigali` `abuja` | Leadership, Speaking | The three institutional engagements. 3:2 |
| `whereWeWork` | About | Delegation or in-country work. 16:9 |
| `speaking` | Leadership, Speaking | Any speaking platform. 16:9 |
| `contact` | Home closing, Contact | Hong Kong or Lagos. 16:9 |

`Figure.tsx` is the single image treatment: gold hairline frame, fixed ratio,
lazy below the fold, and an optional Forest wash so copy is never set on
untreated photography (spec §6). Apply one consistent grade across the real set
when it arrives — slightly desaturated, warm shadows, no heavy filters.

## Still needed from the client

These are brief section 11 items that were not supplied. Per spec section 6, a
plain typographic section is used rather than stock or a placeholder.

- **Geneva address video** — brief asks for it embedded on `/leadership`. A
  marked comment sits where it goes.
- **Photographs** for the eleven slots in the table above. Placeholders are in
  place so layout and spacing are already resolved.
- **Form delivery.** The brief asks for reliable delivery with an
  auto-acknowledgement. **No backend is wired.** `EnquiryForm.tsx` composes a
  mailto with the exact fields requested (Name · Organization · Country ·
  Enquiry type · Message) so nothing is silently swallowed, and tells the visitor
  it opens their mail app. Connect Formspree, Resend, or a route handler before
  launch — see the comment at the top of that file.
- **Confirmation that `contact@anoglobalholdings.com` receives mail.**
- **Analytics.** Google Analytics or Plausible, not yet added.

## Routing

Outbound links to `anoenergy.com` and `anocaresfoundation.org` open in the
**same tab**, per brief section 10. They appear on the home page, Our Companies,
Contact, and in the footer.
