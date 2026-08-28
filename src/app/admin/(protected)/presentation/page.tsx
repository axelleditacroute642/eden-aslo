import { readSite } from "@/lib/store";
import { updatePresentation, addParagraph, removeParagraph } from "./actions";
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

export default async function AdminPresentationPage() {
  const site = await readSite();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>Présentation</h1>

      <form action={updatePresentation} className={`${cardClass} space-y-5`}>
        <div>
          <label className={labelClass} htmlFor="intro">
            Texte d&apos;introduction
          </label>
          <textarea
            id="intro"
            name="intro"
            defaultValue={site.presentation.intro}
            rows={3}
            className={textareaClass}
          />
        </div>

        <div>
          <p className={labelClass}>Paragraphes</p>
          <div className="space-y-2">
            {site.presentation.paragraphs.map((p, i) => (
              <textarea
                key={i}
                name={`paragraph-${i}`}
                defaultValue={p}
                rows={3}
                className={textareaClass}
              />
            ))}
            {site.presentation.paragraphs.length === 0 && (
              <p className="text-sm text-slate-400">Aucun paragraphe pour le moment.</p>
            )}
          </div>
        </div>

        <SubmitButton>Enregistrer</SubmitButton>
      </form>

      <div className={`${cardClass} mt-4`}>
        <p className={sectionTitleClass}>Ajouter ou supprimer un paragraphe</p>
        <p className="text-sm text-slate-500 mb-3">
          Après ajout ou suppression, modifiez le texte ci-dessus puis cliquez sur
          « Enregistrer ».
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <form action={addParagraph}>
            <SubmitButton
              className="text-sm rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
              pendingLabel="Ajout…"
            >
              + Ajouter un paragraphe
            </SubmitButton>
          </form>
          {site.presentation.paragraphs.map((p, i) => (
            <form key={i} action={removeParagraph.bind(null, i)}>
              <ConfirmDeleteButton
                label={`Supprimer « ${p.slice(0, 24)}${p.length > 24 ? "…" : ""} »`}
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
