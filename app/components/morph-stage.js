/* ============================================================================
   MorphStage – „Ein Inhalt. Zwölf Richtungen.“
   Die zentrale Sektion. Ein festgesetzter Browserrahmen bleibt stehen, während
   das Scrollen die Gestaltungsrichtung durchschaltet. Der Inhalt darin wird
   NIE neu gerendert – nur data-direction wechselt. Genau das ist die Aussage.

   Bedienbar auf drei Wegen, damit es im Kundengespräch nicht vom Scrollen
   abhängt: Scrollen, Klick auf die Richtungsliste, Pfeiltasten.
   ========================================================================== */

import { el, $$, clamp, env, throttleFrame } from '../lib/dom.js';
import { renderSpecimen, setSpecimenDirection } from './specimen.js';
import { BrowserFrame, viewportSwitch } from './browser-frame.js';
import { scrollProgress } from '../motion/index.js';

export function morphStage({ directions, contentSets, metrics, onOpen }) {
  let index = 0;
  let contentId = contentSets[0].id;

  /* --- Bühne ------------------------------------------------------------ */
  const frame = new BrowserFrame({ viewport: 'desktop', height: 560 });
  let specimen = renderSpecimen(directions[0].id, contentId);
  specimen.classList.add('sp--live');   // nur hier wird an Ort und Stelle gemorpht
  frame.mount(specimen);
  frame.setLabel(directions[0].full);

  /* --- Richtungsliste links --------------------------------------------- */
  const listButtons = directions.map((d, i) => el('button.mstage__item', {
    type: 'button',
    'aria-current': i === 0 ? 'true' : 'false',
    onClick: () => goTo(i, true)
  },
    el('span.mstage__itemno', null, d.no),
    el('span.mstage__itemname', null, d.name),
    el('span.mstage__itembar', { 'aria-hidden': 'true' })));

  const list = el('div.mstage__list', { role: 'group', 'aria-label': 'Gestaltungsrichtung wählen' }, ...listButtons);

  /* --- Anzeige rechts ----------------------------------------------------- */
  const readName = el('h3.mstage__name');
  const readClaim = el('p.mstage__claim');
  const readTags = el('div.mstage__tags');
  const readMeta = el('dl.mstage__meta');

  /* --- Bedienleiste ------------------------------------------------------- */
  const vsw = viewportSwitch(v => frame.setViewport(v));
  const contentSwitch = el('div.seg', { role: 'group', 'aria-label': 'Inhalt wechseln' },
    ...contentSets.map((c, i) => el('button.seg__btn', {
      type: 'button', 'aria-pressed': String(i === 0),
      'data-tip': `${c.brand} – ${c.kind}`,
      onClick: () => setContent(c.id)
    }, c.label)));

  const counter = el('span.mstage__counter');
  const openBtn = el('button.mstage__open', {
    type: 'button', onClick: () => onOpen?.(directions[index])
  }, 'Details', el('i', { 'aria-hidden': 'true' }, '→'));

  const bar = el('div.mstage__bar', null,
    counter,
    el('div.mstage__barspace'),
    contentSwitch, vsw.root, openBtn);

  /* --- Fortschrittsanzeige ------------------------------------------------ */
  const progressFill = el('i.mstage__progfill');
  const progress = el('div.mstage__prog', { 'aria-hidden': 'true' }, progressFill);

  const stage = el('div.mstage__stage', null, bar, frame.root, progress);

  const sticky = el('div.mstage__sticky', null,
    el('div.mstage__grid', null,
      list,
      stage,
      el('div.mstage__read', null, readName, readClaim, readTags, readMeta)));

  /* Die Scrollstrecke: pro Richtung eine Bildschirmhöhe.
     Auf schmalen Geräten kürzer – dort führt die Liste, nicht das Scrollen. */
  const scroller = el('div.mstage', { style: { '--steps': directions.length } }, sticky);

  /**
   * Den aktiven Eintrag in der Liste sichtbar halten, OHNE das Dokument zu
   * scrollen. scrollIntoView würde hier den Seiten-Scroll mitziehen und das
   * Springen zu späteren Abschnitten unbrauchbar machen.
   */
  function keepInList(btn) {
    const box = list.getBoundingClientRect();
    const b = btn.getBoundingClientRect();
    const vertical = list.scrollHeight > list.clientHeight + 1;
    const horizontal = list.scrollWidth > list.clientWidth + 1;
    if (vertical) {
      if (b.top < box.top) list.scrollTop -= (box.top - b.top);
      else if (b.bottom > box.bottom) list.scrollTop += (b.bottom - box.bottom);
    }
    if (horizontal) {
      if (b.left < box.left) list.scrollLeft -= (box.left - b.left);
      else if (b.right > box.right) list.scrollLeft += (b.right - box.right);
    }
  }

  /* --- Zustand ------------------------------------------------------------ */
  function render() {
    const d = directions[index];
    setSpecimenDirection(specimen, d.id);
    frame.setLabel(d.full);
    frame.setUrl(contentSets.find(c => c.id === contentId).brand.toLowerCase().replace(/\s+/g, '') + '.example');

    listButtons.forEach((b, i) => b.setAttribute('aria-current', String(i === index)));
    keepInList(listButtons[index]);

    readName.textContent = d.full;
    readClaim.textContent = d.claim;
    readTags.replaceChildren(...d.tags.map(t => el('span.tag.tag--quiet', null, t)));
    readMeta.replaceChildren(
      el('dt', null, 'Blickführung'), el('dd', null, d.gaze),
      el('dt', null, 'Stärke'), el('dd', null, d.strength),
      el('dt', null, 'Schwäche'), el('dd', null, d.weakness),
      el('dt', null, 'Passt zu'), el('dd', null, d.fit));

    counter.textContent = `${d.no} / ${String(directions.length).padStart(2, '0')}`;
    progressFill.style.transform = `scaleX(${(index + 1) / directions.length})`;
    scroller.dataset.current = d.id;
  }

  function goTo(i, scrollToo = false) {
    const next = clamp(i, 0, directions.length - 1);
    if (next === index && !scrollToo) return;
    index = next;
    render();
    if (scrollToo) {
      // Auf die zugehörige Scrollposition springen, damit Scroll und Liste
      // nicht auseinanderlaufen.
      const r = scroller.getBoundingClientRect();
      const span = scroller.offsetHeight - innerHeight;
      if (span > 0) {
        const target = scrollY + r.top + span * ((index + 0.5) / directions.length);
        scrollTo({ top: target, behavior: env.reduced ? 'auto' : 'smooth' });
      }
    }
  }

  function setContent(id) {
    contentId = id;
    Array.from(contentSwitch.children).forEach((b, i) =>
      b.setAttribute('aria-pressed', String(contentSets[i].id === id)));
    // Neu rendern ist hier richtig: der INHALT ändert sich, nicht die Form.
    const fresh = renderSpecimen(directions[index].id, contentId);
    fresh.classList.add('sp--live');
    specimen = fresh;
    frame.mount(fresh);
    render();
  }

  /* --- Scrollsteuerung ---------------------------------------------------- */
  scrollProgress(p => {
    if (env.narrow) return;                     // schmal: Liste führt
    const i = clamp(Math.floor(p * directions.length), 0, directions.length - 1);
    if (i !== index) { index = i; render(); }
  }, scroller);

  /* --- Tastatur ----------------------------------------------------------- */
  sticky.addEventListener('keydown', e => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); goTo(index + 1, true); }
    if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') { e.preventDefault(); goTo(index - 1, true); }
  });

  render();
  return { root: scroller, goTo, get current() { return directions[index]; } };
}
