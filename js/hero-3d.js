/**
 * Krish Kumar Dey - Interactive 3D WebGL Security Network Hero Centerpiece
 * Reliable Interaction Audit:
 * 1. Raycaster coordinates calculated relative to heroCanvas.getBoundingClientRect()
 * 2. Pointer/Touch events attached directly to canvas and container
 * 3. Node Hover highlight + persistent Node Inspection Modal on click/tap
 * 4. IntersectionObserver rendering pause when offscreen
 */

let heroCanvas, heroRenderer, heroScene, heroCamera;
let coreMesh, innerNucleus, nodeGroup, dataPackets = [], connectionLines = [];
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
let raycaster, rayMouse, hoveredNode = null;
let animFrameId = null;
let isHeroVisible = true;

const NODE_DEFINITIONS = [
  { id: "node-core", name: "CENTRAL SEC CORE", role: "SIEM & Log Aggregation Engine", level: "CORE", color: 0x00E5FF, category: "SOC Operations", learningState: "Practicing" },
  { id: "node-net", name: "NETWORK TELEMETRY", role: "Wireshark PCAP & TCP Analysis", level: "INGRESS", color: 0x10B981, category: "Networking", learningState: "Practicing" },
  { id: "node-data", name: "DATA PROTECTION", role: "Encryption & Access ACLs", level: "STORAGE", color: 0x00E5FF, category: "Security Operations", learningState: "Practicing" },
  { id: "node-det", name: "DETECTION RULES", role: "Splunk & Elastic Correlation", level: "ANALYTICS", color: 0xF59E0B, category: "SIEM", learningState: "Learning" },
  { id: "node-ops", name: "SECURITY OPS", role: "Alert Triage & Incident Playbooks", level: "MONITOR", color: 0x10B981, category: "SOC Operations", learningState: "Learning" },
  { id: "node-auth", name: "ENDPOINT LOGS", role: "Ubuntu Auth & Linux Auditd", level: "ENDPOINT", color: 0x6366F1, category: "Systems", learningState: "Practicing" },
  { id: "node-fw", name: "FIREWALL & ROUTING", role: "pfSense Subnet Isolation", level: "EDGE", color: 0x00E5FF, category: "Networking", learningState: "Practicing" },
  { id: "node-cloud", name: "CLOUD INFRASTRUCTURE", role: "AWS Security Groups & EC2", level: "CLOUD", color: 0xF59E0B, category: "Infrastructure", learningState: "Learning" },
  { id: "node-intel", name: "THREAT INTEL", role: "IOC Extraction & Feeds", level: "INTEL", color: 0x10B981, category: "Security Automation", learningState: "Practicing" }
];

function initHero3D() {
  heroCanvas = document.getElementById('hero-3d-canvas');
  const container = document.getElementById('hero-3d-container');
  if (!heroCanvas || !container || typeof THREE === 'undefined') return;

  const isMobile = window.innerWidth < 768;

  // 1. Scene Setup
  heroScene = new THREE.Scene();
  heroScene.fog = new THREE.FogExp2(0x07090E, 0.035);

  // 2. Camera Setup
  heroCamera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  heroCamera.position.set(0, 0, 18);

  // 3. Renderer Setup with Capped DPR
  heroRenderer = new THREE.WebGLRenderer({
    canvas: heroCanvas,
    alpha: true,
    antialias: !isMobile,
    powerPreference: "high-performance"
  });
  
  const dprCap = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);
  heroRenderer.setPixelRatio(dprCap);
  heroRenderer.setSize(container.clientWidth, container.clientHeight);

  // 4. Lighting Setup
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  heroScene.add(ambientLight);

  const cyanPointLight = new THREE.PointLight(0x00E5FF, 2.5, 30);
  cyanPointLight.position.set(0, 0, 5);
  heroScene.add(cyanPointLight);

  const emeraldPointLight = new THREE.PointLight(0x10B981, 1.8, 25);
  emeraldPointLight.position.set(8, -6, -5);
  heroScene.add(emeraldPointLight);

  // 5. Build Abstract Security Network Topology
  buildSecurityNetworkTopology(isMobile);

  // 6. Raycaster Setup & Precise Event Binding
  raycaster = new THREE.Raycaster();
  rayMouse = new THREE.Vector2(-999, -999);

  // Bind pointer and touch events directly to canvas & window
  window.addEventListener('resize', onWindowResize, false);
  
  heroCanvas.addEventListener('pointermove', onCanvasPointerMove, { passive: true });
  heroCanvas.addEventListener('pointerdown', onCanvasPointerDown, false);
  heroCanvas.addEventListener('click', onCanvasClick, false);
  
  // Touch Handlers for Mobile Devices
  heroCanvas.addEventListener('touchstart', onCanvasTouchStart, { passive: true });
  heroCanvas.addEventListener('touchend', onCanvasTouchEnd, false);

  // 7. Performance Visibility Observer (Pause render loop when hero is off-screen)
  setupHeroVisibilityObserver(container);

  // 8. Start Animation Loop
  animateHero();
}

