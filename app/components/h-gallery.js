/* ============================================================================
   HorizontalGallery
   Waagerechte Galerie mit echtem Scrollen statt entführtem Mausrad: Trackpad,
   Wischen, Tastatur und Scrollbalken funktionieren alle wie erwartet.

   Auf schmalen Geräten wird sie zu einem normalen vertikalen Stapel – eine
   horizontale Schiene mit 380-px-Karten ist am Telefon keine gute Idee.
   ========================================================================== */

import { el, $$, clamp, throttleFrame, env } from '../lib/dom.js';

export function horizontalGallery(items, { label = 'Galerie' } = {}) {
  const track = el('div.hgal__track', { role: 'list' },
    ...items.map(n => el('div.hgal__item', { role: 'listitem' }, n)));

  const bar = el('i.hgal__bar');
  const rail = el('div.hgal__rail', { 'aria-hidden': 'true' }, bar);

  const prev = el('button.hgal__nav.hgal__nav--prev', {
    type: 'button', 'aria-label': 'Zurück', onClick: () => page(-1)
  }, '←');
  const next = el('button.hgal__nav.hgal__nav--next', {
    type: 'button', 'aria-label': 'Weiter', onClick: () => page(1)
  }, '→');

  const scroller = el('div.hgal__scroll', {
    tabindex: '0', role: 'region', 'aria-label': `${label} – waagerecht scrollbar`
  }, track);

  const root = el('div.hgal', null,
    scroller,
    el('div.hgal__ctrl', null, rail, el('div.hgal__navs', null, prev, next)));

  function page(dir) {
    const first = track.firstElementChild;
    const step = first ? first.getBoundingClientRect().width + 24 : 400;
    scroller.scrollBy({ left: step * dir, behavior: env.reduced ? 'auto' : 'smooth' });
  }

  const update = throttleFrame(() => {
    const max = scroller.scrollWidth - scroller.clientWidth;
    const p = max > 0 ? clamp(scroller.scrollLeft / max, 0, 1) : 0;
    const visible = max > 0 ? scroller.clientWidth / scroller.scrollWidth : 1;
    bar.style.width = `${(visible * 100).toFixed(2)}%`;
    bar.style.transform = `translate3d(${(p * (100 / visible - 100)).toFixed(3)}%, 0, 0)`;
    prev.disabled = p <= 0.001;
    next.disabled = p >= 0.999;
    root.dataset.scrolled = p > 0.02 ? 'yes' : 'no';
  });

  scroller.addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update, { passive: true });
  scroller.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight') { e.preventDefault(); page(1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); page(-1); }
  });
  requestAnimationFrame(update);

  return { root, scroller, update, page };
}
