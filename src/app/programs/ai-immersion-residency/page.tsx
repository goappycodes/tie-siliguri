import type { Metadata } from "next";
import { getPrograms } from "@/lib/content";
import ProgramDetail from "@/components/ProgramDetail";

const { aiResidency } = getPrograms();

export const metadata: Metadata = {
  title: aiResidency.title,
  description: aiResidency.summary,
  openGraph: { title: aiResidency.title, description: aiResidency.summary },
};

export default function AiImmersionResidencyPage() {
  return <ProgramDetail program={aiResidency} />;
}
