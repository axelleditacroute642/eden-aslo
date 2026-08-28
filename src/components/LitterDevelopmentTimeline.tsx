import {
  DEVELOPMENT_MILESTONES,
  getDaysOld,
  getDevelopmentProgress,
  getDevelopmentSentence,
} from "@/lib/litter-development";

export default function LitterDevelopmentTimeline({ birthDate }: { birthDate: string }) {
  const daysOld = getDaysOld(birthDate);
  const progress = getDevelopmentProgress(daysOld);
  const sentence = getDevelopmentSentence(daysOld);

  return (
    <div className="rounded-xl border border-eden-gold/20 bg-white p-6 sm:p-8">
      <h2 className="font-heading text-xl mb-3">Évolution de la portée</h2>
      <p className="text-eden-ink/80 leading-relaxed mb-8">{sentence}</p>

      <div className="relative h-2 rounded-full bg-eden-gold/15">
        <div
          className="absolute inset-y-0 left-0 rounded-full bg-eden-rust transition-all"
          style={{ width: `${progress}%` }}
        />
        <div
          className="absolute -top-[7px] h-4 w-4 rounded-full bg-eden-rust border-2 border-white shadow"
          style={{ left: `calc(${progress}% - 8px)` }}
        />
      </div>

      <div className="mt-3 flex justify-between text-[11px] sm:text-xs text-eden-ink/50">
        {DEVELOPMENT_MILESTONES.map((m) => (
          <span key={m.label} className="text-center">
            {m.label}
          </span>
        ))}
      </div>
    </div>
  );
}
