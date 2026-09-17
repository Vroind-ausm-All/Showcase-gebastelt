/* ============================================================================
   PRISMA – Bootstrap
   Setzt die Seite aus Daten und Komponenten zusammen. Diese Datei enthält
   keine Gestaltung und keine Inhalte: nur die Reihenfolge und die Verdrahtung.
   ========================================================================== */

import { $, el, store, env } from './lib/dom.js';
import { enhance, reveal, scrollProgress } from './motion/index.js';

import { DIRECTIONS } from './data/directions.js';
import { STRUCTURES, STRUCTURE_AXES } from './data/structures.js';
import { METRICS, RADAR_METRICS, CRAFT_METRICS, METRIC_BY_KEY, PILLARS } from './data/criteria.js';
import { TRAITS, TRAIT_BY_KEY } from './data/traits.js';
import { CONTENT_SETS } from './data/content.js';
import { EXPERIMENTS, PLAYGROUND_GROUPS } from './data/playground.js';

import { nav } from './components/nav.js';
import { hero } from './components/hero.js';
import { morphStage } from './components/morph-stage.js';
import { directionCard } from './components/direction-card.js';
import { horizontalGallery } from './components/h-gallery.js';
import { structureIndex } from './components/structure-index.js';
import { compare } from './components/compare.js';
import { scorecard } from './components/scorecard.js';
import { finder } from './components/finder.js';
import { playground } from './components/playground.js';
import { directionDetail } from './components/direction-detail.js';
import { sectionHeader, marquee, modal, initTooltips } from './components/ui.js';

/* --- Abschnitte: eine Liste, aus der Navigation und Marken gespeist werden -- */
const SECTIONS = [
  { id: 'buehne',     no: '01', label: 'Bühne' },
  { id: 'richtungen', no: '02', label: 'Richtungen' },
  { id: 'struktur',   no: '03', label: 'Struktur' },
  { id: 'vergleich',  no: '04', label: 'Vergleich' },
  { id: 'bewertung',  no: '05', label: 'Bewertung' },
  { id: 'beratung',   no: '06', label: 'Beratung' },
  { id: 'playground', no: '07', label: 'Playground' },
  { id: 'system',     no: '08', label: 'System' }
];

/* --- Farbschema ------------------------------------------------------------ */
const root = document.documentElement;
const savedTheme = store.get('prisma-theme');
if (savedTheme) root.dataset.uiTheme = savedTheme;
function toggleTheme() {
  const now = root.dataset.uiTheme
    || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  const next = now === 'dark' ? 'light' : 'dark';
  root.dataset.uiTheme = next;
  store.set('prisma-theme', next);
}

/* --- Modal ----------------------------------------------------------------- */
const dlg = modal({ title: '' });
document.body.appendChild(dlg.root);

const scrollToId = id => document.getElementById(id)
  ?.scrollIntoView({ behavior: env.reduced ? 'auto' : 'smooth', block: 'start' });

/* Vorwärtsdeklarationen – die Abschnitte verweisen aufeinander. */
let stage = null, cmp = null;

function openDirection(dir) {
  dlg.open(directionDetail(dir, {
    metrics: METRICS, radarMetrics: RADAR_METRICS,
    onPick: d => { dlg.close(); pickDirection(d); },
    onCompare: d => { dlg.close(); addToCompare(d); }
  }), `${dir.no} — ${dir.full}`);
  enhance(dlg.root);
}
function pickDirection(dir) {
  const i = DIRECTIONS.findIndex(d => d.id === dir.id);
  scrollToId('buehne');
  setTimeout(() => stage?.goTo(i, true), env.reduced ? 0 : 420);
}
function addToCompare(dir) {
  cmp?.add(dir);
  scrollToId('vergleich');
}

/* ========================================================================== */
/*  AUFBAU                                                                     */
/* ========================================================================== */
const app = $('#app');

/* --- Navigation ------------------------------------------------------------ */
const navbar = nav({ sections: SECTIONS, onTheme: toggleTheme });
/* Vor <main>, aber HINTER dem Sprunglink – sonst ist der erste Tabstopp
   die Navigation und der Sprunglink unerreichbar. */
document.body.insertBefore(navbar.root, app);

/* --- 00 Hero --------------------------------------------------------------- */
const heroC = hero({
  directions: DIRECTIONS,
  onExplore: () => scrollToId('buehne'),
  onCriteria: () => scrollToId('bewertung')
});
app.appendChild(heroC.root);

