/**
 * Mobile carousel, desktop grid.
 *
 * On small screens the children become a horizontal scroll-snap track that
 * stays within the section container — cards line up with the heading above
 * them rather than bleeding to the viewport edge — with each card sized so the
 * next one peeks in and a fade at the trailing edge to signal there is more.
 * From `sm` up it collapses back to whatever grid `gridClass` describes, so
 * desktop is untouched.
 *
 * Pure CSS — no JS, no hydration cost. Children must carry their own mobile
 * width (e.g. `w-[78%] flex-none snap-start sm:w-auto`).
 */
export default function Carousel({
  children,
  gridClass,
  fadeFrom = "from-white",
  className = "",
  as: Tag = "ul",
}: {
  children: React.ReactNode;
  /** Grid classes applied from the `sm` breakpoint up. */
  gridClass: string;
  /** Tailwind `from-*` matching the section background, for the edge fade. */
  fadeFrom?: string;
  className?: string;
  as?: "ul" | "ol";
}) {
  return (
    <div className={`relative ${className}`}>
      <Tag
        className={`hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto pb-1 sm:snap-none sm:overflow-visible sm:pb-0 ${gridClass}`}
      >
        {children}
      </Tag>
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 right-0 w-10 bg-gradient-to-l ${fadeFrom} to-transparent sm:hidden`}
      />
    </div>
  );
}
