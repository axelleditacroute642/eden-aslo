import { readSite } from "@/lib/store";
import { updateDocuments } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";
import { pageTitleClass, cardClass, labelClass, inputClass, textareaClass } from "@/components/admin/ui";

export default async function AdminDocumentationPage() {
  const site = await readSite();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>Documentation officielle</h1>

      <form action={updateDocuments} className="space-y-4">
        {site.documents.map((doc) => (
          <div key={doc.id} className={`${cardClass} space-y-3`}>
            <div>
              <label className={labelClass} htmlFor={`title-${doc.id}`}>
                Titre
              </label>
              <input
                id={`title-${doc.id}`}
                name={`title-${doc.id}`}
                defaultValue={doc.title}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor={`description-${doc.id}`}>
                Description
              </label>
              <textarea
                id={`description-${doc.id}`}
                name={`description-${doc.id}`}
                defaultValue={doc.description}
                rows={2}
                className={textareaClass}
              />
            </div>
            <div>
              <label className={labelClass} htmlFor={`file-${doc.id}`}>
                Remplacer le PDF ({doc.filename})
              </label>
              <input
                id={`file-${doc.id}`}
                name={`file-${doc.id}`}
                type="file"
                accept="application/pdf"
                className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-slate-200"
              />
              <a
                href={`/documents/${doc.filename}`}
                target="_blank"
                className="mt-2 inline-block text-xs text-slate-500 underline hover:text-slate-700"
              >
                Consulter le PDF actuel
              </a>
            </div>
          </div>
        ))}
        <SubmitButton>Enregistrer</SubmitButton>
      </form>
    </div>
  );
}
