#!/usr/bin/env python3
"""Baut aus wireframes/src/*.html die Wireframe-Dokumentation.

Quellformat je Konzept (Marker als HTML-Kommentare):
  @@META  key: value je Zeile
  @@THUMB    Mini-Strukturdiagramm fuer die Uebersicht
  @@STYLE    CSS, jede Regel mit .cNN praefixiert (kollisionsfrei)
  @@DESKTOP  Rahmeninhalt 1440px
  @@LEGEND_D <li>-Eintraege zu den Pins im Desktop-Rahmen
  @@MOBILE   Rahmeninhalt 390px
  @@LEGEND_M <li>-Eintraege zu den Pins im Mobile-Rahmen

Ausgabe:
  wireframes/konzept-NN-slug.html   Einzelseite je Konzept
  wireframes/index.html             Uebersicht + Vergleichsmatrix
  dist/nordfeld-wireframes.html     Single-File-Fassung (alles inline)
"""
import os, re, html, json

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC  = os.path.join(ROOT, 'wireframes', 'src')
OUT  = os.path.join(ROOT, 'wireframes')
DIST = os.path.join(ROOT, 'dist')

MARKERS = ['META', 'THUMB', 'STYLE', 'DESKTOP', 'LEGEND_D', 'MOBILE', 'LEGEND_M']
AXES = [('modern', 'Modernität'), ('serios', 'Seriosität'), ('emotion', 'Emotionalität'),
        ('dichte', 'Informationsdichte'), ('experiment', 'Experimentiergrad')]

PROJECT = dict(
    brand='NORDFELD',
    kind='B2B-SaaS- / Produktwebsite',
    audience='Operations-, Einkaufs- und Compliance-Teams im Mittelstand (50–500 MA)',
    goal='Qualifizierte Leads – gebuchte Produkt-Demos',
)


def parse(path):
    raw = open(path, encoding='utf-8').read()
    parts, cur, buf = {}, None, []
    for line in raw.splitlines():
        m = re.match(r'\s*<!--@@([A-Z_]+)-->\s*$', line)
        if m and m.group(1) in MARKERS:
            if cur:
                parts[cur] = '\n'.join(buf).strip()
            cur, buf = m.group(1), []
            continue
        if cur:
            buf.append(line)
    if cur:
        parts[cur] = '\n'.join(buf).strip()

    meta = {}
    for line in parts.get('META', '').splitlines():
        if ':' in line:
            k, v = line.split(':', 1)
            meta[k.strip()] = v.strip()
    meta['tags'] = [t.strip() for t in meta.get('tags', '').split('|') if t.strip()]
    meta['scores'] = dict(zip([a[0] for a in AXES],
                              [int(x) for x in meta.get('scores', '3,3,3,3,3').split(',')]))
    parts['meta'] = meta
    return parts


def dots(n):
    return ('<span class="dots" aria-label="%d von 5">' % n
            + ''.join('<i class="%s"></i>' % ('on' if i < n else 'off') for i in range(5))
            + '</span>')


def stage(w, body, cls):
    return ('<div class="stage" data-w="%d"><div class="frame %s">%s</div></div>' % (w, cls, body))


def rationale(m):
    return ('<div class="rationale">'
            '<div><h3>Zentrale Designidee</h3><p>%s</p></div>'
            '<div><h3>Blickführung</h3><p>%s</p></div>'
            '<div><h3>Unterschied zu den anderen</h3><p>%s</p></div>'
            '<div><h3>Passende Markenpositionierung</h3><p>%s</p></div>'
            '</div>') % (m['idea'], m['gaze'], m['diff'], m['brand'])


