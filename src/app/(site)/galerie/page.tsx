import type { Metadata } from "next";
import AnimatedSection from "@/components/AnimatedSection";
import Gallery, { type Photo } from "@/components/Gallery";
import { readGallery } from "@/lib/store";

export const metadata: Metadata = { title: "Galerie — l'Eden d'Aslo" };

export default async function GaleriePage() {
  const galleryData = await readGallery();
  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      <AnimatedSection>
        <h1 className="font-heading text-4xl mb-3">Galerie</h1>
        <p className="text-eden-ink/70 max-w-2xl mb-10">
          Une exposition de nos chats et chatons, passés et actuels — cliquez
          sur une photo pour l&apos;agrandir.
        </p>
      </AnimatedSection>

      <Gallery photos={galleryData as Photo[]} />
    </div>
  );
}
