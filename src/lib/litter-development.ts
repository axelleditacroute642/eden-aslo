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

export function getDevelopmentSentence(daysOld: number): string {
  if (daysOld < 14) {
    return "Les chatons viennent de naître : totalement dépendants de leur mère, ils ne se nourrissent que du lait maternel et ouvrent tout juste les yeux.";
  }
  if (daysOld < 28) {
    return "À deux semaines, les chatons commencent à se déplacer et à découvrir leur environnement ; ils tètent encore exclusivement leur mère.";
  }
  if (daysOld < 42) {
    return "Vers un mois, le sevrage alimentaire débute progressivement avec l'introduction de pâtées humides, en complément du lait maternel.";
  }
  if (daysOld < 56) {
    return "Vers six semaines, les chatons mangent seuls et le sevrage affectif commence : ils s'éloignent peu à peu de leur mère pour explorer et jouer.";
  }
  if (daysOld < 84) {
    return "Vers huit semaines, le sevrage alimentaire et affectif est terminé : les chatons sont autonomes, sociabilisés et pleinement joueurs.";
  }
  return "À partir de douze-treize semaines, les chatons sont sevrés, sociabilisés et prêts à rejoindre leur nouvelle famille.";
}
