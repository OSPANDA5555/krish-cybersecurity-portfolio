/**
 * Krish Kumar Dey - Interactive Technical Skill Constellation Engine
 * Features:
 * 1. 2D SVG Radar Constellation Network Visualizer
 * 2. Category Tab Filtering (ALL, PROGRAMMING, CYBERSECURITY, TOOLS, INFRASTRUCTURE)
 * 3. Reliable Mouse Hover & Click Interaction for EVERY Technology Node
 * 4. HUD Telemetry Skill Inspector Panel Updates (Title, Category, Honest State, Description, SOC Relevance)
 */

let selectedSkillNode = null;
let currentSkillCategory = 'ALL';

function initSkillsInteractive() {
  renderCategoryTabs();
  renderConstellationGraph();
  renderMobileSkillFallbackCards();
}

/* --------------------------------------------------------------------------
   Category Tabs Bar
   -------------------------------------------------------------------------- */
function renderCategoryTabs() {
  const container = document.getElementById('skill-category-tabs');
  if (!container) return;

  const categories = [
    { id: 'ALL', label: 'ALL DOMAINS' },
    { id: 'PROGRAMMING', label: 'PROGRAMMING' },
    { id: 'CYBERSECURITY', label: 'CYBERSECURITY' },
    { id: 'TOOLS', label: 'SECURITY TOOLS' },
    { id: 'INFRASTRUCTURE', label: 'INFRASTRUCTURE' }
  ];

  container.innerHTML = categories.map(cat => `
    <button class="skill-cat-btn ${cat.id === currentSkillCategory ? 'active' : ''}" data-category="${cat.id}">
      <span>${cat.label}</span>
    </button>
  `).join('');

  const btns = container.querySelectorAll('.skill-cat-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentSkillCategory = btn.getAttribute('data-category');
      renderConstellationGraph();
      renderMobileSkillFallbackCards();
    });
  });
}

/* --------------------------------------------------------------------------
   Flatten Skill Items with Category Mapping
   -------------------------------------------------------------------------- */
function getFlattenedSkills() {
  if (!PORTFOLIO_DATA || !PORTFOLIO_DATA.skillsCategorized) return [];
  const cat = PORTFOLIO_DATA.skillsCategorized;

  const all = [
    ...cat.programming.map(s => ({ ...s, category: 'PROGRAMMING' })),
    ...cat.cybersecurity.map(s => ({ ...s, category: 'CYBERSECURITY' })),
    ...cat.tools.map(s => ({ ...s, category: 'SECURITY TOOLS' })),
    ...cat.infrastructure.map(s => ({ ...s, category: 'INFRASTRUCTURE' }))
  ];

  if (currentSkillCategory === 'ALL') return all;
  if (currentSkillCategory === 'TOOLS') return all.filter(s => s.category === 'SECURITY TOOLS');
  return all.filter(s => s.category === currentSkillCategory);
}

/* --------------------------------------------------------------------------
   Render SVG Constellation Graph
   -------------------------------------------------------------------------- */
