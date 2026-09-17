/* ============================================================================
   BEWERTUNGSSYSTEM
   Eine einzige Quelle für Vergleich (§ Vergleichen) und Kriterien (§ Bewertung).

   METRICS  – 12 messbare Achsen. Jede Richtung trägt einen Wert 1–5 je Achse.
              8 davon (radar:true) bilden das Netzdiagramm, 4 die Handwerks-Leiste.
   PILLARS  – 7 Bewertungsdimensionen. Jede bündelt Metriken und Leitfragen.

   Neue Achse ergänzen: hier eintragen + Wert in directions.js nachtragen.
   ========================================================================== */

export const METRICS = [
  { key: 'impact',  label: 'Visuelle Wirkung',  radar: true,  hint: 'Wie stark bleibt der erste Eindruck haften?' },
  { key: 'clarity', label: 'Klarheit',          radar: true,  hint: 'Wie schnell ist verstanden, worum es geht?' },
  { key: 'trust',   label: 'Vertrauen',         radar: true,  hint: 'Wie seriös und belastbar wirkt die Oberfläche?' },
  { key: 'convert', label: 'Conversion-Fokus',  radar: true,  hint: 'Wie konsequent führt das Layout zur Handlung?' },
  { key: 'density', label: 'Informationsdichte',radar: true,  hint: 'Wie viel Inhalt trägt ein Bildschirm?' },
  { key: 'emotion', label: 'Emotionale Wirkung',radar: true,  hint: 'Wie stark spricht die Gestaltung Gefühl an?' },
  { key: 'novelty', label: 'Innovationsgrad',   radar: true,  hint: 'Wie weit weicht sie von der Erwartung ab?' },
  { key: 'range',   label: 'Marken-Spannweite', radar: true,  hint: 'Für wie viele Markentypen trägt die Richtung?' },

  { key: 'a11y',    label: 'Barrierefreiheit',  radar: false, hint: 'Kontrast, Fokus, Semantik, Lesbarkeit.' },
  { key: 'mobile',  label: 'Mobile Nutzbarkeit',radar: false, hint: 'Wie gut überlebt das Prinzip 390 px?' },
  { key: 'perf',    label: 'Performance',       radar: false, hint: 'Aufwand für Bilder, Effekte, Schriften.' },
  { key: 'scale',   label: 'Skalierbarkeit',    radar: false, hint: 'Wie gut wächst das System mit dem Inhalt?' }
];

export const RADAR_METRICS = METRICS.filter(m => m.radar);
export const CRAFT_METRICS = METRICS.filter(m => !m.radar);
export const METRIC_BY_KEY = Object.fromEntries(METRICS.map(m => [m.key, m]));

/* --------------------------------------------------------------------------
   Die sieben Bewertungsdimensionen. `metrics` verbindet jede Dimension mit
   den Achsen oben – dadurch ist die Bewertung nicht nur Text, sondern rechnet
   für jede Richtung einen echten Wert aus.
   -------------------------------------------------------------------------- */
