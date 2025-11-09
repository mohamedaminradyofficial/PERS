import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Pitch Builder - Professional TV & Film Pitch Creation",
  description: "Create professional TV Series Bibles, Film Lookbooks, and Pitch Decks with industry-standard templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
