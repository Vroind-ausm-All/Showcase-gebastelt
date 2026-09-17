/* Prototyp-Chrome: Konzept-Umschalter für alle 13 Wireframes.
   Wird im Iframe (Übersichtsseite) automatisch ausgeblendet. */
(function () {
  var CONCEPTS = [
    { n: '01', file: '01-hero.html',              title: 'Hero Layout' },
    { n: '02', file: '02-z-pattern.html',         title: 'Z-Pattern Layout' },
    { n: '03', file: '03-f-pattern.html',         title: 'F-Pattern Layout' },
    { n: '04', file: '04-grid-breaking.html',     title: 'Grid-Breaking Layout' },
    { n: '05', file: '05-content-focused.html',   title: 'Content-Focused Layout' },
    { n: '06', file: '06-fullscreen-image.html',  title: 'Fullscreen Image Layout' },
    { n: '07', file: '07-alternating.html',       title: 'Alternating Layout' },
    { n: '08', file: '08-asymmetrical.html',      title: 'Asymmetrical Layout' },
    { n: '09', file: '09-single-column.html',     title: 'Single Column Layout' },
    { n: '10', file: '10-box-based.html',         title: 'Box-Based Layout' },
    { n: '11', file: '11-cards.html',             title: 'Cards Layout' },
    { n: '12', file: '12-magazine.html',          title: 'Magazine Layout' },
    { n: '13', file: '13-horizontal-strips.html', title: 'Horizontal Strips Layout' }
  ];

  var inFrame = false;
  try { inFrame = window.self !== window.top; } catch (e) { inFrame = true; }
  if (inFrame) return;

  var current = (location.pathname.split('/').pop() || '').toLowerCase();
  var idx = CONCEPTS.findIndex(function (c) { return c.file === current; });
  if (idx < 0) idx = 0;

  var bar = document.createElement('div');
  bar.className = 'wfchrome';

  var options = CONCEPTS.map(function (c, i) {
    return '<option value="' + c.file + '"' + (i === idx ? ' selected' : '') + '>' +
           c.n + ' — ' + c.title + '</option>';
  }).join('');

  var prev = CONCEPTS[(idx - 1 + CONCEPTS.length) % CONCEPTS.length];
  var next = CONCEPTS[(idx + 1) % CONCEPTS.length];

  bar.innerHTML =
    '<span class="wfchrome__id">Wireframe ' + CONCEPTS[idx].n + '</span>' +
    '<span class="wfchrome__sep">|</span>' +
    '<span class="wfchrome__label">Konzept wechseln:</span>' +
    '<select aria-label="Konzept wechseln">' + options + '</select>' +
    '<span class="wfchrome__nav">' +
      '<a class="wfchrome__btn" href="' + prev.file + '" title="' + prev.n + ' ' + prev.title + '">&#8592;</a>' +
      '<a class="wfchrome__btn" href="' + next.file + '" title="' + next.n + ' ' + next.title + '">&#8594;</a>' +
      '<a class="wfchrome__btn" href="../index.html">Übersicht</a>' +
    '</span>';

  document.body.insertBefore(bar, document.body.firstChild);

  // Höhe der Leiste als CSS-Variable, damit sticky/fixed Header darunter andocken.
  // Im Iframe existiert die Leiste nicht – dort greift überall der Fallback 0px.
  var setH = function () {
    document.documentElement.style.setProperty('--wfchrome-h', bar.offsetHeight + 'px');
  };
  setH();
  window.addEventListener('resize', setH);
  bar.querySelector('select').addEventListener('change', function (e) {
    location.href = e.target.value;
  });
})();
