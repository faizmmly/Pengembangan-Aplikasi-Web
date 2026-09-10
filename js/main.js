/**
 * Main Application Logic
 * Portal Praktikum LMS Dashboard
 */

// Toggle Dark / Light Theme Function
function toggleTheme() {
  const body = document.body;
  const themeIcon = document.getElementById('themeIcon');
  const themeText = document.getElementById('themeText');

  body.classList.toggle('light-mode');

  if (body.classList.contains('light-mode')) {
    themeIcon.textContent = '☀️';
    themeText.textContent = 'Light Mode';
    localStorage.setItem('theme', 'light');
  } else {
    themeIcon.textContent = '🌙';
    themeText.textContent = 'Dark Mode';
    localStorage.setItem('theme', 'dark');
  }
}

// Open PDF Modal Viewer
function openPdfModal(title, pdfUrl) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('pdfViewer').src = pdfUrl;
  
  const modal = document.getElementById('pdfModal');
  modal.style.display = 'flex';
  document.body.style.overflow = 'hidden'; // Lock background scrolling
}

// Close PDF Modal Viewer
function closePdfModal() {
  const modal = document.getElementById('pdfModal');
  modal.style.display = 'none';
  document.getElementById('pdfViewer').src = '';
  document.body.style.overflow = 'auto'; // Restore background scrolling
}

// Search / Filter Functionality for Modules
function filterWeeks() {
  const input = document.getElementById('searchInput').value.toLowerCase();
  const cards = document.getElementsByClassName('week-item');

  for (let i = 0; i < cards.length; i++) {
    const cardText = cards[i].innerText.toLowerCase();
    if (cardText.includes(input)) {
      cards[i].style.display = "flex";
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Load Saved Theme State on Page Load
window.addEventListener('DOMContentLoaded', () => {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.body.classList.add('light-mode');
    document.getElementById('themeIcon').textContent = '☀️';
    document.getElementById('themeText').textContent = 'Light Mode';
  }
});