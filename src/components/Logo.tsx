const LEAF =
  "M0 -5.5 C4.6 -1.5 4 3.4 0 5.5 C-4 3.4 -4.6 -1.5 0 -5.5 Z";

const MONT_STYLE = {
  fontFamily: "var(--font-mont-raw), Helvetica, Arial, sans-serif",
};

function FullMark({ dark }: { dark: boolean }) {
  const ring = dark ? "#D6AC55" : "#C08F2E";
  const initials = dark ? "#EDE7CE" : "#24422F";
  const leaves = dark ? "#7EAF88" : "#2E6B45";
  const bengal = dark ? "#D6AC55" : "#9C8A5C";

  return (
    <svg viewBox="0 0 100 100" role="img" aria-label="l'Eden d'Aslo" className="shrink-0">
      <title>l&apos;Eden d&apos;Aslo</title>
      <circle cx="50" cy="50" r="45" fill="none" stroke={ring} strokeWidth="2.2" />
      <circle cx="50" cy="50" r="39" fill="none" stroke={ring} strokeWidth="0.7" opacity="0.6" />
      <text
        x="50"
        y="55"
        textAnchor="middle"
        fontFamily="var(--font-heading-raw), Georgia, serif"
        fontSize="38"
        letterSpacing="1"
        fill={initials}
      >
        EA
      </text>
      <g fill={leaves}>
        <path d={LEAF} transform="translate(41.5,66.5) rotate(-34)" />
        <path d={LEAF} transform="translate(50,64.5)" />
        <path d={LEAF} transform="translate(58.5,66.5) rotate(34)" />
      </g>
      <text
        x="50"
        y="79"
        textAnchor="middle"
        style={MONT_STYLE}
        fontSize="7.5"
        letterSpacing="2.6"
        fill={bengal}
      >
        BENGAL
      </text>
    </svg>
  );
}

function HeaderMark({ dark }: { dark: boolean }) {
  const ring = dark ? "#D6AC55" : "#C08F2E";
  const initials = dark ? "#EDE7CE" : "#24422F";
  const leaves = dark ? "#7EAF88" : "#2E6B45";

  return (
    <svg viewBox="0 0 100 100" width="48" height="48" role="img" aria-label="l'Eden d'Aslo" className="shrink-0">
      <title>l&apos;Eden d&apos;Aslo</title>
      <circle cx="50" cy="50" r="45" fill="none" stroke={ring} strokeWidth="2.6" />
      <text
        x="50"
        y="56"
        textAnchor="middle"
        fontFamily="var(--font-heading-raw), Georgia, serif"
        fontSize="40"
        letterSpacing="1"
        fill={initials}
      >
        EA
      </text>
      <g fill={leaves}>
        <path d={LEAF} transform="translate(41.5,71) rotate(-34)" />
        <path d={LEAF} transform="translate(50,69)" />
        <path d={LEAF} transform="translate(58.5,71) rotate(34)" />
      </g>
    </svg>
  );
}

export default function Logo({
  className = "",
  variant = "header",
  dark = false,
  showWordmark = true,
}: {
  className?: string;
  variant?: "header" | "full";
  dark?: boolean;
  showWordmark?: boolean;
}) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {variant === "full" ? <FullMark dark={dark} /> : <HeaderMark dark={dark} />}
      {showWordmark && (
        <div className="leading-tight">
          <div
            className={`font-heading text-lg sm:text-xl tracking-wide ${
              dark ? "text-eden-gold-light" : ""
            }`}
          >
            L&apos;Eden d&apos;Aslo
          </div>
          <div
            className={`text-[10px] sm:text-xs uppercase tracking-[0.25em] ${
              dark ? "text-eden-cream/70" : "opacity-70"
            }`}
          >
            Chatterie de Bengals
          </div>
        </div>
      )}
    </div>
  );
}
