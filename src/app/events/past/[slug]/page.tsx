import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getEvents } from "@/lib/content";
import type { EventItem } from "@/components/EventCard";
import PageHeader from "@/components/PageHeader";
import EventPhotoGallery from "@/components/EventPhotoGallery";
import { ArrowRight, Calendar, Pin } from "@/components/Icons";

const { past } = getEvents();
const galleried = (past as EventItem[]).filter((e) => e.slug && e.gallery?.length);

export function generateStaticParams() {
  return galleried.map((e) => ({ slug: e.slug!.split("/").pop()! }));
}

function findEvent(slug: string): EventItem | undefined {
  return galleried.find((e) => e.slug === `/events/past/${slug}`);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const e = findEvent(slug);
  if (!e) return {};
  const title = `${e.title} — Photos`;
  return { title, description: `Photos from ${e.title}, TiE Siliguri.`, openGraph: { title } };
}

export default async function EventGalleryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const e = findEvent(slug);
  if (!e) notFound();

  const meta = [e.dateLabel, e.venue].filter(Boolean).join(" · ");

  return (
    <>
      <PageHeader
        slug={e.slug!}
        eyebrow={e.type}
        title={e.title}
        summary={meta}
        image={e.image}
        imageAlt={e.imageAlt}
      />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell">
          <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              {e.dateLabel && (
                <p className="flex items-center gap-2.5 text-[14px] font-semibold text-ink">
                  <Calendar className="h-4 w-4 flex-none text-tie-red" />
                  {e.dateLabel}
                </p>
              )}
              {e.venue && (
                <p className="flex items-center gap-2.5 text-[14px] text-slate">
                  <Pin className="h-4 w-4 flex-none text-tie-red" />
                  {e.venue}
                </p>
              )}
            </div>
            <Link href="/events/past" className="link-arrow">
              All past events
              <ArrowRight />
            </Link>
          </div>

          {e.speaker && (
            <p className="mt-6 max-w-3xl text-[15px] leading-relaxed text-ink-600">
              <span className="font-semibold text-ink">Speaker:</span> {e.speaker}
            </p>
          )}

          {/* Click any photo to open the full-screen lightbox (arrows / swipe / Esc). */}
          <EventPhotoGallery images={e.gallery!} />
        </div>
      </section>
    </>
  );
}
