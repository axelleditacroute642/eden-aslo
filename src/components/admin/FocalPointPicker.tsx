"use client";

import { useRef, useState } from "react";

export default function FocalPointPicker({
  src,
  nameX,
  nameY,
  defaultX = 50,
  defaultY = 50,
}: {
  src: string;
  nameX: string;
  nameY: string;
  defaultX?: number;
  defaultY?: number;
}) {
  const [pos, setPos] = useState({ x: defaultX, y: defaultY });
  const imgRef = useRef<HTMLImageElement>(null);

  function pick(e: React.MouseEvent<HTMLImageElement>) {
    const rect = imgRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(Math.min(100, Math.max(0, ((e.clientX - rect.left) / rect.width) * 100)));
    const y = Math.round(Math.min(100, Math.max(0, ((e.clientY - rect.top) / rect.height) * 100)));
    setPos({ x, y });
  }

  return (
    <div className="flex items-center gap-3">
      <div className="relative inline-block shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          ref={imgRef}
          src={src}
          alt=""
          onClick={pick}
          className="w-24 h-auto rounded-md border border-slate-300 cursor-crosshair select-none"
        />
        <div
          className="absolute h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-eden-gold shadow pointer-events-none"
          style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
        />
      </div>

      <div className="flex flex-col items-center gap-1 shrink-0">
        <div className="relative h-14 w-14 overflow-hidden rounded-full border border-slate-300 bg-slate-100">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: `${pos.x}% ${pos.y}%` }}
          />
        </div>
        <span className="text-center text-[10px] leading-tight text-slate-500">
          Cliquez sur la photo pour cadrer
        </span>
      </div>

      <input type="hidden" name={nameX} value={pos.x} readOnly />
      <input type="hidden" name={nameY} value={pos.y} readOnly />
    </div>
  );
}
