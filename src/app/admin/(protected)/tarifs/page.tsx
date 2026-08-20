import { readSite } from "@/lib/store";
import { updateTarifs, addInclude, removeInclude } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import {
  pageTitleClass,
  cardClass,
  sectionTitleClass,
  labelClass,
  inputClass,
  textareaClass,
} from "@/components/admin/ui";

export default async function AdminTarifsPage() {
  const site = await readSite();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>Tarifs</h1>

      <form action={updateTarifs} className={`${cardClass} space-y-5`}>
        <div>
          <label className={labelClass} htmlFor="intro">
            Texte d&apos;introduction
          </label>
          <textarea
            id="intro"
            name="intro"
            defaultValue={site.pricing.intro}
            rows={3}
            className={textareaClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="priceRange">
            Fourchette de prix
          </label>
          <input
            id="priceRange"
            name="priceRange"
            defaultValue={site.pricing.priceRange}
            className={inputClass}
          />
        </div>

        <div>
          <p className={labelClass}>Prestations incluses</p>
          <div className="space-y-2">
            {site.pricing.includes.map((item, i) => (
              <input
                key={i}
                name={`include-${i}`}
                defaultValue={item}
                className={inputClass}
              />
            ))}
            {site.pricing.includes.length === 0 && (
              <p className="text-sm text-slate-400">Aucun élément pour le moment.</p>
            )}
          </div>
        </div>

        <div>
          <label className={labelClass} htmlFor="notes">
            Notes (acompte, modalités…)
          </label>
          <textarea
            id="notes"
            name="notes"
            defaultValue={site.pricing.notes}
            rows={3}
            className={textareaClass}
          />
        </div>

        <SubmitButton>Enregistrer</SubmitButton>
      </form>

      <div className={`${cardClass} mt-4`}>
        <p className={sectionTitleClass}>Ajouter ou supprimer une prestation incluse</p>
        <p className="text-sm text-slate-500 mb-3">
          Après ajout ou suppression, modifiez le texte ci-dessus puis cliquez sur
          « Enregistrer ».
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <form action={addInclude}>
            <SubmitButton
              className="text-sm rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
              pendingLabel="Ajout…"
            >
              + Ajouter une prestation
            </SubmitButton>
          </form>
          {site.pricing.includes.map((item, i) => (
            <form key={i} action={removeInclude.bind(null, i)}>
              <ConfirmDeleteButton
                label={`Supprimer « ${item.slice(0, 24)}${item.length > 24 ? "…" : ""} »`}
                confirmLabel="Confirmer ?"
                className="text-sm rounded-md border border-red-200 text-red-600 px-3 py-1.5 hover:bg-red-50"
              />
            </form>
          ))}
        </div>
      </div>
    </div>
  );
}
