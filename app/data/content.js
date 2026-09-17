/* ============================================================================
   DER GEMEINSAME INHALT
   Das Kernargument der ganzen Seite: Inhalt und Gestaltung sind getrennt.
   Deshalb liegt der Inhalt hier – EINMAL – und wird von jeder Richtung
   identisch gerendert. Was sich ändert, ist ausschließlich das Theme.

   Zwei Inhaltssätze, damit im Gespräch auch die Gegenprobe möglich ist:
   ein erklärungsbedürftiges B2B-Produkt und ein Kreativstudio.
   Beide tragen exakt dieselben Bausteine in derselben Reihenfolge.
   ========================================================================== */

export const CONTENT_SETS = [
  {
    id: 'nordfeld',
    label: 'B2B-Produkt',
    brand: 'NORDFELD',
    kind: 'Plattform für Lieferketten-Transparenz',
    audience: 'Operations, Einkauf und Compliance im Mittelstand',
    eyebrow: 'Lieferketten-Transparenz',
    headline: ['Lieferketten,', 'die man nachweisen kann.'],
    lead: 'NORDFELD verbindet Lieferantendaten, Prüfnachweise und Risiken in einem Modell – prüfsicher, aktuell und ohne Tabellenpflege.',
    ctaPrimary: 'Demo buchen',
    ctaSecondary: 'Produkt-Tour ansehen',
    micro: 'Kein Vertrag, keine Karte. Antwort binnen eines Werktags.',
    stats: [
      { value: '340', unit: '∅', label: 'Lieferanten je Kunde' },
      { value: '12', unit: 'Tage', label: 'Time-to-Value' },
      { value: '68', unit: '%', label: 'weniger Handarbeit' }
    ],
    benefits: [
      { no: '01', title: 'Transparenz in Echtzeit', body: 'Jeder Lieferant, jede Stufe, jeder Nachweis – in einem Datenmodell statt in vierzehn Tabellen.' },
      { no: '02', title: 'Prüfsichere Nachweise', body: 'Dokumente, Fristen und Verantwortliche revisionsfest verknüpft. Der Audit-Export ist ein Klick.' },
      { no: '03', title: 'Weniger Handarbeit', body: 'Erinnerungen, Eskalationen und Statusabfragen laufen automatisch. Ihr Team entscheidet, statt zu sammeln.' }
    ],
    modules: [
      { no: '01', title: 'Lieferantenregister', body: 'Stammdaten, Zertifikate und Ansprechpartner an einer Stelle.' },
      { no: '02', title: 'Risikoanalyse', body: 'Länder-, Branchen- und Ausfallrisiken je Stufe bewertet.' },
      { no: '03', title: 'Nachweis-Workflow', body: 'Anforderung, Erinnerung, Prüfung, Freigabe – ohne E-Mail-Kette.' },
      { no: '04', title: 'Audit-Export', body: 'Prüfberichte auf Knopfdruck, im Format der jeweiligen Behörde.' }
    ],
    quote: { text: 'Die erste Software, nach deren Einführung wir Stellen nicht besetzen mussten, sondern Aufgaben streichen konnten.', who: 'Leitung Einkauf', org: 'Fertigungsunternehmen, 420 Mitarbeitende' },
    faq: [
      ['Wie lange dauert die Einführung?', 'Der Standardimport steht nach zwei Wochen. Vollständige Abdeckung aller Stufen erreichen die meisten Teams im ersten Quartal.'],
      ['Ersetzt NORDFELD unser ERP?', 'Nein. NORDFELD liest aus dem ERP und schreibt Ergebnisse zurück. Das führende System bleibt, wo es ist.'],
      ['Wo liegen die Daten?', 'In Frankfurt, in einem nach ISO 27001 zertifizierten Rechenzentrum. Auf Wunsch getrennte Mandanten.'],
      ['Was kostet es?', 'Nach Anzahl der aktiv gepflegten Lieferanten, nicht nach Nutzerzahl. Das Angebot steht nach dem ersten Gespräch.'],
      ['Gibt es eine Testphase?', 'Vier Wochen mit Ihren echten Daten, begleitet. Ohne Verlängerungsautomatik.']
    ],
    closing: { title: 'Sehen Sie Ihre eigene Lieferkette.', body: 'Dreißig Minuten, Ihre Daten, keine Folien.' },
    nav: ['Produkt', 'Lösungen', 'Preise', 'Ressourcen', 'Über uns']
  },
  {
    id: 'atelier',
    label: 'Kreativstudio',
    brand: 'ATELIER NORD',
    kind: 'Studio für Marken und digitale Produkte',
    audience: 'Marketing- und Gründungsteams mit Gestaltungsanspruch',
    eyebrow: 'Marke, Digital, Produkt',
    headline: ['Marken,', 'die man wiedererkennt.'],
    lead: 'Wir bauen Markenauftritte, die auch nach drei Jahren noch tragen – von der Positionierung über das Designsystem bis zur ausgelieferten Website.',
    ctaPrimary: 'Projekt anfragen',
    ctaSecondary: 'Arbeiten ansehen',
    micro: 'Erstgespräch kostenfrei. Wir sagen auch ab, wenn es nicht passt.',
    stats: [
      { value: '64', unit: '', label: 'Projekte seit 2016' },
      { value: '9', unit: '', label: 'Leute im Studio' },
      { value: '7', unit: 'J.', label: 'längste Zusammenarbeit' }
    ],
    benefits: [
      { no: '01', title: 'Strategie zuerst', body: 'Bevor etwas gestaltet wird, steht fest, wofür die Marke steht und wogegen sie sich abgrenzt.' },
      { no: '02', title: 'Systeme statt Seiten', body: 'Wir liefern Tokens, Komponenten und Regeln – damit Ihr Team weiterbauen kann, nicht nur pflegen.' },
      { no: '03', title: 'Bis zum Livegang', body: 'Gestaltung und Umsetzung sitzen im selben Raum. Kein Übergabeverlust, keine Interpretationsschleife.' }
    ],
    modules: [
      { no: '01', title: 'Markenstrategie', body: 'Positionierung, Tonalität, Argumentationslinie.' },
      { no: '02', title: 'Identität', body: 'Wortmarke, Typografie, Farbe, Bildsprache, Regelwerk.' },
      { no: '03', title: 'Digitales Produkt', body: 'UX, UI, Designsystem, Prototyp, Test.' },
      { no: '04', title: 'Umsetzung', body: 'Frontend, CMS, Performance, Barrierefreiheit, Betrieb.' }
    ],
    quote: { text: 'Wir kamen mit einem Website-Auftrag und gingen mit einer Marke heraus, die unser Vertrieb tatsächlich benutzt.', who: 'Geschäftsführung', org: 'Technologieunternehmen, 80 Mitarbeitende' },
    faq: [
      ['Wie läuft ein Projekt ab?', 'Vier Phasen: Verstehen, Richtung, Ausbau, Auslieferung. Nach jeder Phase steht eine Entscheidung, keine Überraschung.'],
      ['Was kostet ein Auftritt?', 'Markenauftritte beginnen im mittleren fünfstelligen Bereich. Den Rahmen nennen wir nach dem ersten Gespräch, nicht danach.'],
      ['Arbeiten Sie mit unserem Team?', 'Gern. In etwa der Hälfte der Projekte übernimmt das interne Team nach dem Designsystem selbst.'],
      ['Wie lange dauert es?', 'Von der Positionierung bis zum Livegang typischerweise zehn bis sechzehn Wochen.'],
      ['Machen Sie auch nur Beratung?', 'Ja. Zwei Tage Richtungsarbeit sind oft mehr wert als ein halbes Redesign.']
    ],
    closing: { title: 'Erzählen Sie uns von dem Projekt.', body: 'Dreißig Minuten reichen, um zu wissen, ob es passt.' },
    nav: ['Arbeiten', 'Leistungen', 'Studio', 'Journal', 'Kontakt']
  }
];

export const CONTENT_BY_ID = Object.fromEntries(CONTENT_SETS.map(c => [c.id, c]));
export const getContent = id => CONTENT_BY_ID[id] || CONTENT_SETS[0];
