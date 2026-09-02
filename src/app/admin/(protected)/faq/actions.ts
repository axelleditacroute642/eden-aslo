"use server";

import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";

export async function addFaqItem(formData: FormData) {
  const site = await readSite();
  const question = String(formData.get("question") ?? "").trim();
  const answer = String(formData.get("answer") ?? "").trim();
  if (!question) return;

  site.faq.push({ id: randomUUID(), question, answer });

  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function updateFaqItem(id: string, formData: FormData) {
  const site = await readSite();
  const item = site.faq.find((f) => f.id === id);
  if (!item) return;

  item.question = String(formData.get("question") ?? item.question);
  item.answer = String(formData.get("answer") ?? item.answer);

  await writeSite(site);
  revalidatePath("/", "layout");
}

export async function deleteFaqItem(id: string) {
  const site = await readSite();
  site.faq = site.faq.filter((f) => f.id !== id);

  await writeSite(site);
  revalidatePath("/", "layout");
}
