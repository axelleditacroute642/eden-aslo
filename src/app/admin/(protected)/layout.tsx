import Link from "next/link";
import { logout } from "../auth-actions";

const NAV = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/accueil", label: "Accueil" },
  { href: "/admin/tarifs", label: "Tarifs" },
  { href: "/admin/documentation", label: "Documentation" },
  { href: "/admin/contact", label: "Contact" },
  { href: "/admin/chatons", label: "Chatons" },
  { href: "/admin/galerie", label: "Galerie" },
];

export default function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-60 shrink-0 bg-slate-900 text-slate-200 flex flex-col">
        <div className="px-5 py-5 border-b border-slate-800">
          <p className="text-sm uppercase tracking-wider text-slate-400">Admin</p>
          <p className="font-medium">L&apos;Eden d&apos;Aslo</p>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="px-3 py-4 border-t border-slate-800 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="block rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
          >
            Voir le site ↗
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="w-full text-left rounded-md px-3 py-2 text-sm text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
            >
              Se déconnecter
            </button>
          </form>
        </div>
      </aside>
      <main className="flex-1 min-w-0 px-8 py-8">{children}</main>
    </div>
  );
}
