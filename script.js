/* =========================================================
   MAYDELING — XV AÑOS
   CONFIGURACIÓN — edita únicamente esta sección para
   actualizar los datos del evento sin tocar el resto del código.
   ========================================================= */
const EVENT = {
  name: "Maydeling",
  dateISO: "2026-09-05T14:00:00", // Fecha y hora de la ceremonia (usada por el countdown)
  dateDisplay: "05 · Septiembre · 2026",

  ceremony: {
    place: "Iglesia San José",
    address: "564X+7FR, Carretera",
    time: "2:00 PM",
    mapsUrl: "https://www.google.com/maps/search/?api=1&query=564X%2B7FR"
  },

  reception: {
    place: "Casa de mis padres",
    address: "564X+7FR, Carretera",
    time: "Después de la misa"
  },

  // Línea temporal de la velada — agrega, quita o reordena objetos libremente.
  schedule: [
    { time: "02:00 PM", label: "Misa" },
    { time: "Después de misa", label: "Recepción" },
    { time: "06:00 PM", label: "Entrada de la quinceañera" },
    { time: "06:30 PM", label: "Vals" },
    { time: "07:00 PM", label: "Brindis" },
    { time: "07:30 PM", label: "Cena" },
    { time: "08:30 PM", label: "Baile" }
  ],

  dressCode: {
    title: "Formal / Elegante",
    quote: "Una noche digna de la alta sociedad."
  },

  parents: {
    label: "Padres",
    names: "Evelio Cerrato & Marisol Torrez"
  },

  // Mapa general del lugar de encuentro (puede ser igual al de la recepción)
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=564X%2B7FR",

  // WhatsApp — confirmación de asistencia
  whatsapp: {
    number: "50575556166",
    message: "Hola, confirmo mi asistencia a los 15 años de Maydeling. 🌷✨"
  },

  // Música de fondo
  musicUrl: "assets/music/velada.mp3",
  musicTitle: "Melodía de la velada",

  // Galería
  gallery: [
    { src: "assets/images/hero.jpg", alt: "Maydeling, retrato principal", size: "tall" },
    { src: "assets/images/gallery-02.jpeg", alt: "Maydeling en el balcón", size: "normal" },
    { src: "assets/images/retrato-editorial.jpg", alt: "Retrato de Maydeling", size: "normal" },
    { src: "assets/images/cierre.jpg", alt: "Maydeling al atardecer", size: "wide" }
  ]
};

/* ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  renderConfig();
  buildGallery();
  buildSchedule();
  initOpening();
  initReveal();
  initNav();
  initCountdown();
  initLightbox();
  initMusic();
  initParticles();
  initProgressBar();
});

/* ---------- Inject config-driven text/links ---------- */
function renderConfig(){
  document.querySelectorAll('[data-hero-date]').forEach(el => el.textContent = EVENT.dateDisplay);

  document.querySelectorAll('[data-ceremony-place]').forEach(el => el.textContent = EVENT.ceremony.place);
  document.querySelectorAll('[data-ceremony-address]').forEach(el => el.textContent = EVENT.ceremony.address);
  document.querySelectorAll('[data-ceremony-time]').forEach(el => el.textContent = EVENT.ceremony.time);
  const ceremonyBtn = document.getElementById('ceremony-maps-btn');
  if (ceremonyBtn) {
    if (EVENT.ceremony.mapsUrl) ceremonyBtn.href = EVENT.ceremony.mapsUrl;
    else ceremonyBtn.setAttribute('aria-disabled', 'true');
  }

  document.querySelectorAll('[data-reception-place]').forEach(el => el.textContent = EVENT.reception.place);
  document.querySelectorAll('[data-reception-address]').forEach(el => el.textContent = EVENT.reception.address || '—');
  document.querySelectorAll('[data-reception-time]').forEach(el => el.textContent = EVENT.reception.time);

  document.querySelectorAll('[data-dresscode-title]').forEach(el => el.textContent = EVENT.dressCode.title);
  document.querySelectorAll('[data-dresscode-quote]').forEach(el => el.textContent = EVENT.dressCode.quote);

  document.querySelectorAll('[data-parents-label]').forEach(el => el.textContent = EVENT.parents.label);
  document.querySelectorAll('[data-parents-names]').forEach(el => el.textContent = EVENT.parents.names);

  const mapBtn = document.getElementById('map-btn');
  if (mapBtn) {
    if (EVENT.mapsUrl) mapBtn.href = EVENT.mapsUrl;
    else mapBtn.setAttribute('aria-disabled', 'true');
  }
  document.querySelectorAll('[data-map-address]').forEach(el => {
    el.textContent = EVENT.reception.address || EVENT.ceremony.address || 'Ubicación por confirmar';
  });

  const rsvpBtn = document.getElementById('rsvp-btn');
  if (rsvpBtn) {
    if (EVENT.whatsapp.number) {
      const url = `https://wa.me/${EVENT.whatsapp.number}?text=${encodeURIComponent(EVENT.whatsapp.message)}`;
      rsvpBtn.href = url;
    } else {
      rsvpBtn.setAttribute('aria-disabled', 'true');
    }
  }

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.getAttribute('aria-disabled') === 'true') e.preventDefault();
    });
  });

  const musicTitleEl = document.getElementById('music-title');
  if (musicTitleEl) musicTitleEl.textContent = EVENT.musicTitle;
  const audioEl = document.getElementById('bg-audio');
  if (audioEl && EVENT.musicUrl) {
    audioEl.src = EVENT.musicUrl;
  }
}

/* ---------- Gallery ---------- */
function buildGallery(){
  const grid = document.getElementById('gallery-grid');
  if (!grid) return;
  grid.innerHTML = EVENT.gallery.map((img, i) => `
    <figure class="${img.size === 'tall' ? 'tall' : img.size === 'wide' ? 'wide' : ''} reveal" data-index="${i}">
      <img src="${img.src}" alt="${img.alt}" loading="lazy">
    </figure>
  `).join('');
}

/* ---------- Schedule / timeline ---------- */
function buildSchedule(){
  const list = document.getElementById('timeline-list');
  if (!list) return;
  list.innerHTML = EVENT.schedule.map(item => `
    <li class="timeline-item reveal">
      <div class="timeline-time">${item.time}</div>
      <div class="timeline-label">${item.label}</div>
    </li>
  `).join('');
}

/* ---------- Opening screen ---------- */
function initOpening(){
  const opening = document.getElementById('opening');
  const openBtn = document.getElementById('open-invitation');
  if (!opening || !openBtn) return;

  openBtn.addEventListener('click', () => {
    opening.classList.add('is-hidden');
    document.body.style.overflow = '';
    document.getElementById('bg-audio')?.play().catch(() => {
      /* autoplay bloqueado hasta interacción; ya hubo interacción aquí */
    });
    const musicToggle = document.getElementById('music-toggle');
    if (musicToggle && EVENT.musicUrl) musicToggle.classList.remove('is-paused');
    setTimeout(() => {
      opening.remove();
    }, 1200);
  }, { once: true });

  document.body.style.overflow = 'hidden';
}

/* ---------- Scroll reveal ---------- */
function initReveal(){
  const items = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.16 });
  items.forEach(el => io.observe(el));
}

/* ---------- Nav ---------- */
function initNav(){
  const toggle = document.getElementById('nav-toggle');
  const nav = document.getElementById('site-nav');
  if (!toggle || !nav) return;
  toggle.addEventListener('click', () => {
    toggle.classList.toggle('is-open');
    nav.classList.toggle('is-open');
  });
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      toggle.classList.remove('is-open');
      nav.classList.remove('is-open');
    });
  });
}

/* ---------- Progress bar ---------- */
function initProgressBar(){
  const bar = document.getElementById('progress-bar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const h = document.documentElement;
    const scrolled = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
    bar.style.width = scrolled + '%';
  }, { passive: true });
}

