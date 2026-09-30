import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Scarabelot Implementos",
  description: "Engenharia, robustez e soluções para o campo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