def page(c, prev, nxt):
    m = c['meta']
    cls = 'c%s' % m['no']
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>Konzept {m['no']} – {html.escape(m['title'])} · NORDFELD Wireframes</title>
<link rel="stylesheet" href="assets/wf.css">
<style>
{c['STYLE']}
</style>
</head>
<body>
<div class="doc">
  <div class="doc-bar">
    <b>NORDFELD · Wireframe-Studie</b>
    <span style="color:var(--ink3);font-size:12px">Konzept {m['no']} von 10</span>
    <span class="sp"></span>
    <a href="index.html">Übersicht &amp; Vergleichsmatrix</a>
  </div>

  <div class="doc-head">
    <div class="num">Konzept {m['no']}</div>
    <h1>{html.escape(m['title'])}</h1>
    <p class="sub">{m['tagline']}</p>
    <div class="tags">{''.join('<span class="tag">%s</span>' % html.escape(t) for t in m['tags'])}</div>
  </div>

  <div class="sec-label"><h2>Desktop</h2><span>1440 px</span></div>
  {stage(1440, c['DESKTOP'], cls + ' d')}
  <ol class="legend">{c['LEGEND_D']}</ol>

  <div class="sec-label"><h2>Mobile</h2><span>390 px</span></div>
  <div class="mobile-row">
    {stage(390, c['MOBILE'], cls + ' m')}
    <div class="notes"><ol class="legend" style="grid-template-columns:1fr">{c['LEGEND_M']}</ol></div>
  </div>

  <div class="sec-label"><h2>Einordnung</h2><span>Designidee · Blickführung · Differenz · Positionierung</span></div>
  {rationale(m)}

  <div class="pager">
    <a href="{prev}">&larr; Vorheriges Konzept</a>
    <a href="index.html">Alle Konzepte</a>
    <a href="{nxt}">Nächstes Konzept &rarr;</a>
  </div>
</div>
<script src="assets/wf.js"></script>
</body>
</html>
"""


def index(cs):
    cards = []
    for c in cs:
        m = c['meta']
        cards.append(f"""
      <a class="card" href="{m['file']}">
        <div class="thumb {'c%s' % m['no']} t">{c['THUMB']}</div>
        <div class="card-b">
          <div class="num">Konzept {m['no']}</div>
          <h3>{html.escape(m['title'])}</h3>
          <p>{m['wirkung']}</p>
        </div>
      </a>""")

    rows = []
    for c in cs:
        m = c['meta']
        cells = ''.join('<td data-l="%s">%s</td>' % (lbl, dots(m['scores'][k])) for k, lbl in AXES)
        rows.append(f"""<tr>
        <th scope="row"><a href="{m['file']}"><span class="n">{m['no']}</span>{html.escape(m['short'])}</a></th>
        <td data-l="Visuelle Wirkung" class="txt">{m['wirkung']}</td>
        {cells}
        <td data-l="Branchen" class="txt">{m['branchen']}</td>
      </tr>""")

    heads = ''.join('<th>%s</th>' % l for _, l in AXES)
    return f"""<!doctype html>
<html lang="de">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>NORDFELD – 10 Wireframe-Konzepte im Vergleich</title>
<link rel="stylesheet" href="assets/wf.css">
<style>
{''.join(c['STYLE'] for c in cs)}
{THUMB_CSS}
</style>
</head>
<body>
<div class="doc">
  <div class="doc-bar"><b>NORDFELD · Wireframe-Studie</b>
    <span style="color:var(--ink3);font-size:12px">10 Stilrichtungen, eine Informationsarchitektur</span></div>

  <div class="doc-head">
    <div class="num">Übersicht</div>
    <h1>Zehn gestalterische Richtungen, identischer Inhalt.</h1>
    <p class="sub">Alle Konzepte transportieren dieselben Inhalte und dieselbe Informationsarchitektur
    (Navigation → Hero → Vorteile → Leistungen → Social Proof → Vertrauen → FAQ → Abschluss-CTA → Footer).
    Unterschiedlich sind Raster, Abschnittsgrößen, Bild-Text-Verhältnis, Navigationsprinzip und CTA-Platzierung –
    damit die Richtungen direkt vergleichbar bleiben. Low-/Mid-Fidelity, bewusst ohne Farbkonzept.</p>
  </div>

  <div class="brief">
    <div><h3>Website-Typ</h3><p>{PROJECT['kind']}</p></div>
    <div><h3>Projekt</h3><p>{PROJECT['brand']} – Plattform für Lieferketten-Transparenz</p></div>
    <div><h3>Zielgruppe</h3><p>{PROJECT['audience']}</p></div>
    <div><h3>Hauptziel</h3><p>{PROJECT['goal']}</p></div>
  </div>

  <div class="sec-label"><h2>Die zehn Konzepte</h2><span>Struktur-Miniaturen</span></div>
  <div class="cards">{''.join(cards)}</div>

  <div class="sec-label"><h2>Vergleichsmatrix</h2><span>1 = niedrig · 5 = hoch</span></div>
  <div class="matrix-wrap">
    <table class="matrix">
      <thead><tr><th>Konzept</th><th>Visuelle Wirkung</th>{heads}<th>Geeignete Branchen / Marken</th></tr></thead>
      <tbody>{''.join(rows)}</tbody>
    </table>
  </div>
