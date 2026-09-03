/**
 * Page hero registry — maps a page slug to the full-bleed photo that runs behind
 * its PageHeader, the same homepage-style treatment as `home/Hero.tsx` (photo at
 * full strength, legibility from the ink gradients). Keeping the mapping here,
 * keyed by slug, lets every built page pick up a hero without threading an
 * `image` prop through each route — PageHeader resolves it from the slug and any
 * explicit `image` prop still wins.
 *
 * Sourcing rules (see the chapter's image guidelines):
 * - Prefer the repo's real chapter photos (launch, members, community) — they
 *   read as authentically North Bengal, which stock never will.
 * - Thematic programme pages use high-res, Indian-context stock in
 *   `public/images/heroes/`.
 * - Object position leans a touch high (`object-[50%_35%]`) so faces sit above
 *   the copy; a few portraits below carry their own focal hint.
 */
export type Hero = { src: string; alt: string };

const REAL = "/images";
const H = "/images/heroes";

const HEROES: Record<string, Hero> = {
  // About — the chapter, its launch, its people.
  "/about": {
    src: `${REAL}/launch-chapter-stage.webp`,
    alt: "The TiE Siliguri Chapter Launch",
  },
  "/about/our-chapter": {
    src: `${REAL}/launch-ceremony.webp`,
    alt: "The lamp-lighting ceremony at the TiE Siliguri chapter launch",
  },
  "/about/leadership": {
    src: `${REAL}/launch-stage-group.webp`,
    alt: "TiE Siliguri office bearers and charter members on stage at the chapter launch",
  },
  "/about/tie-global": {
    src: `${REAL}/launch-felicitation.webp`,
    alt: "The Chairman of the TiE Global Board of Trustees felicitated at the TiE Siliguri launch",
  },

  // Programmes — thematic, Indian-context imagery for each flagship.
  "/programs": {
    src: `${REAL}/launch-speaker.webp`,
    alt: "A speaker addressing a TiE Siliguri programme session",
  },
  "/programs/tye": {
    src: `${H}/tye.webp`,
    alt: "School students — the next generation of young entrepreneurs",
  },
  "/programs/tie-women": {
    src: `${H}/tie-women.webp`,
    alt: "A woman entrepreneur leading a working session",
  },
  "/programs/founders-immersion": {
    src: `${REAL}/members-mixer.webp`,
    alt: "Founders networking at a TiE Siliguri gathering",
  },
  "/programs/ai-immersion-residency": {
    src: `${H}/ai-immersion.webp`,
    alt: "Working late on a laptop during an AI immersion",
  },

  // Membership — belonging, the community you join.
  "/membership": {
    src: `${REAL}/launch-chapter-group.webp`,
    alt: "TiE Siliguri members together at the chapter launch",
  },
  "/membership/why-join": {
    src: `${REAL}/launch-audience.webp`,
    alt: "An engaged audience at a TiE Siliguri event",
  },
  "/membership/categories": {
    src: `${REAL}/launch-ceremony.webp`,
    alt: "The lamp-lighting ceremony at the TiE Siliguri chapter launch",
  },
  "/membership/benefits": {
    src: `${REAL}/community-group.webp`,
    alt: "The TiE Siliguri member community",
  },
  "/membership/apply": {
    src: `${REAL}/hero-charter-members.webp`,
    alt: "TiE Siliguri founding charter members",
  },

  // Events — the calendar, on stage and in the room.
  "/events": {
    src: `${REAL}/launch-chapter-stage.webp`,
    alt: "The TiE Siliguri Chapter Launch stage",
  },
  "/events/upcoming": {
    src: `${REAL}/launch-speaker.webp`,
    alt: "A speaker at a TiE Siliguri event",
  },
  "/events/past": {
    src: `${REAL}/launch-felicitation.webp`,
    alt: "A felicitation on stage at a TiE Siliguri event",
  },

  // Community — the members and the network.
  "/community": {
    src: `${REAL}/community-group.webp`,
    alt: "The TiE Siliguri member community together",
  },
  "/community/charter-members": {
    src: `${REAL}/launch-memento.webp`,
    alt: "A TiE Siliguri charter member memento",
  },
  "/community/associate-members": {
    src: `${REAL}/launch-chapter-group.webp`,
    alt: "TiE Siliguri associate members at the chapter launch",
  },

  // Partners — the institutions behind the chapter.
  "/partners": {
    src: `${REAL}/launch-stage-group.webp`,
    alt: "TiE Siliguri leaders and partners on stage at the chapter launch",
  },
  "/partners/inspiria": {
    src: `${REAL}/partners/inspiria-campus.webp`,
    alt: "INSPIRIA Knowledge Campus, Siliguri",
  },
  "/partners/smarthub": {
    src: `${REAL}/members-mixer.webp`,
    alt: "TiE Siliguri members networking",
  },

  // Contact — a North Bengal note.
  "/contact": {
    src: `${H}/contact-tea.webp`,
    alt: "Rolling tea gardens and hills of North Bengal",
  },
};

/** Resolve the hero for a page slug, if one is registered. */
export function heroFor(slug: string): Hero | undefined {
  return HEROES[slug];
}
