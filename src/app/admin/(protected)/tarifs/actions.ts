"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";

export async function updateTarifs(formData: FormData) {
  const site = await readSite();
  const intro = String(formData.get("intro") ?? "");
  const priceRange = String(formData.get("priceRange") ?? "");
  const notes = String(formData.get("notes") ?? "");

  const includes = site.pricing.includes.map((item, i) =>
    String(formData.get(`include-${i}`) ?? item)
  );

  site.pricing = { intro, priceRange, includes, notes };
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function addInclude() {
  const site = await readSite();
  site.pricing.includes.push("Nouvel élément inclus");
  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function removeInclude(index: number) {
  const site = await readSite();
  site.pricing.includes.splice(index, 1);
  await writeSite(site);
  revalidatePath("/", "layout");
}
