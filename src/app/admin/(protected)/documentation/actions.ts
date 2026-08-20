"use server";

import { revalidatePath } from "next/cache";
import { readSite, writeSite } from "@/lib/store";
import { saveDocumentFile, deleteUploadedImage } from "@/lib/uploads";

export async function updateDocuments(formData: FormData) {
  const site = await readSite();

  for (const doc of site.documents) {
    doc.title = String(formData.get(`title-${doc.id}`) ?? doc.title);
    doc.description = String(formData.get(`description-${doc.id}`) ?? doc.description);

    const file = formData.get(`file-${doc.id}`);
    if (file instanceof File) {
      const oldUrl = doc.url;
      const url = await saveDocumentFile(file, doc.id);
      if (url) {
        doc.url = url;
        await deleteUploadedImage(oldUrl);
      }
    }
  }

  await writeSite(site);
  revalidatePath("/", "layout");
}