</div>
</body>
</html>
"""


THUMB_CSS = """
/* ---- Übersichtsseite ---- */
.brief{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));
  background:var(--paper);border:1px solid var(--l1);margin-top:8px}
.brief div{padding:16px 18px;border-right:1px solid var(--l2)}
.brief div:last-child{border-right:0}
.brief h3{font-size:10.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--ink3);margin:0 0 6px}
.brief p{margin:0;font-size:13.5px;color:var(--ink2);line-height:1.5}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(228px,1fr));gap:18px}
.card{background:var(--paper);border:1px solid var(--l1);text-decoration:none;display:block;
  transition:box-shadow .15s ease, transform .15s ease}
.card:hover{box-shadow:0 14px 30px -20px var(--shadow);transform:translateY(-2px)}
.card .thumb{height:168px;border-bottom:1px solid var(--l2);position:relative;overflow:hidden;
  padding:10px;display:flex;flex-direction:column;gap:5px;background:var(--paper)}
.card-b{padding:14px 16px 18px}
.card-b .num{font:600 10px/1 var(--mono);letter-spacing:.14em;color:var(--ink3);text-transform:uppercase}
.card-b h3{margin:7px 0 6px;font-size:16px;line-height:1.2;letter-spacing:-.01em}
.card-b p{margin:0;font-size:12.5px;color:var(--ink2);line-height:1.5}
/* Miniatur-Primitives */
.t .r{background:var(--fill);border-radius:1px}
.t .o{border:1px solid var(--l1);border-radius:1px}
.t .row{display:flex;gap:5px}
.t .col{display:flex;flex-direction:column;gap:5px}
.t .g{flex:1}
.matrix-wrap{overflow-x:auto;background:var(--paper);border:1px solid var(--l1)}
.matrix{border-collapse:collapse;width:100%;min-width:900px;font-size:13px}
.matrix th,.matrix td{text-align:left;padding:12px 14px;border-bottom:1px solid var(--l2);vertical-align:top}
.matrix thead th{font-size:10.5px;letter-spacing:.1em;text-transform:uppercase;color:var(--ink3);
  border-bottom:1px solid var(--l1);white-space:nowrap;font-weight:600}
.matrix tbody th{font-weight:600;white-space:nowrap}
.matrix tbody th a{text-decoration:none;display:flex;gap:8px;align-items:baseline}
.matrix tbody th a .n{font:600 10px/1 var(--mono);color:var(--ink3)}
.matrix td.txt{color:var(--ink2);min-width:170px;line-height:1.45}
.dots{display:inline-flex;gap:3px}
.dots i{width:7px;height:7px;border-radius:50%;display:block}
.dots i.on{background:var(--ink)}
.dots i.off{background:var(--l1)}
@media (max-width:760px){.brief div{border-right:0;border-bottom:1px solid var(--l2)}}
"""


def single_file(cs, wfcss, standalone=True):
    nav, panels = [], []
    for i, c in enumerate(cs):
        m = c['meta']
        nav.append('<button class="tabbtn%s" data-i="%d"><span>%s</span>%s</button>'
                   % (' on' if i == 0 else '', i, m['no'], html.escape(m['short'])))
        panels.append(f"""
<section class="panel" data-i="{i}" {'' if i == 0 else 'hidden'}>
  <header class="phead">
    <div class="num">Konzept {m['no']}</div>
    <h2>{html.escape(m['title'])}</h2>
    <p>{m['tagline']}</p>
    <div class="tags">{''.join('<span class="tag">%s</span>' % html.escape(t) for t in m['tags'])}</div>
  </header>
  <div class="view d">
    <div class="sec-label"><h2>Desktop</h2><span>1440 px</span></div>
    {stage(1440, c['DESKTOP'], 'c%s d' % m['no'])}
    <ol class="legend">{c['LEGEND_D']}</ol>
  </div>
  <div class="view m" hidden>
    <div class="sec-label"><h2>Mobile</h2><span>390 px</span></div>
    <div class="mobile-row">
      {stage(390, c['MOBILE'], 'c%s m' % m['no'])}
      <div class="notes"><ol class="legend" style="grid-template-columns:1fr">{c['LEGEND_M']}</ol></div>
    </div>
  </div>
  {rationale(m)}
