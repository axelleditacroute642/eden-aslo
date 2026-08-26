import type { Metadata } from "next";
import Link from "next/link";
import AnimatedSection from "@/components/AnimatedSection";
import { readSite } from "@/lib/store";
import { sendReservationRequest } from "./actions";

export const metadata: Metadata = { title: "Réserver un chaton — L'Eden d'Aslo" };

const ERROR_MESSAGES: Record<string, string> = {
  missing: "Merci de renseigner votre nom, votre email et un message.",
  email: "L'adresse email saisie n'est pas valide.",
  send: "L'envoi a échoué, merci de réessayer ou de nous appeler directement.",
  config: "L'envoi d'email n'est pas encore configuré, merci de nous appeler directement.",
};

const FIELD =
  "w-full rounded-lg border border-eden-gold/30 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-eden-gold/40";
const LABEL = "block text-sm text-eden-ink/60 mb-1";

export default async function ReserverPage({
  searchParams,
}: {
  searchParams: Promise<{ chaton?: string; error?: string }>;
}) {
  const { chaton, error } = await searchParams;
  const site = await readSite();
  const { contact } = site;

  const defaultMessage = chaton
    ? `Bonjour,\n\nJe suis intéressé(e) par ${chaton} et j'aimerais avoir plus d'informations en vue d'une réservation.\n\nMerci,`
    : "";

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <AnimatedSection>
        <Link
          href="/chatons"
          className="inline-block text-sm text-eden-rust mb-6 hover:translate-x-[-4px] transition-transform"
        >
          ← Retour aux chatons disponibles
        </Link>
        <h1 className="font-heading text-4xl mb-3">
          {chaton ? `Réserver ${chaton}` : "Demande de réservation"}
        </h1>
        <p className="text-eden-ink/70 mb-8">
          Complétez ce formulaire, nous vous répondrons rapidement par email.
          Vous pouvez aussi nous appeler au {contact.phone}.
        </p>
      </AnimatedSection>

      <AnimatedSection delay={0.1}>
        {error && (
          <div className="mb-6 rounded-xl border border-eden-rust/40 bg-eden-rust/10 px-4 py-3 text-sm text-eden-rust">
            {ERROR_MESSAGES[error] ?? "Une erreur est survenue, merci de réessayer."}
          </div>
        )}

        <form
          action={sendReservationRequest}
          className="space-y-4 rounded-xl border border-eden-gold/20 bg-white p-6"
        >
          <input
            type="text"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <div>
            <label htmlFor="kitten" className={LABEL}>
              Chaton concerné
            </label>
            <input
              id="kitten"
              name="kitten"
              defaultValue={chaton ?? ""}
              placeholder="ex : Orion"
              className={FIELD}
            />
          </div>

          <div>
            <label htmlFor="name" className={LABEL}>
              Nom *
            </label>
            <input id="name" name="name" required className={FIELD} />
          </div>

          <div>
            <label htmlFor="email" className={LABEL}>
              Email *
            </label>
            <input id="email" name="email" type="email" required className={FIELD} />
          </div>

          <div>
            <label htmlFor="phone" className={LABEL}>
              Téléphone
            </label>
            <input id="phone" name="phone" className={FIELD} />
          </div>

          <div>
            <label htmlFor="message" className={LABEL}>
              Message *
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={5}
              defaultValue={defaultMessage}
              className={FIELD}
            />
          </div>

          <button
            type="submit"
            className="px-6 py-3 rounded-full bg-eden-rust text-eden-cream hover:bg-eden-rust/90 hover:scale-105 transition-all"
          >
            Envoyer la demande
          </button>
        </form>
      </AnimatedSection>
    </div>
  );
}
