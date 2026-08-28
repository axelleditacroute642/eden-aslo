import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import KittenCard from "@/components/KittenCard";
import GestationCountdown from "@/components/GestationCountdown";
import LitterDevelopmentTimeline from "@/components/LitterDevelopmentTimeline";
import { readKittens, readLitterStatus } from "@/lib/store";

export const metadata: Metadata = {
  title: "Chatons disponibles — L'Eden d'Aslo",
};

export default async function ChatonsPage() {
  const [kittens, litterStatus] = await Promise.all([readKittens(), readLitterStatus()]);
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
    </div>
  );
}
