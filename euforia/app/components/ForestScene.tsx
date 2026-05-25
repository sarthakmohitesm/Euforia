"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────── helpers ─────────── */

function createGlowMaterial(color: number, opacity = 0.6) {
  return new THREE.MeshStandardMaterial({
    color,
    emissive: color,
    emissiveIntensity: 0.8,
    transparent: true,
    opacity,
    roughness: 0.4,
    metalness: 0.2,
  });
}

function createTreeMesh(): THREE.Group {
  const tree = new THREE.Group();

  // Trunk – slight taper
  const trunkGeo = new THREE.CylinderGeometry(0.08, 0.14, 1.6, 8);
  const trunkMat = new THREE.MeshStandardMaterial({
    color: 0x3e2723,
    roughness: 0.9,
    metalness: 0.0,
  });
  const trunk = new THREE.Mesh(trunkGeo, trunkMat);
  trunk.position.y = 0.8;
  tree.add(trunk);

  // Canopy layers (3 stacked cones)
  const layerConfigs = [
    { radius: 0.7, height: 1.0, y: 1.8 },
    { radius: 0.55, height: 0.85, y: 2.4 },
    { radius: 0.4, height: 0.7, y: 2.9 },
  ];

  for (const cfg of layerConfigs) {
    const geo = new THREE.ConeGeometry(cfg.radius, cfg.height, 8);
    const mat = new THREE.MeshStandardMaterial({
      color: 0x0b6e3a,
      emissive: 0x003d1a,
      emissiveIntensity: 0.15,
      roughness: 0.7,
      metalness: 0.05,
    });
    const cone = new THREE.Mesh(geo, mat);
    cone.position.y = cfg.y;
    tree.add(cone);
  }

  return tree;
}

function createMushroom(): THREE.Group {
  const mushroom = new THREE.Group();

  const stemGeo = new THREE.CylinderGeometry(0.04, 0.06, 0.3, 8);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5dc,
    roughness: 0.6,
  });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = 0.15;
  mushroom.add(stem);

  const capGeo = new THREE.SphereGeometry(0.15, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2);
  const capMat = createGlowMaterial(0x00ff88, 0.85);
  const cap = new THREE.Mesh(capGeo, capMat);
  cap.position.y = 0.3;
  mushroom.add(cap);

  // Glow underneath cap
  const glowGeo = new THREE.CircleGeometry(0.12, 12);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.4,
    side: THREE.DoubleSide,
  });
  const glow = new THREE.Mesh(glowGeo, glowMat);
  glow.rotation.x = -Math.PI / 2;
  glow.position.y = 0.28;
  mushroom.add(glow);

  return mushroom;
}

function createCrystal(): THREE.Group {
  const crystal = new THREE.Group();

  const geo = new THREE.OctahedronGeometry(0.25, 0);
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0x00ff88,
    emissive: 0x00cc66,
    emissiveIntensity: 0.6,
    transparent: true,
    opacity: 0.75,
    roughness: 0.05,
    metalness: 0.3,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
  });
  const mesh = new THREE.Mesh(geo, mat);
  mesh.scale.set(1, 1.6, 1);
  crystal.add(mesh);

  // Glow aura
  const auraGeo = new THREE.SphereGeometry(0.35, 16, 16);
  const auraMat = new THREE.MeshBasicMaterial({
    color: 0x00ff88,
    transparent: true,
    opacity: 0.12,
  });
  const aura = new THREE.Mesh(auraGeo, auraMat);
  crystal.add(aura);

  return crystal;
}

