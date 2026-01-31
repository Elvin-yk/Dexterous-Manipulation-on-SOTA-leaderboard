import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Dexterous Manipulation SOTA Leaderboard",
  description: "Track state-of-the-art dexterous hand manipulation across Adroit, DexArt, and Bi-DexHands."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-body text-ink">
        {children}
      </body>
    </html>
  );
}
