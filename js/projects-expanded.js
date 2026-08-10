/**
 * Krish Kumar Dey - Scalable Projects & Security Lab Engine
 * Features:
 * 1. 3D Mouse Tilt Cards with Depth Perspective
 * 2. 100% Zero Fabrication "Building Next / Planned" State
 * 3. Expandable Technical Case Study Modal Schema (Problem, Solution, Architecture, Tech Stack, Challenges, Lessons Learned)
 */

function initProjectsExpanded() {
  const gridContainer = document.getElementById('projects-grid');
  if (!gridContainer || !PORTFOLIO_DATA || !PORTFOLIO_DATA.projects) return;

  renderProjectCards(gridContainer);
  setup3DTiltEffect();
}

/* --------------------------------------------------------------------------
   Render 3D Tilt Project Cards Grid
   -------------------------------------------------------------------------- */
function renderProjectCards(container) {
  const projects = PORTFOLIO_DATA.projects;

  container.innerHTML = projects.map(proj => `
    <div class="project-tilt-card" data-project-id="${proj.id}">
      <div class="card-inner">
        <div class="card-top-bar">
          <span class="proj-number">${proj.number}</span>
          <span class="status-badge ${proj.statusBadgeClass}">● ${proj.status}</span>
        </div>

        <h3 class="proj-card-title">${proj.title}</h3>
        <div class="proj-tag">${proj.tag}</div>

        <p class="proj-summary">${proj.summary}</p>

        <div class="proj-tech-stack">
          ${proj.techStack.map(t => `<span class="tag-pill">${t}</span>`).join('')}
        </div>

        <div class="proj-card-footer">
          <span class="expand-btn-text">Expand Case Study ➔</span>
        </div>
      </div>
    </div>
  `).join('');

  // Attach click listener to each project card to open Case Study Modal
  const cards = container.querySelectorAll('.project-tilt-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      const projId = card.getAttribute('data-project-id');
      openProjectCaseStudy(projId);
    });
  });
}

/* --------------------------------------------------------------------------
   Subtle 3D Mouse Tilt Effect
   -------------------------------------------------------------------------- */
function setup3DTiltEffect() {
  const cards = document.querySelectorAll('.project-tilt-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left; // Mouse X within card
      const y = e.clientY - rect.top;  // Mouse Y within card

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate rotation angles (max 10 deg)
      const rotateX = ((y - centerY) / centerY) * -10;
      const rotateY = ((x - centerX) / centerX) * 10;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
    });
  });
}

/* --------------------------------------------------------------------------
   Expandable Technical Case Study Modal
   -------------------------------------------------------------------------- */
function openProjectCaseStudy(projectId) {
  const proj = PORTFOLIO_DATA.projects.find(p => p.id === projectId);
  if (!proj) return;

  let modal = document.getElementById('project-case-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'project-case-modal';
    modal.className = 'node-hud-modal';
    document.body.appendChild(modal);
  }

  const hasDiagram = proj.architectureDiagram ? true : false;
  const hasGithub = proj.github ? true : false;

  modal.innerHTML = `
    <div class="hud-modal-content case-study-content">
      <div class="hud-modal-header">
        <div style="display: flex; align-items: center; gap: 12px;">
          <span class="hud-tag">PROJECT ${proj.number}</span>
          <span class="status-badge ${proj.statusBadgeClass}">● ${proj.status}</span>
        </div>
        <button class="hud-close-btn" onclick="document.getElementById('project-case-modal').classList.remove('show')">✕</button>
      </div>

      <h2 style="font-size: var(--fs-3xl); font-weight: var(--fw-bold); color: var(--text-primary); margin-bottom: 4px;">${proj.title}</h2>
      <div style="font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--color-cyan); margin-bottom: 16px;">${proj.tag}</div>

      <p style="font-size: var(--fs-base); color: var(--text-secondary); margin-bottom: 24px;">${proj.summary}</p>

      <!-- Problem & Solution Grid -->
      <div class="case-study-grid">
        <div class="case-box">
          <div class="box-header"><i data-lucide="alert-circle" style="width: 16px; height: 16px; color: var(--color-amber);"></i> THE PROBLEM</div>
          <p>${proj.problem}</p>
        </div>

        <div class="case-box">
          <div class="box-header"><i data-lucide="check-circle" style="width: 16px; height: 16px; color: var(--color-emerald);"></i> THE SOLUTION</div>
          <p>${proj.solution}</p>
        </div>
      </div>

      <!-- Technologies Used -->
      <div class="case-study-section">
        <div class="section-label">TECHNOLOGIES & TOOLING STACK</div>
        <div class="proj-tech-stack" style="margin-top: 8px;">
          ${proj.techStack.map(t => `<span class="tag-pill" style="font-size: 0.8rem; padding: 4px 12px;">${t}</span>`).join('')}
        </div>
      </div>

      ${hasDiagram ? `
        <!-- Conceptual Architecture Overview -->
        <div class="case-study-section">
          <div class="section-label">CONCEPTUAL ARCHITECTURE LAYOUT</div>
          <div class="diagram-preview-box">
            <img src="${proj.architectureDiagram}" alt="${proj.title} Architecture Diagram" style="width: 100%; border-radius: 8px; max-height: 240px; object-fit: cover; border: 1px solid var(--border-subtle);">
          </div>
        </div>
      ` : ''}

      <!-- Technical Challenges & What I Learned -->
      <div class="case-study-grid" style="margin-top: 20px;">
        <div class="case-box">
          <div class="box-header"><i data-lucide="zap" style="width: 16px; height: 16px; color: var(--color-cyan);"></i> KEY TECHNICAL CHALLENGES</div>
          <ul class="case-list">
            ${proj.challenges.map(c => `<li>${c}</li>`).join('')}
          </ul>
        </div>

        <div class="case-box">
          <div class="box-header"><i data-lucide="book-open" style="width: 16px; height: 16px; color: var(--color-emerald);"></i> WHAT I LEARNED</div>
          <ul class="case-list">
            ${proj.whatILearned.map(w => `<li>${w}</li>`).join('')}
          </ul>
        </div>
      </div>

      <!-- Action Buttons -->
      <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid var(--border-subtle); display: flex; gap: 12px; flex-wrap: wrap;">
        ${hasGithub ? `
          <a href="${proj.github}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary">
            <i data-lucide="github"></i>
            <span>GitHub Repository</span>
          </a>
        ` : ''}
        <button class="btn btn-secondary" onclick="document.getElementById('project-case-modal').classList.remove('show')">
          <span>Close Case Study</span>
        </button>
      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}
