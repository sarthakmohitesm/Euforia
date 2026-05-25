"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────── PROCEDURAL ANCIENT STONE & BARK TEXTURES ─────────── */

function createProceduralTexture(type: "stone" | "bark"): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext("2d");
  
  if (ctx) {
    const imgData = ctx.createImageData(256, 256);
    const data = imgData.data;

    for (let y = 0; y < 256; y++) {
      for (let x = 0; x < 256; x++) {
        let val = 0;
        if (type === "stone") {
          // Weathered, fractured ancient stone texture
          const cracks = Math.sin(x * 0.05 + y * 0.05) * 20;
          const noise = Math.random() * 60;
          val = Math.floor(110 + cracks + noise);
        } else {
          // Deep rustic organic bark rings
          const grain = Math.sin(x * 0.12) * 25;
          const noise = Math.random() * 45;
          val = Math.floor(95 + grain + noise);
        }
        val = Math.max(0, Math.min(255, val));
        const idx = (y * 256 + x) * 4;
        data[idx] = val;         // R
        data[idx + 1] = val;     // G
        data[idx + 2] = val;     // B
        data[idx + 3] = 255;     // A
      }
    }
    ctx.putImageData(imgData, 0, 0);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 2);
  return texture;
}

/* ─────────── PROCEDURAL RUINS & JUNGLE GEOMETRIES ─────────── */

// Weathered, moss-covered ancient stone pillar
function createAncientPillar(stoneTex: THREE.Texture): THREE.Group {
  const group = new THREE.Group();

  // Pillar Column - highly segmented for realistic fracture distortion
  const columnGeo = new THREE.CylinderGeometry(0.24, 0.28, 3.6, 32, 32);
  const pos = columnGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Weathered distortion (ruined bumps & cracks)
    const noise = (Math.sin(y * 4) + Math.cos(x * 10) + Math.sin(z * 10)) * 0.025;
    // Tapered base and neck cuts
    const cut = Math.sin(y * 12) > 0.85 ? -0.04 : 0;
    
    pos.setX(i, x + x * (noise + cut));
    pos.setZ(i, z + z * (noise + cut));
  }
  columnGeo.computeVertexNormals();

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x6e7874,
    roughness: 0.92,
    bumpMap: stoneTex,
    bumpScale: 0.12,
  });
  const column = new THREE.Mesh(columnGeo, stoneMat);
  column.position.y = 1.8;
  group.add(column);

  // Pillar Capital (stone header block)
  const capGeo = new THREE.BoxGeometry(0.7, 0.22, 0.7, 8, 4, 8);
  const cap = new THREE.Mesh(capGeo, stoneMat);
  cap.position.y = 3.6 + 0.11;
  group.add(cap);

  // Pillar Base (stone footer block)
  const baseGeo = new THREE.BoxGeometry(0.78, 0.35, 0.78, 8, 4, 8);
  const base = new THREE.Mesh(baseGeo, stoneMat);
  base.position.y = 0.175;
  group.add(base);

  return group;
}

