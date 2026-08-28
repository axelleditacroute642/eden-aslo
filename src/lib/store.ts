import { Redis } from "@upstash/redis";
import type { Kitten } from "@/lib/kittens";
import type { Breeder } from "@/lib/breeders";
import type { Photo } from "@/components/Gallery";
import siteFallback from "@/data/site.json";
import kittensFallback from "@/data/kittens.json";
import galleryFallback from "@/data/gallery.json";
import litterStatusFallback from "@/data/litter-status.json";
import breedersFallback from "@/data/breeders.json";

export type SiteData = {
  _readme: string;
  home: {
    tagline: string;
    intro: string;
    highlights: { title: string; text: string }[];
  };
  presentation: {
    intro: string;
    paragraphs: string[];
  };
  pricing: {
    intro: string;
    priceRange: string;
    includes: string[];
    notes: string;
  };
  documents: {
    id: string;
    title: string;
    description: string;
    filename: string;
    url?: string;
  }[];
  contact: {
    catteryName: string;
    address: string;
    postalCode: string;
    city: string;
    country: string;
    phone: string;
    email: string;
    hours: string;
    socials: {
      instagram: string;
      facebook: string;
    };
  };
};

export type LitterStatus = {
  mode: "portee" | "gestation" | "aucune";
  gestationDueDate: string;
  gestationMessage: string;
  litterBirthDate: string;
};

const redis =
  process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
    ? new Redis({
        url: process.env.KV_REST_API_URL,
        token: process.env.KV_REST_API_TOKEN,
      })
    : null;

async function readKey<T>(key: string, fallback: T): Promise<T> {
  if (!redis) return fallback;
  try {
    return (await redis.get<T>(key)) ?? fallback;
  } catch {
    return fallback;
  }
}

function writeKey(key: string, data: unknown) {
  if (!redis) {
    throw new Error(
      "Redis n'est pas configuré (KV_REST_API_URL / KV_REST_API_TOKEN manquants) — impossible d'enregistrer."
    );
  }
  return redis.set(key, data);
}

export function readSite(): Promise<SiteData> {
  return readKey("site.json", siteFallback as SiteData);
}

export function writeSite(data: SiteData) {
  return writeKey("site.json", data);
}

export function readKittens(): Promise<Kitten[]> {
  return readKey("kittens.json", kittensFallback as Kitten[]);
}

export function writeKittens(data: Kitten[]) {
  return writeKey("kittens.json", data);
}

export function readGallery(): Promise<Photo[]> {
  return readKey("gallery.json", galleryFallback as Photo[]);
}

export function writeGallery(data: Photo[]) {
  return writeKey("gallery.json", data);
}

export function readLitterStatus(): Promise<LitterStatus> {
  return readKey("litter-status.json", litterStatusFallback as LitterStatus);
}

export function writeLitterStatus(data: LitterStatus) {
  return writeKey("litter-status.json", data);
}

export function readBreeders(): Promise<Breeder[]> {
  return readKey("breeders.json", breedersFallback as Breeder[]);
}

export function writeBreeders(data: Breeder[]) {
  return writeKey("breeders.json", data);
}
