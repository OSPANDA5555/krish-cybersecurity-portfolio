/**
 * Krish Kumar Dey - Interactive SOC Telemetry Lab Dashboard Engine
 * 
 * IMPORTANT DISCLAIMER: All telemetry events, log lines, and packet flows rendered
 * in this dashboard are strictly SIMULATED DEMO DATA for portfolio visualization purposes.
 * Zero fake achievements or live production stats are presented.
 */

let socState = {
  currentView: 'stream', // 'stream' | 'topology' | 'stack'
  currentCategory: 'ALL',
  simulatedLogs: [],
  tickerTimer: null
};

function initSocDashboard() {
  const container = document.getElementById('soc-dashboard-container');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.simulatedEvents) return;

  // Initialize simulated log store with data from portfolio-data.js
  socState.simulatedLogs = [...PORTFOLIO_DATA.simulatedEvents];

  setupSocViewSwitchers();
  setupSocCategoryFilters();
  setupWhatYouAreSeeingModal();

  // Initial rendering based on active view
  renderActiveView();

  // Start background log ticker timer (pushes dynamic simulated telemetry every 4s)
  startLogTickerTimer();
}

/* --------------------------------------------------------------------------
   View Switchers & Category Filters
   -------------------------------------------------------------------------- */
function setupSocViewSwitchers() {
  const switcherBtns = document.querySelectorAll('.soc-view-btn');
  switcherBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      switcherBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      socState.currentView = btn.getAttribute('data-view');
      renderActiveView();
    });
  });
}

function setupSocCategoryFilters() {
  const filterBtns = document.querySelectorAll('.soc-filter-pill');
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      socState.currentCategory = btn.getAttribute('data-category');
      renderActiveView();
    });
  });
}

function renderActiveView() {
  const streamPane = document.getElementById('soc-pane-stream');
  const topologyPane = document.getElementById('soc-pane-topology');
  const stackPane = document.getElementById('soc-pane-stack');

  if (!streamPane || !topologyPane || !stackPane) return;

  streamPane.style.display = 'none';
  topologyPane.style.display = 'none';
  stackPane.style.display = 'none';

  if (socState.currentView === 'stream') {
    streamPane.style.display = 'block';
    renderLiveStream();
  } else if (socState.currentView === 'topology') {
    topologyPane.style.display = 'block';
    renderNetworkTopology();
  } else if (socState.currentView === 'stack') {
    stackPane.style.display = 'block';
    renderModuleStack();
  }
}

/* --------------------------------------------------------------------------
   View 1: Live Stream Log Ticker & Event Inspection Drawer
   -------------------------------------------------------------------------- */
function renderLiveStream() {
  const tickerContainer = document.getElementById('soc-log-ticker');
  if (!tickerContainer) return;

  const filteredLogs = socState.currentCategory === 'ALL'
    ? socState.simulatedLogs
    : socState.simulatedLogs.filter(log => log.category === socState.currentCategory);

  tickerContainer.innerHTML = filteredLogs.map(log => `
    <div class="soc-log-row" onclick="openLogDrawer('${log.id}')" title="Click to inspect simulated payload">
      <div class="log-time">${log.timestamp}</div>
      <div class="log-badge level-${log.level.toLowerCase()}">${log.level}</div>
      <div class="log-tool">${log.tool}</div>
      <div class="log-ips"><span>${log.sourceIp}</span> → <span>${log.destIp}</span></div>
      <div class="log-summary">${log.summary}</div>
      <div class="log-inspect-action">Inspect Payload ➔</div>
    </div>
  `).join('');
}

