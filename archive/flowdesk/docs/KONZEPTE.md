# 13 Wireframe-Konzepte — Flowdesk

Dieselbe Website, dreizehn Mal nach unterschiedlichen Layout-Prinzipien gebaut.
Inhalte, Botschaften und Funktionen sind in allen Varianten identisch; verändert wurden
ausschliesslich Informationsarchitektur, visuelle Hierarchie, Anordnung der Elemente,
Contentflächen und Nutzerführung.

## Website-Kontext (Beispiel)

| Feld | Wert |
| --- | --- |
| Website-Typ | SaaS / Produktwebsite (B2B) |
| Unternehmen / Projekt | Flowdesk — Ressourcenplanung für Agenturen |
| Zielgruppe | Agenturleitung, Operations und Projektleitung in Agenturen und Studios mit 8–200 Personen |
| Primäres Ziel | Demo-Buchungen / Leads |
| Primäre CTA | Demo buchen |
| Sekundäre CTA | Produkt-Tour ansehen |

Die Inhalte sind fiktive Beispieldaten. Alle Varianten verwenden denselben Content-Satz:
Header/Navigation, Hero, Value Proposition, primäre und sekundäre CTA, Vorteile, Funktionen,
Produktvisualisierung, Social Proof (Zahlen, Logos, Testimonials), Prozess, Use Cases, FAQ,
Abschluss-CTA und Footer. Die Reihenfolge variiert je nach Layout-Idee.

## Prototypen

- Übersichtsseite mit Umschalter und Vorschau: [`index.html`](../index.html)
- Einzelne Wireframes: [`wireframes/`](../wireframes/)
- Gemeinsame Wireframe-Primitives (Graustufen, Platzhalter, Buttons, Typo-Skala): [`assets/base.css`](../assets/base.css)

Jedes Wireframe ist responsiv und wurde für ca. 1440 px (Desktop) und ca. 390 px (Mobile) ausgelegt.

---

## 01 — Hero Layout

**Ein dominanter Hero trägt die gesamte Botschaft, alles Weitere ordnet sich unter.**

Prototyp: [`wireframes/01-hero.html`](../wireframes/01-hero.html)

- **Grundidee des Layouts:** Der erste Viewport übernimmt die komplette Kernkommunikation: Value Proposition, CTA-Hierarchie, Produktvisualisierung und Social Proof auf einer Ebene. Alle Folgesektionen nehmen im visuellen Gewicht bewusst ab (Typo-Skala, Höhe, Kontrast) und liefern nur noch Belege zur Hero-Story.
- **Blickführung:** Von der übergrossen Headline links zur Produktvisualisierung rechts, zurück zur CTA-Zeile, dann in den Social-Proof-Streifen. Danach vertikal abwärts mit abnehmender Reizstärke.
- **Position der wichtigsten CTA:** Primäre CTA direkt unter der Subheadline im ersten Viewport, wiederholt im Header und als invertierter Abschluss-Block.
- **Vorteil dieser Struktur:** Die Kernbotschaft sitzt innerhalb von Sekunden; sehr hoher Conversion-Fokus ohne Scrollzwang.
- **Mögliche Schwäche dieser Struktur:** Alles hängt an einem einzigen Bereich – ist die Hero-Botschaft unklar, trägt der Rest der Seite nicht. Wenig Platz für differenzierte Zielgruppen.
- **Besonders geeignete Website-Typen:** SaaS-Produktseiten, Landingpages, Startups, Kampagnenseiten.
- **Verhalten auf Mobile:** Hero bleibt dominant, Visual rutscht unter den Text, CTAs werden vollbreit gestapelt; die Reihenfolge Botschaft → Beleg → Handlung bleibt identisch.

## 02 — Z-Pattern Layout

**Der Blick wird diagonal von der Botschaft zur Handlung geführt.**

Prototyp: [`wireframes/02-z-pattern.html`](../wireframes/02-z-pattern.html)

