import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";

export type LegalDocument = {
  slug: string;
  eyebrow: string;
  title: string;
  updated: string;
  intro: string;
  sections: { heading: string; body: string }[];
};

/** Shared layout for the Privacy Policy and Terms of Use pages. */
export default function LegalDoc({ doc }: { doc: LegalDocument }) {
  return (
    <>
      <PageHeader slug={doc.slug} eyebrow={doc.eyebrow} title={doc.title} />

      <section className="bg-white py-14 sm:py-20 lg:py-24">
        <div className="shell max-w-3xl">
          <p className="text-[12px] font-bold tracking-[0.1em] text-slate uppercase">
            {doc.updated}
          </p>
          <p className="lede mt-6">{doc.intro}</p>

          <div className="mt-12 space-y-10">
            {doc.sections.map((s) => (
              <Reveal key={s.heading}>
                <h2 className="display-3 !text-[clamp(1.1rem,1.6vw,1.35rem)]">{s.heading}</h2>
                <p className="mt-3 text-[16px] leading-relaxed text-ink-700">{s.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
