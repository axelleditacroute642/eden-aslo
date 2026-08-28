import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { readSite } from "@/lib/store";

export const metadata: Metadata = { title: "Tarifs — L'Eden d'Aslo" };

export default async function TarifsPage() {
  const site = await readSite();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Tarifs</h1>
        <p className="text-eden-ink/70 leading-relaxed max-w-2xl">
          {site.pricing.intro}
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1} className="mt-8">
        <div className="rounded-xl bg-eden-green text-eden-cream px-6 py-8 text-center border border-eden-gold/40">
          <p className="text-sm uppercase tracking-widest text-eden-gold-light mb-2">
            Fourchette de prix
          </p>
          <p className="font-heading text-3xl">{site.pricing.priceRange}</p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.18} className="mt-12">
        <h2 className="font-heading text-2xl mb-5">
          Ce qui est remis au futur propriétaire
        </h2>
        <ul className="grid gap-3 sm:grid-cols-2">
          {site.pricing.includes.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 p-4 rounded-lg bg-white border border-eden-gold/20 hover:border-eden-gold/50 hover:-translate-y-0.5 transition-all"
            >
              <span className="mt-0.5 text-eden-gold">✓</span>
              <span className="text-sm text-eden-ink/80">{item}</span>
            </li>
          ))}
        </ul>
      </AnimatedSection>

      <AnimatedSection delay={0.24} className="mt-10">
        <div className="rounded-xl border border-eden-gold/30 bg-eden-cream-soft p-6">
          <p className="text-sm text-eden-ink/70 leading-relaxed">
            {site.pricing.notes}
          </p>
        </div>
      </AnimatedSection>

      <AnimatedSection delay={0.3} className="mt-12 text-center">
        <Link
          href="/chatons"
          className="inline-block px-6 py-3 rounded-full bg-eden-gold text-eden-ink font-medium hover:bg-eden-gold-light hover:scale-105 transition-all"
        >
          Voir les chatons disponibles
        </Link>
      </AnimatedSection>
    </div>
  );
}
