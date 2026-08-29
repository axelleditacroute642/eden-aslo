import PlaceholderPhoto from "./PlaceholderPhoto";
import type { Kitten } from "@/lib/kittens";

function PersonNode({
  name,
  photoSeed,
  photoPosition,
  subtitle,
  size = "md",
  highlight = false,
}: {
  name: string;
  photoSeed: string;
  photoPosition?: { x: number; y: number };
  subtitle?: string;
  size?: "sm" | "md" | "lg";
  highlight?: boolean;
}) {
  const dims =
    size === "lg"
      ? "w-36 h-36 sm:w-44 sm:h-44"
      : size === "md"
      ? "w-28 h-28 sm:w-36 sm:h-36"
      : "w-24 h-24 sm:w-28 sm:h-28";
  const textSize = size === "lg" ? "text-base" : size === "md" ? "text-sm" : "text-xs";

  return (
    <div className="flex flex-col items-center text-center w-36 sm:w-44">
      <PlaceholderPhoto
        seed={photoSeed}
        position={photoPosition}
        rounded="rounded-full"
        className={`${dims} ring-2 ${highlight ? "ring-eden-gold" : "ring-eden-gold/30"}`}
      />
      <span className={`mt-2 font-heading ${textSize} leading-tight`}>{name}</span>
      {subtitle && (
        <span className="text-[10px] text-eden-ink/50 leading-tight">{subtitle}</span>
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

export default function GenealogyTree({ kitten }: { kitten: Kitten }) {
  const { father, mother } = kitten.parents;

  return (
    <div className="overflow-x-auto">
      <div className="min-w-[960px] flex flex-col items-center gap-2 py-4">
        <div className="flex gap-10 sm:gap-16">
          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <PersonNode
                name={father.parents.father.name}
                photoSeed={father.parents.father.photoSeed}
                photoPosition={father.parents.father.photoPosition}
                subtitle={father.parents.father.pedigree}
                size="sm"
              />
              <PersonNode
                name={father.parents.mother.name}
                photoSeed={father.parents.mother.photoSeed}
                photoPosition={father.parents.mother.photoPosition}
                subtitle={father.parents.mother.pedigree}
                size="sm"
              />
            </div>
            <Bracket />
            <PersonNode
              name={father.name}
              photoSeed={father.photoSeed}
              photoPosition={father.photoPosition}
              subtitle={father.pedigree}
              size="md"
            />
          </div>

          <div className="flex flex-col items-center gap-2">
            <div className="flex gap-4">
              <PersonNode
                name={mother.parents.father.name}
                photoSeed={mother.parents.father.photoSeed}
                photoPosition={mother.parents.father.photoPosition}
                subtitle={mother.parents.father.pedigree}
                size="sm"
              />
              <PersonNode
                name={mother.parents.mother.name}
                photoSeed={mother.parents.mother.photoSeed}
                photoPosition={mother.parents.mother.photoPosition}
                subtitle={mother.parents.mother.pedigree}
                size="sm"
              />
            </div>
            <Bracket />
            <PersonNode
              name={mother.name}
              photoSeed={mother.photoSeed}
              photoPosition={mother.photoPosition}
              subtitle={mother.pedigree}
              size="md"
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
        />
      </div>
    </div>
  );
}
