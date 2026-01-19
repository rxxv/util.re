import type { MetadataRoute } from "next";
import { tools } from "@/data/tools";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const toolEntries = tools.map((tool) => ({
    url: `${siteConfig.url}/tools/${tool.slug}`,
    lastModified: new Date(),
  }));

  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
    },
    ...toolEntries,
  ];
}
