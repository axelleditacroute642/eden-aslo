import Link from "next/link";
import Logo from "./Logo";
import { readSite } from "@/lib/store";

const LINKS = [
  { href: "/presentation", label: "Présentation" },
  { href: "/chatons", label: "Nos Bengals" },
  { href: "/chatons#tarifs", label: "Tarifs" },
  { href: "/galerie", label: "Galerie" },
  { href: "/documentation", label: "Documentation officielle" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

function instagramHandle(value: string) {
  return value.startsWith("@") ? value.slice(1) : value;
}

function instagramDisplay(value: string) {
  return value.startsWith("@") ? value : `@${value}`;
}

function whatsappDigits(value: string) {
  return value.replace(/\D/g, "");
}

function whatsappHref(value: string) {
  return `https://wa.me/33${whatsappDigits(value).replace(/^0/, "")}`;
}

export default async function Footer() {
  const site = await readSite();
  return (
    <footer className="bg-eden-green text-eden-cream mt-24 border-t-2 border-eden-gold/40">
      <div className="mx-auto max-w-6xl px-6 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <Logo dark />
          <p className="mt-4 text-sm text-eden-cream/70 max-w-xs">
            Chatterie de Bengals — élevage familial, chatons LOOF sociabilisés
            dès la naissance.
          </p>
        </div>

        <div>
          <h3 className="font-heading text-lg text-eden-gold-light mb-3">
            Navigation
          </h3>
          <ul className="space-y-2 text-sm">
            {LINKS.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="text-eden-cream/80 hover:text-eden-gold-light transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-heading text-lg text-eden-gold-light mb-3">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-eden-cream/80">
            <li>
              {site.contact.address ? `${site.contact.address}, ` : ""}
              {site.contact.postalCode} {site.contact.city}
            </li>
            <li className="flex items-center gap-2">
              {site.contact.socials.whatsapp && (
                <a
                  href={whatsappHref(site.contact.socials.whatsapp)}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-eden-cream/10 text-eden-gold-light hover:bg-eden-gold hover:text-eden-green transition-colors"
                >
                  <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
                    <path d="M12.04 2c-5.5 0-9.96 4.46-9.96 9.96 0 1.76.46 3.48 1.34 5L2 22l5.2-1.36a9.94 9.94 0 0 0 4.84 1.23h.01c5.5 0 9.96-4.46 9.96-9.96S17.55 2 12.04 2Zm0 18.2h-.01a8.2 8.2 0 0 1-4.19-1.15l-.3-.18-3.09.81.82-3.01-.2-.31a8.2 8.2 0 0 1-1.26-4.4c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.19 8.19 0 0 1 2.41 5.82c0 4.54-3.7 8.24-8.25 8.24Zm4.52-6.17c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.04-.38-1.98-1.22-.73-.65-1.23-1.46-1.37-1.7-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.16-.25.25-.42.08-.17.04-.31-.02-.43-.06-.12-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.23.25-.86.84-.86 2.05 0 1.2.88 2.37 1 2.53.12.17 1.73 2.64 4.2 3.7.59.25 1.05.4 1.41.52.59.19 1.13.16 1.55.1.47-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.14-1.18-.06-.11-.23-.17-.48-.29Z" />
                  </svg>
                </a>
              )}
              {site.contact.phone}
            </li>
            <li>{site.contact.email}</li>
          </ul>

          {site.contact.socials.instagram && (
            <div className="flex items-center gap-3 mt-4">
              <a
                href={`https://instagram.com/${instagramHandle(site.contact.socials.instagram)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex items-center gap-2 rounded-full bg-eden-cream/10 pl-2 pr-3 py-1.5 text-xs text-eden-gold-light hover:bg-eden-gold hover:text-eden-green transition-colors"
              >
                <span className="flex h-5 w-5 shrink-0 items-center justify-center">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="2" width="20" height="20" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                {instagramDisplay(site.contact.socials.instagram)}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-eden-cream/10 py-5 text-center text-xs text-eden-cream/50">
        © {new Date().getFullYear()} L&apos;Eden d&apos;Aslo — Tous droits réservés
      </div>
    </footer>
  );
}
