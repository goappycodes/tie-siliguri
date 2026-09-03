"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSite } from "@/lib/content";
import type { NavItem } from "@/lib/content";
import { SocialIcon } from "@/components/Icons";

const site = getSite();

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 12 12"
      aria-hidden="true"
      className={`h-2.5 w-2.5 fill-none stroke-current ${className}`}
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 4.5 6 7.5 9 4.5" />
    </svg>
  );
}

function Badge({ children }: { children: string }) {
  const isSoon = children.toLowerCase().includes("soon");
  return (
    <span
      className={`ml-2 inline-block px-1.5 py-0.5 align-middle text-[9px] leading-none font-bold ${
        isSoon ? "bg-line text-slate" : "bg-tie-red-light text-tie-red"
      }`}
    >
      {children}
    </span>
  );
}

/* ------------------------------------------------------------ desktop item */

function DesktopItem({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);

  if (!item.children?.length) {
    return (
      <Link
        href={item.href}
        className={`relative px-3.5 py-2 text-[14.5px] font-semibold transition-colors after:absolute after:bottom-0 after:left-3.5 after:h-[2px] after:bg-tie-red after:transition-all ${
          active ? "text-ink after:right-3.5" : "text-ink-700 hover:text-tie-red after:right-full"
        }`}
      >
        {item.label}
      </Link>
    );
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onFocus={() => setOpen(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={item.href}
        aria-expanded={open}
        className={`relative flex items-center gap-1.5 px-3.5 py-2 text-[14.5px] font-semibold transition-colors after:absolute after:bottom-0 after:left-3.5 after:h-[2px] after:bg-tie-red after:transition-all ${
          active ? "text-ink after:right-3.5" : "text-ink-700 hover:text-tie-red after:right-full"
        }`}
      >
        {item.label}
        <Chevron className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </Link>

      <div
        className={`absolute top-full left-0 pt-2 transition-all duration-200 ${
          open ? "visible translate-y-0 opacity-100" : "invisible -translate-y-1 opacity-0"
        }`}
      >
        <div className="w-80 border-t-[3px] border-tie-red bg-white shadow-[0_18px_50px_-12px_rgba(17,17,17,0.22)]">
          {item.children.map((child) => (
            <Link
              key={child.href}
              href={child.href}
              className="group flex items-center justify-between gap-3 border-b border-line px-5 py-3.5 text-[14.5px] font-medium text-ink-700 transition-colors last:border-b-0 hover:bg-paper-alt hover:text-tie-red"
            >
              <span>
                {child.label}
                {child.badge ? <Badge>{child.badge}</Badge> : null}
              </span>
              <svg
                viewBox="0 0 16 16"
                aria-hidden="true"
                className="h-3 w-3 flex-none fill-none stroke-tie-red opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 8h9M8.5 4l4 4-4 4" />
              </svg>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- the header */

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the mobile drawer whenever the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setExpanded(null);
  }, [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const isActive = (item: NavItem) =>
    pathname === item.href ||
    pathname.startsWith(item.href + "/") ||
    (item.children ?? []).some((c) => c.href === pathname);

  return (
    <header className="sticky top-0 z-50">
      {/* Global affiliation strip */}
      <div className="hidden bg-ink lg:block">
        <div className="shell flex h-9 items-center justify-between">
          <p className="text-[11px] font-medium text-white/60">
            A chapter of{" "}
            <a
              href="https://tie.org"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-white/90 underline decoration-tie-red decoration-2 underline-offset-2 hover:text-white"
            >
              TiE Global
            </a>
            {"  ·  "}
            <span className="text-white/45">
              60+ chapters · 14 countries · 500K+ community
            </span>
          </p>
          <div className="flex items-center gap-5">
            <a
              href={`mailto:${site.contact.email}`}
              className="text-[11px] font-medium text-white/60 transition-colors hover:text-white"
            >
              {site.contact.email}
            </a>
            <span className="h-3 w-px bg-white/20" />
            <div className="flex items-center gap-3">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="text-white/60 transition-colors hover:text-white"
                >
                  <SocialIcon name={s.icon} className="h-[15px] w-[15px]" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main bar — kept above the mobile drawer so the logo and close control
          stay reachable while the drawer is open. */}
      <div
        className={`relative z-50 border-b bg-white/95 backdrop-blur-md transition-all duration-300 ${
          scrolled ? "border-line shadow-[0_2px_16px_-6px_rgba(17,17,17,0.14)]" : "border-transparent"
        }`}
      >
        <div className="shell flex items-center justify-between gap-6">
          <Link
            href="/"
            aria-label={`${site.chapter.name} — home`}
            className="relative z-10 flex-none py-3.5"
          >
            <Image
              src={site.chapter.logo}
              alt={`${site.chapter.name} — ${site.chapter.tagline}`}
              width={600}
              height={219}
              priority
              className={`w-auto transition-all duration-300 ${
                scrolled ? "h-9 sm:h-10" : "h-10 sm:h-12"
              }`}
            />
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary" className="hidden items-center xl:flex">
            {site.nav.map((item) => (
              <DesktopItem key={item.href} item={item} active={isActive(item)} />
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link href={site.cta.href} className="btn btn-primary hidden !px-5 !py-3 !text-[13.5px] sm:inline-flex">
              {site.cta.label}
            </Link>

            {/* Mobile toggle */}
            <button
              type="button"
              onClick={() => setMobileOpen((v) => !v)}
              aria-expanded={mobileOpen}
              aria-controls="mobile-nav"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              className="relative z-10 flex h-11 w-11 flex-col items-center justify-center gap-[5px] xl:hidden"
            >
              <span
                className={`h-[2px] w-6 bg-ink transition-all duration-300 ${
                  mobileOpen ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-ink transition-all duration-300 ${
                  mobileOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`h-[2px] w-6 bg-ink transition-all duration-300 ${
                  mobileOpen ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer — mounted only while open, so there is no invisible
          full-screen layer intercepting anything when closed. */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-white pt-24 pb-12 xl:hidden"
        >
          <nav aria-label="Mobile" className="shell pt-4">
          {site.nav.map((item) => {
            const hasKids = !!item.children?.length;
            const isOpen = expanded === item.href;
            return (
              <div key={item.href} className="border-b border-line">
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className="flex-1 py-4 text-[16px] font-bold text-ink"
                  >
                    {item.label}
                  </Link>
                  {hasKids && (
                    <button
                      type="button"
                      onClick={() => setExpanded(isOpen ? null : item.href)}
                      aria-expanded={isOpen}
                      aria-label={`${isOpen ? "Collapse" : "Expand"} ${item.label}`}
                      className="flex h-11 w-11 items-center justify-center text-slate"
                    >
                      <Chevron className={`!h-3.5 !w-3.5 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                  )}
                </div>
                {hasKids && (
                  <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-2" : "max-h-0"}`}>
                    {item.children!.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block border-l-2 border-line py-2.5 pl-4 text-[14.5px] font-medium text-ink-600 hover:border-tie-red hover:text-tie-red"
                      >
                        {child.label}
                        {child.badge ? <Badge>{child.badge}</Badge> : null}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          })}

          <Link href={site.cta.href} className="btn btn-primary mt-7 w-full">
            {site.cta.label}
          </Link>

          <div className="mt-8 space-y-1.5 text-[15px] text-slate">
            <a href={`mailto:${site.contact.email}`} className="block font-semibold text-ink">
              {site.contact.email}
            </a>
            {site.contact.phones.map((p) => (
              <a key={p} href={`tel:${p.replace(/\s/g, "")}`} className="block">
                {p}
              </a>
            ))}
          </div>
            <div className="mt-5 flex gap-4">
              {site.social.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[11px] font-bold text-tie-red"
                >
                  {s.label}
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
