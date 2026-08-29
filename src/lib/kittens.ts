import { readKittens } from "@/lib/store";
import type { PhotoPosition } from "@/lib/photo";

export type { PhotoPosition };

export type Grandparent = {
  name: string;
  photoSeed: string;
  photoPosition?: PhotoPosition;
  pedigree: string;
};

export type Parent = {
  name: string;
  photoSeed: string;
  photoPosition?: PhotoPosition;
  pedigree: string;
  coat: string;
  parents: {
    father: Grandparent;
    mother: Grandparent;
  };
};

export type Kitten = {
  id: string;
  slug: string;
  name: string;
  sex: "Mâle" | "Femelle" | "Indéterminé";
  status: "disponible" | "réservé" | "vendu";
  birthDate: string;
  price: number;
  currency: string;
  coat: {
    color: string;
    pattern: string;
    eyeColor: string;
    description: string;
  };
  description: string;
  photos: string[];
  photoPositions?: Record<string, PhotoPosition>;
  parents: {
    father: Parent;
    mother: Parent;
  };
};

export async function getKittenBySlug(slug: string): Promise<Kitten | undefined> {
  const kittens = await readKittens();
  return kittens.find((k) => k.slug === slug);
}

export function getAgeLabel(birthDate: string): string {
  const birth = new Date(birthDate);
  const now = new Date();
  let months =
    (now.getFullYear() - birth.getFullYear()) * 12 +
    (now.getMonth() - birth.getMonth());
  if (now.getDate() < birth.getDate()) months -= 1;
  months = Math.max(0, months);

  if (months < 1) {
    const days = Math.max(
      0,
      Math.floor((now.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24))
    );
    return `${days} jour${days > 1 ? "s" : ""}`;
  }
  if (months < 12) {
    return `${months} mois`;
  }
  const years = Math.floor(months / 12);
  const rem = months % 12;
  return rem === 0
    ? `${years} an${years > 1 ? "s" : ""}`
    : `${years} an${years > 1 ? "s" : ""} et ${rem} mois`;
}

export function formatBirthDate(birthDate: string): string {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(birthDate));
}

export function formatPrice(price: number, currency: string): string {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(price);
}