- **Grundidee des Layouts:** Der erste Viewport ist strikt als Z komponiert: Botschaft oben links, Visual oben rechts, Beleg unten links, CTA unten rechts. Die Diagonalen sind als gestrichelte Hilfslinien sichtbar, die Blickpunkte nummeriert. Folgesektionen wiederholen den Z-Takt gespiegelt.
- **Blickführung:** Oben links → oben rechts → diagonal nach unten links → unten rechts. Jede weitere Sektion schwingt in der Gegenrichtung zurück.
- **Position der wichtigsten CTA:** Primäre CTA konsequent am Z-Endpunkt unten rechts, zusätzlich rechts oben im Header als Wiederholung.
- **Vorteil dieser Struktur:** Sehr kontrollierte Nutzerführung; die Handlung liegt exakt dort, wo der Blick endet.
- **Mögliche Schwäche dieser Struktur:** Funktioniert nur bei moderater Inhaltsmenge; bei vielen Inhalten wird das Muster unleserlich und wirkt schematisch.
- **Besonders geeignete Website-Typen:** Kampagnen- und Landingpages, Unternehmenswebsites mit klarem Einzelziel, Lead-Generierung.
- **Verhalten auf Mobile:** Das Z klappt zu einer Treppe: Reihenfolge 1 → 2 → 3 → 4 bleibt erhalten, die Diagonalen entfallen, der CTA-Block wird vollbreit.

## 03 — F-Pattern Layout

**Linke Informationsachse plus starke horizontale Einstiege für schnelles Scannen.**

Prototyp: [`wireframes/03-f-pattern.html`](../wireframes/03-f-pattern.html)

- **Grundidee des Layouts:** Gebaut für Nutzerinnen und Nutzer, die scannen statt lesen: alles linksbündig an einer vertikalen Achse, breite horizontale Überschriftenbalken als Einstiege, Listen statt Fliesstext, eine Sprungnavigation als Stamm des F und eine schmale Randspalte für Meta-Informationen.
- **Blickführung:** Horizontal über den obersten Balken, zurück an die linke Kante, wieder horizontal über den nächsten Balken – mit nach unten abnehmender Lesebreite.
- **Position der wichtigsten CTA:** Primäre CTA im Header, dauerhaft sichtbar in der linken Sprungleiste und im rechten Info-Kasten sowie als horizontaler Abschlussbalken.
- **Vorteil dieser Struktur:** Höchste Scanbarkeit bei sehr vielen Inhalten; Informationen bleiben auch beim Überfliegen verständlich.
- **Mögliche Schwäche dieser Struktur:** Visuell spannungsarm und wenig markenbildend; Bilder und Emotion haben kaum Raum.
- **Besonders geeignete Website-Typen:** Informationsreiche Unternehmenswebsites, B2B-Plattformen, Dokumentation, Wissens- und Support-Bereiche.
- **Verhalten auf Mobile:** Die Achse bleibt links, die Sprungnavigation wird zur horizontal scrollbaren Chip-Leiste, die Randspalte entfällt, Zeilen werden zu gestapelten Blöcken.

## 04 — Grid-Breaking Layout

**Ein sichtbares 12-Spalten-Raster, das an gezielten Stellen gebrochen wird.**

Prototyp: [`wireframes/04-grid-breaking.html`](../wireframes/04-grid-breaking.html)

- **Grundidee des Layouts:** Das Raster wird als leichte Spaltenstruktur sichtbar gemacht und dann bewusst verletzt: Bilder laufen über den Viewport-Rand hinaus, Headlines überlagern Flächen, einzelne Module sind grösser, versetzt oder ragen aus ihrem Container. Die Brüche sind dosiert, die Hierarchie bleibt lesbar.
- **Blickführung:** Grosse Headline zuerst, dann entlang der Bruchstellen: überstehendes Visual rechts, versetzte Kartengruppe, diagonale Prozesstreppe.
- **Position der wichtigsten CTA:** Primäre CTA im Hero unter der gebrochenen Headline, final in einem Kasten, der nach rechts aus dem Container ausbricht.
- **Vorteil dieser Struktur:** Hohe visuelle Dynamik und Wiedererkennbarkeit, ohne die Ordnung ganz aufzugeben.
- **Mögliche Schwäche dieser Struktur:** Anspruchsvoll in Pflege und Responsive-Umsetzung; zu viele Brüche kippen schnell in Unruhe.
- **Besonders geeignete Website-Typen:** Agenturen, Designstudios, Marken- und Kampagnenseiten, Portfolios.
- **Verhalten auf Mobile:** Das Raster löst sich in eine Spalte auf; die Brüche überleben nur als gezielte Randüberläufe von Bildern und CTA-Block.

## 05 — Content-Focused Layout

**Der Text erzeugt die Struktur, die UI tritt vollständig zurück.**

Prototyp: [`wireframes/05-content-focused.html`](../wireframes/05-content-focused.html)

