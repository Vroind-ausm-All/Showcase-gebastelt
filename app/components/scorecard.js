/* ============================================================================
   Scorecard – „Woran messen wir gutes Design?“
   Sieben Dimensionen, jede aufklappbar. Links bleibt eine Auswahlspalte
   stehen, rechts steht die Dimension im Detail – inklusive der Richtungen,
   die auf ihr am besten und am schlechtesten abschneiden.

   Wichtig: Die Werte sind keine Dekoration. Sie kommen aus denselben Achsen,
   mit denen der Vergleich rechnet. Bewertung und Vergleich widersprechen sich
   dadurch nie.
   ========================================================================== */

import { el, env } from '../lib/dom.js';
import { pillarScore } from '../data/criteria.js';
import { ratingBar } from './ui.js';

export function scorecard({ pillars, directions, metricByKey, onPick }) {
  let active = 0;

  const tabs = pillars.map((p, i) => el('button.score__tab', {
    type: 'button', role: 'tab',
    id: `score-tab-${p.id}`,
    'aria-selected': String(i === 0),
    'aria-controls': 'score-panel',
    tabindex: i === 0 ? '0' : '-1',
    onClick: () => select(i)
  },
    el('span.score__tabno', null, p.no),
    el('span.score__tabname', null, p.title),
    el('span.score__tabmark', { 'aria-hidden': 'true' })));

  const tablist = el('div.score__tabs', { role: 'tablist', 'aria-label': 'Bewertungsdimensionen' }, ...tabs);

  const panel = el('div.score__panel', {
    id: 'score-panel', role: 'tabpanel', tabindex: '0'
  });

  function select(i) {
    active = i;
    tabs.forEach((t, k) => {
      t.setAttribute('aria-selected', String(k === i));
      t.tabIndex = k === i ? 0 : -1;
    });
    panel.setAttribute('aria-labelledby', `score-tab-${pillars[i].id}`);
    renderPanel();
  }

  tablist.addEventListener('keydown', e => {
    const dir = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[e.key];
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + pillars.length) % pillars.length;
    select(next);
    tabs[next].focus();
  });

  function renderPanel() {
    const p = pillars[active];

    /* Ranking der Richtungen auf genau dieser Dimension */
    const ranked = directions
      .map(d => ({ d, v: pillarScore(d, p) }))
      .sort((x, y) => y.v - x.v);
    const best = ranked.slice(0, 3);
    const worst = ranked.slice(-2).reverse();

    panel.replaceChildren(
      el('div.score__lead', null,
        el('p.score__leadno', null, `Dimension ${p.no}`),
        el('h3.score__title', null, p.title),
        el('p.score__sub', null, p.lead)),

      el('div.score__cols', null,
        /* Leitfragen */
        el('div.score__checks', null,
          el('h4.score__h4', null, 'Woran wir es festmachen'),
          el('ul.score__list', null,
            ...p.checks.map(([k, q], i) => el('li.score__check', { 'data-reveal': 'up', 'data-reveal-delay': i * 70 },
              el('b', null, k),
              el('span', null, q))))),

        /* Gemessene Achsen */
        el('div.score__metrics', null,
          el('h4.score__h4', null, 'Gemessen über'),
          ...p.metrics.map(k => {
            const m = metricByKey[k];
            return el('div.score__metric', null,
              el('span.score__metricname', { 'data-tip': m.hint }, m.label),
              el('span.score__metricrange', null,
                `${Math.min(...directions.map(d => d.scores[k]))}–${Math.max(...directions.map(d => d.scores[k]))} von 5 im Feld`));
          }),
          el('div.score__rank', null,
            el('h4.score__h4', null, 'Stark in dieser Dimension'),
            ...best.map(({ d, v }) => rankRow(d, v, 'high')),
            el('h4.score__h4.score__h4--gap', null, 'Schwach in dieser Dimension'),
            ...worst.map(({ d, v }) => rankRow(d, v, 'low')))))
    );
  }

  function rankRow(d, v, tone) {
    return el('button.score__rankrow', {
      type: 'button', 'data-tone': tone,
      'data-tip': `${d.full} auf die Bühne holen`,
      onClick: () => onPick?.(d)
    },
      el('span.score__rankno', null, d.no),
      el('span.score__rankname', null, d.name),
      el('span.score__rankbar', { 'aria-hidden': 'true' }, el('i', { style: { '--w': (v / 5 * 100) + '%' } })),
      el('span.score__rankval', null, v.toFixed(1)));
  }

  select(0);
  return { root: el('div.score', null, tablist, panel), select };
}
