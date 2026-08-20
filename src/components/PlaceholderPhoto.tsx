import Image from "next/image";

function hashSeed(seed: string) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h << 5) - h + seed.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

const TINTS = [
  ["#caa15a", "#7c5a2c"],
  ["#b97a4c", "#5c3a20"],
  ["#8a9a6f", "#3c4a2c"],
  ["#c98a5a", "#6a3f22"],
  ["#a68a52", "#4a3a1c"],
  ["#bd8f5d", "#59452a"],
] as const;

export default function PlaceholderPhoto({
  seed,
  label,
  className = "",
  rounded = "rounded-xl",
}: {
  seed: string;
  label?: string;
  className?: string;
  rounded?: string;
}) {
  if (seed?.startsWith("/uploads/") || seed?.startsWith("http")) {
    return (
      <div className={`relative overflow-hidden ${rounded} ${className}`}>
        <Image
          src={seed}
          alt={label ?? ""}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover"
        />
        {label && (
          <>
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/50 to-transparent" />
            <span className="absolute bottom-2 left-2 right-2 text-[11px] uppercase tracking-wider text-eden-cream/95 text-shadow-soft truncate">
              {label}
            </span>
          </>
        )}
      </div>
    );
  }

  const idx = hashSeed(seed) % TINTS.length;
  const [c1, c2] = TINTS[idx];

  return (
    <div
      className={`relative overflow-hidden bg-rosette-texture flex items-center justify-center ${rounded} ${className}`}
      style={{
        background: `linear-gradient(135deg, ${c1} 0%, ${c2} 100%)`,
      }}
    >
      <div className="absolute inset-0 bg-rosette-texture opacity-40" />
      <svg
        viewBox="0 0 64 64"
        className="relative w-10 h-10 sm:w-12 sm:h-12 opacity-80 drop-shadow"
        aria-hidden="true"
      >
        <path
          d="M32 44c-8 0-15-6-15-13 0-4 3-7 7-7 2 0 3 1 4 2 1-3 2-5 4-5s3 2 4 5c1-1 2-2 4-2 4 0 7 3 7 7 0 7-7 13-15 13Z"
          fill="#f6f1e2"
          opacity="0.9"
        />
        <circle cx="20" cy="18" r="5" fill="#f6f1e2" opacity="0.9" />
        <circle cx="44" cy="18" r="5" fill="#f6f1e2" opacity="0.9" />
        <circle cx="20" cy="18" r="2.4" fill={c2} />
        <circle cx="44" cy="18" r="2.4" fill={c2} />
      </svg>
      {label && (
        <span className="absolute bottom-2 left-2 right-2 text-[11px] uppercase tracking-wider text-eden-cream/85 text-shadow-soft truncate">
          {label}
        </span>
      )}
    </div>
  );
}
