import Link from "next/link";
import Hero from "@/components/Hero";
import AnimatedSection from "@/components/AnimatedSection";
import KittenCard from "@/components/KittenCard";
import PlaceholderPhoto from "@/components/PlaceholderPhoto";
import GestationCountdown from "@/components/GestationCountdown";
import { readSite, readGallery, readKittens, readLitterStatus } from "@/lib/store";

export default async function Home() {
  const [site, galleryData, kittens, litterStatus] = await Promise.all([
    readSite(),
    readGallery(),
    readKittens(),
    readLitterStatus(),
  ]);
  const featured =
    litterStatus.mode === "portee"
      ? kittens.filter((k) => k.status === "disponible").slice(0, 3)
      : [];
  const galleryPreview = galleryData.slice(0, 4);

  return (
    <>
      <Hero tagline={site.home.tagline} intro={site.home.intro} />

      <section className="mx-auto max-w-6xl px-6 py-20">
        <div className="grid gap-8 sm:grid-cols-3">
          {site.home.highlights.map((h, i) => (
            <AnimatedSection key={h.title} delay={i * 0.1}>
              <div className="h-full p-6 rounded-xl border border-eden-gold/20 bg-white hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                <h3 className="font-heading text-xl text-eden-rust mb-2">
                  {h.title}
                </h3>
                <p className="text-sm text-eden-ink/70 leading-relaxed">
                  {h.text}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {litterStatus.mode === "gestation" && (
        <section className="mx-auto max-w-3xl px-6 py-16 text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl mb-3">Gestation en cours</h2>
            {litterStatus.gestationMessage && (
              <p className="text-eden-ink/70 max-w-xl mx-auto mb-8">
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
          <AnimatedSection delay={0.15}>
            <Link
              href="/chatons"
              className="inline-block mt-8 text-sm text-eden-rust font-medium hover:translate-x-1 transition-transform"
            >
              En savoir plus →
            </Link>
          </AnimatedSection>
        </section>
      )}

      {featured.length > 0 && (
        <section className="mx-auto max-w-6xl px-6 py-16">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-heading text-3xl">Chatons disponibles</h2>
              <Link
                href="/chatons"
                className="text-sm text-eden-rust font-medium hover:translate-x-1 transition-transform inline-block"
              >
                Voir tous →
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((k, i) => (
              <AnimatedSection key={k.id} delay={i * 0.08}>
                <KittenCard kitten={k} />
              </AnimatedSection>
            ))}
          </div>
        </section>
      )}

      <section className="bg-eden-cream-soft py-16">
        <div className="mx-auto max-w-6xl px-6">
          <AnimatedSection>
            <div className="flex items-end justify-between mb-8">
              <h2 className="font-heading text-3xl">Galerie</h2>
              <Link
                href="/galerie"
                className="text-sm text-eden-rust font-medium hover:translate-x-1 transition-transform inline-block"
              >
                Explorer la galerie →
              </Link>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {galleryPreview.map((g, i) => (
              <AnimatedSection key={g.id} delay={i * 0.06}>
                <div className="group overflow-hidden rounded-lg">
                  <div className="transition-transform duration-500 group-hover:scale-110">
                    <PlaceholderPhoto seed={g.seed} rounded="" className="aspect-square" />
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-6 py-24 text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl mb-4">
            Prêt à accueillir un membre de la famille ?
          </h2>
          <p className="text-eden-ink/70 mb-8 max-w-xl mx-auto">
            Consultez la documentation officielle remise à chaque adoption ou
            contactez-nous directement pour toute question sur nos chatons.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/documentation"
              className="px-6 py-3 rounded-full bg-eden-green text-eden-cream hover:bg-eden-green-light hover:scale-105 transition-all"
            >
              Documentation officielle
            </Link>
            <Link
              href="/contact"
              className="px-6 py-3 rounded-full border border-eden-green text-eden-green hover:bg-eden-green hover:text-eden-cream hover:scale-105 transition-all"
            >
              Nous écrire
            </Link>
          </div>
        </AnimatedSection>
      </section>
    </>
  );
}
