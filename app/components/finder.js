/* ============================================================================
   Finder – „Welche Richtung passt zu Ihrem Projekt?“
   Das Werkzeug für das Kundengespräch.

   Die Empfehlung ist absichtlich regelbasiert und wird offengelegt: neben
   jedem Ergebnis steht, WARUM es dort steht. Eine Blackbox wäre im Gespräch
   wertlos – man kann ihr nicht widersprechen.
   ========================================================================== */

import { el, env } from '../lib/dom.js';
import { recommend, tensionsFor } from '../data/traits.js';
import { renderSpecimen } from './specimen.js';
import { BrowserFrame } from './browser-frame.js';

export function finder({ traits, directions, traitByKey, onOpen, onPick }) {
  const selected = new Set();

  const chips = traits.map(t => el('button.finder__chip', {
    type: 'button', 'aria-pressed': 'false', 'data-trait': t.key,
    'data-tip': t.hint,
    onClick: () => toggle(t.key)
  }, t.label));

  const chipRow = el('div.finder__chips', { role: 'group', 'aria-label': 'Merkmale wählen' }, ...chips);

  const hint = el('p.finder__hint', { role: 'status' });
  const tensionBox = el('div.finder__tensions');
  const results = el('div.finder__results');
  const reset = el('button.finder__reset', {
    type: 'button', onClick: () => { selected.clear(); render(); }
  }, 'Auswahl zurücksetzen');

  /* Vorschau der Top-Empfehlung – live, nicht als Bild */
  const frame = new BrowserFrame({ viewport: 'desktop', height: 360, chrome: false });
  const previewName = el('span.finder__previewname');
  const preview = el('div.finder__preview', { hidden: true },
    el('div.finder__previewhead', null,
      el('span.finder__previewlabel', null, 'Beste Übereinstimmung'),
      previewName),
    frame.root);

  const root = el('div.finder', null,
    el('div.finder__panel', null,
      el('p.finder__q', { id: 'finder-q' }, 'Wie soll die Marke wirken? Wählen Sie zwei bis vier Merkmale.'),
      chipRow, hint, tensionBox, reset),
    el('div.finder__out', null, preview, results));

  function toggle(key) {
    selected.has(key) ? selected.delete(key) : selected.add(key);
    chips.forEach(c => c.setAttribute('aria-pressed', String(selected.has(c.dataset.trait))));
    render();
  }

  function render() {
    chips.forEach(c => c.setAttribute('aria-pressed', String(selected.has(c.dataset.trait))));
    const keys = [...selected];
    reset.hidden = keys.length === 0;

    if (!keys.length) {
      hint.textContent = 'Noch nichts gewählt — unten stehen alle zwölf Richtungen.';
      tensionBox.replaceChildren();
      preview.hidden = true;
      /* Leerzustand zeigt das ganze Feld: Die Auswahl sortiert dann nur um,
         sie enthüllt nichts Verstecktes. Das nimmt dem Werkzeug die Blackbox. */
      results.replaceChildren(
        el('p.finder__empty', null,
          'Wählen Sie Merkmale aus, um dieses Feld zu sortieren. Zwei bis vier funktionieren am besten: Bei einem Merkmal ist die Reihenfolge beliebig, bei sechs trägt keine Richtung mehr alles.'),
        el('div.finder__all', null, ...directions.map(d => el('button.finder__allitem', {
          type: 'button', onClick: () => onPick?.(d), 'data-tip': `${d.claim}`
        },
          el('span.finder__allno', null, d.no),
          el('span.finder__allname', null, d.name),
          el('span.finder__alltraits', null,
            ...traits.filter(t => (d.traits[t.key] || 0) >= 3).map(t => el('i', null, t.label)))))));
      return;
    }

    const ranked = recommend(keys, directions);
    const top = ranked.filter(r => r.pct >= 60).slice(0, 4);
    const shown = top.length ? top : ranked.slice(0, 3);

    hint.textContent = keys.length === 1
      ? 'Ein Merkmal grenzt kaum ein. Nehmen Sie ein zweites dazu.'
      : `${shown.length} von ${directions.length} Richtungen tragen diese Kombination.`;

    /* Spannungen benennen statt verschweigen */
    const tensions = tensionsFor(keys);
    tensionBox.replaceChildren(...tensions.map(t => el('div.finder__tension', null,
      el('span.finder__tensiont', null, `${traitByKey[t.a].label} ↔ ${traitByKey[t.b].label}`),
      el('p', null, t.note))));

    results.replaceChildren(...shown.map((r, i) => resultRow(r, i, keys)));

    /* Vorschau auf Platz 1 */
    const best = shown[0].dir;
    preview.hidden = false;
    previewName.textContent = `${best.no} — ${best.full}`;
    frame.mount(renderSpecimen(best.id, 'atelier'));
    requestAnimationFrame(() => frame.fit());
  }

  function resultRow(r, i, keys) {
    const why = keys
      .map(k => ({ k, v: r.dir.traits[k] || 0 }))
      .sort((x, y) => y.v - x.v);

    return el('article.finder__row', {
      'data-rank': i === 0 ? 'top' : null, 'data-reveal': 'up', 'data-reveal-delay': i * 80
    },
      el('div.finder__rowhead', null,
        el('span.finder__rank', null, String(i + 1)),
        el('div', null,
          el('h4.finder__rowname', null, r.dir.full),
          el('p.finder__rowclaim', null, r.dir.claim)),
        el('span.finder__pct', { 'data-tip': `${r.score} von ${keys.length * 3} möglichen Punkten` },
          r.pct, el('em', null, '%'))),

      /* Die Rechnung offenlegen – das ist der Kern des Beratungswerts */
      el('div.finder__why', null,
        ...why.map(({ k, v }) => el('span.finder__whyitem', { 'data-v': v },
          traitByKey[k].label,
          el('i', { 'aria-hidden': 'true' }, ['○○○', '●○○', '●●○', '●●●'][v])))),

      el('p.finder__caveat', null, el('b', null, 'Zu bedenken: '), r.dir.weakness),

      el('div.finder__acts', null,
        el('button.finder__act', { type: 'button', onClick: () => onPick?.(r.dir) }, 'Auf die Bühne'),
        el('button.finder__act.finder__act--quiet', { type: 'button', onClick: () => onOpen?.(r.dir) }, 'Details')));
  }

  render();
  return { root, render };
}
