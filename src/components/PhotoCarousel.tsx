"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import PlaceholderPhoto from "./PlaceholderPhoto";
import type { PhotoPosition } from "@/lib/photo";

export default function PhotoCarousel({
  photos,
  positions,
  label,
  className = "",
  rounded = "rounded-xl",
  aspect = "aspect-[4/3]",
}: {
  photos: string[];
  positions?: Record<string, PhotoPosition>;
  label?: string;
  className?: string;
  rounded?: string;
  aspect?: string;
}) {
  const [index, setIndex] = useState(0);

  const go = (dir: 1 | -1, e?: React.MouseEvent) => {
    e?.preventDefault();
    e?.stopPropagation();
    setIndex((i) => (i + dir + photos.length) % photos.length);
  };

  return (
    <div
      className={`relative ${aspect} ${rounded} overflow-hidden group/carousel ${className}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={photos[index]}
          initial={{ opacity: 0, scale: 1.03 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
        >
          <PlaceholderPhoto
            seed={photos[index]}
            position={positions?.[photos[index]]}
            label={label}
            className="w-full h-full"
            rounded=""
          />
        </motion.div>
      </AnimatePresence>

      {photos.length > 1 && (
        <>
          <button
            type="button"
            aria-label="Photo précédente"
            onClick={(e) => go(-1, e)}
            className="absolute left-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eden-ink/40 text-eden-cream opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center justify-center hover:bg-eden-ink/60"
          >
            ‹
          </button>
          <button
            type="button"
            aria-label="Photo suivante"
            onClick={(e) => go(1, e)}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-eden-ink/40 text-eden-cream opacity-0 group-hover/carousel:opacity-100 transition-opacity flex items-center justify-center hover:bg-eden-ink/60"
          >
            ›
          </button>
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5">
            {photos.map((p, i) => (
              <button
                key={p}
                type="button"
                aria-label={`Aller à la photo ${i + 1}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  setIndex(i);
                }}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-eden-cream w-4" : "bg-eden-cream/50"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
