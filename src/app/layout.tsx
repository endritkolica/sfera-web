import type { Metadata } from "next";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Sfera Digital — Architects of Identity",
  description:
    "Merging graphic design precision with network-grade engineering to build digital ecosystems that endure. Swiss minimalism meets high-end engineering.",
  keywords: [
    "web development",
    "digital agency",
    "branding",
    "network security",
    "Next.js",
    "UI/UX design",
  ],
  openGraph: {
    title: "Sfera Digital — Architects of Identity",
    description:
      "Merging graphic design precision with network-grade engineering to build digital ecosystems that endure.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        <SiteChrome />
        {children}
      </body>
    </html>
  );
}
