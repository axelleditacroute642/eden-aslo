"use client";

import { useEffect, useState } from "react";

function getRemaining(dueDate: string) {
  const target = new Date(dueDate).getTime();
  const now = Date.now();
  const diff = Math.max(0, target - now);

  return {
    done: diff <= 0,
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default function GestationCountdown({ dueDate }: { dueDate: string }) {
  const [remaining, setRemaining] = useState(() => getRemaining(dueDate));

  useEffect(() => {
    const interval = setInterval(() => setRemaining(getRemaining(dueDate)), 1000);
    return () => clearInterval(interval);
  }, [dueDate]);

  if (remaining.done) {
    return (
      <p className="text-eden-green font-heading text-2xl">
        Les chatons sont arrivés ! 🐾
      </p>
    );
  }

  const units = [
    { label: "jours", value: remaining.days },
    { label: "heures", value: remaining.hours },
    { label: "minutes", value: remaining.minutes },
    { label: "secondes", value: remaining.seconds },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
      {units.map((unit) => (
        <div
          key={unit.label}
          className="min-w-[84px] rounded-xl bg-white border border-eden-gold/20 shadow-sm px-4 py-4 text-center"
        >
          <p className="font-heading text-3xl sm:text-4xl text-eden-green">
            {String(unit.value).padStart(2, "0")}
          </p>
          <p className="text-xs uppercase tracking-wider text-eden-ink/60 mt-1">
            {unit.label}
          </p>
        </div>
      ))}
    </div>
  );
}
