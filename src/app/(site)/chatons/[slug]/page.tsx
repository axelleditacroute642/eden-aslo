import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import PhotoCarousel from "@/components/PhotoCarousel";
import GenealogyTree from "@/components/GenealogyTree";
import { formatPrice, getAgeLabel, getKittenBySlug } from "@/lib/kittens";
import { readSite } from "@/lib/store";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const kitten = await getKittenBySlug(slug);
  return { title: kitten ? `${kitten.name} — L'Eden d'Aslo` : "Chaton introuvable" };
}

export default async function KittenPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [kitten, site] = await Promise.all([getKittenBySlug(slug), readSite()]);
  if (!kitten) notFound();
  const { contact } = site;
  const reserverHref = `/reserver?chaton=${encodeURIComponent(kitten.name)}`;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <AnimatedSection>
        <Link
          href="/chatons"
          className="inline-block text-sm text-eden-rust mb-6 hover:translate-x-[-4px] transition-transform"
        >
          ← Retour aux chatons disponibles
        </Link>
      </AnimatedSection>

      <div className="grid gap-10 lg:grid-cols-2">
        <AnimatedSection>
          <PhotoCarousel
            photos={kitten.photos}
            label={kitten.name}
            aspect="aspect-square"
            className="shadow-lg"
          />
        </AnimatedSection>

        <AnimatedSection delay={0.1}>
          <div className="flex items-center gap-3 flex-wrap">
            <h1 className="font-heading text-4xl">{kitten.name}</h1>
            <span className="text-xs uppercase tracking-wider px-2.5 py-1 rounded-full bg-eden-green text-eden-cream">
              {kitten.status}
            </span>
          </div>
          <p className="mt-1 text-eden-ink/60">
            {kitten.sex} · {getAgeLabel(kitten.birthDate)}
          </p>

          <div className="mt-6 inline-flex items-baseline gap-2 px-5 py-3 rounded-xl bg-eden-gold/15 border border-eden-gold/40">
            <span className="text-sm uppercase tracking-wide text-eden-ink/60">
              Prix
            </span>
            <span className="font-heading text-3xl text-eden-rust">
              {formatPrice(kitten.price, kitten.currency)}
            </span>
          </div>

          <p className="mt-6 leading-relaxed text-eden-ink/80">
            {kitten.description}
          </p>

          <div className="mt-8 rounded-xl border border-eden-gold/20 divide-y divide-eden-gold/15 bg-white">
            <h2 className="px-5 py-3 font-heading text-lg">
              Caractéristiques du pelage
            </h2>
            <dl className="px-5 py-4 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Couleur</dt>
                <dd className="text-right">{kitten.coat.color}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Motif</dt>
                <dd className="text-right">{kitten.coat.pattern}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-eden-ink/50">Couleur des yeux</dt>
                <dd className="text-right">{kitten.coat.eyeColor}</dd>
              </div>
              <p className="pt-2 text-eden-ink/70 leading-relaxed">
                {kitten.coat.description}
              </p>
            </dl>
          </div>

          <Link
            href={reserverHref}
            className="mt-6 inline-block px-6 py-3 rounded-full bg-eden-rust text-eden-cream hover:bg-eden-rust/90 hover:scale-105 transition-all"
          >
            Réserver {kitten.name}
          </Link>
          <p className="mt-2 text-xs text-eden-ink/50">
            Ou par téléphone au {contact.phone} (à titre informatif).
          </p>
        </AnimatedSection>
      </div>

      <AnimatedSection delay={0.15} className="mt-16">
        <h2 className="font-heading text-3xl mb-2">Généalogie</h2>
        <p className="text-eden-ink/60 text-sm mb-4">
          Arbre généalogique complet de {kitten.name}, sur trois générations.
        </p>
        <div className="rounded-xl border border-eden-gold/20 bg-white p-4 sm:p-8">
          <GenealogyTree kitten={kitten} />
        </div>
      </AnimatedSection>
    </div>
  );
}
