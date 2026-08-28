import Link from "next/link";
import { readKittens, readGallery, readBreeders } from "@/lib/store";
import { pageTitleClass, cardClass } from "@/components/admin/ui";

const SECTIONS = [
  { href: "/admin/accueil", label: "Accueil", desc: "Texte d'introduction et points forts" },
  { href: "/admin/presentation", label: "Présentation", desc: "Texte de présentation de la chatterie" },
  { href: "/admin/reproducteurs", label: "Reproducteurs", desc: "Fiches et photos des chats reproducteurs" },
  { href: "/admin/tarifs", label: "Tarifs", desc: "Fourchette de prix et prestations incluses" },
  { href: "/admin/documentation", label: "Documentation", desc: "Titres, descriptions et fichiers PDF" },
  { href: "/admin/contact", label: "Contact", desc: "Adresse, téléphone, email, réseaux" },
  { href: "/admin/chatons", label: "Chatons", desc: "Fiches, photos et généalogie" },
  { href: "/admin/galerie", label: "Galerie", desc: "Photos de la chatterie" },
];

export default async function AdminDashboard() {
  const [kittens, gallery, breeders] = await Promise.all([
    readKittens(),
    readGallery(),
    readBreeders(),
  ]);

  return (
    <div>
      <h1 className={pageTitleClass}>Tableau de bord</h1>
      <p className="text-sm text-slate-500 mb-8">
        {kittens.length} chaton{kittens.length > 1 ? "s" : ""} · {breeders.length} reproducteur
        {breeders.length > 1 ? "s" : ""} · {gallery.length} photo
        {gallery.length > 1 ? "s" : ""} en galerie
      </p>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SECTIONS.map((s) => (
          <Link key={s.href} href={s.href} className={`${cardClass} hover:border-slate-400 hover:shadow-sm transition-all block`}>
            <p className="font-semibold text-slate-900">{s.label}</p>
            <p className="text-sm text-slate-500 mt-1">{s.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
