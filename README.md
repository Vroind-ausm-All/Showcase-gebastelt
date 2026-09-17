# PRISMA — Ein Inhalt. Zwölf Richtungen.

Eine interaktive Design-Bibliothek, ein Vergleichswerkzeug und ein
Beratungsinstrument in einer Seite — entstanden aus der Zusammenführung von
[`Designs`](https://github.com/Vroind-ausm-All/Designs) (NORDFELD, zehn
Gestaltungsrichtungen) und
[`Designs-Wireframes`](https://github.com/Vroind-ausm-All/Designs-Wireframes)
(Flowdesk, dreizehn Layout-Strukturen).

Die These der Seite: **Inhalt und Gestaltung sind trennbar.** Derselbe Text,
dieselbe Informationsarchitektur, dieselben Argumente — zwölfmal gestaltet,
zwölf völlig verschiedene Erwartungen. Das wird hier nicht behauptet, sondern
live vorgeführt: Die Musterseite wird beim Richtungswechsel **nicht neu
gerendert**, es wechselt ausschließlich ein Attribut.

## Ansehen

**[vroind-ausm-all.github.io/Showcase-gebastelt](https://vroind-ausm-all.github.io/Showcase-gebastelt/)**

Veröffentlicht über GitHub Pages (`.github/workflows/pages.yml`). Jeder Push auf
`main` veröffentlicht neu — die Seite ist statisch, es wird nur hochgeladen.

## Lokal starten

```bash
python3 -m http.server 8000
# dann http://localhost:8000 öffnen
```

Kein Build, keine Abhängigkeiten, kein Paketmanager. Reine ES-Module, modernes
CSS. Ein lokaler Server ist nötig, weil ES-Module über `file://` nicht laden.

## Die beiden Achsen

Die zentrale Einsicht aus der Zusammenführung: Die beiden Ursprungs-Repositories
beschreiben **verschiedene, voneinander unabhängige Dinge**.

| Achse | Frage | Herkunft | Anzahl |
|---|---|---|---|
| **Richtung** | Wie sieht es aus? | `Designs` | 12 |
| **Struktur** | Wie ist es geordnet? | `Designs-Wireframes` | 13 |

„Editorial" ist eine Richtung, „F-Pattern" eine Struktur. Fast jede Kombination
ist möglich. Deshalb stehen beide als eigene Abschnitte nebeneinander statt in
einer gemeinsamen Liste.

## Aufbau der Seite

| § | Abschnitt | Was dort passiert |
|---|---|---|
| 01 | **Bühne** | Festgesetzter Browserrahmen, Richtung wechselt beim Scrollen. Inhalt umschaltbar zwischen B2B-Produkt und Kreativstudio. |
| 02 | **Galerie** | Waagerechte Schiene, zwölf Karten. Jede Karte hat eine *andere* Hover-Interaktion — die Interaktion gehört zur Richtung. |
| 03 | **Struktur** | Register der dreizehn Ordnungsprinzipien mit Strukturdiagrammen, verlinkt auf die Original-Prototypen. |
| 04 | **Vergleich** | Überblenden (Regler), Nebeneinander, Profil (Netzdiagramm + größte Unterschiede). |
| 05 | **Bewertung** | Sieben Dimensionen, die mit denselben Achsen rechnen wie der Vergleich. |
| 06 | **Beratung** | Merkmale wählen → gereihte Empfehlung mit offengelegtem Rechenweg und benannten Zielkonflikten. |
| 07 | **Playground** | Zehn herauslösbare Experimente zu Bewegung, Zeiger, Fläche, Raster, Zustand. |
| 08 | **System** | Wie das Ganze gebaut ist und wie eine dreizehnte Richtung dazukommt. |

## Projektstruktur

```
index.html                 Gerüst; der Inhalt entsteht in app/main.js
app/
  main.js                  Reihenfolge und Verdrahtung – keine Gestaltung, keine Inhalte
  lib/dom.js               $, el(), Umgebungsabfragen, localStorage mit Fallback
  motion/index.js          reveal · stagger · parallax · magnetic · tilt · spotlight
                           counter · scrollProgress · flip · inView
  data/
    directions.js          die zwölf Richtungen (Texte, scores, traits)
    structures.js          die dreizehn Layout-Strukturen
    criteria.js            12 Bewertungsachsen + 7 Dimensionen
    traits.js              Merkmale und Empfehlungslogik
    content.js             die zwei Inhaltssätze
    playground.js          Registrierung der Experimente
  components/
    specimen.js            die Musterseite — das Herzstück
    browser-frame.js       Rahmen + maßstabsgetreue Einpassung
    morph-stage.js  compare.js  radar.js  scorecard.js  finder.js
    direction-card.js  direction-detail.js  structure-index.js
    h-gallery.js  playground.js  nav.js  hero.js  ui.js
css/
  01-tokens.css            Raum, Typo, Farbe, Bewegung, Tiefe, Ebenen
  02-reset.css  03-motion.css  04-chrome.css
  05-specimen.css          Basisschicht + Token-Vertrag der Musterseite
  06-sections.css  07-playground.css
  10-directions.css        die zwölf Theme-Blöcke
archive/
  nordfeld/                10 Konzepte + Quellfragmente + Build-Skript (unverändert)
  flowdesk/                13 Prototypen + Showcase + Dokumentation (unverändert)
```

## Das Richtungs-System

Eine Richtung ist **Daten plus Tokens**, sonst nichts.

`app/components/specimen.js` rendert einen Inhalt in eine semantisch neutrale
Struktur. `css/05-specimen.css` legt den Token-Vertrag fest.
`css/10-directions.css` überschreibt ihn je Richtung:

```css
[data-direction="brutalist"] {
  --s-bg: #f3f0e7;  --s-ink: #000;  --s-accent: #1f36ff;
  --s-title-size: 104px;  --s-title-weight: 900;  --s-title-tt: uppercase;
  --s-radius: 0px;  --s-card-shadow: 8px 8px 0 #000;
  /* … */
}
```

### Eine dreizehnte Richtung ergänzen

1. **`app/data/directions.js`** — ein Objekt mit Texten, `scores` (12 Achsen,
   1–5) und `traits` (Affinität 0–3 zu den zehn Merkmalen).
2. **`css/10-directions.css`** — ein Block `[data-direction="…"]` mit den
   Tokens, die abweichen.

Mehr nicht. Bühne, Galerie, Vergleich, Bewertung und Beratung ziehen sich alles
Weitere aus den Daten. **Aurora** und **Console** sind genau so entstanden — sie
stammen nicht aus dem Bestand, sondern wurden ergänzt, um zu zeigen, was es
kostet.

## Bewertung und Vergleich hängen zusammen

Die sieben Dimensionen in § 05 sind keine zweite, unabhängige Meinung: Jede
bündelt Achsen aus `criteria.js` und rechnet daraus einen Wert. Bewertung und
Vergleich können sich deshalb nicht widersprechen.

Die Werte sind **beschreibend, nicht wertend**: `emotion: 1` bei „Console" heißt
nicht schlecht, sondern sachlich. Welche Achse zählt, entscheidet das Projekt.

## Beratungslogik

Bewusst regelbasiert und offengelegt — eine Blackbox wäre im Kundengespräch
wertlos, weil man ihr nicht widersprechen kann.

```
Punkte = Σ Affinität(Richtung, Merkmal) über alle gewählten Merkmale
```

Neben jedem Ergebnis steht, welches Merkmal wie stark beigetragen hat, und was
gegen die Richtung spricht. Widersprüchliche Merkmalskombinationen werden nicht
weggerechnet, sondern benannt.

## Zugänglichkeit und Bewegung

Geprüft mit headless Chromium bei 390 / 768 / 1024 / 1440 / 1920 px:

- kein horizontales Scrollen auf keiner Breite
- Tastaturbedienung durchgängig; Sprunglink als erster Tabstopp; sichtbarer Fokus
- ein `h1`, keine übersprungenen Überschriftenebenen, benannte Landmarks
- alle Bedienelemente und Eingaben haben einen zugänglichen Namen
- **WCAG AA für Kleintext in beiden Farbschemata** (Rahmenebene)
- `prefers-reduced-motion`: kein Element bleibt unsichtbar, Laufbänder stehen
  still, der Hero wechselt nicht mehr selbsttätig

Die Musterseiten sind davon bewusst ausgenommen: Sie tragen `role="img"` mit
Beschreibung und sind für Hilfstechnologie **ein Bild**, keine zweite Website.
Ihre Farben gehören zur Richtung — ein dunkles „Luxury" bleibt dunkel,
unabhängig vom Farbschema der Betrachterin.

## Was aus den Ursprungs-Repositories übernommen wurde

**Übernommen und weiterentwickelt**

- die zehn NORDFELD-Richtungen samt Begründungstexten (Designidee,
  Blickführung, Unterscheidung, Positionierung) — jetzt als Datensatz
- die dreizehn Flowdesk-Layout-Strukturen samt Bewertungen — jetzt als zweite Achse
- das Prinzip der maßstabsgetreuen Rahmen (`transform: scale()`) aus beiden Repos
- der Gedanke „identischer Inhalt, unterschiedliche Form" aus beiden Repos
- die Platzhalter-Primitives (Flächen, Textlinien, UI-Attrappe) — als Komponenten
  statt als Utility-Klassen

**Zusammengeführt**

- zwei Bewertungssysteme (5 Achsen bei NORDFELD, 9 bei Flowdesk) zu **einem** mit
  12 Achsen und 7 Dimensionen
- zwei Showcase-Oberflächen zu einer Erzählung
- zwei Farb-/Token-Sätze zu einer Token-Ebene mit getrennter Rahmen- und Musterschicht

**Ersetzt**

- die Python-Build-Pipeline für Einzelseiten — Richtungen entstehen jetzt zur
  Laufzeit aus Tokens statt beim Build aus Fragmenten
  (das Original-Skript liegt weiter unter `archive/nordfeld/tools/build.py`)
- die Graustufen-Fidelity — die Wireframes bleiben im Archiv, die Bühne zeigt
  ausgearbeitete Richtungen, weil Farbe hier zum Vergleichsgegenstand gehört
- die zwei getrennten Einstiegsseiten je Repository

**Erhalten**

Alle 23 Original-Wireframes liegen vollständig und lauffähig unter `archive/`
und sind aus der Seite heraus verlinkt.

---

Alle Inhalte sind fiktive Beispieldaten.
