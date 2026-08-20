const ROSETTE_ANGLES = [0, 60, 120, 180, 240, 300];

function Rosette({ angle }: { angle: number }) {
  return (
    <g transform={`rotate(${angle} 60 60)`}>
      <g transform="translate(60 14)">
        <path
          d="M -7 6 C -9 -1 -4 -6 0 -6 C 4 -6 9 -1 7 6 C 6 11 -6 11 -7 6 Z"
          fill="none"
          stroke="var(--eden-rosette, #3a2416)"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="1.5" r="2.1" fill="var(--eden-rust, #a8552e)" />
      </g>
    </g>
  );
}

export default function Logo({
  className = "",
  showWordmark = true,
  monochrome = false,
}: {
  className?: string;
  showWordmark?: boolean;
  monochrome?: boolean;
}) {
  const ring = monochrome ? "currentColor" : "var(--eden-gold, #c69a45)";
  const center = monochrome ? "currentColor" : "var(--eden-green, #16301f)";
  const eye = monochrome ? "currentColor" : "var(--eden-gold-light, #e6c886)";

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <svg
        viewBox="0 0 120 120"
        width="48"
        height="48"
        role="img"
        aria-label="Logo l'Eden d'Aslo"
        className="shrink-0"
      >
        <circle
          cx="60"
          cy="60"
          r="57"
          fill={center}
          stroke={ring}
          strokeWidth="2"
        />
        {ROSETTE_ANGLES.map((a) => (
          <Rosette key={a} angle={a} />
        ))}
        {/* stylized feline almond eye at the center, doubling as a leaf/eden motif */}
        <path
          d="M 38 60 C 46 46 74 46 82 60 C 74 74 46 74 38 60 Z"
          fill="none"
          stroke={eye}
          strokeWidth="2.5"
        />
        <ellipse cx="60" cy="60" rx="5.5" ry="10" fill={eye} />
        <path
          d="M 60 40 C 62 48 62 72 60 80"
          fill="none"
          stroke={eye}
          strokeWidth="1"
          opacity="0.5"
        />
      </svg>
      {showWordmark && (
        <div className="leading-tight">
          <div className="font-heading text-lg sm:text-xl tracking-wide">
            l&apos;Eden d&apos;Aslo
          </div>
          <div className="text-[10px] sm:text-xs uppercase tracking-[0.25em] opacity-70">
            Chatterie de Bengals
          </div>
        </div>
      )}
    </div>
  );
}