export const PILLARS = [
  {
    id: 'identity', no: '01', title: 'Visuelle Identität',
    lead: 'Wird die Marke wiedererkannt – und unterscheidet sie sich von der Nachbarschaft?',
    metrics: ['impact', 'novelty', 'range'],
    checks: [
      ['Wiedererkennung', 'Bleibt nach fünf Sekunden ein Bild im Kopf, nicht nur ein Eindruck?'],
      ['Differenzierung', 'Könnte das Logo der Konkurrenz auf dieser Seite stehen, ohne dass es auffällt?'],
      ['Konsistenz', 'Tragen Typografie, Raster und Farbe dieselbe Aussage über alle Sektionen?']
    ]
  },
  {
    id: 'ux', no: '02', title: 'Nutzerführung',
    lead: 'Weiß jede Person jederzeit, wo sie ist, was hier zu holen ist und wie es weitergeht?',
    metrics: ['clarity', 'mobile', 'a11y'],
    checks: [
      ['Navigation', 'Ist die Struktur ohne Erklärung benutzbar – auch beim zweiten Besuch?'],
      ['Verständnis', 'Steht die Kernaussage über der Faltkante, ohne Vorwissen?'],
      ['Informationsarchitektur', 'Folgt die Reihenfolge der Fragen des Publikums, nicht dem Org-Chart?'],
      ['Orientierung', 'Gibt es sichtbaren Fortschritt und einen Weg zurück?']
    ]
  },
  {
    id: 'conversion', no: '03', title: 'Conversion',
    lead: 'Führt die Gestaltung zu der Handlung, für die die Seite bezahlt wurde?',
    metrics: ['convert', 'clarity', 'trust'],
    checks: [
      ['CTA-Sichtbarkeit', 'Ist die wichtigste Handlung ohne Suchen auffindbar – auf jedem Bildschirm?'],
      ['Führung', 'Endet jeder Abschnitt an einem sinnvollen nächsten Schritt?'],
      ['Hierarchie', 'Konkurrieren primäre und sekundäre Handlung, oder ordnen sie sich?'],
      ['Vertrauen', 'Liegen Belege dort, wo der Zweifel entsteht?']
    ]
  },
  {
    id: 'content', no: '04', title: 'Inhalt',
    lead: 'Trägt die Form den Text – oder muss der Text gegen die Form ankämpfen?',
    metrics: ['density', 'clarity', 'scale'],
    checks: [
      ['Lesbarkeit', 'Zeilenlänge, Kontrast und Schriftgrad über alle Breiten geprüft?'],
      ['Informationsdichte', 'Passt die Menge pro Bildschirm zur Aufmerksamkeit des Publikums?'],
      ['Storytelling', 'Gibt es eine Dramaturgie – oder nur eine Reihe gleichwertiger Blöcke?']
    ]
  },
  {
    id: 'craft', no: '05', title: 'Technische Qualität',
    lead: 'Was in der Präsentation gut aussieht, muss drei Jahre lang gepflegt werden.',
    metrics: ['perf', 'a11y', 'mobile', 'scale'],
    checks: [
      ['Performance', 'Was kostet der Effekt an Ladezeit, Rechenlast und Akku?'],
      ['Responsive', 'Ist Mobile eine eigene Entscheidung oder ein zusammengeschobener Desktop?'],
      ['Barrierefreiheit', 'Tastatur, Fokus, Kontrast, Reduced Motion – von Anfang an eingeplant?'],
      ['Wartbarkeit', 'Kann jemand ohne das Originalteam eine Sektion ergänzen?']
    ]
  },
  {
    id: 'fit', no: '06', title: 'Marken-Passung',
    lead: 'Die beste Richtung ist nicht die schönste, sondern die passende.',
    metrics: ['range', 'trust', 'emotion'],
    checks: [
      ['Zielgruppe', 'Erwartet dieses Publikum Vertrautheit oder Überraschung?'],
      ['Positionierung', 'Unterstützt die Anmutung den Preis, den die Marke aufruft?'],
      ['Tonalität', 'Spricht die Gestaltung dieselbe Sprache wie der Text?'],
      ['Wertanmutung', 'Wirkt das Angebot teurer oder billiger als es ist?']
    ]
  },
  {
    id: 'feel', no: '07', title: 'Emotionale Wirkung',
    lead: 'Der Teil, der sich schwer messen lässt – und trotzdem über die Erinnerung entscheidet.',
    metrics: ['emotion', 'impact', 'novelty'],
    checks: [
      ['Überraschung', 'Gibt es einen Moment, den man weitererzählt?'],
      ['Vertrauen', 'Fühlt sich die Oberfläche belastbar an oder nur dekoriert?'],
      ['Begehrlichkeit', 'Möchte man dazugehören?'],
      ['Erinnerbarkeit', 'Was bleibt nach einer Woche?']
    ]
  }
];

/** Mittelwert der einer Dimension zugeordneten Achsen, eine Nachkommastelle. */
export function pillarScore(direction, pillar) {
  const vals = pillar.metrics.map(k => direction.scores[k] ?? 3);
  return Math.round((vals.reduce((a, b) => a + b, 0) / vals.length) * 10) / 10;
}
