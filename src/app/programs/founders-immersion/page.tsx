import type { Metadata } from "next";
import { getPrograms } from "@/lib/content";
import ProgramDetail from "@/components/ProgramDetail";

const { foundersImmersion } = getPrograms();

export const metadata: Metadata = {
  title: foundersImmersion.title,
  description: foundersImmersion.summary,
  openGraph: { title: foundersImmersion.title, description: foundersImmersion.summary },
};

export default function FoundersImmersionPage() {
  return <ProgramDetail program={foundersImmersion} />;
}
