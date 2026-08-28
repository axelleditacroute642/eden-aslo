import Link from "next/link";
import { readBreeders } from "@/lib/store";
import { pageTitleClass, cardClass } from "@/components/admin/ui";

const STATUS_STYLES: Record<string, string> = {
  actif: "bg-emerald-100 text-emerald-700",
  "retraité": "bg-slate-200 text-slate-600",
};

export default async function AdminReproducteursPage() {
  const breeders = await readBreeders();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className={pageTitleClass}>Reproducteurs</h1>
        <Link
          href="/admin/reproducteurs/nouveau"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors"
        >
          + Ajouter un reproducteur
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {breeders.map((b) => (
          <Link key={b.id} href={`/admin/reproducteurs/${b.id}`} className={`${cardClass} hover:border-slate-400 hover:shadow-sm transition-all block`}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-slate-900">{b.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[b.status] ?? "bg-slate-100 text-slate-600"}`}>
                {b.status}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {b.role} · {b.coat.color} · {b.photos.length} photo{b.photos.length > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
        {breeders.length === 0 && (
          <p className="text-sm text-slate-400">Aucun reproducteur pour le moment.</p>
        )}
      </div>
    </div>
  );
}