/* --- Thesenband ------------------------------------------------------------ */
app.appendChild(el('section.thesis', { 'data-tone': 'thesis' },
  el('div.thesis__in', null,
    el('p.thesis__t', { 'data-reveal': 'up' },
      'Kundinnen und Kunden entscheiden selten zwischen ',
      el('i', null, 'gut'), ' und ', el('i', null, 'schlecht'),
      '. Sie entscheiden zwischen Richtungen, die alle funktionieren — und die ',
      el('b', null, 'völlig unterschiedliche Erwartungen erzeugen'),
      '. Diese Seite trennt die beiden Fragen: Was ist handwerklich gut? Und was ist hier richtig?')),
  marquee(DIRECTIONS.map(d => `${d.no} ${d.name}`), { duration: 58 })));

/* --- 01 Bühne -------------------------------------------------------------- */
const secStage = el('section.sec.sec--stage', { id: 'buehne', 'data-tone': 'stage' },
  sectionHeader({
    no: '01', kicker: 'Derselbe Inhalt, zwölfmal gestaltet',
    title: 'Die Bühne',
    lead: 'Der Rahmen bleibt stehen, die Gestaltung wechselt. Inhalt, Reihenfolge und Argumente sind in jeder Richtung identisch — verglichen wird ausschließlich, was die Form daraus macht. Über die Liste, per Scrollen oder mit den Pfeiltasten.',
    aside: el('div.sec__note', null,
      el('b', null, 'Im Gespräch:'),
      ' Wechseln Sie den Inhalt zwischen B2B-Produkt und Kreativstudio. Dieselben zwölf Richtungen tragen beide — aber nicht gleich gut.')
  }));
stage = morphStage({
  directions: DIRECTIONS, contentSets: CONTENT_SETS, metrics: METRICS,
  onOpen: openDirection
});
secStage.appendChild(stage.root);
app.appendChild(secStage);

/* --- 02 Richtungen --------------------------------------------------------- */
const gallery = horizontalGallery(
  DIRECTIONS.map(d => directionCard(d, {
    metrics: METRICS, onOpen: openDirection, onCompare: addToCompare, onPick: pickDirection
  })),
  { label: 'Gestaltungsrichtungen' }
);
app.appendChild(el('section.sec.sec--gallery', { id: 'richtungen', 'data-tone': 'gallery' },
  sectionHeader({
    no: '02', kicker: 'Zwölf Richtungen im Überblick',
    title: 'Die Galerie',
    lead: 'Jede Karte reagiert anders auf den Zeiger — das ist Absicht. Die Interaktion gehört zur Richtung: Brutalismus ruckt, Luxus deckt langsam auf, Console tippt. Wie sich etwas anfühlt, ist Teil dessen, was es behauptet.',
    aside: el('div.sec__note', null, el('b', null, 'Bedienung:'), ' Waagerecht scrollen, wischen oder mit ← → blättern. Klick öffnet die Details.')
  }),
  gallery.root));

/* --- 03 Struktur ----------------------------------------------------------- */
const sidx = structureIndex({ structures: STRUCTURES, axes: STRUCTURE_AXES });
app.appendChild(el('section.sec.sec--structure', { id: 'struktur', 'data-tone': 'structure' },
  sectionHeader({
    no: '03', kicker: 'Die zweite Achse',
    title: 'Struktur ist nicht Stil',
    lead: '„Editorial“ sagt, wie eine Seite aussieht. „F-Pattern“ sagt, wie sie geordnet ist. Beides ist unabhängig wählbar — deshalb steht die Struktur hier als eigene Achse. Dreizehn Ordnungsprinzipien, jedes als lauffähiger Prototyp hinterlegt.',
    aside: el('div.sec__note', null, el('b', null, 'Herkunft:'), ' Diese dreizehn Prototypen stammen unverändert aus der Wireframe-Studie und sind über jede Zeile im Original zu öffnen.')
  }),
  sidx.root));

