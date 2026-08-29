// Adapted from BengalRosettes.jsx (procedural Bengal-coat rosette pattern),
// stripped down to a pure string generator so it can be embedded as a
// data-URI <img> inside next/og's ImageResponse (which can't run React
// hooks or dangerouslySetInnerHTML).

export type BengalRosettesPalette = {
  center: string;
  outline: string;
  spot: string;
};

const DEFAULT_PALETTE: BengalRosettesPalette = {
  center: "#93591F",
  outline: "#291708",
  spot: "#201306",
};

function mulberry32(a: number) {
  let state = a >>> 0;
  return function () {
    state = (state + 0x6d2b79f5) >>> 0;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function rosette(
  cx: number,
  cy: number,
  r: number,
  rot: number,
  rnd: () => number,
  pal: BengalRosettesPalette
) {
  const parts = [
    `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${rot.toFixed(1)})">`,
  ];
  const crx = r * 0.6 * (0.85 + 0.3 * rnd());
  const cry = r * 0.5 * (0.85 + 0.3 * rnd());
  parts.push(
    `<ellipse rx="${crx.toFixed(1)}" ry="${cry.toFixed(1)}" fill="${pal.center}" opacity="0.92"/>`
  );
  const n = 6 + Math.floor(rnd() * 3);
  const a0 = -20 - rnd() * 50;
  const span = 255 + rnd() * 70;
  for (let i = 0; i < n; i++) {
    const a = ((a0 + (span * i) / (n - 1)) * Math.PI) / 180;
    const rr = r * (0.94 + 0.14 * rnd());
    const bx = Math.cos(a) * rr;
    const by = Math.sin(a) * rr * 0.88;
    const brx = r * 0.34 * (0.7 + 0.6 * rnd());
    const bry = r * 0.22 * (0.7 + 0.6 * rnd());
    const ba = (a * 180) / Math.PI + 90;
    parts.push(
      `<ellipse cx="${bx.toFixed(1)}" cy="${by.toFixed(1)}" rx="${brx.toFixed(1)}" ry="${bry.toFixed(1)}" fill="${pal.outline}" transform="rotate(${ba.toFixed(1)} ${bx.toFixed(1)} ${by.toFixed(1)})"/>`
    );
  }
  parts.push("</g>");
  return parts.join("");
}

function solidSpot(cx: number, cy: number, r: number, rot: number, pal: BengalRosettesPalette) {
  return `<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) rotate(${rot.toFixed(1)})"><ellipse rx="${r.toFixed(1)}" ry="${(r * 0.72).toFixed(1)}" fill="${pal.spot}"/></g>`;
}

function buildTile(tile: number, seed: number, density: number, pal: BengalRosettesPalette) {
  const rnd = mulberry32(seed);
  const nRos = Math.round(9 * density);
  const nSolid = Math.round(8 * density);
  const nFine = Math.round(16 * density);

  const ros: [number, number, number, number][] = [];
  for (let i = 0; i < nRos; i++) ros.push([rnd() * tile, rnd() * tile, 24 + rnd() * 18, rnd() * 360]);
  const solids: [number, number, number, number][] = [];
  for (let i = 0; i < nSolid; i++) solids.push([rnd() * tile, rnd() * tile, 7 + rnd() * 5, rnd() * 360]);
  const fines: [number, number, number, number][] = [];
  for (let i = 0; i < nFine; i++) fines.push([rnd() * tile, rnd() * tile, 2.5 + rnd() * 3, rnd() * 360]);

  const body: string[] = [];
  for (const dx of [-tile, 0, tile]) {
    for (const dy of [-tile, 0, tile]) {
      for (const [cx, cy, r, rot] of ros) {
        const rr = mulberry32(Math.floor(cx * 3 + cy * 7) + seed);
        body.push(rosette(cx + dx, cy + dy, r, rot, rr, pal));
      }
      for (const [cx, cy, r, rot] of solids) body.push(solidSpot(cx + dx, cy + dy, r, rot, pal));
      for (const [cx, cy, r, rot] of fines) body.push(solidSpot(cx + dx, cy + dy, r, rot, pal));
    }
  }
  return body.join("");
}

export function buildBengalRosettesSvg({
  width,
  height,
  seed = 11,
  tile = 220,
  density = 0.6,
  palette,
}: {
  width: number;
  height: number;
  seed?: number;
  tile?: number;
  density?: number;
  palette?: Partial<BengalRosettesPalette>;
}) {
  const pal = { ...DEFAULT_PALETTE, ...(palette || {}) };
  const body = buildTile(tile, seed, density, pal);

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <defs>
    <pattern id="ros" width="${tile}" height="${tile}" patternUnits="userSpaceOnUse">${body}</pattern>
  </defs>
  <rect width="100%" height="100%" fill="url(#ros)"/>
</svg>`;
}
