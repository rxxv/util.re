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
          background: "linear-gradient(120deg, #0b0d0f, #151821)",
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
        }}
      >
        <div style={{ fontSize: 56, fontWeight: 700, color: "#f4f4f0" }}>
          {siteConfig.name}
        </div>
        <div style={{ fontSize: 24, marginTop: 16, color: "#a7adb8" }}>
          {siteConfig.description}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
