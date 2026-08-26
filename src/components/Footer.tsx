import Link from "next/link";
import Logo from "./Logo";
import { readSite } from "@/lib/store";

const LINKS = [
  { href: "/chatons", label: "Chatons disponibles" },
  { href: "/tarifs", label: "Tarifs" },
  { href: "/galerie", label: "Galerie" },
  { href: "/documentation", label: "Documentation officielle" },
  { href: "/contact", label: "Contact" },
];

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
            <li>{site.contact.phone}</li>
            <li>{site.contact.email}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-eden-cream/10 py-5 text-center text-xs text-eden-cream/50">
        © {new Date().getFullYear()} L&apos;Eden d&apos;Aslo — Tous droits réservés
      </div>
    </footer>
  );
}
