import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { put } from "@vercel/blob";
import { writeSite, writeKittens, writeGallery } from "@/lib/store";
import siteFallback from "@/data/site.json";
import kittensFallback from "@/data/kittens.json";
import galleryFallback from "@/data/gallery.json";

// One-time endpoint to seed Redis/Blob storage from the repo's bundled JSON
// and placeholder documents. Protected by ADMIN_PASSWORD. Delete this route
// after running it once.
export async function POST(request: NextRequest) {
  const key = request.headers.get("x-seed-key");
  if (!key || key !== process.env.ADMIN_PASSWORD) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const site = JSON.parse(JSON.stringify(siteFallback));
  const origin = request.nextUrl.origin;

  const uploaded: string[] = [];
  for (const doc of site.documents) {
    const res = await fetch(`${origin}/documents/${doc.filename}`);
    if (!res.ok) continue;
    const buffer = Buffer.from(await res.arrayBuffer());
    const blob = await put(`documents/${doc.id}-seed.pdf`, buffer, {
      access: "public",
      contentType: "application/pdf",
    });
    doc.url = blob.url;
    uploaded.push(doc.filename);
  }

  await writeSite(site);
  await writeKittens(kittensFallback as never);
  await writeGallery(galleryFallback as never);

  return NextResponse.json({ ok: true, documentsUploaded: uploaded });
}