// Epic ruined Temple Gateway Arch
function createTempleArch(stoneTex: THREE.Texture): THREE.Group {
  const arch = new THREE.Group();

  const stoneMat = new THREE.MeshStandardMaterial({
    color: 0x5a6360,
    roughness: 0.94,
    bumpMap: stoneTex,
    bumpScale: 0.14,
  });

  // Left Post
  const pL = createAncientPillar(stoneTex);
  pL.position.set(-1.8, 0, 0);
  arch.add(pL);

  // Right Post
  const pR = createAncientPillar(stoneTex);
  pR.position.set(1.8, 0, 0);
  arch.add(pR);

  // Massive horizontal lintel (top arch stone)
  const lintelGeo = new THREE.BoxGeometry(4.4, 0.45, 0.8, 32, 8, 8);
  const lPos = lintelGeo.attributes.position;
  for (let i = 0; i < lPos.count; i++) {
    const lx = lPos.getX(i);
    const ly = lPos.getY(i);
    const lz = lPos.getZ(i);
    const deform = (Math.sin(lx * 4) + Math.cos(ly * 10)) * 0.03;
    lPos.setY(i, ly + deform);
  }
  lintelGeo.computeVertexNormals();

  const lintel = new THREE.Mesh(lintelGeo, stoneMat);
  lintel.position.set(0, 3.8 + 0.225, 0);
  arch.add(lintel);

  // Hanging Ivy vines growing on arch
  const ivyGroup = new THREE.Group();
  const ivyConfigs = [
    { len: 1.5, x: -1.6, z: 0.2 },
    { len: 2.2, x: -1.2, z: -0.2 },
    { len: 1.8, x: 1.2, z: 0.2 },
    { len: 1.2, x: 1.5, z: -0.2 },
  ];
  const ivyMat = new THREE.MeshStandardMaterial({
    color: 0x1b5e20,
    roughness: 0.95,
  });

  for (const iv of ivyConfigs) {
    const vineGeo = new THREE.CylinderGeometry(0.015, 0.015, iv.len, 6);
    // Deform vine path
    const vPos = vineGeo.attributes.position;
    for (let i = 0; i < vPos.count; i++) {
      const vy = vPos.getY(i);
      vPos.setX(i, vPos.getX(i) + Math.sin(vy * 6) * 0.05);
    }
    vineGeo.computeVertexNormals();
    const vine = new THREE.Mesh(vineGeo, ivyMat);
    vine.position.set(iv.x, 3.8 - iv.len / 2, iv.z);
    ivyGroup.add(vine);
  }
  arch.add(ivyGroup);

  return arch;
}

// Procedural detailed roots and mossy jungle tree
function createRuinsTree(barkTex: THREE.Texture): THREE.Group {
  const tree = new THREE.Group();

  // Root-deformed trunk
  const trunkGeo = new THREE.CylinderGeometry(0.08, 0.25, 2.4, 16, 12);
  const pos = trunkGeo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);

    // Deep roots flare at base (y close to 0)
    const baseFlare = y < 0 ? (1.0 - y) * 0.35 : 0;
    const twist = Math.sin(y * 1.5) * 0.15;
    const deform = (Math.sin(x * 15) + Math.cos(z * 15)) * 0.02;

    pos.setX(i, x + x * baseFlare + twist + deform);
    pos.setZ(i, z + z * baseFlare + twist + deform);
  }
  trunkGeo.computeVertexNormals();

  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723, // Deep cocoa wood
    roughness: 0.95,
    bumpMap: barkTex,
    bumpScale: 0.1,
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 1.2;
  tree.add(trunk);

  // Large leafy crown clumps (Lush jungle foliage)
  const leafGroup = new THREE.Group();
  const leafClusters = [
    { r: 0.75, x: 0, y: 2.5, z: 0 },
    { r: 0.62, x: 0.5, y: 2.8, z: 0.3 },
    { r: 0.58, x: -0.5, y: 2.7, z: -0.3 },
    { r: 0.5, x: 0.3, y: 3.2, z: -0.4 },
    { r: 0.52, x: -0.3, y: 3.1, z: 0.4 },
  ];

  const leafMat = new THREE.MeshStandardMaterial({
    color: 0x1b5e20, // Vibrant jungle deep moss green
    roughness: 0.9,
    bumpMap: barkTex,
    bumpScale: 0.04,
  });

  for (const c of leafClusters) {
    const leafGeo = new THREE.IcosahedronGeometry(c.r, 3);
    const lPos = leafGeo.attributes.position;
    for (let i = 0; i < lPos.count; i++) {
      const lx = lPos.getX(i);
      const ly = lPos.getY(i);
      const lz = lPos.getZ(i);
      // Detailed leaves fractal noise shape
      const disp = (Math.sin(lx * 9) + Math.cos(ly * 9) + Math.sin(lz * 9)) * 0.05;
      lPos.setX(i, lx + disp * lx);
      lPos.setY(i, ly + disp * ly);
      lPos.setZ(i, lz + disp * lz);
    }
    leafGeo.computeVertexNormals();
    const clump = new THREE.Mesh(leafGeo, leafMat);
    clump.position.set(c.x, c.y, c.z);
    leafGroup.add(clump);
  }
  tree.add(leafGroup);

  return tree;
}

