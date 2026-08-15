/**
 * Mobile carousel, desktop grid.
 *
 * On small screens the children become a horizontal scroll-snap track that
 * stays within the section container — cards line up with the heading above
 * them rather than bleeding to the viewport edge — with each card sized so the
 * next one peeks in. From `sm` up it collapses back to whatever grid
 * `gridClass` describes, so desktop is untouched.
 *
 * Pure CSS — no JS, no hydration cost. Children must carry their own mobile
 * width (e.g. `w-[72%] flex-none snap-start sm:w-auto`).
 *
 * `overflow-y-hidden` is deliberate and load-bearing: per spec, when one axis
 * is a scroll value and the other is `visible`, the `visible` axis computes to
 * `auto`. So `overflow-x-auto` on its own quietly makes the track a *vertical*
 * scroll container too, which traps touch scrolling inside the cards. Pinning
 * the y axis shut is what stops that.
 *
 * The bottom padding is what makes hiding the y axis safe: cards animate in
 * from `translateY(18px)`, and without room to absorb it that transform would
 * be clipped.
 */
export default function Carousel({
  children,
  gridClass,
  className = "",
  as: Tag = "ul",
}: {
  children: React.ReactNode;
  /** Grid classes applied from the `sm` breakpoint up. */
  gridClass: string;
  className?: string;
  as?: "ul" | "ol";
}) {
  return (
    <div className={className}>
      <Tag
        className={`hide-scrollbar flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain pb-6 sm:snap-none sm:overflow-visible sm:pb-0 ${gridClass}`}
      >
        {children}
      </Tag>
    </div>
  );
}
