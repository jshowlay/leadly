import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Leadly",
  description: "AI-powered lead generation for local niches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
