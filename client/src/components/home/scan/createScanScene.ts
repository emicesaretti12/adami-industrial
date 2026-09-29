import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";

/**
 * Escena de metrología: una brida dentada que pasa por tres estados según `progress` (0..1)
 *   0.00–0.30  Diseño: solo aristas, como un plano CAD
 *   0.30–0.55  Fabricación: aparece el metal
 *   0.62–0.95  Medición: una hoja láser barre la pieza; arriba de la línea quedan
 *              la nube de puntos medidos y el mapa de desviación
 * Solo dibuja mientras start() está activo (la sección está en pantalla).
 */
export function createScanScene(canvas: HTMLCanvasElement, opts: { lowPower: boolean }) {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: !opts.lowPower,
    alpha: true,
    powerPreference: "high-performance",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, opts.lowPower ? 1.25 : 1.75));
  renderer.localClippingEnabled = true;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const scene = new THREE.Scene();
  const pmrem = new THREE.PMREMGenerator(renderer);
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
  scene.environment = envTex;

  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 50);
  camera.position.set(0, 0.35, 5.2);
  camera.lookAt(0, 0, 0);

  scene.add(new THREE.HemisphereLight(0xcfe0f5, 0x0c1a29, 0.6));
  const key = new THREE.DirectionalLight(0xffffff, 1.6);
  key.position.set(3, 4, 5);
  scene.add(key);

  // ── Geometría: brida de 36 dientes, agujero central y 6 agujeros de bulón ──
  const teeth = 36;
  const rOuter = 1.0;
  const rRoot = 0.9;
  const shape = new THREE.Shape();
  for (let i = 0; i <= teeth * 4; i++) {
    const a = (i / (teeth * 4)) * Math.PI * 2;
    const r = i % 4 === 1 || i % 4 === 2 ? rOuter : rRoot;
    const x = Math.cos(a) * r;
    const y = Math.sin(a) * r;
    if (i === 0) shape.moveTo(x, y);
    else shape.lineTo(x, y);
  }
  const bore = new THREE.Path();
  bore.absarc(0, 0, 0.3, 0, Math.PI * 2, true);
  shape.holes.push(bore);
  for (let i = 0; i < 6; i++) {
    const a = (i / 6) * Math.PI * 2;
    const h = new THREE.Path();
    h.absarc(Math.cos(a) * 0.62, Math.sin(a) * 0.62, 0.075, 0, Math.PI * 2, true);
    shape.holes.push(h);
  }
  const flangeGeo = new THREE.ExtrudeGeometry(shape, {
    depth: 0.26,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 2,
    curveSegments: 32,
  });
  flangeGeo.translate(0, 0, -0.13);

  const hubShape = new THREE.Shape();
  hubShape.absarc(0, 0, 0.46, 0, Math.PI * 2, false);
  const hubHole = new THREE.Path();
  hubHole.absarc(0, 0, 0.3, 0, Math.PI * 2, true);
  hubShape.holes.push(hubHole);
  const hubGeo = new THREE.ExtrudeGeometry(hubShape, {
    depth: 0.34,
    bevelEnabled: true,
    bevelThickness: 0.02,
    bevelSize: 0.015,
    bevelSegments: 2,
    curveSegments: 48,
  });
  hubGeo.translate(0, 0, 0.13);

  // ── Planos de corte del láser (espacio mundo) ──
  const keepBelow = new THREE.Plane(new THREE.Vector3(0, -1, 0), 2); // conserva y <= h
  const keepAbove = new THREE.Plane(new THREE.Vector3(0, 1, 0), -2); // conserva y >= h

  // ── Materiales ──
  const metal = new THREE.MeshStandardMaterial({
    color: 0xb9c4cf,
    metalness: 0.9,
    roughness: 0.32,
    transparent: true,
    opacity: 0,
    clippingPlanes: [keepBelow],
  });

  // Mapa de desviación calculado por píxel: suave aunque la malla tenga pocos vértices
  const heat = new THREE.MeshStandardMaterial({
    metalness: 0,
    roughness: 0.6,
    envMapIntensity: 0.25,
    clippingPlanes: [keepAbove],
  });
  // Sin tone mapping: ACES lleva estos colores saturados hacia el pastel
  heat.toneMapped = false;
  heat.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vLocal;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvLocal = position;");
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        varying vec3 vLocal;
        vec3 devColor(float t) {
          vec3 blue = vec3(0.13, 0.35, 0.95);
          vec3 cyan = vec3(0.10, 0.80, 0.90);
          vec3 green = vec3(0.20, 0.85, 0.35);
          vec3 yellow = vec3(0.98, 0.85, 0.20);
          vec3 red = vec3(0.95, 0.25, 0.20);
          if (t < 0.25) return mix(blue, cyan, t / 0.25);
          if (t < 0.5) return mix(cyan, green, (t - 0.25) / 0.25);
          if (t < 0.75) return mix(green, yellow, (t - 0.5) / 0.25);
          return mix(yellow, red, (t - 0.75) / 0.25);
        }`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float d = sin(vLocal.x * 3.1 + 0.4) * cos(vLocal.y * 2.7) * 0.55 + sin(vLocal.z * 8.0 + vLocal.x * 2.0) * 0.3;
        float t = clamp(0.5 + d * 0.62, 0.0, 1.0);
        diffuseColor.rgb = devColor(t) * 0.42;`,
      )
      // Parte del color como emisivo: el mapa se lee igual de vivo aunque la cara quede en sombra
      .replace(
        "#include <emissivemap_fragment>",
        "#include <emissivemap_fragment>\n        totalEmissiveRadiance += diffuseColor.rgb * 0.7;",
      );
  };

  const edgeMat = new THREE.LineBasicMaterial({ color: 0x8fb0d4, transparent: true, opacity: 1 });

  const part = new THREE.Group();
  const metalMeshes: THREE.Mesh[] = [];
  const heatMeshes: THREE.Mesh[] = [];
  for (const geo of [flangeGeo, hubGeo]) {
    const m = new THREE.Mesh(geo, metal);
    const h = new THREE.Mesh(geo, heat);
    h.visible = false;
    metalMeshes.push(m);
    heatMeshes.push(h);
    part.add(m, h, new THREE.LineSegments(new THREE.EdgesGeometry(geo, 25), edgeMat));
  }

  // ── Nube de puntos medidos, muestreada sobre la superficie ──
  const pointCount = opts.lowPower ? 1400 : 3200;
  const positions = new Float32Array(pointCount * 3);
  const tmp = new THREE.Vector3();
  const split = Math.round(pointCount * 0.75);
  let written = 0;
  metalMeshes.forEach((mesh, idx) => {
    const sampler = new MeshSurfaceSampler(mesh).build();
    const n = idx === 0 ? split : pointCount - split;
    for (let i = 0; i < n; i++) {
      sampler.sample(tmp);
      tmp.toArray(positions, written * 3);
      written++;
    }
  });
  const pointsGeo = new THREE.BufferGeometry();
  pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  const points = new THREE.Points(
    pointsGeo,
    new THREE.PointsMaterial({
      color: 0xe8f6ff,
      size: 0.014,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      depthWrite: false,
      clippingPlanes: [keepAbove],
    }),
  );
  points.scale.setScalar(1.004);
  points.visible = false;
  part.add(points);

  part.rotation.x = -1.05;
  scene.add(part);

  // ── Hoja del láser ──
  const laser = new THREE.Group();
  const sheet = new THREE.Mesh(
    new THREE.CircleGeometry(1.46, 96),
    new THREE.MeshBasicMaterial({
      color: 0x35c6ff,
      transparent: true,
      opacity: 0.07,
      side: THREE.DoubleSide,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    }),
  );
  sheet.rotation.x = -Math.PI / 2;
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7fe0ff,
    transparent: true,
    opacity: 0.85,
    side: THREE.DoubleSide,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const ring = new THREE.Mesh(new THREE.RingGeometry(1.46, 1.5, 96), ringMat);
  ring.rotation.x = -Math.PI / 2;
  laser.add(sheet, ring);
  laser.visible = false;
  scene.add(laser);

  // Grilla técnica bajo la pieza
  const grid = new THREE.GridHelper(6, 24, 0x2a4260, 0x1a2d44);
  grid.position.y = -1.05;
  const gridMat = grid.material as THREE.Material;
  gridMat.transparent = true;
  gridMat.opacity = 0.55;
  scene.add(grid);

  // ── Estado ──
  let progress = 0;
  let shown = 0; // valor suavizado que se dibuja
  let running = false;
  let lastT = performance.now();
  let idle = 0;

  const smooth = (a: number, b: number, t: number) => {
    const x = THREE.MathUtils.clamp((t - a) / (b - a), 0, 1);
    return x * x * (3 - 2 * x);
  };

  function apply(p: number) {
    const fab = smooth(0.3, 0.55, p);
    const scan = smooth(0.62, 0.95, p);

    metal.opacity = fab;
    metal.transparent = fab < 0.999;
    metal.depthWrite = fab > 0.5;
    edgeMat.opacity = 1 - fab * 0.8;

    const h = scan > 0 ? THREE.MathUtils.lerp(1.35, -1.15, scan) : 2;
    keepBelow.constant = h;
    keepAbove.constant = -h;
    heatMeshes.forEach((m) => (m.visible = scan > 0));
    points.visible = scan > 0;
    laser.visible = scan > 0 && scan < 0.999;
    laser.position.y = h;
    const fadeOut = 1 - smooth(0.88, 1, scan);
    ringMat.opacity = 0.85 * fadeOut;
    (sheet.material as THREE.MeshBasicMaterial).opacity = 0.07 * fadeOut;

    part.rotation.z = p * Math.PI * 1.25 + idle;
    part.rotation.x = -1.05 + p * 0.25;
  }

  function frame(now: number) {
    const dt = Math.min(0.05, (now - lastT) / 1000);
    lastT = now;
    shown += (progress - shown) * Math.min(1, dt * 7);
    idle += dt * 0.06;
    apply(shown);
    renderer.render(scene, camera);
  }

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // En pantallas angostas se aleja la cámara para que la pieza entre completa
    camera.position.z = w / h < 0.9 ? 6.8 : 5.2;
    camera.updateProjectionMatrix();
    if (!running) {
      apply(shown);
      renderer.render(scene, camera);
    }
  }

  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  return {
    setProgress(p: number) {
      progress = p;
    },
    /** Dibuja un único cuadro (reduced motion) */
    renderStatic(p: number) {
      progress = p;
      shown = p;
      apply(p);
      renderer.render(scene, camera);
    },
    start() {
      if (running) return;
      running = true;
      lastT = performance.now();
      renderer.setAnimationLoop(frame);
    },
    stop() {
      running = false;
      renderer.setAnimationLoop(null);
    },
    dispose() {
      renderer.setAnimationLoop(null);
      ro.disconnect();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const mat = mesh.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((m) => m.dispose());
        else mat?.dispose?.();
      });
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
    },
  };
}

export type ScanScene = ReturnType<typeof createScanScene>;
