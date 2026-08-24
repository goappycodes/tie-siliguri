import type { Metadata } from "next";
import { getPartners } from "@/lib/content";
import PartnerDetail from "@/components/PartnerDetail";

const { inspiria } = getPartners();

export const metadata: Metadata = {
  title: inspiria.title,
  description: inspiria.summary,
  openGraph: { title: inspiria.title, description: inspiria.summary },
};

export default function InspiriaPage() {
  return <PartnerDetail partner={inspiria} />;
}
