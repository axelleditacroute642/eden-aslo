import path from "path";
import { randomUUID } from "crypto";
import { put, del } from "@vercel/blob";

const ALLOWED_IMAGE_EXT = new Set([".jpg", ".jpeg", ".png", ".webp", ".gif"]);

export async function saveUploadedImage(
  file: File | null | undefined,
  subdir: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const ext = path.extname(file.name).toLowerCase();
  if (!ALLOWED_IMAGE_EXT.has(ext) || !file.type.startsWith("image/")) return null;

  const blob = await put(`${subdir}/${randomUUID()}${ext}`, file, {
    access: "public",
  });

  return blob.url;
}

export async function deleteUploadedImage(url: string | null | undefined) {
  if (!url || !url.includes("blob.vercel-storage.com")) return;
  try {
    await del(url);
  } catch {
    // blob déjà absent, on ignore
  }
}

export async function saveDocumentFile(
  file: File | null | undefined,
  id: string
): Promise<string | null> {
  if (!file || file.size === 0) return null;
  const isPdf = file.type === "application/pdf" || file.name.toLowerCase().endsWith(".pdf");
  if (!isPdf) return null;

  const blob = await put(`documents/${id}-${randomUUID()}.pdf`, file, {
    access: "public",
  });
  return blob.url;
}
