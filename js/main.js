/**
 * Krish Kumar Dey - Cybersecurity Portfolio Main Logic Script
 * Handles dynamic rendering from PORTFOLIO_DATA, scroll-spy, terminal interactivity, 
 * copy functionality, and responsive UI behaviors.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Render Education first safely
  try { renderEducation(); } catch (e) { console.error('Error rendering education:', e); }

  // 2. Initialize 3D Hero Scene
  try {
    if (typeof initHero3D === 'function') {
      initHero3D();
    }
  } catch (e) { console.warn('Hero 3D init note:', e); }

  // 3. Initialize Dynamic UI Renderers with try/catch isolation
  try { renderHeroTerminal('status'); } catch (e) {}
  try { renderFocusPillars(); } catch (e) {}
  try { if (typeof initSkillsInteractive === 'function') initSkillsInteractive(); } catch (e) {}
  try { if (typeof initSocDashboard === 'function') initSocDashboard(); } catch (e) {}
  try { if (typeof initProjectsExpanded === 'function') initProjectsExpanded(); } catch (e) {}
  try { if (typeof initJourneyInteractive === 'function') initJourneyInteractive(); } catch (e) {}
  try { if (typeof initRecruiterUX === 'function') initRecruiterUX(); } catch (e) {}
  try { renderCurrentlyLearning(); } catch (e) {}
  try { renderNetworkNodes(); } catch (e) {}
  try { setCurrentYear(); } catch (e) {}

  // 4. Setup Event Listeners
  try { setupTerminalTabs(); } catch (e) {}
  try { setupNavigation(); } catch (e) {}
  try { setupEmailCopy(); } catch (e) {}
  try { setupModalDismiss(); } catch (e) {}

  // 5. Re-initialize Lucide Icons after DOM populating
  if (window.lucide) {
    try { window.lucide.createIcons(); } catch (e) {}
  }
});

/* --------------------------------------------------------------------------
   Hero Interactive Terminal Telemetry Widget
   -------------------------------------------------------------------------- */
function renderHeroTerminal(tabKey) {
  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  const data = PORTFOLIO_DATA;
  const profile = data.profile || {};
  const socials = profile.socials || {};
  let content = '';

  if (tabKey === 'status') {
    content = `
      <div class="terminal-line"><span class="prompt-symbol">$</span> <span class="cmd-text">./telemetry.sh --check-status</span></div>
      <div class="terminal-output">
        <div class="terminal-kv"><span class="kv-key">SYSTEM_USER:</span><span class="kv-val">${profile.preferredName} (${profile.fullName})</span></div>
        <div class="terminal-kv"><span class="kv-key">TARGET_ROLE:</span><span class="kv-val-cyan">Aspiring ${profile.careerTarget}</span></div>
        <div class="terminal-kv"><span class="kv-key">UNIVERSITY:</span><span class="kv-val">${profile.university}</span></div>
        <div class="terminal-kv"><span class="kv-key">DEGREE_STATUS:</span><span class="kv-val">${profile.degree} (${profile.expectedGraduation})</span></div>
        <div class="terminal-kv"><span class="kv-key">SOC_STATUS:</span><span class="kv-val-cyan">● OPEN TO SOC INTERN / TRAINEE ROLES</span></div>
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
        <div class="terminal-kv"><span class="kv-key">TRYHACKME:</span><span class="kv-val-cyan"><a href="${socials.tryHackMe}" target="_blank" style="color: var(--color-cyan);">p/krishdey100</a></span></div>
        <div class="terminal-kv"><span class="kv-key">HACK_THE_BOX:</span><span class="kv-val"><a href="${socials.hackTheBox}" target="_blank" style="color: var(--color-emerald);">profile/dashboard</a></span></div>
        <div class="terminal-kv"><span class="kv-key">GITHUB_REPOS:</span><span class="kv-val"><a href="${socials.github}" target="_blank" style="color: var(--text-primary);">github.com/OSPANDA5555</a></span></div>
        <div class="terminal-kv"><span class="kv-key">LINKEDIN:</span><span class="kv-val"><a href="${socials.linkedin || 'https://www.linkedin.com/in/krish-dey-dev/'}" target="_blank" style="color: #0A66C2;">in/krish-dey-dev</a></span></div>
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

  container.innerHTML = PORTFOLIO_DATA.focusPillars.map((pillar, idx) => `
    <div class="focus-card">
      <div class="focus-icon-wrap">
        <i data-lucide="${pillar.icon}"></i>
      </div>
      <span class="tag-pill" style="color: var(--color-cyan); margin-bottom: 8px; display: inline-block;">FOCUS 0${idx + 1}</span>
      <h3 class="focus-card-title">${pillar.title}</h3>
      <p style="font-size: var(--fs-sm);">${pillar.summary}</p>
      <div class="focus-tags">
        ${pillar.keyTopics.map(c => `<span class="tag-pill">${c}</span>`).join('')}
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
      <div class="learning-cat">${item.area} • ${item.status}</div>
      <h3 style="font-size: var(--fs-lg); font-weight: var(--fw-semibold); margin-bottom: var(--space-2);">${item.topic}</h3>
      <p style="font-size: var(--fs-sm); margin-bottom: 0;">${item.note}</p>
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

/* --------------------------------------------------------------------------
   Global HUD Modal Dismiss — Escape key + backdrop click.
   Both the project case-study modal and the journey milestone drawer
   share the .node-hud-modal backdrop class, so one delegated handler
   covers both even though their content re-renders on every open.
   -------------------------------------------------------------------------- */
function setupModalDismiss() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
      document.querySelectorAll('.node-hud-modal.show').forEach(m => m.classList.remove('show'));
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target && e.target.classList && e.target.classList.contains('node-hud-modal')) {
      e.target.classList.remove('show');
    }
  });
}

