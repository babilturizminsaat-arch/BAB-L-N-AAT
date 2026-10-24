/**
 * BABİL TURİZM İNŞAAT — Çekmeköy 34 Daire Projesi
 * 3D Dış Cephe Galerisi, Kat Planları ve Mobil Navigasyon
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollObserver();
  initStickyHeader();
  initMobileDrawer();
  initFloorPlanTabs();
  initGalleryViewer();
});

/* --------------------------------------------------------------------------
   1. Görünürlük Animasyonları (IntersectionObserver)
   -------------------------------------------------------------------------- */
function initScrollObserver() {
  const elements = document.querySelectorAll('.animate-on-scroll');

  if (!('IntersectionObserver' in window)) {
    elements.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, {
    rootMargin: '0px 0px -40px 0px',
    threshold: 0.1
  });

  elements.forEach(el => observer.observe(el));
}

/* --------------------------------------------------------------------------
   2. Sabit Header Arka Plan Efekti
   -------------------------------------------------------------------------- */
function initStickyHeader() {
  const header = document.getElementById('main-header');
  if (!header) return;

  const onScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------------------------
   3. Mobil Çekmece Menü
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const closeBtn = document.getElementById('drawer-close');
  const drawer = document.getElementById('mobile-drawer');
  const navLinks = drawer ? drawer.querySelectorAll('.mobile-nav-link, .btn') : [];

  if (!toggleBtn || !drawer) return;

  const openDrawer = () => {
    drawer.classList.add('open');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    drawer.classList.remove('open');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', () => {
    if (drawer.classList.contains('open')) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);

  drawer.addEventListener('click', (e) => {
    if (e.target === drawer) closeDrawer();
  });

  navLinks.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });
}

/* --------------------------------------------------------------------------
   4. Kat Planları Sekme Değişimi
   -------------------------------------------------------------------------- */
function initFloorPlanTabs() {
  const tabBtns = document.querySelectorAll('.plan-tab-btn');
  const panels = document.querySelectorAll('.plan-panel');

  if (!tabBtns.length || !panels.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');

      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      panels.forEach(panel => {
        if (panel.id === targetId) {
          panel.classList.add('active');
        } else {
          panel.classList.remove('active');
        }
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. 3D Dış Cephe Mimari Galeri Görüntüleyici
   -------------------------------------------------------------------------- */
function initGalleryViewer() {
  const mainImg = document.getElementById('gallery-main-img');
  const titleElem = document.getElementById('gallery-img-title');
  const tabBtns = document.querySelectorAll('.gallery-tab-btn');
  const thumbs = document.querySelectorAll('.thumb-item');

  if (!mainImg || !titleElem) return;

  const setImg = (src, title) => {
    mainImg.style.opacity = '0';
    setTimeout(() => {
      mainImg.src = src;
      titleElem.textContent = title;
      mainImg.style.opacity = '1';
    }, 180);

    // Tab butonlarını eşle
    tabBtns.forEach(b => {
      if (b.getAttribute('data-img') === src) {
        b.classList.add('active');
      } else {
        b.classList.remove('active');
      }
    });

    // Küçük resimleri eşle
    thumbs.forEach(t => {
      if (t.getAttribute('data-img') === src) {
        t.classList.add('active');
      } else {
        t.classList.remove('active');
      }
    });
  };

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const src = btn.getAttribute('data-img');
      const title = btn.getAttribute('data-title');
      setImg(src, title);
    });
  });

  thumbs.forEach(thumb => {
    thumb.addEventListener('click', () => {
      const src = thumb.getAttribute('data-img');
      const title = thumb.getAttribute('data-title');
      setImg(src, title);
    });
  });
}