/* --- 04 Vergleich ---------------------------------------------------------- */
cmp = compare({
  directions: DIRECTIONS, metrics: METRICS,
  radarMetrics: RADAR_METRICS, craftMetrics: CRAFT_METRICS
});
app.appendChild(el('section.sec.sec--compare', { id: 'vergleich', 'data-tone': 'compare' },
  sectionHeader({
    no: '04', kicker: 'Zwei Richtungen, drei Lesarten',
    title: 'Der Vergleich',
    lead: 'Nebeneinander sieht man Unterschiede. Übereinander sieht man, wie groß sie sind. Das Profil sagt, worin genau. Alle drei Ansichten zeigen dieselben zwei Richtungen mit demselben Inhalt.',
    aside: el('div.sec__note', null, el('b', null, 'Regler:'), ' Ziehen, wischen oder mit ← → steuern. Der Ausschnitt bleibt in beiden Hälften identisch.')
  }),
  cmp.root));

/* --- 05 Bewertung ---------------------------------------------------------- */
const score = scorecard({
  pillars: PILLARS, directions: DIRECTIONS,
  metricByKey: METRIC_BY_KEY, onPick: pickDirection
});
app.appendChild(el('section.sec.sec--score', { id: 'bewertung', 'data-tone': 'score' },
  sectionHeader({
    no: '05', kicker: 'Woran messen wir gutes Design?',
    title: 'Sieben Dimensionen',
    lead: 'Geschmack ist kein Argument, aber Kriterien sind eins. Diese sieben Dimensionen rechnen mit denselben Achsen wie der Vergleich — Bewertung und Vergleich können sich deshalb nicht widersprechen.',
    aside: el('div.sec__note', null, el('b', null, 'Zu lesen als:'), ' keine Rangliste. Eine Richtung, die in „Conversion“ schwach ist, kann in „Emotionale Wirkung“ führend sein. Welche Dimension zählt, entscheidet das Projekt.')
  }),
  score.root));

/* --- 06 Beratung ----------------------------------------------------------- */
const find = finder({
  traits: TRAITS, directions: DIRECTIONS, traitByKey: TRAIT_BY_KEY,
  onOpen: openDirection, onPick: pickDirection
});
app.appendChild(el('section.sec.sec--finder', { id: 'beratung', 'data-tone': 'finder' },
  sectionHeader({
    no: '06', kicker: 'Für das Kundengespräch',
    title: 'Welche Richtung passt?',
    lead: 'Merkmale auswählen, Reihenfolge ablesen. Die Empfehlung ist bewusst regelbasiert und offengelegt: Neben jedem Ergebnis steht, warum es dort steht — und was dagegen spricht.',
    aside: el('div.sec__note', null, el('b', null, 'Ehrlich bleiben:'), ' Widersprüchliche Merkmale werden nicht weggerechnet, sondern benannt. „Seriös und experimentell“ ist möglich, kostet aber etwas.')
  }),
  find.root));

/* --- 07 Playground --------------------------------------------------------- */
const pg = playground({ experiments: EXPERIMENTS, groups: PLAYGROUND_GROUPS });
app.appendChild(el('section.sec.sec--playground', { id: 'playground', 'data-tone': 'playground' },
  sectionHeader({
    no: '07', kicker: 'Werkbank',
    title: 'Playground',
    lead: 'Bausteine, die nicht in jedes Projekt gehören, aber in manche. Alles hier ist einzeln herauslösbar und einzeln löschbar — deshalb liegt es in einer eigenen Registrierung statt verstreut im Code.',
    aside: el('div.sec__note', null, el('b', null, 'Regel:'), ' Ein Effekt kommt hinein, wenn er Verständnis, Vergleich, Führung oder Erinnerung verbessert. Nicht, weil er geht.')
  }),
  pg.root));

