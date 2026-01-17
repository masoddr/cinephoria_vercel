import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cinephoria - Séances de cinéma à Paris et Toulouse",
  description: "Découvrez les séances de cinéma du jour à Paris et Toulouse",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
