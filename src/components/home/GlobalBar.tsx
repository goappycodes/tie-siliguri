import { getHome } from "@/lib/content";
import Reveal from "@/components/Reveal";

/**
 * TiE Global credibility strip — its own brand-red band directly under the
 * hero, carrying the contour artwork used on the closing CTA.
 *
 * Each stat is a dt/dd pair in DOM order (label, then value), placed on
 * explicit grid rows so the figure reads first visually while assistive tech
 * still gets a correctly paired term and definition — announced once, not
 * twice, as it was when the label was duplicated into an sr-only <dt>.
 */
export default function GlobalBar() {
  const { globalBar } = getHome();

  return (
    <section className="relative isolate overflow-hidden bg-tie-red py-8 text-white lg:py-10">
      <div aria-hidden="true" className="contours contours-dark !opacity-[0.18]" />

      <div className="shell relative">
        <Reveal className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-12">
          <h2 className="flex-none text-[11px] font-bold !text-white">
            {globalBar.label}
          </h2>

          <dl className="grid flex-1 grid-cols-3 gap-x-6 gap-y-5 lg:gap-x-8">
            {globalBar.stats.map((s) => (
              <div key={s.label} className="grid gap-0.5">
                <dt className="row-start-2 text-[11.5px] leading-tight font-medium text-white/75">
                  {s.label}
                </dt>
                <dd className="row-start-1 text-2xl leading-none font-extrabold text-white lg:text-[1.75rem]">
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </div>
    </section>
  );
}
