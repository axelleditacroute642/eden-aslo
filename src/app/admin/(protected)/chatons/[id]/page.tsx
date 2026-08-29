import { notFound } from "next/navigation";
import { readKittens } from "@/lib/store";
import type { Grandparent, Parent } from "@/lib/kittens";
import {
  updateKitten,
  deleteKitten,
  addKittenPhotos,
  removeKittenPhoto,
  moveKittenPhoto,
} from "../actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import PlaceholderPhoto from "@/components/PlaceholderPhoto";
import FocalPointPicker from "@/components/admin/FocalPointPicker";
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

function GrandparentFields({
  prefix,
  label,
  gp,
}: {
  prefix: string;
  label: string;
  gp: Grandparent;
}) {
  return (
    <div className="rounded-md border border-slate-200 p-3 space-y-2">
      <div className="flex items-center gap-2 mb-1">
        <PlaceholderPhoto
          seed={gp.photoSeed || prefix}
          position={gp.photoPosition}
          rounded="rounded-full"
          className="w-10 h-10 shrink-0"
        />
        <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
      </div>
      <input name={`${prefix}-name`} defaultValue={gp.name} placeholder="Nom" className={inputClass} />
      <input name={`${prefix}-pedigree`} defaultValue={gp.pedigree} placeholder="N° LOOF" className={inputClass} />
      <input
        name={`${prefix}-photoSeed`}
        defaultValue={gp.photoSeed}
        placeholder="Seed (si pas de photo réelle)"
        className={inputClass}
      />
      <input type="file" name={`${prefix}-photo`} accept="image/*" className={fileInputClass} />
      {isRealPhoto(gp.photoSeed) && (
        <FocalPointPicker
          src={gp.photoSeed}
          nameX={`${prefix}-posX`}
          nameY={`${prefix}-posY`}
          defaultX={gp.photoPosition?.x ?? 50}
          defaultY={gp.photoPosition?.y ?? 50}
        />
      )}
    </div>
  );
}

function ParentFields({
  prefix,
  label,
  parent,
}: {
  prefix: string;
  label: string;
  parent: Parent;
}) {
  return (
    <div className="rounded-lg border border-slate-300 p-4 space-y-3">
      <div className="flex items-center gap-3">
        <PlaceholderPhoto
          seed={parent.photoSeed || prefix}
          position={parent.photoPosition}
          rounded="rounded-full"
          className="w-14 h-14 shrink-0"
        />
        <p className="font-medium text-slate-800">{label}</p>
      </div>
      <input name={`${prefix}-name`} defaultValue={parent.name} placeholder="Nom" className={inputClass} />
      <input name={`${prefix}-pedigree`} defaultValue={parent.pedigree} placeholder="N° LOOF" className={inputClass} />
      <input name={`${prefix}-coat`} defaultValue={parent.coat} placeholder="Robe" className={inputClass} />
      <input
        name={`${prefix}-photoSeed`}
        defaultValue={parent.photoSeed}
        placeholder="Seed (si pas de photo réelle)"
        className={inputClass}
      />
      <input type="file" name={`${prefix}-photo`} accept="image/*" className={fileInputClass} />
      {isRealPhoto(parent.photoSeed) && (
        <FocalPointPicker
          src={parent.photoSeed}
          nameX={`${prefix}-posX`}
          nameY={`${prefix}-posY`}
          defaultX={parent.photoPosition?.x ?? 50}
          defaultY={parent.photoPosition?.y ?? 50}
        />
      )}

      <div className="grid grid-cols-2 gap-3 pt-2">
        <GrandparentFields prefix={`${prefix}-gf`} label="Père" gp={parent.parents.father} />
        <GrandparentFields prefix={`${prefix}-gm`} label="Mère" gp={parent.parents.mother} />
      </div>
    </div>
  );
}

