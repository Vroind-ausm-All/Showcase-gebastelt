/* ============================================================================
   StructureIndex – die zweite Achse
   Richtung sagt, WIE es aussieht. Struktur sagt, WIE es geordnet ist.
   Beide sind unabhängig – deshalb steht die Struktur hier als eigene Achse
   und nicht als weitere Kachel in der Richtungsgalerie.

   Die dreizehn Prototypen aus dem Repo „Designs-Wireframes“ bleiben erhalten
   und sind von hier aus als Originaldokument erreichbar.
   ========================================================================== */

import { el } from '../lib/dom.js';

/* Kleine, CSS-gezeichnete Strukturdiagramme. Ein Diagramm sagt hier mehr
   als ein Screenshot, weil genau das Ordnungsprinzip gemeint ist. */
const DIAGRAMS = {
  hero:        [[100, 42], [32, 10], [32, 10], [32, 10], [100, 8]],
  z:           [[64, 20, 'l'], [64, 20, 'r'], [64, 14, 'l'], [40, 12, 'r']],
  f:           [[100, 9], [70, 9], [100, 9], [52, 9], [88, 9], [40, 9], [100, 9]],
  gridbreak:   [[78, 26, 'l'], [120, 18, 'r'], [46, 14, 'l'], [100, 12]],
  content:     [[54, 7], [54, 7], [54, 7], [54, 7], [54, 7], [54, 7], [54, 7]],
  fullscreen:  [[100, 54], [100, 30], [100, 14]],
  alternating: [[48, 18, 'l'], [48, 18, 'r'], [48, 18, 'l'], [100, 10]],
  asymmetric:  [[38, 22, 'l'], [72, 16, 'r'], [30, 20, 'l'], [56, 12, 'r']],
  single:      [[62, 14], [62, 14], [62, 14], [62, 14], [62, 14]],
  box:         [[100, 18], [100, 18], [100, 18], [100, 18]],
  cards:       [[58, 24, 'l'], [38, 24, 'r'], [30, 16, 'l'], [30, 16], [36, 16, 'r'], [100, 12]],
  magazine:    [[100, 8], [66, 26, 'l'], [30, 26, 'r'], [31, 10, 'l'], [31, 10], [31, 10, 'r']],
  strips:      [[100, 26], [100, 12], [100, 20], [100, 8], [100, 16]]
};

function diagram(id) {
  const rows = DIAGRAMS[id] || DIAGRAMS.single;
  return el('div.sdia', { 'aria-hidden': 'true' },
    ...rows.map(([w, h, align]) => el('i.sdia__b', {
      style: { width: w + '%', height: h + 'px' },
      'data-align': align || 'c'
    })));
}

export function structureIndex({ structures, axes, archiveBase = 'archive/flowdesk/wireframes/' }) {
  let openId = null;

  const rows = structures.map((s, i) => {
    const top = [...axes].sort((a, b) => s.r[b.key] - s.r[a.key]).slice(0, 2);

    const detail = el('div.sidx__detail', { hidden: true },
      el('div.sidx__detailcols', null,
        el('div', null,
          el('p.sidx__dh', null, 'Blickführung'), el('p', null, s.gaze),
          el('p.sidx__dh', null, 'Stärke'), el('p', null, s.pro),
          el('p.sidx__dh', null, 'Schwäche'), el('p', null, s.con)),
        el('div.sidx__meters', null,
          ...axes.map(ax => el('div.sidx__meter', null,
            el('span', null, ax.label),
            el('span.sidx__mtrack', { role: 'meter', 'aria-valuenow': s.r[ax.key], 'aria-valuemin': 1, 'aria-valuemax': 5, 'aria-label': `${ax.label}: ${s.r[ax.key]} von 5` },
              el('i', { style: { '--w': (s.r[ax.key] / 5 * 100) + '%' } })),
            el('b', null, s.r[ax.key]))))),
      el('a.sidx__proto', {
        href: archiveBase + s.file, target: '_blank', rel: 'noopener'
      }, 'Original-Prototyp öffnen', el('i', { 'aria-hidden': 'true' }, '↗')));

    const toggle = el('button.sidx__toggle', {
      type: 'button',
      'aria-expanded': 'false',
      'aria-controls': `sidx-d-${s.id}`,
      onClick: () => open(s.id)
    },
      el('span.sidx__no', null, s.no),
      diagram(s.id),
      el('span.sidx__name', null, s.name),
      el('span.sidx__claim', null, s.claim),
      el('span.sidx__top', null, ...top.map(t => el('span.tag.tag--quiet', null, t.label))),
      el('span.sidx__chev', { 'aria-hidden': 'true' }, '+'));

    detail.id = `sidx-d-${s.id}`;
    return { id: s.id, node: el('div.sidx__row', { 'data-reveal': 'up', 'data-reveal-delay': (i % 6) * 55 }, toggle, detail), toggle, detail };
  });

  function open(id) {
    const next = openId === id ? null : id;
    openId = next;
    rows.forEach(r => {
      const on = r.id === next;
      r.detail.hidden = !on;
      r.toggle.setAttribute('aria-expanded', String(on));
      r.node.dataset.open = on ? 'yes' : 'no';
    });
  }

  return { root: el('div.sidx', null, ...rows.map(r => r.node)), open };
}
