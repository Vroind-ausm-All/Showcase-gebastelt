/* ============================================================================
   DOM-Helfer. Bewusst klein: keine Abhängigkeiten, keine Abstraktionsschicht.
   ========================================================================== */

export const $  = (sel, root = document) => root.querySelector(sel);
export const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));

/** Element bauen. `el('div.card', {aria-label:'x'}, child, 'text')` */
export function el(spec, attrs = null, ...children) {
  const [tagAndId, ...classes] = String(spec).split('.');
  const [tag, id] = tagAndId.split('#');
  const node = document.createElement(tag || 'div');
  if (id) node.id = id;
  if (classes.length) node.className = classes.join(' ');
  if (attrs) {
    for (const [k, v] of Object.entries(attrs)) {
      if (v === null || v === undefined || v === false) continue;
      if (k === 'class') node.className = [node.className, v].filter(Boolean).join(' ');
      else if (k === 'style' && typeof v === 'object') Object.assign(node.style, v);
      else if (k === 'html') node.innerHTML = v;
      else if (k.startsWith('on') && typeof v === 'function') node.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'dataset') Object.assign(node.dataset, v);
      else node.setAttribute(k, v === true ? '' : v);
    }
  }
  append(node, children);
  return node;
}

export function append(parent, children) {
  for (const c of children.flat(4)) {
    if (c === null || c === undefined || c === false) continue;
    parent.appendChild(c instanceof Node ? c : document.createTextNode(String(c)));
  }
  return parent;
}

export const clear = node => { while (node.firstChild) node.removeChild(node.firstChild); return node; };

/** Text sicher in Markup einsetzen. */
export const esc = s => String(s).replace(/[&<>"']/g, c =>
  ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));

/** 0…1 innerhalb [a,b], außerhalb geklemmt. */
export const norm = (v, a, b) => clamp((v - a) / (b - a || 1), 0, 1);

export const lerp = (a, b, t) => a + (b - a) * t;

/** Ein rAF pro Frame, egal wie oft aufgerufen. */
export function throttleFrame(fn) {
  let queued = false, lastArgs;
  return (...args) => {
    lastArgs = args;
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; fn(...lastArgs); });
  };
}

export function debounce(fn, ms = 150) {
  let t;
  return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); };
}

/* --- Umgebungsabfragen ---------------------------------------------------- */
const mqReduce = matchMedia('(prefers-reduced-motion: reduce)');
const mqHover  = matchMedia('(hover: hover) and (pointer: fine)');
const mqNarrow = matchMedia('(max-width: 720px)');

export const env = {
  get reduced() { return mqReduce.matches; },
  get hover()   { return mqHover.matches; },
  get narrow()  { return mqNarrow.matches; },
  /** Feine Zeigerinteraktion nur, wenn sie auch etwas bringt. */
  get pointerFx() { return mqHover.matches && !mqReduce.matches; },
  onChange(fn) {
    [mqReduce, mqHover, mqNarrow].forEach(mq => mq.addEventListener('change', fn));
  }
};

/** localStorage, das in privaten Fenstern nicht die Seite mitnimmt. */
export const store = {
  get(key, fallback = null) {
    try { const v = localStorage.getItem(key); return v === null ? fallback : JSON.parse(v); }
    catch { return fallback; }
  },
  set(key, value) {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* egal */ }
  }
};