// Ancient Quartz Obelisk Crystal
function createCrystalCluster(): THREE.Group {
  const cluster = new THREE.Group();
  const crystalConfigs = [
    { h: 0.72, r: 0.09, rx: 0.08, ry: 0, rz: 0.1, x: 0, z: 0, color: 0xec4899 }, // Magenta/Blossom
    { h: 0.52, r: 0.075, rx: 0.28, ry: 1.2, rz: -0.25, x: -0.08, z: 0.05, color: 0xff7b00 }, // Saffron
    { h: 0.45, r: 0.065, rx: -0.2, ry: -0.8, rz: 0.2, x: 0.08, z: -0.06, color: 0x00f3ff }, // Bioluminescent Cyan
  ];

  for (const c of crystalConfigs) {
    const crystalMesh = new THREE.Group();

    const crystalMat = new THREE.MeshPhysicalMaterial({
      color: c.color,
      emissive: c.color,
      emissiveIntensity: 0.75,
      transmission: 0.82,
      opacity: 0.9,
      transparent: true,
      roughness: 0.08,
      metalness: 0.2,
      ior: 1.6,
      thickness: 0.4,
      clearcoat: 1.0,
    });

    const bodyGeo = new THREE.CylinderGeometry(c.r, c.r, c.h, 6);
    const body = new THREE.Mesh(bodyGeo, crystalMat);

    const tipGeo = new THREE.ConeGeometry(c.r, c.r * 1.6, 6);
    const tip = new THREE.Mesh(tipGeo, crystalMat);
    tip.position.y = c.h / 2 + (c.r * 1.6) / 2;

    crystalMesh.add(body);
    crystalMesh.add(tip);

    crystalMesh.rotation.set(c.rx, c.ry, c.rz);
    crystalMesh.position.set(c.x, c.h / 2, c.z);
    cluster.add(crystalMesh);
  }

  return cluster;
}

// Exotic Bioluminescent Jungle Mushroom
function createRuinsMushroom(): THREE.Group {
  const mushroom = new THREE.Group();

  const stemGeo = new THREE.CylinderGeometry(0.025, 0.045, 0.32, 10, 4);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xfffcf0,
    roughness: 0.7,
  });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = 0.16;
  mushroom.add(stem);

  // Deep Violet/Magenta cap
  const capGeo = new THREE.SphereGeometry(0.14, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2);
  const capMat = new THREE.MeshPhysicalMaterial({
    color: 0xd81b60, // Rose/Magenta
    emissive: 0xd81b60,
    emissiveIntensity: 0.95,
    transmission: 0.8,
    roughness: 0.2,
    ior: 1.5,
    thickness: 0.25,
  });
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.y = 0.3;
  mushroom.add(cap);

  // Under-cap glowing ring
  const glowGeo = new THREE.CircleGeometry(0.12, 12);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xd81b60,
    transparent: true,
    opacity: 0.65,
    side: THREE.DoubleSide,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.28;
  mushroom.add(glow);

  return mushroom;
}

// Organic boulder rock
function createRealisticRock(mossTex: THREE.Texture): THREE.Group {
  const rock = new THREE.Group();
  const geo = new THREE.IcosahedronGeometry(0.55, 3);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const y = pos.getY(i);
    const z = pos.getZ(i);
    // Sharp layered noise displacement to make rock look jagged, crystalline, and natural
    const d1 = (Math.sin(x * 6) * Math.cos(y * 6) + Math.sin(z * 6)) * 0.08;
    const d2 = (Math.sin(x * 15) * Math.cos(y * 12) + Math.sin(z * 15)) * 0.02; // Fine detail
    const d = d1 + d2;
    pos.setX(i, x + d * x);
    pos.setY(i, y + d * y);
    pos.setZ(i, z + d * z);
  }
  geo.computeVertexNormals();

  const mat = new THREE.MeshStandardMaterial({
    color: 0x4b514e,
    roughness: 0.9,
    bumpMap: mossTex,
    bumpScale: 0.12,
  });
  const mesh = new THREE.Mesh(geo, mat);
  rock.add(mesh);
  return rock;
}