function createFloatingOrb(color: number): THREE.Group {
  const orb = new THREE.Group();

  const coreGeo = new THREE.SphereGeometry(0.1, 16, 16);
  const coreMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.9,
  });
  const core = new THREE.Mesh(coreGeo, coreMat);
  orb.add(core);

  // Outer glow
  const glowGeo = new THREE.SphereGeometry(0.2, 16, 16);
  const glowMat = new THREE.MeshBasicMaterial({
    color,
    transparent: true,
    opacity: 0.15,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  orb.add(glowMesh);

  return orb;
}

function createLantern(): THREE.Group {
  const lantern = new THREE.Group();

  // Cage frame
  const cageGeo = new THREE.DodecahedronGeometry(0.15, 0);
  const cageMat = new THREE.MeshStandardMaterial({
    color: 0x8b7355,
    wireframe: true,
    transparent: true,
    opacity: 0.6,
  });
  const cage = new THREE.Mesh(cageGeo, cageMat);
  lantern.add(cage);

  // Inner light
  const lightGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const lightMat = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.95,
  });
  const light = new THREE.Mesh(lightGeo, lightMat);
  lantern.add(light);

  // Glow sphere
  const glowGeo = new THREE.SphereGeometry(0.25, 12, 12);
  const glowMat = new THREE.MeshBasicMaterial({
    color: 0xffd700,
    transparent: true,
    opacity: 0.08,
  });
  const glowMesh = new THREE.Mesh(glowGeo, glowMat);
  lantern.add(glowMesh);

  return lantern;
}

