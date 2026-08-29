import { readGallery } from "@/lib/store";
import { addGalleryPhoto, updateGalleryPhoto, deleteGalleryPhoto } from "./actions";
import SubmitButton from "@/components/admin/SubmitButton";
import ConfirmDeleteButton from "@/components/admin/ConfirmDeleteButton";
import PlaceholderPhoto from "@/components/PlaceholderPhoto";
import PhotoPositionEditor from "@/components/admin/PhotoPositionEditor";
import { pageTitleClass, cardClass, sectionTitleClass, labelClass, inputClass } from "@/components/admin/ui";

const fileInputClass =
  "block w-full text-xs text-slate-600 file:mr-2 file:rounded-md file:border-0 file:bg-slate-100 file:px-2 file:py-1 file:text-xs file:font-medium hover:file:bg-slate-200";

function isRealPhoto(seed: string): boolean {
  return seed?.startsWith("/uploads/") || seed?.startsWith("http");
}

export default async function AdminGaleriePage() {
  const gallery = await readGallery();

  return (
    <div>
      <h1 className={pageTitleClass}>Galerie</h1>

      <div className={`${cardClass} mb-6`}>
        <p className={sectionTitleClass}>Ajouter une photo</p>
        <form action={addGalleryPhoto} className="grid gap-3 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="photo">Photo</label>
            <input id="photo" name="photo" type="file" accept="image/*" required className={fileInputClass} />
          </div>
          <div className="sm:col-span-2">
            <label className={labelClass} htmlFor="caption">Légende</label>
            <input id="caption" name="caption" className={inputClass} />
          </div>
          <div>
            <label className={labelClass} htmlFor="category">Catégorie</label>
            <select id="category" name="category" defaultValue="actuel" className={inputClass}>
              <option value="actuel">Actuel</option>
              <option value="ancien">Ancien</option>
            </select>
          </div>
          <div>
            <label className={labelClass} htmlFor="type">Type</label>
            <select id="type" name="type" defaultValue="chat" className={inputClass}>
              <option value="chat">Chat</option>
              <option value="chaton">Chaton</option>
            </select>
          </div>
          <div className="sm:col-span-2">
            <SubmitButton pendingLabel="Envoi…">+ Ajouter la photo</SubmitButton>
          </div>
        </form>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {gallery.map((p) => (
          <form key={p.id} action={updateGalleryPhoto.bind(null, p.id)} className={`${cardClass} space-y-2`}>
            {isRealPhoto(p.seed) ? (
              <PhotoPositionEditor
                src={p.seed}
                nameX="posX"
                nameY="posY"
                nameZoom="posZoom"
                defaultX={p.position?.x ?? 50}
                defaultY={p.position?.y ?? 50}
                defaultZoom={p.position?.zoom ?? 1}
                aspect="1 / 1"
              />
            ) : (
              <PlaceholderPhoto seed={p.seed} rounded="rounded-md" className="aspect-square" />
            )}
            <input name="caption" defaultValue={p.caption} placeholder="Légende" className={inputClass} />
            <div className="flex gap-2">
              <select name="category" defaultValue={p.category} className={inputClass}>
                <option value="actuel">Actuel</option>
                <option value="ancien">Ancien</option>
              </select>
              <select name="type" defaultValue={p.type} className={inputClass}>
                <option value="chat">Chat</option>
                <option value="chaton">Chaton</option>
              </select>
            </div>
            <input type="file" name="photo" accept="image/*" className={fileInputClass} />
            <div className="flex items-center justify-between pt-1">
              <SubmitButton
                className="text-sm rounded-md border border-slate-300 px-3 py-1.5 hover:bg-slate-50"
                pendingLabel="…"
              >
                Enregistrer
              </SubmitButton>
              <ConfirmDeleteButton
                formAction={deleteGalleryPhoto.bind(null, p.id)}
                label="Supprimer"
                confirmLabel="Confirmer ?"
                className="text-xs text-red-600 hover:text-red-700 font-medium"
              />
            </div>
          </form>
        ))}
        {gallery.length === 0 && (
          <p className="text-sm text-slate-400">Aucune photo pour le moment.</p>
        )}
      </div>
    </div>
  );
}
