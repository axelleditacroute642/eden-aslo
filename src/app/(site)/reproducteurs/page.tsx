import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import BreederCard from "@/components/BreederCard";
import { readBreeders } from "@/lib/store";

export const metadata: Metadata = {
  title: "Nos reproducteurs — L'Eden d'Aslo",
};

export default async function ReproducteursPage() {
  const breeders = await readBreeders();
  const actifs = breeders.filter((b) => b.status === "actif");
  const retraites = breeders.filter((b) => b.status === "retraité");

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Nos reproducteurs</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Découvrez les chats à l&apos;origine de nos portées : pedigree,
          robe et tempérament de chacun.
        </p>
      </AnimatedSection>

      {actifs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {actifs.map((b, i) => (
            <AnimatedSection key={b.id} delay={(i % 3) * 0.08}>
              <BreederCard breeder={b} />
            </AnimatedSection>
          ))}
        </div>
      ) : (
        <p className="text-eden-ink/50">Aucun reproducteur à afficher pour le moment.</p>
      )}

      {retraites.length > 0 && (
        <div className="mt-16 pt-10 border-t border-eden-gold/20">
          <h2 className="font-heading text-2xl mb-6">Anciens reproducteurs</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {retraites.map((b, i) => (
              <AnimatedSection key={b.id} delay={(i % 3) * 0.08}>
                <BreederCard breeder={b} />
              </AnimatedSection>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
