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
import aboutJson from "@/../content/about.json";
import programsJson from "@/../content/programs.json";
import membershipJson from "@/../content/membership.json";
import communityJson from "@/../content/community.json";
import partnersJson from "@/../content/partners.json";
import contactJson from "@/../content/contact.json";
import legalJson from "@/../content/legal.json";

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
  contact: { email: string; managerEmail?: string; phones: string[]; city: string };
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
export type About = typeof aboutJson;
export type Programs = typeof programsJson;
export type Membership = typeof membershipJson;
export type Community = typeof communityJson;
export type Partners = typeof partnersJson;
export type Contact = typeof contactJson;
export type Legal = typeof legalJson;

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

export function getAbout(): About {
  return aboutJson;
}

export function getPrograms(): Programs {
  return programsJson;
}

export function getMembership(): Membership {
  return membershipJson;
}

export function getCommunity(): Community {
  return communityJson;
}

export function getPartners(): Partners {
  return partnersJson;
}

export function getContact(): Contact {
  return contactJson;
}

export function getLegal(): Legal {
  return legalJson;
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
