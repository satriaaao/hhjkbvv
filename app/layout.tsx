import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AIORBITLAB — AI Systems for Modern Business",
  description: "AI Agent, aplikasi custom, automasi, dashboard, OCR, dan integrasi untuk bisnis modern.",
  keywords: ["AI Agent", "Business Automation", "Custom Application", "Dashboard", "OCR", "AI Integration", "AIORBITLAB"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#090909",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id">
      <body>{children}</body>
    </html>
  );
}
