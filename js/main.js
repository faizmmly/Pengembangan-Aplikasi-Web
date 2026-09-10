/* ==========================================================================
   Main JavaScript - Tracking Tugas LMS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModalEvents();
  initSmoothScroll();
});

/* ==========================================================================
   1. Theme Management (Dark & Light Mode)
   ========================================================================== */
function initTheme() {
  const savedTheme = localStorage.getItem('theme');
  
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    updateThemeUI(true);
  } else {
    document.body.classList.remove('light-mode');
    updateThemeUI(false);
  }
}

function toggleTheme() {
  const isLightMode = document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', isLightMode ? 'light' : 'dark');
  updateThemeUI(isLightMode);
}

function updateThemeUI(isLight) {
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  if (themeIcon && themeText) {
    if (isLight) {
      themeIcon.textContent = '☀️';
      themeText.textContent = 'Light Mode';
    } else {
      themeIcon.textContent = '🌙';
      themeText.textContent = 'Dark Mode';
    }
  }
}

/* ==========================================================================
   2. PDF Modal Viewer
   ========================================================================== */
function openPdfModal(title, pdfUrl) {
  const modal = document.getElementById('pdfModal');
  const modalTitle = document.getElementById('modalTitle');
  const pdfViewer = document.getElementById('pdfViewer');

  if (modal && modalTitle && pdfViewer) {
    modalTitle.textContent = title;
    pdfViewer.src = pdfUrl;
    modal.style.display = 'flex';
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden'; // Kunci scroll halaman belakang
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');

  if (modal && pdfViewer) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    pdfViewer.src = '';
    document.body.style.overflow = ''; // Kembalikan scroll halaman
  }
}

function initModalEvents() {
  const modal = document.getElementById('pdfModal');

  if (modal) {
    // Tutup modal jika mengklik area luar modal (overlay)
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePdfModal();
      }
    });

    // Tutup modal dengan menekan tombol 'Escape'
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.style.display === 'flex') {
        closePdfModal();
      }
    });
  }
}

/* ==========================================================================
   3. Search & Filter Cards
   ========================================================================== */
function filterWeeks() {
  const input = document.getElementById('searchInput');
  const filter = input.value.toLowerCase().trim();
  const weekCards = document.querySelectorAll('.weeks-grid .card');

  weekCards.forEach((card) => {
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.tech-tags span'))
      .map(span => span.textContent.toLowerCase())
      .join(' ');

    if (title.includes(filter) || desc.includes(filter) || tags.includes(filter)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==========================================================================
   4. Sidebar Nav Active State
   ========================================================================== */
function initSmoothScroll() {
  const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');

  menuItems.forEach((item) => {
    item.addEventListener('click', function () {
      const href = this.getAttribute('href');
      
      // Mengubah status aktif hanya pada tautan internal (#)
      if (href && href.startsWith('#')) {
        menuItems.forEach((nav) => nav.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
}