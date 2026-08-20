// One-time script: pushes the current local JSON content into Redis and
// uploads the placeholder documentation PDFs to Vercel Blob.
//
// Run locally with the target environment's real KV_REST_API_URL /
// KV_REST_API_TOKEN / BLOB_READ_WRITE_TOKEN set (e.g. via `vercel env pull`
// into .env.local, or by exporting them manually), then:
//
//   node --env-file=.env.local scripts/seed-storage.mjs

import { readFile } from "node:fs/promises";
import path from "node:path";
import { Redis } from "@upstash/redis";
import { put } from "@vercel/blob";

const ROOT = process.cwd();

function requireEnv(name) {
  const value = process.env[name];
  if (!value) {
    console.error(`Missing required env var: ${name}`);
    process.exit(1);
  }
  return value;
}

async function main() {
  const redis = new Redis({
    url: requireEnv("KV_REST_API_URL"),
    token: requireEnv("KV_REST_API_TOKEN"),
  });
  requireEnv("BLOB_READ_WRITE_TOKEN");

  const site = JSON.parse(
    await readFile(path.join(ROOT, "src/data/site.json"), "utf-8")
  );
  const kittens = JSON.parse(
    await readFile(path.join(ROOT, "src/data/kittens.json"), "utf-8")
  );
  const gallery = JSON.parse(
    await readFile(path.join(ROOT, "src/data/gallery.json"), "utf-8")
  );

  console.log("Uploading documentation PDFs to Vercel Blob...");
  for (const doc of site.documents) {
    const filePath = path.join(ROOT, "public/documents", doc.filename);
    const buffer = await readFile(filePath);
    const blob = await put(`documents/${doc.id}-seed.pdf`, buffer, {
      access: "public",
      contentType: "application/pdf",
    });
    doc.url = blob.url;
    console.log(`  ${doc.filename} -> ${blob.url}`);
  }

  console.log("Writing site.json / kittens.json / gallery.json to Redis...");
  await redis.set("site.json", site);
  await redis.set("kittens.json", kittens);
  await redis.set("gallery.json", gallery);

  console.log("Done. Storage seeded.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
