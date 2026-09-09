import { ImageResponse } from "next/og";

import { SITE_NAME, SITE_TAGLINE } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0c10",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "#fafaf8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              fontWeight: 700,
              color: "#0a0c10",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 28, fontWeight: 600, color: "#fafaf8" }}>{SITE_NAME}</div>
        </div>
        <div style={{ marginTop: 48, fontSize: 56, fontWeight: 700, color: "#fafaf8", maxWidth: 900, lineHeight: 1.15 }}>
          Build digital products that move your business forward.
        </div>
        <div style={{ marginTop: 24, fontSize: 26, color: "#9aa2b2", maxWidth: 820 }}>
          {SITE_TAGLINE}
        </div>
      </div>
    ),
    { ...size }
  );
}