/* ─────────── Firefly particles ─────────── */
function createFireflies(count: number): THREE.Points {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);

  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = Math.random() * 8;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
    sizes[i] = Math.random() * 3 + 1;
  }

  const geo = new THREE.BufferGeometry();
  geo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geo.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

  const mat = new THREE.PointsMaterial({
    color: 0xffd700,
    size: 0.06,
    transparent: true,
    opacity: 0.8,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
  });

  return new THREE.Points(geo, mat);
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

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.8;
    container.appendChild(renderer.domElement);

    /* ── Scene & Fog ── */
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x030a06, 0.06);
    scene.background = new THREE.Color(0x030a06);

    /* ── Camera ── */
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.set(0, 2.5, 8);
    camera.lookAt(0, 1.5, 0);

    /* ── Lights ── */
    const ambientLight = new THREE.AmbientLight(0x1a3d1a, 0.4);
    scene.add(ambientLight);

    const moonLight = new THREE.DirectionalLight(0x88ccaa, 0.5);
    moonLight.position.set(5, 10, 3);
    scene.add(moonLight);

    // Green ground glow
    const groundGlow = new THREE.PointLight(0x00ff88, 1.5, 15);
    groundGlow.position.set(0, 0.2, 0);
    scene.add(groundGlow);

    // Gold accent light
    const goldLight = new THREE.PointLight(0xffd700, 0.8, 12);
    goldLight.position.set(3, 3, -2);
    scene.add(goldLight);

    // Purple mystic accent
    const purpleLight = new THREE.PointLight(0x9b59b6, 0.4, 10);
    purpleLight.position.set(-4, 4, 1);
    scene.add(purpleLight);

    /* ── Ground plane ── */
    const groundGeo = new THREE.PlaneGeometry(30, 30, 50, 50);
    // Displace ground vertices for organic terrain
    const groundPos = groundGeo.attributes.position;
    for (let i = 0; i < groundPos.count; i++) {
      const x = groundPos.getX(i);
      const y = groundPos.getY(i);
      groundPos.setZ(
        i,
        Math.sin(x * 0.5) * 0.15 + Math.cos(y * 0.3) * 0.1
      );
    }
    groundGeo.computeVertexNormals();
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0x0a2615,
      roughness: 0.95,
      metalness: 0.0,
    });
    const ground = new THREE.Mesh(groundGeo, groundMat);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -0.1;
    scene.add(ground);

    /* ── Interactive objects ── */
    const interactiveObjects: InteractiveObject[] = [];

    // Trees (background, not interactive but parallax-affected)
    const treePositions = [
      [-3, 0, -3],
      [4, 0, -4],
      [-5, 0, -2],
      [6, 0, -5],
      [-7, 0, -4],
      [2, 0, -6],
      [-1, 0, -5],
      [8, 0, -3],
      [-9, 0, -5],
      [0, 0, -8],
      [5, 0, -7],
      [-6, 0, -7],
    ];

    for (const pos of treePositions) {
      const tree = createTreeMesh();
      const scale = 0.8 + Math.random() * 0.6;
      tree.scale.setScalar(scale);
      tree.position.set(pos[0], pos[1], pos[2]);
      tree.rotation.y = Math.random() * Math.PI * 2;
      scene.add(tree);
    }

    // Glowing mushrooms (interactive)
    const mushroomPositions = [
      [-1.5, 0, 1],
      [2, 0, 0.5],
      [-3, 0, -0.5],
      [0.5, 0, 2],
      [3.5, 0, 1.5],
      [-2.5, 0, 2.5],
    ];

    for (const pos of mushroomPositions) {
      const mushroom = createMushroom();
      const scale = 0.6 + Math.random() * 0.8;
      mushroom.scale.setScalar(scale);
      mushroom.position.set(pos[0], pos[1], pos[2]);
      scene.add(mushroom);
      interactiveObjects.push({
        mesh: mushroom,
        basePos: new THREE.Vector3(pos[0], pos[1], pos[2]),
        floatSpeed: 0.5 + Math.random() * 0.5,
        floatAmplitude: 0.05 + Math.random() * 0.05,
        rotSpeed: new THREE.Vector3(0, 0.2 + Math.random() * 0.3, 0),
        interactRadius: 2.0,
      });
    }

    // Crystals (interactive)
    const crystalPositions = [
      [-2, 0.3, 0],
      [3, 0.3, -1],
      [0, 0.4, -1.5],
      [-4, 0.3, 1],
      [5, 0.35, 0],
    ];

    for (const pos of crystalPositions) {
      const crystal = createCrystal();
      const scale = 0.5 + Math.random() * 0.5;
      crystal.scale.setScalar(scale);
      crystal.position.set(pos[0], pos[1], pos[2]);
      scene.add(crystal);
      interactiveObjects.push({
        mesh: crystal,
        basePos: new THREE.Vector3(pos[0], pos[1], pos[2]),
        floatSpeed: 0.3 + Math.random() * 0.4,
        floatAmplitude: 0.15 + Math.random() * 0.1,
        rotSpeed: new THREE.Vector3(
          0.1 + Math.random() * 0.2,
          0.3 + Math.random() * 0.3,
          0.05
        ),
        interactRadius: 2.5,
      });
    }

    // Floating orbs (interactive)
    const orbConfigs = [
      { pos: [-1, 2, 1], color: 0x00ff88 },
      { pos: [2, 3, -1], color: 0xffd700 },
      { pos: [-3, 2.5, 0], color: 0x3ad8c8 },
      { pos: [4, 1.8, 1], color: 0x00ff88 },
      { pos: [0, 3.5, -2], color: 0x9b59b6 },
      { pos: [-2, 1.5, 2], color: 0xffd700 },
      { pos: [1, 4, 0], color: 0x00ff88 },
    ];

    for (const cfg of orbConfigs) {
      const orb = createFloatingOrb(cfg.color);
      orb.position.set(cfg.pos[0], cfg.pos[1], cfg.pos[2]);
      scene.add(orb);
      interactiveObjects.push({
        mesh: orb,
        basePos: new THREE.Vector3(cfg.pos[0], cfg.pos[1], cfg.pos[2]),
        floatSpeed: 0.5 + Math.random() * 0.8,
        floatAmplitude: 0.3 + Math.random() * 0.2,
        rotSpeed: new THREE.Vector3(0, 0.5 + Math.random() * 0.5, 0),
        interactRadius: 3.0,
      });
    }

    // Lanterns (interactive)
    const lanternPositions = [
      [-1, 3, -1],
      [3, 3.5, -2],
      [-4, 2.8, -1.5],
      [1, 4, -3],
      [5, 3, -2.5],
    ];

    for (const pos of lanternPositions) {
      const lantern = createLantern();
      lantern.position.set(pos[0], pos[1], pos[2]);
      scene.add(lantern);
      interactiveObjects.push({
        mesh: lantern,
        basePos: new THREE.Vector3(pos[0], pos[1], pos[2]),
        floatSpeed: 0.3 + Math.random() * 0.3,
        floatAmplitude: 0.2 + Math.random() * 0.15,
        rotSpeed: new THREE.Vector3(0.05, 0.3, 0.05),
        interactRadius: 2.5,
      });
    }

    // Fireflies
    const fireflies = createFireflies(200);
    scene.add(fireflies);

    /* ── Mouse tracking ── */
    const mouse = { x: 0, y: 0 };
    const targetRotation = { x: 0, y: 0 };

    function onMouseMove(e: MouseEvent) {
      mouse.x = (e.clientX / width) * 2 - 1;
      mouse.y = -(e.clientY / height) * 2 + 1;
      targetRotation.y = mouse.x * 0.15;
      targetRotation.x = mouse.y * 0.08;
    }
    window.addEventListener("mousemove", onMouseMove);

    /* ── Scroll-driven camera movement ── */
    let scrollY = 0;
    function onScroll() {
      scrollY = window.scrollY;
    }
    window.addEventListener("scroll", onScroll);

    /* ── Raycaster for object interaction ── */
    const raycaster = new THREE.Raycaster();
    const mouseVec = new THREE.Vector2();

    /* ── Animation ── */
    const clock = new THREE.Clock();
    let animationId: number;

    function animate() {
      animationId = requestAnimationFrame(animate);
      const elapsed = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Smooth camera rotation from mouse
      camera.rotation.y += (targetRotation.y - camera.rotation.y) * 0.03;
      camera.rotation.x += (targetRotation.x - camera.rotation.x) * 0.03;

      // Scroll-driven camera position (3D scrollable feel)
      const scrollProgress = scrollY / (document.body.scrollHeight - height);
      const targetCamY = 2.5 - scrollProgress * 3;
      const targetCamZ = 8 - scrollProgress * 5;
      camera.position.y += (targetCamY - camera.position.y) * 0.05;
      camera.position.z += (targetCamZ - camera.position.z) * 0.05;

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

        // Calculate screen-space distance to cursor
        const screenPos = objWorldPos.clone().project(camera);
        const dx = screenPos.x - mouse.x;
        const dy = screenPos.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 0.8) {
          const strength = (1 - dist / 0.8) * 0.03;
          // Gentle push away from cursor
          obj.mesh.position.x +=
            (obj.mesh.position.x - (obj.basePos.x + mouse.x * 2)) * strength;
          obj.mesh.position.z +=
            (obj.mesh.position.z - (obj.basePos.z - mouse.y * 2)) * strength;

          // Scale pulse on hover
          const pulseScale = 1 + (1 - dist / 0.8) * 0.15;
          obj.mesh.scale.lerp(
            new THREE.Vector3(pulseScale, pulseScale, pulseScale),
            0.1
          );
        } else {
          // Return to base position
          obj.mesh.position.x +=
            (obj.basePos.x - obj.mesh.position.x) * 0.02;
          obj.mesh.position.z +=
            (obj.basePos.z - obj.mesh.position.z) * 0.02;
        }
      }

      // Animate fireflies
      const fireflyPos = fireflies.geometry.attributes.position;
      for (let i = 0; i < fireflyPos.count; i++) {
        const x = fireflyPos.getX(i);
        const y = fireflyPos.getY(i);
        const z = fireflyPos.getZ(i);

        fireflyPos.setX(
          i,
          x + Math.sin(elapsed * 0.5 + i * 0.1) * 0.003
        );
        fireflyPos.setY(
          i,
          y + Math.cos(elapsed * 0.3 + i * 0.15) * 0.002
        );
        fireflyPos.setZ(
          i,
          z + Math.sin(elapsed * 0.4 + i * 0.2) * 0.003
        );
      }
      fireflyPos.needsUpdate = true;

      // Pulsate firefly opacity
      (fireflies.material as THREE.PointsMaterial).opacity =
        0.5 + Math.sin(elapsed * 2) * 0.3;

      // Animated lights
      groundGlow.intensity = 1.2 + Math.sin(elapsed * 0.8) * 0.3;
      goldLight.position.x = 3 + Math.sin(elapsed * 0.3) * 2;
      goldLight.position.z = -2 + Math.cos(elapsed * 0.2) * 2;

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
