/* ============================================================================
   BEWEGUNGS-SYSTEM
   Ein kleiner, konsistenter Satz an Bausteinen statt hundert Einzellösungen.

     reveal        Einblenden beim Scrollen, mit Staffelung
     stagger       Verzögerung entlang einer Gruppe
     parallax      Tiefenversatz, transform-only
     magnetic      Zeiger zieht Elemente an
     tilt          3D-Neigung unter dem Zeiger
     spotlight     Zeigerposition als CSS-Variable (für Licht/Glanz)
     counter       Zahl zählt hoch, sobald sichtbar
     scrollProgress  Fortschritt 0…1 über ein Element oder das Dokument
     flip          Layoutwechsel weich animieren
     inView        allgemeine Sichtbarkeitsmeldung

   Regeln: nur transform und opacity. Alles respektiert prefers-reduced-motion.
   Alles wird beim Verlassen des Viewports still.
   ========================================================================== */

import { $$, env, clamp, norm, throttleFrame } from '../lib/dom.js';

/* --- gemeinsame Beobachter ------------------------------------------------ */
const revealIO = new IntersectionObserver(entries => {
  for (const e of entries) {
    // Auch Elemente aufdecken, die per Ankersprung bereits überscrollt wurden.
    if (!e.isIntersecting && e.boundingClientRect.top > 0) continue;
    e.target.classList.add('is-in');
    revealIO.unobserve(e.target);
  }
}, { threshold: 0.08, rootMargin: '0px 0px -8% 0px' });

/**
 * Elemente beim Scrollen einblenden.
 * @param {ParentNode|Element[]} scope
 * @param {{stagger?:number, base?:number}} [opts]
 */
export function reveal(scope = document, opts = {}) {
  const { stagger = 1, base = 0 } = opts;
  const nodes = Array.isArray(scope) ? scope : $$('[data-reveal]', scope);
  nodes.forEach((node, i) => {
    if (node.dataset.revealBound) return;
    node.dataset.revealBound = '1';
    const own = node.dataset.revealDelay;
    const delay = own !== undefined ? +own : base + (i % 8) * (Number(getComputedStyle(node).getPropertyValue('--stagger-step')) || 62) * stagger;
    node.style.setProperty('--reveal-delay', `${Math.round(delay)}ms`);
    if (env.reduced) { node.classList.add('is-in'); return; }
    revealIO.observe(node);
  });
  return nodes;
}

/** Staffelung auf eine Gruppe legen, ohne data-reveal neu zu binden. */
export function stagger(nodes, step = 62, base = 0) {
  nodes.forEach((n, i) => n.style.setProperty('--reveal-delay', `${base + i * step}ms`));
}

/* --- Parallaxe ------------------------------------------------------------ */
const parallaxItems = new Set();
let parallaxRunning = false;

function parallaxFrame() {
  const h = innerHeight;
  for (const { node, depth, max } of parallaxItems) {
    const r = node.getBoundingClientRect();
    if (r.bottom < -200 || r.top > h + 200) continue;   // außerhalb: nicht rechnen
    const p = (r.top + r.height / 2 - h / 2) / h;        // -1 … 1
    node.style.setProperty('--py', `${clamp(-p * depth * 100, -max, max).toFixed(2)}px`);
  }
  parallaxRunning = false;
}
const queueParallax = () => { if (!parallaxRunning) { parallaxRunning = true; requestAnimationFrame(parallaxFrame); } };

/**
 * Tiefenversatz. depth ~0.04–0.3; max begrenzt den Ausschlag in px.
 */
export function parallax(scope = document) {
  if (env.reduced) return;
  const nodes = $$('[data-parallax]', scope).filter(n => !n.dataset.parallaxBound);
  if (!nodes.length) return;
  const first = parallaxItems.size === 0;
  nodes.forEach(node => {
    node.dataset.parallaxBound = '1';
    parallaxItems.add({
      node,
      depth: parseFloat(node.dataset.parallax) || 0.1,
      max: parseFloat(node.dataset.parallaxMax) || 90
    });
  });
  if (first) {
    addEventListener('scroll', queueParallax, { passive: true });
    addEventListener('resize', queueParallax, { passive: true });
  }
  queueParallax();
}

/* --- Magnetische Elemente ------------------------------------------------- */
/**
 * Zieht ein Element zum Zeiger, solange dieser im Radius ist.
 * Der Button bleibt an seiner Stelle klickbar – bewegt wird nur die Darstellung.
 */
export function magnetic(scope = document) {
  if (!env.pointerFx) return;
  $$('[data-magnetic]', scope).forEach(node => {
    if (node.dataset.magBound) return;
    node.dataset.magBound = '1';
    const strength = parseFloat(node.dataset.magnetic) || 0.32;
    const radius = parseFloat(node.dataset.magneticRadius) || 90;

    const onMove = throttleFrame(e => {
      const r = node.getBoundingClientRect();
      const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      const dx = e.clientX - cx, dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      const reach = Math.max(r.width, r.height) / 2 + radius;
      if (dist > reach) { release(); return; }
      node.classList.add('is-pulling');
      node.style.setProperty('--mx', `${(dx * strength).toFixed(1)}px`);
      node.style.setProperty('--my', `${(dy * strength).toFixed(1)}px`);
    });
    function release() {
      node.classList.remove('is-pulling');
      node.style.setProperty('--mx', '0px');
      node.style.setProperty('--my', '0px');
    }
    addEventListener('pointermove', onMove, { passive: true });
    node.addEventListener('pointerleave', release);
    addEventListener('blur', release);
  });
}

