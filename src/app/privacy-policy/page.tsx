import type { Metadata } from "next";
import { getLegal } from "@/lib/content";
import LegalDoc from "@/components/LegalDoc";

const { privacy } = getLegal();

export const metadata: Metadata = {
  title: privacy.title,
  description: "How TiE Siliguri collects and uses your information.",
};

export default function PrivacyPolicyPage() {
  return <LegalDoc doc={privacy} />;
}