export default async function AdminEditKittenPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const kittens = await readKittens();
  const kitten = kittens.find((k) => k.id === id);
  if (!kitten) notFound();

  return (
    <div className="max-w-3xl">
      <h1 className={pageTitleClass}>{kitten.name}</h1>

      <form id="kitten-form" action={updateKitten.bind(null, kitten.id)} className="space-y-4">
        <div className={`${cardClass} grid gap-4 sm:grid-cols-2`}>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="name">Nom</label>
            <input id="name" name="name" defaultValue={kitten.name} required className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="slug">Adresse (slug)</label>
            <input id="slug" name="slug" defaultValue={kitten.slug} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="sex">Sexe</label>
            <select id="sex" name="sex" defaultValue={kitten.sex} className={inputClass}>
              <option value="Mâle">Mâle</option>
              <option value="Femelle">Femelle</option>
              <option value="Indéterminé">Indéterminé</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="status">Statut</label>
            <select id="status" name="status" defaultValue={kitten.status} className={inputClass}>
              <option value="disponible">Disponible</option>
              <option value="réservé">Réservé</option>
              <option value="vendu">Vendu</option>
            </select>
          </div>

          <div>
            <label className={labelClass} htmlFor="birthDate">Date de naissance</label>
            <input id="birthDate" name="birthDate" type="date" defaultValue={kitten.birthDate} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="price">Prix (€)</label>
            <input id="price" name="price" type="number" min="0" step="1" defaultValue={kitten.price} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="coatColor">Couleur de robe</label>
            <input id="coatColor" name="coatColor" defaultValue={kitten.coat.color} className={inputClass} />
          </div>

          <div>
            <label className={labelClass} htmlFor="coatPattern">Motif</label>
            <input id="coatPattern" name="coatPattern" defaultValue={kitten.coat.pattern} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="coatEyeColor">Couleur des yeux</label>
            <input id="coatEyeColor" name="coatEyeColor" defaultValue={kitten.coat.eyeColor} className={inputClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="coatDescription">Description de la robe</label>
            <textarea id="coatDescription" name="coatDescription" defaultValue={kitten.coat.description} rows={2} className={textareaClass} />
          </div>

          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="description">Description du chaton</label>
            <textarea id="description" name="description" defaultValue={kitten.description} rows={4} className={textareaClass} />
          </div>
        </div>

        <div className={cardClass}>
          <p className={sectionTitleClass}>Généalogie</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <ParentFields prefix="father" label="Père" parent={kitten.parents.father} />
            <ParentFields prefix="mother" label="Mère" parent={kitten.parents.mother} />
          </div>
        </div>

      </form>

      <div className={`${cardClass} mt-6`}>
        <p className={sectionTitleClass}>Photos du chaton</p>
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-4">
          {kitten.photos.map((photo, i) => (
            <div key={photo} className="space-y-1.5">
              <PlaceholderPhoto seed={photo} rounded="rounded-md" className="aspect-square" />
              <div className="flex gap-1">
                <form action={moveKittenPhoto.bind(null, kitten.id, photo, "left")} className="flex-1">
                  <button
                    type="submit"
                    disabled={i === 0}
                    aria-label="Déplacer avant"
                    className="w-full text-xs rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    ←
                  </button>
                </form>
                <form action={moveKittenPhoto.bind(null, kitten.id, photo, "right")} className="flex-1">
                  <button
                    type="submit"
                    disabled={i === kitten.photos.length - 1}
                    aria-label="Déplacer après"
                    className="w-full text-xs rounded-md border border-slate-200 px-2 py-1 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    →
                  </button>
                </form>
              </div>
              <form action={removeKittenPhoto.bind(null, kitten.id, photo)}>
                <ConfirmDeleteButton
                  label="Supprimer"
                  confirmLabel="Confirmer ?"
                  className="w-full text-xs rounded-md border border-red-200 text-red-600 px-2 py-1 hover:bg-red-50"
                />
              </form>
            </div>
          ))}
        </div>
        <form action={addKittenPhotos.bind(null, kitten.id)} className="flex flex-wrap items-center gap-3">
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
        form="kitten-form"
        className="mt-6 rounded-md bg-slate-900 text-white text-sm font-medium px-4 py-2 hover:bg-slate-800 transition-colors"
      >
        Enregistrer
      </button>

      <div className={`${cardClass} mt-6 border-red-200`}>
        <p className="text-sm font-semibold text-red-700 mb-2">Zone dangereuse</p>
        <p className="text-sm text-slate-500 mb-3">
          Supprime définitivement la fiche « {kitten.name} » et ses photos.
        </p>
        <form action={deleteKitten.bind(null, kitten.id)}>
          <ConfirmDeleteButton
            label={`Supprimer ${kitten.name}`}
            confirmLabel="Confirmer la suppression définitive ?"
            className="text-sm rounded-md border border-red-300 bg-red-50 text-red-700 px-3 py-1.5 hover:bg-red-100"
          />
        </form>
      </div>
    </div>
  );
}
