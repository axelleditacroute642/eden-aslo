import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import { readSite } from "@/lib/store";

export const metadata: Metadata = { title: "Documentation officielle — L'Eden d'Aslo" };

export default async function DocumentationPage() {
  const site = await readSite();
  return (
    <div className="mx-auto max-w-4xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Documentation officielle</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Tous les documents nécessaires à une vente conforme sont disponibles
          ci-dessous, remis systématiquement à l&apos;adoption d&apos;un chaton.
        </p>
      </AnimatedSection>

      <div className="grid gap-5 sm:grid-cols-1">
        {site.documents.map((doc, i) => (
          <AnimatedSection key={doc.id} delay={i * 0.1}>
            <div className="flex flex-col sm:flex-row sm:items-center gap-4 justify-between p-6 rounded-xl border border-eden-gold/20 bg-white hover:shadow-lg hover:border-eden-gold/50 transition-all">
              <div className="flex items-start gap-4">
                <span className="mt-1 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-eden-green text-eden-gold-light">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" />
                    <path d="M14 2v6h6" />
                  </svg>
                </span>
                <div>
                  <h2 className="font-heading text-xl">{doc.title}</h2>
                  <p className="text-sm text-eden-ink/70 mt-1">{doc.description}</p>
                </div>
              </div>
              <a
                href={doc.url}
                download={doc.filename}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 px-5 py-2.5 rounded-full bg-eden-gold text-eden-ink text-sm font-medium hover:bg-eden-gold-light hover:scale-105 transition-all text-center"
              >
                Consulter le PDF
              </a>
            </div>
          </AnimatedSection>
        ))}
      </div>
    </div>
  );
}
