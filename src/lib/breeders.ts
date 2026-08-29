import { readBreeders } from "@/lib/store";
import type { PhotoPosition } from "@/lib/photo";

export type Breeder = {
  id: string;
  slug: string;
  name: string;
  sex: "Mâle" | "Femelle";
  role: "Reproductrice" | "Reproducteur";
  status: "actif" | "retraité";
  ownership: "maison" | "externe";
  birthDate: string;
  pedigree: string;
  coat: {
    color: string;
    pattern: string;
    eyeColor: string;
    description: string;
  };
  description: string;
  photos: string[];
  photoPositions?: Record<string, PhotoPosition>;
};

export async function getBreederBySlug(slug: string): Promise<Breeder | undefined> {
  const breeders = await readBreeders();
  return breeders.find((b) => b.slug === slug);
}
