# TiE Siliguri — Build Handoff

Working context for anyone (any machine/account) picking up this build. Architecture,
brand system and routing are documented in [`README.md`](README.md) — this file is the
**current status + remaining work + where the source material lives**. Read the README first.

---

## Status

- **Homepage is built and approved** by the client. They want the **whole site finished ASAP**.
- Live in-progress deploy: **https://tie-siliguri.vercel.app/** (Vercel, auto-deploys from `main`).
- Reference sites: https://tie.org and https://tiekolkata.org (this is the Siliguri / North Bengal chapter; hub chapter = TiE Kolkata).

## What's left — build out the 27 sub-pages

Every non-home route currently renders a **"coming soon" stub** from `content/pages.json`
via the catch-all `src/app/[...slug]/page.tsx`. The job is to build each for real.

**How to build a page:** create its own directory under `src/app/` (e.g.
`src/app/membership/categories/page.tsx`). A concrete route always wins over the
catch-all, so the stub disappears with no other change. Then optionally remove its entry
from `pages.json`. Keep all copy in `content/*.json` and read it through `src/lib/content.ts`
(the CMS seam) — never hard-code strings in components. Reuse the brand classes/tokens in
`globals.css` and the existing `src/components/home/*` patterns.

**Agreed approach: batch by nav section**, review each batch on Vercel before the next.

Full route tree (from `TiE_Siliguri_SiteMap_v7 (1).pdf`, matches `site.json → nav`):

| Section | Pages |
| --- | --- |
| About | `/about`, `/about/tie-global`, `/about/our-chapter`, `/about/leadership`, `/about/chapter-manager` |
| Programs | `/programs`, `/programs/ai-immersion-residency` (Flagship), `/programs/founders-immersion` (Flagship), `/programs/tye` (Coming Soon), `/programs/tie-women` (Coming Soon) |
| Events | `/events`, `/events/upcoming`, `/events/past` |
| Membership | `/membership`, `/membership/why-join`, `/membership/benefits`, `/membership/categories`, `/membership/apply` |
| Community | `/community`, `/community/charter-members`, `/community/associate-members` (each = Photo, Name, LinkedIn, Company) |
| Partners | `/partners`, `/partners/inspiria`, `/partners/smarthub` |
| Contact | `/contact` |
| Footer legal | `/privacy-policy`, `/terms-of-use` |

## Source material (client's Google Drive, downloaded)

Lives in the **parent folder** `../` (siblings of this repo, not tracked):

- `TiE_Siliguri_SiteMap_v7 (1).pdf` — authoritative sitemap.
- `Charter Ppt/Ppt TiE Siliguri/` — Members Presentation + Siliguri Charter decks (chapter's own content).
- `Charter Ppt/EC Roles & Responsibilities/`, `Charter Ppt/Hub & Spoke/`, `Charter Ppt/TiE Engage/` — governance / structure references.
- `FAQ/` — TiE Siliguri FAQ, Why Join TiE, CM & AM Differentiators → feeds Membership / Why-Join.
- `Global Programs/` — Jaipur Global Summit, Stanford Seed, TiE Hyderabad Cohort, TiE University, TYE → feeds Programs.
- `Cord Video/` — year-one film source (a 720p transcode is already in `public/video/`).

## Setup

```bash
npm install     # node_modules is not committed
npm run dev      # http://localhost:3000
```

Next.js 16 has breaking changes vs older training data — see `AGENTS.md`; consult
`node_modules/next/dist/docs/` before writing Next-specific code.

## Known issues

- `content/pages.json` has **mojibake**: em-dashes are double-encoded (show as `â€"`). Fix when editing those entries.
- Image slots still `null` in JSON (leadership photos, partner/trust logos) render placeholders until real artwork is dropped in — see README "Image slots waiting on artwork".
