import * as THREE from "three";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/examples/jsm/postprocessing/OutputPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { MeshSurfaceSampler } from "three/examples/jsm/math/MeshSurfaceSampler.js";
import {
  BOLT_RADIUS,
  N_BOLTS,
  N_PLANET,
  N_PLANETS,
  N_SUN,
  ORBIT,
  PLANET_RATIO,
  RING_OUTER,
  R_PLANET,
  R_RING,
  R_SUN,
  SUN_RATIO,
  blueprintCircle,
  buildGearboxGeometries,
  dimensionLine,
  meshRotation,
} from "./gears";
import {
  FinalShader,
  createBackdropMaterial,
  createDepthMaterial,
  createFloorMaterial,
  createPointsMaterial,
  createSteelMaterial,
  createUniforms,
} from "./shaders";
import { Sparks } from "./sparks";
import { buildStudioEnv } from "./env";

export interface GearboxOptions {
  /** dispositivo táctil: arranca con menos calidad y cámara más alejada */
  coarse: boolean;
  cores: number;
  /** elementos DOM de las etiquetas de medición, en orden */
  labels: HTMLElement[];
  /** fija un nivel de calidad (0-3) y desactiva el gobernador */
  quality?: number | null;
  debug?: boolean;
  onContextLost?: () => void;
}

const TAU = Math.PI * 2;
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
const smooth = (a: number, b: number, x: number) => {
  const t = clamp((x - a) / (b - a));
  return t * t * (3 - 2 * t);
};
const win = (p: number, a: number, b: number) => clamp((p - a) / (b - a));
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
const nextFrame = () => new Promise<void>((r) => requestAnimationFrame(() => r()));

/** Catmull-Rom uniforme sobre una componente */
function cr(a: number, b: number, c: number, d: number, t: number) {
  const t2 = t * t;
  const t3 = t2 * t;
  return 0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
}

interface CamKey {
  t: number;
  pos: THREE.Vector3;
  look: THREE.Vector3;
  fov: number;
}

interface Part {
  mesh: THREE.Mesh;
  base: THREE.Vector3;
  explode: THREE.Vector3;
  window: [number, number];
  spark: THREE.Vector3;
  e: number;
  snapped: boolean;
}