/* --- 08 System ------------------------------------------------------------- */
app.appendChild(el('section.sec.sec--system', { id: 'system', 'data-tone': 'system' },
  sectionHeader({
    no: '08', kicker: 'Fundament für die nächsten Projekte',
    title: 'Das System',
    lead: 'Diese Seite ist nicht nur eine Präsentation, sondern ihr eigener Beweis: Sie ist aus dem System gebaut, das sie zeigt. Eine neue Richtung kostet zwei Einträge — einen in den Daten, einen im Theme.'
  }),
  el('div.sys', null,
    el('div.sys__cols', null,
      ...[
        ['Tokens', 'css/01-tokens.css', 'Raum, Typo, Farbe, Bewegung, Tiefe, Ebenen. Die Rahmenebene nutzt --ui-*, die Musterebene --s-*. Beide stören sich nicht.'],
        ['Bewegung', 'app/motion/', 'reveal · stagger · parallax · magnetic · tilt · spotlight · counter · scrollProgress · flip. Nur transform und opacity, überall mit Rückfall auf Stillstand.'],
        ['Richtungen', 'css/10-directions.css', 'Zwölf Theme-Blöcke. Jeder überschreibt denselben Token-Vertrag; nur wenige Regeln je Richtung sind strukturell.'],
        ['Komponenten', 'app/components/', 'Specimen, BrowserFrame, DirectionCard, MorphStage, Compare, Radar, Scorecard, Finder, HorizontalGallery, Modal, Tooltip, RatingBar, Marquee, Nav.'],
        ['Daten', 'app/data/', 'Richtungen, Strukturen, Kriterien, Merkmale, Inhalte, Experimente. Keine Komponente kennt Inhalte — sie bekommt sie übergeben.'],
        ['Archiv', 'archive/', '23 Original-Wireframes aus beiden Repositories, vollständig erhalten und aus der Seite heraus erreichbar.']
      ].map(([h, path, body], i) => el('article.sys__card', { 'data-reveal': 'up', 'data-reveal-delay': i * 70 },
        el('h3.sys__h', null, h),
        el('code.sys__path', null, path),
        el('p.sys__b', null, body)))),

    el('div.sys__add', { 'data-reveal': 'up' },
      el('h3.sys__addh', null, 'Eine dreizehnte Richtung ergänzen'),
      el('ol.sys__steps', null,
        el('li', null, el('code', null, 'app/data/directions.js'), ' — ein Objekt mit Texten, ', el('code', null, 'scores'), ' und ', el('code', null, 'traits'), '.'),
        el('li', null, el('code', null, 'css/10-directions.css'), ' — ein Block ', el('code', null, '[data-direction="…"]'), ' mit den Tokens, die abweichen.'),
        el('li', null, 'Fertig. Bühne, Galerie, Vergleich, Bewertung und Beratung nehmen sie automatisch auf.')),
      el('p.sys__addnote', null, 'Aurora und Console wurden genau so ergänzt — sie stammen nicht aus dem Bestand.')))));

/* --- Fuß ------------------------------------------------------------------- */
app.appendChild(el('footer.foot', null,
  el('div.foot__in', null,
    el('div.foot__brand', null,
      el('span.foot__mark', { 'aria-hidden': 'true' }),
      el('span.foot__name', null, 'PRISMA'),
      el('p.foot__claim', null, 'Ein Inhalt. Zwölf Richtungen. Zwölf Wirkungen.')),
    el('nav.foot__nav', { 'aria-label': 'Abschnitte' },
      ...SECTIONS.map(s => el('a', { href: `#${s.id}` }, el('i', null, s.no), s.label))),
    el('div.foot__arch', null,
      el('h4', null, 'Archiv'),
      el('a', { href: 'archive/nordfeld/index.html' }, 'NORDFELD — 10 Wireframe-Konzepte ↗'),
      el('a', { href: 'archive/flowdesk/showcase.html' }, 'Flowdesk — 13 Layout-Konzepte ↗'),
      el('a', { href: 'archive/flowdesk/docs/KONZEPTE.md' }, 'Konzept-Dokumentation ↗'))),
  el('p.foot__meta', null,
    'Alle Inhalte sind fiktive Beispieldaten. Gebaut ohne Framework und ohne Abhängigkeiten — Tokens, Komponenten und Bewegungssystem sind für Folgeprojekte gedacht.')));

/* ========================================================================== */
/*  AKTIVIERUNG                                                                */
/* ========================================================================== */
initTooltips(document.body);
enhance(document.body);

/* Nachziehen, wenn Komponenten später Inhalte einsetzen.
   Gebündelt: Ohne Entprellung liefe bei jedem neu gerenderten Muster ein
   Volldurchlauf über alle [data-reveal] der Seite. reveal() selbst ist
   idempotent (data-reveal-bound), der Scan wäre trotzdem die Arbeit. */
let revealQueued = false;
new MutationObserver(() => {
  if (revealQueued) return;
  revealQueued = true;
  requestAnimationFrame(() => { revealQueued = false; reveal(app); });
}).observe(app, { childList: true, subtree: true });

/* Umgebungswechsel (Systemeinstellung „Bewegung reduzieren“, Zeigerart) */
env.onChange(() => { if (env.reduced) document.querySelectorAll('[data-reveal]').forEach(n => n.classList.add('is-in')); });

document.body.dataset.ready = 'yes';
