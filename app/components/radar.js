/* ============================================================================
   Radar – Netzdiagramm für den Richtungsvergleich
   Reines SVG, keine Bibliothek. Zwei Datensätze übereinander, weil der Zweck
   der Vergleich ist und nicht die Einzelansicht.

   Lesbarkeit geht vor Effekt: acht Achsen, beschriftet, mit Ringen bei 1–5,
   und einer Tabelle als Textfassung für Screenreader.
   ========================================================================== */

import { el, env } from '../lib/dom.js';

const NS = 'http://www.w3.org/2000/svg';
const svgEl = (tag, attrs = {}) => {
  const n = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) if (v !== null) n.setAttribute(k, v);
  return n;
};

/**
 * @param {{metrics:{key:string,label:string}[], series:{id:string,label:string,
 *          scores:object,color:string}[], size?:number, max?:number}} o
 */
export function radar({ metrics, series, size = 460, max = 5 }) {
  const cx = size / 2, cy = size / 2;
  const r = size * 0.32;
  const n = metrics.length;
  const angle = i => (Math.PI * 2 * i) / n - Math.PI / 2;
  const pt = (i, v) => [cx + Math.cos(angle(i)) * r * (v / max), cy + Math.sin(angle(i)) * r * (v / max)];

  const svg = svgEl('svg', {
    viewBox: `0 0 ${size} ${size}`, class: 'radar__svg',
    role: 'presentation', 'aria-hidden': 'true'
  });

  /* Ringe */
  for (let ring = 1; ring <= max; ring++) {
    svg.appendChild(svgEl('polygon', {
      class: ring === max ? 'radar__ring radar__ring--edge' : 'radar__ring',
      points: metrics.map((_, i) => pt(i, ring).join(',')).join(' ')
    }));
  }
  /* Speichen + Beschriftung */
  metrics.forEach((m, i) => {
    const [x, y] = pt(i, max);
    svg.appendChild(svgEl('line', { class: 'radar__spoke', x1: cx, y1: cy, x2: x, y2: y }));
    const [lx, ly] = pt(i, max * 1.24);
    const t = svgEl('text', {
      class: 'radar__label', x: lx, y: ly,
      'text-anchor': Math.abs(lx - cx) < 6 ? 'middle' : (lx > cx ? 'start' : 'end'),
      'dominant-baseline': Math.abs(ly - cy) < 6 ? 'middle' : (ly > cy ? 'hanging' : 'auto')
    });
    t.textContent = m.label;
    svg.appendChild(t);
  });

  /* Flächen */
  const shapes = series.map((s, si) => {
    const points = metrics.map((m, i) => pt(i, s.scores[m.key] ?? 0).join(',')).join(' ');
    const g = svgEl('g', { class: 'radar__series', style: `--c:${s.color}; --i:${si}` });
    const poly = svgEl('polygon', { class: 'radar__area', points });
    g.appendChild(poly);
    metrics.forEach((m, i) => {
      const [x, y] = pt(i, s.scores[m.key] ?? 0);
      g.appendChild(svgEl('circle', { class: 'radar__dot', cx: x, cy: y, r: 3.5 }));
    });
    svg.appendChild(g);
    return { g, poly, series: s };
  });

  /* Textfassung – für Screenreader und zum Nachlesen */
  const table = el('table.radar__data',
    { class: 'sr-only' },
    el('caption', null, 'Bewertung je Achse, 1 bis 5'),
    el('thead', null, el('tr', null,
      el('th', { scope: 'col' }, 'Achse'),
      ...series.map(s => el('th', { scope: 'col' }, s.label)))),
    el('tbody', null, ...metrics.map(m => el('tr', null,
      el('th', { scope: 'row' }, m.label),
      ...series.map(s => el('td', null, `${s.scores[m.key] ?? '–'} von ${max}`))))));

  const legend = el('ul.radar__legend', null,
    ...series.map(s => el('li.radar__legenditem', { style: { '--c': s.color } },
      el('i'), el('span', null, s.label))));

  const root = el('div.radar', null, svg, legend, table);

  /** Werte einer Reihe ändern – mit weichem Übergang. */
  function update(index, scores, label, color) {
    const s = shapes[index];
    if (!s) return;
    const points = metrics.map((m, i) => pt(i, scores[m.key] ?? 0).join(',')).join(' ');
    s.poly.setAttribute('points', points);
    Array.from(s.g.querySelectorAll('.radar__dot')).forEach((c, i) => {
      const [x, y] = pt(i, scores[m_(i).key] ?? 0);
      c.setAttribute('cx', x); c.setAttribute('cy', y);
    });
    if (color) s.g.style.setProperty('--c', color);
    if (label) {
      legend.children[index].querySelector('span').textContent = label;
      legend.children[index].style.setProperty('--c', color || s.series.color);
    }
    function m_(i) { return metrics[i]; }
    // Textfassung mitziehen
    Array.from(table.querySelectorAll('tbody tr')).forEach((tr, i) => {
      tr.children[index + 1].textContent = `${scores[metrics[i].key] ?? '–'} von ${max}`;
    });
    if (label) table.querySelector('thead').children[0].children[index + 1].textContent = label;
  }

  if (!env.reduced) root.classList.add('radar--animate');
  return { root, update, svg };
}