/* --------------------------------------------------------------------------
   Build Abstract Security Network Topology
   -------------------------------------------------------------------------- */
function buildSecurityNetworkTopology(isMobile) {
  nodeGroup = new THREE.Group();
  heroScene.add(nodeGroup);

  // Central Glowing Security Core
  const coreGeo = new THREE.DodecahedronGeometry(1.8, 1);
  const coreMat = new THREE.MeshPhongMaterial({
    color: 0x00E5FF,
    wireframe: true,
    transparent: true,
    opacity: 0.7,
    emissive: 0x003344
  });
  coreMesh = new THREE.Mesh(coreGeo, coreMat);
  coreMesh.userData = NODE_DEFINITIONS[0];
  nodeGroup.add(coreMesh);

  // Inner Core Nucleus
  const nucGeo = new THREE.IcosahedronGeometry(0.9, 2);
  const nucMat = new THREE.MeshBasicMaterial({
    color: 0x10B981,
    wireframe: false,
    transparent: true,
    opacity: 0.8
  });
  innerNucleus = new THREE.Mesh(nucGeo, nucMat);
  coreMesh.add(innerNucleus);

  // Satellite Nodes Setup
  const satelliteRadius = isMobile ? 5.5 : 7.2;
  const numSatellites = NODE_DEFINITIONS.length - 1;

  for (let i = 0; i < numSatellites; i++) {
    const def = NODE_DEFINITIONS[i + 1];
    const angle = (i / numSatellites) * Math.PI * 2;
    const elevation = (Math.sin(i * 1.5) * 2.2);

    const x = Math.cos(angle) * satelliteRadius;
    const y = elevation;
    const z = Math.sin(angle) * satelliteRadius;

    // Node Mesh
    const satGeo = new THREE.OctahedronGeometry(0.55, 0);
    const satMat = new THREE.MeshPhongMaterial({
      color: def.color,
      wireframe: true,
      transparent: true,
      opacity: 0.85,
      emissive: 0x07090E
    });
    const satMesh = new THREE.Mesh(satGeo, satMat);
    satMesh.position.set(x, y, z);
    satMesh.userData = def;
    nodeGroup.add(satMesh);

    // Connection Line to Core
    const lineMat = new THREE.LineBasicMaterial({
      color: 0x00E5FF,
      transparent: true,
      opacity: 0.25
    });
    const lineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(x, y, z)
    ]);
    const line = new THREE.Line(lineGeo, lineMat);
    heroScene.add(line);
    connectionLines.push({ line, targetPos: satMesh.position });

    // Animated Data Packets
    const packetGeo = new THREE.SphereGeometry(0.08, 8, 8);
    const packetMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
    const packet = new THREE.Mesh(packetGeo, packetMat);
    packet.userData = {
      progress: Math.random(),
      speed: 0.004 + Math.random() * 0.006,
      targetPos: new THREE.Vector3(x, y, z)
    };
    heroScene.add(packet);
    dataPackets.push(packet);
  }

  // Background Ambient Dust Particles
  const particleCount = isMobile ? 60 : 120;
  const particleGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount * 3; i += 3) {
    positions[i] = (Math.random() - 0.5) * 35;
    positions[i + 1] = (Math.random() - 0.5) * 35;
    positions[i + 2] = (Math.random() - 0.5) * 35;
  }

  particleGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particleMat = new THREE.PointsMaterial({
    size: 0.12,
    color: 0x00E5FF,
    transparent: true,
    opacity: 0.4
  });
  const particleSystem = new THREE.Points(particleGeo, particleMat);
  heroScene.add(particleSystem);
}

/* --------------------------------------------------------------------------
   Visibility Observer (Pause 3D Rendering when off-screen)
   -------------------------------------------------------------------------- */
