export const DEVELOPMENT_MILESTONES = [
  { label: "Naissance", days: 0 },
  { label: "2 semaines", days: 14 },
  { label: "4 semaines", days: 28 },
  { label: "6 semaines", days: 42 },
  { label: "8 semaines", days: 56 },
  { label: "12 semaines", days: 84 },
  { label: "Départ", days: 91 },
];

const TIMELINE_SPAN_DAYS = 91;

export function getDaysOld(birthDate: string): number {
  const diff = Date.now() - new Date(birthDate).getTime();
  return Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24)));
}

export function getDevelopmentProgress(daysOld: number): number {
  return Math.min(100, (daysOld / TIMELINE_SPAN_DAYS) * 100);
}

export function formatAge(daysOld: number): string {
  if (daysOld === 0) return "tout juste nés";
  const weeks = Math.floor(daysOld / 7);
  const days = daysOld % 7;
  const daysLabel = `${daysOld} jour${daysOld > 1 ? "s" : ""}`;
  if (weeks === 0) return daysLabel;
  const weeksLabel = `${weeks} semaine${weeks > 1 ? "s" : ""}`;
  if (days === 0) return weeksLabel;
  return `${weeksLabel} et ${days} jour${days > 1 ? "s" : ""}`;
}

export function getDevelopmentSentence(daysOld: number): string {
  const age = formatAge(daysOld);
  if (daysOld < 14) {
    return daysOld === 0
      ? "Les chatons viennent de naître : totalement dépendants de leur mère, ils ne se nourrissent que du lait maternel et ouvrent tout juste les yeux."
      : `Les chatons ont ${age} : totalement dépendants de leur mère, ils ne se nourrissent que du lait maternel et ouvrent tout juste les yeux.`;
  }
  if (daysOld < 28) {
    return `À ${age}, les chatons commencent à se déplacer et à découvrir leur environnement ; ils tètent encore exclusivement leur mère.`;
  }
  if (daysOld < 42) {
    return `À ${age}, le sevrage alimentaire débute progressivement avec l'introduction de pâtées humides, en complément du lait maternel.`;
  }
  if (daysOld < 56) {
    return `À ${age}, les chatons mangent seuls et le sevrage affectif commence : ils s'éloignent peu à peu de leur mère pour explorer et jouer.`;
  }
  if (daysOld < 84) {
    return `À ${age}, le sevrage alimentaire et affectif est terminé : les chatons sont autonomes, sociabilisés et pleinement joueurs.`;
  }
  return `À ${age}, les chatons sont sevrés, sociabilisés et prêts à rejoindre leur nouvelle famille.`;
}
