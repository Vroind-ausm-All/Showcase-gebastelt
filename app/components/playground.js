/* ============================================================================
   Playground
   Die Werkbank. Alles hier ist bewusst unfertig genug, um es in ein echtes
   Projekt zu übernehmen – und getrennt genug, um es einzeln zu löschen.
   ========================================================================== */

import { el, $$ } from '../lib/dom.js';
import { enhance } from '../motion/index.js';

export function playground({ experiments, groups }) {
  let filter = 'alle';

  const cards = experiments.map(x => {
    const body = el('div.pg__demo');
    body.appendChild(x.build());
    return {
      group: x.group,
      node: el('section.pg__card', { 'data-group': x.group, 'data-reveal': 'up', id: `pg-${x.id}` },
        el('header.pg__head', null,
          el('span.pg__group', null, x.group),
          el('h3.pg__title', null, x.title)),
        body,
        el('p.pg__note', null, x.note))
    };
  });

  const chips = ['alle', ...groups].map(g => el('button.pg__chip', {
    type: 'button', 'aria-pressed': String(g === 'alle'),
    onClick: () => setFilter(g)
  }, g === 'alle' ? 'Alle' : g));

  const grid = el('div.pg__grid', null, ...cards.map(c => c.node));
  const count = el('span.pg__count');

  function setFilter(g) {
    filter = g;
    chips.forEach(c => c.setAttribute('aria-pressed', String(c.textContent.toLowerCase() === (g === 'alle' ? 'alle' : g.toLowerCase()))));
    let n = 0;
    cards.forEach(c => {
      const on = g === 'alle' || c.group === g;
      c.node.hidden = !on;
      if (on) n++;
    });
    count.textContent = `${n} von ${cards.length}`;
  }

  setFilter('alle');
  const root = el('div.pg', null,
    el('div.pg__bar', null, el('div.pg__chips', { role: 'group', 'aria-label': 'Nach Bereich filtern' }, ...chips), count),
    grid);

  requestAnimationFrame(() => enhance(root));
  return { root, setFilter };
}
