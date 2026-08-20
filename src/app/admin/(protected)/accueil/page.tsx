import { readSite } from "@/lib/store";
import { updateHome, addHighlight, removeHighlight } from "./actions";
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

export default async function AdminAccueilPage() {
  const site = await readSite();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>Accueil</h1>

      <form action={updateHome} className={`${cardClass} space-y-5`}>
        <div>
          <label className={labelClass} htmlFor="tagline">
            Accroche
          </label>
          <input
            id="tagline"
            name="tagline"
            defaultValue={site.home.tagline}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass} htmlFor="intro">
            Texte d&apos;introduction
          </label>
          <textarea
            id="intro"
            name="intro"
            defaultValue={site.home.intro}
            rows={5}
            className={textareaClass}
          />
        </div>

        <div>
          <p className={labelClass}>Points forts</p>
          <div className="space-y-3">
            {site.home.highlights.map((h, i) => (
              <div key={i} className="rounded-md border border-slate-200 p-3 space-y-2">
                <input
                  name={`highlight-title-${i}`}
                  defaultValue={h.title}
                  placeholder="Titre"
                  className={inputClass}
                />
                <textarea
                  name={`highlight-text-${i}`}
                  defaultValue={h.text}
                  placeholder="Texte"
                  rows={2}
                  className={textareaClass}
                />
              </div>
            ))}
            {site.home.highlights.length === 0 && (
              <p className="text-sm text-slate-400">Aucun point fort pour le moment.</p>
            )}
          </div>
        </div>

        <SubmitButton>Enregistrer</SubmitButton>
      </form>

      <div className={`${cardClass} mt-4`}>
        <p className={sectionTitleClass}>Ajouter ou supprimer un point fort</p>
        <p className="text-sm text-slate-500 mb-3">
          Après ajout ou suppression, modifiez le contenu ci-dessus puis cliquez sur
          « Enregistrer ».
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <form action={addHighlight}>
            <SubmitButton
              className="text-sm rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
              pendingLabel="Ajout…"
            >
              + Ajouter un point fort
            </SubmitButton>
          </form>
          {site.home.highlights.map((h, i) => (
            <form key={i} action={removeHighlight.bind(null, i)}>
              <ConfirmDeleteButton
                label={`Supprimer « ${h.title || `#${i + 1}`} »`}
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
