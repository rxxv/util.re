import type { Metadata } from "next";
import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import { categories, sortedTools } from "@/data/tools";
import { siteConfig, siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Privacy-first tools`,
  description:
    "Handmade, privacy-first tools that run locally in your browser. No logins, no tracking, just fast utilities.",
  alternates: {
    canonical: siteUrl,
  },
  openGraph: {
    title: `${siteConfig.name} — Privacy-first tools`,
    description:
      "Handmade, privacy-first tools that run locally in your browser. No logins, no tracking, just fast utilities.",
    url: siteUrl,
    images: [
      {
        url: new URL("/opengraph-image", siteUrl).toString(),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — Privacy-first tools`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — Privacy-first tools`,
    description:
      "Handmade, privacy-first tools that run locally in your browser. No logins, no tracking, just fast utilities.",
    images: [new URL("/opengraph-image", siteUrl).toString()],
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeClient tools={sortedTools} categories={categories} />
    </Suspense>
  );
}
