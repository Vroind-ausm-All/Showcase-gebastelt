/* ============================================================================
   DirectionCard
   Bewusst NICHT alle Karten gleich: jede Richtung bringt ihre eigene
   Hover-Interaktion mit (dir.interaction). Das ist kein Selbstzweck – die
   Interaktion ist selbst Teil der Aussage. „Brutalist“ ruckt, „Luxury“ deckt
   langsam auf, „Console“ tippt, „Aurora“ leuchtet.

   Auf Touch- und Reduced-Motion-Geräten fällt alles auf einen ruhigen
   Grundzustand zurück; die Karte bleibt vollständig bedienbar.
   ========================================================================== */

import { el, env } from '../lib/dom.js';
import { renderSpecimen } from './specimen.js';
import { dots } from './ui.js';

/** Der Teil des vollen Namens nach dem Schrägstrich – „Minimalist / Premium“ → „Premium“. */
function subtitleOf(dir) {
  const parts = dir.full.split('/').map(s => s.trim());
  return parts.length > 1 ? parts[parts.length - 1] : '';
}

/** Kurzprofil: die drei stärksten Achsen einer Richtung. */
function topAxes(dir, metrics, count = 3) {
  return [...metrics]
    .filter(m => m.radar)
    .sort((a, b) => (dir.scores[b.key] - dir.scores[a.key]))
    .slice(0, count);
}

/**
 * @param {object} dir            Richtung aus data/directions.js
 * @param {object} o
 * @param {Function} o.onOpen     Klick auf die Karte
 * @param {Function} o.onCompare  „Vergleichen“
 * @param {Function} o.onPick     „Diese Richtung wählen“
 * @param {object[]} o.metrics
 * @param {string} o.contentId
 */
export function directionCard(dir, o = {}) {
  const { metrics = [], contentId = 'nordfeld' } = o;

  /* Vorschau: echtes Muster, maßstäblich verkleinert – kein Screenshot. */
  const preview = el('div.dcard__preview', { 'aria-hidden': 'true' },
    el('div.dcard__scale', null, renderSpecimen(dir.id, contentId, { compact: true })));

  const top = topAxes(dir, metrics);

  const card = el('article.dcard', {
    dataset: { direction: dir.id, fx: dir.interaction },
    'data-spotlight': '',
    'data-reveal': 'rise',
    tabindex: '0',
    role: 'button',
    'aria-label': `${dir.full} – Richtung öffnen`
  },
    el('div.dcard__top', null,
      el('span.dcard__no', null, dir.no),
      el('span.dcard__tags', null, ...dir.tags.slice(0, 2).map(t => el('span.tag.tag--quiet', null, t)))),
    preview,
    el('div.dcard__body', null,
      el('h3.dcard__name', null, dir.name, el('span.dcard__full', null, subtitleOf(dir))),
      el('p.dcard__claim', null, dir.claim)),
    el('div.dcard__meta', null,
      ...top.map(m => el('span.dcard__axis', { 'data-tip': `${m.label}: ${dir.scores[m.key]} von 5` },
        el('span', null, m.label), dots(dir.scores[m.key])))),
    el('div.dcard__foot', null,
      el('span.dcard__fit', null, dir.fit.split(',')[0]),
      el('span.dcard__cue', { 'aria-hidden': 'true' }, 'Öffnen', el('i', null, '→'))),
    /* Zweitaktionen – nicht im Klickziel der Karte, damit nichts kollidiert */
    el('div.dcard__acts', null,
      el('button.dcard__act', {
        type: 'button', 'data-tip': 'Zum Vergleich hinzufügen',
        onClick: e => { e.stopPropagation(); o.onCompare?.(dir); }
      }, 'Vergleichen'),
      el('button.dcard__act', {
        type: 'button', 'data-tip': 'Auf der Bühne ansehen',
        onClick: e => { e.stopPropagation(); o.onPick?.(dir); }
      }, 'Auf die Bühne')));

  const open = () => o.onOpen?.(dir);
  card.addEventListener('click', open);
  card.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(); }
  });

  /* Interaktionen, die JS brauchen. Der Rest liegt als CSS bei [data-fx]. */
  if (env.pointerFx) {
    if (dir.interaction === 'type') typeEffect(card, dir);
    if (dir.interaction === 'shift') shiftEffect(card);
  }
  return card;
}

/* „Console“: der Name wird beim Hover getippt. */
function typeEffect(card, dir) {
  const target = card.querySelector('.dcard__name');
  const original = dir.name;
  let timer = null;
  card.addEventListener('pointerenter', () => {
    clearInterval(timer);
    let i = 0;
    const label = target.firstChild;
    timer = setInterval(() => {
      i++;
      label.textContent = original.slice(0, i) + (i < original.length ? '▌' : '');
      if (i >= original.length) { clearInterval(timer); label.textContent = original; }
    }, 46);
    label.textContent = '▌';
  });
  card.addEventListener('pointerleave', () => {
    clearInterval(timer);
    target.firstChild.textContent = original;
  });
}

/* „Brutalist“: die Karte ruckt bei jeder Zeigerbewegung minimal weiter. */
function shiftEffect(card) {
  let step = 0;
  card.addEventListener('pointermove', () => {
    step = (step + 1) % 4;
    card.style.setProperty('--jitter', `${(step - 1.5) * 1.6}px`);
  });
  card.addEventListener('pointerleave', () => card.style.setProperty('--jitter', '0px'));
}
