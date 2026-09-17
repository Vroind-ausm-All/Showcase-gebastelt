/* Skaliert die 1440px- und 390px-Rahmen verlustfrei in den verfügbaren Platz. */
(function () {
  function fit() {
    document.querySelectorAll('.stage').forEach(function (stage) {
      var frame = stage.querySelector(':scope > .frame');
      if (!frame) return;
      var w = parseInt(stage.dataset.w, 10) || 1440;
      var scale = Math.min(1, stage.clientWidth / w);
      frame.style.width = w + 'px';
      frame.style.transform = 'scale(' + scale + ')';
      stage.style.height = Math.round(frame.offsetHeight * scale) + 'px';
    });
  }
  window.wfFit = fit;
  if (document.readyState !== 'loading') fit();
  else document.addEventListener('DOMContentLoaded', fit);
  window.addEventListener('resize', fit);
  window.addEventListener('load', fit);
  if (window.ResizeObserver) new ResizeObserver(fit).observe(document.documentElement);
})();
