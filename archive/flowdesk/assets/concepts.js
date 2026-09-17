/* Gemeinsame Datenbasis für Übersichtsseite und Dokumentation.
   Bewertungen 1–5 sind beschreibend gemeint, nicht wertend:
   sie beschreiben die Ausprägung eines Merkmals, nicht die Qualität. */
window.CONCEPTS = [
  {
    n: "01", slug: "01-hero.html", title: "Hero Layout",
    claim: "Ein dominanter Hero trägt die gesamte Botschaft, alles Weitere ordnet sich unter.",
    idea: "Der erste Viewport übernimmt die komplette Kernkommunikation: Value Proposition, CTA-Hierarchie, Produktvisualisierung und Social Proof auf einer Ebene. Alle Folgesektionen nehmen im visuellen Gewicht bewusst ab (Typo-Skala, Höhe, Kontrast) und liefern nur noch Belege zur Hero-Story.",
    gaze: "Von der übergrossen Headline links zur Produktvisualisierung rechts, zurück zur CTA-Zeile, dann in den Social-Proof-Streifen. Danach vertikal abwärts mit abnehmender Reizstärke.",
    cta: "Primäre CTA direkt unter der Subheadline im ersten Viewport, wiederholt im Header und als invertierter Abschluss-Block.",
    pro: "Die Kernbotschaft sitzt innerhalb von Sekunden; sehr hoher Conversion-Fokus ohne Scrollzwang.",
    con: "Alles hängt an einem einzigen Bereich – ist die Hero-Botschaft unklar, trägt der Rest der Seite nicht. Wenig Platz für differenzierte Zielgruppen.",
    types: "SaaS-Produktseiten, Landingpages, Startups, Kampagnenseiten.",
    mobile: "Hero bleibt dominant, Visual rutscht unter den Text, CTAs werden vollbreit gestapelt; die Reihenfolge Botschaft → Beleg → Handlung bleibt identisch.",
    r: { dichte: 3, dynamik: 3, einfach: 4, story: 3, scan: 4, conv: 5, mobile: 4, inhalte: 3, visuals: 4 }
  },
  {
    n: "02", slug: "02-z-pattern.html", title: "Z-Pattern Layout",
    claim: "Der Blick wird diagonal von der Botschaft zur Handlung geführt.",
    idea: "Der erste Viewport ist strikt als Z komponiert: Botschaft oben links, Visual oben rechts, Beleg unten links, CTA unten rechts. Die Diagonalen sind als gestrichelte Hilfslinien sichtbar, die Blickpunkte nummeriert. Folgesektionen wiederholen den Z-Takt gespiegelt.",
    gaze: "Oben links → oben rechts → diagonal nach unten links → unten rechts. Jede weitere Sektion schwingt in der Gegenrichtung zurück.",
    cta: "Primäre CTA konsequent am Z-Endpunkt unten rechts, zusätzlich rechts oben im Header als Wiederholung.",
    pro: "Sehr kontrollierte Nutzerführung; die Handlung liegt exakt dort, wo der Blick endet.",
    con: "Funktioniert nur bei moderater Inhaltsmenge; bei vielen Inhalten wird das Muster unleserlich und wirkt schematisch.",
    types: "Kampagnen- und Landingpages, Unternehmenswebsites mit klarem Einzelziel, Lead-Generierung.",
    mobile: "Das Z klappt zu einer Treppe: Reihenfolge 1 → 2 → 3 → 4 bleibt erhalten, die Diagonalen entfallen, der CTA-Block wird vollbreit.",
    r: { dichte: 2, dynamik: 3, einfach: 4, story: 3, scan: 4, conv: 5, mobile: 3, inhalte: 2, visuals: 3 }
  },
  {
    n: "03", slug: "03-f-pattern.html", title: "F-Pattern Layout",
    claim: "Linke Informationsachse plus starke horizontale Einstiege für schnelles Scannen.",
    idea: "Gebaut für Nutzerinnen und Nutzer, die scannen statt lesen: alles linksbündig an einer vertikalen Achse, breite horizontale Überschriftenbalken als Einstiege, Listen statt Fliesstext, eine Sprungnavigation als Stamm des F und eine schmale Randspalte für Meta-Informationen.",
    gaze: "Horizontal über den obersten Balken, zurück an die linke Kante, wieder horizontal über den nächsten Balken – mit nach unten abnehmender Lesebreite.",
    cta: "Primäre CTA im Header, dauerhaft sichtbar in der linken Sprungleiste und im rechten Info-Kasten sowie als horizontaler Abschlussbalken.",
    pro: "Höchste Scanbarkeit bei sehr vielen Inhalten; Informationen bleiben auch beim Überfliegen verständlich.",
    con: "Visuell spannungsarm und wenig markenbildend; Bilder und Emotion haben kaum Raum.",
    types: "Informationsreiche Unternehmenswebsites, B2B-Plattformen, Dokumentation, Wissens- und Support-Bereiche.",
    mobile: "Die Achse bleibt links, die Sprungnavigation wird zur horizontal scrollbaren Chip-Leiste, die Randspalte entfällt, Zeilen werden zu gestapelten Blöcken.",
    r: { dichte: 5, dynamik: 1, einfach: 3, story: 2, scan: 5, conv: 3, mobile: 4, inhalte: 5, visuals: 1 }
  },
  {
    n: "04", slug: "04-grid-breaking.html", title: "Grid-Breaking Layout",
    claim: "Ein sichtbares 12-Spalten-Raster, das an gezielten Stellen gebrochen wird.",
    idea: "Das Raster wird als leichte Spaltenstruktur sichtbar gemacht und dann bewusst verletzt: Bilder laufen über den Viewport-Rand hinaus, Headlines überlagern Flächen, einzelne Module sind grösser, versetzt oder ragen aus ihrem Container. Die Brüche sind dosiert, die Hierarchie bleibt lesbar.",
    gaze: "Grosse Headline zuerst, dann entlang der Bruchstellen: überstehendes Visual rechts, versetzte Kartengruppe, diagonale Prozesstreppe.",
    cta: "Primäre CTA im Hero unter der gebrochenen Headline, final in einem Kasten, der nach rechts aus dem Container ausbricht.",
    pro: "Hohe visuelle Dynamik und Wiedererkennbarkeit, ohne die Ordnung ganz aufzugeben.",
    con: "Anspruchsvoll in Pflege und Responsive-Umsetzung; zu viele Brüche kippen schnell in Unruhe.",
    types: "Agenturen, Designstudios, Marken- und Kampagnenseiten, Portfolios.",
    mobile: "Das Raster löst sich in eine Spalte auf; die Brüche überleben nur als gezielte Randüberläufe von Bildern und CTA-Block.",
    r: { dichte: 3, dynamik: 5, einfach: 2, story: 4, scan: 2, conv: 3, mobile: 2, inhalte: 3, visuals: 4 }
  },
  {
    n: "05", slug: "05-content-focused.html", title: "Content-Focused Layout",
    claim: "Der Text erzeugt die Struktur, die UI tritt vollständig zurück.",
    idea: "Eine ruhige Lesespalte von rund 68 Zeichen, keine Karten, keine Rahmen, kein Button im Header. Struktur entsteht über Zwischenüberschriften, Listen, Definitionslisten, Marginalien-freie Ruhe und wenige erklärende Bilder. CTAs sind in den Lesefluss eingebettet statt als Fläche gesetzt.",
    gaze: "Streng vertikal entlang der Lesespalte – Kicker, Headline, Standfirst, dann Abschnitt für Abschnitt.",
    cta: "Primäre CTA dreifach im Lesefluss: als Metazeile unter dem Titel, als eingebetteter Textblock in der Mitte, als ruhiger Abschluss.",
    pro: "Höchste Glaubwürdigkeit und Lesbarkeit; ideal für erklärungsbedürftige Angebote und lange Argumentationsketten.",
    con: "Geringer Conversion-Druck und wenig visuelle Attraktivität; erfordert wirklich gute Texte.",
    types: "Beratung, Fachdienstleister, Publisher, B2B mit Erklärungsbedarf, persönliche Marken.",
    mobile: "Praktisch identisch – die Spalte wird schmaler, sonst ändert sich nichts. Das Konzept ist von Haus aus mobilfest.",
    r: { dichte: 4, dynamik: 1, einfach: 5, story: 4, scan: 3, conv: 2, mobile: 5, inhalte: 5, visuals: 2 }
  },
  {
    n: "06", slug: "06-fullscreen-image.html", title: "Fullscreen Image Layout",
    claim: "Bildschirmfüllende Visuals tragen das Layout, Text liegt als Overlay darauf.",
    idea: "Der erste Viewport ist ein 100-vh-Bild mit Text-Overlay und transparentem Header. Danach wechseln sich Vollbild-Sektionen, Split-Screens und Bildkacheln ab; nur FAQ und Detailinhalte liegen auf ruhiger heller Fläche, damit Lesbarkeit erhalten bleibt.",
    gaze: "Zuerst das Bild als Ganzes, dann der Overlay-Text im linken unteren Drittel, danach von Bildfläche zu Bildfläche.",
    cta: "Primäre CTA als heller Button über dem Hero-Bild, zusätzlich fixierte CTA-Leiste am unteren Rand auf Mobile und als Vollbild-Abschluss.",
    pro: "Starke emotionale Wirkung und Markenaufladung; Produkt und Kontext werden sofort erlebbar.",
    con: "Wenig Platz für Inhalt, hohe Anforderungen an Bildqualität, Kontrast und Ladezeit; Text kann untergehen.",
    types: "Marken- und Produktwebsites, Hospitality, Immobilien, Fashion, Portfolios, Event.",
    mobile: "Bilder bleiben bildschirmfüllend, Overlays werden kompakter, Split-Screens stapeln; eine fixierte CTA-Leiste sichert die Handlung ab.",
    r: { dichte: 1, dynamik: 5, einfach: 3, story: 5, scan: 2, conv: 3, mobile: 3, inhalte: 1, visuals: 5 }
  },
  {
    n: "07", slug: "07-alternating.html", title: "Alternating Layout",
    claim: "Durchgehender Bild-Text-Wechsel erzeugt einen ruhigen Leserhythmus.",
    idea: "Sektion für Sektion wechselt die Seite zwischen Text links / Bild rechts und umgekehrt. Gegen Monotonie variieren Spaltenverhältnis (50/50, 62/38, 73/27), Bildgrösse, Hintergrundfläche, vertikale Abstände und Informationsdichte; zwei volle Breiten unterbrechen den Takt bewusst.",
    gaze: "Zickzack von Textblock zu Bild und zurück, mit klaren Ruhepunkten an den vollbreiten Bändern.",
    cta: "Primäre CTA im ersten Textblock, danach am Ende einzelner Takte wiederholt, final als eigener Abschlussblock.",
    pro: "Sehr ausgewogenes Verhältnis von Text und Bild; beliebig erweiterbar, ohne die Ordnung zu verlieren.",
    con: "Neigt zur Monotonie und wirkt schnell generisch, wenn die Variation zu schwach ausfällt.",
    types: "Unternehmenswebsites, SaaS, Dienstleister, Produktseiten mit mehreren Argumenten.",
    mobile: "Der Wechsel kollabiert zur festen Folge Text → Bild; der Rhythmus entsteht dann über Abstände, Flächen und Dichte.",
    r: { dichte: 3, dynamik: 3, einfach: 4, story: 4, scan: 4, conv: 4, mobile: 5, inhalte: 4, visuals: 4 }
  },
  {
    n: "08", slug: "08-asymmetrical.html", title: "Asymmetrical Layout",
    claim: "Spannung durch ungleiche Gewichte und grosse Leerräume statt durch Brüche.",
    idea: "Alles bleibt im Raster, aber nichts ist mittig oder gleich gewichtet: ungleich breite Spalten, Off-Center-Setzung, vertikale Versätze, bewusst leere Spaltenbereiche. Anders als beim Grid-Breaking überlagert oder überläuft nichts – die Wirkung entsteht aus Verhältnis und Leere.",
    gaze: "Von der weit links gesetzten Headline über das hochgezogene Visual rechts zu tief versetzten Blöcken – ein bewusst unruhiger, aber geführter Sprungpfad.",
    cta: "Primäre CTA auffällig tief unter dem Hero-Text gesetzt, im Abschluss als rechtsbündige Buttongruppe gegenüber der Headline.",
    pro: "Hohe gestalterische Eigenständigkeit und Premium-Anmutung bei ruhiger, luftiger Wirkung.",
    con: "Leerraum kostet Platz; die Hierarchie ist schwerer zu lesen, Scanbarkeit sinkt spürbar.",
    types: "Designstudios, Architektur, Premiummarken, Portfolios, Kreativagenturen.",
    mobile: "Die Spaltenasymmetrie wird zu einem Einzugs-Rhythmus: Blöcke behalten unterschiedliche Einrückungen, die vertikale Reihenfolge bleibt erhalten.",
    r: { dichte: 2, dynamik: 5, einfach: 2, story: 3, scan: 2, conv: 3, mobile: 3, inhalte: 2, visuals: 4 }
  },
  {
    n: "09", slug: "09-single-column.html", title: "Single Column Layout",
    claim: "Eine vertikale Achse, eine Reihenfolge, eine Story.",
    idea: "Sämtliche Inhalte liegen auf einer 720-px-Achse, nichts steht nebeneinander. Dramaturgie entsteht ausschliesslich über Reihenfolge, Sektionshöhe, Flächenwechsel (hell, grau, dunkel) und Schriftgrad; nummerierte Kapitel markieren den Fortschritt.",
    gaze: "Rein vertikal, ohne Seitenblicke – der Blick wird durch Sektionsnummern und Grössensprünge getaktet.",
    cta: "Primäre CTA im Hero, in der dunklen Funktionssektion, im Abschlusskapitel und dauerhaft in einer fixierten CTA-Leiste.",
    pro: "Maximale Klarheit und Conversion-Führung; identisches Erlebnis auf allen Geräten, sehr einfach zu bauen und zu pflegen.",
    con: "Lange Scrollwege, geringe Informationsdichte pro Bildschirm; Querverweise und Nebeninhalte finden kaum Platz.",
    types: "Landingpages, Conversion-Seiten, Storytelling, persönliche Marken, Produktpräsentationen.",
    mobile: "Keine Umbauten nötig – das Desktop-Layout ist bereits die mobile Ansicht, nur breiter.",
    r: { dichte: 2, dynamik: 2, einfach: 5, story: 5, scan: 4, conv: 5, mobile: 5, inhalte: 3, visuals: 3 }
  },
  {
    n: "10", slug: "10-box-based.html", title: "Box-Based Layout",
    claim: "Jede Sektion ist ein sichtbares Panel mit Kopfzeile und verschachtelten Boxen.",
    idea: "Struktur wird ausgestellt statt angedeutet: Die Seite besteht aus gerahmten Panels auf grauem Grund, jedes mit Label-Kopfzeile. Innerhalb der Panels liegen Unterboxen, Box-Gruppen und KPI-Kacheln – ein modulares, fast dashboardartiges System.",
    gaze: "Panel für Panel von oben nach unten; innerhalb eines Panels führt die Kopfzeile den Blick, dann die Boxgruppe.",
    cta: "Primäre CTA im Header-Panel und im Hero-Panel, final als eigenes dunkles Highlight-Panel.",
    pro: "Sehr klare Gruppierung; ideal, wenn viele unterschiedliche Inhaltstypen gleichberechtigt nebeneinander stehen.",
    con: "Wirkt schnell technisch und schwer; viele Rahmen erzeugen visuelles Rauschen und flache Hierarchie.",
    types: "B2B-Plattformen, Portale, Tools und Dashboards, Intranets, Preis- und Vergleichsseiten.",
    mobile: "Die Panels stapeln in einer Spalte; die Rahmen bleiben und übernehmen die Gliederung, die sonst Abstände leisten müssten.",
    r: { dichte: 4, dynamik: 2, einfach: 4, story: 2, scan: 4, conv: 3, mobile: 4, inhalte: 5, visuals: 2 }
  },
  {
    n: "11", slug: "11-cards.html", title: "Cards Layout",
    claim: "Die ganze Seite besteht aus modularen Cards in einem Bento-Raster.",
    idea: "Jeder Inhalt ist ein eigenständiges Modul: Hero-Card, Produkt-Card, Stat-Cards, Feature-Cards, horizontale Use-Case-Cards, Testimonial-Cards, Ressourcen-Cards, CTA-Card. Das 12-Spalten-Bento mischt 3-, 4-, 6-, 7- und 12-spaltige Karten und verschachtelt Cards in Cards.",
    gaze: "Von der grossen Hero-Card zu den kleineren Modulen; innerhalb einer Reihe scannt der Blick über gleichartige Karten.",
    cta: "Primäre CTA in der Hero-Card und in den Card-Footern einzelner Module, final als dunkle Highlight-Card.",
    pro: "Extrem skalierbar und redaktionell pflegbar; Inhalte lassen sich ergänzen, umsortieren oder ausblenden, ohne das Layout zu brechen.",
    con: "Alles wirkt gleich wichtig – ohne Grössenabstufung entsteht kaum Hierarchie und wenig Storytelling.",
    types: "Plattformen, Marktplätze, Onlineshops, Feature-Übersichten, Ressourcen- und Blogbereiche.",
    mobile: "Alle Karten werden vollbreit gestapelt, horizontale Cards klappen vertikal um; das Modulprinzip bleibt unverändert.",
    r: { dichte: 4, dynamik: 3, einfach: 4, story: 2, scan: 5, conv: 3, mobile: 5, inhalte: 5, visuals: 3 }
  },
  {
    n: "12", slug: "12-magazine.html", title: "Magazine Layout",
    claim: "Redaktionelles Raster mit Lead-Story, Spaltensatz und Marginalien.",
    idea: "Aufgebaut wie eine Titelgeschichte: Masthead mit Linien, Kicker, Display-Headline in Serif, mehrspaltiger Fliesstext mit Initial, Randspalte mit Side Notes, ein seitenbreites Zitat, Teasermodule in drei Grössen und Register-Listen für Prozess und Use Cases.",
    gaze: "Masthead → Lead-Headline → Standfirst → Aufmacherbild, danach spaltenweise; Side Notes und Teaser fangen den Blick an definierten Punkten ab.",
    cta: "Primäre CTA im Masthead und in der Meta-Spalte der Lead-Story, final als eingerahmter Anzeigenblock.",
    pro: "Hohe inhaltliche Kapazität bei starker, hochwertiger Anmutung; sehr gutes Storytelling.",
    con: "Aufwendig in Redaktion und Umsetzung; auf kleinen Viewports verliert der Spaltensatz seine Wirkung, Conversion-Druck ist gering.",
    types: "Publisher, Content-Marketing, Marken mit Redaktionsanspruch, Kultur, Agenturen mit Thought Leadership.",
    mobile: "Der Spaltensatz wird einspaltig, Marginalien rutschen unter den Text; die Hierarchie trägt dann allein die Typografie.",
    r: { dichte: 5, dynamik: 4, einfach: 2, story: 5, scan: 3, conv: 2, mobile: 3, inhalte: 5, visuals: 4 }
  },
  {
    n: "13", slug: "13-horizontal-strips.html", title: "Horizontal Strips Layout",
    claim: "Eine Folge klar getrennter Streifen, jeder mit eigener Aufgabe.",
    idea: "Elf Streifen über die volle Breite, jeder mit eigener Höhe, Contentbreite (780 bis 100 %), Fläche (weiss, grau, dunkel), Typo-Skala, Raster und Informationsdichte. Ein Streifen enthält eine horizontal scrollbare Use-Case-Leiste, ein anderer nur Zahlen – zusammen ergibt die Folge eine Dramaturgie.",
    gaze: "Streifen für Streifen vertikal; der Wechsel von Fläche und Höhe markiert jeden Themenwechsel unmissverständlich.",
    cta: "Primäre CTA im Hero-Streifen, erneut im dunklen Produktstreifen und im dunklen Abschluss-Streifen.",
    pro: "Sehr klare Gliederung, einfache Erweiterbarkeit, jeder Abschnitt kann eigenständig optimiert oder getestet werden.",
    con: "Ohne bewusste Variation entsteht ein monotoner Streifenstapel; Zusammenhänge zwischen Abschnitten müssen aktiv hergestellt werden.",
    types: "Unternehmenswebsites, SaaS, Dienstleister, klassische Marketing-Seiten mit vielen Themenblöcken.",
    mobile: "Streifen bleiben Streifen: Flächenwechsel und Höhenunterschiede tragen die Gliederung, die Innenraster werden einspaltig, die Use-Case-Leiste bleibt horizontal scrollbar.",
    r: { dichte: 3, dynamik: 3, einfach: 4, story: 4, scan: 4, conv: 4, mobile: 5, inhalte: 4, visuals: 3 }
  }
];

window.CRITERIA = [
  { key: "dichte",  label: "Informationsdichte" },
  { key: "dynamik", label: "Visuelle Dynamik" },
  { key: "einfach", label: "Einfachheit" },
  { key: "story",   label: "Storytelling-Potenzial" },
  { key: "scan",    label: "Scanbarkeit" },
  { key: "conv",    label: "Conversion-Fokus" },
  { key: "mobile",  label: "Eignung für Mobile" },
  { key: "inhalte", label: "Eignung für viele Inhalte" },
  { key: "visuals", label: "Eignung für starke Visuals" }
];

if (typeof module !== "undefined" && module.exports) {
  module.exports = { CONCEPTS: window.CONCEPTS, CRITERIA: window.CRITERIA };
}
