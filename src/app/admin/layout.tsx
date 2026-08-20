import type { Metadata } from "next";
import "../globals.css";

export const metadata: Metadata = {
  title: "Espace admin — l'Eden d'Aslo",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full bg-slate-100 text-slate-900">{children}</body>
    </html>
  );
}
