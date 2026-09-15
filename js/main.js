(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Wordmark (la carga ya construyó el suyo) ---------- */
  $$('[data-wm]').forEach(el => { if (!el.children.length) PK_WM.build(el); });

  /* ---------- Escalonado automático: índice entre hermanos que se revelan ---------- */
  const parents = new Set($$('.rv').map(el => el.parentElement));
  parents.forEach(p => $$(':scope > .rv', p).forEach((el, i) => el.style.setProperty('--i', i)));
  $$('.st').forEach(st => $$('.ln', st).forEach((ln, i) => ln.style.setProperty('--i', i)));
  $$('.drawer li').forEach((li, i) => li.style.setProperty('--i', i));

  /* ---------- Revelado con IntersectionObserver ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  $$('.rv, .st').forEach(el => io.observe(el));

  // Paneles divididos: la cortina de la foto se retira cuando el panel entra
  const splitIO = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    splitIO.unobserve(e.target);
  }), { threshold: .18 });
  $$('.split').forEach(el => splitIO.observe(el));

  // Mapa: carga cuando el navegador está libre, no en medio del scroll
  const mapFrame = $('.map iframe');
  if (mapFrame) {
    const mio = new IntersectionObserver(es => {
      if (!es.some(e => e.isIntersecting)) return;
      mio.disconnect();
      const load = () => { mapFrame.src = mapFrame.dataset.src; };
      'requestIdleCallback' in window ? requestIdleCallback(load, { timeout: 900 }) : setTimeout(load, 250);
    }, { rootMargin: '600px 0px' });
    mio.observe(mapFrame);
  }

  /* ---------- Scroll suave (Lenis) ---------- */
  let lenis = null;
  if (!reduce && window.Lenis) {
    lenis = new Lenis({ lerp: .11, wheelMultiplier: 1, smoothWheel: true });
    if (!(window.gsap && window.ScrollTrigger)) {
      const raf = t => { lenis.raf(t); requestAnimationFrame(raf); };
      requestAnimationFrame(raf);
    }
  }

  /* ---------- Cabecera y botón volver arriba ---------- */
  const hdr = $('#hdr'), toTop = $('#toTop'), hero = $('.hero');
  let solid = null, topOn = null;
  function onScroll(y) {
    const s = y > hero.offsetHeight - 90;
    if (s !== solid) hdr.classList.toggle('is-solid', solid = s);
    const t = y > innerHeight * .9;
    if (t !== topOn) toTop.classList.toggle('show', topOn = t);
  }
  if (lenis) lenis.on('scroll', e => onScroll(e.scroll));
  else addEventListener('scroll', () => onScroll(scrollY), { passive: true });

  const easeInOutCubic = t => t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  const goTo = target => {
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.2, easing: easeInOutCubic });
    else if (target === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
  };
  toTop.addEventListener('click', () => goTo(0));

  /* ---------- Menú lateral ---------- */
  const drawer = $('#drawer'), overlay = $('#overlay'), burger = $('#burger');
  const setDrawer = open => {
    drawer.classList.toggle('open', open);
    overlay.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    if (lenis) open ? lenis.stop() : lenis.start();
    if (open) $('.drawer-close').focus({ preventScroll: true });
  };
  burger.addEventListener('click', () => setDrawer(true));
  $('#drawerClose').addEventListener('click', () => setDrawer(false));
  overlay.addEventListener('click', () => setDrawer(false));
  addEventListener('keydown', e => { if (e.key === 'Escape' && drawer.classList.contains('open')) setDrawer(false); });

  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    const t = id === '#inicio' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    const wasOpen = drawer.classList.contains('open');
    if (wasOpen) setDrawer(false);
    setTimeout(() => goTo(t), wasOpen ? 260 : 0);
  }));

  /* ---------- Pantalla de carga ---------- */
  // Se retira cuando fuentes, fotos de portada y página ya cargaron: el trabajo pesado queda detrás de la carga
  const loader = $('#loader');
  const reveal = () => document.body.classList.add('ready');
  scrollTo(0, 0);
  if (reduce || !loader) { loader && loader.remove(); reveal(); }
  else {
    let started = false;
    lenis && lenis.stop();
    const start = () => {
      if (started) return; started = true;
      loader.classList.add('done');
      lenis && lenis.start();
      setTimeout(reveal, 180);
      setTimeout(() => loader.remove(), 1000);
    };
    const wait = ms => new Promise(r => setTimeout(r, ms));
    const pageLoaded = new Promise(r => document.readyState === 'complete' ? r() : addEventListener('load', r, { once: true }));
    const heroImages = $$('.hero img').map(im => im.decode ? im.decode().catch(() => {}) : null);
    const fontsReady = document.fonts ? document.fonts.ready : null;
    Promise.race([Promise.all([fontsReady, pageLoaded, ...heroImages]), wait(2800)])
      .then(() => requestAnimationFrame(() => setTimeout(start, Math.max(0, 1500 - performance.now()))));
    loader.addEventListener('click', start, { once: true });
  }

  /* ---------- Animaciones ligadas al scroll (GSAP) ---------- */
  if (window.gsap && window.ScrollTrigger && !reduce) {
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ ignoreMobileResize: true });
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    // Portada: cada columna de foto se desplaza a distinta velocidad y el texto se aleja
    $$('.hc').forEach(el => {
      gsap.to(el, { yPercent: +el.dataset.speed, ease: 'none', force3D: true,
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
    });
    gsap.to('.hero-copy, .hero-logo', { yPercent: -18, opacity: 0, ease: 'none', force3D: true,
      scrollTrigger: { trigger: '.hero', start: 'top top', end: '85% top', scrub: true } });

    // Fotos de los paneles y franja del manifiesto
    $$('[data-parallax]').forEach(el => {
      const a = +el.dataset.parallax;
      gsap.fromTo(el, { yPercent: -a }, { yPercent: a, ease: 'none', force3D: true,
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.fromTo('.strip-media', { yPercent: -10 }, { yPercent: 10, ease: 'none', force3D: true,
      scrollTrigger: { trigger: '.strip', start: 'top bottom', end: 'bottom top', scrub: true } });
  }
})();
