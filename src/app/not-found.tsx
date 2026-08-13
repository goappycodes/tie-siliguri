import Link from "next/link";
import { ArrowRight } from "@/components/Icons";

export const metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <section className="bg-ink py-28 text-white lg:py-40">
      <div className="shell max-w-2xl">
        <p className="eyebrow !text-tie-red">Error 404</p>
        <h1 className="display-1 mt-5 !text-[clamp(2.25rem,5vw,4rem)] !text-white">
          We can&apos;t find that page.
        </h1>
        <p className="lede mt-6 !text-white/70">
          The link may be out of date, or the page may not have been published yet. Head back to the
          homepage to find your way around.
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <Link href="/" className="btn btn-primary">
            Back to home
            <ArrowRight />
          </Link>
          <Link href="/contact" className="btn btn-ghost-light">
            Contact us
          </Link>
        </div>
      </div>
    </section>
  );
}
