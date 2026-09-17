/* ============================================================================
   PLAYGROUND – Registrierung der Experimente
   Jedes Experiment ist ein Eintrag mit einer build()-Funktion, die ein
   Element zurückgibt. Neues Experiment = ein Eintrag mehr. Kein Registrieren
   an anderer Stelle, keine Reihenfolgeabhängigkeit.
   ========================================================================== */

import { el, env, $$ } from '../lib/dom.js';

const demoLabel = (t) => el('span.pg__label', null, t);

export const EXPERIMENTS = [
  /* ---------------------------------------------------------------- Buttons */
  {
    id: 'buttons', group: 'CTA', title: 'Button-Zustände',
    note: 'Fünf Reaktionen auf denselben Anlass. Alle bleiben als Button erkennbar – das ist die Bedingung, nicht die Kür.',
    build: () => el('div.pg__row', null,
      el('button.xb.xb--fill', { type: 'button' }, el('span', null, 'Hover-Füllung')),
      el('button.xb.xb--slide', { type: 'button' }, el('span', null, 'Hintergrund')),
      el('button.xb.xb--swap', { type: 'button' },
        el('span.xb__a', null, 'Text-Tausch'), el('span.xb__b', null, 'Und zurück')),
      el('button.xb.xb--arrow', { type: 'button' }, 'Pfeil ', el('i', null, '→')),
      el('button.xb.xb--mag', { type: 'button', 'data-magnetic': '0.4' }, el('span', null, 'Magnetisch')))
  },
  /* ------------------------------------------------------------------ Cursor */
  {
    id: 'cursor', group: 'Zeiger', title: 'Zeiger-Verhalten',
    note: 'Zeigerbezogene Effekte brauchen immer eine Entsprechung für Tastatur und Touch. Hier: Fokus erzeugt denselben Zustand.',
    build: () => el('div.pg__row', null,
      el('div.xc.xc--light', { tabindex: '0', 'data-spotlight': '' }, demoLabel('Licht folgt')),
      el('div.xc.xc--tilt', { tabindex: '0', 'data-tilt': '10' }, demoLabel('Neigung')),
      el('div.xc.xc--zoom', { tabindex: '0' }, el('i.xc__img'), demoLabel('Bild-Zoom')),
      el('div.xc.xc--peek', { tabindex: '0' }, demoLabel('Vorschau'), el('i.xc__peek', null, 'Aa')))
  },
  /* ---------------------------------------------------------------- Aufdecken */
  {
    id: 'reveal', group: 'Bewegung', title: 'Aufdeck-Muster',
    note: 'Dieselbe Fläche, vier Arten sie freizugeben. Die Wahl verändert das Tempo der ganzen Seite.',
    build: () => {
      const cell = (cls, t) => el(`div.xr.${cls}`, { tabindex: '0' }, el('i'), demoLabel(t));
      const row = el('div.pg__row', null,
        cell('xr--mask', 'Maske'), cell('xr--wipe', 'Wisch'),
        cell('xr--clip', 'Clip-Path'), cell('xr--split', 'Zweiteilig'));
      return row;
    }
  },
  /* ------------------------------------------------------------------- Typo */
  {
    id: 'type', group: 'Typografie', title: 'Typografische Bewegung',
    note: 'Bewegung an der Schrift ist riskant: Sie darf das Lesen nie verzögern. Deshalb hier nur Zustände, keine Dauerschleifen.',
    build: () => el('div.pg__stack', null,
      el('p.xt.xt--stagger', { tabindex: '0' },
        ...'Zeichen für Zeichen'.split('').map((ch, i) =>
          el('span', { style: { '--i': i } }, ch === ' ' ? ' ' : ch))),
      el('p.xt.xt--underline', { tabindex: '0' }, 'Unterstreichung, die aus der Mitte wächst'),
      el('p.xt.xt--rotate', { tabindex: '0' },
        el('span.xt__win', null,
          el('span.xt__list', null,
            el('b', null, 'ruhig'), el('b', null, 'laut'), el('b', null, 'teuer'), el('b', null, 'ruhig'))),
        ' — dasselbe Produkt.'))
  },
  /* ------------------------------------------------------------------ Flächen */
  {
    id: 'surface', group: 'Fläche', title: 'Flächen und Tiefe',
    note: 'Vier Wege, Ebenen zu zeigen. Glas ist nur einer davon – und der teuerste.',
    build: () => el('div.pg__row', null,
      el('div.xs.xs--flat', null, demoLabel('Flach')),
      el('div.xs.xs--shadow', null, demoLabel('Schatten')),
      el('div.xs.xs--glass', null, demoLabel('Glas')),
      el('div.xs.xs--hard', null, demoLabel('Harte Kante')))
  },
  /* ------------------------------------------------------------------ Raster */
  {
    id: 'grid', group: 'Raster', title: 'Raster-Verhalten',
    note: 'Klicken schaltet zwischen vier Ordnungen um. Der Wechsel läuft über FLIP – dieselbe Technik, die auch die Vergleichsmatrix sortiert.',
    build: () => {
      const cells = Array.from({ length: 9 }, (_, i) => el('i.xg__c', { style: { '--i': i } }, String(i + 1)));
      const grid = el('div.xg__grid', null, ...cells);
      const modes = ['gleich', 'bento', 'spalten', 'versetzt'];
      let m = 0;
      grid.dataset.mode = modes[0];
      const btn = el('button.pg__btn', { type: 'button', onClick: () => {
        m = (m + 1) % modes.length;
        import('../motion/index.js').then(({ flip }) =>
          flip(cells, () => { grid.dataset.mode = modes[m]; btn.lastChild.textContent = modes[m]; }));
      } }, 'Raster: ', el('b', null, modes[0]));
      return el('div.xg', null, grid, btn);
    }
  },
  /* -------------------------------------------------------------- Navigation */
  {
    id: 'nav', group: 'Navigation', title: 'Navigations-Muster',
    note: 'Drei Umschläge desselben Menüs. Welcher passt, entscheidet die Anzahl der Einträge – nicht der Geschmack.',
    build: () => el('div.pg__stack', null,
      el('div.xn.xn--underline', null, ...['Arbeit', 'Studio', 'Journal', 'Kontakt'].map((t, i) =>
        el('a', { href: '#playground', 'data-on': i === 0 ? '' : null }, t))),
      el('div.xn.xn--pill', null, ...['Alle', 'Marke', 'Digital', 'Produkt'].map((t, i) =>
        el('a', { href: '#playground', 'data-on': i === 0 ? '' : null }, t))),
      el('div.xn.xn--rail', null, ...['01', '02', '03', '04'].map((t, i) =>
        el('a', { href: '#playground', 'data-on': i === 0 ? '' : null }, t))))
  },
  /* ------------------------------------------------------------------ Laden */
  {
    id: 'load', group: 'Zustand', title: 'Lade- und Leerzustände',
    note: 'Der am häufigsten vergessene Teil eines Designsystems. Ohne sie fühlt sich jede Anwendung kaputt an.',
    build: () => el('div.pg__row', null,
      el('div.xl', null, el('i.xl__skel'), el('i.xl__skel'), el('i.xl__skel'), demoLabel('Skelett')),
      el('div.xl', null, el('i.xl__spin'), demoLabel('Fortschritt')),
      el('div.xl', null, el('i.xl__bar'), demoLabel('Determiniert')),
      el('div.xl.xl--empty', null, el('i.xl__empty'), demoLabel('Leer')))
  },
  /* --------------------------------------------------------------- Akkordeon */
  {
    id: 'disclose', group: 'Struktur', title: 'Ein- und Ausklappen',
    note: 'Mit <details> gebaut: Tastatur, Screenreader und Suchen-im-Text funktionieren ohne eine Zeile JavaScript.',
    build: () => el('div.xd', null,
      ...[['Wann lohnt sich ein Akkordeon?', 'Wenn Inhalte gleichrangig und selten alle zugleich gebraucht werden. Nicht, um eine überfüllte Seite zu verstecken.'],
          ['Und wann nicht?', 'Bei Inhalten, die verglichen werden müssen. Vergleichen setzt Gleichzeitigkeit voraus.'],
          ['Was ist mit SEO?', 'Eingeklappter Text wird indexiert, solange er im Markup steht – bei <details> ist das der Fall.']
      ].map(([q, a], i) => el('details.xd__i', { open: i === 0 ? true : null },
        el('summary', null, q), el('p', null, a))))
  },
  /* --------------------------------------------------------------- Laufband */
  {
    id: 'marquee', group: 'Bewegung', title: 'Laufband',
    note: 'Dauerbewegung im Blickfeld ermüdet. Deshalb: bei Hover anhalten, bei „Bewegung reduzieren“ komplett still und scrollbar.',
    build: () => el('div.marquee', { style: { '--marquee-dur': '32s' } },
      el('div.marquee__track', null,
        ...Array.from({ length: 2 }, () =>
          ['Raster', 'Kontrast', 'Rhythmus', 'Hierarchie', 'Weißraum', 'Tempo'].flatMap(t =>
            [el('span.marquee__item', null, t), el('span.marquee__sep', null, '·')])).flat()))
  }
];

export const PLAYGROUND_GROUPS = [...new Set(EXPERIMENTS.map(e => e.group))];
