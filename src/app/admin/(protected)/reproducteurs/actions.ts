"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readBreeders, writeBreeders } from "@/lib/store";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/uploads";
import type { Breeder } from "@/lib/breeders";

function slugify(input: string): string {
  return input
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function uniqueSlug(base: string, existing: string[]): string {
  let slug = base || "reproducteur";
  let n = 2;
  while (existing.includes(slug)) {
    slug = `${base || "reproducteur"}-${n++}`;
  }
  return slug;
}

export async function addBreeder(formData: FormData) {
  const breeders = await readBreeders();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/reproducteurs/nouveau");

  const slug = uniqueSlug(
    slugify(name),
    breeders.map((b) => b.slug)
  );
  const id = `breeder-${slug}`;

  const photos: string[] = [];
  for (const f of formData.getAll("photos")) {
    if (f instanceof File) {
      const url = await saveUploadedImage(f, "breeders");
      if (url) photos.push(url);
    }
  }

  const breeder: Breeder = {
    id,
    slug,
    name,
    sex: String(formData.get("sex") ?? "Femelle") as Breeder["sex"],
    role: String(formData.get("role") ?? "Reproductrice") as Breeder["role"],
    status: String(formData.get("status") ?? "actif") as Breeder["status"],
    birthDate: String(formData.get("birthDate") ?? ""),
    pedigree: String(formData.get("pedigree") ?? ""),
    coat: {
      color: String(formData.get("coatColor") ?? ""),
      pattern: String(formData.get("coatPattern") ?? ""),
      eyeColor: String(formData.get("coatEyeColor") ?? ""),
      description: String(formData.get("coatDescription") ?? ""),
    },
    description: String(formData.get("description") ?? ""),
    photos,
  };

  breeders.push(breeder);
  await writeBreeders(breeders);
  revalidatePath("/", "layout");
  redirect(`/admin/reproducteurs/${id}`);
}

export async function updateBreeder(id: string, formData: FormData) {
  const breeders = await readBreeders();
  const index = breeders.findIndex((b) => b.id === id);
  if (index === -1) redirect("/admin/reproducteurs");

  const existing = breeders[index];

  const requestedSlug = slugify(String(formData.get("slug") ?? existing.slug));
  const slugTaken = breeders.some((b) => b.slug === requestedSlug && b.id !== id);
  const slug = requestedSlug && !slugTaken ? requestedSlug : existing.slug;

  breeders[index] = {
    ...existing,
    slug,
    name: String(formData.get("name") ?? existing.name),
    sex: String(formData.get("sex") ?? existing.sex) as Breeder["sex"],
    role: String(formData.get("role") ?? existing.role) as Breeder["role"],
    status: String(formData.get("status") ?? existing.status) as Breeder["status"],
    birthDate: String(formData.get("birthDate") ?? existing.birthDate),
    pedigree: String(formData.get("pedigree") ?? existing.pedigree),
    coat: {
      color: String(formData.get("coatColor") ?? existing.coat.color),
      pattern: String(formData.get("coatPattern") ?? existing.coat.pattern),
      eyeColor: String(formData.get("coatEyeColor") ?? existing.coat.eyeColor),
      description: String(formData.get("coatDescription") ?? existing.coat.description),
    },
    description: String(formData.get("description") ?? existing.description),
  };

  await writeBreeders(breeders);
  revalidatePath("/", "layout");
  redirect(`/admin/reproducteurs/${id}`);
}

export async function deleteBreeder(id: string) {
  const breeders = await readBreeders();
  const breeder = breeders.find((b) => b.id === id);
  if (!breeder) redirect("/admin/reproducteurs");

  await Promise.all(breeder.photos.map((p) => deleteUploadedImage(p)));

  await writeBreeders(breeders.filter((b) => b.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/reproducteurs");
}

export async function addBreederPhotos(id: string, formData: FormData) {
  const breeders = await readBreeders();
  const index = breeders.findIndex((b) => b.id === id);
  if (index === -1) return;

  for (const f of formData.getAll("photos")) {
    if (f instanceof File) {
      const url = await saveUploadedImage(f, "breeders");
      if (url) breeders[index].photos.push(url);
    }
  }

  await writeBreeders(breeders);
  revalidatePath("/", "layout");
}

export async function removeBreederPhoto(id: string, photoUrl: string) {
  const breeders = await readBreeders();
  const index = breeders.findIndex((b) => b.id === id);
  if (index === -1) return;
  if (breeders[index].photos.length <= 1) return;

  breeders[index].photos = breeders[index].photos.filter((p) => p !== photoUrl);
  await writeBreeders(breeders);
  await deleteUploadedImage(photoUrl);
  revalidatePath("/", "layout");
}
