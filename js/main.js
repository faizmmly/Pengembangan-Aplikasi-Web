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

function updateModuleProgress() {
  const totalModules = 16;
  // Hitung berapa modul yang sudah bertanda "completed" / "Selesai"
  const completedModules = document.querySelectorAll('.status-pill.completed').length;
  
  // Hitung persentase
  const percentage = (completedModules / totalModules) * 100;

  // Elemen target
  const statValue = document.querySelector('.stat-value');
  const progressBarFill = document.querySelector('.progress-bar-fill');

  // Update teks & lebar progress bar
  if (statValue) {
    statValue.innerText = `${completedModules} / ${totalModules}`;
  }
  if (progressBarFill) {
    progressBarFill.style.width = `${percentage}%`;
  }
}

// Jalankan otomatis begitu dokumen HTML selesai dimuat
document.addEventListener('DOMContentLoaded', updateModuleProgress);

function updateExamStatus() {
  // Cek apakah modul Week 08 / UTS sudah ditandai completed
  // (Pastikan card week 08 kamu punya atribut data-week="8" atau sejenisnya)
  const week8Card = document.querySelector('.card.week-item:nth-child(8) .status-pill.completed');
  const week16Card = document.querySelector('.card.week-item:nth-child(16) .status-pill.completed');

  const utsElement = document.getElementById('status-uts');
  const uasElement = document.getElementById('status-uas');

  // Update Status UTS
  if (week8Card && utsElement) {
    utsElement.innerText = 'Selesai';
    utsElement.className = 'stat-value text-emerald'; // Ubah warna jadi hijau
  }

  // Update Status UAS
  if (week16Card && uasElement) {
    uasElement.innerText = 'Selesai';
    uasElement.className = 'stat-value text-emerald';
  }
}

// Panggil bersamaan saat DOM Load
document.addEventListener('DOMContentLoaded', () => {
  updateModuleProgress();
  updateExamStatus();
});

// Toggle Mobile Sidebar Drawer
function toggleSidebar() {
  const sidebar = document.querySelector('.sidebar');
  const overlay = document.getElementById('sidebarOverlay');
  
  if (sidebar && overlay) {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('active');
  }
}

// Tutup sidebar otomatis jika link menu diklik (Mobile UX)
document.querySelectorAll('.sidebar .menu-item').forEach(item => {
  item.addEventListener('click', () => {
    if (window.innerWidth <= 900) {
      toggleSidebar();
    }
  });
});

// Function Filter berdasarkan Status (Selesai / Mendatang)
function filterStatus(status, btn) {
  document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');

  const cards = document.querySelectorAll('.week-item');
  cards.forEach(card => {
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