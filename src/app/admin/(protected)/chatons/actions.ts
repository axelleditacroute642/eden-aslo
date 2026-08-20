"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { readKittens, writeKittens } from "@/lib/store";
import { saveUploadedImage, deleteUploadedImage } from "@/lib/uploads";
import type { Kitten, Parent, Grandparent } from "@/lib/kittens";

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
  let slug = base || "chaton";
  let n = 2;
  while (existing.includes(slug)) {
    slug = `${base || "chaton"}-${n++}`;
  }
  return slug;
}

function emptyGrandparent(): Grandparent {
  return { name: "", photoSeed: "", pedigree: "" };
}

function emptyParent(): Parent {
  return {
    name: "",
    photoSeed: "",
    pedigree: "",
    coat: "",
    parents: { father: emptyGrandparent(), mother: emptyGrandparent() },
  };
}

async function buildGrandparent(
  formData: FormData,
  prefix: string,
  existing: Grandparent
): Promise<Grandparent> {
  let photoSeed = String(formData.get(`${prefix}-photoSeed`) ?? existing.photoSeed);
  const photoFile = formData.get(`${prefix}-photo`);
  if (photoFile instanceof File && photoFile.size > 0) {
    const url = await saveUploadedImage(photoFile, "parents");
    if (url) {
      await deleteUploadedImage(existing.photoSeed);
      photoSeed = url;
    }
  }

  return {
    name: String(formData.get(`${prefix}-name`) ?? existing.name),
    photoSeed,
    pedigree: String(formData.get(`${prefix}-pedigree`) ?? existing.pedigree),
  };
}

async function buildParent(
  formData: FormData,
  prefix: string,
  existing: Parent
): Promise<Parent> {
  let photoSeed = String(formData.get(`${prefix}-photoSeed`) ?? existing.photoSeed);
  const photoFile = formData.get(`${prefix}-photo`);
  if (photoFile instanceof File && photoFile.size > 0) {
    const url = await saveUploadedImage(photoFile, "parents");
    if (url) {
      await deleteUploadedImage(existing.photoSeed);
      photoSeed = url;
    }
  }

  return {
    name: String(formData.get(`${prefix}-name`) ?? existing.name),
    photoSeed,
    pedigree: String(formData.get(`${prefix}-pedigree`) ?? existing.pedigree),
    coat: String(formData.get(`${prefix}-coat`) ?? existing.coat),
    parents: {
      father: await buildGrandparent(formData, `${prefix}-gf`, existing.parents.father),
      mother: await buildGrandparent(formData, `${prefix}-gm`, existing.parents.mother),
    },
  };
}

export async function addKitten(formData: FormData) {
  const kittens = await readKittens();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) redirect("/admin/chatons/nouveau");

  const slug = uniqueSlug(
    slugify(name),
    kittens.map((k) => k.slug)
  );
  const id = `kitten-${slug}`;

  const photos: string[] = [];
  for (const f of formData.getAll("photos")) {
    if (f instanceof File) {
      const url = await saveUploadedImage(f, "kittens");
      if (url) photos.push(url);
    }
  }

  const kitten: Kitten = {
    id,
    slug,
    name,
    sex: (String(formData.get("sex") ?? "Mâle") as Kitten["sex"]),
    status: (String(formData.get("status") ?? "disponible") as Kitten["status"]),
    birthDate: String(formData.get("birthDate") ?? ""),
    price: Number(formData.get("price") ?? 0) || 0,
    currency: "EUR",
    coat: {
      color: String(formData.get("coatColor") ?? ""),
      pattern: String(formData.get("coatPattern") ?? ""),
      eyeColor: String(formData.get("coatEyeColor") ?? ""),
      description: String(formData.get("coatDescription") ?? ""),
    },
    description: String(formData.get("description") ?? ""),
    photos,
    parents: { father: emptyParent(), mother: emptyParent() },
  };

  kittens.push(kitten);
  await writeKittens(kittens);
  revalidatePath("/", "layout");
  redirect(`/admin/chatons/${id}`);
}

export async function updateKitten(id: string, formData: FormData) {
  const kittens = await readKittens();
  const index = kittens.findIndex((k) => k.id === id);
  if (index === -1) redirect("/admin/chatons");

  const existing = kittens[index];

  const requestedSlug = slugify(String(formData.get("slug") ?? existing.slug));
  const slugTaken = kittens.some((k) => k.slug === requestedSlug && k.id !== id);
  const slug = requestedSlug && !slugTaken ? requestedSlug : existing.slug;

  kittens[index] = {
    ...existing,
    slug,
    name: String(formData.get("name") ?? existing.name),
    sex: (String(formData.get("sex") ?? existing.sex) as Kitten["sex"]),
    status: (String(formData.get("status") ?? existing.status) as Kitten["status"]),
    birthDate: String(formData.get("birthDate") ?? existing.birthDate),
    price: Number(formData.get("price") ?? existing.price) || 0,
    coat: {
      color: String(formData.get("coatColor") ?? existing.coat.color),
      pattern: String(formData.get("coatPattern") ?? existing.coat.pattern),
      eyeColor: String(formData.get("coatEyeColor") ?? existing.coat.eyeColor),
      description: String(formData.get("coatDescription") ?? existing.coat.description),
    },
    description: String(formData.get("description") ?? existing.description),
    parents: {
      father: await buildParent(formData, "father", existing.parents.father),
      mother: await buildParent(formData, "mother", existing.parents.mother),
    },
  };

  await writeKittens(kittens);
  revalidatePath("/", "layout");
  redirect(`/admin/chatons/${id}`);
}

export async function deleteKitten(id: string) {
  const kittens = await readKittens();
  const kitten = kittens.find((k) => k.id === id);
  if (!kitten) redirect("/admin/chatons");

  const portraitUrls = [
    kitten.parents.father.photoSeed,
    kitten.parents.father.parents.father.photoSeed,
    kitten.parents.father.parents.mother.photoSeed,
    kitten.parents.mother.photoSeed,
    kitten.parents.mother.parents.father.photoSeed,
    kitten.parents.mother.parents.mother.photoSeed,
  ];

  await Promise.all([
    ...kitten.photos.map((p) => deleteUploadedImage(p)),
    ...portraitUrls.map((p) => deleteUploadedImage(p)),
  ]);

  await writeKittens(kittens.filter((k) => k.id !== id));
  revalidatePath("/", "layout");
  redirect("/admin/chatons");
}

export async function addKittenPhotos(id: string, formData: FormData) {
  const kittens = await readKittens();
  const index = kittens.findIndex((k) => k.id === id);
  if (index === -1) return;

  for (const f of formData.getAll("photos")) {
    if (f instanceof File) {
      const url = await saveUploadedImage(f, "kittens");
      if (url) kittens[index].photos.push(url);
    }
  }

  await writeKittens(kittens);
  revalidatePath("/", "layout");
}

export async function removeKittenPhoto(id: string, photoUrl: string) {
  const kittens = await readKittens();
  const index = kittens.findIndex((k) => k.id === id);
  if (index === -1) return;
  if (kittens[index].photos.length <= 1) return;

  kittens[index].photos = kittens[index].photos.filter((p) => p !== photoUrl);
  await writeKittens(kittens);
  await deleteUploadedImage(photoUrl);
  revalidatePath("/", "layout");
}
