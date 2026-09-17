/* ============================================================================
   Hero
   Die Kernaussage wird nicht behauptet, sondern vorgeführt: Das Wort
   „Richtungen“ wechselt selbst die Richtung, und der Schriftzug darunter
   nimmt die Typografie der gerade genannten Richtung an.

   Kein Autoplay ohne Ausweg: Hover und Fokus halten an, es gibt eine
   Punktleiste zum direkten Anspringen, und bei „Bewegung reduzieren“ steht
   alles still – dann zeigt die Punktleiste die Auswahl.
   ========================================================================== */

import { el, env } from '../lib/dom.js';

export function hero({ directions, onExplore, onCriteria }) {
  let i = 0, timer = null;

  const word = el('span.hero__morph', { 'aria-hidden': 'true' });
  /* Roving Tabindex: Die zwölf Punkte sind EIN Bedienelement, nicht zwölf.
     Ohne das stehen zwölf Tabstopps zwischen Kopfzeile und Inhalt. */
  const dotRow = el('div.hero__dots', { role: 'group', 'aria-label': 'Richtung im Schriftzug wählen' },
    ...directions.map((d, k) => el('button.hero__dot', {
      type: 'button', 'aria-label': d.full, 'aria-pressed': String(k === 0),
      'data-tip': d.name, tabindex: k === 0 ? '0' : '-1',
      onClick: () => { stop(); show(k); }
    })));

  dotRow.addEventListener('keydown', e => {
    const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key];
    if (step === undefined) {
      if (e.key === 'Home') { e.preventDefault(); stop(); show(0); dotRow.children[0].focus(); }
      if (e.key === 'End') { e.preventDefault(); stop(); show(directions.length - 1); dotRow.children[directions.length - 1].focus(); }
      return;
    }
    e.preventDefault();
    stop();
    show((i + step + directions.length) % directions.length);
    dotRow.children[i].focus();
  });

  const nameOut = el('span.hero__morphname');

  function show(k) {
    i = k % directions.length;
    const d = directions[i];
    word.textContent = d.name;
    word.dataset.direction = d.id;
    nameOut.textContent = d.full;
    Array.from(dotRow.children).forEach((b, n) => {
      b.setAttribute('aria-pressed', String(n === i));
      b.tabIndex = n === i ? 0 : -1;
    });
  }
  const tick = () => show(i + 1);
  function start() { if (!env.reduced && !timer) timer = setInterval(tick, 2100); }
  function stop() { clearInterval(timer); timer = null; }

  const stage = el('div.hero__stage', { onPointerenter: stop, onPointerleave: start, onFocusin: stop },
    el('p.hero__morphlabel', null, 'gerade zu sehen'),
    el('div.hero__morphbox', null, word),
    nameOut, dotRow);

  const root = el('section.hero', { id: 'top', 'data-tone': 'hero' },
    /* Lichtbrechung im Hintergrund: zwei Ebenen, nur transform-animiert. */
    el('div.hero__light', { 'aria-hidden': 'true' },
      el('i.hero__beam.hero__beam--a', { 'data-parallax': '0.06' }),
      el('i.hero__beam.hero__beam--b', { 'data-parallax': '0.1' }),
      el('i.hero__grid')),

    el('div.hero__in', null,
      el('div.hero__text', null,
        el('p.hero__kicker', { 'data-reveal': 'fade' },
          el('i.hero__pulse', { 'aria-hidden': 'true' }),
          'Design-Richtungen, vorgeführt statt beschrieben'),

        el('h1.hero__h1', { 'data-reveal': 'fade' },
          el('span.line', null, el('span', null, 'Ein Inhalt.')),
          el('span.line', null, el('span', null, 'Zwölf Richtungen.')),
          el('span.line.hero__h1sub', null, el('span', null, 'Zwölf Wirkungen.'))),

        el('p.hero__lead', { 'data-reveal': 'up' },
          'Dieselbe Marke, dieselben Texte, dieselbe Informationsarchitektur — zwölfmal gestaltet. ',
          el('b', null, 'Was sich ändert, ist nicht der Inhalt, sondern was Menschen ihm zutrauen.'),
          ' Diese Seite macht diesen Unterschied vergleichbar, bewertbar und entscheidbar.'),

        el('div.hero__cta', { 'data-reveal': 'up' },
          el('button.btn.btn--primary.btn--lg', {
            type: 'button', 'data-magnetic': '0.3', onClick: onExplore
          }, el('span.btn__in', null,
              el('span.btn__label', null, 'Richtungen erleben'),
              el('span.btn__icon', { 'aria-hidden': 'true' }, '→'))),
          el('button.btn.btn--secondary.btn--lg', {
            type: 'button', onClick: onCriteria
          }, el('span.btn__in', null, el('span.btn__label', null, 'Bewertungskriterien')))),

        ),

      stage),

    /* Messleiste über die volle Breite – nicht in der Textspalte, sonst bricht sie um. */
    el('dl.hero__facts', { 'data-reveal': 'up' },
      ...[['12', 'Gestaltungsrichtungen'], ['13', 'Layout-Strukturen'],
          ['12', 'Bewertungsachsen'], ['23', 'Original-Wireframes']]
        .map(([v, l]) => el('div.hero__fact', null,
          el('dt', null, el('span', { 'data-count': v }, '0')),
          el('dd', null, l)))),

    el('a.hero__scroll', { href: '#buehne', 'aria-label': 'Weiter zur Bühne' },
      el('span', null, 'Scrollen'), el('i', { 'aria-hidden': 'true' })));

  show(0);
  start();
  return { root, stop, start };
}
