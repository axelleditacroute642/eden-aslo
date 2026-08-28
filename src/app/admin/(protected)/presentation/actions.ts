"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";

export async function updatePresentation(formData: FormData) {
  const site = await readSite();
  const intro = String(formData.get("intro") ?? "");

  const paragraphs = site.presentation.paragraphs.map((p, i) =>
    String(formData.get(`paragraph-${i}`) ?? p)
  );

  site.presentation = { intro, paragraphs };
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function addParagraph() {
  const site = await readSite();
  site.presentation.paragraphs.push("Nouveau paragraphe à compléter.");
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function removeParagraph(index: number) {
  const site = await readSite();
  site.presentation.paragraphs.splice(index, 1);
  await writeSite(site);
  revalidatePath("/", "layout");
}
