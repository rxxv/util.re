import type { Metadata } from "next";
import { Suspense } from "react";
import HomeClient from "@/components/HomeClient";
import { categories, sortedTools } from "@/data/tools";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: siteConfig.name,
  description: siteConfig.description,
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    url: siteConfig.url,
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
  },
};

export default function HomePage() {
  return (
    <Suspense fallback={null}>
      <HomeClient tools={sortedTools} categories={categories} />
    </Suspense>
  );
}