/* --- 3D-Neigung ----------------------------------------------------------- */
export function tilt(scope = document) {
  if (!env.pointerFx) return;
  $$('[data-tilt]', scope).forEach(node => {
    if (node.dataset.tiltBound) return;
    node.dataset.tiltBound = '1';
    const amount = parseFloat(node.dataset.tilt) || 6;
    const onMove = throttleFrame(e => {
      const r = node.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      node.classList.add('is-tilting');
      node.style.setProperty('--ry', `${(px * amount).toFixed(2)}deg`);
      node.style.setProperty('--rx', `${(-py * amount).toFixed(2)}deg`);
    });
    node.addEventListener('pointermove', onMove);
    node.addEventListener('pointerleave', () => {
      node.classList.remove('is-tilting');
      node.style.setProperty('--rx', '0deg');
      node.style.setProperty('--ry', '0deg');
    });
  });
}

/* --- Zeigerlicht ---------------------------------------------------------- */
/** Schreibt --mx/--my als lokale Koordinaten – Basis für Glanz und Glühen. */
export function spotlight(scope = document) {
  if (!env.pointerFx) return;
  $$('[data-spotlight]', scope).forEach(node => {
    if (node.dataset.spotBound) return;
    node.dataset.spotBound = '1';
    const onMove = throttleFrame(e => {
      const r = node.getBoundingClientRect();
      node.style.setProperty('--sx', `${((e.clientX - r.left) / r.width * 100).toFixed(1)}%`);
      node.style.setProperty('--sy', `${((e.clientY - r.top) / r.height * 100).toFixed(1)}%`);
    });
    node.addEventListener('pointermove', onMove);
  });
}

/* --- Zähler --------------------------------------------------------------- */
const counterIO = new IntersectionObserver(entries => {
  for (const e of entries) {
    if (!e.isIntersecting) continue;
    counterIO.unobserve(e.target);
    runCount(e.target);
  }
}, { threshold: 0.5 });

function runCount(node) {
  const to = parseFloat(node.dataset.count);
  const dec = (node.dataset.countDecimals | 0);
  if (env.reduced) { node.textContent = to.toFixed(dec); return; }
  const dur = parseFloat(node.dataset.countDuration) || 1100;
  let t0 = null;
  requestAnimationFrame(function step(ts) {
    if (t0 === null) t0 = ts;
    const p = Math.min(1, (ts - t0) / dur);
    const eased = 1 - Math.pow(1 - p, 3);
    node.textContent = (to * eased).toFixed(dec);
    if (p < 1) requestAnimationFrame(step);
  });
}

export function counters(scope = document) {
  $$('[data-count]', scope).forEach(n => {
    if (n.dataset.countBound) return;
    n.dataset.countBound = '1';
    counterIO.observe(n);
  });
}

/* --- Scroll-Fortschritt --------------------------------------------------- */
/**
 * Ruft fn(0…1) auf, während `node` durch den Viewport läuft.
 * Ohne node: Fortschritt über das gesamte Dokument.
 * Gibt eine Abmeldefunktion zurück.
 */
export function scrollProgress(fn, node = null, opts = {}) {
  const { start = 0, end = 1 } = opts;
  const tick = throttleFrame(() => {
    let p;
    if (node) {
      const r = node.getBoundingClientRect();
      const span = r.height - innerHeight;
      p = span > 0 ? norm(-r.top, span * start, span * end) : (r.top < innerHeight / 2 ? 1 : 0);
    } else {
      const max = document.documentElement.scrollHeight - innerHeight;
      p = max > 0 ? clamp(scrollY / max, 0, 1) : 0;
    }
    fn(p);
  });
  addEventListener('scroll', tick, { passive: true });
  addEventListener('resize', tick, { passive: true });
  tick();
  return () => {
    removeEventListener('scroll', tick);
    removeEventListener('resize', tick);
  };
}

/* --- FLIP ----------------------------------------------------------------- */
/** Layoutwechsel weich animieren: Positionen messen, ändern, Differenz spielen. */
export function flip(nodes, mutate, { duration = 460 } = {}) {
  if (env.reduced) { mutate(); return; }
  const first = nodes.map(n => n.getBoundingClientRect());
  mutate();
  nodes.forEach((n, i) => {
    const last = n.getBoundingClientRect();
    const dx = first[i].left - last.left, dy = first[i].top - last.top;
    if (!dx && !dy) return;
    n.animate(
      [{ transform: `translate3d(${dx}px, ${dy}px, 0)` }, { transform: 'none' }],
      { duration, easing: 'cubic-bezier(.22,.78,.30,1)' }
    );
  });
}

/* --- allgemeine Sichtbarkeit ---------------------------------------------- */
/** Meldet Ein- und Austritt eines Elements; für Sektionswechsel. */
export function inView(node, onEnter, onLeave, opts = {}) {
  const io = new IntersectionObserver(([e]) => {
    if (e.isIntersecting) onEnter?.(e); else onLeave?.(e);
  }, { threshold: 0.5, ...opts });
  io.observe(node);
  return () => io.disconnect();
}

/** Alles Übliche auf einen Bereich anwenden. */
export function enhance(scope = document) {
  reveal(scope);
  parallax(scope);
  magnetic(scope);
  tilt(scope);
  spotlight(scope);
  counters(scope);
}
