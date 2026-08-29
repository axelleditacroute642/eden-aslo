"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhotoCarousel from "./PhotoCarousel";
import { getAgeLabel, type Kitten } from "@/lib/kittens";

const STATUS_STYLES: Record<Kitten["status"], string> = {
  disponible: "bg-eden-green text-eden-cream",
  réservé: "bg-eden-gold text-eden-ink",
  vendu: "bg-eden-ink/60 text-eden-cream",
};

export default function KittenCard({ kitten }: { kitten: Kitten }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group"
    >
      <Link
        href={`/chatons/${kitten.slug}`}
        className="block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border border-eden-gold/15"
      >
        <div className="relative">
          <PhotoCarousel photos={kitten.photos} label={kitten.name} rounded="" />
          <span
            className={`absolute top-3 left-3 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow ${STATUS_STYLES[kitten.status]}`}
          >
            {kitten.status}
          </span>
        </div>
        <div className="p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-heading text-xl">{kitten.name}</h3>
            <span className="text-xs text-eden-ink/50">
              {kitten.sex === "Mâle"
                ? "♂ Mâle"
                : kitten.sex === "Femelle"
                ? "♀ Femelle"
                : "Indéterminé"}
            </span>
          </div>
          <p className="mt-1 text-sm text-eden-ink/70">
            {kitten.coat.color} · {getAgeLabel(kitten.birthDate)}
          </p>
          <span className="mt-3 inline-block text-sm text-eden-rust font-medium group-hover:translate-x-1 transition-transform">
            Découvrir sa fiche →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
