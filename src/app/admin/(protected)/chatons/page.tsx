import Link from "next/link";
import { readKittens } from "@/lib/store";
import { pageTitleClass, cardClass } from "@/components/admin/ui";

const STATUS_STYLES: Record<string, string> = {
  disponible: "bg-emerald-100 text-emerald-700",
  "réservé": "bg-amber-100 text-amber-700",
  vendu: "bg-slate-200 text-slate-600",
};

export default async function AdminChatonsPage() {
  const kittens = await readKittens();

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className={pageTitleClass}>Chatons</h1>
        <Link
          href="/admin/chatons/nouveau"
          className="rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors"
        >
          + Ajouter un chaton
        </Link>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kittens.map((k) => (
          <Link key={k.id} href={`/admin/chatons/${k.id}`} className={`${cardClass} hover:border-slate-400 hover:shadow-sm transition-all block`}>
            <div className="flex items-center justify-between mb-2">
              <p className="font-semibold text-slate-900">{k.name}</p>
              <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[k.status] ?? "bg-slate-100 text-slate-600"}`}>
                {k.status}
              </span>
            </div>
            <p className="text-sm text-slate-500">
              {k.sex} · {k.coat.color} · {k.photos.length} photo{k.photos.length > 1 ? "s" : ""}
            </p>
          </Link>
        ))}
        {kittens.length === 0 && (
          <p className="text-sm text-slate-400">Aucun chaton pour le moment.</p>
        )}
      </div>
    </div>
  );
}
