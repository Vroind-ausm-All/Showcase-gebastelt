/* ============================================================================
   Navigation
   Trotz experimenteller Gestaltung: konventionell bedienbar. Sichtbarer
   Fortschritt, aktiver Abschnitt, echte Anker, Tastaturbedienung.

   Die Leiste übernimmt beim Betreten einer Sektion deren Tonalität – aber
   nur Farbe und Kontrast, nie Position oder Reihenfolge. Sonst wäre sie
   genau das, was diese Seite anderen vorwirft: Effekt vor Nutzen.
   ========================================================================== */

import { el, $$, env, throttleFrame } from '../lib/dom.js';
import { scrollProgress } from '../motion/index.js';

export function nav({ sections, onTheme, theme }) {
  const links = sections.map(s => el('a.nav__link', {
    href: `#${s.id}`, 'data-section': s.id
  }, el('span.nav__linkno', null, s.no), s.label));

  const list = el('nav.nav__links', { 'aria-label': 'Abschnitte' }, ...links);

  const themeBtn = el('button.nav__icon', {
    type: 'button',
    'aria-label': 'Farbschema wechseln',
    'data-tip': 'Hell / Dunkel',
    onClick: () => onTheme()
  }, el('span.nav__sun', { 'aria-hidden': 'true' }));

  const menuBtn = el('button.nav__burger', {
    type: 'button', 'aria-expanded': 'false', 'aria-controls': 'nav-links',
    'aria-label': 'Menü öffnen',
    onClick: () => setMenu(root.dataset.menu !== 'open')
  }, el('i'), el('i'), el('i'));

  list.id = 'nav-links';

  const progress = el('i.nav__progfill');
  const cta = el('a.nav__cta', { href: '#beratung', 'data-magnetic': '0.25' },
    el('span.btn__in', null, el('span.btn__label', null, 'Beratung starten'), el('span.btn__icon', { 'aria-hidden': 'true' }, '→')));

  const root = el('header.nav', { dataset: { menu: 'closed' } },
    el('div.nav__in', null,
      el('a.nav__brand', { href: '#top', 'aria-label': 'Zum Seitenanfang' },
        el('span.nav__mark', { 'aria-hidden': 'true' }),
        el('span.nav__name', null, 'PRISMA'),
        el('span.nav__sub', null, 'Design-Richtungen')),
      list,
      el('div.nav__act', null, themeBtn, cta, menuBtn)),
    el('div.nav__prog', { 'aria-hidden': 'true' }, progress));

  function setMenu(open) {
    root.dataset.menu = open ? 'open' : 'closed';
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Menü schließen' : 'Menü öffnen');
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }
  links.forEach(l => l.addEventListener('click', () => setMenu(false)));
  addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });

  /* Fortschritt über das gesamte Dokument */
  scrollProgress(p => {
    progress.style.transform = `scaleX(${p})`;
    root.dataset.stuck = scrollY > 24 ? 'yes' : 'no';
  });

  /* Aktiver Abschnitt: der, der am meisten Bildschirm einnimmt. */
  const nodes = () => sections.map(s => document.getElementById(s.id)).filter(Boolean);
  const pick = throttleFrame(() => {
    let best = null, bestArea = 0;
    for (const n of nodes()) {
      const r = n.getBoundingClientRect();
      const area = Math.min(r.bottom, innerHeight) - Math.max(r.top, 0);
      if (area > bestArea) { bestArea = area; best = n.id; }
    }
    links.forEach(l => l.setAttribute('aria-current', String(l.dataset.section === best)));
    if (best) {
      root.dataset.section = best;
      const tone = document.getElementById(best)?.dataset.tone;
      root.dataset.tone = tone || '';
    }
  });
  addEventListener('scroll', pick, { passive: true });
  addEventListener('resize', pick, { passive: true });
  requestAnimationFrame(pick);

  return { root, setMenu };
}
