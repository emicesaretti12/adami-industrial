import * as THREE from "three";
import { buildStudioEnv } from "../gearbox/env";
import { blueprintCircle, extrude, gearProfile, hole, meshRotation } from "../gearbox/gears";

const TAU = Math.PI * 2;
const M = 0.12;
const rad = (d: number) => (d * Math.PI) / 180;

/** Tren de engranajes: cada uno engrana con su "padre" en la dirección indicada */
const DEFS = [
  { N: 30, parent: -1, dir: 0 },
  { N: 18, parent: 0, dir: rad(32) },
  { N: 12, parent: 1, dir: rad(-25) },
  { N: 24, parent: 0, dir: rad(-40) },
];

function gearGeometry(N: number) {
  const rp = (M * N) / 2;
  const shape = new THREE.Shape(gearProfile({ teeth: N, module: M, thin: 0.002 }));
  shape.holes.push(hole(0, 0, rp * 0.2));
  const lightening = N >= 24 ? 6 : N >= 18 ? 5 : 0;
  for (let i = 0; i < lightening; i++) {
    const a = (i / lightening) * TAU + 0.3;
    shape.holes.push(hole(Math.cos(a) * rp * 0.58, Math.sin(a) * rp * 0.58, rp * 0.13));
  }
  return extrude(shape, 0.3, 32);
}

export async function createClosingGears(canvas: HTMLCanvasElement, opts: { coarse: boolean; getScroll: () => number }) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = THREE.NeutralToneMapping;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  const dprMax = opts.coarse ? 1.25 : 1.75;

  const scene = new THREE.Scene();
  const envTex = buildStudioEnv(renderer);
  scene.environment = envTex;
  const key = new THREE.DirectionalLight(0xffffff, 1.3);
  key.position.set(3, 6, 8);
  scene.add(key);

  const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 60);
  camera.position.set(0, 0, 16);

  const steel = new THREE.MeshStandardMaterial({ color: 0x5f6d7e, metalness: 0.92, roughness: 0.36, envMapIntensity: 0.8 });
  const edgeMat = new THREE.LineBasicMaterial({ color: 0x7fe0ff, transparent: true, opacity: 0.55 });
  const ringMat = new THREE.LineBasicMaterial({ color: 0x5fb4e8, transparent: true, opacity: 0.35 });
  const disposables: { dispose(): void }[] = [steel, edgeMat, ringMat];

  const cluster = new THREE.Group();
  scene.add(cluster);

  // posiciones y fases de engrane; k = relación de giro respecto del engranaje maestro
  const gears: { mesh: THREE.Mesh; rho: number; k: number }[] = [];
  const pos: [number, number][] = [];
  const rho: number[] = [];
  const kk: number[] = [];
  DEFS.forEach((d, i) => {
    const rp = (M * d.N) / 2;
    if (d.parent < 0) {
      pos.push([0, 0]);
      rho.push(0);
      kk.push(1);
    } else {
      const pd = DEFS[d.parent];
      const prp = (M * pd.N) / 2;
      pos.push([pos[d.parent][0] + (prp + rp) * Math.cos(d.dir), pos[d.parent][1] + (prp + rp) * Math.sin(d.dir)]);
      rho.push(meshRotation(rho[d.parent], pd.N, d.dir, d.N));
      kk.push((-kk[d.parent] * pd.N) / d.N);
    }
    const geo = gearGeometry(d.N);
    const mesh = new THREE.Mesh(geo, steel);
    const edges = new THREE.EdgesGeometry(geo, 28);
    const circle = new THREE.BufferGeometry();
    circle.setAttribute("position", new THREE.BufferAttribute(blueprintCircle(rp, rp * 1.25), 3));
    mesh.add(new THREE.LineSegments(edges, edgeMat), new THREE.LineSegments(circle, ringMat));
    mesh.position.set(pos[i][0], pos[i][1], 0);
    cluster.add(mesh);
    gears.push({ mesh, rho: rho[i], k: kk[i] });
    disposables.push(geo, edges, circle);
  });
  cluster.position.set(-0.7, 1.05, 0);

  const pointer = new THREE.Vector2();
  const pointerS = new THREE.Vector2();
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const onPointer = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    pointer.set((e.clientX / window.innerWidth) * 2 - 1, -((e.clientY / window.innerHeight) * 2 - 1));
  };

  let theta = 0;
  let running = false;
  let lastNow = 0;
  let lastScroll = opts.getScroll();
  let time = 0;

  function resize() {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, dprMax));
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // en pantallas angostas el tren se aleja para entrar completo
    camera.position.z = 16 * Math.min(2.2, Math.max(1, 1.1 / camera.aspect));
    camera.updateProjectionMatrix();
    if (!running) draw(0);
  }
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);

  function draw(dt: number) {
    time += dt;
    // El scroll acelera el giro: los engranajes "responden" a la página
    const sc = opts.getScroll();
    const dScroll = sc - lastScroll;
    lastScroll = sc;
    theta += dt * 0.32 + dScroll * 2.4;
    for (const g of gears) g.mesh.rotation.z = g.rho + g.k * theta;

    pointerS.lerp(pointer, 1 - Math.exp(-dt * 3.5));
    cluster.rotation.set(-0.42 + (fine ? pointerS.y * 0.12 : 0), 0.36 + (fine ? pointerS.x * 0.2 : 0) + Math.sin(time * 0.3) * 0.03, 0);
    renderer.render(scene, camera);
  }

  function frame(now: number) {
    const dt = lastNow ? Math.min(0.05, (now - lastNow) / 1000) : 0.016;
    lastNow = now;
    draw(dt);
  }
  function start() {
    if (running) return;
    running = true;
    lastNow = 0;
    lastScroll = opts.getScroll();
    if (fine) window.addEventListener("pointermove", onPointer, { passive: true });
    renderer.setAnimationLoop(frame);
  }
  function stop() {
    running = false;
    renderer.setAnimationLoop(null);
    window.removeEventListener("pointermove", onPointer);
  }

  resize();
  draw(0);

  return {
    start,
    stop,
    renderStatic() {
      theta = 0.6;
      draw(0);
    },
    dispose() {
      stop();
      ro.disconnect();
      disposables.forEach((d) => d.dispose());
      envTex.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    },
  };
}

export type ClosingGearsScene = Awaited<ReturnType<typeof createClosingGears>>;
