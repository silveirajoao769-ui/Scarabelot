import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Football Agent",
  description: "Jogo de carreira, negócios e gestão no futebol.",
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
