import { readBreeders } from "@/lib/store";

export type Breeder = {
  id: string;
  slug: string;
  name: string;
  sex: "Mâle" | "Femelle";
  role: "Reproductrice" | "Reproducteur";
  status: "actif" | "retraité";
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
};

export async function getBreederBySlug(slug: string): Promise<Breeder | undefined> {
  const breeders = await readBreeders();
  return breeders.find((b) => b.slug === slug);
}