- **Grundidee des Layouts:** Eine ruhige Lesespalte von rund 68 Zeichen, keine Karten, keine Rahmen, kein Button im Header. Struktur entsteht über Zwischenüberschriften, Listen, Definitionslisten, Marginalien-freie Ruhe und wenige erklärende Bilder. CTAs sind in den Lesefluss eingebettet statt als Fläche gesetzt.
- **Blickführung:** Streng vertikal entlang der Lesespalte – Kicker, Headline, Standfirst, dann Abschnitt für Abschnitt.
- **Position der wichtigsten CTA:** Primäre CTA dreifach im Lesefluss: als Metazeile unter dem Titel, als eingebetteter Textblock in der Mitte, als ruhiger Abschluss.
- **Vorteil dieser Struktur:** Höchste Glaubwürdigkeit und Lesbarkeit; ideal für erklärungsbedürftige Angebote und lange Argumentationsketten.
- **Mögliche Schwäche dieser Struktur:** Geringer Conversion-Druck und wenig visuelle Attraktivität; erfordert wirklich gute Texte.
- **Besonders geeignete Website-Typen:** Beratung, Fachdienstleister, Publisher, B2B mit Erklärungsbedarf, persönliche Marken.
- **Verhalten auf Mobile:** Praktisch identisch – die Spalte wird schmaler, sonst ändert sich nichts. Das Konzept ist von Haus aus mobilfest.

## 06 — Fullscreen Image Layout

**Bildschirmfüllende Visuals tragen das Layout, Text liegt als Overlay darauf.**

Prototyp: [`wireframes/06-fullscreen-image.html`](../wireframes/06-fullscreen-image.html)

- **Grundidee des Layouts:** Der erste Viewport ist ein 100-vh-Bild mit Text-Overlay und transparentem Header. Danach wechseln sich Vollbild-Sektionen, Split-Screens und Bildkacheln ab; nur FAQ und Detailinhalte liegen auf ruhiger heller Fläche, damit Lesbarkeit erhalten bleibt.
- **Blickführung:** Zuerst das Bild als Ganzes, dann der Overlay-Text im linken unteren Drittel, danach von Bildfläche zu Bildfläche.
- **Position der wichtigsten CTA:** Primäre CTA als heller Button über dem Hero-Bild, zusätzlich fixierte CTA-Leiste am unteren Rand auf Mobile und als Vollbild-Abschluss.
- **Vorteil dieser Struktur:** Starke emotionale Wirkung und Markenaufladung; Produkt und Kontext werden sofort erlebbar.
- **Mögliche Schwäche dieser Struktur:** Wenig Platz für Inhalt, hohe Anforderungen an Bildqualität, Kontrast und Ladezeit; Text kann untergehen.
- **Besonders geeignete Website-Typen:** Marken- und Produktwebsites, Hospitality, Immobilien, Fashion, Portfolios, Event.
- **Verhalten auf Mobile:** Bilder bleiben bildschirmfüllend, Overlays werden kompakter, Split-Screens stapeln; eine fixierte CTA-Leiste sichert die Handlung ab.

## 07 — Alternating Layout

**Durchgehender Bild-Text-Wechsel erzeugt einen ruhigen Leserhythmus.**

Prototyp: [`wireframes/07-alternating.html`](../wireframes/07-alternating.html)

- **Grundidee des Layouts:** Sektion für Sektion wechselt die Seite zwischen Text links / Bild rechts und umgekehrt. Gegen Monotonie variieren Spaltenverhältnis (50/50, 62/38, 73/27), Bildgrösse, Hintergrundfläche, vertikale Abstände und Informationsdichte; zwei volle Breiten unterbrechen den Takt bewusst.
- **Blickführung:** Zickzack von Textblock zu Bild und zurück, mit klaren Ruhepunkten an den vollbreiten Bändern.
- **Position der wichtigsten CTA:** Primäre CTA im ersten Textblock, danach am Ende einzelner Takte wiederholt, final als eigener Abschlussblock.
- **Vorteil dieser Struktur:** Sehr ausgewogenes Verhältnis von Text und Bild; beliebig erweiterbar, ohne die Ordnung zu verlieren.
- **Mögliche Schwäche dieser Struktur:** Neigt zur Monotonie und wirkt schnell generisch, wenn die Variation zu schwach ausfällt.
- **Besonders geeignete Website-Typen:** Unternehmenswebsites, SaaS, Dienstleister, Produktseiten mit mehreren Argumenten.
- **Verhalten auf Mobile:** Der Wechsel kollabiert zur festen Folge Text → Bild; der Rhythmus entsteht dann über Abstände, Flächen und Dichte.

