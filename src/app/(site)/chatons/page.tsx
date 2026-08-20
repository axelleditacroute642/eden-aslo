import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import KittenCard from "@/components/KittenCard";
import { readKittens } from "@/lib/store";

export const metadata: Metadata = {
  title: "Chatons disponibles — l'Eden d'Aslo",
};

export default async function ChatonsPage() {
  const kittens = await readKittens();
  const order = { disponible: 0, réservé: 1, vendu: 2 } as const;
  const sorted = [...kittens].sort((a, b) => order[a.status] - order[b.status]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Chatons disponibles</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Cliquez sur un chaton pour découvrir sa fiche complète : photos,
          caractéristiques du pelage, âge, généalogie et prix.
        </p>
      </AnimatedSection>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {sorted.map((k, i) => (
          <AnimatedSection key={k.id} delay={(i % 3) * 0.08}>
            <KittenCard kitten={k} />
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
