/* Pantalla de carga: se ejecuta de inmediato (antes de descargar GSAP/Lenis) para que nunca se vea en blanco */
(function () {
  var L = [['P','var(--ochre)',-4,'0'],['a','var(--sage)',3,'.02em'],['c','var(--blush)',-3,'0'],['h','var(--coral)',4,'-.02em'],
           ['a','var(--butter)',-2,'.03em'],['n','var(--teal)',3,'0',1],['k','var(--brick)',-4,'-.02em'],['a','var(--sand)',2,'.02em']];
  var SPARK = '<svg class="spark" viewBox="0 0 40 26" aria-hidden="true"><path d="M8 22 3 11M20 20V4M32 22l5-11" stroke="currentColor" stroke-width="5" stroke-linecap="round" fill="none"/></svg>';

  window.PK_WM = {
    build: function (el) {
      el.innerHTML = L.map(function (x, i) {
        return '<span style="--c:' + x[1] + ';--r:' + x[2] + 'deg;--y:' + x[3] + ';--i:' + i + '">' + x[0] + (x[4] ? SPARK : '') + '</span>';
      }).join('');
    }
  };

  var wm = document.querySelector('#loader .wm');
  if (!wm) return;
  PK_WM.build(wm);
  var letters = wm.children;
  if (matchMedia('(prefers-reduced-motion: reduce)').matches || !wm.animate) {
    for (var j = 0; j < letters.length; j++) letters[j].style.opacity = 1;
    return;
  }
  // Web Animations con valores concretos: corren en la GPU aunque el hilo principal esté ocupado
  for (var i = 0; i < letters.length; i++) {
    var x = L[i], y = x[3] === '0' ? '0em' : x[3];
    letters[i].animate([
      { opacity: 0, transform: 'translate3d(0,.45em,0) rotate(' + (x[2] * 3) + 'deg)' },
      { opacity: 1, transform: 'translate3d(0,' + y + ',0) rotate(' + x[2] + 'deg)' }
    ], { duration: 700, delay: 100 + i * 50, easing: 'cubic-bezier(.34,1.4,.64,1)', fill: 'both' });
  }
})();
