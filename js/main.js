/* ==========================================================================
   Main JavaScript - Tracking Tugas LMS
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initModalEvents();
  initSmoothScroll();
  updateModuleProgress();
  updateExamStatus();
  initWeekStrip();
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
    document.body.style.overflow = 'hidden';
  }
}

function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  const pdfViewer = document.getElementById('pdfViewer');

  if (modal && pdfViewer) {
    modal.style.display = 'none';
    modal.setAttribute('aria-hidden', 'true');
    pdfViewer.src = '';
    document.body.style.overflow = '';
  }
}

function initModalEvents() {
  const modal = document.getElementById('pdfModal');

  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closePdfModal();
      }
    });

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
  const filter = input ? input.value.toLowerCase().trim() : '';
  const weekCards = document.querySelectorAll('.weeks-grid .card');

  weekCards.forEach((card) => {
    const weekTag = card.querySelector('.week-tag')?.textContent.toLowerCase() || '';
    const title = card.querySelector('.card-title')?.textContent.toLowerCase() || '';
    const desc = card.querySelector('.card-desc')?.textContent.toLowerCase() || '';
    const tags = Array.from(card.querySelectorAll('.tech-tags span'))
      .map((span) => span.textContent.toLowerCase())
      .join(' ');

    if (weekTag.includes(filter) || title.includes(filter) || desc.includes(filter) || tags.includes(filter)) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

function filterStatus(status, btn) {
  document.querySelectorAll('.filter-btn').forEach((b) => b.classList.remove('active'));
  if (btn) btn.classList.add('active');

  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value) {
    searchInput.value = '';
  }

  const cards = document.querySelectorAll('.week-item');
  cards.forEach((card) => {
    const isCompleted = card.querySelector('.status-pill.completed');
    if (status === 'all') {
      card.style.display = 'flex';
    } else if (status === 'completed' && isCompleted) {
      card.style.display = 'flex';
    } else if (status === 'pending' && !isCompleted) {
      card.style.display = 'flex';
    } else {
      card.style.display = 'none';
    }
  });
}

/* ==========================================================================
   4. Sidebar Nav Active State & Mobile Drawer
   ========================================================================== */
function initSmoothScroll() {
  const menuItems = document.querySelectorAll('.sidebar-menu .menu-item');

  menuItems.forEach((item) => {
    item.addEventListener('click', function () {
      const href = this.getAttribute('href');

      if (href && href.startsWith('#')) {
        menuItems.forEach((nav) => nav.classList.remove('active'));
        this.classList.add('active');
      }

      if (window.innerWidth <= 900) {
        toggleSidebar();
      }
    });
  });
}

function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  if (sidebar) sidebar.classList.toggle('active');
  if (overlay) overlay.classList.toggle('active');
}

/* ==========================================================================
   5. Progress Modul & Status Ujian (UTS / UAS)
   ========================================================================== */
function updateModuleProgress() {
  const allCards = document.querySelectorAll('.weeks-grid .week-item');
  const totalModules = allCards.length || 16;
  const completedModules = document.querySelectorAll('.weeks-grid .status-pill.completed').length;
  const percentage = (completedModules / totalModules) * 100;
  const roundedPercent = Math.round(percentage);

  const progressText = document.getElementById('progressText');
  const progressPercentText = document.getElementById('progressPercentText');
  const donutLabel = document.getElementById('donutPercentLabel');
  const donutFill = document.getElementById('progressDonutFill');

  if (progressText) {
    progressText.innerHTML = `${completedModules} <small>/ ${totalModules}</small>`;
  }
  if (progressPercentText) {
    progressPercentText.textContent = `${percentage.toFixed(1)}% tercapai`;
  }
  if (donutLabel) {
    donutLabel.textContent = `${roundedPercent}%`;
  }
  if (donutFill) {
    const circumference = 2 * Math.PI * 17; // 106.81
    const offset = circumference - (percentage / 100) * circumference;
    donutFill.style.strokeDashoffset = offset.toFixed(2);
  }
}

function updateExamStatus() {
  const week8Completed = document.querySelector('.card.week-item:nth-child(8) .status-pill.completed');
  const week16Completed = document.querySelector('.card.week-item:nth-child(16) .status-pill.completed');

  const utsElement = document.getElementById('status-uts');
  const uasElement = document.getElementById('status-uas');

  if (week8Completed && utsElement) {
    utsElement.textContent = 'Selesai';
    utsElement.className = 'stat-value text-emerald';
  }

  if (week16Completed && uasElement) {
    uasElement.textContent = 'Selesai';
    uasElement.className = 'stat-value text-emerald';
  }
}

/* ==========================================================================
   6. Strip Progres 16 Minggu & Pintasan Tugas Terbaru
   ========================================================================== */
function scrollToAndPingCard(targetCard) {
  if (!targetCard) return;

  // Pastikan semua kartu tampil jika sebelumnya sedang difilter
  if (targetCard.style.display === 'none') {
    const allFilterBtn = document.querySelector('.filter-btn');
    filterStatus('all', allFilterBtn);
  }

  targetCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
  targetCard.classList.remove('is-pinged');
  void targetCard.offsetWidth; // Trigger reflow agar animasi ulang berjalan
  targetCard.classList.add('is-pinged');
}

function initWeekStrip() {
  const stripEl = document.getElementById('weekStrip');
  const captionEl = document.getElementById('weekStripCaption');
  const latestSlotEl = document.getElementById('latestSlot');
  const cards = Array.from(document.querySelectorAll('#weeksGrid .week-item'));

  if (!stripEl || cards.length === 0) return;

  stripEl.innerHTML = '';
  let completedCount = 0;
  let latestCompletedCard = null;
  let latestWeekLabel = '';

  cards.forEach((card, index) => {
    const weekNum = index + 1;
    const isCompleted = Boolean(card.querySelector('.status-pill.completed'));
    const isExam = weekNum === 8 || weekNum === 16 || card.classList.contains('card-exam-uas');
    const titleText = card.querySelector('.card-title')?.textContent?.trim() || `Week ${weekNum}`;

    if (isCompleted) {
      completedCount++;
      latestCompletedCard = card;
      latestWeekLabel = `Week ${String(weekNum).padStart(2, '0')}`;
    }

    const cell = document.createElement('button');
    cell.type = 'button';
    cell.className = 'week-strip-cell';
    if (isCompleted) cell.classList.add('is-done');
    if (isExam) cell.classList.add('is-exam');
    cell.textContent = String(weekNum);
    cell.title = `Week ${String(weekNum).padStart(2, '0')}: ${titleText}`;

    cell.addEventListener('click', () => scrollToAndPingCard(card));
    stripEl.appendChild(cell);
  });

  if (captionEl) {
    captionEl.textContent = `${completedCount} dari ${cards.length} minggu selesai`;
  }

  if (latestSlotEl) {
    latestSlotEl.innerHTML = '';
    if (latestCompletedCard) {
      const link = document.createElement('a');
      link.href = '#tasks';
      link.className = 'latest-link';
      link.textContent = `Lihat tugas terbaru (${latestWeekLabel}) ↓`;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        scrollToAndPingCard(latestCompletedCard);
      });
      latestSlotEl.appendChild(link);
    }
  }
}