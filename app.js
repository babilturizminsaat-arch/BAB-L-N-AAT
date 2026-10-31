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
  initHeaderPhoneDropdown();
  initLandEvalForm();
  initMobileBottomBar();
  initServicesCarousel();
  initFaqAccordion();
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

  let lockY = 0;

  const openDrawer = () => {
    lockY = window.scrollY || window.pageYOffset;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${lockY}px`;
    document.body.style.left = '0';
    document.body.style.right = '0';
    document.body.style.width = '100%';
    document.body.classList.add('drawer-open');

    drawer.classList.add('open');
    drawer.removeAttribute('inert');
    drawer.setAttribute('aria-hidden', 'false');
    toggleBtn.setAttribute('aria-expanded', 'true');
    if (closeBtn) closeBtn.focus();
  };

  const closeDrawer = () => {
    if (!drawer.classList.contains('open')) return;
    drawer.classList.remove('open');
    drawer.setAttribute('inert', '');
    drawer.setAttribute('aria-hidden', 'true');
    toggleBtn.setAttribute('aria-expanded', 'false');

    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.left = '';
    document.body.style.right = '';
    document.body.style.width = '';
    document.body.classList.remove('drawer-open');

    window.scrollTo(0, lockY);
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

/* --------------------------------------------------------------------------
   6. Header Telefon Açılır Menüsü
   -------------------------------------------------------------------------- */
function initHeaderPhoneDropdown() {
  const wrap = document.getElementById('header-phone-wrap');
  const toggle = document.getElementById('header-phone-toggle');
  if (!wrap || !toggle) return;

  toggle.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = wrap.classList.toggle('open');
    toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
  });

  document.addEventListener('click', (e) => {
    if (!wrap.contains(e.target)) {
      wrap.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && wrap.classList.contains('open')) {
      wrap.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
  });
}


/* --------------------------------------------------------------------------
   7. Arsa Değerleme & Teklif Formu Etkileşimi
   -------------------------------------------------------------------------- */
function initLandEvalForm() {
  const pills = document.querySelectorAll('.type-pill-btn');
  const typeInput = document.getElementById('selected-deal-type');
  const form = document.getElementById('land-eval-form');

  if (pills.length && typeInput) {
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pills.forEach(p => {
          p.classList.remove('active');
          p.setAttribute('aria-pressed', 'false');
        });
        pill.classList.add('active');
        pill.setAttribute('aria-pressed', 'true');
        typeInput.value = pill.getAttribute('data-type');
      });
    });
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const type = typeInput ? typeInput.value : 'Kat Karşılığı Arsa';
      const name = document.getElementById('eval-name')?.value || '';
      const phone = document.getElementById('eval-phone')?.value || '';
      const location = document.getElementById('eval-location')?.value || '';
      const details = document.getElementById('eval-details')?.value || '';
      const note = document.getElementById('eval-notes')?.value || '';

      const text = `Merhaba Babil Turizm İnşaat, web sitenizden arsa/proje teklif talebinde bulunuyorum:%0A%0A` +
        `• Talep Türü: ${encodeURIComponent(type)}%0A` +
        `• İsim Soyisim: ${encodeURIComponent(name)}%0A` +
        `• Telefon: ${encodeURIComponent(phone)}%0A` +
        `• Konum: ${encodeURIComponent(location)}%0A` +
        `• Ada/Parsel/m²: ${encodeURIComponent(details)}%0A` +
        `• Açıklama: ${encodeURIComponent(note)}`;

      const targetUrl = `https://wa.me/905380174361?text=${text}`;

      if (window.matchMedia && window.matchMedia('(pointer: coarse)').matches) {
        window.location.href = targetUrl;
      } else {
        window.open(targetUrl, '_blank');
      }
    });
  }
}

/* --------------------------------------------------------------------------
   8. Mobil Alt Sabit Bar Klavye Uyumu
   -------------------------------------------------------------------------- */
function initMobileBottomBar() {
  const isInputElem = (el) => el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT');

  document.addEventListener('focusin', (e) => {
    if (isInputElem(e.target)) {
      document.body.classList.add('kb-open');
    }
  });

  document.addEventListener('focusout', (e) => {
    if (isInputElem(e.target)) {
      document.body.classList.remove('kb-open');
    }
  });
}

/* --------------------------------------------------------------------------
   9. Faaliyet Alanları Otomatik & Manuel Kaydırma (Services Carousel)
   -------------------------------------------------------------------------- */
