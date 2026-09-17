/* ============================================================================
   Compare – Vergleichsmodus
   Zwei Richtungen, drei Lesarten desselben Datensatzes:

     Überblendung  ein Schieberegler zwischen beiden Mustern (gleicher Ausschnitt)
     Nebeneinander zwei Rahmen gleichzeitig
     Profil        Netzdiagramm + Differenzliste

   Der Schieberegler ist ein echtes <input type="range">: Tastatur, Touch und
   Screenreader funktionieren, ohne dass irgendetwas nachgebaut werden musste.
   ========================================================================== */

import { el, clamp, env } from '../lib/dom.js';
import { renderSpecimen } from './specimen.js';
import { BrowserFrame } from './browser-frame.js';
import { radar } from './radar.js';
import { ratingBar, segmented } from './ui.js';

const COLORS = ['var(--sp-a)', 'var(--sp-d)'];

export function compare({ directions, metrics, radarMetrics, craftMetrics, contentId = 'nordfeld' }) {
  let a = directions.find(d => d.id === 'swiss') || directions[0];
  let b = directions.find(d => d.id === 'brutalist') || directions[1];
  let mode = 'overlay';

  /* --- Auswahl ------------------------------------------------------------ */
  const mkSelect = (side) => {
    const sel = el('select.cmp__select', {
      'aria-label': side === 'a' ? 'Richtung A wählen' : 'Richtung B wählen',
      onChange: e => { setSide(side, e.target.value); }
    }, ...directions.map(d => el('option', { value: d.id }, `${d.no} — ${d.full}`)));
    return sel;
  };
  const selA = mkSelect('a'), selB = mkSelect('b');
  selA.value = a.id; selB.value = b.id;

  const swap = el('button.cmp__swap', {
    type: 'button', 'aria-label': 'Richtungen tauschen', 'data-tip': 'Tauschen',
    onClick: () => { const t = a; setSide('a', b.id); setSide('b', t.id); }
  }, '⇄');

  /* --- Überblendung -------------------------------------------------------- */
  /* Schmal: Mobile-Ansicht, sonst wäre das Muster auf ein Viertel geschrumpft. */
  const initialView = env.narrow ? 'mobile' : 'desktop';
  const frameA = new BrowserFrame({ viewport: initialView, height: 500, chrome: false });
  const frameB = new BrowserFrame({ viewport: initialView, height: 500, chrome: false });
  frameA.mount(renderSpecimen(a.id, contentId));
  frameB.mount(renderSpecimen(b.id, contentId));

  const layerB = el('div.cmp__layer.cmp__layer--b', null, frameB.root);
  const handle = el('div.cmp__handle', { 'aria-hidden': 'true' }, el('i'), el('span', null, '⇄'));
  const range = el('input.cmp__range', {
    type: 'range', min: '0', max: '100', value: '50', step: '0.5',
    'aria-label': 'Überblendung zwischen Richtung A und B',
    onInput: e => setSplit(+e.target.value)
  });

  const overlay = el('div.cmp__overlay', null,
    el('div.cmp__layer.cmp__layer--a', null, frameA.root),
    layerB, handle, range,
    el('span.cmp__badge.cmp__badge--a'),
    el('span.cmp__badge.cmp__badge--b'));

  function setSplit(pct) {
    const p = clamp(pct, 0, 100);
    overlay.style.setProperty('--split', p + '%');
  }
  setSplit(50);

  /* --- Nebeneinander -------------------------------------------------------- */
  const frameSA = new BrowserFrame({ viewport: initialView, height: 460 });
  const frameSB = new BrowserFrame({ viewport: initialView, height: 460 });
  const side = el('div.cmp__side', null,
    el('div.cmp__sidecol', null, el('span.cmp__sidetag.cmp__sidetag--a'), frameSA.root),
    el('div.cmp__sidecol', null, el('span.cmp__sidetag.cmp__sidetag--b'), frameSB.root));

  /* --- Profil ---------------------------------------------------------------- */
  const chart = radar({
    metrics: radarMetrics,
    series: [
      { id: a.id, label: a.name, scores: a.scores, color: COLORS[0] },
      { id: b.id, label: b.name, scores: b.scores, color: COLORS[1] }
    ],
    size: 440
  });
  const deltaList = el('div.cmp__deltas');
  const craftList = el('div.cmp__craft');
  const profile = el('div.cmp__profile', null,
    el('div.cmp__chart', null, chart.root),
    el('div.cmp__facts', null,
      el('h3.cmp__factsh', null, 'Wo sie am weitesten auseinanderliegen'),
      deltaList,
      el('h3.cmp__factsh', null, 'Handwerk'),
      craftList));

  /* --- Ansichtsumschalter ----------------------------------------------------- */
  const modes = segmented({
    label: 'Darstellung wählen',
    value: 'overlay',
    options: [
      { value: 'overlay', label: 'Überblenden', hint: 'Ein Regler, derselbe Ausschnitt' },
      { value: 'side',    label: 'Nebeneinander', hint: 'Beide Muster gleichzeitig' },
      { value: 'profile', label: 'Profil', hint: 'Netzdiagramm und Kennzahlen' }
    ],
    onChange: m => setMode(m)
  });

  const panels = el('div.cmp__panels', null, overlay, side, profile);
  const root = el('div.cmp', null,
    el('div.cmp__head', null,
      el('div.cmp__pick', null,
        el('span.cmp__pickdot', { 'data-side': 'a' }), selA, swap,
        el('span.cmp__pickdot', { 'data-side': 'b' }), selB),
      modes.root),
    panels,
    el('p.cmp__verdict'));

  const verdict = root.querySelector('.cmp__verdict');

  /* --- Zustand --------------------------------------------------------------- */
  function setSide(which, id) {
    const dir = directions.find(d => d.id === id);
    if (!dir) return;
    if (which === 'a') { a = dir; selA.value = id; } else { b = dir; selB.value = id; }
    render();
  }

  function setMode(m) {
    mode = m;
    root.dataset.mode = m;
    // Rahmen erst füllen, wenn die Ansicht sichtbar ist – spart Arbeit beim Start.
    if (m === 'side') {
      frameSA.mount(renderSpecimen(a.id, contentId));
      frameSB.mount(renderSpecimen(b.id, contentId));
      requestAnimationFrame(() => { frameSA.fit(); frameSB.fit(); });
    }
    if (m === 'overlay') requestAnimationFrame(() => { frameA.fit(); frameB.fit(); });
  }

  function render() {
    frameA.mount(renderSpecimen(a.id, contentId));
    frameB.mount(renderSpecimen(b.id, contentId));
    if (mode === 'side') {
      frameSA.mount(renderSpecimen(a.id, contentId));
      frameSB.mount(renderSpecimen(b.id, contentId));
    }
    root.style.setProperty('--label-a', JSON.stringify(a.name));
    root.style.setProperty('--label-b', JSON.stringify(b.name));

    chart.update(0, a.scores, a.name, COLORS[0]);
    chart.update(1, b.scores, b.name, COLORS[1]);

    /* Die drei größten Unterschiede – das ist die eigentliche Antwort. */
    const deltas = radarMetrics
      .map(m => ({ m, d: (a.scores[m.key] || 0) - (b.scores[m.key] || 0) }))
      .filter(x => x.d !== 0)
      .sort((x, y) => Math.abs(y.d) - Math.abs(x.d))
      .slice(0, 4);

    deltaList.replaceChildren(...(deltas.length ? deltas.map(({ m, d }) => {
      const winner = d > 0 ? a : b;
      return el('div.cmp__delta', { 'data-side': d > 0 ? 'a' : 'b' },
        el('span.cmp__deltam', null, m.label),
        el('span.cmp__deltabar', { 'aria-hidden': 'true' },
          el('i', { style: { '--w': (Math.abs(d) / 4 * 100) + '%' } })),
        el('span.cmp__deltav', null, `${winner.name} +${Math.abs(d)}`));
    }) : [el('p.cmp__none', null, 'Beide Richtungen sind auf allen acht Achsen gleich bewertet.')]));

    craftList.replaceChildren(...craftMetrics.map(m => el('div.cmp__craftrow', null,
      el('span.cmp__craftl', null, m.label),
      el('span.cmp__craftv', { 'data-side': 'a' }, String(a.scores[m.key])),
      el('span.cmp__craftbar', { 'aria-hidden': 'true' },
        el('i', { 'data-side': 'a', style: { '--w': (a.scores[m.key] / 5 * 100) + '%' } }),
        el('i', { 'data-side': 'b', style: { '--w': (b.scores[m.key] / 5 * 100) + '%' } })),
      el('span.cmp__craftv', { 'data-side': 'b' }, String(b.scores[m.key])))));

    verdict.replaceChildren(
      el('b', null, `${a.name} gegen ${b.name}: `),
      document.createTextNode(`${a.strength} Dagegen ${b.name.toLowerCase()}: ${lower(b.strength)} Der Preis dafür — ${lower(b.weakness)}`));
  }

  const lower = s => s.charAt(0).toLowerCase() + s.slice(1);

  /** Von außen eine Richtung in den Vergleich legen. */
  function add(dir) {
    // Immer die ältere Seite ersetzen, damit ein zweiter Klick sichtbar wirkt.
    if (a.id === dir.id || b.id === dir.id) return;
    setSide('b', a.id);
    setSide('a', dir.id);
  }

  setMode('overlay');
  render();
  return { root, add, setSide, setMode };
}
