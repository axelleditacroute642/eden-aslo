import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import { readSite } from "@/lib/store";

export const metadata: Metadata = { title: "Contact — L'Eden d'Aslo" };

export default async function ContactPage() {
  const site = await readSite();
  const { contact } = site;

  return (
    <div className="mx-auto max-w-5xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Contact</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Une question sur un chaton, une réservation ou simplement envie de
          nous rendre visite ? N&apos;hésitez pas à nous écrire.
        </p>
      </AnimatedSection>

      <div className="grid gap-8 lg:grid-cols-2">
        <AnimatedSection className="space-y-5">
          <div className="flex items-start gap-4 p-5 rounded-xl bg-white border border-eden-gold/20 hover:border-eden-gold/50 hover:-translate-y-0.5 transition-all">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-eden-green text-eden-gold-light">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </span>
            <div>
              <h2 className="font-heading text-lg">Localisation</h2>
              <p className="text-sm text-eden-ink/70 mt-1">
                {contact.address && (
                  <>
                    {contact.address}
                    <br />
                  </>
                )}
                {contact.postalCode} {contact.city}, {contact.country}
              </p>
              <p className="text-xs text-eden-ink/50 mt-2">
                Visites uniquement sur rendez-vous.
              </p>
            </div>
          </div>

          <a
            href={`tel:${contact.phone.replace(/\s+/g, "")}`}
            className="flex items-start gap-4 p-5 rounded-xl bg-white border border-eden-gold/20 hover:border-eden-gold/50 hover:-translate-y-0.5 transition-all"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-eden-green text-eden-gold-light">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.98.36 1.94.68 2.86a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.22-1.25a2 2 0 0 1 2.11-.45c.92.32 1.88.55 2.86.68A2 2 0 0 1 22 16.92Z" />
              </svg>
            </span>
            <div>
              <h2 className="font-heading text-lg">Téléphone</h2>
              <p className="text-sm text-eden-ink/70 mt-1">{contact.phone}</p>
              <p className="text-xs text-eden-ink/50 mt-2">{contact.hours}</p>
            </div>
          </a>

          <a
            href={`mailto:${contact.email}`}
            className="flex items-start gap-4 p-5 rounded-xl bg-white border border-eden-gold/20 hover:border-eden-gold/50 hover:-translate-y-0.5 transition-all"
          >
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-eden-green text-eden-gold-light">
              <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m2 7 10 6 10-6" />
              </svg>
            </span>
            <div>
              <h2 className="font-heading text-lg">Email</h2>
              <p className="text-sm text-eden-ink/70 mt-1">{contact.email}</p>
            </div>
          </a>
        </AnimatedSection>

        <AnimatedSection delay={0.15}>
          <div className="relative h-full min-h-[320px] rounded-xl overflow-hidden border border-eden-gold/40">
            <iframe
              title={`Carte de ${contact.city}`}
              src="https://www.openstreetmap.org/export/embed.html?bbox=4.9280%2C45.6740%2C4.9880%2C45.7220&layer=mapnik&marker=45.6975%2C4.9508"
              className="absolute inset-0 h-full w-full grayscale-[15%]"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-eden-green/90 to-transparent p-5 pt-10">
              <p className="font-heading text-lg text-eden-cream">{contact.catteryName}</p>
              <p className="text-sm text-eden-cream/80">
                {contact.city}, {contact.country} — repère sur le centre-ville,
                adresse exacte communiquée sur rendez-vous.
              </p>
              <p className="mt-1.5 text-xs text-eden-cream/55">
                À proximité de Lyon (15 min), Vienne (25 min), Annecy (1h10),
                Valence (1h15) et Clermont-Ferrand (2h15).
              </p>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