</section>""")

    rows = []
    for c in cs:
        m = c['meta']
        cells = ''.join('<td>%s</td>' % dots(m['scores'][k]) for k, _ in AXES)
        rows.append('<tr><th scope="row"><span class="n">%s</span>%s</th><td class="txt">%s</td>%s<td class="txt">%s</td></tr>'
                    % (m['no'], html.escape(m['short']), m['wirkung'], cells, m['branchen']))
    heads = ''.join('<th>%s</th>' % l for _, l in AXES)

    head = ('<!doctype html>\n<html lang="de">\n<head>\n<meta charset="utf-8">\n'
            '<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n'
            if standalone else '')
    tail = '\n</html>' if standalone else ''
    body = f"""<title>NORDFELD Wireframe-Studie</title>
<style>
{wfcss}
{''.join(c['STYLE'] for c in cs)}
{THUMB_CSS}
/* ---- Single-File-Chrome ---- */
.app{{max-width:1240px;margin:0 auto;padding:0 20px 80px}}
.masthead{{padding:34px 0 20px;border-bottom:1px solid var(--l1)}}
.masthead .num{{font:600 11px/1 var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--ink3)}}
.masthead h1{{font-size:clamp(26px,4vw,42px);line-height:1.05;letter-spacing:-.025em;margin:12px 0 10px;max-width:24ch}}
.masthead p{{max-width:74ch;color:var(--ink2);font-size:15px;margin:0}}
.toolbar{{position:sticky;top:0;z-index:90;background:var(--canvas);
  border-bottom:1px solid var(--l1);margin:0 -20px 26px;padding:10px 20px;
  display:flex;gap:14px;align-items:center;flex-wrap:wrap}}
.tabs{{display:flex;gap:6px;overflow-x:auto;flex:1 1 420px;padding-bottom:2px;scrollbar-width:thin}}
.tabbtn{{flex:none;display:inline-flex;align-items:center;gap:7px;cursor:pointer;
  background:var(--paper);border:1px solid var(--l1);color:var(--ink2);
  font:500 12.5px/1 var(--sans);padding:9px 12px;border-radius:3px;white-space:nowrap}}
.tabbtn span{{font:600 10px/1 var(--mono);color:var(--ink3)}}
.tabbtn.on{{background:var(--inv-bg);color:var(--inv-fg);border-color:var(--inv-bg)}}
.tabbtn.on span{{color:var(--inv-fg);opacity:.6}}
.seg{{display:inline-flex;border:1px solid var(--l1);border-radius:3px;overflow:hidden;flex:none;background:var(--paper)}}
.seg button{{cursor:pointer;background:transparent;border:0;color:var(--ink2);
  font:500 12.5px/1 var(--sans);padding:10px 14px}}
.seg button.on{{background:var(--inv-bg);color:var(--inv-fg)}}
.phead{{padding:6px 0 18px}}
.phead .num{{font:600 11px/1 var(--mono);letter-spacing:.14em;text-transform:uppercase;color:var(--ink3)}}
.phead h2{{font-size:clamp(24px,3.4vw,36px);line-height:1.08;letter-spacing:-.022em;margin:12px 0 8px}}
.phead p{{max-width:72ch;color:var(--ink2);font-size:14.5px;margin:0 0 14px}}
.matrix-sec{{margin-top:64px;border-top:3px solid var(--ink);padding-top:22px}}
.matrix-sec h2{{font-size:clamp(22px,3vw,32px);letter-spacing:-.02em;margin:0 0 6px}}
.matrix-sec p{{color:var(--ink2);margin:0 0 18px;max-width:70ch;font-size:14.5px}}
@media (max-width:640px){{
  .matrix{{min-width:760px}}
}}
</style>