/* ---------- Countdown ---------- */
function initCountdown(){
  const target = new Date(EVENT.dateISO).getTime();
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };
  const wrap = document.getElementById('countdown');
  const finalMsg = document.getElementById('countdown-final');
  if (!wrap) return;

  function tick(){
    const now = Date.now();
    const diff = target - now;

    if (diff <= 0) {
      wrap.style.display = 'none';
      if (finalMsg) finalMsg.style.display = 'block';
      clearInterval(timer);
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    if (els.days) els.days.textContent = String(d).padStart(2, '0');
    if (els.hours) els.hours.textContent = String(h).padStart(2, '0');
    if (els.minutes) els.minutes.textContent = String(m).padStart(2, '0');
    if (els.seconds) els.seconds.textContent = String(s).padStart(2, '0');
  }

  tick();
  const timer = setInterval(tick, 1000);
}

/* ---------- Lightbox ---------- */
function initLightbox(){
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const closeBtn = document.getElementById('lightbox-close');
  const prevBtn = document.getElementById('lightbox-prev');
  const nextBtn = document.getElementById('lightbox-next');
  const grid = document.getElementById('gallery-grid');
  if (!lightbox || !grid) return;

  let currentIndex = 0;

  function open(index){
    currentIndex = index;
    const item = EVENT.gallery[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightbox.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }
  function close(){
    lightbox.classList.remove('is-open');
    document.body.style.overflow = '';
  }
  function show(delta){
    currentIndex = (currentIndex + delta + EVENT.gallery.length) % EVENT.gallery.length;
    const item = EVENT.gallery[currentIndex];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
  }

  grid.addEventListener('click', (e) => {
    const fig = e.target.closest('figure');
    if (!fig) return;
    open(Number(fig.dataset.index));
  });

  closeBtn?.addEventListener('click', close);
  prevBtn?.addEventListener('click', () => show(-1));
  nextBtn?.addEventListener('click', () => show(1));
  lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  document.addEventListener('keydown', (e) => {
    if (!lightbox.classList.contains('is-open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') show(-1);
    if (e.key === 'ArrowRight') show(1);
  });
}

/* ---------- Music ---------- */
function initMusic(){
  const toggle = document.getElementById('music-toggle');
  const audio = document.getElementById('bg-audio');
  if (!toggle || !audio) return;

  if (!EVENT.musicUrl) {
    toggle.classList.add('is-paused');
  }

  toggle.addEventListener('click', () => {
    if (!EVENT.musicUrl) return;
    if (audio.paused) {
      audio.play().catch(() => {});
      toggle.classList.remove('is-paused');
    } else {
      audio.pause();
      toggle.classList.add('is-paused');
    }
  });
}

/* ---------- Falling petals / particles ---------- */
function initParticles(){
  const field = document.getElementById('particle-field');
  if (!field) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const petalSVG = `<svg viewBox="0 0 16 22" xmlns="http://www.w3.org/2000/svg"><path d="M8 0C8 0 15 6 15 13C15 18 12 21 8 22C4 21 1 18 1 13C1 6 8 0 8 0Z" fill="#E9A8B5" opacity="0.8"/></svg>`;

  function spawn(){
    const petal = document.createElement('div');
    petal.className = 'petal';
    petal.innerHTML = petalSVG;
    const startX = Math.random() * 100;
    const drift = (Math.random() * 160 - 80) + 'px';
    const duration = 9 + Math.random() * 8;
    const spin = (Math.random() * 360) + 'deg';
    petal.style.left = startX + 'vw';
    petal.style.setProperty('--drift', drift);
    petal.style.setProperty('--spin', spin);
    petal.style.animationDuration = duration + 's';
    petal.style.width = (10 + Math.random() * 10) + 'px';
    field.appendChild(petal);
    setTimeout(() => petal.remove(), duration * 1000 + 200);
  }

  for (let i = 0; i < 4; i++) setTimeout(spawn, i * 900);
  setInterval(spawn, 2600);
}
