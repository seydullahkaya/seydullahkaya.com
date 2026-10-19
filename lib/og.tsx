import "server-only";

import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

export const ogSize = { width: 1200, height: 630 };

// Tasarım tokenlarının OG görselindeki karşılıkları (Bölüm 4.2)
const color = {
  background: "#121A42",
  foreground: "#EEF0FF",
  muted: "#A3AACB",
  border: "#1F2547",
  accent: "#A78BFA",
  success: "#34D399",
};

// Uzay teması: yıldızlar + nebula (satori sadece gradyan destekler)
const stars =
  "radial-gradient(circle at 43% 21%, rgba(255,255,255,0.57) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 11% 70%, rgba(255,255,255,0.4) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 9% 66%, rgba(255,255,255,0.47) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 57% 55%, rgba(255,255,255,0.39) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 72% 56%, rgba(255,255,255,0.38) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 17% 30%, rgba(255,255,255,0.7) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 9% 75%, rgba(255,255,255,0.67) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 30% 7%, rgba(255,255,255,0.66) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 39% 55%, rgba(255,255,255,0.43) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 75% 41%, rgba(255,255,255,0.66) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 25% 15%, rgba(255,255,255,0.67) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 26% 49%, rgba(255,255,255,0.4) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 10% 74%, rgba(255,255,255,0.38) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 65% 89%, rgba(255,255,255,0.64) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 61% 76%, rgba(255,255,255,0.86) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 40% 33%, rgba(255,255,255,0.79) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 33% 12%, rgba(255,255,255,0.67) 0, rgba(255,255,255,0) 2px), radial-gradient(circle at 65% 45%, rgba(255,255,255,0.75) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 79% 11%, rgba(255,255,255,0.41) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 23% 98%, rgba(255,255,255,0.54) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 55% 7%, rgba(255,255,255,0.88) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 73% 75%, rgba(255,255,255,0.78) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 45% 90%, rgba(255,255,255,0.54) 0, rgba(255,255,255,0) 1px), radial-gradient(circle at 76% 60%, rgba(255,255,255,0.39) 0, rgba(255,255,255,0) 1px)";

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
        backgroundImage: `${stars}, radial-gradient(circle at 85% 0%, rgba(124,58,237,0.45), transparent 50%), radial-gradient(circle at 10% 100%, rgba(34,211,238,0.18), transparent 45%), radial-gradient(circle at 60% 120%, rgba(192,38,211,0.25), transparent 50%)`,
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