function initServicesCarousel() {
  const carousel = document.getElementById('services-carousel');
  const dotsContainer = document.getElementById('services-carousel-dots');
  if (!carousel) return;

  const cards = Array.from(carousel.querySelectorAll('.corp-service-card'));
  const dots = dotsContainer ? Array.from(dotsContainer.querySelectorAll('.carousel-dot')) : [];
  if (cards.length === 0) return;

  let activeIndex = 0;
  let autoPlayTimer = null;
  let resumeTimer = null;
  let isInteracting = false;
  let isSectionVisible = false;

  const AUTO_INTERVAL = 3800; // 3.8 saniyede bir sonraki karta geçiş
  const RESUME_DELAY = 4500;  // Manuel kaydırmadan 4.5 sn sonra otomatik devam et

  // Kartı yatayda pürüzsüz ortalayarak kaydırma (dikey sayfa zıplaması yapmaz)
  function scrollToCard(index, behavior = 'smooth') {
    if (index < 0) index = 0;
    if (index >= cards.length) index = 0;

    const targetCard = cards[index];
    if (!targetCard) return;

    const cardRect = targetCard.getBoundingClientRect();
    const carouselRect = carousel.getBoundingClientRect();
    const targetOffset = (cardRect.left - carouselRect.left) - ((carousel.clientWidth - targetCard.offsetWidth) / 2);

    carousel.scrollBy({
      left: targetOffset,
      behavior: behavior
    });

    updateDots(index);
    activeIndex = index;
  }

  // Nokta göstergelerini güncelleme
  function updateDots(index) {
    if (!dots.length) return;
    dots.forEach((dot, idx) => {
      if (idx === index) {
        dot.classList.add('active');
        dot.setAttribute('aria-selected', 'true');
      } else {
        dot.classList.remove('active');
        dot.setAttribute('aria-selected', 'false');
      }
    });
  }

  // Merkeze en yakın kart indeksini dinamik hesaplama
  function getClosestIndex() {
    const carouselCenter = carousel.getBoundingClientRect().left + carousel.clientWidth / 2;
    let closestIdx = 0;
    let minDiff = Infinity;

    cards.forEach((card, idx) => {
      const cardCenter = card.getBoundingClientRect().left + card.offsetWidth / 2;
      const diff = Math.abs(cardCenter - carouselCenter);
      if (diff < minDiff) {
        minDiff = diff;
        closestIdx = idx;
      }
    });

    return closestIdx;
  }

  // Otomatik sonraki karta ilerleme
  function nextSlide() {
    if (isInteracting || !isSectionVisible) return;
    // Masaüstünde tüm kartlar sığıyorsa (taşma yoksa) çalıştırma
    if (carousel.scrollWidth <= carousel.clientWidth + 10) return;

    const currentIdx = getClosestIndex();
    const nextIdx = (currentIdx + 1) % cards.length;
    scrollToCard(nextIdx);
  }

  // Zamanlayıcı kontrolleri
  function startAutoPlay() {
    stopAutoPlay();
    if (!isSectionVisible) return;
    autoPlayTimer = setInterval(nextSlide, AUTO_INTERVAL);
  }

  function stopAutoPlay() {
    if (autoPlayTimer) {
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
    }
  }

  // Kullanıcı dokunduğunda veya kaydırdığında zamanlayıcıyı geçici beklemeye al
  function handleUserInteractionStart() {
    isInteracting = true;
    stopAutoPlay();
    if (resumeTimer) clearTimeout(resumeTimer);
  }

  function handleUserInteractionEnd() {
    if (resumeTimer) clearTimeout(resumeTimer);
    resumeTimer = setTimeout(() => {
      isInteracting = false;
      startAutoPlay();
    }, RESUME_DELAY);
  }

  // Dokunma (Touch) Olayları (Mobil Parmak Hareketi)
  carousel.addEventListener('touchstart', handleUserInteractionStart, { passive: true });
  carousel.addEventListener('touchmove', handleUserInteractionStart, { passive: true });
  carousel.addEventListener('touchend', handleUserInteractionEnd, { passive: true });
  carousel.addEventListener('touchcancel', handleUserInteractionEnd, { passive: true });

  // Mouse / Pointer Olayları (Masaüstü ve Tablet)
  carousel.addEventListener('pointerdown', handleUserInteractionStart, { passive: true });
  carousel.addEventListener('pointerup', handleUserInteractionEnd, { passive: true });
  carousel.addEventListener('mouseenter', () => {
    isInteracting = true;
    stopAutoPlay();
  });
  carousel.addEventListener('mouseleave', () => {
    handleUserInteractionEnd();
  });

  // Manuel Kaydırma (Scroll) Olayı — Aktif kartı tespit edip gösterge noktasını anında senkronize et
  let scrollRaf = null;
  carousel.addEventListener('scroll', () => {
    if (scrollRaf) cancelAnimationFrame(scrollRaf);
    scrollRaf = requestAnimationFrame(() => {
      const current = getClosestIndex();
      if (current !== activeIndex) {
        activeIndex = current;
        updateDots(current);
      }
    });
  }, { passive: true });

  // Noktalara tıklandığında ilgili karta git
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      handleUserInteractionStart();
      const slideIdx = parseInt(dot.getAttribute('data-slide'), 10);
      scrollToCard(slideIdx);
      handleUserInteractionEnd();
    });
  });

  // Yalnızca bölüm ekranda görünürken otomatik oynat (Performans ve Pil Dostu)
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isSectionVisible = entry.isIntersecting;
        if (isSectionVisible) {
          startAutoPlay();
        } else {
          stopAutoPlay();
        }
      });
    }, { threshold: 0.2 });

    const section = document.getElementById('hizmetler');
    if (section) observer.observe(section);
  } else {
    isSectionVisible = true;
    startAutoPlay();
  }

  // Sekme arka plana atıldığında gereksiz CPU harcamaması için durdur
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      stopAutoPlay();
    } else if (isSectionVisible) {
      startAutoPlay();
    }
  });
}

/* --------------------------------------------------------------------------
   10. Sıkça Sorulan Sorular Akordeon (FAQ Accordion)
   -------------------------------------------------------------------------- */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems.length) return;

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    if (!question) return;

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Tıklanan dışındakileri kapat
      faqItems.forEach(other => {
        if (other !== item) {
          other.classList.remove('open');
          const q = other.querySelector('.faq-question');
          if (q) q.setAttribute('aria-expanded', 'false');
        }
      });

      if (isOpen) {
        item.classList.remove('open');
        question.setAttribute('aria-expanded', 'false');
      } else {
        item.classList.add('open');
        question.setAttribute('aria-expanded', 'true');
      }
    });
  });
}