function setupHeroVisibilityObserver(container) {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
      if (isHeroVisible && !animFrameId) {
        animateHero();
      }
    });
  }, { threshold: 0.05 });

  observer.observe(container);
}

/* --------------------------------------------------------------------------
   Animation Loop
   -------------------------------------------------------------------------- */
function animateHero() {
  if (!isHeroVisible) {
    animFrameId = null;
    return;
  }

  animFrameId = requestAnimationFrame(animateHero);

  // Slow Ambient Rotations
  if (coreMesh) coreMesh.rotation.y += 0.005;
  if (innerNucleus) innerNucleus.rotation.x -= 0.008;
  if (nodeGroup) nodeGroup.rotation.y += 0.0015;

  // Smooth Parallax Camera Motion
  mouse.x += (mouse.targetX - mouse.x) * 0.04;
  mouse.y += (mouse.targetY - mouse.y) * 0.04;

  heroCamera.position.x = mouse.x * 2.5;
  heroCamera.position.y = mouse.y * 2.5;
  heroCamera.lookAt(heroScene.position);

  // Animate Data Packet Streams along connection lines
  dataPackets.forEach(p => {
    p.userData.progress += p.userData.speed;
    if (p.userData.progress >= 1) p.userData.progress = 0;
    p.position.lerpVectors(new THREE.Vector3(0, 0, 0), p.userData.targetPos, p.userData.progress);
  });

  // Raycasting for Interactive Node Hovering
  if (raycaster && heroCamera && nodeGroup) {
    raycaster.setFromCamera(rayMouse, heroCamera);
    const intersects = raycaster.intersectObjects(nodeGroup.children);

    if (intersects.length > 0) {
      const firstHit = intersects[0].object;
      if (hoveredNode !== firstHit) {
        if (hoveredNode) resetNodeStyle(hoveredNode);
        hoveredNode = firstHit;
        highlightNode(hoveredNode);
      }
    } else {
      if (hoveredNode) {
        resetNodeStyle(hoveredNode);
        hoveredNode = null;
      }
    }
  }

  heroRenderer.render(heroScene, heroCamera);
}

/* --------------------------------------------------------------------------
   Raycaster Coordinate Calculation (Accounts for Bounding Box & Page Scroll)
   -------------------------------------------------------------------------- */
function updateRayMouseFromEvent(event) {
  if (!heroCanvas) return;
  const rect = heroCanvas.getBoundingClientRect();
  if (rect.width === 0 || rect.height === 0) return;

  const clientX = event.clientX !== undefined ? event.clientX : (event.touches && event.touches[0] ? event.touches[0].clientX : 0);
  const clientY = event.clientY !== undefined ? event.clientY : (event.touches && event.touches[0] ? event.touches[0].clientY : 0);

  rayMouse.x = ((clientX - rect.left) / rect.width) * 2 - 1;
  rayMouse.y = -((clientY - rect.top) / rect.height) * 2 + 1;

  mouse.targetX = rayMouse.x;
  mouse.targetY = rayMouse.y;
}

function onCanvasPointerMove(event) {
  updateRayMouseFromEvent(event);
  
  const tooltip = document.getElementById('hero-node-tooltip');
  if (tooltip && tooltip.classList.contains('show')) {
    tooltip.style.left = `${event.clientX + 16}px`;
    tooltip.style.top = `${event.clientY + 16}px`;
  }
}

function onCanvasPointerDown(event) {
  updateRayMouseFromEvent(event);
  checkAndTriggerNodeClick();
}

function onCanvasClick(event) {
  updateRayMouseFromEvent(event);
  checkAndTriggerNodeClick();
}

function onCanvasTouchStart(event) {
  if (event.touches && event.touches.length > 0) {
    updateRayMouseFromEvent(event.touches[0]);
  }
}

function onCanvasTouchEnd(event) {
  checkAndTriggerNodeClick();
}

function checkAndTriggerNodeClick() {
  if (!raycaster || !heroCamera || !nodeGroup) return;

  raycaster.setFromCamera(rayMouse, heroCamera);
  const intersects = raycaster.intersectObjects(nodeGroup.children);

  if (intersects.length > 0) {
    const clickedObj = intersects[0].object;
    if (clickedObj && clickedObj.userData && clickedObj.userData.name) {
      open3DNodeModal(clickedObj.userData);
    }
  }
}

/* --------------------------------------------------------------------------
   Node Highlighting & Hover Tooltips
   -------------------------------------------------------------------------- */
