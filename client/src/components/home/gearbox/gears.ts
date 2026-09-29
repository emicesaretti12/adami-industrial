import * as THREE from "three";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";

const TAU = Math.PI * 2;
const inv = (a: number) => Math.tan(a) - a;

/* ── Parámetros del reductor planetario ──────────────────────────────────────
   Condición de armado: (Nsol + Ncorona) / nº de planetas debe ser entero → (12 + 48) / 3 = 20 ✓
   Corona = Nsol + 2·Nplaneta → 12 + 2·18 = 48 ✓                                                    */
export const MODULE = 0.075;
export const N_SUN = 12;
export const N_PLANET = 18;
export const N_RING = 48;
export const N_PLANETS = 3;

const pitchR = (n: number) => (MODULE * n) / 2;
export const R_SUN = pitchR(N_SUN); // 0,45
export const R_PLANET = pitchR(N_PLANET); // 0,675
export const R_RING = pitchR(N_RING); // 1,8
export const ORBIT = R_SUN + R_PLANET; // 1,125
export const RING_OUTER = 2.2;
export const BOLT_RADIUS = 2.03;
export const N_BOLTS = 6;

/** Relaciones cinemáticas con la corona fija: sol = 5·portasatélites; planeta gira −5/3·portasatélites */
export const SUN_RATIO = 1 + N_RING / N_SUN;
export const PLANET_RATIO = -(N_RING / N_PLANET - 1);

interface GearProfileOpts {
  teeth: number;
  module: number;
  pressure?: number;
  addendum?: number;
  dedendum?: number;
  /** ángulo (rad) que se le quita a cada semidiente: holgura entre flancos */
  thin?: number;
  /** giro del perfil completo */
  phase?: number;
  flankSteps?: number;
}

/**
 * Contorno de un engranaje con perfil de evolvente (sentido antihorario).
 * Espesor angular del semidiente a radio r:  π/2N + inv(α) − inv(acos(rb/r))
 * Con 12 dientes hay socavado: bajo el círculo base el flanco baja en línea recta.
 */
export function gearProfile(o: GearProfileOpts): THREE.Vector2[] {
  const N = o.teeth;
  const m = o.module;
  const alpha = ((o.pressure ?? 20) * Math.PI) / 180;
  const rp = (m * N) / 2;
  const rb = rp * Math.cos(alpha);
  const ra = rp + (o.addendum ?? 1) * m;
  const rf = rp - (o.dedendum ?? 1.25) * m;
  const thin = o.thin ?? 0;
  const steps = o.flankSteps ?? 5;
  const phase = o.phase ?? 0;
  const r0 = Math.max(rb, rf);
  const half = (r: number) => Math.PI / (2 * N) + inv(alpha) - inv(Math.acos(Math.min(1, rb / r))) - thin;
  const pitch = TAU / N;

  const pts: THREE.Vector2[] = [];
  const P = (r: number, a: number) => pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));

  for (let k = 0; k < N; k++) {
    const c = phase + k * pitch;
    if (rf < r0) P(rf, c - half(r0));
    for (let j = 0; j <= steps; j++) P(r0 + ((ra - r0) * j) / steps, c - half(r0 + ((ra - r0) * j) / steps));
    const tip = half(ra);
    P(ra, c - tip * 0.34);
    P(ra, c + tip * 0.34);
    for (let j = steps; j >= 0; j--) P(r0 + ((ra - r0) * j) / steps, c + half(r0 + ((ra - r0) * j) / steps));
    if (rf < r0) P(rf, c + half(r0));
    // arco de raíz hasta el diente siguiente
    const aEnd = c + half(r0);
    const aNext = c + pitch - half(r0);
    for (let j = 1; j < 3; j++) P(rf, aEnd + ((aNext - aEnd) * j) / 3);
  }
  return pts;
}

/**
 * Giro que necesita un engranaje B para engranar con A en la dirección `dir` (medida desde A).
 * f = fracción de paso: 0 = centro de diente, 0,5 = centro de hueco.  Se cumple f_B = 0,5 − f_A.
 */
export function meshRotation(rotA: number, nA: number, dir: number, nB: number) {
  const dA = TAU / nA;
  const dB = TAU / nB;
  const mod = (x: number, m: number) => ((x % m) + m) % m;
  const fA = mod(dir - rotA, dA) / dA;
  const fB = mod(0.5 - fA, 1);
  return dir + Math.PI - fB * dB;
}

/* ── Utilidades de geometría ── */
const hole = (x: number, y: number, r: number) => {
  const p = new THREE.Path();
  p.absarc(x, y, r, 0, TAU, true);
  return p;
};

function extrude(shape: THREE.Shape, depth: number, curveSegments = 28) {
  const g = new THREE.ExtrudeGeometry(shape, {
    depth,
    steps: 1,
    curveSegments,
    // chaflán hacia adentro: el contorno máximo respeta la medida nominal y los engranajes engranan sin solaparse
    bevelEnabled: true,
    bevelThickness: 0.011,
    bevelSize: 0.006,
    bevelOffset: -0.006,
    bevelSegments: 1,
  });
  g.translate(0, 0, -depth / 2);
  return g;
}

const nonIndexed = (g: THREE.BufferGeometry) => (g.index ? g.toNonIndexed() : g);

function merge(list: THREE.BufferGeometry[]) {
  const out = mergeGeometries(list.map(nonIndexed), false);
  if (!out) throw new Error("No se pudo unir la geometría");
  list.forEach((g) => g.dispose());
  return out;
}