function renderConstellationGraph() {
  const svg = document.getElementById('constellation-svg');
  if (!svg) return;

  const skills = getFlattenedSkills();
  const width = 800;
  const height = 540;
  const cx = width / 2;
  const cy = height / 2;

  // Category Hub Centers
  const categoryHubs = {
    'PROGRAMMING': { x: cx - 220, y: cy - 130, label: 'PROGRAMMING', color: '#00E5FF' },
    'CYBERSECURITY': { x: cx + 220, y: cy - 130, label: 'CYBERSECURITY', color: '#6366F1' },
    'SECURITY TOOLS': { x: cx - 180, y: cy + 140, label: 'SECURITY TOOLS', color: '#10B981' },
    'INFRASTRUCTURE': { x: cx + 180, y: cy + 140, label: 'INFRASTRUCTURE', color: '#F59E0B' }
  };

  // Calculate Node Layout Positions
  const nodePositions = [];
  const categoryCounts = {};

  skills.forEach((skill, idx) => {
    const hub = categoryHubs[skill.category] || { x: cx, y: cy, color: '#00E5FF' };
    categoryCounts[skill.category] = (categoryCounts[skill.category] || 0) + 1;
    const count = categoryCounts[skill.category];

    const angle = (count * 1.3) + (idx * 0.4);
    const radius = 65 + (count * 20);

    const x = Math.max(50, Math.min(width - 50, hub.x + Math.cos(angle) * radius));
    const y = Math.max(40, Math.min(height - 40, hub.y + Math.sin(angle) * (radius * 0.8)));

    nodePositions.push({ skill, x, y, hub });
  });

  // Render SVG Elements: Concentric Background Radar Rings, Hub Lines, Inter-Node Lines & Skill Nodes
  let svgContent = `
    <!-- Background Radar Target Rings -->
    <circle cx="${cx}" cy="${cy}" r="220" fill="none" stroke="#121824" stroke-width="1" stroke-dasharray="4 4" />
    <circle cx="${cx}" cy="${cy}" r="140" fill="none" stroke="#121824" stroke-width="1" stroke-dasharray="2 2" />
    <line x1="${cx}" y1="30" x2="${cx}" y2="${height - 30}" stroke="#121824" stroke-width="1" />
    <line x1="40" y1="${cy}" x2="${width - 40}" y2="${cy}" stroke="#121824" stroke-width="1" />
  `;

  // Draw Category Hub Lines
  Object.keys(categoryHubs).forEach(catKey => {
    const h = categoryHubs[catKey];
    svgContent += `
      <line x1="${cx}" y1="${cy}" x2="${h.x}" y2="${h.y}" stroke="${h.color}" stroke-opacity="0.2" stroke-width="1.5" stroke-dasharray="6 4" />
      <circle cx="${h.x}" cy="${h.y}" r="28" fill="${h.color}" fill-opacity="0.06" stroke="${h.color}" stroke-opacity="0.3" stroke-width="1" />
      <text x="${h.x}" y="${h.y + 4}" fill="${h.color}" font-family="var(--font-mono)" font-size="10" font-weight="bold" text-anchor="middle">${h.label}</text>
    `;
  });

  // Draw Connection Lines between Nodes and Category Hubs
  nodePositions.forEach(np => {
    svgContent += `
      <line x1="${np.hub.x}" y1="${np.hub.y}" x2="${np.x}" y2="${np.y}" stroke="${np.hub.color}" stroke-opacity="0.25" stroke-width="1" />
    `;
  });

  // Draw Node Group Interactive Elements
  nodePositions.forEach((np, i) => {
    const isSelected = selectedSkillNode && selectedSkillNode.name === np.skill.name;
    const nodeColor = np.hub.color;

    svgContent += `
      <g class="skill-node-group ${isSelected ? 'selected' : ''}" data-index="${i}" style="cursor: pointer;">
        <circle cx="${np.x}" cy="${np.y}" r="18" fill="#0C1017" stroke="${nodeColor}" stroke-width="${isSelected ? 2.5 : 1.5}" class="node-outer-ring" />
        <circle cx="${np.x}" cy="${np.y}" r="6" fill="${nodeColor}" class="node-core-dot" />
        <text x="${np.x}" y="${np.y + 32}" fill="#F3F4F6" font-family="var(--font-primary)" font-size="11" font-weight="600" text-anchor="middle">${np.skill.name}</text>
      </g>
    `;
  });

  svg.innerHTML = svgContent;

  // Attach Event Listeners to every SVG skill node group
  const nodeGroups = svg.querySelectorAll('.skill-node-group');
  nodeGroups.forEach(g => {
    const idx = parseInt(g.getAttribute('data-index'), 10);
    const np = nodePositions[idx];
    if (!np) return;

    g.addEventListener('mouseenter', () => {
      updateSkillInspectorPanel(np.skill);
    });

    g.addEventListener('click', () => {
      selectedSkillNode = np.skill;
      updateSkillInspectorPanel(np.skill);
      nodeGroups.forEach(n => n.classList.remove('selected'));
      g.classList.add('selected');
    });
  });

  // Select initial node if none selected
  if (skills.length > 0 && !selectedSkillNode) {
    selectedSkillNode = skills[0];
    updateSkillInspectorPanel(selectedSkillNode);
  }
}

/* --------------------------------------------------------------------------
   Update HUD Skill Inspector Panel
   -------------------------------------------------------------------------- */
function updateSkillInspectorPanel(skill) {
  const catTag = document.getElementById('inspector-category');
  const stateTag = document.getElementById('inspector-state');
  const titleTag = document.getElementById('inspector-title');
  const descTag = document.getElementById('inspector-description');
  const relTag = document.getElementById('inspector-relevance');

  if (catTag) catTag.textContent = skill.category;
  if (stateTag) {
    stateTag.textContent = skill.state;
    stateTag.className = `state-badge ${skill.stateBadgeClass}`;
  }
  if (titleTag) titleTag.textContent = skill.name;
  if (descTag) descTag.textContent = skill.description;
  if (relTag) relTag.textContent = skill.relevance;
}

/* --------------------------------------------------------------------------
   Mobile Fallback Cards Grid
   -------------------------------------------------------------------------- */
function renderMobileSkillFallbackCards() {
  const container = document.getElementById('skills-fallback-grid');
  if (!container) return;

  const skills = getFlattenedSkills();

  container.innerHTML = skills.map(skill => `
    <div class="skill-fallback-card" onclick="updateSkillInspectorPanelFromMobile('${skill.name}')">
      <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px;">
        <h4 style="font-size: var(--fs-lg); font-weight: var(--fw-bold); color: var(--text-primary); margin: 0;">${skill.name}</h4>
        <span class="state-badge ${skill.stateBadgeClass}">● ${skill.state}</span>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--color-cyan); margin-bottom: 6px;">${skill.category}</div>
      <p style="font-size: var(--fs-xs); color: var(--text-secondary); margin-bottom: 0;">${skill.description}</p>
    </div>
  `).join('');
}

function updateSkillInspectorPanelFromMobile(skillName) {
  const allSkills = getFlattenedSkills();
  const found = allSkills.find(s => s.name === skillName);
  if (found) {
    updateSkillInspectorPanel(found);
    const inspectorCard = document.getElementById('skill-inspector-card');
    if (inspectorCard) {
      inspectorCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }
}
