import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { readSite } from "@/lib/store";

export const metadata: Metadata = { title: "Présentation — L'Eden d'Aslo" };

export default async function PresentationPage() {
  const site = await readSite();

  return (
    <div className="mx-auto max-w-3xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-6">Présentation</h1>
        <p className="text-eden-ink/80 leading-relaxed text-lg">
          {site.presentation.intro}
        </p>
      </AnimatedSection>

      <div className="mt-8 space-y-5">
        {site.presentation.paragraphs.map((p, i) => (
          <AnimatedSection key={i} delay={0.06 * (i + 1)}>
            <p className="text-eden-ink/70 leading-relaxed">{p}</p>
          </AnimatedSection>
        ))}
      </div>

      <AnimatedSection delay={0.3} className="mt-12 text-center">
        <Link
          href="/reproducteurs"
          className="inline-block px-6 py-3 rounded-full bg-eden-gold text-eden-ink font-medium hover:bg-eden-gold-light hover:scale-105 transition-all"
        >
          Découvrir nos reproducteurs
        </Link>
      </AnimatedSection>
    </div>
  );
}
