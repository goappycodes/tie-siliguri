/**
 * Content layer.
 *
 * Every page reads its copy from the JSON files in /content. Nothing is
 * hard-coded in components, so these files can later be swapped for a headless
 * CMS (Sanity / Contentful / Payload) by replacing the bodies of the getters
 * below with fetch calls — the component contracts stay identical.
 */
import siteJson from "@/../content/site.json";
import homeJson from "@/../content/home.json";
import eventsJson from "@/../content/events.json";
import pagesJson from "@/../content/pages.json";

/* ---------------------------------------------------------------- primitives */

export type Link = { label: string; href: string };
export type Stat = { value: string; label: string };

export type NavItem = {
  label: string;
  href: string;
  children?: (Link & { badge?: string })[];
};

/* --------------------------------------------------------------------- site */

export type Site = {
  chapter: {
    name: string;
    tagline: string;
    shortName: string;
    region: string;
    hubChapter: string;
    foundedLabel: string;
    logo: string;
    logoStacked: string;
  };
  contact: { email: string; phones: string[]; city: string };
  social: { label: string; href: string; icon: string }[];
  nav: NavItem[];
  cta: Link;
  footer: {
    blurb: string;
    legal: Link[];
    globalLink: Link;
    copyrightHolder: string;
  };
};

/* --------------------------------------------------------------------- home */

export type Home = typeof homeJson;
export type Events = typeof eventsJson;

/* -------------------------------------------------------------------- pages */

export type StubPage = {
  slug: string;
  title: string;
  eyebrow: string;
  summary: string;
  bullets?: string[];
};

/* ------------------------------------------------------------------ getters */

export function getSite(): Site {
  return siteJson as Site;
}

export function getHome(): Home {
  return homeJson;
}

export function getEvents(): Events {
  return eventsJson;
}

/** Every non-home page in the sitemap, keyed by its route path. */
export function getStubPages(): Record<string, StubPage> {
  return pagesJson as Record<string, StubPage>;
}

export function getStubPage(slug: string): StubPage | undefined {
  return getStubPages()[slug];
}

/** Flattened list of every navigable route, used to generate the stub routes. */
export function getAllNavRoutes(): string[] {
  const routes: string[] = [];
  for (const item of getSite().nav) {
    routes.push(item.href);
    for (const child of item.children ?? []) routes.push(child.href);
  }
  for (const l of getSite().footer.legal) routes.push(l.href);
  return [...new Set(routes)];
}