/* ─────────── BIOLUMINESCENT BUTTERFLIES PARTICLE SYSTEM ─────────── */
function createButterflies(count: number): THREE.Points {
  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);

  // Butterfly electric blue/magenta palette
  const bColors = [
    new THREE.Color(0x00f3ff), // Cyan
    new THREE.Color(0xd81b60), // Magenta
    new THREE.Color(0x9c27b0), // Violet
    new THREE.Color(0xffeb3b), // Sun gold
  ];

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 18;
    positions[i * 3 + 1] = Math.random() * 7;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 18;
    
    sizes[i] = Math.random() * 4 + 2;

    const col = bColors[Math.floor(Math.random() * bColors.length)];
    colors[i * 3] = col.r;
    colors[i * 3 + 1] = col.g;
    colors[i * 3 + 2] = col.b;
  }

  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
  geo.setAttribute("color", new THREE.BufferAttribute(colors, 3));

  const mat = new THREE.PointsMaterial({
    size: 0.08,
    vertexColors: true,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geo, mat);
}

// Volumetric Sun Shaft light beams
function createVolumetricSunbeams(): THREE.Group {
  const group = new THREE.Group();
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0xfffbe6,
    transparent: true,
    opacity: 0.055,
    blending: THREE.AdditiveBlending,
    side: THREE.DoubleSide,
    depthWrite: false,
  });

  const beamGeo1 = new THREE.CylinderGeometry(0.18, 1.3, 10, 16, 1, true);
  const beam1 = new THREE.Mesh(beamGeo1, beamMat);
  beam1.position.set(4, 5, -2);
  beam1.rotation.set(0.35, 0, -0.38);
  group.add(beam1);

  const beamGeo2 = new THREE.CylinderGeometry(0.12, 0.9, 8, 16, 1, true);
  const beam2 = new THREE.Mesh(beamGeo2, beamMat);
  beam2.position.set(-2, 4, 1.5);
  beam2.rotation.set(0.3, 0, -0.32);
  group.add(beam2);

  return group;
}

/* ═══════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════ */

interface InteractiveObject {
  mesh: THREE.Object3D;
  basePos: THREE.Vector3;
  floatSpeed: number;
  floatAmplitude: number;
  rotSpeed: THREE.Vector3;
  interactRadius: number;
}