// Background timer pushing new simulated log events
function startLogTickerTimer() {
  if (socState.tickerTimer) clearInterval(socState.tickerTimer);

  socState.tickerTimer = setInterval(() => {
    if (!PORTFOLIO_DATA || !PORTFOLIO_DATA.simulatedEvents) return;

    // Pick a random template and generate a fresh simulated event
    const randomTemplate = PORTFOLIO_DATA.simulatedEvents[
      Math.floor(Math.random() * PORTFOLIO_DATA.simulatedEvents.length)
    ];

    const now = new Date();
    const timeStr = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}.${String(now.getMilliseconds()).padStart(3, '0')}`;

    const newSimulatedLog = {
      ...randomTemplate,
      id: `evt-${Date.now()}`,
      timestamp: timeStr
    };

    // Prepend to simulated log array (keep max 15)
    socState.simulatedLogs.unshift(newSimulatedLog);
    if (socState.simulatedLogs.length > 15) {
      socState.simulatedLogs.pop();
    }

    if (socState.currentView === 'stream') {
      renderLiveStream();
    }
  }, 4000);
}

// Open Payload Inspection Drawer Modal
function openLogDrawer(logId) {
  const log = socState.simulatedLogs.find(l => l.id === logId);
  if (!log) return;

  let drawer = document.getElementById('soc-log-drawer');
  if (!drawer) {
    drawer = document.createElement('div');
    drawer.id = 'soc-log-drawer';
    drawer.className = 'soc-log-drawer';
    document.body.appendChild(drawer);
  }

  drawer.innerHTML = `
    <div class="drawer-content">
      <div class="drawer-header">
        <div class="drawer-title-group">
          <span class="status-pill" style="margin-bottom: 4px; padding: 2px 8px;">SIMULATED TELEMETRY</span>
          <h3 style="font-size: var(--fs-xl); color: var(--text-primary);">${log.summary}</h3>
        </div>
        <button class="drawer-close" onclick="document.getElementById('soc-log-drawer').classList.remove('show')">✕</button>
      </div>

      <div class="drawer-meta-grid">
        <div class="meta-box"><span class="meta-label">TIMESTAMP</span><span class="meta-val">${log.timestamp}</span></div>
        <div class="meta-box"><span class="meta-label">TOOL SOURCE</span><span class="meta-val" style="color: var(--color-cyan);">${log.tool} (${log.category})</span></div>
        <div class="meta-box"><span class="meta-label">PROTOCOL</span><span class="meta-val">${log.protocol}</span></div>
        <div class="meta-box"><span class="meta-label">SEVERITY LEVEL</span><span class="meta-val level-${log.level.toLowerCase()}">${log.level}</span></div>
      </div>

      <div class="drawer-section">
        <div class="drawer-section-title">SOURCE & DESTINATION ADDRESSES</div>
        <div style="font-family: var(--font-mono); color: var(--color-emerald); background: #07090E; padding: 10px; border-radius: 6px; border: 1px solid var(--border-subtle);">
          SRC: ${log.sourceIp}  ===▶  DEST: ${log.destIp}
        </div>
      </div>

      <div class="drawer-section">
        <div class="drawer-section-title">RAW SIMULATED PAYLOAD / LOG SNIPPET</div>
        <pre class="drawer-code-block"><code>${log.payload}</code></pre>
      </div>

      <div class="drawer-section" style="border-top: 1px solid var(--border-subtle); padding-top: 12px; margin-top: 16px;">
        <div class="drawer-section-title" style="color: var(--color-cyan);">CONCEPTUAL SOC DIAGNOSTIC PURPOSE</div>
        <p style="font-size: var(--fs-sm); color: var(--text-secondary); margin-bottom: 0;">${log.concept}</p>
      </div>
    </div>
  `;

  setTimeout(() => {
    drawer.classList.add('show');
  }, 10);
}

/* --------------------------------------------------------------------------
   View 2: Simulated Network Topology Graph (SVG)
   -------------------------------------------------------------------------- */
function renderNetworkTopology() {
  const container = document.getElementById('soc-pane-topology');
  if (!container) return;

  container.innerHTML = `
    <div class="topology-wrapper">
      <div class="simulated-badge-banner">
        <span>● SIMULATED CONCEPTUAL NETWORK TOPOLOGY</span>
      </div>

      <svg viewBox="0 0 800 380" preserveAspectRatio="xMidYMid meet" class="topology-svg">
        <!-- Lines connecting nodes -->
        <line x1="120" y1="190" x2="280" y2="190" stroke="#00E5FF" stroke-width="2" stroke-dasharray="6,6"/>
        <line x1="280" y1="190" x2="480" y2="110" stroke="#00E5FF" stroke-width="1.5"/>
        <line x1="280" y1="190" x2="480" y2="270" stroke="#10B981" stroke-width="1.5"/>
        <line x1="480" y1="110" x2="680" y2="190" stroke="#6366F1" stroke-width="1.5"/>
        <line x1="480" y1="270" x2="680" y2="190" stroke="#6366F1" stroke-width="1.5"/>

        <!-- Nodes -->
        <!-- 1. Endpoint Client -->
        <g transform="translate(120, 190)" class="topo-node">
          <circle r="28" fill="#121824" stroke="#00E5FF" stroke-width="2"/>
          <text text-anchor="middle" y="4" fill="#00E5FF" font-family="JetBrains Mono" font-size="10" font-weight="bold">CLIENT.PC</text>
          <text text-anchor="middle" y="44" fill="#94A3B8" font-family="Inter" font-size="11">Ubuntu Workstation</text>
        </g>

        <!-- 2. Firewall / Nmap Recon -->
        <g transform="translate(280, 190)" class="topo-node">
          <circle r="28" fill="#121824" stroke="#00E5FF" stroke-width="2"/>
          <text text-anchor="middle" y="4" fill="#00E5FF" font-family="JetBrains Mono" font-size="10" font-weight="bold">FIREWALL</text>
          <text text-anchor="middle" y="44" fill="#94A3B8" font-family="Inter" font-size="11">pfSense / ACL</text>
        </g>

        <!-- 3. Web App / Burp Suite -->
        <g transform="translate(480, 110)" class="topo-node">
          <circle r="28" fill="#121824" stroke="#00E5FF" stroke-width="2"/>
          <text text-anchor="middle" y="4" fill="#00E5FF" font-family="JetBrains Mono" font-size="10" font-weight="bold">WEB.APP</text>
          <text text-anchor="middle" y="44" fill="#94A3B8" font-family="Inter" font-size="11">Burp Suite Proxy</text>
        </g>

        <!-- 4. Docker Container Node -->
        <g transform="translate(480, 270)" class="topo-node">
          <circle r="28" fill="#121824" stroke="#10B981" stroke-width="2"/>
          <text text-anchor="middle" y="4" fill="#10B981" font-family="JetBrains Mono" font-size="10" font-weight="bold">DOCKER</text>
          <text text-anchor="middle" y="44" fill="#94A3B8" font-family="Inter" font-size="11">Lab Container</text>
        </g>

        <!-- 5. SIEM Aggregator Node -->
        <g transform="translate(680, 190)" class="topo-node">
          <circle r="32" fill="#121824" stroke="#6366F1" stroke-width="2.5"/>
          <text text-anchor="middle" y="4" fill="#6366F1" font-family="JetBrains Mono" font-size="10" font-weight="bold">SIEM.CORE</text>
          <text text-anchor="middle" y="48" fill="#F8FAFC" font-family="Inter" font-size="11" font-weight="bold">Central Log Engine</text>
        </g>
      </svg>
    </div>
  `;
}

/* --------------------------------------------------------------------------
   View 3: Tool Stack & Operational Modules Grid
   -------------------------------------------------------------------------- */
function renderModuleStack() {
  const container = document.getElementById('soc-pane-stack');
  if (!container) return;

  const tools = PORTFOLIO_DATA.labToolset;
  const filtered = socState.currentCategory === 'ALL'
    ? tools
    : tools.filter(t => t.category.toUpperCase().includes(socState.currentCategory) || socState.currentCategory === 'SOC');

  container.innerHTML = `
    <div class="tools-grid">
      ${filtered.map(tool => `
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
      `).join('')}
    </div>
  `;
}

/* --------------------------------------------------------------------------
   "What You're Seeing" Explanatory Panel Modal
   -------------------------------------------------------------------------- */
function setupWhatYouAreSeeingModal() {
  const infoBtn = document.getElementById('soc-info-btn');
  if (!infoBtn) return;

  infoBtn.addEventListener('click', () => {
    let modal = document.getElementById('soc-info-modal');
    if (!modal) {
      modal = document.createElement('div');
      modal.id = 'soc-info-modal';
      modal.className = 'node-hud-modal';
      document.body.appendChild(modal);
    }

    modal.innerHTML = `
      <div class="hud-modal-content">
        <div class="hud-modal-header">
          <span class="hud-tag">● PORTFOLIO DISCLAIMER // SOC ENVIRONMENT</span>
          <button class="hud-close-btn" onclick="document.getElementById('soc-info-modal').classList.remove('show')">✕</button>
        </div>
        <h3 class="hud-title">What You're Seeing</h3>
        <div class="hud-concept">Conceptual SOC Telemetry & Lab Visualization</div>
        <p class="hud-detail" style="margin-bottom: 12px;">
          This interactive dashboard is a conceptual visualization of the Security Operations Center (SOC) environments, log telemetry pipelines, and diagnostic security tools (Wireshark, Nmap, Burp Suite, SIEM) I am actively learning to build, configure, and monitor.
        </p>
        <p class="hud-detail">
          <strong style="color: var(--color-cyan);">Important Note:</strong> All event logs, network packet captures, and traffic streams displayed in this view are strictly <strong>simulated demo data</strong> to showcase visual familiarity with SOC workflows. Zero artificial security achievements or fake live system stats are presented.
        </p>
      </div>
    `;

    setTimeout(() => {
      modal.classList.add('show');
    }, 10);
  });
}
