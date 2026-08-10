/**
 * Krish Kumar Dey - Interactive Technical Skills Constellation System
 * Non-linear 2D SVG Constellation Radar with Honest Proficiency States
 * Categories: PROGRAMMING | CYBERSECURITY | SECURITY TOOLS | INFRASTRUCTURE
 */

function initSkillsInteractive() {
  const container = document.getElementById('interactive-skills-container');
  if (!container || !PORTFOLIO_DATA || !PORTFOLIO_DATA.technicalSkills) return;

  renderCategoryTabs();
  renderConstellationGraph('ALL');
  
  // Select first skill by default in inspector
  if (PORTFOLIO_DATA.technicalSkills.length > 0) {
    updateSkillInspector(PORTFOLIO_DATA.technicalSkills[0]);
  }
}

/* --------------------------------------------------------------------------
   Category Filter Tabs
   -------------------------------------------------------------------------- */
function renderCategoryTabs() {
  const tabsContainer = document.getElementById('skill-category-tabs');
  if (!tabsContainer) return;

  const categories = [
    { key: 'ALL', label: 'ALL CATEGORIES' },
    { key: 'PROGRAMMING', label: 'PROGRAMMING' },
    { key: 'CYBERSECURITY', label: 'CYBERSECURITY' },
    { key: 'SECURITY TOOLS', label: 'SECURITY TOOLS' },
    { key: 'INFRASTRUCTURE', label: 'INFRASTRUCTURE' }
  ];

  tabsContainer.innerHTML = categories.map((cat, idx) => `
    <button class="skill-tab-btn ${idx === 0 ? 'active' : ''}" data-cat="${cat.key}">
      <span>${cat.label}</span>
    </button>
  `).join('');

  const tabBtns = tabsContainer.querySelectorAll('.skill-tab-btn');
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const catKey = btn.getAttribute('data-cat');
      renderConstellationGraph(catKey);
    });
  });
}

/* --------------------------------------------------------------------------
   SVG Constellation Graph & Node Layout
   -------------------------------------------------------------------------- */
