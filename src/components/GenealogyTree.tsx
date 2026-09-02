"use client";

import { useState } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import type { Kitten } from "@/lib/kittens";
import type { PhotoPosition } from "@/lib/photo";

type LightboxState = {
  photoSeed: string;
  photoPosition?: PhotoPosition;
  name: string;
};

function PersonNode({
  name,
  photoSeed,
  photoPosition,
  subtitle,
  size = "md",
  highlight = false,
  onOpen,
}: {
  name: string;
  photoSeed: string;
  photoPosition?: PhotoPosition;
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
  onOpen: (photo: LightboxState) => void;
}) {
  const dims =
    size === "lg"
      ? "w-20 h-20 sm:w-44 sm:h-44"
      : size === "md"
      ? "w-16 h-16 sm:w-36 sm:h-36"
      : "w-12 h-12 sm:w-28 sm:h-28";
  const outerWidth =
    size === "lg" ? "w-24 sm:w-44" : size === "md" ? "w-20 sm:w-36" : "w-14 sm:w-28";
  const textSize = size === "lg" ? "text-xs sm:text-base" : size === "md" ? "text-[10px] sm:text-sm" : "text-[9px] sm:text-xs";

  return (
    <div className={`flex flex-col items-center text-center ${outerWidth}`}>
      <button
        type="button"
        onClick={() => onOpen({ photoSeed, photoPosition, name })}
        aria-label={`Agrandir la photo de ${name}`}
        className="cursor-zoom-in"
      >
        <PlaceholderPhoto
          seed={photoSeed}
          position={photoPosition}
          rounded="rounded-full"
          className={`${dims} ring-2 ${highlight ? "ring-eden-gold" : "ring-eden-gold/30"} relative transition-transform duration-300 ease-out hover:z-10 hover:scale-150`}
        />
      </button>
      <span className={`mt-2 font-heading ${textSize} leading-tight`}>{name}</span>
      {subtitle && (
        <span className="text-[8px] sm:text-[10px] text-eden-ink/50 leading-tight">{subtitle}</span>
      )}
    </div>
  );
}

function Bracket() {
  return (
    <div className="flex flex-col items-center">
      <div className="h-4 w-2/3 border-t-2 border-eden-gold/40 rounded-t" />
      <div className="w-px h-3 bg-eden-gold/40" />
    </div>
  );
}

function Lightbox({ photo, onClose }: { photo: LightboxState; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-[100] bg-black/90 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <button
        type="button"
        aria-label="Fermer"
        onClick={onClose}
        className="absolute top-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
      >
        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M18 6 6 18M6 6l12 12" />
        </svg>
      </button>
      <div
        className="relative w-full max-w-lg aspect-square rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <PlaceholderPhoto
          seed={photo.photoSeed}
          position={photo.photoPosition}
          label={photo.name}
          rounded="rounded-2xl"
          className="w-full h-full"
        />
      </div>
    </div>
  );
}

export default function GenealogyTree({ kitten }: { kitten: Kitten }) {
  const { father, mother } = kitten.parents;
  const [lightbox, setLightbox] = useState<LightboxState | null>(null);

  return (
    <div className="overflow-x-auto">
      <div className="flex flex-col items-center gap-2 py-4 min-w-fit mx-auto">
        <div className="flex gap-3 sm:gap-16">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 sm:gap-4">
              <PersonNode
                name={father.parents.father.name}
                photoSeed={father.parents.father.photoSeed}
                photoPosition={father.parents.father.photoPosition}
                subtitle={father.parents.father.pedigree}
                size="sm"
                onOpen={setLightbox}
              />
              <PersonNode
                name={father.parents.mother.name}
                photoSeed={father.parents.mother.photoSeed}
                photoPosition={father.parents.mother.photoPosition}
                subtitle={father.parents.mother.pedigree}
                size="sm"
                onOpen={setLightbox}
              />
            </div>
            <Bracket />
            <PersonNode
              name={father.name}
              photoSeed={father.photoSeed}
              photoPosition={father.photoPosition}
              subtitle={father.pedigree}
              size="md"
              onOpen={setLightbox}
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-1 sm:gap-4">
              <PersonNode
                name={mother.parents.father.name}
                photoSeed={mother.parents.father.photoSeed}
                photoPosition={mother.parents.father.photoPosition}
                subtitle={mother.parents.father.pedigree}
                size="sm"
                onOpen={setLightbox}
              />
              <PersonNode
                name={mother.parents.mother.name}
                photoSeed={mother.parents.mother.photoSeed}
                photoPosition={mother.parents.mother.photoPosition}
                subtitle={mother.parents.mother.pedigree}
                size="sm"
                onOpen={setLightbox}
              />
            </div>
            <Bracket />
            <PersonNode
              name={mother.name}
              photoSeed={mother.photoSeed}
              photoPosition={mother.photoPosition}
              subtitle={mother.pedigree}
              size="md"
              onOpen={setLightbox}
            />
          </div>
        </div>

        <Bracket />

        <PersonNode
          name={kitten.name}
          photoSeed={kitten.photos[0]}
          subtitle="Chaton"
          size="lg"
          highlight
          onOpen={setLightbox}
        />
      </div>

      {lightbox && <Lightbox photo={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}
