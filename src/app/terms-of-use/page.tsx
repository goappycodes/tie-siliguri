import type { Metadata } from "next";
import { getLegal } from "@/lib/content";
import LegalDoc from "@/components/LegalDoc";

const { terms } = getLegal();

export const metadata: Metadata = {
  title: terms.title,
  description: "The terms that govern use of the TiE Siliguri website.",
};

export default function TermsOfUsePage() {
  return <LegalDoc doc={terms} />;
}
