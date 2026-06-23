import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "AI Presentation",
  description: "Presenter-controlled 21-scene AI demonstration website."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  );
}
