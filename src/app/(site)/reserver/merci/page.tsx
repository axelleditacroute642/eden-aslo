import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";

export const metadata: Metadata = { title: "Demande envoyée — L'Eden d'Aslo" };

export default async function ReserverMerciPage({
  searchParams,
}: {
  searchParams: Promise<{ chaton?: string }>;
}) {
  const { chaton } = await searchParams;

  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-4">Merci !</h1>
        <p className="text-eden-ink/70 mb-8">
          Votre demande{chaton ? ` pour ${chaton}` : ""} a bien été envoyée.
          Nous vous répondrons dans les meilleurs délais.
        </p>
        <Link
          href="/chatons"
          className="inline-block px-6 py-3 rounded-full bg-eden-rust text-eden-cream hover:bg-eden-rust/90 hover:scale-105 transition-all"
        >
          Retour aux chatons disponibles
        </Link>
      </AnimatedSection>
    </div>
  );
}
