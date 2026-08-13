import { getHome } from "@/lib/content";
import Carousel from "@/components/Carousel";
import Reveal from "@/components/Reveal";

export default function Cadence() {
  const { cadence } = getHome();

  return (
    <section className="border-y border-line bg-paper-alt py-14 sm:py-20 lg:py-28">
      <div className="shell">
        <Reveal className="max-w-3xl">
          <p className="eyebrow">{cadence.eyebrow}</p>
          <h2 className="display-2 mt-5">
            {cadence.headline}
            <br />
            <span className="text-tie-red">{cadence.headlineAccent}</span>
          </h2>
          <p className="lede mt-6">{cadence.subhead}</p>
        </Reveal>

        <Carousel as="ol" className="mt-10 lg:mt-14" gridClass="sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-6">
          {cadence.steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 60} className="w-[48%] flex-none snap-start sm:w-auto">
              <div className="group relative flex h-full flex-col border border-line bg-white p-5 max-sm:p-4 lg:p-6 transition-all duration-300 hover:-translate-y-1 hover:border-tie-red hover:shadow-[0_16px_40px_-16px_rgba(226,30,36,0.28)]">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tie-red text-[11.5px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[16px] leading-tight font-bold text-ink max-sm:mt-3 max-sm:text-[13.5px]">{step.name}</h3>
                <p className="mt-2 text-[13.5px] leading-relaxed font-normal text-slate max-sm:text-[12px] max-sm:leading-[1.4]">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </Carousel>
      </div>
    </section>
  );
}
