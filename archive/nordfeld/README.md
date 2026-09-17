# NORDFELD – Zehn Wireframe-Konzepte im Vergleich

Zehn gestalterische Richtungen für dieselbe Website, mit **identischem Inhalt und identischer
Informationsarchitektur**. Unterschiedlich sind ausschließlich Raster, Abschnittsgrößen,
Bild-Text-Verhältnis, Navigationsprinzip, Card-Systeme und CTA-Platzierung – damit die Richtungen
direkt vergleichbar bleiben.

**Fidelity:** Low/Mid. Graustufen, Platzhalterflächen für Bilder, Balken für Fließtext, echte
Headlines und Labels. Bewusst **ohne Farbkonzept und ohne ausgearbeitete Illustrationen** –
verglichen werden Layout, Hierarchie und Nutzerführung.

## Briefing-Annahmen

Die Platzhalter im Briefing (`[NAME]`, `[ZIELGRUPPE]`) waren nicht ausgefüllt. Damit alle zehn
Varianten denselben Inhalt tragen können, liegt ein durchgängiger Demo-Fall zugrunde:

| Feld | Annahme |
|---|---|
| Website-Typ | B2B-SaaS- / Produktwebsite |
| Projekt | **NORDFELD** – Plattform für Lieferketten-Transparenz |
| Zielgruppe | Operations-, Einkaufs- und Compliance-Teams im Mittelstand (50–500 MA) |
| Hauptziel | Qualifizierte Leads – gebuchte Produkt-Demos |

Der Inhalt ist in wenigen Minuten austauschbar: Headline, Vorteile, Module, Zitat, Kennzahlen und
FAQ stehen in jedem Quell-Fragment an denselben Stellen.

## Gemeinsame Informationsarchitektur

Navigation → Hero → Vorteile (3) → Leistungen / Module (4) → Social Proof (Logos, Zitat,
Kennzahlen) → Über uns / Vertrauen → FAQ (5) → Abschluss-CTA → Footer

## Aufbau

```
wireframes/
  index.html                   Übersicht mit Struktur-Miniaturen + Vergleichsmatrix
  konzept-01-swiss.html …      Einzelseite je Konzept: Desktop 1440, Mobile 390,
                               nummerierte Annotationen, Einordnung
  assets/wf.css                Wireframe-Kit (Primitives, Dokument-Chrome, Theme-Tokens)
  assets/wf.js                 Maßstabsgetreue Skalierung der 1440-/390-Rahmen
  src/NN-slug.html             Quell-Fragmente (Metadaten, Styles, Desktop, Mobile, Legenden)
dist/
  nordfeld-wireframes.html     Single-File-Fassung: alle 10 Konzepte mit Umschalter
tools/build.py                 Baut Einzelseiten, Übersicht und Single-File-Fassung
```

Öffnen: `wireframes/index.html` im Browser. Nach Änderungen an `wireframes/src/*`:

```bash
python3 tools/build.py
```

Die Rahmen werden verlustfrei per `transform: scale()` in den verfügbaren Platz eingepasst –
die angezeigten Wireframes sind exakt 1440 px bzw. 390 px breit gerechnet.

---

## Die zehn Konzepte

### Konzept 01 – Swiss / International Style
**Designidee:** Das sichtbare 12-Spalten-Raster ist das Gestaltungsmittel. Wirkung entsteht allein
aus Größenkontrast (112 px Headline gegen 15 px Fließtext) und Weißraum.
**Blickführung:** Links oben an der überdimensionierten Headline, über die durchgehende Haarlinie
nach rechts zur kleinen Lead-Spalte, dann von Trennlinie zu Trennlinie nach unten.
**Unterschied:** Einziges Konzept ohne Bild und ohne Button im Hero; Leistungen erscheinen als
Tabellenzeilen statt als Cards.
**Positionierung:** Marken, die Kompetenz und Genauigkeit versprechen und Seriosität über Emotion stellen.

### Konzept 02 – Minimalist / Premium
**Designidee:** Radikale Reduktion – ein Gedanke pro Bildschirm, genau ein Button-Typ auf der
gesamten Seite, durchgehend zentrierte Achse.
**Blickführung:** Rein vertikal auf einer Achse. Weil pro Screen nur ein Element konkurriert,
entsteht ein Takt aus Lesen und Scrollen.
**Unterschied:** Niedrigste Informationsdichte aller zehn Richtungen; die Seite erklärt nicht, sie behauptet.
**Positionierung:** Marken, die über Produktqualität statt über Feature-Listen verkaufen.

