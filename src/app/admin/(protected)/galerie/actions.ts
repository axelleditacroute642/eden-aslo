"use server";

import { revalidatePath } from "next/cache";
import { readGallery, writeGallery } from "@/lib/store";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/uploads";

function readPhotoPosition(formData: FormData) {
  const x = Number(formData.get("posX"));
  const y = Number(formData.get("posY"));
  if (!Number.isFinite(x) || !Number.isFinite(y)) return undefined;
  return {
    x: Math.min(100, Math.max(0, Math.round(x))),
    y: Math.min(100, Math.max(0, Math.round(y))),
  };
}

export async function addGalleryPhoto(formData: FormData) {
  const gallery = await readGallery();
  const file = formData.get("photo");
  if (!(file instanceof File)) return;

  const url = await saveUploadedImage(file, "gallery");
  if (!url) return;

  gallery.push({
    id: `g-${Date.now()}`,
    seed: url,
    caption: String(formData.get("caption") ?? ""),
    category: (String(formData.get("category") ?? "actuel") as "actuel" | "ancien"),
    type: (String(formData.get("type") ?? "chat") as "chat" | "chaton"),
  });

  await writeGallery(gallery);
  revalidatePath("/", "layout");
}

export async function updateGalleryPhoto(id: string, formData: FormData) {
  const gallery = await readGallery();
  const index = gallery.findIndex((p) => p.id === id);
  if (index === -1) return;

  const file = formData.get("photo");
  if (file instanceof File && file.size > 0) {
    const url = await saveUploadedImage(file, "gallery");
    if (url) {
      await deleteUploadedImage(gallery[index].seed);
      gallery[index].seed = url;
      gallery[index].position = undefined;
    }
  } else {
    gallery[index].position = readPhotoPosition(formData) ?? gallery[index].position;
  }

  gallery[index].caption = String(formData.get("caption") ?? gallery[index].caption);
  gallery[index].category = (String(formData.get("category") ?? gallery[index].category) as "actuel" | "ancien");
  gallery[index].type = (String(formData.get("type") ?? gallery[index].type) as "chat" | "chaton");

  await writeGallery(gallery);
  revalidatePath("/", "layout");
}

export async function deleteGalleryPhoto(id: string) {
  const gallery = await readGallery();
  const photo = gallery.find((p) => p.id === id);
  if (!photo) return;

  await deleteUploadedImage(photo.seed);
  await writeGallery(gallery.filter((p) => p.id !== id));
  revalidatePath("/", "layout");
}