## 08 — Asymmetrical Layout

**Spannung durch ungleiche Gewichte und grosse Leerräume statt durch Brüche.**

Prototyp: [`wireframes/08-asymmetrical.html`](../wireframes/08-asymmetrical.html)

- **Grundidee des Layouts:** Alles bleibt im Raster, aber nichts ist mittig oder gleich gewichtet: ungleich breite Spalten, Off-Center-Setzung, vertikale Versätze, bewusst leere Spaltenbereiche. Anders als beim Grid-Breaking überlagert oder überläuft nichts – die Wirkung entsteht aus Verhältnis und Leere.
- **Blickführung:** Von der weit links gesetzten Headline über das hochgezogene Visual rechts zu tief versetzten Blöcken – ein bewusst unruhiger, aber geführter Sprungpfad.
- **Position der wichtigsten CTA:** Primäre CTA auffällig tief unter dem Hero-Text gesetzt, im Abschluss als rechtsbündige Buttongruppe gegenüber der Headline.
- **Vorteil dieser Struktur:** Hohe gestalterische Eigenständigkeit und Premium-Anmutung bei ruhiger, luftiger Wirkung.
- **Mögliche Schwäche dieser Struktur:** Leerraum kostet Platz; die Hierarchie ist schwerer zu lesen, Scanbarkeit sinkt spürbar.
- **Besonders geeignete Website-Typen:** Designstudios, Architektur, Premiummarken, Portfolios, Kreativagenturen.
- **Verhalten auf Mobile:** Die Spaltenasymmetrie wird zu einem Einzugs-Rhythmus: Blöcke behalten unterschiedliche Einrückungen, die vertikale Reihenfolge bleibt erhalten.

## 09 — Single Column Layout

**Eine vertikale Achse, eine Reihenfolge, eine Story.**

Prototyp: [`wireframes/09-single-column.html`](../wireframes/09-single-column.html)

- **Grundidee des Layouts:** Sämtliche Inhalte liegen auf einer 720-px-Achse, nichts steht nebeneinander. Dramaturgie entsteht ausschliesslich über Reihenfolge, Sektionshöhe, Flächenwechsel (hell, grau, dunkel) und Schriftgrad; nummerierte Kapitel markieren den Fortschritt.
- **Blickführung:** Rein vertikal, ohne Seitenblicke – der Blick wird durch Sektionsnummern und Grössensprünge getaktet.
- **Position der wichtigsten CTA:** Primäre CTA im Hero, in der dunklen Funktionssektion, im Abschlusskapitel und dauerhaft in einer fixierten CTA-Leiste.
- **Vorteil dieser Struktur:** Maximale Klarheit und Conversion-Führung; identisches Erlebnis auf allen Geräten, sehr einfach zu bauen und zu pflegen.
- **Mögliche Schwäche dieser Struktur:** Lange Scrollwege, geringe Informationsdichte pro Bildschirm; Querverweise und Nebeninhalte finden kaum Platz.
- **Besonders geeignete Website-Typen:** Landingpages, Conversion-Seiten, Storytelling, persönliche Marken, Produktpräsentationen.
- **Verhalten auf Mobile:** Keine Umbauten nötig – das Desktop-Layout ist bereits die mobile Ansicht, nur breiter.

## 10 — Box-Based Layout

**Jede Sektion ist ein sichtbares Panel mit Kopfzeile und verschachtelten Boxen.**

Prototyp: [`wireframes/10-box-based.html`](../wireframes/10-box-based.html)

- **Grundidee des Layouts:** Struktur wird ausgestellt statt angedeutet: Die Seite besteht aus gerahmten Panels auf grauem Grund, jedes mit Label-Kopfzeile. Innerhalb der Panels liegen Unterboxen, Box-Gruppen und KPI-Kacheln – ein modulares, fast dashboardartiges System.
- **Blickführung:** Panel für Panel von oben nach unten; innerhalb eines Panels führt die Kopfzeile den Blick, dann die Boxgruppe.
- **Position der wichtigsten CTA:** Primäre CTA im Header-Panel und im Hero-Panel, final als eigenes dunkles Highlight-Panel.
- **Vorteil dieser Struktur:** Sehr klare Gruppierung; ideal, wenn viele unterschiedliche Inhaltstypen gleichberechtigt nebeneinander stehen.
- **Mögliche Schwäche dieser Struktur:** Wirkt schnell technisch und schwer; viele Rahmen erzeugen visuelles Rauschen und flache Hierarchie.
- **Besonders geeignete Website-Typen:** B2B-Plattformen, Portale, Tools und Dashboards, Intranets, Preis- und Vergleichsseiten.
- **Verhalten auf Mobile:** Die Panels stapeln in einer Spalte; die Rahmen bleiben und übernehmen die Gliederung, die sonst Abstände leisten müssten.

