import { readSite } from "@/lib/store";
import { addFaqItem, updateFaqItem, deleteFaqItem } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import { pageTitleClass, cardClass, sectionTitleClass, labelClass, inputClass, textareaClass } from "@/components/admin/ui";

export default async function AdminFaqPage() {
  const site = await readSite();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>FAQ</h1>

      <div className="space-y-4 mb-10">
        {site.faq.map((item) => (
          <div key={item.id} className={`${cardClass} space-y-3`}>
            <form action={updateFaqItem.bind(null, item.id)} className="space-y-3">
              <div>
                <label className={labelClass} htmlFor={`question-${item.id}`}>
                  Question
                </label>
                <input
                  id={`question-${item.id}`}
                  name="question"
                  defaultValue={item.question}
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass} htmlFor={`answer-${item.id}`}>
                  Réponse
                </label>
                <textarea
                  id={`answer-${item.id}`}
                  name="answer"
                  defaultValue={item.answer}
                  rows={3}
                  className={textareaClass}
                />
              </div>
              <div className="flex items-center justify-between">
                <SubmitButton>Enregistrer</SubmitButton>
              </div>
            </form>
            <form action={deleteFaqItem.bind(null, item.id)} className="border-t border-slate-100 pt-3">
              <ConfirmDeleteButton label="Supprimer cette question" />
            </form>
          </div>
        ))}
        {site.faq.length === 0 && (
          <p className="text-sm text-slate-400">Aucune question pour le moment.</p>
        )}
      </div>

      <section>
        <h2 className={sectionTitleClass}>Ajouter une question</h2>
        <form action={addFaqItem} className={`${cardClass} space-y-3`}>
          <div>
            <label className={labelClass} htmlFor="new-question">
              Question
            </label>
            <input id="new-question" name="question" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="new-answer">
              Réponse
            </label>
            <textarea id="new-answer" name="answer" rows={3} className={textareaClass} />
          </div>
          <SubmitButton>Ajouter</SubmitButton>
        </form>
      </section>
    </div>
  );
}
