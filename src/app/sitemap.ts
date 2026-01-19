import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { siteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = tools.map((tool) => ({
    url: new URL(`/tools/${tool.slug}`, siteUrl).toString(),
    lastModified: new Date(),
  }));

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
    },
    ...toolEntries,
  ];
}
