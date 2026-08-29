import { addBreeder } from "../actions";
import SubmitButton from "@/components/admin/SubmitButton";
import { pageTitleClass, cardClass, labelClass, inputClass, textareaClass } from "@/components/admin/ui";

export default function AdminNewBreederPage() {
  return (
    <div className="max-w-2xl">
      <h1 className={pageTitleClass}>Ajouter un reproducteur</h1>
      <p className="text-sm text-slate-500 mb-6">
        Les photos supplémentaires se complètent après la création, depuis la
        fiche du reproducteur.
      </p>

      <form action={addBreeder} className={`${cardClass} grid gap-4 sm:grid-cols-2`}>
        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="name">Nom</label>
          <input id="name" name="name" required className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="sex">Sexe</label>
          <select id="sex" name="sex" className={inputClass} defaultValue="Femelle">
            <option value="Mâle">Mâle</option>
            <option value="Femelle">Femelle</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="role">Rôle</label>
          <select id="role" name="role" className={inputClass} defaultValue="Reproductrice">
            <option value="Reproductrice">Reproductrice</option>
            <option value="Reproducteur">Reproducteur</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="status">Statut</label>
          <select id="status" name="status" className={inputClass} defaultValue="actif">
            <option value="actif">Actif</option>
            <option value="retraité">Retraité</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="ownership">Propriétaire</label>
          <select id="ownership" name="ownership" className={inputClass} defaultValue="maison">
            <option value="maison">Mon chat</option>
            <option value="externe">Saillie externe</option>
          </select>
        </div>

        <div>
          <label className={labelClass} htmlFor="birthDate">Date de naissance</label>
          <input id="birthDate" name="birthDate" type="date" className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="pedigree">Pedigree (n° LOOF)</label>
          <input id="pedigree" name="pedigree" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="coatColor">Couleur de robe</label>
          <input id="coatColor" name="coatColor" className={inputClass} />
        </div>

        <div>
          <label className={labelClass} htmlFor="coatPattern">Motif</label>
          <input id="coatPattern" name="coatPattern" className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="coatEyeColor">Couleur des yeux</label>
          <input id="coatEyeColor" name="coatEyeColor" className={inputClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="coatDescription">Description de la robe</label>
          <textarea id="coatDescription" name="coatDescription" rows={2} className={textareaClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="description">Description</label>
          <textarea id="description" name="description" rows={4} className={textareaClass} />
        </div>

        <div className="sm:col-span-2">
          <label className={labelClass} htmlFor="photos">Photos</label>
          <input
            id="photos"
            name="photos"
            type="file"
            accept="image/*"
            multiple
            className="block w-full text-sm text-slate-600 file:mr-3 file:rounded-md file:border-0 file:bg-slate-100 file:px-3 file:py-1.5 file:text-sm file:font-medium hover:file:bg-slate-200"
          />
        </div>

        <div className="sm:col-span-2">
          <SubmitButton pendingLabel="Création…">Créer le reproducteur</SubmitButton>
        </div>
      </form>
    </div>
  );
}
