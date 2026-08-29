import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { buildBengalRosettesSvg } from "@/lib/bengal-rosettes-svg";

export const runtime = "nodejs";
export const alt = "L'Eden d'Aslo — Chatterie de Bengals";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const rosettesSvg = buildBengalRosettesSvg({ width: size.width, height: size.height });
const rosettesSrc = `data:image/svg+xml;base64,${Buffer.from(rosettesSvg).toString("base64")}`;

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
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={rosettesSrc}
          width={size.width}
          height={size.height}
          alt=""
          style={{ position: "absolute", inset: 0, opacity: 0.11 }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={460} height={460} alt="" style={{ position: "relative" }} />
      </div>
    ),
    { ...size }
  );
}
