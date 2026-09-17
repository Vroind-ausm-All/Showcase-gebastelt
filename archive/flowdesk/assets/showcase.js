/* ==========================================================================
   Showcase-Interaktionen: Reveals, Parallaxe, Filter, Lightbox, Matrix.
   Vanilla JS, keine Abhängigkeiten. "Bewegung reduzieren" wird respektiert.
   ========================================================================== */
(function () {
  'use strict';

  var C = window.CONCEPTS || [];
  var CRIT = window.CRITERIA || [];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var SHORT = {
    dichte: 'Dichte', dynamik: 'Dynamik', einfach: 'Einfach', story: 'Story', scan: 'Scan',
    conv: 'Conversion', mobile: 'Mobile', inhalte: 'Inhalt', visuals: 'Visuals'
  };

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* ---------- Theme ------------------------------------------------------ */
  var root = document.documentElement;
  try {
    var saved = localStorage.getItem('wf-theme');
    if (saved) root.setAttribute('data-theme', saved);
  } catch (e) {}
  $('#theme').addEventListener('click', function () {
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('wf-theme', next); } catch (e) {}
  });

  /* ---------- Scrollfortschritt und Kopfzeile ---------------------------- */
  var progress = $('#progress'), hd = $('#hd'), ticking = false;
  function onScroll() {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = 'scaleX(' + (max > 0 ? window.scrollY / max : 0) + ')';
    hd.classList.toggle('is-stuck', window.scrollY > 12);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- Reveal beim Scrollen --------------------------------------- */
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      // Auch Elemente aufdecken, die beim Ankersprung bereits überscrollt wurden
      if (!e.isIntersecting && e.boundingClientRect.top > 0) return;
      e.target.classList.add('is-in');
      io.unobserve(e.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  function observe(el, i) { el.style.setProperty('--d', ((i || 0) % 6) * 70 + 'ms'); io.observe(el); }
  $$('[data-reveal]').forEach(observe);

  /* ---------- Zähler im Hero --------------------------------------------- */
  var counters = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      counters.unobserve(e.target);
      var el = e.target, to = parseInt(el.getAttribute('data-count'), 10), t0 = null;
      if (reduce) { el.textContent = to; return; }
      requestAnimationFrame(function step(ts) {
        if (!t0) t0 = ts;
        var p = Math.min(1, (ts - t0) / 900);
        el.textContent = Math.round(to * (1 - Math.pow(1 - p, 3)));
        if (p < 1) requestAnimationFrame(step);
      });
    });
  }, { threshold: 0.6 });
  $$('[data-count]').forEach(function (el) { counters.observe(el); });

  /* ---------- Mini-Wireframe aus Template klonen ------------------------- */
  function mini(n) {
    var tpl = document.querySelector('template[data-mini="' + n + '"]');
    return tpl ? tpl.content.firstElementChild.cloneNode(true) : document.createElement('div');
  }

  /* ---------- Hero: rotierender Stapel + Parallaxe ----------------------- */
  var stack = $('#stack'), stackTag = $('#stackTag'), stackWrap = $('#stackWrap');
  C.forEach(function (c) {
    var item = document.createElement('div');
    item.className = 'stack__item';
    item.appendChild(mini(c.n));
    stack.appendChild(item);
  });
  var cap = document.createElement('div');
  cap.className = 'stack__cap';
  stackWrap.appendChild(cap);
  cap.appendChild(stackTag);
  var hint = document.createElement('span');
  hint.className = 'stack__hint';
  hint.textContent = 'zum Öffnen klicken';
  cap.appendChild(hint);
  var dots = document.createElement('span');
  dots.className = 'stack__dots';
  dots.innerHTML = C.map(function () { return '<i></i>'; }).join('');
  cap.appendChild(dots);

  function scaleStack() { stack.style.setProperty('--s', (stack.clientWidth / 420).toFixed(4)); }
  scaleStack();
  window.addEventListener('resize', scaleStack);

  var si = 0, timer = null;
  function renderStack() {
    var items = stack.children;
    for (var i = 0; i < items.length; i++) items[i].className = 'stack__item' + (i === si ? ' is-on' : '');
    for (var j = 0; j < dots.children.length; j++) dots.children[j].className = j === si ? 'on' : '';
    stackTag.textContent = C[si].n + ' — ' + C[si].title;
  }
  function cycle() { si = (si + 1) % C.length; renderStack(); }
  renderStack();
  if (!reduce) timer = setInterval(cycle, 2800);
  stack.addEventListener('click', function () { openLb(si); });
  stack.addEventListener('mouseenter', function () { if (timer) clearInterval(timer); });
  stack.addEventListener('mouseleave', function () { if (!reduce) timer = setInterval(cycle, 2800); });

  if (!reduce && window.matchMedia('(hover: hover)').matches) {
    window.addEventListener('mousemove', function (e) {
      var x = (e.clientX / window.innerWidth - .5), y = (e.clientY / window.innerHeight - .5);
      stackWrap.style.transform = 'translate3d(' + (x * -18).toFixed(1) + 'px,' + (y * -14).toFixed(1) + 'px,0)';
    }, { passive: true });
  }

  /* ---------- FLIP-Helfer ------------------------------------------------ */
  function flip(items, mutate) {
    if (reduce) { mutate(); return; }
    var first = items.map(function (el) { return el.getBoundingClientRect(); });
    mutate();
    items.forEach(function (el, i) {
      var l = el.getBoundingClientRect();
      var dx = first[i].left - l.left, dy = first[i].top - l.top;
      if (!dx && !dy) return;
      el.animate(
        [{ transform: 'translate(' + dx + 'px,' + dy + 'px)' }, { transform: 'none' }],
        { duration: 460, easing: 'cubic-bezier(.22,.78,.3,1)' }
      );
    });
  }

  /* ---------- Konzeptkarten ---------------------------------------------- */
  var grid = $('#grid');
  C.forEach(function (c, idx) {
    var top2 = Object.keys(c.r).sort(function (a, b) { return c.r[b] - c.r[a]; }).slice(0, 2);
    var card = document.createElement('article');
    card.className = 'card';
    card.tabIndex = 0;
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', c.n + ' ' + c.title + ' – Prototyp öffnen');
    card.dataset.i = idx;
    card.setAttribute('data-reveal', '');

    var head = document.createElement('div');
    head.className = 'card__top';
    head.innerHTML = '<span class="card__n">' + c.n + '</span><div class="card__tags">' +
      top2.map(function (k) { return '<span class="tag">' + SHORT[k] + '</span>'; }).join('') + '</div>';

    var fig = document.createElement('div');
    fig.className = 'card__figure';
    fig.appendChild(mini(c.n));

    var body = document.createElement('div');
    body.innerHTML = '<h3>' + c.title + '</h3><p class="card__claim">' + c.claim + '</p>';

    var foot = document.createElement('div');
    foot.className = 'card__foot';
    foot.innerHTML = '<span class="btn btn--ghost btn--sm">Prototyp ansehen</span><span class="spark">' +
      CRIT.map(function (k) { return '<i style="height:' + (c.r[k.key] / 5 * 100) + '%" title="' + k.label + ': ' + c.r[k.key] + '/5"></i>'; }).join('') +
      '</span>';

    card.appendChild(head); card.appendChild(fig); card.appendChild(body); card.appendChild(foot);
    grid.appendChild(card);
    observe(card, idx);

    card.addEventListener('click', function () { openLb(idx); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLb(idx); }
    });
    if (!reduce) {
      card.addEventListener('pointermove', function (e) {
        var r = card.getBoundingClientRect();
        card.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        card.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    }
  });

  /* ---------- Filter ------------------------------------------------------ */
  var RULES = {
    all: function () { return true; },
    conv: function (c) { return c.r.conv >= 4; },
    inhalte: function (c) { return c.r.inhalte >= 4; },
    visuals: function (c) { return c.r.visuals >= 4; },
    mobile: function (c) { return c.r.mobile >= 5; },
    dynamik: function (c) { return c.r.dynamik >= 4; }
  };
  var countEl = $('#count');
  $$('.chip').forEach(function (chip) {
    chip.addEventListener('click', function () {
      $$('.chip').forEach(function (c2) { c2.setAttribute('aria-pressed', String(c2 === chip)); });
      var rule = RULES[chip.dataset.filter] || RULES.all;
      var cards = $$('.card');
      var visible = cards.filter(function (el) { return !el.classList.contains('is-hidden'); });
      flip(visible, function () {
        var n = 0;
        cards.forEach(function (el) {
          var keep = rule(C[+el.dataset.i]);
          el.classList.toggle('is-hidden', !keep);
          if (keep) n++;
        });
        countEl.textContent = n + ' von ' + C.length;
      });
    });
  });

  /* ---------- Lightbox mit Live-Prototyp ---------------------------------- */
  var lb = $('#lb'), vFrame = $('#vFrame'), device = $('#device'), vBar = $('#vBar');
  var VIEWS = { desktop: { w: 1440, label: 'Desktop · 1440 px' }, mobile: { w: 390, label: 'Mobile · 390 px' } };
  var view = 'desktop', cur = 0, lastFocus = null;

  function renderFacts(c) {
    var f = [
      ['Grundidee', c.idea], ['Blickführung', c.gaze], ['Position der wichtigsten CTA', c.cta],
      ['Vorteil dieser Struktur', c.pro, 'fct--pro'], ['Mögliche Schwäche', c.con, 'fct--con'],
      ['Geeignete Website-Typen', c.types], ['Verhalten auf Mobile', c.mobile]
    ].map(function (x) {
      return '<div class="fct ' + (x[2] || '') + '"><h4>' + x[0] + '</h4><p>' + x[1] + '</p></div>';
    }).join('');
    var meters = '<div class="fct"><h4>Ausprägung</h4><div class="lb__meters">' + CRIT.map(function (k) {
      return '<div class="lb__meter"><span>' + k.label + '</span>' +
        '<span class="bar" data-v="' + c.r[k.key] + '" style="--v:' + c.r[k.key] + '"><i></i></span>' +
        '<span>' + c.r[k.key] + '/5</span></div>';
    }).join('') + '</div></div>';
    $('#lbFacts').innerHTML = f + meters;
    // Balken nach dem Einblenden animieren
    requestAnimationFrame(function () {
      $$('#lbFacts .bar i').forEach(function (i) { i.style.width = 'calc(var(--v) / 5 * 100%)'; });
    });
  }

  function fitViewer() {
    var v = VIEWS[view];
    var box = device.parentElement;
    var availW = Math.max(200, box.clientWidth - 44);
    var availH = Math.max(240, box.clientHeight - 44);
    var scale = Math.min(1, availW / v.w);
    var frameH = Math.round((availH - 22) / scale);      // so viel Seite zeigen, wie Platz ist
    vFrame.style.width = v.w + 'px';
    vFrame.style.height = frameH + 'px';
    vFrame.style.transform = 'scale(' + scale + ')';
    device.style.width = Math.round(v.w * scale) + 'px';
    device.style.height = Math.round(frameH * scale) + 22 + 'px';
    vBar.textContent = v.label + ' · scrollbar';
  }

  function show(i) {
    cur = (i + C.length) % C.length;
    var c = C[cur];
    $('#lbN').textContent = c.n;
    $('#lbTitle').textContent = c.title;
    $('#lbOpen').href = 'wireframes/' + c.slug;
    vFrame.src = 'wireframes/' + c.slug;
    renderFacts(c);
    fitViewer();
  }

  function openLb(i) {
    lastFocus = document.activeElement;
    lb.hidden = false;
    document.body.style.overflow = 'hidden';
    show(i);
    requestAnimationFrame(function () { lb.classList.add('is-open'); fitViewer(); });
    $('#lbNext').focus();
  }
  function closeLb() {
    lb.classList.remove('is-open');
    document.body.style.overflow = '';
    setTimeout(function () { lb.hidden = true; vFrame.src = 'about:blank'; }, 320);
    if (lastFocus) lastFocus.focus();
  }

  $$('[data-close]').forEach(function (el) { el.addEventListener('click', closeLb); });
  $('#lbPrev').addEventListener('click', function () { show(cur - 1); });
  $('#lbNext').addEventListener('click', function () { show(cur + 1); });
  $('#vDesk').addEventListener('click', function () { setView('desktop'); });
  $('#vMob').addEventListener('click', function () { setView('mobile'); });
  function setView(v) {
    view = v;
    $('#vDesk').setAttribute('aria-pressed', String(v === 'desktop'));
    $('#vMob').setAttribute('aria-pressed', String(v === 'mobile'));
    fitViewer();
  }
  document.addEventListener('keydown', function (e) {
    if (lb.hidden) return;
    if (e.key === 'Escape') closeLb();
    if (e.key === 'ArrowRight') show(cur + 1);
    if (e.key === 'ArrowLeft') show(cur - 1);
  });
  window.addEventListener('resize', function () { if (!lb.hidden) fitViewer(); });

  /* ---------- Vergleichsmatrix -------------------------------------------- */
  var thead = $('#table thead'), tbody = $('#table tbody');
  thead.innerHTML = '<tr><th scope="col" data-key="n">Konzept<span class="arrow">↓</span></th>' +
    CRIT.map(function (k) { return '<th scope="col" data-key="' + k.key + '">' + k.label + '<span class="arrow">↓</span></th>'; }).join('') + '</tr>';

  function row(c) {
    var tr = document.createElement('tr');
    tr.innerHTML = '<th scope="row">' + c.n + ' — ' + c.title + '<span>' + c.claim + '</span></th>' +
      CRIT.map(function (k, i) {
        return '<td><span class="cell"><span class="bar" data-v="' + c.r[k.key] + '" style="--v:' + c.r[k.key] +
          ';--d:' + (i * 45) + 'ms" title="' + k.label + ': ' + c.r[k.key] + ' von 5"><i></i></span>' +
          '<b class="v">' + c.r[k.key] + '</b></span></td>';
      }).join('');
    tr.dataset.n = c.n;
    return tr;
  }
  C.forEach(function (c) { tbody.appendChild(row(c)); });

  var sortKey = 'n', sortDir = 1;
  $$('#table thead th').forEach(function (th) {
    th.addEventListener('click', function () {
      var key = th.dataset.key;
      sortDir = (key === sortKey) ? -sortDir : (key === 'n' ? 1 : -1);
      sortKey = key;
      $$('#table thead th').forEach(function (o) { o.removeAttribute('aria-sort'); o.querySelector('.arrow').textContent = '↓'; });
      th.setAttribute('aria-sort', sortDir === 1 ? 'ascending' : 'descending');
      th.querySelector('.arrow').textContent = sortDir === 1 ? '↑' : '↓';

      var rows = $$('#table tbody tr');
      flip(rows, function () {
        rows.slice().sort(function (a, b) {
          var ca = C[+a.dataset.n - 1], cb = C[+b.dataset.n - 1];
          var va = key === 'n' ? +ca.n : ca.r[key], vb = key === 'n' ? +cb.n : cb.r[key];
          return va === vb ? (+ca.n - +cb.n) : (va - vb) * sortDir;
        }).forEach(function (tr) { tbody.appendChild(tr); });
      });
    });
  });

  /* ---------- Laufband ---------------------------------------------------- */
  var ticker = $('#ticker');
  var line = C.map(function (c) { return '<span><b>' + c.n + '</b> ' + c.title + '</span>'; }).join('');
  ticker.innerHTML = line + line;
})();
