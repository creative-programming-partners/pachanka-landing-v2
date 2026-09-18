(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  /* ---------- Wordmark (la carga ya construyó el suyo) ---------- */
  $$('[data-wm]').forEach(el => { if (!el.children.length) PK_WM.build(el); });

  /* ---------- Escalonado automático: índice entre hermanos que se revelan ---------- */
  const parents = new Set($$('.rv').map(el => el.parentElement));
  parents.forEach(p => $$(':scope > .rv', p).forEach((el, i) => el.style.setProperty('--i', i)));
  $$('.drawer li').forEach((li, i) => li.style.setProperty('--i', i));

  /* ---------- Revelado con IntersectionObserver ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add('is-in');
    io.unobserve(e.target);
  }), { rootMargin: '0px 0px -8% 0px', threshold: .06 });
  $$('.rv').forEach(el => io.observe(el));

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
  const goTo = (target, done) => {
    if (lenis) lenis.scrollTo(target, { offset: target === 0 ? 0 : -72, duration: 1.2, easing: easeInOutCubic, onComplete: done });
    else {
      if (target === 0) scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
      else target.scrollIntoView({ behavior: reduce ? 'auto' : 'smooth' });
      done && setTimeout(done, reduce ? 0 : 700);
    }
  };
  toTop.addEventListener('click', () => goTo(0));

  /* ---------- Menú lateral y carta completa (paneles) ---------- */
  const drawer = $('#drawer'), overlay = $('#overlay'), burger = $('#burger'), menuPanel = $('#menuPanel');
  const anyOpen = () => drawer.classList.contains('open') || menuPanel.classList.contains('open');
  const lockScroll = () => { if (lenis) anyOpen() ? lenis.stop() : lenis.start(); overlay.classList.toggle('open', anyOpen()); };

  const setDrawer = open => {
    drawer.classList.toggle('open', open);
    drawer.setAttribute('aria-hidden', !open);
    burger.setAttribute('aria-expanded', open);
    lockScroll();
    if (open) $('.drawer-close').focus({ preventScroll: true });
  };
  burger.addEventListener('click', () => setDrawer(true));
  $('#drawerClose').addEventListener('click', () => setDrawer(false));

  let lastFocus = null;
  const setMenu = (open, catId) => {
    if (open) {
      lastFocus = document.activeElement;
      if (catId) showCat(catId); else if (!currentCat) showCat(PK_MENU[0].id);
    }
    menuPanel.classList.toggle('open', open);
    menuPanel.setAttribute('aria-hidden', !open);
    lockScroll();
    if (open) $('#menuClose').focus({ preventScroll: true });
    else if (lastFocus) lastFocus.focus({ preventScroll: true });
  };
  $('#menuClose').addEventListener('click', () => setMenu(false));
  overlay.addEventListener('click', () => { setDrawer(false); setMenu(false); });
  addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (menuPanel.classList.contains('open')) setMenu(false);
    else if (drawer.classList.contains('open')) setDrawer(false);
  });

  /* ---------- Enlaces internos ---------- */
  $$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
    const wasOpen = drawer.classList.contains('open');
    // Abrir la carta completa
    if (a.hasAttribute('data-open-menu')) {
      e.preventDefault();
      if (wasOpen) setDrawer(false);
      setTimeout(() => setMenu(true, a.dataset.openMenu || null), wasOpen ? 220 : 0);
      return;
    }
    const id = a.getAttribute('href');
    const t = id === '#inicio' ? 0 : $(id);
    if (t === null) return;
    e.preventDefault();
    if (wasOpen) setDrawer(false);
    // "Reserva aquí" y "Organizar mi evento" llevan al formulario y dejan el cursor en el nombre
    const toForm = id === '#reservar';
    if (a.dataset.occasion) form.occasion.value = a.dataset.occasion;
    setTimeout(() => goTo(t, toForm ? () => form.guest.focus({ preventScroll: true }) : null), wasOpen ? 260 : 0);
  }));

  /* ---------- Hora de Lima ---------- */
  const DAYS = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
  function limaNow() {
    const p = Object.fromEntries(new Intl.DateTimeFormat('en-US', {
      timeZone: 'America/Lima', year: 'numeric', month: '2-digit', day: '2-digit',
      weekday: 'short', hour: '2-digit', minute: '2-digit', hourCycle: 'h23'
    }).formatToParts(new Date()).map(x => [x.type, x.value]));
    return { date: `${p.year}-${p.month}-${p.day}`, wd: DAYS[p.weekday], mins: (+p.hour % 24) * 60 + +p.minute };
  }
  // Horario confirmado en Google Maps e Instagram: lunes a sábado 12–23 h, domingo 12–18 h
  const hoursFor = wd => wd === 0 ? [12 * 60, 18 * 60] : [12 * 60, 23 * 60];
  const wdOf = dateStr => { const [y, m, d] = dateStr.split('-').map(Number); return new Date(y, m - 1, d).getDay(); };
  const addDays = (dateStr, n) => {
    const [y, m, d] = dateStr.split('-').map(Number);
    const dt = new Date(y, m - 1, d + n);
    return `${dt.getFullYear()}-${String(dt.getMonth() + 1).padStart(2, '0')}-${String(dt.getDate()).padStart(2, '0')}`;
  };
  const fmtTime = mins => {
    const h = Math.floor(mins / 60), m = mins % 60, h12 = ((h + 11) % 12) + 1;
    return `${h12}:${String(m).padStart(2, '0')} ${h < 12 ? 'a.m.' : 'p.m.'}`;
  };
  const fmtHour = mins => { const h = Math.floor(mins / 60), h12 = ((h + 11) % 12) + 1; return `${h12} ${h < 12 ? 'a.m.' : 'p.m.'}`; };

  /* ---------- Idioma ---------- */
  let lang = 'es';
  try { if (localStorage.getItem('pk-lang') === 'en') lang = 'en'; } catch (e) {}
  const T = () => PK_I18N.JS[lang];

  /* ---------- Abierto ahora / Cerrado ---------- */
  function renderStatus() {
    const t = T(), now = limaNow(), [o, c] = hoursFor(now.wd);
    const open = now.mins >= o && now.mins < c;
    let text;
    if (open) text = c - now.mins <= 60 ? `${t.closingSoon} · ${t.closesAt} ${fmtHour(c)}` : `${t.openNow} · ${t.until} ${fmtHour(c)}`;
    else if (now.mins < o) text = `${t.closed} · ${t.opensToday} ${fmtHour(o)}`;
    else text = `${t.closed} · ${t.opensTomorrow} ${fmtHour(hoursFor((now.wd + 1) % 7)[0])}`;
    $$('.js-status').forEach(el => {
      el.classList.toggle('is-open', open);
      el.classList.toggle('is-closed', !open);
      $('.status-text', el).textContent = text;
    });
    $$('#hoursList .hrow').forEach(r => {
      const today = r.dataset.days && r.dataset.days.split(',').includes(String(now.wd));
      r.classList.toggle('is-today', !!today);
      if (today) $('dt', r).dataset.today = lang === 'en' ? 'Today' : 'Hoy';
    });
  }
  // Se actualiza al cambiar de minuto
  setTimeout(() => { renderStatus(); setInterval(renderStatus, 60000); }, (60 - new Date().getSeconds()) * 1000);

  /* ---------- Formulario de reserva → WhatsApp ---------- */
  const form = $('#rsvForm'), errBox = $('#rsvError'), okBox = $('#rsvOk');
  const slotsFor = dateStr => {
    if (!dateStr) return [];
    const [o, c] = hoursFor(wdOf(dateStr)), now = limaNow(), out = [];
    // Última reserva una hora antes del cierre; hoy, desde media hora después de la hora actual
    for (let t = o; t <= c - 60; t += 30) if (dateStr !== now.date || t >= now.mins + 30) out.push(t);
    return out;
  };
  function buildPeople() {
    const keep = form.people.value || '2';
    form.people.innerHTML = [...Array.from({ length: 10 }, (_, i) => String(i + 1)), '10+']
      .map(v => `<option value="${v}">${T().people(v)}</option>`).join('');
    form.people.value = keep;
  }
  function buildTimes() {
    const keep = form.time.value, slots = slotsFor(form.date.value);
    form.time.innerHTML = slots.length
      ? `<option value="" disabled>${T().pickTime}</option>` + slots.map(t => `<option value="${t}">${fmtTime(t)}</option>`).join('')
      : `<option value="" disabled>${T().noTimes}</option>`;
    form.time.value = slots.includes(+keep) && keep !== '' ? keep : '';
    if (!form.time.value) form.time.selectedIndex = 0;
  }
  function initDate() {
    const today = limaNow().date;
    form.date.min = today;
    form.date.max = addDays(today, 90);
    if (!form.date.value || form.date.value < today) form.date.value = slotsFor(today).length ? today : addDays(today, 1);
  }
  form.date.addEventListener('change', () => { buildTimes(); form.date.removeAttribute('aria-invalid'); });
  form.addEventListener('input', e => { e.target.removeAttribute('aria-invalid'); errBox.hidden = true; });

  form.addEventListener('submit', e => {
    e.preventDefault();
    const t = T(), today = limaNow().date;
    const name = form.guest.value.trim(), date = form.date.value, time = form.time.value;
    let bad = null, msg = '';
    if (!name) { bad = form.guest; msg = t.errName; }
    else if (!date || date < today) { bad = form.date; msg = t.errDate; }
    else if (!time || !slotsFor(date).includes(+time)) { buildTimes(); bad = form.time; msg = t.errTime; }
    $$('[aria-invalid]', form).forEach(el => el.removeAttribute('aria-invalid'));
    if (bad) {
      bad.setAttribute('aria-invalid', 'true');
      errBox.textContent = msg; errBox.hidden = false; okBox.hidden = true;
      bad.focus();
      return;
    }
    const [y, m, d] = date.split('-').map(Number);
    const niceDate = new Date(y, m - 1, d, 12).toLocaleDateString(t.locale, { weekday: 'long', day: 'numeric', month: 'long' });
    const lines = [
      t.msgHello,
      `• ${t.msgName}: ${name}`,
      `• ${t.msgPeople}: ${form.people.options[form.people.selectedIndex].text}`,
      `• ${t.msgDate}: ${niceDate}`,
      `• ${t.msgTime}: ${fmtTime(+time)}`,
      `• ${t.msgOcc}: ${form.occasion.options[form.occasion.selectedIndex].text}`
    ];
    const notes = form.notes.value.trim();
    if (notes) lines.push(`• ${t.msgNotes}: ${notes}`);
    lines.push('', t.msgThanks);
    const url = 'https://wa.me/51971969101?text=' + encodeURIComponent(lines.join('\n'));
    errBox.hidden = true; okBox.hidden = false;
    // Con 'noopener' window.open siempre devuelve null, así que se corta el vínculo a mano
    const w = window.open(url, '_blank');
    if (w) w.opener = null;
    else location.href = url; // ventana bloqueada: abrir WhatsApp en la misma pestaña
  });

  /* ---------- Carta completa ---------- */
  const tabsEl = $('#mpTabs'), bodyEl = $('#mpBody');
  let currentCat = null;
  const money = p => 'S/ ' + p.toFixed(2);
  const esc = s => s.replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  function renderTabs() {
    tabsEl.innerHTML = PK_MENU.map(c =>
      `<button class="mp-tab" type="button" role="tab" id="mpt-${c.id}" data-cat="${c.id}" aria-controls="mpBody" aria-selected="${c.id === currentCat}">${esc(c[lang])}</button>`).join('');
  }
  function renderCat() {
    const cat = PK_MENU.find(c => c.id === currentCat);
    if (!cat) return;
    let i = 0;
    bodyEl.innerHTML = cat.groups.map(g => {
      const title = g[lang] ? `<h3 class="mp-group">${esc(g[lang])}</h3>` : '';
      const items = g.items.map(([name, price, dEs, dEn, nameEn]) => {
        const n = lang === 'en' && nameEn ? nameEn : name, d = lang === 'en' ? dEn : dEs;
        return `<li class="mp-item" style="--i:${Math.min(i++, 14)}"><div class="mp-row"><span class="mp-name">${esc(n)}</span><span class="mp-dots"></span><span class="mp-price">${money(price)}</span></div>${d ? `<p class="mp-desc">${esc(d)}</p>` : ''}</li>`;
      }).join('');
      return `${title}<ul class="mp-list">${items}</ul>`;
    }).join('');
    bodyEl.setAttribute('aria-labelledby', 'mpt-' + currentCat);
  }
  function showCat(id) {
    const changed = id !== currentCat;
    currentCat = id;
    $$('.mp-tab', tabsEl).forEach(b => b.setAttribute('aria-selected', b.dataset.cat === id));
    const btn = $(`#mpt-${id}`);
    if (btn) tabsEl.scrollTo({ left: Math.max(0, btn.offsetLeft - 24), behavior: reduce ? 'auto' : 'smooth' });
    if (!changed && bodyEl.children.length) return;
    renderCat();
    bodyEl.scrollTop = 0;
    if (!reduce) { bodyEl.classList.add('enter'); void bodyEl.offsetWidth; bodyEl.classList.remove('enter'); }
  }
  tabsEl.addEventListener('click', e => { const b = e.target.closest('.mp-tab'); if (b) showCat(b.dataset.cat); });
  tabsEl.addEventListener('keydown', e => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const ids = PK_MENU.map(c => c.id), i = ids.indexOf(currentCat);
    const next = ids[(i + (e.key === 'ArrowRight' ? 1 : -1) + ids.length) % ids.length];
    showCat(next); $(`#mpt-${next}`).focus();
  });

  /* ---------- Cambio de idioma ---------- */
  function setLang(next, initial) {
    lang = next;
    try { localStorage.setItem('pk-lang', lang); } catch (e) {}
    PK_I18N.apply(lang);
    renderStatus();
    buildPeople();
    buildTimes();
    renderTabs();
    if (currentCat) renderCat();
    if (!initial && window.ScrollTrigger) ScrollTrigger.refresh();
  }
  $$('.js-lang').forEach(b => b.addEventListener('click', () => setLang(lang === 'es' ? 'en' : 'es')));
  initDate();
  setLang(lang, true);

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

  /* ---------- Un día en Pachanka ---------- */
  const day = $('#un-dia');
  const moments = $$('.m', day), frames = $$('.fr', day), stepBtns = $$('.day-step', day), dots = $$('.day-dot', day);
  const STEPS = moments.length;
  // La barra recorre la línea en el primer 88% del scroll fijo; el 12% final se queda en la última hora
  const HOLD = .12;
  let step = 0, dayST = null;
  // Arranca como lista; GSAP la convierte en sección fija solo en escritorio
  day.classList.add('day--static');
  function setStep(n) {
    if (n === step) return;
    step = n;
    day.style.setProperty('--s', n);
    day.dataset.step = n;
    moments.forEach((m, i) => m.classList.toggle('is-active', i === n));
    frames.forEach((f, i) => { f.classList.toggle('is-active', i === n); f.classList.toggle('is-past', i < n); });
    stepBtns.forEach((b, i) => { b.classList.toggle('is-active', i === n); b.classList.toggle('is-reached', i <= n); });
    dots.forEach((d, i) => d.classList.toggle('is-reached', i <= n));
  }
  // Progreso del scroll fijo → posición de la barra (0 a 1) → hora alcanzada
  const barProgress = p => Math.min(1, p / (1 - HOLD));
  const stepAt = b => b >= 1 ? STEPS - 1 : Math.floor(b * (STEPS - 1) + 1e-6);
  stepBtns.forEach((b, i) => b.addEventListener('click', () => {
    if (!dayST) return;
    // Justo después del punto de esa hora en la línea
    const p = i === STEPS - 1 ? 1 - HOLD / 2 : (i / (STEPS - 1)) * (1 - HOLD) + .01;
    const y = dayST.start + (dayST.end - dayST.start) * p;
    lenis ? lenis.scrollTo(y, { duration: 1, easing: easeInOutCubic }) : scrollTo({ top: y, behavior: 'smooth' });
  }));

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

    // Fotos de los paneles
    $$('[data-parallax]').forEach(el => {
      const a = +el.dataset.parallax;
      gsap.fromTo(el, { yPercent: -a }, { yPercent: a, ease: 'none', force3D: true,
        scrollTrigger: { trigger: el.parentElement, start: 'top bottom', end: 'bottom top', scrub: true } });
    });

    // Un día en Pachanka: en escritorio la sección se fija y cada tramo de scroll es una hora del día
    ScrollTrigger.matchMedia({
      '(min-width: 900px)': () => {
        day.classList.remove('day--static');
        const bar = $('#dayBar');
        dayST = ScrollTrigger.create({
          trigger: day, start: 'top top', end: () => '+=' + innerHeight * 3,
          pin: true, anticipatePin: 1, invalidateOnRefresh: true,
          onUpdate: s => {
            const b = barProgress(s.progress);
            bar.style.transform = `scaleX(${b.toFixed(4)})`;
            setStep(stepAt(b));
          }
        });
        return () => { dayST = null; day.classList.add('day--static'); };
      }
    });
  }
})();
