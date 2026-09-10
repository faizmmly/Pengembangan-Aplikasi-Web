// Data Pertemuan 1 - 16
const weeksData = [
  {
    week: 1,
    title: "Web Request Investigation",
    desc: "Anatomi URL, DevTools Network Tab, 5 HTTP Request, dan Analisis Arsitektur.",
    link: "./week-01/README.md",
    status: "active"
  },
  { week: 2, title: "HTML5 & Semantic Web", desc: "Materi dan tugas belum dirilis.", status: "active" },
  { week: 3, title: "CSS Layouting & Flexbox", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 4, title: "Responsive Web & Tailwind CSS", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 5, title: "JavaScript Basics & DOM", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 6, title: "JS Event Handling & Fetch API", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 7, title: "Single Page Application (SPA)", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 8, title: "Ujian Tengah Semester", desc: "Evaluasi Praktikum UTS.", status: "exam" },
  { week: 9, title: "Node.js & Express Fundamentals", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 10, title: "RESTful API Design", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 11, title: "Database Integration & ORM", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 12, title: "Authentication & JWT", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 13, title: "Frontend Framework (React / Next)", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 14, title: "Fullstack Integration", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 15, title: "Deployment & Cloud Hosting", desc: "Materi dan tugas belum dirilis.", status: "locked" },
  { week: 16, title: "Ujian Akhir Semester", desc: "Final Web Application Project.", status: "exam" }
];

// Function Render Cards
function renderWeekCards() {
  const container = document.getElementById("weeks-grid");
  if (!container) return;

  container.innerHTML = weeksData.map((item) => {
    const formattedWeek = String(item.week).padStart(2, '0');

    if (item.status === "active") {
      return `
        <a href="${item.link}" class="card-active">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold px-2.5 py-1 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
              Week ${formattedWeek}
            </span>
            <i data-lucide="arrow-up-right" class="w-4 h-4 text-cyan-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition"></i>
          </div>
          <h3 class="font-bold text-slate-100 group-hover:text-white text-base mb-1">${item.title}</h3>
          <p class="text-slate-400 text-xs line-clamp-2">${item.desc}</p>
        </a>
      `;
    }

    if (item.status === "exam") {
      const icon = item.week === 8 ? "award" : "trophy";
      const color = item.week === 8 ? "amber" : "emerald";
      return `
        <div class="p-5 bg-${color}-950/20 border border-${color}-800/40 rounded-xl opacity-75">
          <div class="flex items-center justify-between mb-3">
            <span class="text-xs font-semibold px-2.5 py-1 rounded bg-${color}-500/20 text-${color}-400 border border-${color}-500/30">
              Week ${formattedWeek}
            </span>
            <i data-lucide="${icon}" class="w-4 h-4 text-${color}-500"></i>
          </div>
          <h3 class="font-bold text-${color}-200 text-base mb-1">${item.title}</h3>
          <p class="text-${color}-500/80 text-xs">${item.desc}</p>
        </div>
      `;
    }

    return `
      <div class="card-locked">
        <div class="flex items-center justify-between mb-3">
          <span class="text-xs font-semibold px-2.5 py-1 rounded bg-slate-800 text-slate-400 border border-slate-700/50">
            Week ${formattedWeek}
          </span>
          <i data-lucide="lock" class="w-4 h-4 text-slate-600"></i>
        </div>
        <h3 class="font-semibold text-slate-400 text-base mb-1">${item.title}</h3>
        <p class="text-slate-500 text-xs">${item.desc}</p>
      </div>
    `;
  }).join("");

  // Re-initialize Lucide Icons
  if (window.lucide) {
    lucide.createIcons();
  }
}

// Execute after DOM Loaded
document.addEventListener("DOMContentLoaded", renderWeekCards);