function renderConstellationGraph(activeCategory) {
  const svgCanvas = document.getElementById('constellation-svg');
  const nodesGridContainer = document.getElementById('skills-fallback-grid');
  if (!svgCanvas) return;

  const allSkills = PORTFOLIO_DATA.technicalSkills;

  // Filter skills based on selected category tab
  const filteredSkills = activeCategory === 'ALL' 
    ? allSkills 
    : allSkills.filter(s => s.category === activeCategory);

  // SVG Dimensions & Center Coordinates
  const width = 800;
  const height = 540;
  const cx = width / 2;
  const cy = height / 2;

  // 4 Category Hub Positions
  const categoryHubs = {
    'PROGRAMMING': { x: 220, y: 150, color: '#6366F1' },
    'CYBERSECURITY': { x: 580, y: 150, color: '#10B981' },
    'SECURITY TOOLS': { x: 220, y: 390, color: '#00E5FF' },
    'INFRASTRUCTURE': { x: 580, y: 390, color: '#F59E0B' }
  };

  // Calculate satellite node positions relative to their category hub
  const skillsWithPos = allSkills.map(skill => {
    const hub = categoryHubs[skill.category];
    return { ...skill, hubX: hub.x, hubY: hub.y, hubColor: hub.color };
  });

  // Specific satellite offsets per skill to prevent overlaps
  const offsets = {
    'python': [-90, -40], 'java': [90, -40], 'cpp': [-90, 40], 'rust': [90, 40],
    'soc-ops-skill': [-100, -50], 'siem-skill': [0, -70], 'net-sec-skill': [100, -50],
    'vuln-assess': [-100, 50], 'web-sec': [0, 70], 'sec-mon': [100, 50],
    'burp': [-90, -40], 'nmap': [90, -40], 'wireshark': [-90, 40], 'linux-os': [90, 40],
    'docker': [-80, 0], 'aws': [80, 0]
  };

  let svgContent = `
    <!-- Background Grid Pattern & Central Core Node -->
    <defs>
      <radialGradient id="hubGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stop-color="#00E5FF" stop-opacity="0.4"/>
        <stop offset="100%" stop-color="#00E5FF" stop-opacity="0"/>
      </radialGradient>
      <filter id="glowEffect">
        <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>

    <!-- Center Hub to Category Hub Connecting Lines -->
    <circle cx="${cx}" cy="${cy}" r="38" fill="#0D111A" stroke="#00E5FF" stroke-width="2" filter="url(#glowEffect)"/>
    <text x="${cx}" y="${cy + 4}" text-anchor="middle" fill="#00E5FF" font-family="JetBrains Mono" font-size="11" font-weight="bold">CORE.NODE</text>
  `;

  // Draw Lines from Core to Category Hubs
  Object.entries(categoryHubs).forEach(([catName, hub]) => {
    const isCatActive = activeCategory === 'ALL' || activeCategory === catName;
    const opacity = isCatActive ? '0.4' : '0.1';
    
    svgContent += `
      <line x1="${cx}" y1="${cy}" x2="${hub.x}" y2="${hub.y}" stroke="${hub.color}" stroke-width="1.5" stroke-dasharray="4,4" opacity="${opacity}"/>
      
      <!-- Category Hub Circle -->
      <circle cx="${hub.x}" cy="${hub.y}" r="22" fill="#121824" stroke="${hub.color}" stroke-width="2" opacity="${isCatActive ? '1' : '0.3'}"/>
      <text x="${hub.x}" y="${hub.y + 4}" text-anchor="middle" fill="${hub.color}" font-family="JetBrains Mono" font-size="9" font-weight="bold" opacity="${isCatActive ? '1' : '0.3'}">${catName.substring(0, 4)}</text>
    `;
  });

  // Draw Lines & Satellite Nodes for each skill
  skillsWithPos.forEach(skill => {
    const offset = offsets[skill.id] || [0, 0];
    const nx = skill.hubX + offset[0];
    const ny = skill.hubY + offset[1];

    const isMatch = activeCategory === 'ALL' || activeCategory === skill.category;
    const opacity = isMatch ? '1' : '0.15';
    const stateColorHex = skill.stateColor === 'cyan' ? '#00E5FF' : (skill.stateColor === 'emerald' ? '#10B981' : (skill.stateColor === 'amber' ? '#F59E0B' : '#6366F1'));

    svgContent += `
      <g class="constellation-node-group ${isMatch ? 'node-active' : 'node-dimmed'}" data-skill-id="${skill.id}" transform="translate(0, 0)" style="opacity: ${opacity}; cursor: pointer;">
        <!-- Line connecting Category Hub to Skill Satellite -->
        <line x1="${skill.hubX}" y1="${skill.hubY}" x2="${nx}" y2="${ny}" stroke="${stateColorHex}" stroke-width="1.2" opacity="0.35"/>
        
        <!-- Outer Glowing Node Circle -->
        <circle class="node-circle-outer" cx="${nx}" cy="${ny}" r="14" fill="#0D111A" stroke="${stateColorHex}" stroke-width="1.5"/>
        <circle class="node-circle-inner" cx="${nx}" cy="${ny}" r="4" fill="${stateColorHex}"/>
        
        <!-- Skill Title Text -->
        <text class="node-label" x="${nx}" y="${ny + 26}" text-anchor="middle" fill="#F8FAFC" font-family="Inter" font-size="11" font-weight="500">${skill.name}</text>
      </g>
    `;
  });

  svgCanvas.innerHTML = svgContent;

  // Add Interactive Hover & Click Listeners to Node Groups
  const nodeGroups = svgCanvas.querySelectorAll('.constellation-node-group');
  nodeGroups.forEach(group => {
    const skillId = group.getAttribute('data-skill-id');
    const skillObj = allSkills.find(s => s.id === skillId);

    group.addEventListener('mouseenter', () => {
      if (skillObj) updateSkillInspector(skillObj);
      nodeGroups.forEach(g => g.classList.remove('highlighted'));
      group.classList.add('highlighted');
    });

    group.addEventListener('click', () => {
      if (skillObj) updateSkillInspector(skillObj);
    });
  });

  // Render Mobile Fallback Responsive Skill Cards
  if (nodesGridContainer) {
    nodesGridContainer.innerHTML = filteredSkills.map(skill => `
      <div class="skill-fallback-card ${activeCategory !== 'ALL' && activeCategory === skill.category ? 'active' : ''}" data-skill-id="${skill.id}">
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px;">
          <h4 style="font-size: var(--fs-base); font-weight: var(--fw-bold); color: var(--text-primary);">${skill.name}</h4>
          <span class="state-badge state-${skill.stateColor}">${skill.state}</span>
        </div>
        <div style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-cyan); margin-bottom: 6px;">${skill.category}</div>
        <p style="font-size: var(--fs-xs); color: var(--text-secondary); margin-bottom: 0;">${skill.description}</p>
      </div>
    `).join('');

    const fallbackCards = nodesGridContainer.querySelectorAll('.skill-fallback-card');
    fallbackCards.forEach(card => {
      card.addEventListener('mouseenter', () => {
        const skillId = card.getAttribute('data-skill-id');
        const skillObj = allSkills.find(s => s.id === skillId);
        if (skillObj) updateSkillInspector(skillObj);
      });
    });
  }
}

/* --------------------------------------------------------------------------
   Telemetry Skill Inspector Panel Updater
   -------------------------------------------------------------------------- */
function updateSkillInspector(skill) {
  const titleElem = document.getElementById('inspector-title');
  const catElem = document.getElementById('inspector-category');
  const stateElem = document.getElementById('inspector-state');
  const descElem = document.getElementById('inspector-description');
  const relevanceElem = document.getElementById('inspector-relevance');

  if (titleElem) titleElem.textContent = skill.name;
  if (catElem) catElem.textContent = skill.category;
  
  if (stateElem) {
    stateElem.textContent = skill.state;
    stateElem.className = `state-badge state-${skill.stateColor}`;
  }

  if (descElem) descElem.textContent = skill.description;
  if (relevanceElem) relevanceElem.textContent = skill.relevance;
}