<div class="app">
  <div class="masthead">
    <div class="num">NORDFELD · Wireframe-Studie</div>
    <h1>Zehn gestalterische Richtungen, identischer Inhalt.</h1>
    <p>Gleiche Inhalte, gleiche Informationsarchitektur – unterschiedlich sind Raster, Abschnittsgrößen,
       Bild-Text-Verhältnis, Navigationsprinzip und CTA-Platzierung. Low-/Mid-Fidelity, bewusst ohne Farbkonzept.</p>
  </div>

  <div class="toolbar">
    <div class="tabs">{''.join(nav)}</div>
    <div class="seg"><button class="on" data-v="d">Desktop 1440</button><button data-v="m">Mobile 390</button></div>
  </div>

  {''.join(panels)}

  <div class="matrix-sec">
    <h2>Vergleichsmatrix</h2>
    <p>Einschätzung der zehn Richtungen entlang der Kriterien aus dem Briefing. 1 = niedrig, 5 = hoch.</p>
    <div class="matrix-wrap">
      <table class="matrix">
        <thead><tr><th>Konzept</th><th>Visuelle Wirkung</th>{heads}<th>Geeignete Branchen / Marken</th></tr></thead>
        <tbody>{''.join(rows)}</tbody>
      </table>
    </div>
  </div>
</div>

<script>
(function(){{
  function fit(){{
    document.querySelectorAll('.panel:not([hidden]) .view:not([hidden]) .stage').forEach(function(s){{
      var f=s.querySelector(':scope > .frame'); if(!f) return;
      var w=parseInt(s.dataset.w,10)||1440, sc=Math.min(1,s.clientWidth/w);
      f.style.width=w+'px'; f.style.transform='scale('+sc+')';
      s.style.height=Math.round(f.offsetHeight*sc)+'px';
    }});
  }}
  var view='d';
  function show(i){{
    document.querySelectorAll('.panel').forEach(function(p){{p.hidden = +p.dataset.i!==i;}});
    document.querySelectorAll('.tabbtn').forEach(function(b){{b.classList.toggle('on',+b.dataset.i===i);}});
    sync(); window.scrollTo({{top:0,behavior:'smooth'}});
  }}
  function sync(){{
    document.querySelectorAll('.panel .view').forEach(function(v){{
      v.hidden = !v.classList.contains(view);
    }});
    fit();
  }}
  document.querySelectorAll('.tabbtn').forEach(function(b){{
    b.addEventListener('click',function(){{show(+b.dataset.i);}});
  }});
  document.querySelectorAll('.seg button').forEach(function(b){{
    b.addEventListener('click',function(){{
      view=b.dataset.v;
      document.querySelectorAll('.seg button').forEach(function(x){{x.classList.toggle('on',x===b);}});
      sync();
    }});
  }});
  window.addEventListener('resize',fit);
  window.addEventListener('load',fit);
  sync();
}})();
</script>
"""
    if standalone:
        i = body.index('</style>') + len('</style>')
        return head + body[:i] + '\n</head>\n<body>' + body[i:] + '</body>' + tail
    return body


def main():
    files = sorted(f for f in os.listdir(SRC) if f.endswith('.html'))
    cs = []
    for f in files:
        c = parse(os.path.join(SRC, f))
        no = f.split('-')[0]
        c['meta']['no'] = no
        c['meta']['file'] = 'konzept-%s-%s.html' % (no, c['meta']['slug'])
        cs.append(c)

    for i, c in enumerate(cs):
        prev = cs[i - 1]['meta']['file']
        nxt = cs[(i + 1) % len(cs)]['meta']['file']
        open(os.path.join(OUT, c['meta']['file']), 'w', encoding='utf-8').write(page(c, prev, nxt))

    open(os.path.join(OUT, 'index.html'), 'w', encoding='utf-8').write(index(cs))

    wfcss = open(os.path.join(OUT, 'assets', 'wf.css'), encoding='utf-8').read()
    os.makedirs(DIST, exist_ok=True)
    open(os.path.join(DIST, 'nordfeld-wireframes.html'), 'w', encoding='utf-8').write(
        single_file(cs, wfcss, standalone=True))
    if os.environ.get('WF_BODY_OUT'):
        open(os.environ['WF_BODY_OUT'], 'w', encoding='utf-8').write(
            single_file(cs, wfcss, standalone=False))

    print('gebaut: %d Konzepte + index.html + dist/nordfeld-wireframes.html' % len(cs))


if __name__ == '__main__':
    main()