### Konzept 03 – Editorial / Magazine
**Designidee:** Die Seite ist eine Ausgabe, kein Funnel: Masthead statt Navigationsleiste,
Aufmacher mit überlappender Headline, dreispaltiger Einstieg mit Initial.
**Blickführung:** Kicker → überlappende Headline → Initial → Textspalten; wechselnde Spaltenbreiten
justieren den Blick immer wieder neu.
**Unterschied:** Einziges Konzept mit mehrspaltigem Fließtext und Masthead – höchste Informationsdichte.
**Positionierung:** Marken, die Autorität durch Inhalt aufbauen und Content als Kern betreiben.

### Konzept 04 – Brutalist / Neo-Brutalist
**Designidee:** Die Konstruktion wird gezeigt: 4-px-Rahmen, harte Schlagschatten, Navigation als
Zellenraster, Hierarchie über Rahmenstärke und Größe statt über Weißraum.
**Blickführung:** Harte Kanten fangen den Blick – XXL-Headline, vollbreiter Button, dann Zelle für
Zelle; das Laufband erzwingt eine horizontale Pause.
**Unterschied:** Keine weichen Übergänge, kein Weißraum als Trennmittel; Buttons bis zu 5× größer
als in allen anderen Varianten.
**Positionierung:** Marken, die bewusst anecken und sich optisch maximal absetzen müssen.

### Konzept 05 – Modern SaaS / Tech
**Designidee:** Jede Sektion beantwortet einen Einwand entlang der Kaufentscheidung. Das Layout ist
bewusst vertraut, damit die Information zählt und nicht die Form.
**Blickführung:** Z-Verlauf – Headline links, Dashboard rechts, über die Trust-Bar nach unten;
alternierende Feature-Blöcke halten den Blick im Zickzack.
**Unterschied:** Einziges Konzept mit doppeltem CTA an jedem Umschlagpunkt und echtem
Produkt-Screenshot im Hero; höchste Erwartungssicherheit, niedrigster Experimentiergrad.
**Positionierung:** Marken im gelernten Kategorie-Wettbewerb, bei denen Erfassungsgeschwindigkeit zählt.

### Konzept 06 – Futuristic / AI Tech
**Designidee:** Die Oberfläche arbeitet mit Ebenen – ein Großmodul wird von kleineren Modulen
überlagert, die aus dem Raster ausbrechen. Das Produkt wirkt wie ein System aus Bauteilen.
**Blickführung:** Schwebende Pill-Navigation hält den Blick oben, die Statuszeile zieht ihn in die
Mitte, die Überlagerungen führen diagonal nach unten; die horizontale Schiene wechselt die Richtung.
**Unterschied:** Einziges Konzept mit echten Überlagerungen und horizontalem Scrollen; der Hero ist
eine Bühne, kein Textblock.
**Positionierung:** Technologieführer, die Innovationskraft zeigen müssen, ohne Seriosität zu verlieren.

### Konzept 07 – Luxury / High-End
**Designidee:** Inszenieren statt erklären. Große Bildflächen bestimmen den Takt, Text erscheint nur
in kleinen, exakt gesetzten Blöcken; 240-px-Abstandsrhythmus.
**Blickführung:** Start im Vollbild, Text unten links in der ruhigsten Ecke, danach ein sehr
langsamer Rhythmus aus Bild, Pause und kleinem Textblock.
**Unterschied:** Navigation vollständig hinter einem Menü; kein einziger gefüllter Button auf der
gesamten Seite – jeder CTA ist eine feine Unterstreichung.
**Positionierung:** Premium- und Luxusmarken, deren Zielgruppe umworben statt überzeugt werden will.

### Konzept 08 – Organic / Human-Centered
**Designidee:** Das Raster wird gelockert: Karten sitzen versetzt, Sektionen enden in Bögen,
Bilder sind organisch maskiert – die Seite wirkt gelegt statt konstruiert.
**Blickführung:** Pendelnd zwischen Text links und organischer Bildform rechts; der Bogen der
Sektionskante führt weiter nach unten, versetzte Karten verlangsamen das Scannen.
**Unterschied:** Einziges Konzept ohne rechtwinklige Sektionsübergänge und ohne durchgehende
Grundlinie; sozialer Beleg über Menschen statt über Logos.
**Positionierung:** Marken, deren Versprechen auf Vertrauen und Empathie beruht.

