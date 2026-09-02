"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Logo from "./Logo";
import type { Kitten } from "@/lib/kittens";
import type { LitterStatus } from "@/lib/store";

type NavChild = { href: string; label: string };
type NavLink = { href: string; label: string; children?: NavChild[] };

const NAV_LINKS: NavLink[] = [
  { href: "/", label: "Accueil" },
  { href: "/presentation", label: "Présentation" },
  {
    href: "/chatons",
    label: "Nos Bengals",
    children: [
      { href: "/reproducteurs", label: "Reproducteurs" },
      { href: "/chatons", label: "Chatons disponibles" },
      { href: "/chatons#tarifs", label: "Tarifs" },
    ],
  },
  { href: "/galerie", label: "Galerie" },
  { href: "/documentation", label: "Documentation" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar({
  kittens,
  litterStatus,
}: {
  kittens: Kitten[];
  litterStatus: LitterStatus;
}) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownKittens =
    litterStatus.mode === "portee"
      ? kittens.filter((k) => k.status === "disponible").slice(0, 4)
      : litterStatus.mode === "aucune"
        ? [...kittens]
            .filter((k) => k.status === "vendu")
            .sort((a, b) => a.name.localeCompare(b.name))
            .slice(0, 4)
        : [];

  const dropdownHeader =
    litterStatus.mode === "portee"
      ? "Actuellement disponibles"
      : litterStatus.mode === "aucune"
        ? "Anciens chatons"
        : "Gestation en cours";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setDropdownOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? "bg-eden-cream/95 backdrop-blur shadow-[0_2px_20px_rgba(22,48,31,0.12)]"
          : "bg-eden-cream/70 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 flex items-center justify-between h-16 sm:h-20">
        <Link href="/" className="group">
          <Logo />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const hasChildren = !!link.children;
            const active =
              pathname === link.href ||
              (link.href !== "/" && pathname.startsWith(link.href)) ||
              (link.children?.some((c) => pathname.startsWith(c.href.split("#")[0])) ?? false);
            return (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => hasChildren && setDropdownOpen(true)}
                onMouseLeave={() => hasChildren && setDropdownOpen(false)}
              >
                <Link
                  href={link.href}
                  className={`relative px-3 py-2 text-sm tracking-wide transition-colors ${
                    active ? "text-eden-rust" : "text-eden-ink hover:text-eden-rust"
                  }`}
                >
                  {link.label}
                  <motion.span
                    className="absolute left-3 right-3 -bottom-0.5 h-[2px] bg-eden-gold origin-left"
                    initial={false}
                    animate={{ scaleX: active ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                  />
                </Link>

                <AnimatePresence>
                  {hasChildren && dropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-72"
                    >
                      <div className="rounded-xl border border-eden-gold/30 bg-eden-cream shadow-xl overflow-hidden">
                        <Link
                          href="/reproducteurs"
                          className="block px-4 py-3 text-sm font-semibold text-eden-ink border-b border-eden-gold/20 hover:bg-eden-gold/10 transition-colors"
                        >
                          Nos reproducteurs →
                        </Link>

                        <div className="px-4 py-2 text-[11px] uppercase tracking-widest text-eden-ink/60 bg-eden-cream-soft">
                          {dropdownHeader}
                        </div>
                        {litterStatus.mode === "gestation" ? (
                          <p className="px-4 py-3 text-sm text-eden-ink/70">
                            {litterStatus.gestationMessage ||
                              "Une nouvelle portée est en préparation !"}
                          </p>
                        ) : dropdownKittens.length > 0 ? (
                          <ul>
                            {dropdownKittens.map((k) => (
                              <li key={k.id}>
                                <Link
                                  href={`/chatons/${k.slug}`}
                                  className="flex items-center justify-between px-4 py-2.5 text-sm hover:bg-eden-gold/10 transition-colors"
                                >
                                  <span>{k.name}</span>
                                  <span className="text-xs text-eden-ink/50">
                                    {k.sex === "Mâle" ? "♂" : "♀"} · {k.coat.color.split(" ")[0]}
                                  </span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : (
                          <p className="px-4 py-3 text-sm text-eden-ink/50">
                            Aucun chaton à afficher pour le moment.
                          </p>
                        )}
                        <Link
                          href="/chatons"
                          className="block px-4 py-2.5 text-sm text-eden-rust font-medium border-t border-eden-gold/20 hover:bg-eden-gold/10 transition-colors"
                        >
                          {litterStatus.mode === "gestation"
                            ? "En savoir plus →"
                            : "Voir tous les chatons →"}
                        </Link>
                        <Link
                          href="/chatons#tarifs"
                          className="block px-4 py-2.5 text-sm text-eden-ink/70 border-t border-eden-gold/10 hover:bg-eden-gold/10 transition-colors"
                        >
                          Tarifs →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <button
          type="button"
          aria-label="Ouvrir le menu"
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
          className="lg:hidden relative w-9 h-9 flex flex-col items-center justify-center gap-1.5"
        >
          <motion.span
            animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-eden-ink"
          />
          <motion.span
            animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
            className="block w-6 h-[2px] bg-eden-ink"
          />
          <motion.span
            animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="block w-6 h-[2px] bg-eden-ink"
          />
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden overflow-hidden border-t border-eden-gold/20 bg-eden-cream"
          >
            <ul className="px-4 py-2">
              {NAV_LINKS.map((link) => {
                const active =
                  pathname === link.href ||
                  (link.children?.some((c) => pathname.startsWith(c.href.split("#")[0])) ?? false);
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={`block py-3 text-base ${active ? "text-eden-rust" : "text-eden-ink"}`}
                    >
                      {link.label}
                    </Link>
                    {link.children && (
                      <ul className="pl-4 pb-2 space-y-1">
                        {link.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              className="block py-1.5 text-sm text-eden-ink/70 hover:text-eden-rust"
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
