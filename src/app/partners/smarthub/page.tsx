import type { Metadata } from "next";
import { getPartners } from "@/lib/content";
import PartnerDetail from "@/components/PartnerDetail";

const { smarthub } = getPartners();

export const metadata: Metadata = {
  title: smarthub.title,
  description: smarthub.summary,
  openGraph: { title: smarthub.title, description: smarthub.summary },
};

export default function SmartHubPage() {
  return <PartnerDetail partner={smarthub} />;
}