## 11 — Cards Layout

**Die ganze Seite besteht aus modularen Cards in einem Bento-Raster.**

Prototyp: [`wireframes/11-cards.html`](../wireframes/11-cards.html)

- **Grundidee des Layouts:** Jeder Inhalt ist ein eigenständiges Modul: Hero-Card, Produkt-Card, Stat-Cards, Feature-Cards, horizontale Use-Case-Cards, Testimonial-Cards, Ressourcen-Cards, CTA-Card. Das 12-Spalten-Bento mischt 3-, 4-, 6-, 7- und 12-spaltige Karten und verschachtelt Cards in Cards.
- **Blickführung:** Von der grossen Hero-Card zu den kleineren Modulen; innerhalb einer Reihe scannt der Blick über gleichartige Karten.
- **Position der wichtigsten CTA:** Primäre CTA in der Hero-Card und in den Card-Footern einzelner Module, final als dunkle Highlight-Card.
- **Vorteil dieser Struktur:** Extrem skalierbar und redaktionell pflegbar; Inhalte lassen sich ergänzen, umsortieren oder ausblenden, ohne das Layout zu brechen.
- **Mögliche Schwäche dieser Struktur:** Alles wirkt gleich wichtig – ohne Grössenabstufung entsteht kaum Hierarchie und wenig Storytelling.
- **Besonders geeignete Website-Typen:** Plattformen, Marktplätze, Onlineshops, Feature-Übersichten, Ressourcen- und Blogbereiche.
- **Verhalten auf Mobile:** Alle Karten werden vollbreit gestapelt, horizontale Cards klappen vertikal um; das Modulprinzip bleibt unverändert.

## 12 — Magazine Layout

**Redaktionelles Raster mit Lead-Story, Spaltensatz und Marginalien.**

Prototyp: [`wireframes/12-magazine.html`](../wireframes/12-magazine.html)

- **Grundidee des Layouts:** Aufgebaut wie eine Titelgeschichte: Masthead mit Linien, Kicker, Display-Headline in Serif, mehrspaltiger Fliesstext mit Initial, Randspalte mit Side Notes, ein seitenbreites Zitat, Teasermodule in drei Grössen und Register-Listen für Prozess und Use Cases.
- **Blickführung:** Masthead → Lead-Headline → Standfirst → Aufmacherbild, danach spaltenweise; Side Notes und Teaser fangen den Blick an definierten Punkten ab.
- **Position der wichtigsten CTA:** Primäre CTA im Masthead und in der Meta-Spalte der Lead-Story, final als eingerahmter Anzeigenblock.
- **Vorteil dieser Struktur:** Hohe inhaltliche Kapazität bei starker, hochwertiger Anmutung; sehr gutes Storytelling.
- **Mögliche Schwäche dieser Struktur:** Aufwendig in Redaktion und Umsetzung; auf kleinen Viewports verliert der Spaltensatz seine Wirkung, Conversion-Druck ist gering.
- **Besonders geeignete Website-Typen:** Publisher, Content-Marketing, Marken mit Redaktionsanspruch, Kultur, Agenturen mit Thought Leadership.
- **Verhalten auf Mobile:** Der Spaltensatz wird einspaltig, Marginalien rutschen unter den Text; die Hierarchie trägt dann allein die Typografie.

## 13 — Horizontal Strips Layout

**Eine Folge klar getrennter Streifen, jeder mit eigener Aufgabe.**

Prototyp: [`wireframes/13-horizontal-strips.html`](../wireframes/13-horizontal-strips.html)

