import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import FaqAccordion from "@/components/FaqAccordion";
import { readSite } from "@/lib/store";

export const metadata: Metadata = { title: "FAQ — L'Eden d'Aslo" };

export default async function FaqPage() {
  const site = await readSite();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Questions fréquentes</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Retrouvez ici les réponses aux questions les plus courantes sur nos
          chatons et notre chatterie. Une autre question ? Contactez-nous.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        <FaqAccordion items={site.faq} />
      </AnimatedSection>
    </div>
  );
}
