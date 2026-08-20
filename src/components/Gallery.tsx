"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PlaceholderPhoto from "./PlaceholderPhoto";

export type Photo = {
  id: string;
  seed: string;
  caption: string;
  category: "actuel" | "ancien";
  type: "chat" | "chaton";
};

const FILTERS = [
  { key: "all", label: "Tous" },
  { key: "actuel", label: "Actuels" },
  { key: "ancien", label: "Anciens" },
] as const;

export default function Gallery({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["key"]>("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const filtered = useMemo(
    () => photos.filter((p) => filter === "all" || p.category === filter),
    [photos, filter]
  );

  const openPhoto = filtered && openIndex !== null ? filtered[openIndex] : null;

  const navigate = (dir: 1 | -1) => {
    if (openIndex === null) return;
    setOpenIndex((openIndex + dir + filtered.length) % filtered.length);
  };

  return (
    <div>
      <div className="flex gap-2 mb-8">
        {FILTERS.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-4 py-2 rounded-full text-sm transition-all ${
              filter === f.key
                ? "bg-eden-green text-eden-cream"
                : "bg-white border border-eden-gold/30 text-eden-ink/70 hover:border-eden-gold"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      <div className="columns-2 sm:columns-3 gap-4 [column-fill:_balance]">
        {filtered.map((p, i) => (
          <button
            key={p.id}
            onClick={() => setOpenIndex(i)}
            className="mb-4 block w-full group break-inside-avoid"
          >
            <div className="overflow-hidden rounded-lg">
              <div className="transition-transform duration-500 group-hover:scale-110">
                <PlaceholderPhoto
                  seed={p.seed}
                  rounded=""
                  className={i % 3 === 0 ? "aspect-[3/4]" : "aspect-square"}
                />
              </div>
            </div>
            <p className="mt-1.5 text-xs text-eden-ink/60 text-left">{p.caption}</p>
          </button>
        ))}
      </div>

      <AnimatePresence>
        {openPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-eden-ink/90 flex items-center justify-center p-4 sm:p-10"
            onClick={() => setOpenIndex(null)}
          >
            <button
              aria-label="Fermer"
              className="absolute top-5 right-5 text-eden-cream text-3xl leading-none hover:text-eden-gold"
              onClick={() => setOpenIndex(null)}
            >
              ×
            </button>

            <button
              aria-label="Photo précédente"
              onClick={(e) => {
                e.stopPropagation();
                navigate(-1);
              }}
              className="absolute left-3 sm:left-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-eden-cream/10 text-eden-cream hover:bg-eden-cream/20 flex items-center justify-center text-xl"
            >
              ‹
            </button>
            <button
              aria-label="Photo suivante"
              onClick={(e) => {
                e.stopPropagation();
                navigate(1);
              }}
              className="absolute right-3 sm:right-8 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-eden-cream/10 text-eden-cream hover:bg-eden-cream/20 flex items-center justify-center text-xl"
            >
              ›
            </button>

            <motion.div
              key={openPhoto.id}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="max-w-2xl w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <PlaceholderPhoto
                seed={openPhoto.seed}
                rounded="rounded-xl"
                className="aspect-[4/3] w-full shadow-2xl"
              />
              <p className="mt-4 text-center text-eden-cream/85 text-sm">
                {openPhoto.caption}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