export async function createGearboxScene(canvas: HTMLCanvasElement, opts: GearboxOptions) {
  const params = new URLSearchParams(location.search);
  const forcedQ = opts.quality ?? (params.has("q") ? Number(params.get("q")) : null);
  let tier = forcedQ ?? (opts.coarse ? (opts.cores <= 2 ? 1 : 2) : 3);
  const governorOn = forcedQ === null;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: tier <= 1,
    alpha: false,
    stencil: false,
    powerPreference: "high-performance",
  });
  renderer.setClearColor(0x0c1a29, 1);
  renderer.toneMapping = THREE.NeutralToneMapping; // conserva la saturación del mapa de desviación
  renderer.outputColorSpace = THREE.SRGBColorSpace;

  const onLost = (e: Event) => {
    e.preventDefault();
    stop();
    opts.onContextLost?.();
  };
  canvas.addEventListener("webglcontextlost", onLost);

  const hdrOK =
    renderer.capabilities.isWebGL2 &&
    (renderer.extensions.has("EXT_color_buffer_float") || renderer.extensions.has("EXT_color_buffer_half_float"));
  if (!hdrOK) tier = Math.min(tier, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 90);
  const uniforms = createUniforms();

  // ── Entorno y luces ────────────────────────────────────────────────────────
  const envTex = buildStudioEnv(renderer);
  scene.environment = envTex;
  scene.environmentIntensity = 1.0;
  await nextFrame();

  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  const key = new THREE.DirectionalLight(0xffffff, 1.9);
  key.position.set(4, 7, 6);
  key.castShadow = tier >= 2;
  key.shadow.mapSize.set(opts.coarse ? 1024 : 2048, opts.coarse ? 1024 : 2048);
  Object.assign(key.shadow.camera, { left: -5.2, right: 5.2, top: 5.2, bottom: -5.2, near: 2, far: 22 });
  key.shadow.bias = -0.0004;
  key.shadow.normalBias = 0.02;
  key.shadow.radius = 3;
  const rim = new THREE.DirectionalLight(0x7fd8ff, 0.6);
  rim.position.set(-6, 2, -5);
  scene.add(key, rim);

  // ── Fondo y piso ───────────────────────────────────────────────────────────
  const backdropMat = createBackdropMaterial();
  const backdrop = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), backdropMat);
  backdrop.renderOrder = -100;
  backdrop.frustumCulled = false;
  scene.add(backdrop);

  const floorMat = createFloorMaterial();
  const floor = new THREE.Mesh(new THREE.PlaneGeometry(44, 44).rotateX(-Math.PI / 2), floorMat);
  floor.position.y = -3.7;
  floor.renderOrder = -50;
  scene.add(floor);

  // ── Piezas ─────────────────────────────────────────────────────────────────
  const geos = buildGearboxGeometries();
  await nextFrame();

  const steel = createSteelMaterial(uniforms, { color: 0xc4ccd6, roughness: 0.3 });
  const ringSteel = createSteelMaterial(uniforms, { color: 0x9aa7b6, roughness: 0.34 });
  const anodized = createSteelMaterial(uniforms, { color: 0x2f5f97, roughness: 0.38 });

  const tilt = new THREE.Group();
  tilt.rotation.set(-0.98, 0.0, 0);
  const assembly = new THREE.Group();
  tilt.add(assembly);
  scene.add(tilt);

  const depthMat = createDepthMaterial(uniforms);
  const blueMat = new THREE.LineBasicMaterial({ color: 0x5fb4e8, transparent: true, opacity: 0.75 });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x9cc4e8, transparent: true, opacity: 1 });
  const dpr0 = Math.min(window.devicePixelRatio || 1, [1, 1.25, 1.5, 2][tier]);
  const pointsMat = createPointsMaterial(uniforms, 0.05, dpr0);
  const pointCount = opts.coarse ? 3600 : 9000;
  const sampleWeights = { ring: 0.3, carrier: 0.14, sun: 0.09, planet: 0.11, bolt: 0.14 / N_BOLTS };

  const parts: Part[] = [];
  const disposables: { dispose(): void }[] = [];

  const lines = (data: Float32Array, mat: THREE.LineBasicMaterial) => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(data, 3));
    disposables.push(g);
    return new THREE.LineSegments(g, mat);
  };

  function addPoints(mesh: THREE.Mesh, count: number) {
    const sampler = new MeshSurfaceSampler(mesh).build();
    const pos = new Float32Array(count * 3);
    const seed = new Float32Array(count);
    const rand = new Float32Array(count);
    const v = new THREE.Vector3();
    const n = new THREE.Vector3();
    const s = (mesh.geometry.getAttribute("aSeed") as THREE.BufferAttribute).getX(0);
    for (let i = 0; i < count; i++) {
      sampler.sample(v, n);
      v.addScaledVector(n, 0.004);
      v.toArray(pos, i * 3);
      seed[i] = s;
      rand[i] = Math.random();
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seed, 1));
    g.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));
    disposables.push(g);
    const pts = new THREE.Points(g, pointsMat);
    pts.frustumCulled = false;
    mesh.add(pts);
  }

  function addPart(
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    base: [number, number, number],
    explode: [number, number, number],
    window: [number, number],
    spark: [number, number, number],
    weight: number,
    decor?: THREE.Object3D[],
  ) {
    const mesh = new THREE.Mesh(geo, mat);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.customDepthMaterial = depthMat;
    mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(geo, 28), edgeMat));
    decor?.forEach((d) => mesh.add(d));
    assembly.add(mesh);
    addPoints(mesh, Math.round(pointCount * weight));
    const part: Part = {
      mesh,
      base: new THREE.Vector3(...base),
      explode: new THREE.Vector3(...explode),
      window,
      spark: new THREE.Vector3(...spark),
      e: 1,
      snapped: false,
    };
    parts.push(part);
    return part;
  }

  const ringPart = addPart(
    geos.ring, ringSteel, [0, 0, 0], [0, 0, -0.9], [0.36, 0.47], [1.98, 0, 0.23], sampleWeights.ring,
    [lines(blueprintCircle(R_RING, RING_OUTER * 1.18), blueMat), lines(dimensionLine(RING_OUTER), blueMat)],
  );
  const carrierPart = addPart(
    geos.carrier, anodized, [0, 0, -0.3], [0, 0, -1.9], [0.34, 0.44], [0.9, 0, -0.03], sampleWeights.carrier,
    [lines(blueprintCircle(ORBIT, ORBIT * 1.5), blueMat)],
  );
  const sunPart = addPart(
    geos.sun, steel, [0, 0, 0], [0, 0, 1.4], [0.49, 0.575], [0.45, 0, 0.18], sampleWeights.sun,
    [lines(blueprintCircle(R_SUN, R_SUN * 2.4), blueMat)],
  );

  const planetPhi: number[] = [];
  const planetRho: number[] = [];
  const planetParts: Part[] = [];
  for (let i = 0; i < N_PLANETS; i++) {
    const phi = (i / N_PLANETS) * TAU;
    planetPhi.push(phi);
    // El sol tiene diente en 0°, 120° y 240°: el planeta entra con un hueco mirando al sol
    planetRho.push(meshRotation(0, N_SUN, phi, N_PLANET));
    const geo = i === 0 ? geos.planet : geos.planet.clone();
    if (i > 0) disposables.push(geo);
    (geo as THREE.BufferGeometry).setAttribute(
      "aSeed",
      new THREE.BufferAttribute(new Float32Array(geo.attributes.position.count).fill(2.4 + i * 1.7), 1),
    );
    const part = addPart(
      geo, steel,
      [Math.cos(phi) * ORBIT, Math.sin(phi) * ORBIT, 0],
      [Math.cos(phi) * 0.95, Math.sin(phi) * 0.95, 0.9],
      [0.43 + i * 0.016, 0.52 + i * 0.016],
      [0.72, 0, 0.18],
      sampleWeights.planet,
      [lines(blueprintCircle(R_PLANET, R_PLANET * 1.9), blueMat)],
    );
    planetParts.push(part);
  }

  for (let j = 0; j < N_BOLTS; j++) {
    const a = (j / N_BOLTS) * TAU + Math.PI / N_BOLTS;
    addPart(
      geos.bolt, steel,
      [Math.cos(a) * BOLT_RADIUS, Math.sin(a) * BOLT_RADIUS, 0],
      [0, 0, 2.1],
      [0.535 + j * 0.009, 0.605 + j * 0.009],
      [0, 0, 0.38],
      sampleWeights.bolt,
    );
  }

  // Eje común, visible en la etapa de diseño
  const axis = lines(new Float32Array([0, 0, -3.8, 0, 0, 3.8]), blueMat);
  assembly.add(axis);
  await nextFrame();

  // Láser: disco tenue + aro (la línea brillante sobre las piezas la dibuja el shader)
  const laser = new THREE.Group();
  const sheetMat = new THREE.MeshBasicMaterial({
    color: 0x35c6ff, transparent: true, opacity: 0.06, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  const ringMat = new THREE.MeshBasicMaterial({
    color: 0x7fe0ff, transparent: true, opacity: 0.55, side: THREE.DoubleSide, depthWrite: false, blending: THREE.AdditiveBlending,
  });
  laser.add(
    new THREE.Mesh(new THREE.CircleGeometry(3.1, 96).rotateX(-Math.PI / 2), sheetMat),
    new THREE.Mesh(new THREE.RingGeometry(3.06, 3.1, 128).rotateX(-Math.PI / 2), ringMat),
  );
  laser.visible = false;
  scene.add(laser);

  const sparks = new Sparks(opts.coarse ? 34 : 70, dpr0);
  scene.add(sparks.points);

  // ── Postprocesado ──────────────────────────────────────────────────────────
  let composer: EffectComposer | null = null;
  let bloom: UnrealBloomPass | null = null;
  let finalPass: ShaderPass | null = null;
  if (hdrOK) {
    const rt = new THREE.WebGLRenderTarget(2, 2, { type: THREE.HalfFloatType, samples: opts.coarse ? 2 : 4 });
    composer = new EffectComposer(renderer, rt);
    composer.addPass(new RenderPass(scene, camera));
    bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), 0.5, 0.5, 1.5);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    finalPass = new ShaderPass(FinalShader);
    composer.addPass(finalPass);
  }
  let useComposer = false;

  // ── Cámara: recorrido por keyframes ────────────────────────────────────────
  const meshTarget = new THREE.Vector3();
  const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
  const KEYS: CamKey[] = [
    { t: 0.0, pos: V(2.2, 3.8, 16.0), look: V(0, 0.3, 0), fov: 30 },
    { t: 0.2, pos: V(-6.8, 4.8, 13.6), look: V(0, 0.2, 0), fov: 30 },
    { t: 0.38, pos: V(6.6, 5.6, 11.8), look: V(0, 0, 0), fov: 30 },
    { t: 0.55, pos: V(3.6, 4.2, 8.4), look: meshTarget, fov: 27 },
    { t: 0.68, pos: V(-1.9, 4.6, 10.6), look: V(0, 0, 0), fov: 30 },
    { t: 0.84, pos: V(-6.8, 3.6, 9.6), look: V(0, 0, 0), fov: 30 },
    { t: 1.0, pos: V(5.2, 3.2, 10.2), look: V(0, 0, 0), fov: 30 },
  ];
  const camPos = new THREE.Vector3();
  const camLook = new THREE.Vector3();
  const right = new THREE.Vector3();
  const fwd = new THREE.Vector3();
  const UP = new THREE.Vector3(0, 1, 0);

  function sampleKeys(p: number) {
    let i = 0;
    while (i < KEYS.length - 2 && p > KEYS[i + 1].t) i++;
    const k1 = KEYS[i];
    const k2 = KEYS[i + 1];
    const k0 = KEYS[Math.max(0, i - 1)];
    const k3 = KEYS[Math.min(KEYS.length - 1, i + 2)];
    const f = clamp((p - k1.t) / (k2.t - k1.t));
    camPos.set(
      cr(k0.pos.x, k1.pos.x, k2.pos.x, k3.pos.x, f),
      cr(k0.pos.y, k1.pos.y, k2.pos.y, k3.pos.y, f),
      cr(k0.pos.z, k1.pos.z, k2.pos.z, k3.pos.z, f),
    );
    camLook.set(
      cr(k0.look.x, k1.look.x, k2.look.x, k3.look.x, f),
      cr(k0.look.y, k1.look.y, k2.look.y, k3.look.y, f),
      cr(k0.look.z, k1.look.z, k2.look.z, k3.look.z, f),
    );
    return cr(k0.fov, k1.fov, k2.fov, k3.fov, f);
  }

  // ── Interacción ────────────────────────────────────────────────────────────
  const pointer = new THREE.Vector2();
  const pointerS = new THREE.Vector2();
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  };

  // ── Etiquetas de medición ancladas en 3D ───────────────────────────────────
  const anchors: { obj: THREE.Object3D; local: THREE.Vector3 }[] = [
    { obj: ringPart.mesh, local: V(RING_OUTER * Math.cos(0.62), RING_OUTER * Math.sin(0.62), 0.24) },
    { obj: planetParts[0].mesh, local: V(0.74 * Math.cos(0.5), 0.74 * Math.sin(0.5), 0.2) },
    { obj: sunPart.mesh, local: V(0.14, 0, 1.4) },
    { obj: carrierPart.mesh, local: V(0.3, 0, -1.08) },
  ];
  const tmpV = new THREE.Vector3();
  // Ancho de cada etiqueta: se mide solo al cambiar el tamaño (leerlo en cada cuadro forzaría layout)
  let pillW: number[] = [];
  const measureLabels = () => {
    pillW = opts.labels.map((el) => (el.querySelector("[data-pill]") as HTMLElement | null)?.offsetWidth || 140);
  };

  function updateLabels(p: number, w: number, h: number) {
    anchors.forEach((a, i) => {
      const el = opts.labels[i];
      if (!el) return;
      tmpV.copy(a.local);
      a.obj.localToWorld(tmpV);
      const passed = clamp((tmpV.y - uniforms.uScan.value) / 0.35);
      const alpha = smooth(0.66, 0.72, p) * (uniforms.uScan.value < 9 ? passed : 0);
      tmpV.project(camera);
      const x = (tmpV.x * 0.5 + 0.5) * w;
      const y = (-tmpV.y * 0.5 + 0.5) * h;
      el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
      el.style.opacity = alpha.toFixed(3);
      // si la etiqueta no entra a la derecha del punto ancla, se espeja hacia la izquierda
      const flip = x + 29 + (pillW[i] ?? 140) + 10 > w ? "-1" : "1";
      if (el.dataset.fx !== flip) {
        el.dataset.fx = flip;
        el.style.setProperty("--fx", flip);
      }
    });
  }

  // ── Estado y actualización ─────────────────────────────────────────────────
  let progress = 0;
  let shown = 0;
  let time = 0;
  let carrierAngle = 0;
  let shake = 0;
  let running = false;
  let lastNow = 0;
  let w = 1;
  let h = 1;
  const tmpW = new THREE.Vector3();

  const SCAN_TOP = 2.7;
  const SCAN_BOTTOM = -2.7;

  function update(p: number, dt: number, reduce: boolean) {
    // Etapa 1 → 2: del plano a la materia
    const design = 1 - smooth(0.25, 0.36, p);
    blueMat.opacity = 0.75 * design;
    edgeMat.opacity = lerp(0.28, 1, design);
    uniforms.uReveal.value = p >= 0.345 ? 12 : lerp(-4.8, 5.0, smooth(0.2, 0.345, p));
    uniforms.uGlow.value = p >= 0.345 ? 0 : 1;

    // Etapa 2: armado (cada pieza vuela a su lugar y "encaja" con chispas)
    for (const pt of parts) {
      pt.e = 1 - easeOutCubic(win(p, pt.window[0], pt.window[1]));
      if (!reduce && !pt.snapped && p > pt.window[0] && pt.e <= 0.003) {
        pt.snapped = true;
        tmpW.copy(pt.spark);
        pt.mesh.localToWorld(tmpW);
        sparks.burst(tmpW, time);
        shake = Math.max(shake, 0.05);
      } else if (pt.e > 0.03) {
        pt.snapped = false;
      }
    }

    // Cinemática planetaria (corona fija): sol = 5×, planeta = −5/3× el giro del portasatélites
    const run = reduce ? 1 : smooth(0.58, 0.68, p);
    carrierAngle += dt * 0.5 * run;
    const th = carrierAngle;
    carrierPart.mesh.position.copy(carrierPart.base).addScaledVector(carrierPart.explode, carrierPart.e);
    carrierPart.mesh.rotation.z = th + carrierPart.e * 1.6;
    sunPart.mesh.position.copy(sunPart.base).addScaledVector(sunPart.explode, sunPart.e);
    sunPart.mesh.rotation.z = SUN_RATIO * th + sunPart.e * 2.2;
    ringPart.mesh.position.copy(ringPart.base).addScaledVector(ringPart.explode, ringPart.e);
    planetParts.forEach((pl, i) => {
      const a = planetPhi[i] + th;
      pl.mesh.position.set(
        Math.cos(a) * ORBIT + pl.explode.x * pl.e,
        Math.sin(a) * ORBIT + pl.explode.y * pl.e,
        pl.explode.z * pl.e,
      );
      pl.mesh.rotation.z = planetRho[i] + PLANET_RATIO * th + pl.e * 2.6;
    });
    for (const pt of parts.slice(1 + 1 + 1 + N_PLANETS)) {
      pt.mesh.position.copy(pt.base).addScaledVector(pt.explode, pt.e);
      pt.mesh.rotation.z = pt.e * 1.4;
    }
    // (el orden de `parts` es: corona, portasatélites, sol, planetas, bulones)
    assembly.rotation.z = reduce ? 0.3 : time * 0.04 + p * 0.5;

    // Etapa 3: barrido láser
    const scanP = win(p, 0.64, 0.94);
    const scanning = scanP > 0 && scanP < 1;
    uniforms.uScan.value = scanP <= 0 ? 12 : scanP >= 1 ? -12 : lerp(SCAN_TOP, SCAN_BOTTOM, easeOutCubic(scanP * 0.6 + scanP * scanP * 0.4));
    uniforms.uPoints.value = scanP >= 1 ? 0.3 : 1;
    laser.visible = scanning;
    laser.position.y = uniforms.uScan.value;
    const fadeEnds = smooth(0, 0.06, scanP) * (1 - smooth(0.94, 1, scanP));
    sheetMat.opacity = 0.06 * fadeEnds;
    ringMat.opacity = 0.55 * fadeEnds;

    floorMat.uniforms.uFade.value = 1;
    uniforms.uTime.value = time;
    sparks.setTime(time);

    // Cámara: el keyframe de macro apunta al punto de engrane sol–planeta, que se mueve con la pieza
    tilt.updateMatrixWorld(true);
    meshTarget.set(R_SUN, 0, 0.1);
    sunPart.mesh.localToWorld(meshTarget);
    const fov = sampleKeys(p);

    const aspect = w / h;
    const fit = clamp(0.95 / aspect, 1, 2.6);
    camPos.sub(camLook).multiplyScalar(fit).add(camLook);
    fwd.subVectors(camLook, camPos).normalize();
    right.crossVectors(fwd, UP).normalize();
    // desplazamiento como fracción del ancho visible: el modelo queda en el mismo lugar de la pantalla a cualquier zoom
    const visibleW0 = 2 * Math.tan((fov * Math.PI) / 360) * camPos.distanceTo(camLook) * aspect;
    const shift = lerp(0, 0.19, smooth(0.85, 1.55, aspect)) * visibleW0;
    camPos.addScaledVector(right, -shift);
    camLook.addScaledVector(right, -shift);

    if (!reduce) {
      pointerS.lerp(pointer, 1 - Math.exp(-dt * 4));
      if (fine) {
        camPos.addScaledVector(right, pointerS.x * 0.55);
        camPos.y += pointerS.y * 0.35;
      }
      shake *= Math.exp(-dt * 8);
      if (shake > 0.001) {
        camPos.x += Math.sin(time * 71) * shake;
        camPos.y += Math.cos(time * 63) * shake;
      }
    }
    camera.position.copy(camPos);
    camera.fov = fov;
    camera.lookAt(camLook);
    camera.updateProjectionMatrix();

    backdropMat.uniforms.uCenter.value.set(0.5 + shift / visibleW0, 0.5);
    backdropMat.uniforms.uAspect.value = aspect;

    updateLabels(p, w, h);
  }

  function render() {
    if (finalPass) {
      finalPass.uniforms.uTime.value = time;
      finalPass.uniforms.uGrain.value = tier >= 3 ? 1 : 0;
    }
    if (useComposer && composer) composer.render();
    else renderer.render(scene, camera);
  }

  // ── Calidad adaptativa ─────────────────────────────────────────────────────
  const DPR_MAX = [1, 1.25, 1.5, 2];
  function applyTier(t: number) {
    tier = t;
    const dpr = Math.min(window.devicePixelRatio || 1, DPR_MAX[t]);
    renderer.setPixelRatio(dpr);
    composer?.setPixelRatio(dpr);
    pointsMat.uniforms.uPixelRatio.value = dpr;
    sparks.setPixelRatio(dpr);
    useComposer = t >= 2 && !!composer;
    key.castShadow = t >= 2;
    if (bloom) bloom.enabled = t >= 2;
    if (finalPass) finalPass.enabled = t >= 3;
    resize();
  }

  let acc = 0;
  let frames = 0;
  function governor(rawDt: number) {
    if (!governorOn || tier === 0 || rawDt > 0.25) return;
    frames++;
    if (frames < 12) return; // se ignora la compilación inicial
    acc += rawDt;
    if (frames % 50 === 0) {
      const avg = acc / 38;
      acc = 0;
      frames = 12;
      if (avg > 0.028) applyTier(tier - 1);
    }
  }

  function resize() {
    const cw = canvas.clientWidth;
    const ch = canvas.clientHeight;
    if (!cw || !ch) return;
    w = cw;
    h = ch;
    renderer.setSize(cw, ch, false);
    composer?.setSize(cw, ch);
    camera.aspect = cw / ch;
    camera.updateProjectionMatrix();
    measureLabels();
    if (!running) {
      update(shown, 0, true);
      render();
    }
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function frame(now: number) {
    const raw = lastNow ? (now - lastNow) / 1000 : 0.016;
    lastNow = now;
    const dt = clamp(raw, 0, 0.05);
    time += dt;
    shown += (progress - shown) * (1 - Math.exp(-dt * 6.5));
    update(shown, dt, false);
    render();
    governor(raw);
  }

  function start() {
    if (running) return;
    running = true;
    lastNow = 0;
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    renderer.setAnimationLoop(frame);
  }
  function stop() {
    running = false;
    renderer.setAnimationLoop(null);
    window.removeEventListener("pointermove", onPointer);
  }

  applyTier(tier);
  await nextFrame();
  await renderer.compileAsync(scene, camera);
  update(0, 0, true);
  render();

  const api = {
    setProgress(p: number) {
      progress = p;
    },
    /** salta a un progreso sin suavizado y dibuja (pruebas y reduced-motion) */
    jump(p: number, opts2: { time?: number } = {}) {
      progress = p;
      shown = p;
      if (opts2.time !== undefined) time = opts2.time;
      carrierAngle = p > 0.6 ? (p - 0.6) * 6 : 0;
      update(p, 0.0001, false);
      render();
    },
    renderStatic(p: number) {
      progress = p;
      shown = p;
      carrierAngle = 0.4;
      update(p, 0, true);
      render();
    },
    start,
    stop,
    getTier: () => tier,
    dispose() {
      stop();
      ro.disconnect();
      canvas.removeEventListener("webglcontextlost", onLost);
      sparks.dispose();
      pointsMat.dispose();
      [steel, ringSteel, anodized, depthMat, blueMat, edgeMat, floorMat, backdropMat, sheetMat, ringMat].forEach((m) => m.dispose());
      Object.values(geos).forEach((g) => g.dispose());
      disposables.forEach((d) => d.dispose());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.isMesh || (o as THREE.LineSegments).isLineSegments) (m.geometry as THREE.BufferGeometry | undefined)?.dispose?.();
      });
      envTex.dispose();
      composer?.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };

  if (opts.debug || params.has("scandebug")) (window as unknown as { __scan: typeof api }).__scan = api;
  return api;
}

export type GearboxScene = Awaited<ReturnType<typeof createGearboxScene>>;
