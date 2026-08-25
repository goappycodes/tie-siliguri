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

## Contact form (Web3Forms)

The Contact and Membership → Apply pages use a shared `ContactForm` component
(`src/components/ContactForm.tsx`) that submits to [Web3Forms](https://web3forms.com)
via AJAX — no backend of our own. **It needs one env var to go live:**

1. Create a free access key at web3forms.com against the chapter inbox
   (`president@siliguri.tie.org`). The key is a UUID and is public by design — it can
   only send to that pre-configured inbox, never read submissions.
2. Set it in Vercel (Project → Settings → Environment Variables) and in `.env.local`
   for dev:
   ```
   NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY=your-uuid-key
   ```
3. Redeploy. Until the key is set, the form renders but submitting shows
   "the form isn't configured yet — please email us directly".

Spam is caught by Web3Forms' built-in `botcheck` honeypot (already wired in). For
stronger protection later, add Cloudflare Turnstile (Web3Forms supports it).

## Known issues

- `content/pages.json` has **mojibake**: em-dashes are double-encoded (show as `â€"`). Fix when editing those entries.
- Image slots still `null` in JSON (partner/trust logos) render placeholders until real artwork is dropped in — see README "Image slots waiting on artwork". (Leadership + charter-member headshots are now filled from the chapter deck.)