### Konzept 09 – Bento Grid / Modular
**Designidee:** Jede Information ist ein Modul mit fester Rasterposition – auch der Hero. Gewichtung
entsteht ausschließlich über Kachelgröße und Kontrast.
**Blickführung:** Nicht linear, sondern nach Flächengröße: Headline-Kachel → invertierte CTA-Kachel
→ reihenweise über die kleineren Module. Gleiche Abstände halten das Springen ruhig.
**Unterschied:** Konsequent flach – keine Überlappung, keine Tiefe, kein horizontales Scrollen
(die Gegenprobe zu Konzept 06). Es gibt keinen klassischen Heldenblock.
**Positionierung:** Produktmarken, deren Angebot aus vielen gleichrangigen Bausteinen besteht.

### Konzept 10 – Experimental / Creative Agency
**Designidee:** Spannung durch Richtungswechsel – senkrechte Navigationsschiene, waagerechte
Projektschiene, diagonales Band, Textblöcke mit extremen Einzügen. Lesbarkeit bleibt Bedingung.
**Blickführung:** Die Schiene besetzt den linken Rand, der Blick startet rechts oben an der
überlagerten Headline und fällt diagonal nach unten links; jeder Abschnitt setzt den Einstiegspunkt neu.
**Unterschied:** Einziges Konzept mit Navigation außerhalb des Kopfbereichs und mit Text über
Bildkanten. FAQ und Footer bleiben bewusst ruhig – der Bruch ist Absicht.
**Positionierung:** Kreativdienstleister, deren Website Portfolio und Beweis zugleich ist.

---

## Vergleichsmatrix

1 = niedrig · 5 = hoch

| # | Konzept | Visuelle Wirkung | Modernität | Seriosität | Emotionalität | Info-Dichte | Experiment | Geeignete Branchen / Marken |
|---|---|---|:-:|:-:|:-:|:-:|:-:|---|
| 01 | Swiss | Sachlich, präzise, hochwertig | 4 | 5 | 2 | 4 | 2 | Ingenieurwesen, Architektur, Beratung, Industrie, Hochschule |
| 02 | Minimal | Ruhig, teuer, souverän | 5 | 4 | 3 | 1 | 2 | Premium-Tech, Hardware, Fintech, Medizintechnik |
| 03 | Editorial | Erzählerisch, inhaltsstark | 3 | 4 | 4 | 5 | 3 | Medien, Verlage, Think Tanks, Kultur, NGOs |
| 04 | Brutalist | Laut, selbstbewusst, unangepasst | 4 | 2 | 4 | 3 | 5 | Developer-Tools, Web3, Musik, Streetwear |
| 05 | SaaS | Professionell, erwartungskonform | 4 | 5 | 2 | 4 | 1 | B2B-SaaS, Fintech, HR-Tech, Logistik-Software |
| 06 | Futuristic | Progressiv, technisch, souverän | 5 | 4 | 3 | 3 | 4 | KI- und Datenplattformen, Deep Tech, Security |
| 07 | Luxury | Exklusiv, ruhig, kuratiert | 4 | 5 | 4 | 1 | 3 | Luxusgüter, Immobilien, Hotellerie, Private Banking |
| 08 | Organic | Zugänglich, freundlich, menschlich | 3 | 3 | 5 | 3 | 3 | Health, Education, Nachhaltigkeit, Lifestyle |
| 09 | Bento | Aufgeräumt, systematisch, modern | 5 | 4 | 2 | 4 | 3 | Developer-Tools, Data-/API-Produkte, Consumer-Tech |
| 10 | Experimental | Eigenwillig, gestalterisch stark | 5 | 2 | 4 | 2 | 5 | Design- und Digitalagenturen, Studios, Mode, Kultur |

### Lesehilfe

- **Höchste Seriosität:** 01 Swiss, 05 SaaS, 07 Luxury
- **Höchste Emotionalität:** 08 Organic, dann 03 Editorial / 04 Brutalist / 10 Experimental
- **Höchste Informationsdichte:** 03 Editorial, dann 01 Swiss / 05 SaaS / 09 Bento
- **Höchstes Risiko:** 04 Brutalist und 10 Experimental – starke Differenzierung, aber Seriosität 2/5
- **Sicherste Wahl bei Lead-Zielen:** 05 SaaS; **beste Balance aus modern und seriös:** 09 Bento

### Vorschlag für den nächsten Schritt

Zwei bis drei Richtungen auswählen und auf Mid-/High-Fidelity heben: Farbsystem, Typo-Skala,
echte Inhalte, Komponenten-Inventar. Sinnvolle Paarungen zum Gegentest sind jeweils ein
erwartungskonformer und ein differenzierender Kandidat – etwa 05 gegen 09, oder 01 gegen 10.
