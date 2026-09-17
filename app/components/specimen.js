/* ============================================================================
   Specimen – das Herzstück
   Rendert EINEN Inhalt in EINER semantischen Struktur. Wie es aussieht,
   entscheidet allein das Attribut data-direction, das in
   css/10-directions.css einen Token-Satz aktiviert.

   Daraus folgt der Kern der ganzen Seite:
   Derselbe Inhalt, dieselbe Informationsarchitektur, zwölf Wirkungen.

   Neue Richtung ergänzen: Eintrag in app/data/directions.js +
   Theme-Block in css/10-directions.css. An dieser Datei ändert sich nichts.

   Bewusst OHNE semantische Elemente (h1, nav, footer, section, blockquote):
   Ein Specimen ist die Abbildung einer Website, nicht eine Website. Mit echten
   Überschriften entstünde neben dem Dokumentumriss der Seite ein zweiter aus
   fünfzehn Mustern. Das Muster trägt stattdessen role="img" mit aria-label –
   für Hilfstechnologie ist es genau ein Bild mit einer Beschreibung.
   ========================================================================== */

import { el } from '../lib/dom.js';
import { getContent } from '../data/content.js';
import { getDirection } from '../data/directions.js';

/* Platzhalterflächen: aus dem Wireframe-Kit beider Repos übernommen,
   hier als Komponente statt als Utility-Klassenwolke. */
const figure = (cls = '') => el(`div.sp-ph${cls ? '.' + cls : ''}`, { 'aria-hidden': 'true' },
  el('span.sp-ph__mark'));

const uiMock = () => el('div.sp-ui', { 'aria-hidden': 'true' },
  el('div.sp-ui__top', null, el('i'), el('i'), el('i')),
  el('div.sp-ui__body', null,
    el('div.sp-ui__side', null, ...Array.from({ length: 5 }, () => el('i'))),
    el('div.sp-ui__main', null,
      el('div.sp-ui__row', null, ...Array.from({ length: 8 }, (_, i) =>
        el('i', { style: { height: `${28 + ((i * 37) % 62)}%` } }))),
      el('div.sp-ui__grid', null, ...Array.from({ length: 6 }, () => el('i'))))));

const lines = (n = 3, cls = '') =>
  el(`div.sp-lines${cls ? '.' + cls : ''}`, { 'aria-hidden': 'true' },
    ...Array.from({ length: n }, () => el('i')));

/**
 * @param {string} directionId
 * @param {string} contentId
 * @param {{ compact?: boolean }} [opts]  compact = gekürzt für Vergleichsansichten
 * @returns {HTMLElement}
 */