- **Grundidee des Layouts:** Elf Streifen über die volle Breite, jeder mit eigener Höhe, Contentbreite (780 bis 100 %), Fläche (weiss, grau, dunkel), Typo-Skala, Raster und Informationsdichte. Ein Streifen enthält eine horizontal scrollbare Use-Case-Leiste, ein anderer nur Zahlen – zusammen ergibt die Folge eine Dramaturgie.
- **Blickführung:** Streifen für Streifen vertikal; der Wechsel von Fläche und Höhe markiert jeden Themenwechsel unmissverständlich.
- **Position der wichtigsten CTA:** Primäre CTA im Hero-Streifen, erneut im dunklen Produktstreifen und im dunklen Abschluss-Streifen.
- **Vorteil dieser Struktur:** Sehr klare Gliederung, einfache Erweiterbarkeit, jeder Abschnitt kann eigenständig optimiert oder getestet werden.
- **Mögliche Schwäche dieser Struktur:** Ohne bewusste Variation entsteht ein monotoner Streifenstapel; Zusammenhänge zwischen Abschnitten müssen aktiv hergestellt werden.
- **Besonders geeignete Website-Typen:** Unternehmenswebsites, SaaS, Dienstleister, klassische Marketing-Seiten mit vielen Themenblöcken.
- **Verhalten auf Mobile:** Streifen bleiben Streifen: Flächenwechsel und Höhenunterschiede tragen die Gliederung, die Innenraster werden einspaltig, die Use-Case-Leiste bleibt horizontal scrollbar.

---

## Vergleichsübersicht

Skala 1–5 als **Ausprägung**, nicht als Bewertung: Eine hohe Informationsdichte ist für ein
Wissensportal ein Vorteil und für eine Kampagnenseite ein Nachteil. Die Übersicht beschreibt
deshalb die Unterschiede und benennt bewusst keinen pauschalen Gewinner.

| Konzept | Informationsdichte | Visuelle Dynamik | Einfachheit | Storytelling-Potenzial | Scanbarkeit | Conversion-Fokus | Eignung für Mobile | Eignung für viele Inhalte | Eignung für starke Visuals |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 01 Hero Layout | 3 | 3 | 4 | 3 | 4 | 5 | 4 | 3 | 4 |
| 02 Z-Pattern Layout | 2 | 3 | 4 | 3 | 4 | 5 | 3 | 2 | 3 |
| 03 F-Pattern Layout | 5 | 1 | 3 | 2 | 5 | 3 | 4 | 5 | 1 |
| 04 Grid-Breaking Layout | 3 | 5 | 2 | 4 | 2 | 3 | 2 | 3 | 4 |
| 05 Content-Focused Layout | 4 | 1 | 5 | 4 | 3 | 2 | 5 | 5 | 2 |
| 06 Fullscreen Image Layout | 1 | 5 | 3 | 5 | 2 | 3 | 3 | 1 | 5 |
| 07 Alternating Layout | 3 | 3 | 4 | 4 | 4 | 4 | 5 | 4 | 4 |
| 08 Asymmetrical Layout | 2 | 5 | 2 | 3 | 2 | 3 | 3 | 2 | 4 |
| 09 Single Column Layout | 2 | 2 | 5 | 5 | 4 | 5 | 5 | 3 | 3 |
| 10 Box-Based Layout | 4 | 2 | 4 | 2 | 4 | 3 | 4 | 5 | 2 |
| 11 Cards Layout | 4 | 3 | 4 | 2 | 5 | 3 | 5 | 5 | 3 |
| 12 Magazine Layout | 5 | 4 | 2 | 5 | 3 | 2 | 3 | 5 | 4 |
| 13 Horizontal Strips Layout | 3 | 3 | 4 | 4 | 4 | 4 | 5 | 4 | 3 |

### Ablesehilfe

- **Höchste Informationsdichte:** 03 F-Pattern, 12 Magazine — beide tragen sehr viel Inhalt pro Bildschirm.
- **Höchste visuelle Dynamik:** 04 Grid-Breaking, 06 Fullscreen Image, 08 Asymmetrical.
- **Stärkster Conversion-Fokus:** 01 Hero, 02 Z-Pattern, 09 Single Column — kurze Wege zur primären CTA.
- **Bestes Storytelling:** 06 Fullscreen Image, 09 Single Column, 12 Magazine.
- **Beste Scanbarkeit:** 03 F-Pattern, 11 Cards.
- **Unkritischstes Mobile-Verhalten:** 05 Content-Focused, 07 Alternating, 09 Single Column, 11 Cards, 13 Horizontal Strips.
- **Grösste Kapazität für viele Inhalte:** 03 F-Pattern, 05 Content-Focused, 10 Box-Based, 11 Cards, 12 Magazine.
- **Stärkste Bildwirkung:** 06 Fullscreen Image, danach 01 Hero, 04 Grid-Breaking, 07 Alternating, 08 Asymmetrical, 12 Magazine.

Die Wahl hängt an drei Fragen: Wie viel Inhalt muss die Seite tragen? Wie stark sind die verfügbaren
Visuals? Und wie direkt soll der Weg zur primären CTA sein?
