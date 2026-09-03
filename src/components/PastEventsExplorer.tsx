"use client";

import { useMemo, useState } from "react";
import EventCard, { type EventItem } from "@/components/EventCard";
import Reveal from "@/components/Reveal";

/** Pull a "Month Year" label out of a free-text date like "19–20 June 2026". */
function monthYear(dateLabel?: string): string | null {
  if (!dateLabel) return null;
  const m = dateLabel.match(
    /(January|February|March|April|May|June|July|August|September|October|November|December)/i,
  );
  const y = dateLabel.match(/\b(20\d{2})\b/);
  if (!m || !y) return null;
  const month = m[1][0].toUpperCase() + m[1].slice(1).toLowerCase();
  return `${month} ${y[1]}`;
}

const ALL = "All";

export default function PastEventsExplorer({
  events,
  emptyLabel,
}: {
  events: EventItem[];
  emptyLabel: string;
}) {
  const formats = useMemo(
    () => Array.from(new Set(events.map((e) => e.type).filter(Boolean))).sort(),
    [events],
  );
  const months = useMemo(() => {
    const set = Array.from(
      new Set(events.map((e) => monthYear(e.dateLabel)).filter(Boolean) as string[]),
    );
    // Chronological, most recent first.
    return set.sort((a, b) => Date.parse(`1 ${b}`) - Date.parse(`1 ${a}`));
  }, [events]);

  const [format, setFormat] = useState<string>(ALL);
  const [month, setMonth] = useState<string>(ALL);

  const filtered = events.filter(
    (e) =>
      (format === ALL || e.type === format) &&
      (month === ALL || monthYear(e.dateLabel) === month),
  );

  const selectClass =
    "w-full appearance-none border border-line bg-white px-4 py-2.5 pr-9 text-[14px] font-semibold text-ink transition-colors hover:border-line-strong focus:border-tie-red focus:outline-none sm:w-auto";

  return (
    <div>
      {/* Filter bar */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-3">
          <label className="relative block">
            <span className="mb-1.5 block text-[10.5px] font-bold tracking-[0.02em] text-slate">
              Format
            </span>
            <select
              value={format}
              onChange={(e) => setFormat(e.target.value)}
              className={selectClass}
              aria-label="Filter events by format"
            >
              <option value={ALL}>All formats</option>
              {formats.map((f) => (
                <option key={f} value={f}>
                  {f}
                </option>
              ))}
            </select>
            <Chevron />
          </label>

          <label className="relative block">
            <span className="mb-1.5 block text-[10.5px] font-bold tracking-[0.02em] text-slate">
              Month
            </span>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className={selectClass}
              aria-label="Filter events by month"
            >
              <option value={ALL}>All months</option>
              {months.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <Chevron />
          </label>
        </div>

        <div className="flex items-center gap-4 text-[13px] text-slate">
          <span>
            {filtered.length} {filtered.length === 1 ? "event" : "events"}
          </span>
          {(format !== ALL || month !== ALL) && (
            <button
              type="button"
              onClick={() => {
                setFormat(ALL);
                setMonth(ALL);
              }}
              className="font-bold text-tie-red hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </div>

      {/* Results */}
      {filtered.length ? (
        <ul className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {filtered.map((e, i) => (
            <Reveal as="li" key={e.title} delay={(i % 3) * 60}>
              <EventCard event={e} />
            </Reveal>
          ))}
        </ul>
      ) : (
        <p className="lede mt-8 max-w-2xl">{emptyLabel}</p>
      )}
    </div>
  );
}

function Chevron() {
  return (
    <svg
      viewBox="0 0 16 16"
      aria-hidden="true"
      className="pointer-events-none absolute right-3 bottom-3 h-4 w-4 fill-none stroke-slate"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}