function highlightNode(node) {
  if (node.material && node.material.emissive) {
    node.material.emissive.setHex(0x00E5FF);
  }
  document.body.style.cursor = 'pointer';
  showNodeTooltip(node.userData);
}

function resetNodeStyle(node) {
  if (node.material && node.material.emissive) {
    node.material.emissive.setHex(0x07090E);
  }
  document.body.style.cursor = 'default';
  hideNodeTooltip();
}

function showNodeTooltip(data) {
  let tooltip = document.getElementById('hero-node-tooltip');
  if (!tooltip) {
    tooltip = document.createElement('div');
    tooltip.id = 'hero-node-tooltip';
    tooltip.className = 'node-hud-tooltip';
    document.body.appendChild(tooltip);
  }

  tooltip.innerHTML = `
    <div class="tooltip-header">
      <span class="tooltip-level">[${data.level}]</span>
      <span class="tooltip-title">${data.name}</span>
    </div>
    <div class="tooltip-role">${data.role}</div>
    <div style="font-family: var(--font-mono); font-size: 0.65rem; color: var(--color-cyan); margin-top: 4px;">Click node to inspect details</div>
  `;

  tooltip.classList.add('show');
}

function hideNodeTooltip() {
  const tooltip = document.getElementById('hero-node-tooltip');
  if (tooltip) tooltip.classList.remove('show');
}

/* --------------------------------------------------------------------------
   Persistent 3D Node Telemetry Inspector Modal
   -------------------------------------------------------------------------- */
function open3DNodeModal(data) {
  let modal = document.getElementById('3d-node-inspector-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = '3d-node-inspector-modal';
    modal.className = 'node-hud-modal';
    document.body.appendChild(modal);
  }

  modal.innerHTML = `
    <div class="hud-modal-content">
      <div class="hud-modal-header">
        <div style="display: flex; align-items: center; gap: 10px;">
          <span class="hud-tag">3D TELEMETRY // [${data.level}]</span>
          <span class="status-badge state-cyan">● ${data.learningState || 'Active Node'}</span>
        </div>
        <button class="hud-close-btn" onclick="document.getElementById('3d-node-inspector-modal').classList.remove('show')">✕</button>
      </div>

      <h2 class="hud-title">${data.name}</h2>
      <div style="font-family: var(--font-mono); font-size: var(--fs-xs); color: var(--color-cyan); margin-bottom: 16px;">CATEGORY: ${data.category || 'Cybersecurity Domain'}</div>

      <div class="drawer-section">
        <div class="drawer-section-title" style="color: var(--color-emerald);">FUNCTIONAL ROLE & DESCRIPTION</div>
        <p style="font-size: var(--fs-base); color: var(--text-secondary); line-height: 1.6; margin-bottom: 0;">${data.role}</p>
      </div>

      <div class="drawer-section" style="margin-top: 16px; background: var(--bg-elevated); padding: 14px; border-radius: 8px; border: 1px solid var(--border-subtle);">
        <div class="drawer-section-title" style="color: var(--color-cyan);">SOC ANALYST RELEVANCE</div>
        <p style="font-size: var(--fs-sm); color: var(--text-primary); margin-bottom: 0; font-weight: var(--fw-medium);">
          Active telemetry node representing real-time security monitoring, log aggregation pipelines, and diagnostic analysis.
        </p>
      </div>

      <div style="margin-top: 24px; padding-top: 14px; border-top: 1px solid var(--border-subtle); text-align: right;">
        <button class="btn btn-secondary" onclick="document.getElementById('3d-node-inspector-modal').classList.remove('show')">
          <span>Close Inspector</span>
        </button>
      </div>
    </div>
  `;

  setTimeout(() => {
    modal.classList.add('show');
  }, 10);
}

/* --------------------------------------------------------------------------
   Window Event Handlers
   -------------------------------------------------------------------------- */
function onWindowResize() {
  const container = document.getElementById('hero-3d-container');
  if (!container || !heroRenderer || !heroCamera) return;

  const isMobile = window.innerWidth < 768;
  const dprCap = isMobile ? Math.min(window.devicePixelRatio, 1.5) : Math.min(window.devicePixelRatio, 2);

  heroCamera.aspect = container.clientWidth / container.clientHeight;
  heroCamera.updateProjectionMatrix();

  heroRenderer.setPixelRatio(dprCap);
  heroRenderer.setSize(container.clientWidth, container.clientHeight);
}
