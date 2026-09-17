/* ============================================================================
   DIE GESTALTUNGSRICHTUNGEN
   Zwölf Richtungen. Zehn stammen aus der NORDFELD-Studie (Repo „Designs“) und
   sind hier um Bewertungsachsen, Merkmalsprofil und Theme-Anbindung erweitert;
   zwei sind neu (aurora, console), um zu zeigen, wie günstig Erweiterung ist.

   Eine Richtung ist NUR Daten. Das Aussehen liegt in css/10-directions.css
   unter [data-direction="<id>"]. Neue Richtung = ein Eintrag hier + ein
   Theme-Block dort. Sonst nichts.

   scores  – 1–5 je Achse aus criteria.js (beschreibend, nicht wertend).
   traits  – Affinität 0–3 zu den Merkmalen aus traits.js (für die Beratung).
   archive – zugehöriges Original-Wireframe aus dem Repo „Designs“.
   ========================================================================== */

export const DIRECTIONS = [
  {
    id: 'swiss', no: '01', name: 'Swiss', full: 'Swiss / International Style',
    claim: 'Autorität durch Ordnung statt durch Effekt.',
    idea: 'Das sichtbare Zwölf-Spalten-Raster ist das Gestaltungsmittel. Wirkung entsteht allein aus Größenkontrast – 112 px Headline gegen 15 px Fließtext – und aus Weißraum. Keine Dekoration, keine Fläche, die nicht gebraucht wird.',
    gaze: 'Links oben an der überdimensionierten Headline, über die durchgehende Haarlinie nach rechts zur schmalen Lead-Spalte, dann von Trennlinie zu Trennlinie nach unten.',
    diff: 'Einzige Richtung ohne Bild und ohne gefüllten Button im Hero. Leistungen erscheinen als Tabellenzeilen statt als Cards.',
    strength: 'Höchste Glaubwürdigkeit bei hoher Informationsdichte. Altert praktisch nicht.',
    weakness: 'Verzeiht keine schwachen Texte und kein schlechtes Lektorat – es gibt nichts, wohinter man sich verstecken könnte.',
    fit: 'Ingenieurwesen, Architektur, Beratung, Industrie, Hochschule',
    tags: ['12-Spalten-Raster', 'Typo-Hierarchie', 'Haarlinien', 'CTA als Textlink'],
    scores: { impact: 4, clarity: 5, trust: 5, convert: 3, density: 4, emotion: 2, novelty: 2, range: 4, a11y: 5, mobile: 4, perf: 5, scale: 5 },
    traits: { minimal: 3, serios: 3, technisch: 2, premium: 2, vertrauen: 3, innovativ: 1, jung: 0, mutig: 1, emotional: 0, experimentell: 0 },
    archive: 'archive/nordfeld/konzept-01-swiss.html',
    interaction: 'rule'
  },
  {
    id: 'minimal', no: '02', name: 'Minimal', full: 'Minimalist / Premium',
    claim: 'Ein Gedanke pro Bildschirm.',
    idea: 'Radikale Reduktion: genau ein Button-Typ auf der gesamten Seite, durchgehend zentrierte Achse, großzügige Pausen. Die Seite erklärt nicht – sie behauptet und lässt die Behauptung stehen.',
    gaze: 'Rein vertikal auf einer Achse. Weil pro Bildschirm nur ein Element konkurriert, entsteht ein Takt aus Lesen und Scrollen.',
    diff: 'Niedrigste Informationsdichte aller Richtungen. Weißraum ist hier kein Rest, sondern das Hauptmaterial.',
    strength: 'Wirkt sofort teuer und souverän. Sehr geringe technische Last.',
    weakness: 'Lange Scrollwege; wer viel erklären muss, verliert hier. Ohne starkes Bild oder starken Satz wirkt es leer statt ruhig.',
    fit: 'Premium-Tech, Hardware, Fintech, Medizintechnik',
    tags: ['Zentrierte Achse', 'Ein Button-Typ', 'Maximaler Weißraum'],
    scores: { impact: 4, clarity: 5, trust: 4, convert: 3, density: 1, emotion: 3, novelty: 2, range: 3, a11y: 5, mobile: 5, perf: 5, scale: 2 },
    traits: { minimal: 3, premium: 3, serios: 2, vertrauen: 2, technisch: 1, innovativ: 1, jung: 1, mutig: 0, emotional: 1, experimentell: 0 },
    archive: 'archive/nordfeld/konzept-02-minimal.html',
    interaction: 'fade'
  },
  {
    id: 'editorial', no: '03', name: 'Editorial', full: 'Editorial / Magazine',
    claim: 'Die Seite ist eine Ausgabe, kein Funnel.',
    idea: 'Masthead statt Navigationsleiste, Aufmacher mit überlappender Headline, dreispaltiger Einstieg mit Initial. Autorität entsteht durch Inhalt und Satz, nicht durch Interface.',
    gaze: 'Kicker → überlappende Headline → Initial → Textspalten. Wechselnde Spaltenbreiten justieren den Blick immer wieder neu.',
    diff: 'Einzige Richtung mit mehrspaltigem Fließtext und Masthead. Höchste Informationsdichte im Feld.',
    strength: 'Trägt sehr viel Inhalt, ohne billig zu werden. Beste Grundlage für Thought Leadership.',
    weakness: 'Redaktionell teuer. Auf kleinen Bildschirmen verliert der Spaltensatz seine Wirkung, der Conversion-Druck bleibt niedrig.',
    fit: 'Medien, Verlage, Think Tanks, Kultur, NGOs',
    tags: ['Masthead', 'Spaltensatz', 'Initial', 'Marginalien'],
    scores: { impact: 3, clarity: 4, trust: 4, convert: 2, density: 5, emotion: 4, novelty: 3, range: 3, a11y: 4, mobile: 3, perf: 4, scale: 4 },
    traits: { serios: 3, premium: 2, emotional: 2, vertrauen: 2, minimal: 1, technisch: 0, innovativ: 1, jung: 0, mutig: 1, experimentell: 1 },
    archive: 'archive/nordfeld/konzept-03-editorial.html',
    interaction: 'text'
  },
  {
    id: 'brutalist', no: '04', name: 'Brutalist', full: 'Brutalist / Neo-Brutalist',
    claim: 'Die Konstruktion wird gezeigt, nicht versteckt.',
    idea: 'Vier Pixel Rahmen, harte Schlagschatten, Navigation als Zellenraster. Hierarchie entsteht über Rahmenstärke und Größe statt über Weißraum. Nichts ist weich, nichts ist beiläufig.',
    gaze: 'Harte Kanten fangen den Blick: XXL-Headline, vollbreiter Button, dann Zelle für Zelle. Das Laufband erzwingt eine horizontale Pause.',
    diff: 'Keine weichen Übergänge, kein Weißraum als Trennmittel. Buttons bis zu fünfmal größer als in allen anderen Richtungen.',
    strength: 'Maximale Differenzierung bei minimalem Produktionsaufwand. Sehr gute Sichtbarkeit der Handlung.',
    weakness: 'Polarisiert. Seriosität sinkt spürbar, konservative Zielgruppen steigen aus.',
    fit: 'Developer-Tools, Web3, Musik, Streetwear',
    tags: ['4-px-Rahmen', 'Harte Schatten', 'Zellenraster', 'Laufband'],
    scores: { impact: 5, clarity: 4, trust: 2, convert: 4, density: 3, emotion: 4, novelty: 5, range: 2, a11y: 4, mobile: 4, perf: 5, scale: 4 },
    traits: { mutig: 3, jung: 3, experimentell: 3, innovativ: 2, technisch: 2, emotional: 2, minimal: 0, premium: 0, serios: 0, vertrauen: 0 },
    archive: 'archive/nordfeld/konzept-04-brutalist.html',
    interaction: 'shift'
  },
  {
    id: 'saas', no: '05', name: 'SaaS', full: 'Modern SaaS / Tech',
    claim: 'Jede Sektion beantwortet einen Einwand.',
    idea: 'Das Layout ist bewusst vertraut, damit die Information zählt und nicht die Form. Entlang der Kaufentscheidung steht an jedem Umschlagpunkt ein doppelter CTA.',
    gaze: 'Z-Verlauf: Headline links, Produktbild rechts, über die Trust-Bar nach unten. Alternierende Feature-Blöcke halten den Blick im Zickzack.',
    diff: 'Höchste Erwartungssicherheit, niedrigster Experimentiergrad. Einzige Richtung mit echtem Produkt-Screenshot im Hero.',
    strength: 'Funktioniert messbar. Jede Person im Markt kennt das Muster und muss nichts lernen.',
    weakness: 'Austauschbar. Ohne starke Marke im Text ist die Seite von der Konkurrenz nicht zu unterscheiden.',
    fit: 'B2B-SaaS, Fintech, HR-Tech, Logistik-Software',
    tags: ['Z-Muster', 'Doppel-CTA', 'Trust-Bar', 'Feature-Alternation'],
    scores: { impact: 3, clarity: 5, trust: 5, convert: 5, density: 4, emotion: 2, novelty: 1, range: 4, a11y: 5, mobile: 5, perf: 4, scale: 5 },
    traits: { vertrauen: 3, technisch: 3, serios: 3, innovativ: 1, minimal: 1, premium: 1, jung: 1, mutig: 0, emotional: 0, experimentell: 0 },
    archive: 'archive/nordfeld/konzept-05-saas.html',
    interaction: 'lift'
  },
  {
    id: 'futuristic', no: '06', name: 'Futuristic', full: 'Futuristic / AI Tech',
    claim: 'Das Produkt als System aus Bauteilen.',
    idea: 'Die Oberfläche arbeitet mit Ebenen: ein Großmodul wird von kleineren Modulen überlagert, die aus dem Raster ausbrechen. Dunkler Grund, technische Beschriftung, Statuszeilen.',
    gaze: 'Schwebende Pill-Navigation hält den Blick oben, die Statuszeile zieht ihn in die Mitte, die Überlagerungen führen diagonal nach unten.',
    diff: 'Einzige Richtung mit echten Überlagerungen und horizontalem Scrollen. Der Hero ist eine Bühne, kein Textblock.',
    strength: 'Zeigt Innovationskraft, ohne Seriosität zu verlieren. Sehr gut für erklärungsbedürftige Technologie.',
    weakness: 'Dunkle Flächen und Überlagerungen kosten Kontrast und Aufmerksamkeit. Aufwendig responsiv.',
    fit: 'KI- und Datenplattformen, Deep Tech, Security',
    tags: ['Ebenen', 'Pill-Navigation', 'Statuszeilen', 'Horizontale Schiene'],
    scores: { impact: 5, clarity: 3, trust: 4, convert: 3, density: 3, emotion: 3, novelty: 4, range: 3, a11y: 3, mobile: 3, perf: 3, scale: 4 },
    traits: { innovativ: 3, technisch: 3, premium: 2, mutig: 2, jung: 2, experimentell: 2, vertrauen: 1, minimal: 1, serios: 1, emotional: 1 },
    archive: 'archive/nordfeld/konzept-06-futuristic.html',
    interaction: 'scan'
  },
  {
    id: 'luxury', no: '07', name: 'Luxury', full: 'Luxury / High-End',
    claim: 'Inszenieren statt erklären.',
    idea: 'Große Bildflächen bestimmen den Takt, Text erscheint nur in kleinen, exakt gesetzten Blöcken. Ein Abstandsrhythmus von 240 px zieht die Seite bewusst in die Länge.',
    gaze: 'Start im Vollbild, Text unten links in der ruhigsten Ecke, danach ein sehr langsamer Rhythmus aus Bild, Pause und kleinem Textblock.',
    diff: 'Navigation vollständig hinter einem Menü. Kein einziger gefüllter Button – jeder CTA ist eine feine Unterstreichung.',
    strength: 'Höchste Wertanmutung. Verwandelt ein Angebot optisch in ein Objekt.',
    weakness: 'Steht und fällt mit der Bildqualität. Sehr geringe Informationsdichte, versteckte Navigation kostet Auffindbarkeit.',
    fit: 'Luxusgüter, Immobilien, Hotellerie, Private Banking',
    tags: ['Vollbild', 'Verstecktes Menü', 'CTA als Unterstreichung', '240-px-Rhythmus'],
    scores: { impact: 4, clarity: 3, trust: 4, convert: 2, density: 1, emotion: 5, novelty: 3, range: 2, a11y: 3, mobile: 4, perf: 2, scale: 2 },
    traits: { premium: 3, emotional: 3, minimal: 2, serios: 2, vertrauen: 1, mutig: 1, experimentell: 1, innovativ: 0, technisch: 0, jung: 0 },
    archive: 'archive/nordfeld/konzept-07-luxury.html',
    interaction: 'reveal'
  },
  {
    id: 'organic', no: '08', name: 'Organic', full: 'Organic / Human-Centered',
    claim: 'Gelegt statt konstruiert.',
    idea: 'Das Raster wird gelockert: Karten sitzen versetzt, Sektionen enden in Bögen, Bilder sind organisch maskiert. Warme Grundfläche, weiche Radien, Menschen statt Logos.',
    gaze: 'Pendelnd zwischen Text links und organischer Bildform rechts. Der Bogen der Sektionskante führt weiter nach unten, versetzte Karten verlangsamen das Scannen.',
    diff: 'Einzige Richtung ohne rechtwinklige Sektionsübergänge und ohne durchgehende Grundlinie. Sozialer Beleg über Gesichter.',
    strength: 'Senkt die Schwelle. Wirkt zugewandt, ohne kindlich zu werden.',
    weakness: 'Weiche Formen kosten Präzision. Für hochpreisige oder hochtechnische Angebote schnell zu freundlich.',
    fit: 'Health, Education, Nachhaltigkeit, Lifestyle',
    tags: ['Bögen', 'Organische Masken', 'Versatz', 'Warme Fläche'],
    scores: { impact: 3, clarity: 4, trust: 4, convert: 3, density: 3, emotion: 5, novelty: 3, range: 3, a11y: 4, mobile: 4, perf: 4, scale: 3 },
    traits: { emotional: 3, vertrauen: 3, jung: 2, minimal: 1, premium: 1, serios: 1, innovativ: 1, mutig: 0, technisch: 0, experimentell: 1 },
    archive: 'archive/nordfeld/konzept-08-organic.html',
    interaction: 'swell'
  },
  {
    id: 'bento', no: '09', name: 'Bento', full: 'Bento Grid / Modular',
    claim: 'Jede Information ist ein Modul mit fester Rasterposition.',
    idea: 'Auch der Hero ist eine Kachel. Gewichtung entsteht ausschließlich über Kachelgröße und Kontrast, nicht über Reihenfolge. Konsequent flach: keine Überlappung, keine Tiefe.',
    gaze: 'Nicht linear, sondern nach Flächengröße: Headline-Kachel → invertierte CTA-Kachel → reihenweise über die kleineren Module.',
    diff: 'Die Gegenprobe zu Futuristic: gleiche Modularität, aber ohne jede Tiefe und ohne horizontales Scrollen. Es gibt keinen klassischen Heldenblock.',
    strength: 'Extrem pflegbar. Module lassen sich ergänzen, tauschen und ausblenden, ohne das Layout zu brechen.',
    weakness: 'Alles wirkt gleich wichtig. Ohne konsequente Größenabstufung entsteht kaum Hierarchie und wenig Dramaturgie.',
    fit: 'Developer-Tools, Data- und API-Produkte, Consumer-Tech',
    tags: ['Kachelraster', 'Flach', 'Größenkontrast', 'Modul-Hero'],
    scores: { impact: 4, clarity: 4, trust: 4, convert: 4, density: 4, emotion: 2, novelty: 3, range: 4, a11y: 4, mobile: 4, perf: 5, scale: 5 },
    traits: { technisch: 3, innovativ: 2, minimal: 2, jung: 2, vertrauen: 2, serios: 1, premium: 1, mutig: 1, emotional: 0, experimentell: 1 },
    archive: 'archive/nordfeld/konzept-09-bento.html',
    interaction: 'tile'
  },
  {
    id: 'experimental', no: '10', name: 'Experimental', full: 'Experimental / Creative Agency',
    claim: 'Spannung durch Richtungswechsel.',
    idea: 'Senkrechte Navigationsschiene, waagerechte Projektschiene, diagonales Band, Textblöcke mit extremen Einzügen. Lesbarkeit bleibt Bedingung, nicht Nebensache.',
    gaze: 'Die Schiene besetzt den linken Rand, der Blick startet rechts oben an der überlagerten Headline und fällt diagonal nach unten links. Jeder Abschnitt setzt den Einstiegspunkt neu.',
    diff: 'Einzige Richtung mit Navigation außerhalb des Kopfbereichs und mit Text über Bildkanten. FAQ und Footer bleiben bewusst ruhig – der Bruch ist dosiert.',
    strength: 'Die Website ist selbst der Beweis der Leistung. Sehr hohe Erinnerbarkeit.',
    weakness: 'Hoher Pflegeaufwand, empfindlich gegenüber neuen Inhalten. Seriosität leidet, wenn die Ausführung nicht perfekt ist.',
    fit: 'Design- und Digitalagenturen, Studios, Mode, Kultur',
    tags: ['Vertikale Schiene', 'Diagonalen', 'Extreme Einzüge', 'Überlagerung'],
    scores: { impact: 5, clarity: 2, trust: 2, convert: 2, density: 2, emotion: 4, novelty: 5, range: 2, a11y: 3, mobile: 2, perf: 3, scale: 2 },
    traits: { experimentell: 3, mutig: 3, innovativ: 3, jung: 2, emotional: 2, premium: 1, technisch: 1, minimal: 0, serios: 0, vertrauen: 0 },
    archive: 'archive/nordfeld/konzept-10-experimental.html',
    interaction: 'skew'
  },
  {
    id: 'aurora', no: '11', name: 'Aurora', full: 'Aurora / Glass',
    claim: 'Licht als Material.',
    idea: 'Neu ergänzt, nicht aus dem Bestand. Farbige Lichtfelder liegen hinter durchscheinenden Flächen; Kanten entstehen durch Helligkeitssprünge statt durch Linien. Dosiert eingesetzt – Glas nur dort, wo Ebenen wirklich übereinanderliegen.',
    gaze: 'Der Blick folgt dem hellsten Punkt. Lichtfelder sind so gesetzt, dass sie Headline, Handlung und Beleg nacheinander markieren.',
    diff: 'Die einzige Richtung, die Tiefe über Transparenz erzeugt statt über Schatten oder Überlappung.',
    strength: 'Wirkt zeitgenössisch und leicht. Gute Bühne für Produktbilder mit freigestellten Kanten.',
    weakness: 'Kontrast ist ständig in Gefahr; Blur ist auf schwächeren Geräten teuer. Ohne Disziplin sofort beliebig.',
    fit: 'Consumer-Apps, Kreativ-Tools, Musik, Events',
    tags: ['Lichtfelder', 'Transluzenz', 'Kantenlicht', 'Weiche Tiefe'],
    scores: { impact: 4, clarity: 3, trust: 3, convert: 3, density: 2, emotion: 4, novelty: 4, range: 3, a11y: 2, mobile: 3, perf: 2, scale: 3 },
    traits: { jung: 3, innovativ: 2, emotional: 2, premium: 2, experimentell: 2, minimal: 1, technisch: 1, mutig: 1, vertrauen: 0, serios: 0 },
    archive: null,
    interaction: 'glow'
  },
  {
    id: 'console', no: '12', name: 'Console', full: 'Dashboard / Product UI',
    claim: 'Die Website sieht aus wie das Produkt.',
    idea: 'Neu ergänzt, nicht aus dem Bestand. Die Marketingseite übernimmt die Sprache der Anwendung: Monospace-Beschriftung, Tabellen, Statusfarben, dichte Zeilen. Wer hier klickt, weiß schon, wie sich das Produkt anfühlt.',
    gaze: 'Von links oben zeilenweise nach unten wie in einer Konsole. Statusmarken fangen den Blick an definierten Punkten ab.',
    diff: 'Einzige Richtung, in der Marketing- und Produktoberfläche dieselbe Komponentensprache teilen.',
    strength: 'Extrem glaubwürdig bei technischen Zielgruppen. Kein Bruch zwischen Versprechen und Anwendung.',
    weakness: 'Kalt und voraussetzungsreich. Nicht-technische Entscheider fühlen sich schnell nicht gemeint.',
    fit: 'Developer-Tools, Infrastruktur, Data, Observability',
    tags: ['Monospace', 'Tabellen', 'Statusfarben', 'Dichte Zeilen'],
    scores: { impact: 3, clarity: 4, trust: 4, convert: 3, density: 5, emotion: 1, novelty: 3, range: 2, a11y: 4, mobile: 3, perf: 5, scale: 5 },
    traits: { technisch: 3, vertrauen: 2, serios: 2, innovativ: 2, minimal: 1, mutig: 1, jung: 1, experimentell: 1, premium: 0, emotional: 0 },
    archive: null,
    interaction: 'type'
  }
];

export const DIRECTION_BY_ID = Object.fromEntries(DIRECTIONS.map(d => [d.id, d]));
export const DIRECTION_IDS = DIRECTIONS.map(d => d.id);
export const getDirection = id => DIRECTION_BY_ID[id] || DIRECTIONS[0];
