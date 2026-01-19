import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const runtime = "edge";

export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(120deg, #fff4e5, #e6f4ff)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: "#111111" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 24, marginTop: 16, color: "#444444" }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