export function renderSpecimen(directionId = 'swiss', contentId = 'nordfeld', opts = {}) {
  const dir = getDirection(directionId);
  const c = getContent(contentId);
  const compact = !!opts.compact;

  /* --- Navigation ------------------------------------------------------- */
  const nav = el('div.sp-nav',
    null,
    el('div.sp-nav__brand', null, el('span.sp-nav__logomark', { 'aria-hidden': 'true' }), c.brand),
    el('div.sp-nav__links',
      ...c.nav.map((l, i) => el('span.sp-nav__link', { 'data-on': i === 0 ? '' : null }, l))),
    el('div.sp-nav__act', null,
      el('span.sp-btn.sp-btn--ghost', null, 'Login'),
      el('span.sp-btn.sp-btn--primary', null, c.ctaPrimary)));

  /* --- Hero ------------------------------------------------------------- */
  const hero = el('div.sp-hero', null,
    el('div.sp-hero__text', null,
      el('div.sp-eyebrow', null, c.eyebrow),
      el('div.sp-title', null, ...c.headline.map(l => el('span.sp-title__l', null, l))),
      el('div.sp-lead', null, c.lead),
      el('div.sp-cta', null,
        el('span.sp-btn.sp-btn--primary.sp-btn--lg', null, c.ctaPrimary, el('i.sp-btn__arrow', { 'aria-hidden': 'true' }, '→')),
        el('span.sp-btn.sp-btn--secondary.sp-btn--lg', null, c.ctaSecondary)),
      el('div.sp-micro', null, c.micro)),
    el('div.sp-hero__figure', null, uiMock(), el('span.sp-hero__float', null, figure('sp-ph--sm'))));

  /* --- Kennzahlen ------------------------------------------------------- */
  const proof = el('div.sp-proof', null,
    el('div.sp-proof__stats', null,
      ...c.stats.map(s => el('div.sp-stat', null,
        el('span.sp-stat__v', null, s.value, s.unit && el('em.sp-stat__u', null, s.unit)),
        el('span.sp-stat__l', null, s.label)))),
    el('div.sp-proof__logos', { 'aria-hidden': 'true' },
      ...Array.from({ length: 5 }, () => el('span.sp-logo'))));

  /* --- Vorteile --------------------------------------------------------- */
  const benefits = el('div.sp-sec.sp-sec--benefits', null,
    el('div.sp-sec__head', null,
      el('div.sp-eyebrow', null, 'Vorteile'),
      el('div.sp-h2', null, 'Warum Teams wechseln.')),
    el('div.sp-grid.sp-grid--3', null,
      ...c.benefits.map(b => el('div.sp-card', null,
        el('span.sp-card__no', null, b.no),
        el('div.sp-h3', null, b.title),
        el('div.sp-body', null, b.body)))));

  /* --- Module ----------------------------------------------------------- */
  const modules = el('div.sp-sec.sp-sec--modules', null,
    el('div.sp-sec__head', null,
      el('div.sp-eyebrow', null, 'Leistungen'),
      el('div.sp-h2', null, 'Vier Bausteine, ein System.')),
    el('div.sp-grid.sp-grid--4', null,
      ...c.modules.map(m => el('div.sp-card.sp-card--module', null,
        figure('sp-ph--wide'),
        el('span.sp-card__no', null, m.no),
        el('div.sp-h3', null, m.title),
        el('div.sp-body', null, m.body),
        el('span.sp-link', null, 'Mehr', el('i', { 'aria-hidden': 'true' }, '→'))))));

  /* --- Zitat ------------------------------------------------------------ */
  const quote = el('div.sp-quote', null,
    el('div.sp-quote__t', null, '„', c.quote.text, '“'),
    el('div.sp-quote__by', null,
      el('span.sp-avatar', { 'aria-hidden': 'true' }),
      el('span', null, el('b', null, c.quote.who), el('span.sp-quote__org', null, c.quote.org))));

  /* --- FAQ -------------------------------------------------------------- */
  const faq = el('div.sp-sec.sp-sec--faq', null,
    el('div.sp-sec__head', null,
      el('div.sp-eyebrow', null, 'Fragen'),
      el('div.sp-h2', null, 'Bevor Sie fragen.')),
    el('div.sp-faq', null,
      ...c.faq.map(([q, a], i) => el('div.sp-faq__row', { 'data-open': i === 0 ? '' : null }, 
        el('div.sp-faq__q', null, q, el('i.sp-faq__sign', { 'aria-hidden': 'true' })),
        i === 0 ? el('div.sp-faq__a', null, a) : lines(2, 'sp-lines--faq')))));

  /* --- Abschluss -------------------------------------------------------- */
  const closing = el('div.sp-close', null,
    el('div.sp-close__t', null, c.closing.title),
    el('div.sp-close__b', null, c.closing.body),
    el('div.sp-cta', null,
      el('span.sp-btn.sp-btn--primary.sp-btn--lg', null, c.ctaPrimary, el('i.sp-btn__arrow', { 'aria-hidden': 'true' }, '→')),
      el('span.sp-btn.sp-btn--secondary.sp-btn--lg', null, c.ctaSecondary)));

  /* --- Fuß -------------------------------------------------------------- */
  const foot = el('div.sp-foot', null,
    el('span.sp-foot__brand', null, c.brand),
    el('div.sp-foot__cols', { 'aria-hidden': 'true' },
      ...Array.from({ length: 3 }, () => el('div.sp-foot__col', null, lines(3)))),
    el('span.sp-foot__meta', null, c.kind));

  const parts = compact
    ? [nav, hero, proof, benefits, closing]
    : [nav, hero, proof, benefits, modules, quote, faq, closing, foot];

  return el('div.sp', {
    dataset: { direction: dir.id, content: c.id },
    'aria-label': `Musterseite in der Richtung ${dir.full}`,
    role: 'img'
  }, ...parts);
}

/**
 * Richtung wechseln, ohne neu zu rendern – dadurch ist der Wechsel ein
 * reiner Stilwechsel und beweist nebenbei die Trennung von Inhalt und Form.
 */
export function setSpecimenDirection(node, directionId) {
  node.dataset.direction = directionId;
  node.setAttribute('aria-label', `Musterseite in der Richtung ${getDirection(directionId).full}`);
}
