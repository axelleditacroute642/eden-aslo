"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import PhotoCarousel from "./PhotoCarousel";
import { getAgeLabel } from "@/lib/kittens";
import type { Breeder } from "@/lib/breeders";

export default function BreederCard({ breeder }: { breeder: Breeder }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="group"
    >
      <Link
        href={`/reproducteurs/${breeder.slug}`}
        className="block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-xl transition-shadow duration-300 border border-eden-gold/15"
      >
        <div className="relative">
          <PhotoCarousel photos={breeder.photos} label={breeder.name} rounded="" />
          {breeder.status === "retraité" && (
            <span className="absolute top-3 left-3 text-[11px] uppercase tracking-wider px-2.5 py-1 rounded-full shadow bg-eden-ink/60 text-eden-cream">
              Retraité(e)
            </span>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-baseline justify-between">
            <h3 className="font-heading text-xl">{breeder.name}</h3>
            <span className="text-xs text-eden-ink/50">
              {breeder.sex === "Mâle" ? "♂ Mâle" : "♀ Femelle"}
            </span>
          </div>
          <p className="mt-1 text-sm text-eden-ink/70">
            {breeder.role} · {breeder.coat.color} · {getAgeLabel(breeder.birthDate)}
          </p>
          <span className="mt-3 inline-block text-sm text-eden-rust font-medium group-hover:translate-x-1 transition-transform">
            Découvrir sa fiche →
          </span>
        </div>
      </Link>
    </motion.div>
  );
}
