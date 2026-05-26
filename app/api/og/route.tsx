import { ImageResponse } from "next/og";

export const runtime = "edge";
export const contentType = "image/png";
export const size = { width: 1200, height: 630 };

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "Mental wellness for your cat";
  const eyebrow = searchParams.get("eyebrow") ?? "Mibbles";
  const category = searchParams.get("category");

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#FAFAF7",
          padding: "80px",
          position: "relative",
        }}
      >
        {/* Top label */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 14,
            textTransform: "uppercase",
            letterSpacing: 4,
            fontSize: 18,
            color: "#C9613F",
            fontWeight: 500,
          }}
        >
          <div
            style={{
              width: 40,
              height: 40,
              borderRadius: 10,
              backgroundColor: "#1A1A1A",
              color: "#FAFAF7",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 22,
              fontWeight: 700,
            }}
          >
            M
          </div>
          <span>{eyebrow}</span>
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            flex: 1,
            alignItems: "center",
            fontSize: 80,
            lineHeight: 1.05,
            color: "#1A1A1A",
            fontWeight: 600,
            letterSpacing: -2,
            marginTop: 40,
          }}
        >
          {title}
        </div>

        {/* Footer */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 22,
            color: "#5C5C5C",
          }}
        >
          <span>mibbles.app</span>
          {category && (
            <span
              style={{
                padding: "10px 22px",
                borderRadius: 999,
                backgroundColor: "#F6DDD3",
                color: "#A24A2C",
                fontSize: 18,
                fontWeight: 500,
              }}
            >
              {category}
            </span>
          )}
        </div>

        {/* Decorative dot */}
        <div
          style={{
            position: "absolute",
            top: 80,
            right: 80,
            width: 14,
            height: 14,
            borderRadius: 999,
            backgroundColor: "#E27D5F",
            display: "flex",
          }}
        />
      </div>
    ),
    { ...size }
  );
}
