import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import KittenCard from "@/components/KittenCard";
import GestationCountdown from "@/components/GestationCountdown";
import LitterDevelopmentTimeline from "@/components/LitterDevelopmentTimeline";
import { readKittens, readLitterStatus, readSite, type SiteData } from "@/lib/store";

export const metadata: Metadata = {
  title: "Chatons disponibles — L'Eden d'Aslo",
};

function PricingSection({ pricing }: { pricing: SiteData["pricing"] }) {
  return (
    <AnimatedSection
      id="tarifs"
      className="mt-16 pt-14 border-t border-eden-gold/20 scroll-mt-24"
    >
      <h2 className="font-heading text-3xl mb-3">Tarifs</h2>
      <p className="text-eden-ink/70 leading-relaxed max-w-2xl mb-8">
        {pricing.intro}
      </p>

      <div className="rounded-xl bg-eden-green text-eden-cream px-6 py-8 text-center border border-eden-gold/40">
        <p className="text-sm uppercase tracking-widest text-eden-gold-light mb-2">
          Fourchette de prix
        </p>
        <p className="font-heading text-3xl">{pricing.priceRange}</p>
      </div>

      <h3 className="font-heading text-2xl mt-10 mb-5">
        Ce qui est remis au futur propriétaire
      </h3>
      <ul className="grid gap-3 sm:grid-cols-2">
        {pricing.includes.map((item, i) => (
          <li
            key={i}
            className="flex items-start gap-3 p-4 rounded-lg bg-white border border-eden-gold/20 hover:border-eden-gold/50 hover:-translate-y-0.5 transition-all"
          >
            <span className="mt-0.5 text-eden-gold">✓</span>
            <span className="text-sm text-eden-ink/80">{item}</span>
          </li>
        ))}
      </ul>

      <div className="mt-8 rounded-xl border border-eden-gold/30 bg-eden-cream-soft p-6">
        <p className="text-sm text-eden-ink/70 leading-relaxed">{pricing.notes}</p>
      </div>
    </AnimatedSection>
  );
}

export default async function ChatonsPage() {
  const [kittens, litterStatus, site] = await Promise.all([
    readKittens(),
    readLitterStatus(),
    readSite(),
  ]);
  const order = { disponible: 0, réservé: 1, vendu: 2 } as const;
  const anciens = [...kittens]
    .filter((k) => k.status === "vendu")
    .sort((a, b) => a.name.localeCompare(b.name));

  if (litterStatus.mode === "gestation") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="max-w-3xl mx-auto text-center py-8">
          <AnimatedSection>
            <h1 className="font-heading text-4xl mb-4">Gestation en cours</h1>
            {litterStatus.gestationMessage && (
              <p className="text-eden-ink/70 max-w-xl mx-auto mb-10">
                {litterStatus.gestationMessage}
              </p>
            )}
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            {litterStatus.gestationDueDate ? (
              <GestationCountdown dueDate={litterStatus.gestationDueDate} />
            ) : (
              <p className="text-eden-ink/50">Date prévue à venir.</p>
            )}
          </AnimatedSection>
        </div>

        {anciens.length > 0 && (
          <AnimatedSection delay={0.15} className="mt-8 pt-12 border-t border-eden-gold/20">
            <h2 className="font-heading text-2xl mb-2">Anciennes portées</h2>
            <p className="text-eden-ink/60 text-sm mb-8">
              En attendant, retrouvez les fiches de nos précédents chatons.
            </p>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {anciens.map((k, i) => (
                <AnimatedSection key={k.id} delay={(i % 3) * 0.08}>
                  <KittenCard kitten={k} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        )}

        <PricingSection pricing={site.pricing} />
      </div>
    );
  }

  if (litterStatus.mode === "aucune") {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <AnimatedSection>
          <h1 className="font-heading text-4xl mb-3">Aucune gestation en cours</h1>
          <p className="text-eden-ink/70 max-w-2xl mb-10">
            Il n&apos;y a pas de portée disponible pour le moment. En attendant,
            découvrez les fiches de nos anciens chatons.
          </p>
        </AnimatedSection>

        {anciens.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {anciens.map((k, i) => (
              <AnimatedSection key={k.id} delay={(i % 3) * 0.08}>
                <KittenCard kitten={k} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <p className="text-eden-ink/50">Aucun ancien chaton à afficher pour le moment.</p>
        )}

        <PricingSection pricing={site.pricing} />
      </div>
    );
  }

  const enCours = [...kittens]
    .filter((k) => k.status !== "vendu")
    .sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Chatons disponibles</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Cliquez sur un chaton pour découvrir sa fiche complète : photos,
          caractéristiques du pelage, âge, généalogie et prix.
        </p>
      </AnimatedSection>

      {litterStatus.litterBirthDate && (
        <AnimatedSection delay={0.05} className="mb-10">
          <LitterDevelopmentTimeline birthDate={litterStatus.litterBirthDate} />
        </AnimatedSection>
      )}

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {enCours.map((k, i) => (
          <AnimatedSection key={k.id} delay={(i % 3) * 0.08}>
            <KittenCard kitten={k} />
          </AnimatedSection>
        ))}
      </div>
      {enCours.length === 0 && (
        <p className="text-eden-ink/50">Aucun chaton disponible pour le moment.</p>
      )}

      <PricingSection pricing={site.pricing} />
    </div>
  );
}
