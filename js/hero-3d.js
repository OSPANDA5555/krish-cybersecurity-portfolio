/**
 * Krish Kumar Dey - Interactive 3D WebGL Security Network Hero Centerpiece
 * Production Optimization:
 * 1. IntersectionObserver to pause render loop when off-screen (Saves GPU/CPU)
 * 2. Adaptive Particle Density & Capped DPR on Mobile
 * 3. Mouse Raycasting HUD Node Tooltips & Smooth Parallax
 */

let heroCanvas, heroRenderer, heroScene, heroCamera;
let coreMesh, innerNucleus, nodeGroup, dataPackets = [], connectionLines = [];
let mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
let raycaster, rayMouse, hoveredNode = null;
let animFrameId = null;
let isHeroVisible = true;

const NODE_DEFINITIONS = [
  { id: "node-core", name: "CENTRAL SEC CORE", role: "SIEM & Log Aggregation Engine", level: "CORE", color: 0x00E5FF },
  { id: "node-net", name: "NETWORK TELEMETRY", role: "Wireshark PCAP & TCP Analysis", level: "INGRESS", color: 0x10B981 },
  { id: "node-data", name: "DATA PROTECTION", role: "Encryption & Access ACLs", level: "STORAGE", color: 0x00E5FF },
  { id: "node-det", name: "DETECTION RULES", role: "Splunk & Elastic Correlation", level: "ANALYTICS", color: 0xF59E0B },
  { id: "node-ops", name: "SECURITY OPS", role: "Alert Triage & Incident Playbooks", level: "MONITOR", color: 0x10B981 },
  { id: "node-auth", name: "ENDPOINT LOGS", role: "Ubuntu Auth & Linux Auditd", level: "ENDPOINT", color: 0x6366F1 },
  { id: "node-fw", name: "FIREWALL & ROUTING", role: "pfSense Subnet Isolation", level: "EDGE", color: 0x00E5FF },
  { id: "node-cloud", name: "CLOUD INFRASTRUCTURE", role: "AWS Security Groups & EC2", level: "CLOUD", color: 0xF59E0B },
  { id: "node-intel", name: "THREAT INTEL", role: "IOC Extraction & Feeds", level: "INTEL", color: 0x10B981 }
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

  // 6. Raycaster & Event Listeners
  raycaster = new THREE.Raycaster();
  rayMouse = new THREE.Vector2(-999, -999);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);

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
  raycaster.setFromCamera(rayMouse, heroCamera);
  if (nodeGroup) {
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
   Node Highlighting & HUD Tooltips
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
  `;

  tooltip.classList.add('show');
}

function hideNodeTooltip() {
  const tooltip = document.getElementById('hero-node-tooltip');
  if (tooltip) tooltip.classList.remove('show');
}

/* --------------------------------------------------------------------------
   Window Event Handlers
   -------------------------------------------------------------------------- */
function onMouseMove(event) {
  mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
  mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;

  rayMouse.x = (event.clientX / window.innerWidth) * 2 - 1;
  rayMouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

  const tooltip = document.getElementById('hero-node-tooltip');
  if (tooltip && tooltip.classList.contains('show')) {
    tooltip.style.left = `${event.clientX + 16}px`;
    tooltip.style.top = `${event.clientY + 16}px`;
  }
}

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
