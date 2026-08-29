"use client";

import { useRef, useState } from "react";

export default function PhotoPositionEditor({
  src,
  nameX,
  nameY,
  nameZoom,
  defaultX = 50,
  defaultY = 50,
  defaultZoom = 1,
  aspect = "1 / 1",
  shape = "square",
  className = "",
}: {
  src: string;
  nameX: string;
  nameY: string;
  nameZoom: string;
  defaultX?: number;
  defaultY?: number;
  defaultZoom?: number;
  aspect?: string;
  shape?: "square" | "circle";
  className?: string;
}) {
  const [x, setX] = useState(defaultX);
  const [y, setY] = useState(defaultY);
  const [zoom, setZoom] = useState(defaultZoom);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const clamp = (n: number) => Math.min(100, Math.max(0, n));

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function onPointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (!dragging.current) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const dx = ((e.movementX / rect.width) * 100) / zoom;
    const dy = ((e.movementY / rect.height) * 100) / zoom;
    setX((prev) => clamp(prev - dx));
    setY((prev) => clamp(prev - dy));
  }

  function onPointerUp(e: React.PointerEvent<HTMLDivElement>) {
    dragging.current = false;
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // pointer already released
    }
  }

  function reset() {
    setX(50);
    setY(50);
    setZoom(1);
  }

  return (
    <div className={`space-y-2 ${className}`}>
      <div
        ref={containerRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        style={{ aspectRatio: aspect }}
        className={`relative w-full overflow-hidden bg-slate-100 border border-slate-300 cursor-move touch-none select-none ${
          shape === "circle" ? "rounded-full" : "rounded-md"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt=""
          draggable={false}
          className="absolute inset-0 h-full w-full object-cover pointer-events-none"
          style={{
            objectPosition: `${x}% ${y}%`,
            transform: zoom !== 1 ? `scale(${zoom})` : undefined,
            transformOrigin: `${x}% ${y}%`,
          }}
        />
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] text-slate-400 shrink-0">Zoom</span>
        <input
          type="range"
          min={1}
          max={3}
          step={0.05}
          value={zoom}
          onChange={(e) => setZoom(Number(e.target.value))}
          className="flex-1 accent-slate-900"
        />
        <span className="text-[10px] text-slate-400 w-9 text-right shrink-0">
          {Math.round(zoom * 100)}%
        </span>
        <button
          type="button"
          onClick={reset}
          className="text-[10px] text-slate-400 underline hover:text-slate-600 shrink-0"
        >
          Réinitialiser
        </button>
      </div>
      <p className="text-[10px] text-slate-400">
        Glissez la photo pour la recadrer, utilisez le curseur pour zoomer.
      </p>

      <input type="hidden" name={nameX} value={Math.round(x)} readOnly />
      <input type="hidden" name={nameY} value={Math.round(y)} readOnly />
      <input type="hidden" name={nameZoom} value={zoom.toFixed(2)} readOnly />
    </div>
  );
}
