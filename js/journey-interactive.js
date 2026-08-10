/**
 * Krish Kumar Dey - Interactive Cybersecurity Journey & Hands-On Platforms Engine
 * 
 * Features:
 * 1. 10-Step Sequential Progression Timeline (Topic, What Learning, Tools, Future Goal)
 * 2. Node Click Expansion into HUD Milestone Drawer
 * 3. Professional Hands-On Platform Profile Cards (TryHackMe, HTB, GitHub) with 0 Fake Stats
 */

function initJourneyInteractive() {
  renderJourneyTimeline();
  renderPlatformProfiles();
}

/* --------------------------------------------------------------------------
   10-Step Interactive Progression Timeline
   -------------------------------------------------------------------------- */
function renderJourneyTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.journeyTimeline) return;

  const timelineData = PORTFOLIO_DATA.journeyTimeline;

  container.innerHTML = `
    <div class="journey-timeline-wrapper">
      <div class="journey-track-line"></div>

      ${timelineData.map(item => `
        <div class="journey-step-node" data-step="${item.step}">
          <div class="journey-node-dot"></div>
          <div class="journey-card-bubble" onclick="openMilestoneDrawer('${item.step}')" title="Click to inspect milestone details">
            <div class="journey-card-top">
              <span class="step-num">STEP ${item.step}</span>
              <span class="status-badge ${item.statusClass}">● ${item.status}</span>
            </div>
            <h3 class="journey-topic-title">${item.topic}</h3>
            <p class="journey-snippet">${item.whatLearning.substring(0, 110)}...</p>
            <div class="journey-expand-action">
              <span>Inspect Step Details</span>
              <i data-lucide="chevron-right" style="width: 14px; height: 14px;"></i>
            </div>
          </div>
        </div>
      `).join('')}
    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

/* --------------------------------------------------------------------------
   Milestone Telemetry Drawer Modal
   -------------------------------------------------------------------------- */
function openMilestoneDrawer(stepNumber) {
  const item = PORTFOLIO_DATA.journeyTimeline.find(j => j.step === stepNumber);
  if (!item) return;

  let modal = document.getElementById('milestone-hud-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'milestone-hud-modal';
    modal.className = 'node-hud-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="hud-modal-content">
      <div class="hud-modal-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="hud-tag">PROGRESSION // STEP ${item.step}</span>
          <span class="status-badge ${item.statusClass}">● ${item.status}</span>
        </div>
        <button class="hud-close-btn" onclick="document.getElementById('milestone-hud-modal').classList.remove('show')">✕</button>
      </div>

      <h2 class="hud-title">${item.topic}</h2>

      <div class="drawer-section" style="margin-top: 16px;">
        <div class="drawer-section-title" style="color: var(--color-cyan);">WHAT I'M LEARNING</div>
        <p style="font-size: var(--fs-base); color: var(--text-secondary); line-height: 1.6; margin-bottom: 0;">${item.whatLearning}</p>
      </div>

      <div class="drawer-section" style="margin-top: 20px;">
        <div class="drawer-section-title" style="color: var(--color-emerald);">TOOLS & CONCEPTS INVOLVED</div>
        <div class="proj-tech-stack" style="margin-top: 8px;">
          ${item.toolsInvolved.map(t => `<span class="tag-pill" style="font-size: 0.8rem; padding: 4px 12px;">${t}</span>`).join('')}
        </div>
      </div>

      <div class="drawer-section" style="margin-top: 20px; background: var(--bg-elevated); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div class="drawer-section-title" style="color: var(--color-amber);">FUTURE GOAL / TARGET HORIZON</div>
        <p style="font-size: var(--fs-sm); color: var(--text-primary); margin-bottom: 0; font-weight: var(--fw-medium);">${item.futureGoal}</p>
      </div>

      <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); text-align: right;">
        <button class="btn btn-secondary" onclick="document.getElementById('milestone-hud-modal').classList.remove('show')">
          <span>Close Milestone</span>
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/* --------------------------------------------------------------------------
   Hands-On Platform Profile Cards (Zero Fake Stats)
   -------------------------------------------------------------------------- */
function renderPlatformProfiles() {
  const container = document.getElementById('platformsContainer');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.platforms) return;

  const platforms = PORTFOLIO_DATA.platforms;

  container.innerHTML = platforms.map(p => `
    <div class="platform-card">
      <div>
        <div class="platform-header">
          <div class="platform-name" style="color: ${p.accent}">${p.name}</div>
          <i data-lucide="${p.icon}" style="color: ${p.accent}"></i>
        </div>
        <div class="platform-handle">Username: @${p.handle}</div>
        <div class="status-pill" style="margin-bottom: var(--space-3); padding: 2px 8px; font-size: 0.7rem;">${p.statusText}</div>
        <p style="font-size: var(--fs-sm); margin-bottom: 0;">${p.description}</p>
      </div>

      <div style="margin-top: var(--space-6);">
        <a href="${p.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%;">
          <span>View Verified Profile</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </a>
      </div>
    </div>
  `).join('');

  if (window.lucide) {
    window.lucide.createIcons();
  }
}
