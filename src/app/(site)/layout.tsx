import type { Metadata } from "next";
import { Playfair_Display, Jost, Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { readKittens } from "@/lib/store";

export const dynamic = "force-dynamic";

const playfair = Playfair_Display({
  variable: "--font-heading-raw",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800", "900"],
});

const jost = Jost({
  variable: "--font-body-raw",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const montserrat = Montserrat({
  variable: "--font-mont-raw",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  title: "L'Eden d'Aslo — Chatterie de Bengals",
  description:
    "L'Eden d'Aslo, chatterie de Bengals : chatons disponibles, documentation officielle, galerie et contact.",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const kittens = await readKittens();
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${jost.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-eden-cream text-eden-ink">
        <Navbar kittens={kittens} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
