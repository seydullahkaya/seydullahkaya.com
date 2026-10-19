import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Tasarım tokenlarının OG görselindeki karşılıkları (Bölüm 4.2)
const color = {
  background: "#FAFAFA",
  foreground: "#0A0A0B",
  muted: "#6B6F76",
  border: "#E8E8EC",
  accent: "#3B5BFD",
  success: "#16A34A",
};

const fontsDir = join(process.cwd(), "assets", "fonts");
const fonts = Promise.all([
  readFile(join(fontsDir, "Geist-Regular.ttf")),
  readFile(join(fontsDir, "Geist-SemiBold.ttf")),
  readFile(join(fontsDir, "GeistMono-Medium.ttf")),
]);

/** Sitenin ortak paylaşım görseli: etiket, başlık ve kısa açıklama. */
export async function renderOgImage({
  eyebrow,
  title,
  description,
  badge,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  badge?: string;
}) {
  const [regular, semibold, mono] = await fonts;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: color.background,
        backgroundImage: `radial-gradient(circle at 85% 0%, rgba(59,91,253,0.14), transparent 45%), linear-gradient(${color.border} 1px, transparent 1px), linear-gradient(90deg, ${color.border} 1px, transparent 1px)`,
        backgroundSize: "100% 100%, 56px 56px, 56px 56px",
        fontFamily: "Geist",
        color: color.foreground,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 52,
            height: 52,
            borderRadius: 999,
            background: color.foreground,
            color: color.background,
            fontFamily: "Geist Mono",
            fontSize: 20,
          }}
        >
          SK
        </div>
        <div
          style={{ fontSize: 28, fontWeight: 600, letterSpacing: "-0.02em" }}
        >
          seydullahkaya.com
        </div>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            fontFamily: "Geist Mono",
            fontSize: 22,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: color.accent,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            marginTop: 20,
            fontSize: title.length > 48 ? 64 : 76,
            fontWeight: 600,
            lineHeight: 1.05,
            letterSpacing: "-0.04em",
            maxWidth: 1000,
          }}
        >
          {title}
        </div>
        {description && (
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              lineHeight: 1.45,
              color: color.muted,
              maxWidth: 940,
            }}
          >
            {description}
          </div>
        )}
      </div>

      {badge ? (
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: 999,
              background: color.success,
            }}
          />
          <div
            style={{
              fontFamily: "Geist Mono",
              fontSize: 20,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              color: color.muted,
            }}
          >
            {badge}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex" }} />
      )}
    </div>,
    {
      ...ogSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 500, style: "normal" },
      ],
    },
  );
}
