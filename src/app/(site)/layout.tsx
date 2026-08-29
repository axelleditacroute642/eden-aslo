import type { Metadata } from "next";
import { Playfair_Display, Jost, Montserrat } from "next/font/google";
import "../globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageTransition from "@/components/PageTransition";
import { readKittens, readLitterStatus } from "@/lib/store";

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

const title = "L'Eden d'Aslo — Chatterie de Bengals";
const description =
  "L'Eden d'Aslo, chatterie de Bengals : chatons disponibles, documentation officielle, galerie et contact.";

export const metadata: Metadata = {
  metadataBase: new URL("https://eden-aslo.vercel.app"),
  title,
  description,
  openGraph: {
    title,
    description,
    images: ["/img/logo-complet-1024.png"],
  },
  twitter: {
    card: "summary",
    title,
    description,
    images: ["/img/logo-complet-1024.png"],
  },
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const [kittens, litterStatus] = await Promise.all([readKittens(), readLitterStatus()]);
  return (
    <html
      lang="fr"
      className={`${playfair.variable} ${jost.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-eden-cream text-eden-ink">
        <Navbar kittens={kittens} litterStatus={litterStatus} />
        <main className="flex-1">
          <PageTransition>{children}</PageTransition>
        </main>
        <Footer />
      </body>
    </html>
  );
}
