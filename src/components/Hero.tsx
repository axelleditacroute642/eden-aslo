"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import Logo from "./Logo";

export default function Hero({
  tagline,
  intro,
}: {
  tagline: string;
  intro: string;
}) {
  return (
    <section className="relative overflow-hidden bg-eden-green text-eden-cream border-b-2 border-eden-gold/40">
      <div className="absolute inset-0 bg-rosette-texture opacity-[0.15]" />
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at 50% -10%, rgba(198,154,69,0.35), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-5xl px-6 py-24 sm:py-32 text-center flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <Logo
            variant="full"
            dark
            showWordmark={false}
            className="[&_svg]:w-24 [&_svg]:h-24 sm:[&_svg]:w-32 sm:[&_svg]:h-32 justify-center mb-6"
          />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="font-heading text-4xl sm:text-6xl text-shadow-soft"
        >
          L&apos;Eden d&apos;Aslo
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-4 text-lg sm:text-xl text-eden-gold-light font-heading italic"
        >
          {tagline}
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.42 }}
          className="mt-6 max-w-2xl text-eden-cream/85 leading-relaxed"
        >
          {intro}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-4"
        >
          <Link
            href="/chatons"
            className="px-6 py-3 rounded-full bg-eden-gold text-eden-ink font-medium tracking-wide hover:bg-eden-gold-light hover:scale-105 transition-all shadow-lg"
          >
            Découvrir nos chatons
          </Link>
          <Link
            href="/contact"
            className="px-6 py-3 rounded-full border border-eden-cream/40 text-eden-cream hover:bg-eden-cream/10 hover:scale-105 transition-all"
          >
            Nous contacter
          </Link>
        </motion.div>
      </div>

      <div className="relative h-16 bg-gradient-to-b from-transparent to-eden-cream" />
    </section>
  );
}
