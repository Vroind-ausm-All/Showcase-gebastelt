/* ============================================================================
   UI-PRIMITIVE
   Kleine, zusammensetzbare Bausteine. Bewusst keine Monolithen: jede Funktion
   gibt ein Element zurück und weiß nichts über die Seite, auf der sie landet.
   ========================================================================== */

import { el, $$, clear, env } from '../lib/dom.js';

/* --- Sektionskopf mit Nummernschiene -------------------------------------- */
export function sectionHeader({ no, kicker, title, lead, aside = null, id = null }) {
  return el('header.shead', { id },
    el('div.shead__rail', { 'aria-hidden': 'true' },
      el('span.shead__no', null, no),
      el('span.shead__line')),
    el('div.shead__body', null,
      kicker && el('p.shead__kicker', { 'data-reveal': 'fade' }, kicker),
      el('h2.shead__title', { 'data-reveal': 'up' },
        ...String(title).split('\n').map(l => el('span.line', null, el('span', null, l)))),
      lead && el('p.shead__lead', { 'data-reveal': 'up' }, lead)),
    aside && el('div.shead__aside', { 'data-reveal': 'up' }, aside));
}

/* --- Tag / Chip ------------------------------------------------------------ */
export const tag = (text, opts = {}) =>
  el(`span.tag${opts.tone ? '.tag--' + opts.tone : ''}`, null, text);

/* --- Button ---------------------------------------------------------------- */
/**
 * @param {{label:string, variant?:'primary'|'secondary'|'ghost'|'quiet',
 *          size?:'sm'|'md'|'lg', icon?:string, magnetic?:boolean,
 *          href?:string, onClick?:Function, attrs?:object}} o
 */
export function button(o) {
  const cls = ['btn', `btn--${o.variant || 'primary'}`, o.size ? `btn--${o.size}` : ''].filter(Boolean).join('.');
  const inner = el('span.btn__in', null,
    el('span.btn__label', null, o.label),
    o.icon !== null && el('span.btn__icon', { 'aria-hidden': 'true' }, o.icon || '→'));

  const node = el(`${o.href ? 'a' : 'button'}.${cls}`, {
    ...(o.href ? { href: o.href } : { type: 'button' }),
    ...(o.onClick ? { onClick: o.onClick } : {}),
    ...(o.magnetic !== false ? { 'data-magnetic': '0.3' } : {}),
    ...(o.attrs || {})
  }, inner);
  return node;
}

/* --- Bewertungsbalken ------------------------------------------------------ */
/**
 * Wert 1–5 als Balken mit Beschriftung. `animate` füllt ihn beim Einblenden.
 */
export function ratingBar({ label, value, max = 5, hint = null, tone = null, compact = false }) {
  const pct = (value / max) * 100;
  const fill = el('i.rbar__fill', { style: { '--to': pct + '%' } });
  return el(`div.rbar${compact ? '.rbar--compact' : ''}`, {
    'data-reveal': 'fade',
    ...(hint ? { 'data-tip': `${hint}` } : {}),
    ...(tone ? { 'data-tone': tone } : {})
  },
    el('span.rbar__label', null, label),
    el('span.rbar__track', {
      role: 'meter', 'aria-valuenow': value, 'aria-valuemin': 0,
      'aria-valuemax': max, 'aria-label': `${label}: ${value} von ${max}`
    }, fill),
    el('span.rbar__value', null, String(value), el('em', null, `/${max}`)));
}

/* --- Punkteskala (kompakte Alternative zum Balken) ------------------------- */
export const dots = (value, max = 5) =>
  el('span.dots', { 'aria-label': `${value} von ${max}` },
    ...Array.from({ length: max }, (_, i) => el(`i${i < value ? '.on' : ''}`)));

/* --- Tooltip ---------------------------------------------------------------
   Ein einziger Tooltip für die ganze Seite, gesteuert über [data-tip].
   Reagiert auf Zeiger UND Fokus – sonst wäre er per Tastatur unerreichbar.  */
