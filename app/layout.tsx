import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dentily",
  description: "Dentily helps dentists get more patients through targeted lead intelligence.",
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
