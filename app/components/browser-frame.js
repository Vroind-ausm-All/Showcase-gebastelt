/* ============================================================================
   BrowserFrame
   Rahmen um eine Musterseite, inklusive maßstabsgetreuer Einpassung.

   Die Technik (feste Entwurfsbreite, per transform:scale eingepasst) stammt
   aus beiden Ursprungs-Repos und ist dort bewährt: Was hier zu sehen ist,
   ist exakt 1280 px bzw. 390 px breit gerechnet – nur verkleinert dargestellt.
   Dadurch stimmen Strichstärken, Zeilenlängen und Proportionen.
   ========================================================================== */

import { el, $, throttleFrame } from '../lib/dom.js';

export const VIEWPORTS = {
  desktop: { w: 1280, label: 'Desktop', note: '1280 px' },
  mobile:  { w: 390,  label: 'Mobile',  note: '390 px' }
};

export class BrowserFrame {
  /**
   * @param {{viewport?:'desktop'|'mobile', chrome?:boolean, height?:number|null,
   *          url?:string, label?:string}} opts
   *   height: sichtbare Höhe in px (null = Inhalt bestimmt die Höhe)
   */
  constructor(opts = {}) {
    this.viewport = opts.viewport || 'desktop';
    this.height = opts.height ?? null;
    this.showChrome = opts.chrome !== false;

    this.page = el('div.frame__page');
    this.scroller = el('div.frame__scroll', null, this.page);

    this.urlEl = el('span.frame__url', null, opts.url || 'nordfeld.example');
    this.labelEl = el('span.frame__badge');

    this.bar = this.showChrome
      ? el('div.frame__bar', { 'aria-hidden': 'true' },
          el('span.frame__dots', null, el('i'), el('i'), el('i')),
          el('span.frame__addr', null, this.urlEl),
          this.labelEl)
      : null;

    this.root = el('div.frame', { dataset: { viewport: this.viewport } },
      this.bar, this.scroller);

    this._fit = throttleFrame(() => this.fit());
    addEventListener('resize', this._fit, { passive: true });
    if (window.ResizeObserver) {
      this._ro = new ResizeObserver(this._fit);
      this._ro.observe(this.root);
    }
  }

  /** Inhalt setzen (ein Element oder nichts). */
  mount(node) {
    this.page.replaceChildren(node);
    this.fit();
    return this;
  }

  setViewport(name) {
    if (!VIEWPORTS[name]) return this;
    this.viewport = name;
    this.root.dataset.viewport = name;
    this.fit();
    return this;
  }

  setLabel(text) { this.labelEl.textContent = text || ''; return this; }
  setUrl(text)   { this.urlEl.textContent = text || ''; return this; }

  /** Maßstab neu berechnen. */
  fit() {
    const v = VIEWPORTS[this.viewport];
    const avail = this.scroller.clientWidth;
    if (!avail) return;
    const scale = Math.min(1, avail / v.w);
    this.page.style.width = v.w + 'px';
    this.page.style.transform = `scale(${scale.toFixed(5)})`;
    this.root.style.setProperty('--frame-scale', scale.toFixed(5));

    if (this.height !== null) {
      // Feste Bühnenhöhe: so viel Seite zeigen, wie hineinpasst.
      this.page.style.height = Math.round(this.height / scale) + 'px';
      this.scroller.style.height = this.height + 'px';
    } else {
      this.page.style.height = '';
      this.scroller.style.height = Math.round(this.page.scrollHeight * scale) + 'px';
    }
    return this;
  }

  setHeight(px) { this.height = px; this.fit(); return this; }

  destroy() {
    removeEventListener('resize', this._fit);
    this._ro?.disconnect();
    this.root.remove();
  }
}

/** Kurzform für eine Bedienleiste Desktop/Mobile. */
export function viewportSwitch(onChange, initial = 'desktop') {
  let current = initial;
  const mk = (key) => el('button.vsw__btn', {
    type: 'button',
    'aria-pressed': String(key === current),
    onClick: () => set(key)
  }, VIEWPORTS[key].label, el('span.vsw__note', null, VIEWPORTS[key].note));

  const buttons = { desktop: mk('desktop'), mobile: mk('mobile') };
  const root = el('div.vsw', { role: 'group', 'aria-label': 'Ansicht wählen' },
    buttons.desktop, buttons.mobile);

  function set(key) {
    current = key;
    Object.entries(buttons).forEach(([k, b]) => b.setAttribute('aria-pressed', String(k === key)));
    onChange(key);
  }
  return { root, set, get current() { return current; } };
}
