"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";

export async function updateHome(formData: FormData) {
  const site = await readSite();
  const tagline = String(formData.get("tagline") ?? "");
  const intro = String(formData.get("intro") ?? "");

  const highlights = site.home.highlights.map((h, i) => ({
    title: String(formData.get(`highlight-title-${i}`) ?? h.title),
    text: String(formData.get(`highlight-text-${i}`) ?? h.text),
  }));

  site.home = { tagline, intro, highlights };
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function addHighlight() {
  const site = await readSite();
  site.home.highlights.push({ title: "Nouveau point fort", text: "" });
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function removeHighlight(index: number) {
  const site = await readSite();
  site.home.highlights.splice(index, 1);
  await writeSite(site);
  revalidatePath("/", "layout");
}