function withSeed(g: THREE.BufferGeometry, seed: number) {
  const n = g.attributes.position.count;
  g.setAttribute("aSeed", new THREE.BufferAttribute(new Float32Array(n).fill(seed), 1));
  return g;
}

/** Cápsula alineada al eje X, de longitud `len` y radio `r` en cada extremo */
function capsule(len: number, r: number, seg = 16) {
  const pts: THREE.Vector2[] = [];
  for (let i = 0; i <= seg; i++) {
    const a = Math.PI / 2 + (i / seg) * Math.PI;
    pts.push(new THREE.Vector2(Math.cos(a) * r, Math.sin(a) * r));
  }
  for (let i = 0; i <= seg; i++) {
    const a = -Math.PI / 2 + (i / seg) * Math.PI;
    pts.push(new THREE.Vector2(len + Math.cos(a) * r, Math.sin(a) * r));
  }
  return new THREE.Shape(pts);
}

const cylZ = (r: number, len: number, z: number, radial = 40) => {
  const g = new THREE.CylinderGeometry(r, r, len, radial).rotateX(Math.PI / 2);
  g.translate(0, 0, z);
  return g;
};

export function buildGearboxGeometries() {
  // Sol + eje de entrada
  const sunGear = extrude(new THREE.Shape(gearProfile({ teeth: N_SUN, module: MODULE, thin: 0.0016 })), 0.34);
  const sun = withSeed(merge([sunGear, cylZ(0.14, 1.3, 0.8, 48), cylZ(0.2, 0.1, 0.22, 48)]), 0.7);

  // Planeta (con alojamiento para el eje del portasatélites)
  const planetShape = new THREE.Shape(gearProfile({ teeth: N_PLANET, module: MODULE, thin: 0.0016 }));
  planetShape.holes.push(hole(0, 0, 0.11));
  const planet = extrude(planetShape, 0.34);

  // Corona interna: el vacío es un perfil de evolvente con la misma cantidad de dientes,
  // girado medio paso para que haya un diente de corona a 0°, 120° y 240° (donde están los planetas)
  const ringShape = new THREE.Shape();
  ringShape.absarc(0, 0, RING_OUTER, 0, TAU, false);
  ringShape.holes.push(
    new THREE.Path(
      gearProfile({
        teeth: N_RING,
        module: MODULE,
        addendum: 1.25,
        dedendum: 1.0,
        phase: Math.PI / N_RING,
        thin: -0.0016,
      }),
    ),
  );
  for (let j = 0; j < N_BOLTS; j++) {
    const a = (j / N_BOLTS) * TAU + Math.PI / N_BOLTS;
    ringShape.holes.push(hole(Math.cos(a) * BOLT_RADIUS, Math.sin(a) * BOLT_RADIUS, 0.052));
  }
  const ring = withSeed(extrude(ringShape, 0.42, 40), 1.9);

  // Portasatélites: tres brazos + cubo + tres ejes de planeta + eje de salida
  const parts: THREE.BufferGeometry[] = [];
  for (let i = 0; i < N_PLANETS; i++) {
    const a = (i / N_PLANETS) * TAU;
    const arm = extrude(capsule(ORBIT, 0.17), 0.08);
    arm.rotateZ(a);
    parts.push(arm);
    parts.push(cylZ(0.1, 0.5, 0.22, 32).translate(Math.cos(a) * ORBIT, Math.sin(a) * ORBIT, 0));
  }
  const hubDisc = new THREE.Shape();
  hubDisc.absarc(0, 0, 0.42, 0, TAU, false);
  parts.push(extrude(hubDisc, 0.08, 48));
  parts.push(cylZ(0.3, 1.05, -0.56, 48));
  const carrier = withSeed(merge(parts), 3.3);

  // Bulón hexagonal
  const bolt = withSeed(
    merge([cylZ(0.037, 0.66, 0, 20), cylZ(0.064, 0.055, 0.36, 6)]),
    5.1,
  );

  return { sun, planet, ring, carrier, bolt };
}

/** Segmentos (pares de puntos) para el trazo "de plano": circunferencia primitiva y ejes */
export function blueprintCircle(radius: number, axisExtent: number, segments = 96) {
  const v: number[] = [];
  for (let i = 0; i < segments; i++) {
    const a0 = (i / segments) * TAU;
    const a1 = ((i + 1) / segments) * TAU;
    v.push(Math.cos(a0) * radius, Math.sin(a0) * radius, 0, Math.cos(a1) * radius, Math.sin(a1) * radius, 0);
  }
  v.push(-axisExtent, 0, 0, axisExtent, 0, 0, 0, -axisExtent, 0, 0, axisExtent, 0);
  return new Float32Array(v);
}

/** Cota de diámetro sobre la corona: línea, líneas de extensión y flechas */
export function dimensionLine(radius: number) {
  const y = radius + 0.42;
  const e = 0.05;
  const v = [
    -radius, y, 0, radius, y, 0,
    -radius, radius * 0.18, 0, -radius, y + 0.1, 0,
    radius, radius * 0.18, 0, radius, y + 0.1, 0,
    -radius, y, 0, -radius + 0.16, y + e, 0,
    -radius, y, 0, -radius + 0.16, y - e, 0,
    radius, y, 0, radius - 0.16, y + e, 0,
    radius, y, 0, radius - 0.16, y - e, 0,
  ];
  return new Float32Array(v);
}
