/* ============================================================================
   DirectionDetail – der Inhalt des Modals
   Alles, was im Kundengespräch zu einer Richtung gebraucht wird, auf einer
   Fläche: lebendes Muster, Begründung, Stärke, Schwäche, Werte, Herkunft.
   ========================================================================== */

import { el } from '../lib/dom.js';
import { renderSpecimen } from './specimen.js';
import { BrowserFrame, viewportSwitch } from './browser-frame.js';
import { ratingBar } from './ui.js';

export function directionDetail(dir, { metrics, radarMetrics, onPick, onCompare, contentId = 'nordfeld' }) {
  const frame = new BrowserFrame({ viewport: 'desktop', height: 420 });
  frame.mount(renderSpecimen(dir.id, contentId));
  frame.setLabel(dir.full);

  const vsw = viewportSwitch(v => frame.setViewport(v));

  const fact = (h, b, mod = '') => el(`div.ddet__fact${mod}`, null,
    el('h4', null, h), el('p', null, b));

  const root = el('div.ddet', { dataset: { direction: dir.id } },
    el('div.ddet__stage', null,
      el('div.ddet__stagebar', null,
        el('span.ddet__tags', null, ...dir.tags.map(t => el('span.tag.tag--quiet', null, t))),
        vsw.root),
      frame.root),

    el('div.ddet__body', null,
      el('p.ddet__claim', null, dir.claim),

      el('div.ddet__facts', null,
        fact('Zentrale Designidee', dir.idea),
        fact('Blickführung', dir.gaze),
        fact('Unterschied zu den anderen', dir.diff),
        fact('Stärke', dir.strength, '.ddet__fact--pro'),
        fact('Mögliche Schwäche', dir.weakness, '.ddet__fact--con'),
        fact('Passende Branchen und Marken', dir.fit)),

      el('div.ddet__scores', null,
        el('h4.ddet__scoresh', null, 'Bewertung'),
        el('div.ddet__scoregrid', null,
          ...radarMetrics.map(m => ratingBar({
            label: m.label, value: dir.scores[m.key], hint: m.hint, compact: true
          }))),
        el('h4.ddet__scoresh', null, 'Handwerk'),
        el('div.ddet__scoregrid', null,
          ...metrics.filter(m => !m.radar).map(m => ratingBar({
            label: m.label, value: dir.scores[m.key], hint: m.hint, compact: true, tone: 'craft'
          })))),

      el('div.ddet__acts', null,
        el('button.btn.btn--primary', { type: 'button', 'data-magnetic': '0.3', onClick: () => onPick?.(dir) },
          el('span.btn__in', null, el('span.btn__label', null, 'Diese Richtung wählen'), el('span.btn__icon', { 'aria-hidden': 'true' }, '→'))),
        el('button.btn.btn--secondary', { type: 'button', onClick: () => onCompare?.(dir) },
          el('span.btn__in', null, el('span.btn__label', null, 'Vergleichen'))),
        dir.archive
          ? el('a.btn.btn--quiet', { href: dir.archive, target: '_blank', rel: 'noopener' },
              el('span.btn__in', null, el('span.btn__label', null, 'Original-Wireframe'), el('span.btn__icon', { 'aria-hidden': 'true' }, '↗')))
          : el('span.ddet__nonote', null, 'Neu ergänzt – kein Wireframe im Bestand.'))));

  requestAnimationFrame(() => frame.fit());
  return root;
}
