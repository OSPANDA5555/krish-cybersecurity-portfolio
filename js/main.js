/**
 * Krish Kumar Dey - Cybersecurity Portfolio Main Logic Script
 * Handles dynamic rendering from PORTFOLIO_DATA, scroll-spy, terminal interactivity, 
 * copy functionality, and responsive UI behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize 3D Hero Scene
  if (typeof initHero3D === 'function') {
    initHero3D();
  }

  // 2. Initialize Dynamic UI Renderers
  renderHeroTerminal('status');
  renderFocusPillars();
  if (typeof initSkillsInteractive === 'function') {
    initSkillsInteractive();
  }
  if (typeof initSocDashboard === 'function') {
    initSocDashboard();
  }
  if (typeof initProjectsExpanded === 'function') {
    initProjectsExpanded();
  }
  if (typeof initJourneyInteractive === 'function') {
    initJourneyInteractive();
  }
  if (typeof initRecruiterUX === 'function') {
    initRecruiterUX();
  }
  renderCurrentlyLearning();
  renderEducation();
  setCurrentYear();

  // 3. Setup Event Listeners
  setupTerminalTabs();
  setupNavigation();
  setupEmailCopy();

  // 3. Re-initialize Lucide Icons after DOM populating
  if (window.lucide) {
    window.lucide.createIcons();
  }
});

/* --------------------------------------------------------------------------
   Hero Interactive Terminal Telemetry Widget
   -------------------------------------------------------------------------- */
function renderHeroTerminal(tabKey) {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const data = PORTFOLIO_DATA;
  let content = '';

  if (tabKey === 'status') {
    content = `
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span class="cmd-text">./telemetry.sh --check-status</span></div>
      <div class="terminal-output">
        <div class="terminal-kv"><span class="kv-key">SYSTEM_USER:</span><span class="kv-val">${data.personalInfo.preferredName} (${data.personalInfo.fullName})</span></div>
        <div class="terminal-kv"><span class="kv-key">TARGET_ROLE:</span><span class="kv-val-cyan">${data.personalInfo.roleTarget}</span></div>
        <div class="terminal-kv"><span class="kv-key">UNIVERSITY:</span><span class="kv-val">${data.personalInfo.university}</span></div>
        <div class="terminal-kv"><span class="kv-key">DEGREE_STATUS:</span><span class="kv-val">${data.personalInfo.degree} (${data.personalInfo.expectedGraduation})</span></div>
        <div class="terminal-kv"><span class="kv-key">SOC_STATUS:</span><span class="kv-val-cyan">● ${data.personalInfo.statusText}</span></div>
      </div>
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span class="cmd-text">grep --color=auto "PRIMARY_INTERESTS"</span></div>
      <div class="terminal-output">
        <div style="color: var(--text-secondary);">[+] SOC Ops | Network PCAP Analysis | Linux Security | SIEM Triaging</div>
      </div>
    `;
  } else if (tabKey === 'stack') {
    content = `
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span class="cmd-text">cat tools.json | jq .primary_stack</span></div>
      <div class="terminal-output">
        <div class="terminal-kv"><span class="kv-key">SCRIPTING:</span><span class="kv-val-cyan">Python, Bash</span></div>
        <div class="terminal-kv"><span class="kv-key">LANGUAGES:</span><span class="kv-val">Java, C++, Rust</span></div>
        <div class="terminal-kv"><span class="kv-key">PACKET_ANALYSIS:</span><span class="kv-val">Wireshark (PCAP Inspection)</span></div>
        <div class="terminal-kv"><span class="kv-key">PORT_SCANNING:</span><span class="kv-val">Nmap</span></div>
        <div class="terminal-kv"><span class="kv-key">PROXY_INSPECT:</span><span class="kv-val">Burp Suite</span></div>
        <div class="terminal-kv"><span class="kv-key">ENVIRONMENTS:</span><span class="kv-val-cyan">Ubuntu Linux, Docker, AWS</span></div>
      </div>
    `;
  } else if (tabKey === 'platforms') {
    content = `
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span class="cmd-text">netstat --active-profiles</span></div>
      <div class="terminal-output">
        <div class="terminal-kv"><span class="kv-key">TRYHACKME:</span><span class="kv-val-cyan"><a href="${data.personalInfo.socials.tryhackme}" target="_blank" style="color: var(--color-cyan);">p/krishdey100</a></span></div>
        <div class="terminal-kv"><span class="kv-key">HACK_THE_BOX:</span><span class="kv-val"><a href="${data.personalInfo.socials.hackthebox}" target="_blank" style="color: var(--color-emerald);">profile/dashboard</a></span></div>
        <div class="terminal-kv"><span class="kv-key">GITHUB_REPOS:</span><span class="kv-val"><a href="${data.personalInfo.socials.github}" target="_blank" style="color: var(--text-primary);">github.com/OSPANDA5555</a></span></div>
      </div>
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span style="color: var(--color-emerald);">READY_FOR_COMMUNICATIONS</span></div>
    `;
  }

  terminalBody.innerHTML = content;
}

