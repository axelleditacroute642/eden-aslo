"use client";

import { useState } from "react";
import { updateLitterStatus } from "@/app/admin/(protected)/chatons/actions";
import SubmitButton from "@/components/admin/SubmitButton";
import { cardClass, labelClass, inputClass, textareaClass, sectionTitleClass } from "@/components/admin/ui";
import type { LitterStatus } from "@/lib/store";

const OPTIONS: { value: LitterStatus["mode"]; title: string; description: string }[] = [
  {
    value: "portee",
    title: "Portée en cours",
    description: "Affiche les fiches des chatons disponibles / réservés.",
  },
  {
    value: "gestation",
    title: "Gestation en cours",
    description: "Affiche un compte à rebours personnalisable jusqu'à la mise bas.",
  },
  {
    value: "aucune",
    title: "Aucune gestation en cours",
    description: "Affiche la fiche des anciens chatons (vendus).",
  },
];

export default function LitterStatusForm({ status }: { status: LitterStatus }) {
  const [mode, setMode] = useState<LitterStatus["mode"]>(status.mode);

  return (
    <form action={updateLitterStatus} className={`${cardClass} mb-8`}>
      <h2 className={sectionTitleClass}>Statut de la portée</h2>

      <div className="grid gap-3 sm:grid-cols-3 mb-4">
        {OPTIONS.map((opt) => (
          <label
            key={opt.value}
            className={`block cursor-pointer rounded-lg border p-3 text-sm transition-colors ${
              mode === opt.value
                ? "border-slate-900 bg-slate-50"
                : "border-slate-200 hover:border-slate-300"
            }`}
          >
            <input
              type="radio"
              name="mode"
              value={opt.value}
              checked={mode === opt.value}
              onChange={() => setMode(opt.value)}
              className="sr-only"
            />
            <p className="font-medium text-slate-900">{opt.title}</p>
            <p className="text-slate-500 mt-1">{opt.description}</p>
          </label>
        ))}
      </div>

      <div
        className={`grid gap-4 sm:grid-cols-2 border-t border-slate-100 pt-4 ${
          mode === "gestation" ? "" : "hidden"
        }`}
      >
        <div>
          <label className={labelClass} htmlFor="gestationDueDate">
            Date prévue de mise bas
          </label>
          <input
            id="gestationDueDate"
            name="gestationDueDate"
            type="date"
            defaultValue={status.gestationDueDate}
            className={inputClass}
          />
        </div>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="gestationMessage">
            Message affiché au-dessus du compte à rebours
          </label>
          <textarea
            id="gestationMessage"
            name="gestationMessage"
            rows={2}
            defaultValue={status.gestationMessage}
            className={textareaClass}
          />
        </div>
      </div>

      <div className="mt-4">
        <SubmitButton pendingLabel="Enregistrement…">Enregistrer le statut</SubmitButton>
      </div>
    </form>
  );
}