/* --------------------------------------------------------------------------
   05 — 3D Security Network Cards Renderer
   -------------------------------------------------------------------------- */
function renderNetworkNodes() {
  const container = document.getElementById('networkNodeGrid');
  if (!container) return;

  const nodes = [
    {
      category: "SOC",
      title: "SOC Operations",
      state: "Learning",
      badgeClass: "state-indigo",
      description: "Understanding Security Operations Center workflows, alert triage pipelines, and escalation paths.",
      icon: "activity"
    },
    {
      category: "SIEM",
      title: "SIEM Log Correlation",
      state: "Learning",
      badgeClass: "state-indigo",
      description: "Learning how Security Information and Event Management systems collect, correlate, and analyze security events.",
      icon: "database"
    },
    {
      category: "NETWORKING",
      title: "Network Protocols & Telemetry",
      state: "Practicing",
      badgeClass: "state-cyan",
      description: "Studying TCP/IP stack behavior, DNS queries, HTTP traffic flows, and packet capture analysis with Wireshark.",
      icon: "network"
    },
    {
      category: "LINUX",
      title: "Linux System Administration",
      state: "Practicing",
      badgeClass: "state-cyan",
      description: "Daily CLI navigation, system log auditing (/var/log/auth.log), file permissions (chmod/chown), and bash scripting.",
      icon: "terminal"
    },
    {
      category: "WEB SECURITY",
      title: "Web Security Fundamentals",
      state: "Exploring",
      badgeClass: "state-amber",
      description: "Exploring web application security concepts, HTTP request/response structures, and proxy interception with Burp Suite.",
      icon: "globe"
    },
    {
      category: "SECURITY TOOLS",
      title: "Nmap, Wireshark & Burp Suite",
      state: "Practicing",
      badgeClass: "state-cyan",
      description: "Hands-on usage of network scanners and packet analyzers in controlled local lab environments.",
      icon: "wrench"
    },
    {
      category: "CLOUD",
      title: "AWS Cloud Fundamentals",
      state: "Exploring",
      badgeClass: "state-amber",
      description: "Learning foundational cloud concepts, IAM permission policies, and virtual network security groups.",
      icon: "cloud"
    },
    {
      category: "INFRASTRUCTURE",
      title: "Docker Containerization",
      state: "Familiar",
      badgeClass: "state-emerald",
      description: "Building isolated container environments for running security tooling and lab services safely.",
      icon: "box"
    }
  ];

  container.innerHTML = nodes.map(node => `
    <div class="network-node-card" style="background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: var(--space-5); transition: all var(--transition-normal); cursor: pointer;">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: var(--space-3);">
        <div style="display: flex; align-items: center; gap: var(--space-2); font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-cyan); font-weight: var(--fw-semibold);">
          <i data-lucide="${node.icon}" style="width: 16px; height: 16px;"></i>
          <span>${node.category}</span>
        </div>
        <span class="state-badge ${node.badgeClass}">${node.state}</span>
      </div>
      <h3 style="font-size: var(--fs-base); font-weight: var(--fw-bold); color: var(--text-primary); margin-bottom: 8px;">${node.title}</h3>
      <p style="font-size: var(--fs-xs); color: var(--text-secondary); margin: 0; line-height: 1.5;">${node.description}</p>
    </div>
  `).join('');

  if (window.lucide) {
    try { window.lucide.createIcons(); } catch (e) {}
  }
}