function setupTerminalTabs() {
  const tabs = document.querySelectorAll('.terminal-tab');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const tabKey = tab.getAttribute('data-tab');
      renderHeroTerminal(tabKey);
    });
  });
}

/* --------------------------------------------------------------------------
   Dynamic Section Renderers
   -------------------------------------------------------------------------- */

// Cybersecurity Focus Pillars
function renderFocusPillars() {
  const container = document.getElementById('focusContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.focusPillars.map(pillar => `
    <div class="focus-card">
      <div class="focus-icon-wrap">
        <i data-lucide="${pillar.icon}"></i>
      </div>
      <span class="tag-pill" style="color: var(--color-cyan); margin-bottom: 8px; display: inline-block;">${pillar.badge}</span>
      <h3 class="focus-card-title">${pillar.title}</h3>
      <p style="font-size: var(--fs-sm);">${pillar.description}</p>
      <div class="focus-tags">
        ${pillar.concepts.map(c => `<span class="tag-pill">${c}</span>`).join('')}
      </div>
    </div>
  `).join('');
}

// Technical Skills (Programming + Infrastructure)
function renderSkills() {
  const progContainer = document.getElementById('programmingSkillsContainer');
  const infraContainer = document.getElementById('infrastructureSkillsContainer');

  if (progContainer) {
    progContainer.innerHTML = PORTFOLIO_DATA.technicalSkills.programming.map(skill => `
      <div class="skill-item">
        <div class="skill-name">
          <i data-lucide="${skill.icon}" style="width: 16px; height: 16px; color: var(--color-cyan);"></i>
          <span>${skill.name}</span>
        </div>
        <span class="skill-tag">${skill.tag}</span>
      </div>
    `).join('');
  }

  if (infraContainer) {
    infraContainer.innerHTML = PORTFOLIO_DATA.technicalSkills.infrastructure.map(skill => `
      <div class="skill-item">
        <div class="skill-name">
          <i data-lucide="${skill.icon}" style="width: 16px; height: 16px; color: var(--color-emerald);"></i>
          <span>${skill.name}</span>
        </div>
        <span class="skill-tag" style="color: var(--color-emerald);">${skill.tag}</span>
      </div>
    `).join('');
  }
}

// Lab Tools Grid
function renderLabTools() {
  const container = document.getElementById('toolsContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.labToolset.map(tool => `
    <div class="tool-card">
      <div>
        <div class="tool-card-header">
          <h3 class="tool-name">${tool.name}</h3>
          <span class="status-pill" style="font-size: 0.7rem; padding: 2px 8px;">${tool.status}</span>
        </div>
        <div class="tool-category">${tool.category}</div>
        <p style="font-size: var(--fs-sm); margin-top: var(--space-3); margin-bottom: 0;">${tool.description}</p>
      </div>
    </div>
  `).join('');
}

// Projects & Lab Roadmap (Zero Fabrication)
function renderLabRoadmap() {
  const container = document.getElementById('roadmapContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.labRoadmap.map(lab => `
    <div class="roadmap-card">
      <span class="roadmap-status-badge ${lab.status === 'IN PROGRESS' ? 'badge-in-progress' : 'badge-planned'}">
        ● ${lab.status}
      </span>
      <h3 class="roadmap-title">${lab.title}</h3>
      <div style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-cyan); margin-bottom: 8px;">
        ${lab.tag} | Expected: ${lab.date}
      </div>
      <p class="roadmap-summary">${lab.summary}</p>
      
      <div class="roadmap-outcomes">
        <div class="roadmap-outcomes-title">PLANNED LAB OBJECTIVES:</div>
        ${lab.outcomes.map(o => `<div class="roadmap-outcome-item"><span>${o}</span></div>`).join('')}
      </div>
    </div>
  `).join('');
}

// Cybersecurity Journey Timeline
function renderTimeline() {
  const container = document.getElementById('timelineContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.journeyTimeline.map(item => `
    <div class="timeline-item">
      <div class="timeline-dot"></div>
      <div class="timeline-content">
        <span class="timeline-year">${item.year}</span>
        <h3 class="timeline-title">${item.title}</h3>
        <div class="timeline-org">${item.organization}</div>
        <p style="font-size: var(--fs-sm); margin-bottom: 0;">${item.description}</p>
      </div>
    </div>
  `).join('');
}

// TryHackMe, HTB & GitHub Platforms
function renderPlatforms() {
  const container = document.getElementById('platformsContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.platforms.map(platform => `
    <div class="platform-card">
      <div>
        <div class="platform-header">
          <div class="platform-name" style="color: ${platform.accent}">${platform.name}</div>
          <i data-lucide="${platform.icon}" style="color: ${platform.accent}"></i>
        </div>
        <div class="platform-handle">Username: @${platform.handle}</div>
        <p style="font-size: var(--fs-sm);">${platform.description}</p>
      </div>
      <div style="margin-top: var(--space-4);">
        <a href="${platform.profileUrl}" target="_blank" rel="noopener noreferrer" class="btn btn-secondary" style="width: 100%;">
          <span>View Profile</span>
          <i data-lucide="external-link" style="width: 14px; height: 14px;"></i>
        </a>
      </div>
    </div>
  `).join('');
}

// Currently Learning Grid
function renderCurrentlyLearning() {
  const container = document.getElementById('learningContainer');
  if (!container) return;

  container.innerHTML = PORTFOLIO_DATA.currentlyLearning.map(item => `
    <div class="learning-card">
      <div class="learning-cat">${item.category}</div>
      <h3 style="font-size: var(--fs-lg); font-weight: var(--fw-semibold); margin-bottom: var(--space-2);">${item.topic}</h3>
      <p style="font-size: var(--fs-sm); margin-bottom: 0;">${item.detail}</p>
    </div>
  `).join('');
}

// Education Section
function renderEducation() {
  const container = document.getElementById('educationContainer');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.education) return;

  const edu = PORTFOLIO_DATA.education;

  container.innerHTML = `
    <div class="education-tech-card">
      
      <!-- Card Header: University Name & Status Badge -->
      <div class="edu-card-header">
        <div class="edu-uni-badge">
          <div class="edu-uni-icon">
            <i data-lucide="graduation-cap" style="width: 26px; height: 26px;" aria-hidden="true"></i>
          </div>
          <div>
            <h3 class="edu-uni-title" style="font-size: var(--fs-2xl); font-weight: var(--fw-bold); color: var(--text-primary); margin-bottom: 2px;">${edu.institution}</h3>
            <div class="edu-uni-sub" style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-emerald);">📍 ${edu.location}</div>
          </div>
        </div>

        <div class="edu-timeline-badge" style="display: flex; align-items: center; gap: 8px;">
          <span>📅 ${edu.timeline}</span>
          <span class="status-badge ${edu.statusBadgeClass}">● ${edu.status}</span>
        </div>
      </div>

      <!-- Degree, Branch & Focus Box -->
      <div class="edu-degree-box" style="background: var(--bg-elevated); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-6);">
        <h4 class="edu-degree-title" style="font-size: var(--fs-xl); font-weight: var(--fw-bold); color: var(--text-primary); margin-bottom: 4px;">${edu.degree}</h4>
        <div class="edu-branch-title" style="font-family: var(--font-mono); font-size: var(--fs-sm); color: var(--color-cyan); margin-bottom: 16px;">${edu.branch} — ${edu.focus}</div>
        
        <!-- Key Metadata Grid -->
        <div class="edu-meta-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: var(--space-4); margin-top: var(--space-4); padding-top: var(--space-4); border-top: 1px solid var(--border-subtle);">
          <div class="edu-meta-item">
            <span class="meta-item-label" style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--text-muted);">STUDENT</span>
            <span class="meta-item-value" style="font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-primary);">${edu.studentName}</span>
          </div>
          <div class="edu-meta-item">
            <span class="meta-item-label" style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--text-muted);">CAREER DIRECTION</span>
            <span class="meta-item-value" style="font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--color-cyan);">${edu.targetRole}</span>
          </div>
          <div class="edu-meta-item">
            <span class="meta-item-label" style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--text-muted);">EXPECTED GRADUATION</span>
            <span class="meta-item-value" style="font-size: var(--fs-sm); font-weight: var(--fw-semibold); color: var(--text-primary);">${edu.expectedGraduation}</span>
          </div>
        </div>
      </div>

    </div>
  `;

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Set Current Year in Footer
function setCurrentYear() {
  const elem = document.getElementById('currentYear');
  if (elem) {
    elem.textContent = new Date().getFullYear();
  }
}

/* --------------------------------------------------------------------------
   Navigation & Scroll Spy
   -------------------------------------------------------------------------- */
function setupNavigation() {
  const navbar = document.getElementById('navbar');
  const navToggle = document.getElementById('navToggle');
  const navLinksContainer = document.getElementById('navLinks');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section');

  // Mobile menu toggle
  if (navToggle && navLinksContainer) {
    navToggle.addEventListener('click', () => {
      navLinksContainer.classList.toggle('show');
    });
  }

  // Scroll spy active link updater
  window.addEventListener('scroll', () => {
    let currentSectionId = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  });
}

/* --------------------------------------------------------------------------
   Copy Email to Clipboard
   -------------------------------------------------------------------------- */
function setupEmailCopy() {
  const copyBtn = document.getElementById('copyEmailBtn');
  const copyText = document.getElementById('copyBtnText');

  if (!copyBtn) return;

  copyBtn.addEventListener('click', () => {
    const email = 'krishdey100@gmail.com';
    navigator.clipboard.writeText(email).then(() => {
      copyText.textContent = 'Copied!';
      setTimeout(() => {
        copyText.textContent = 'Copy';
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy email: ', err);
    });
  });
}
