import { ImageResponse } from "next/og";
import { getToolBySlug } from "@/data/tools";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

type OgProps = {
  params: { slug: string };
};

export default function Image({ params }: OgProps) {
  const tool = getToolBySlug(params.slug);
  const title = tool?.title || "Tool";
  const description = tool?.description || siteConfig.description;

  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(120deg, #0b0d0f, #151821)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 48, fontWeight: 700, color: "#f4f4f0" }}>
          {title}
        </div>
        <div style={{ fontSize: 22, marginTop: 16, color: "#a7adb8" }}>
          {description}
        </div>
        <div style={{ fontSize: 18, marginTop: 28, color: "#ff7a4a" }}>
          {siteConfig.name}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