export default function ForestScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const container = mountRef.current;
    let width = container.clientWidth;
    let height = container.clientHeight;

    /* ── WebGL Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1; // Deep golden-rich atmospheric lighting
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    /* ── Scene & Deep Fog ── */
    const scene = new THREE.Scene();
    // Warm sunlit jungle mist fog
    scene.fog = new THREE.FogExp2(0xf5faf7, 0.065);
    scene.background = new THREE.Color(0xf5faf7);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 8);
    camera.lookAt(0, 1.5, 0);

    /* ── Procedural textures ── */
    const stoneTexture = createProceduralTexture("stone");
    const barkTexture = createProceduralTexture("bark");

    /* ── Cinematic Lights ── */
    const ambientLight = new THREE.AmbientLight(0xdcfce7, 1.05); // Rich green bounce
    scene.add(ambientLight);

    // Warm sunbeam highlights (Saffron / Sunchamber)
    const sunLight = new THREE.DirectionalLight(0xff9800, 2.5);
    sunLight.position.set(8, 14, 3);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 2048;
    sunLight.shadow.mapSize.height = 2048;
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 40;
    sunLight.shadow.camera.left = -12;
    sunLight.shadow.camera.right = 12;
    sunLight.shadow.camera.top = 12;
    sunLight.shadow.camera.bottom = -12;
    sunLight.shadow.bias = -0.0004;
    scene.add(sunLight);

    // Cyan bioluminescent ground bounce
    const floorGlow = new THREE.PointLight(0x00f3ff, 1.6, 15);
    floorGlow.position.set(0, 0.3, 0);
    scene.add(floorGlow);

    // Saffron ruins glow
    const relicsLight = new THREE.PointLight(0xff5722, 1.2, 12);
    relicsLight.position.set(3, 3.2, -2);
    scene.add(relicsLight);

    // Volumetric light rays
    const lightbeams = createVolumetricSunbeams();
    scene.add(lightbeams);

    /* ── Weathered ruins stone terrain ground ── */
    const groundGeo = new THREE.PlaneGeometry(32, 32, 60, 60);
    const groundPos = groundGeo.attributes.position;
    for (let i = 0; i < groundPos.count; i++) {
      const x = groundPos.getX(i);
      const y = groundPos.getY(i);
      
      const wave1 = Math.sin(x * 0.4) * 0.18;
      const wave2 = Math.cos(y * 0.35) * 0.12;
      const crackDeform = Math.sin(x * 2.0) * Math.cos(y * 2.0) * 0.04; // Stone fractures

      groundPos.setZ(i, wave1 + wave2 + crackDeform);
    }
    groundGeo.computeVertexNormals();

    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x475569, // Ruined slate stone floor
      roughness: 0.95,
      bumpMap: stoneTexture,
      bumpScale: 0.14,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    /* ── Procedural Swaying Grass blades ── */
    const grassGroup = new THREE.Group();
    const grassBlades: THREE.Mesh[] = [];
    const grassMat = new THREE.MeshStandardMaterial({
      color: 0x1b5e20, // Jungle green
      roughness: 0.9,
      side: THREE.DoubleSide,
    });

    for (let i = 0; i < 600; i++) {
      const h = 0.12 + Math.random() * 0.12;
      const bladeGeo = new THREE.PlaneGeometry(0.015, h);
      bladeGeo.translate(0, h / 2, 0);

      const blade = new THREE.Mesh(bladeGeo, grassMat);
      const rx = (Math.random() - 0.5) * 18;
      const rz = (Math.random() - 0.5) * 18;
      const ry = Math.sin(rx * 0.4) * 0.18 + Math.cos(rz * 0.35) * 0.12;

      blade.position.set(rx, ry - 0.05, rz);
      blade.rotation.set(
        Math.random() * 0.28,
        Math.random() * Math.PI,
        (Math.random() - 0.5) * 0.2
      );
      grassGroup.add(blade);
      grassBlades.push(blade);
    }
    scene.add(grassGroup);

    /* ── Interactive structures (Ancient ruins pathway) ── */
    const interactiveObjects: InteractiveObject[] = [];

    // Ancient Ruined Gateway (Directly on camera scroll path!)
    const gateway = createTempleArch(stoneTexture);
    gateway.position.set(0, 0, -1.8);
    gateway.scale.setScalar(1.1);
    scene.add(gateway);
    interactiveObjects.push({
      mesh: gateway,
      basePos: new THREE.Vector3(0, 0, -1.8),
      floatSpeed: 0.15,
      floatAmplitude: 0.02,
      rotSpeed: new THREE.Vector3(0, 0.02, 0),
      interactRadius: 3.5,
    });

    // Ruined Pillars lining the pathway
    const pillarPositions = [
      [-3.0, 0, 2.5],
      [3.0, 0, 1.8],
      [-3.5, 0, -3.8],
      [3.5, 0, -4.5],
      [-4.2, 0, 0.2],
      [4.2, 0, -1.2],
    ];

    for (const pos of pillarPositions) {
      const pillar = createAncientPillar(stoneTexture);
      const ry = Math.sin(pos[0] * 0.4) * 0.18 + Math.cos(pos[2] * 0.35) * 0.12;
      pillar.position.set(pos[0], ry - 0.05, pos[2]);
      scene.add(pillar);
      interactiveObjects.push({
        mesh: pillar,
        basePos: new THREE.Vector3(pos[0], ry - 0.05, pos[2]),
        floatSpeed: 0.1 + Math.random() * 0.1,
        floatAmplitude: 0.015,
        rotSpeed: new THREE.Vector3(0, 0.05, 0),
        interactRadius: 2.2,
      });
    }

    // Heavy roots ancient jungle trees
    const treePositions = [
      [-5.5, 0, -2.5],
      [5.5, 0, -3.2],
      [-6.5, 0, 2.0],
      [6.5, 0, 1.2],
      [-8.0, 0, -4.5],
      [8.0, 0, -4.0],
    ];

    for (const pos of treePositions) {
      const tree = createRuinsTree(barkTexture);
      const scale = 0.9 + Math.random() * 0.6;
      tree.scale.setScalar(scale);
      const ry = Math.sin(pos[0] * 0.4) * 0.18 + Math.cos(pos[2] * 0.35) * 0.12;
      tree.position.set(pos[0], ry - 0.1, pos[2]);
      tree.rotation.y = Math.random() * Math.PI * 2;
      scene.add(tree);
    }

    // Glowing exotic ruins crystals (interactive)
    const crystalPositions = [
      [-1.8, 0, 1.0],
      [1.8, 0, 0.8],
      [-2.2, 0, -2.5],
      [2.2, 0, -2.8],
      [0, 0, -5.2],
    ];

    for (const pos of crystalPositions) {
      const crystal = createCrystalCluster();
      const scale = 0.75 + Math.random() * 0.55;
      crystal.scale.setScalar(scale);
      const ry = Math.sin(pos[0] * 0.4) * 0.18 + Math.cos(pos[2] * 0.35) * 0.12;
      crystal.position.set(pos[0], ry - 0.05, pos[2]);
      scene.add(crystal);
      interactiveObjects.push({
        mesh: crystal,
        basePos: new THREE.Vector3(pos[0], ry - 0.05, pos[2]),
        floatSpeed: 0.4 + Math.random() * 0.4,
        floatAmplitude: 0.1 + Math.random() * 0.08,
        rotSpeed: new THREE.Vector3(0.04, 0.18, 0.03),
        interactRadius: 2.5,
      });
    }

    // Ruined Temple mossy boulders
    const boulderPositions = [
      [-2.4, 0, 3.2],
      [2.4, 0, 3.0],
      [-4.8, 0, -1.2],
      [4.8, 0, -1.8],
    ];

    for (const pos of boulderPositions) {
      const rock = createRealisticRock(stoneTexture);
      const scale = 0.8 + Math.random() * 0.6;
      rock.scale.setScalar(scale);
      const ry = Math.sin(pos[0] * 0.4) * 0.18 + Math.cos(pos[2] * 0.35) * 0.12;
      rock.position.set(pos[0], ry + 0.1, pos[2]);
      scene.add(rock);
      interactiveObjects.push({
        mesh: rock,
        basePos: new THREE.Vector3(pos[0], ry + 0.1, pos[2]),
        floatSpeed: 0.2 + Math.random() * 0.1,
        floatAmplitude: 0.015,
        rotSpeed: new THREE.Vector3(0.02, 0.08, 0.02),
        interactRadius: 2.0,
      });
    }

    // Bioluminescent exotic jungle mushrooms
    const shroomPositions = [
      [-1.2, 0, 2.2],
      [1.2, 0, 2.0],
      [-2.8, 0, 0.5],
      [2.8, 0, 0.2],
      [-1.5, 0, -3.8],
      [1.5, 0, -3.5],
    ];

    for (const pos of shroomPositions) {
      const shroom = createRuinsMushroom();
      const scale = 0.8 + Math.random() * 0.7;
      shroom.scale.setScalar(scale);
      const ry = Math.sin(pos[0] * 0.4) * 0.18 + Math.cos(pos[2] * 0.35) * 0.12;
      shroom.position.set(pos[0], ry - 0.05, pos[2]);
      scene.add(shroom);
      interactiveObjects.push({
        mesh: shroom,
        basePos: new THREE.Vector3(pos[0], ry - 0.05, pos[2]),
        floatSpeed: 0.5 + Math.random() * 0.4,
        floatAmplitude: 0.04 + Math.random() * 0.03,
        rotSpeed: new THREE.Vector3(0, 0.2 + Math.random() * 0.2, 0),
        interactRadius: 2.0,
      });
    }

    // Glowing golden dandelions
    const dandelionConfigs = [
      { pos: [-1, 2, 2.5], color: 0xffeb3b }, // Gold
      { pos: [2.5, 3.2, 1], color: 0xd81b60 }, // Magenta
      { pos: [-3, 2.8, -1.5], color: 0x00f3ff }, // Cyan
      { pos: [3.8, 1.8, 2.2], color: 0xffeb3b }, // Gold
      { pos: [-2.2, 2.0, 3.8], color: 0x9c27b0 }, // Violet
    ];

    for (const cfg of dandelionConfigs) {
      const ball = new THREE.Group();
      const coreGeo = new THREE.SphereGeometry(0.08, 16, 16);
      const coreMat = new THREE.MeshPhysicalMaterial({
        color: cfg.color,
        emissive: cfg.color,
        emissiveIntensity: 0.95,
        transmission: 0.8,
        roughness: 0.1,
        thickness: 0.2,
      });
      ball.add(new THREE.Mesh(coreGeo, coreMat));

      const haloGeo = new THREE.SphereGeometry(0.22, 16, 16);
      const haloMat = new THREE.MeshBasicMaterial({
        color: cfg.color,
        transparent: true,
        opacity: 0.22,
      });
      ball.add(new THREE.Mesh(haloGeo, haloMat));

      ball.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      scene.add(ball);
      interactiveObjects.push({
        mesh: ball,
        basePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        floatSpeed: 0.6 + Math.random() * 0.6,
        floatAmplitude: 0.25 + Math.random() * 0.15,
        rotSpeed: new THREE.Vector3(0, 0.35 + Math.random() * 0.35, 0),
        interactRadius: 3.0,
      });
    }

    // Bioluminescent Butterflies & Relic Dust points
    const butterflies = createButterflies(250);
    scene.add(butterflies);

    // Enable high-fidelity real-time PBR shadows for maximum premium depth
    scene.traverse((node) => {
      if (node instanceof THREE.Mesh) {
        node.castShadow = true;
        node.receiveShadow = true;
      }
    });

    /* ── Mouse tracking ── */
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      targetRotation.y = mouse.x * 0.12;
      targetRotation.x = mouse.y * 0.06;
    }
    window.addEventListener("mousemove", onMouseMove);

    /* ── Scroll-driven GTA V style Waypoint Spline ── */
    let scrollY = 0;
    function onScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener("scroll", onScroll);

    // Dynamic Cinematic Waypoints moving through ancient temple portal
    const waypoints = [
      {
        scroll: 0.0, // Hero Section (Overview of Arch Gateway & forest entrance)
        pos: new THREE.Vector3(0, 2.5, 8),
        target: new THREE.Vector3(0, 1.6, 0),
      },
      {
        scroll: 0.35, // About Section (Dive low, fly directly under stone Arch lintel)
        pos: new THREE.Vector3(-0.8, 1.25, 2.0),
        target: new THREE.Vector3(0, 1.45, -2.5),
      },
      {
        scroll: 0.72, // Events Grid (Fly up and pan right, catching glowing crystal canyon)
        pos: new THREE.Vector3(3.5, 3.6, -1.8),
        target: new THREE.Vector3(-1.0, 1.4, -4.5),
      },
      {
        scroll: 1.0, // Join/Register (Descend directly into final ancient sanctum portal)
        pos: new THREE.Vector3(0, 0.9, -6.8),
        target: new THREE.Vector3(0, 1.55, -11.0),
      },
    ];

    const currentCamPos = new THREE.Vector3(0, 2.5, 8);
    const currentLookTarget = new THREE.Vector3(0, 1.6, 0);

    /* ── Raycaster for object interaction ── */
    const raycaster = new THREE.Raycaster();

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();

      // Compute scroll percentage
      const maxScroll = document.body.scrollHeight - window.innerHeight;
      const scrollProgress = maxScroll > 0 ? Math.max(0, Math.min(1, scrollY / maxScroll)) : 0;

      // Find appropriate waypoint interval
      let w0 = waypoints[0];
      let w1 = waypoints[waypoints.length - 1];

      for (let i = 0; i < waypoints.length - 1; i++) {
        if (scrollProgress >= waypoints[i].scroll && scrollProgress <= waypoints[i + 1].scroll) {
          w0 = waypoints[i];
          w1 = waypoints[i + 1];
          break;
        }
      }

      // Local ratio & ease-in-out factor
      const range = w1.scroll - w0.scroll;
      const t = range > 0 ? (scrollProgress - w0.scroll) / range : 0;
      const tEase = t * t * (3 - 2 * t); // Smoothstep

      // Interpolate camera coordinates
      const targetPos = new THREE.Vector3().lerpVectors(w0.pos, w1.pos, tEase);
      const targetLook = new THREE.Vector3().lerpVectors(w0.target, w1.target, tEase);

      // Smooth lag (lerp) for maximum premium glide
      currentCamPos.lerp(targetPos, 0.05);
      currentLookTarget.lerp(targetLook, 0.05);

      // Apply coordinates to camera
      camera.position.copy(currentCamPos);

      // Blend mouse interaction into final look target
      const mouseParallax = new THREE.Vector3(mouse.x * 1.6, mouse.y * 0.8, 0);
      const finalLookTarget = currentLookTarget.clone().add(mouseParallax);
      camera.lookAt(finalLookTarget);

      // Real-time wind vectors
      const windX = Math.sin(elapsed * 1.3) * 0.06;
      const windZ = Math.cos(elapsed * 0.9) * 0.04;

      // Sway organic grass blades in wind
      for (let i = 0; i < grassBlades.length; i++) {
        const blade = grassBlades[i];
        blade.rotation.z = windX + Math.sin(elapsed * 1.5 + blade.position.x * 2.5) * 0.035;
        blade.rotation.x = windZ + Math.cos(elapsed * 1.2 + blade.position.z * 2.0) * 0.02;
      }

      // Sway volumetric sunbeams in the breeze
      lightbeams.children.forEach((beam) => {
        beam.rotation.y = Math.sin(elapsed * 0.3) * 0.04;
        beam.scale.setScalar(1 + Math.sin(elapsed * 0.65) * 0.022);
      });

      // Animate interactive objects
      for (const obj of interactiveObjects) {
        // Floating motion
        obj.mesh.position.y =
          obj.basePos.y +
          Math.sin(elapsed * obj.floatSpeed) * obj.floatAmplitude;

        // Rotation
        obj.mesh.rotation.x += obj.rotSpeed.x * 0.01;
        obj.mesh.rotation.y += obj.rotSpeed.y * 0.01;
        obj.mesh.rotation.z += obj.rotSpeed.z * 0.01;

        // Cursor attraction / repulsion
        raycaster.setFromCamera(new THREE.Vector2(mouse.x, mouse.y), camera);
        const objWorldPos = new THREE.Vector3();
        obj.mesh.getWorldPosition(objWorldPos);

        const screenPos = objWorldPos.clone().project(camera);
        const dx = screenPos.x - mouse.x;
        const dy = screenPos.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.8) {
          const strength = (1 - dist / 0.8) * 0.045;
          obj.mesh.position.x +=
            (obj.mesh.position.x - (obj.basePos.x + mouse.x * 2)) * strength;
          obj.mesh.position.z +=
            (obj.mesh.position.z - (obj.basePos.z - mouse.y * 2)) * strength;

          // Scale pulse on hover
          const pulseScale = 1 + (1 - dist / 0.8) * 0.18;
          obj.mesh.scale.lerp(
            new THREE.Vector3(pulseScale, pulseScale, pulseScale),
            0.12
          );
        } else {
          // Return to base position
          obj.mesh.position.x +=
            (obj.basePos.x - obj.mesh.position.x) * 0.02;
          obj.mesh.position.z +=
            (obj.basePos.z - obj.mesh.position.z) * 0.02;
        }
      }

      // Animate butterflies & relic spores fluttering
      const p = butterflies.geometry.attributes.position;
      for (let i = 0; i < p.count; i++) {
        const x = p.getX(i);
        const y = p.getY(i);
        const z = p.getZ(i);

        // Flapping wind flight wave formula
        p.setX(i, x + Math.sin(elapsed * 2.5 + i * 0.15) * 0.005);
        p.setY(i, y + Math.cos(elapsed * 1.8 + i * 0.22) * 0.004);
        p.setZ(i, z + Math.sin(elapsed * 2.0 + i * 0.1) * 0.005);
      }
      p.needsUpdate = true;

      // Pulsate butterfly bioluminescent glows
      (butterflies.material as THREE.PointsMaterial).opacity =
        0.7 + Math.sin(elapsed * 2.0) * 0.25;

      // Animated lights
      floorGlow.intensity = 1.4 + Math.sin(elapsed * 0.8) * 0.2;
      relicsLight.position.x = 3 + Math.sin(elapsed * 0.2) * 1.5;

      renderer.render(scene, camera);
    }

    animate();

    /* ── Resize handler ── */
    function onResize() {
      width = container.clientWidth;
      height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    }
    window.addEventListener("resize", onResize);

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      stoneTexture.dispose();
      barkTexture.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      id="forest-scene"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 0,
        pointerEvents: "auto",
      }}
    />
  );
}
