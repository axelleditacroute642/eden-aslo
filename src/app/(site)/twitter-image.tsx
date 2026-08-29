import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";
export const alt = "L'Eden d'Aslo — Chatterie de Bengals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const rosettes = Array.from({ length: 18 }).map((_, i) => {
  const col = i % 6;
  const row = Math.floor(i / 6);
  const jitterX = ((i * 47) % 90) - 45;
  const jitterY = ((i * 71) % 90) - 45;
  return {
    x: 30 + col * 200 + jitterX,
    y: 20 + row * 210 + jitterY,
    size: 28 + ((i * 17) % 34),
    green: i % 2 === 0,
  };
});

export default async function Image() {
  const logoData = await readFile(
    join(process.cwd(), "public/img/logo-complet-1024.png")
  );
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f6f1e2",
        }}
      >
        {rosettes.map((r, i) => (
          <div
            key={i}
            style={{
              position: "absolute",
              left: r.x,
              top: r.y,
              width: r.size,
              height: r.size,
              borderRadius: 9999,
              border: `${Math.max(3, Math.round(r.size / 8))}px solid ${
                r.green ? "rgba(44,92,58,0.11)" : "rgba(198,154,69,0.14)"
              }`,
            }}
          />
        ))}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={460} height={460} alt="" />
      </div>
    ),
    { ...size }
  );
}
