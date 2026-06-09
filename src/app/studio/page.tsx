import type { Metadata } from "next";
import { StudioApp } from "@/components/studio/StudioApp";

export const metadata: Metadata = {
  title: "Naxsha Studio — draft your home",
  description: "Conversational AI floor-plan studio. Answer a few questions and Naxsha drafts a buildable, Vastu-aware plan with live INR cost.",
};

export default function StudioPage() {
  return <StudioApp />;
}
