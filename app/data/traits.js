/* ============================================================================
   BERATUNG – Merkmale und Empfehlungslogik
   Bewusst regelbasiert und nachvollziehbar: Das Ergebnis muss im Kundengespräch
   erklärbar sein. Kein verstecktes Modell, keine Gewichte ohne Begründung.
   ========================================================================== */

export const TRAITS = [
  { key: 'innovativ',    label: 'Innovativ',    hint: 'Die Marke soll vorne wirken, nicht etabliert.' },
  { key: 'premium',      label: 'Premium',      hint: 'Der Preis liegt über dem Marktdurchschnitt.' },
  { key: 'vertrauen',    label: 'Vertrauenswürdig', hint: 'Die Entscheidung ist riskant oder teuer.' },
  { key: 'jung',         label: 'Jung',         hint: 'Das Publikum ist digital sozialisiert.' },
  { key: 'technisch',    label: 'Technisch',    hint: 'Gekauft wird von Fachleuten, nicht von Laien.' },
  { key: 'minimal',      label: 'Minimal',      hint: 'Weniger Fläche, weniger Aussagen, mehr Ruhe.' },
  { key: 'mutig',        label: 'Mutig',        hint: 'Auffallen ist wichtiger als gefallen.' },
  { key: 'emotional',    label: 'Emotional',    hint: 'Die Entscheidung fällt im Bauch, nicht in der Tabelle.' },
  { key: 'serios',       label: 'Seriös',       hint: 'Konservatives Umfeld, formale Erwartung.' },
  { key: 'experimentell',label: 'Experimentell',hint: 'Die Website darf selbst die Arbeitsprobe sein.' }
];

export const TRAIT_BY_KEY = Object.fromEntries(TRAITS.map(t => [t.key, t]));

/* Bekannte Spannungen. Werden nicht verboten, aber benannt – genau das ist der
   Wert im Beratungsgespräch. */
export const TENSIONS = [
  { a: 'serios',    b: 'experimentell', note: 'Seriosität und Experiment ziehen gegeneinander. Wir zeigen Ihnen die Richtungen, die beides noch tragen – und was der Kompromiss kostet.' },
  { a: 'minimal',   b: 'technisch',     note: 'Minimal und technisch heißt: wenig Fläche für viel Information. Die Auswahl priorisiert Richtungen mit hoher Dichte bei ruhiger Anmutung.' },
  { a: 'premium',   b: 'jung',          note: 'Premium und jung schließen sich nicht aus, verlangen aber Präzision: teuer wirken ohne steif zu wirken.' },
  { a: 'vertrauen', b: 'mutig',         note: 'Vertrauen entsteht durch Erwartbarkeit, Mut durch Bruch. Beides gleichzeitig gelingt nur, wenn der Bruch dosiert bleibt.' }
];

/**
 * Empfehlung berechnen.
 * Punkte = Summe der Affinitäten (0–3) über alle gewählten Merkmale,
 * normiert auf das theoretische Maximum. Transparent und im Gespräch erklärbar.
 * @param {string[]} selected  gewählte Merkmals-Keys
 * @param {object[]} directions
 * @returns {{dir:object, score:number, pct:number, hits:string[], misses:string[]}[]}
 */
export function recommend(selected, directions) {
  if (!selected.length) return [];
  const max = selected.length * 3;
  return directions
    .map(dir => {
      const hits = [], misses = [];
      let score = 0;
      selected.forEach(k => {
        const v = dir.traits[k] || 0;
        score += v;
        (v >= 2 ? hits : misses).push(k);
      });
      return { dir, score, pct: Math.round((score / max) * 100), hits, misses };
    })
    .sort((a, b) => b.score - a.score || a.dir.no.localeCompare(b.dir.no));
}

/** Aktive Spannungen zur aktuellen Auswahl. */
export function tensionsFor(selected) {
  return TENSIONS.filter(t => selected.includes(t.a) && selected.includes(t.b));
}
