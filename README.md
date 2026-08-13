# TiE Siliguri — Website

The website for **TiE Siliguri**, the North Bengal chapter of TiE (The Indus Entrepreneurs).

Built with Next.js (App Router) + TypeScript + Tailwind CSS v4. All copy lives in
static JSON so it can be moved to a CMS without touching components.

---

## Getting started

```bash
npm install
```

```bash
npm run dev
```

```bash
npm run build
```

---

## Brand system

Measured directly from [tie.org](https://tie.org) so this chapter site sits inside the
parent brand rather than beside it.

| Element | Value |
| --- | --- |
| Brand red | `#E21E24` |
| Typeface | **Jost** throughout — one of TiE Global's own webfonts, loaded as a variable font |
| Headings | Bold (700), UPPERCASE, tracked (`0.005em`–`0.045em`, easing off as size grows) |
| Body | Light (300), normal case, `1.7` leading |
| Small text (≤13.5px) | Weight 400 — light at that size reads too thin, especially on dark |
| Buttons | Red fill, white text, uppercase, `12px` radius, weight 600 |
| Illustrations | Halftone dotted globe, topographic contour lines |

Tokens are defined once in [`src/app/globals.css`](src/app/globals.css) under `@theme`,
with reusable classes for the recurring patterns:

- `.display-1` / `.display-2` / `.display-3` — bold uppercase headings
- `.lede` — light body copy
- `.eyebrow` — the red tracked caps label with a leading rule
- `.btn` + `.btn-primary` / `.btn-dark` / `.btn-outline` / `.btn-ghost-light`
- `.tick` — the red corner-triangle bullet
- `.contours` + `.contours-dark` / `.contours-light` / `.contours-red`
- `.globe-motif`

### Brand assets

`public/brand/` holds artwork sourced from TiE Global:

| File | Use |
| --- | --- |
| `tie-globe-halftone.webp` | Halftone dotted world map (hero, community, page headers) |
| `tie-contours.webp` | Topographic contour lines, shipped as an **alpha mask** so one file can be tinted per surface via `background-color` |
| `tie-icon.svg` | TiE brand icon |

`public/tie-siliguri-logo*.png` are the chapter lockups.

---

## Content = the CMS layer

Nothing user-facing is hard-coded in components. Every string, image path, stat and
link comes from `content/`:

| File | Drives |
| --- | --- |
| `content/site.json` | Chapter details, contact, social links, **navigation tree**, footer |
| `content/home.json` | Every homepage section |
| `content/events.json` | Upcoming + past events, each with a cover image |
| `content/pages.json` | All non-home routes and their "coming soon" copy |

### Image slots waiting on artwork

Three fields are `null` in the JSON and render a sized placeholder until real
artwork is dropped in. Filling them needs no code change and causes no layout
shift, because the placeholder already occupies the final dimensions.

| Field | Placeholder | Component |
| --- | --- | --- |
| `leadership.members[].photo` | Circular silhouette | `Avatar` |
| `leadership.mentors[].photo` | Circular silhouette | `Avatar` |
| `trust.organisations[].logo` | Dashed "LOGO" plate | `LogoSlot` |
| `trust.partners[].logo` | Dashed "LOGO" plate | `LogoSlot` |

Set the field to a path under `public/` (e.g. `/images/team/arun-agarwal.webp`)
and the real image replaces the placeholder.

### Event covers

Every event in `events.json` carries an `image` + `imageAlt`. These are the
chapter's own event creatives, extracted from the members presentation deck and
converted to WebP in `public/images/events/`. Cards crop them from the top so
the artwork's title block stays in frame.

Components read these through [`src/lib/content.ts`](src/lib/content.ts), which is the
single seam to swap later. To move to a headless CMS (Sanity / Contentful / Payload),
replace the bodies of `getSite()`, `getHome()`, `getEvents()` and `getStubPages()` with
fetch calls. Component props stay identical, so no UI work is needed.

### Editing copy today

Change the JSON and rebuild — no code edits. For example, adding an event means
appending an object to `upcoming` in `content/events.json`; the homepage strip shows
the first three automatically.

### Navigation

`site.json → nav` is the single source of truth for the header, the mobile drawer and
the footer sitemap. Adding a nav child automatically:

1. renders it in all three places, and
2. generates a route for it (see below).

---

## Routing

| Route | Source |
| --- | --- |
| `/` | `src/app/page.tsx` — the built homepage |
| everything else | `src/app/[...slug]/page.tsx` — renders "coming soon" from `pages.json` |

The catch-all calls `generateStaticParams()` over the keys of `pages.json`, so all
27 sitemap routes prerender as static HTML with real titles, breadcrumbs, metadata
and sibling links.

**To build a page for real:** create its own directory under `src/app/` (e.g.
`src/app/membership/categories/page.tsx`). A concrete route always wins over the
catch-all, so the placeholder disappears with no other change. Optionally remove its
entry from `pages.json`.

---

## Structure

```
content/            JSON content (the future CMS payload)
public/
  brand/            TiE Global brand illustrations
  images/           Optimised chapter photography (WebP)
  video/            Year-one film (720p, click-to-play)
src/
  app/
    layout.tsx      Fonts, metadata, header/footer shell
    page.tsx        Homepage section composition
    [...slug]/      Catch-all "coming soon" routes
    not-found.tsx
    globals.css     Brand tokens + component classes
  components/
    Header.tsx      Sticky nav, desktop dropdowns, mobile drawer
    Footer.tsx
    ComingSoon.tsx
    Reveal.tsx      Scroll animation (progressive enhancement)
    Icons.tsx
    home/           One component per homepage section
  lib/content.ts    Typed content loader — the CMS seam
```

---

## Implementation notes

**Scroll reveals never hide content.** `Reveal` renders visible on the server. On
mount it leaves anything already on screen alone (no flash) and only hides + animates
elements still below the fold. With JS disabled, blocked, or slow to hydrate the page
reads in full, and `prefers-reduced-motion` disables it entirely.

**The year-one film is click-to-play.** The 13 MB MP4 is never fetched on first paint —
only a 42 KB poster. It opens in a focus-trapped modal (Escape / backdrop / button to
close) that restores focus to the trigger.

**Images.** Chapter photography is pre-optimised to WebP and served through
`next/image`. `next.config.ts` allows quality `82` alongside the default `75` because
photography carries this design.

**Accessibility.** Skip link, labelled landmarks, `aria-expanded` on all disclosures,
visible focus rings, `sr-only` terms on every `<dl>` stat, and decorative layers marked
`aria-hidden`.

---

## Source material

Chapter photography, decks and documents live in the parent folder (not tracked here).
Photos were downscaled and converted to WebP; the year-one film was transcoded from
1080p/60 MB to 720p/13.8 MB for web delivery.
