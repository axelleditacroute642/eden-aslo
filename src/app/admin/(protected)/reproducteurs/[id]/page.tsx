import { notFound } from "next/navigation";
import { readBreeders } from "@/lib/store";
import {
  updateBreeder,
  deleteBreeder,
  addBreederPhotos,
  removeBreederPhoto,
  updateBreederPhotoPosition,
} from "../actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import PlaceholderPhoto from "@/components/PlaceholderPhoto";
import PhotoPositionEditor from "@/components/admin/PhotoPositionEditor";
import {
  pageTitleClass,
  cardClass,
  sectionTitleClass,
  labelClass,
  inputClass,
  textareaClass,
} from "@/components/admin/ui";

const fileInputClass =
  "block w-full text-xs text-slate-600 file:mr-2 file:rounded-md file:border-0 file:bg-slate-100 file:px-2 file:py-1 file:text-xs file:font-medium hover:file:bg-slate-200";

function isRealPhoto(seed: string): boolean {
  return seed?.startsWith("/uploads/") || seed?.startsWith("http");
}

export default async function AdminEditBreederPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const breeders = await readBreeders();
  const breeder = breeders.find((b) => b.id === id);
  if (!breeder) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>{breeder.name}</h1>

      <form id="breeder-form" action={updateBreeder.bind(null, breeder.id)} className="space-y-4">
        <div className={`${cardClass} grid gap-4 sm:grid-cols-2`}>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="name">Nom</label>
            <input id="name" name="name" defaultValue={breeder.name} required className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="slug">Adresse (slug)</label>
            <input id="slug" name="slug" defaultValue={breeder.slug} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="sex">Sexe</label>
            <select id="sex" name="sex" defaultValue={breeder.sex} className={inputClass}>
              <option value="Mâle">Mâle</option>
              <option value="Femelle">Femelle</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="role">Rôle</label>
            <select id="role" name="role" defaultValue={breeder.role} className={inputClass}>
              <option value="Reproductrice">Reproductrice</option>
              <option value="Reproducteur">Reproducteur</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="status">Statut</label>
            <select id="status" name="status" defaultValue={breeder.status} className={inputClass}>
              <option value="actif">Actif</option>
              <option value="retraité">Retraité</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="ownership">Propriétaire</label>
            <select id="ownership" name="ownership" defaultValue={breeder.ownership ?? "maison"} className={inputClass}>
              <option value="maison">Mon chat</option>
              <option value="externe">Saillie externe</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="birthDate">Date de naissance</label>
            <input id="birthDate" name="birthDate" type="date" defaultValue={breeder.birthDate} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="pedigree">Pedigree (n° LOOF)</label>
            <input id="pedigree" name="pedigree" defaultValue={breeder.pedigree} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="coatColor">Couleur de robe</label>
            <input id="coatColor" name="coatColor" defaultValue={breeder.coat.color} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="coatPattern">Motif</label>
            <input id="coatPattern" name="coatPattern" defaultValue={breeder.coat.pattern} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="coatEyeColor">Couleur des yeux</label>
            <input id="coatEyeColor" name="coatEyeColor" defaultValue={breeder.coat.eyeColor} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="coatDescription">Description de la robe</label>
            <textarea id="coatDescription" name="coatDescription" defaultValue={breeder.coat.description} rows={2} className={textareaClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="description">Description</label>
            <textarea id="description" name="description" defaultValue={breeder.description} rows={4} className={textareaClass} />
          </div>
        </div>
      </form>

      <div className={`${cardClass} mt-6`}>
        <p className={sectionTitleClass}>Photos</p>
        <div className="grid gap-4 sm:grid-cols-2 mb-4">
          {breeder.photos.map((photo) => {
            const pos = breeder.photoPositions?.[photo];
            return (
              <div key={photo} className="rounded-lg border border-slate-200 p-3 space-y-3">
                {isRealPhoto(photo) ? (
                  <form action={updateBreederPhotoPosition.bind(null, breeder.id, photo)} className="space-y-2">
                    <PhotoPositionEditor
                      src={photo}
                      nameX="photo-posX"
                      nameY="photo-posY"
                      nameZoom="photo-posZoom"
                      defaultX={pos?.x ?? 50}
                      defaultY={pos?.y ?? 50}
                      defaultZoom={pos?.zoom ?? 1}
                      aspect="4 / 3"
                    />
                    <SubmitButton
                      className="text-xs rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
                      pendingLabel="…"
                    >
                      Enregistrer le cadrage
                    </SubmitButton>
                  </form>
                ) : (
                  <PlaceholderPhoto seed={photo} rounded="rounded-md" className="aspect-[4/3]" />
                )}
                <form action={removeBreederPhoto.bind(null, breeder.id, photo)} className="pt-1 border-t border-slate-100">
                  <ConfirmDeleteButton
                    label="Supprimer"
                    confirmLabel="Confirmer ?"
                    className="text-xs rounded-md border border-red-200 text-red-600 px-2 py-1 hover:bg-red-50"
                  />
                </form>
              </div>
            );
          })}
        </div>
        <form action={addBreederPhotos.bind(null, breeder.id)} className="flex flex-wrap items-center gap-3">
          <input type="file" name="photos" accept="image/*" multiple className={fileInputClass} />
          <SubmitButton
            className="text-sm rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
            pendingLabel="Envoi…"
          >
            + Ajouter des photos
          </SubmitButton>
        </form>
      </div>

      <button
        type="submit"
        form="breeder-form"
        className="mt-6 rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors"
      >
        Enregistrer
      </button>

      <div className={`${cardClass} mt-6 border-red-200`}>
        <p className="text-sm font-semibold text-red-700 mb-2">Zone dangereuse</p>
        <p className="text-sm text-slate-500 mb-3">
          Supprime définitivement la fiche « {breeder.name} » et ses photos.
        </p>
        <form action={deleteBreeder.bind(null, breeder.id)}>
          <ConfirmDeleteButton
            label={`Supprimer ${breeder.name}`}
            confirmLabel="Confirmer la suppression définitive ?"
            className="text-sm rounded-md border border-red-300 bg-red-50 text-red-700 px-3 py-1.5 hover:bg-red-100"
          />
        </form>
      </div>
    </div>
  );
}
