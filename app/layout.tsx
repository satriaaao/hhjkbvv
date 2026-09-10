import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIORBITLAB — Build Smarter with AI",
  description: "AI Agent, aplikasi AI custom, automasi bisnis, dan integrasi sistem untuk bisnis modern.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
