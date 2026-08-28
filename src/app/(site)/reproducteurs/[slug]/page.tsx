import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoCarousel from "@/components/PhotoCarousel";
import { getAgeLabel, formatBirthDate } from "@/lib/kittens";
import { getBreederBySlug } from "@/lib/breeders";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const breeder = await getBreederBySlug(slug);
  return { title: breeder ? `${breeder.name} — L'Eden d'Aslo` : "Reproducteur introuvable" };
}

export default async function BreederPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const breeder = await getBreederBySlug(slug);
  if (!breeder) notFound();

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <AnimatedSection>
        <Link
          href="/reproducteurs"
          className="inline-block text-sm text-eden-rust mb-6 hover:translate-x-[-4px] transition-transform"
        >
          ← Retour aux reproducteurs
        </Link>
      </AnimatedSection>

      <div className="grid gap-10 lg:grid-cols-2">
        <AnimatedSection>
          <PhotoCarousel
            photos={breeder.photos}
            label={breeder.name}
            aspect="aspect-square"
            className="shadow-lg"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-heading text-4xl">{breeder.name}</h1>
            <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-eden-green text-eden-cream">
              {breeder.role}
            </span>
            {breeder.status === "retraité" && (
              <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full border border-eden-ink/20 text-eden-ink/60">
                Retraité(e)
              </span>
            )}
          </div>
          <p className="mt-1 text-eden-ink/60">
            {breeder.sex}
            {breeder.birthDate && (
              <>
                {" "}
                · {getAgeLabel(breeder.birthDate)} · né(e) le{" "}
                {formatBirthDate(breeder.birthDate)}
              </>
            )}
          </p>

          <p className="mt-6 leading-relaxed text-eden-ink/80">
            {breeder.description}
          </p>

          <div className="mt-8 rounded-xl border border-eden-gold/20 divide-y divide-eden-gold/15 bg-white">
            <h2 className="px-5 py-3 font-heading text-lg">
              Caractéristiques du pelage
            </h2>
            <dl className="px-5 py-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Pedigree</dt>
                <dd className="text-right">{breeder.pedigree}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Couleur</dt>
                <dd className="text-right">{breeder.coat.color}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Motif</dt>
                <dd className="text-right">{breeder.coat.pattern}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Couleur des yeux</dt>
                <dd className="text-right">{breeder.coat.eyeColor}</dd>
              </div>
              <p className="pt-2 text-eden-ink/70 leading-relaxed">
                {breeder.coat.description}
              </p>
            </dl>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
