import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#0a0c10",
          borderRadius: 14,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <span style={{ color: "#fafaf8", fontSize: 34, fontWeight: 700, fontFamily: "sans-serif" }}>
          S
        </span>
        <span
          style={{
            position: "absolute",
            top: 6,
            right: 6,
            width: 12,
            height: 12,
            borderRadius: 999,
            background: "#3355ff",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