let tipNode = null;
export function initTooltips(scope = document) {
  if (!tipNode) {
    tipNode = el('div.tip', { role: 'tooltip', hidden: true });
    document.body.appendChild(tipNode);
  }
  const show = (target) => {
    const text = target.dataset.tip;
    if (!text) return;
    tipNode.textContent = text;
    tipNode.hidden = false;
    const r = target.getBoundingClientRect();
    const tr = tipNode.getBoundingClientRect();
    const left = Math.min(Math.max(8, r.left + r.width / 2 - tr.width / 2), innerWidth - tr.width - 8);
    const above = r.top > tr.height + 16;
    tipNode.style.transform = `translate3d(${Math.round(left)}px, ${Math.round(above ? r.top - tr.height - 10 : r.bottom + 10)}px, 0)`;
    tipNode.dataset.dir = above ? 'up' : 'down';
    tipNode.classList.add('is-on');
  };
  const hide = () => { tipNode.classList.remove('is-on'); tipNode.hidden = true; };

  scope.addEventListener('pointerover', e => {
    const t = e.target.closest('[data-tip]');
    if (t) show(t);
  });
  scope.addEventListener('pointerout', e => { if (e.target.closest('[data-tip]')) hide(); });
  scope.addEventListener('focusin', e => {
    const t = e.target.closest('[data-tip]');
    if (t) show(t);
  });
  scope.addEventListener('focusout', hide);
  addEventListener('scroll', hide, { passive: true });
  addEventListener('keydown', e => { if (e.key === 'Escape') hide(); });
}

/* --- Modal ------------------------------------------------------------------
   Fokusfalle, Escape, Rückgabe des Fokus. Ohne das ist ein Overlay eine Falle. */
export function modal({ title, onClose = null } = {}) {
  const body = el('div.modal__body');
  const head = el('div.modal__head', null,
    el('h3.modal__title', { id: 'modal-title' }, title || ''),
    el('button.modal__x', { type: 'button', 'aria-label': 'Schließen', onClick: () => close() }, '✕'));
  const panel = el('div.modal__panel', { role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'modal-title' }, head, body);
  const root = el('div.modal', { hidden: true },
    el('div.modal__veil', { onClick: () => close() }), panel);

  let lastFocus = null;

  function trap(e) {
    if (e.key === 'Escape') { close(); return; }
    if (e.key !== 'Tab') return;
    const f = $$('a[href],button:not([disabled]),input,select,textarea,[tabindex]:not([tabindex="-1"])', panel)
      .filter(n => n.offsetParent !== null);
    if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  }

  function open(content, titleText) {
    lastFocus = document.activeElement;
    if (titleText) head.querySelector('.modal__title').textContent = titleText;
    clear(body).appendChild(content);
    root.hidden = false;
    document.documentElement.style.overflow = 'hidden';
    requestAnimationFrame(() => root.classList.add('is-open'));
    document.addEventListener('keydown', trap);
    head.querySelector('.modal__x').focus();
  }
  function close() {
    root.classList.remove('is-open');
    document.documentElement.style.overflow = '';
    document.removeEventListener('keydown', trap);
    const done = () => { root.hidden = true; clear(body); };
    env.reduced ? done() : setTimeout(done, 280);
    lastFocus?.focus();
    onClose?.();
  }
  return { root, open, close, body };
}

/* --- Laufband --------------------------------------------------------------- */
export function marquee(items, { duration = 46, separator = '·' } = {}) {
  const make = () => items.flatMap((t, i) => [
    el('span.marquee__item', null, t),
    el('span.marquee__sep', { 'aria-hidden': 'true' }, separator)
  ]);
  // Zweimal, damit die Schleife nahtlos ist
  return el('div.marquee', { style: { '--marquee-dur': duration + 's' }, 'aria-hidden': 'true' },
    el('div.marquee__track', null, ...make(), ...make()));
}

/* --- Segmentierter Umschalter ------------------------------------------------ */
export function segmented({ options, value, onChange, label }) {
  let current = value ?? options[0].value;
  const buttons = options.map(o => el('button.seg__btn', {
    type: 'button', 'aria-pressed': String(o.value === current),
    'data-tip': o.hint || null,
    onClick: () => set(o.value)
  }, o.label));
  const root = el('div.seg', { role: 'group', 'aria-label': label }, ...buttons);
  function set(v) {
    current = v;
    buttons.forEach((b, i) => b.setAttribute('aria-pressed', String(options[i].value === v)));
    onChange(v);
  }
  return { root, set, get value() { return current; } };
}
