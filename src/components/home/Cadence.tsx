import { getHome } from "@/lib/content";
import Reveal from "@/components/Reveal";

export default function Cadence() {
  const { cadence } = getHome();

  return (
    <section className="border-y border-line bg-paper-alt py-20 lg:py-28">
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

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {cadence.steps.map((step, i) => (
            <Reveal as="li" key={step.name} delay={i * 60}>
              <div className="group relative flex h-full flex-col border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-tie-red hover:shadow-[0_16px_40px_-16px_rgba(226,30,36,0.28)]">
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-tie-red text-[11.5px] font-bold text-white">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-5 text-[15px] leading-tight font-bold text-ink">{step.name}</h3>
                <p className="mt-2 text-[12.5px] leading-relaxed text-slate">{step.body}</p>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
