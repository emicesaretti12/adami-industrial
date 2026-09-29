import * as THREE from "three";

type U = { value: number };

/** Uniformes compartidos por todos los materiales de la escena */
export interface SceneUniforms {
  /** el metal existe solo por debajo de este Y de mundo (frente de materialización) */
  uReveal: U;
  /** el láser está en este Y; por encima ya está medido (mapa de desviación) */
  uScan: U;
  /** intensidad del brillo del frente de materialización */
  uGlow: U;
  /** brillo de la nube de puntos */
  uPoints: U;
  uTime: U;
}

export function createUniforms(): SceneUniforms {
  return {
    uReveal: { value: -10 },
    uScan: { value: 10 },
    uGlow: { value: 1 },
    uPoints: { value: 1 },
    uTime: { value: 0 },
  };
}

/** Escala de color de un informe de desviación (azul → verde → amarillo → rojo) */
const HEAT_GLSL = /* glsl */ `
vec3 devColor(float t) {
  vec3 c0 = vec3(0.10, 0.28, 0.95);
  vec3 c1 = vec3(0.06, 0.78, 0.92);
  vec3 c2 = vec3(0.16, 0.85, 0.34);
  vec3 c3 = vec3(0.98, 0.84, 0.16);
  vec3 c4 = vec3(0.96, 0.22, 0.16);
  float x = clamp(t, 0.0, 1.0) * 4.0;
  if (x < 1.0) return mix(c0, c1, x);
  if (x < 2.0) return mix(c1, c2, x - 1.0);
  if (x < 3.0) return mix(c2, c3, x - 2.0);
  return mix(c3, c4, x - 3.0);
}
float deviation(vec3 p, float s) {
  float d = sin(p.x * 4.3 + s * 2.1) * cos(p.y * 3.9 - s * 1.7) * 0.55
          + sin(p.z * 7.0 + p.x * 2.5 + s) * 0.25
          + sin(atan(p.y, p.x) * 5.0 + s * 3.0) * 0.20;
  return clamp(0.5 + d * 0.5, 0.0, 1.0);
}
`;

/**
 * Metal mecanizado. Un mismo material resuelve, según el Y de mundo de cada fragmento:
 *   arriba del frente de materialización → descartado (queda solo el trazo de plano)
 *   sobre el frente                      → brillo cian
 *   bajo el láser                        → acero con estrías de torneado
 *   sobre el láser                       → mapa de desviación
 *   en el láser                          → línea de emisión HDR (la levanta el bloom)
 */
export function createSteelMaterial(
  uniforms: SceneUniforms,
  opts: { color: number; roughness: number; envMapIntensity?: number },
) {
  const mat = new THREE.MeshStandardMaterial({
    color: opts.color,
    metalness: 0.94,
    roughness: opts.roughness,
    envMapIntensity: opts.envMapIntensity ?? 1.15,
  });

  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, uniforms);

    shader.vertexShader = shader.vertexShader
      .replace(
        "#include <common>",
        `#include <common>
        attribute float aSeed;
        varying vec3 vWorld;
        varying vec3 vLocal;
        varying float vSeed;
        varying vec3 vNormalL;
        varying vec3 vRadialW;`,
      )
      .replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>
        vLocal = position;
        vSeed = aSeed;
        vNormalL = normal;
        float rl = length(position.xy);
        vec3 radial = rl > 1e-4 ? vec3(position.xy / rl, 0.0) : vec3(1.0, 0.0, 0.0);
        vRadialW = normalize((modelMatrix * vec4(radial, 0.0)).xyz);
        vWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;`,
      );

    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
        uniform float uReveal;
        uniform float uScan;
        uniform float uGlow;
        varying vec3 vWorld;
        varying vec3 vLocal;
        varying float vSeed;
        varying vec3 vNormalL;
        varying vec3 vRadialW;
        ${HEAT_GLSL}`,
      )
      .replace(
        "#include <clipping_planes_fragment>",
        `#include <clipping_planes_fragment>
        if (vWorld.y > uReveal) discard;`,
      )
      .replace(
        "#include <color_fragment>",
        `#include <color_fragment>
        float scanned = smoothstep(uScan - 0.03, uScan + 0.03, vWorld.y);
        vec3 heatCol = devColor(deviation(vLocal, vSeed));
        diffuseColor.rgb = mix(diffuseColor.rgb, heatCol * 0.62, scanned);`,
      )
      .replace(
        "#include <roughnessmap_fragment>",
        `#include <roughnessmap_fragment>
        // Estrías de torneado: se atenúan solas cuando son más finas que un píxel (evita el parpadeo al mover la cámara)
        float rGroove = length(vLocal.xy) * 150.0 + vSeed * 4.0;
        float aaG = 1.0 - smoothstep(0.8, 2.4, fwidth(rGroove));
        roughnessFactor = clamp(roughnessFactor + sin(rGroove) * 0.05 * aaG, 0.06, 1.0);
        roughnessFactor = mix(roughnessFactor, 0.62, scanned);`,
      )
      .replace(
        "#include <normal_fragment_maps>",
        `#include <normal_fragment_maps>
        // Las estrías inclinan la normal en sentido radial: el reflejo se parte en anillos que cambian al orbitar
        float faceMask = smoothstep(0.8, 0.98, abs(vNormalL.z));
        vec3 radialV = normalize((viewMatrix * vec4(vRadialW, 0.0)).xyz);
        normal = normalize(normal + radialV * cos(rGroove) * 0.045 * aaG * faceMask * (1.0 - scanned));`,
      )
      .replace(
        "#include <metalnessmap_fragment>",
        `#include <metalnessmap_fragment>
        metalnessFactor = mix(metalnessFactor, 0.04, scanned);`,
      )
      .replace(
        "#include <emissivemap_fragment>",
        `#include <emissivemap_fragment>
        float laserOn = step(uScan, 9.0);
        float dl = vWorld.y - uScan;
        totalEmissiveRadiance += vec3(0.25, 0.95, 1.0) * exp(-dl * dl * 2600.0) * laserOn * 7.0;
        totalEmissiveRadiance += heatCol * 0.32 * scanned;
        float rd = uReveal - vWorld.y;
        totalEmissiveRadiance += vec3(0.30, 0.72, 1.0) * exp(-rd * rd * 700.0) * uGlow * 3.2;`,
      );
  };

  mat.customProgramCacheKey = () => "adami-steel-v1";
  return mat;
}

/** Nube de puntos medidos: destella al pasar el láser y queda tenue con el color de la desviación */
export function createPointsMaterial(uniforms: SceneUniforms, size: number, pixelRatio: number) {
  return new THREE.ShaderMaterial({
    uniforms: {
      uScan: uniforms.uScan,
      uPoints: uniforms.uPoints,
      uSize: { value: size },
      uPixelRatio: { value: pixelRatio },
    },
    vertexShader: /* glsl */ `
      attribute float aSeed;
      attribute float aRand;
      uniform float uScan;
      uniform float uSize;
      uniform float uPixelRatio;
      uniform float uPoints;
      varying vec3 vCol;
      varying float vAlpha;
      ${HEAT_GLSL}
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        float since = wp.y - uScan;
        float on = step(0.0, since) * step(uScan, 9.0);
        float pop = exp(-max(since, 0.0) * 2.2);
        vec4 mv = viewMatrix * wp;
        gl_Position = projectionMatrix * mv;
        gl_PointSize = on * uSize * (0.6 + 2.6 * pop) * (0.7 + 0.6 * aRand) * uPixelRatio * (320.0 / -mv.z);
        vCol = mix(devColor(deviation(position, aSeed)), vec3(0.85, 0.97, 1.0), pop);
        vAlpha = on * (0.2 + 0.8 * pop) * uPoints;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vCol;
      varying float vAlpha;
      void main() {
        float d = length(gl_PointCoord - 0.5);
        if (d > 0.5) discard;
        float a = smoothstep(0.5, 0.0, d);
        gl_FragColor = vec4(vCol * (1.0 + a * 1.4), a * vAlpha);
      }`,
    transparent: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
}

/** Piso de metrología: grilla que se desvanece con la distancia */
export function createFloorMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: { uFade: { value: 1 } },
    vertexShader: /* glsl */ `
      varying vec3 vW;
      void main() {
        vec4 wp = modelMatrix * vec4(position, 1.0);
        vW = wp.xyz;
        gl_Position = projectionMatrix * viewMatrix * wp;
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vW;
      uniform float uFade;
      float grid(vec2 p, float s) {
        vec2 q = p / s;
        vec2 g = abs(fract(q - 0.5) - 0.5) / fwidth(q);
        return 1.0 - min(min(g.x, g.y), 1.0);
      }
      void main() {
        float r = length(vW.xz);
        float fade = smoothstep(13.0, 2.5, r);
        float g = grid(vW.xz, 1.0) * 0.35 + grid(vW.xz, 5.0) * 0.8;
        float ring = smoothstep(0.03, 0.0, abs(r - 4.6)) * 0.6;
        vec3 col = vec3(0.22, 0.48, 0.78);
        gl_FragColor = vec4(col, (g * 0.55 + ring) * fade * uFade);
      }`,
    transparent: true,
    depthWrite: false,
  });
}

/** Fondo: gradiente radial en pantalla, con el mismo azul de la sección en los bordes (sin costuras) */
export function createBackdropMaterial() {
  return new THREE.ShaderMaterial({
    uniforms: {
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uAspect: { value: 1 },
      uInner: { value: new THREE.Color("#173a5c") },
      uOuter: { value: new THREE.Color("#0c1a29") },
    },
    vertexShader: /* glsl */ `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position.xy, 0.0, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec2 vUv;
      uniform vec2 uCenter;
      uniform float uAspect;
      uniform vec3 uInner;
      uniform vec3 uOuter;
      void main() {
        vec2 p = vUv - uCenter;
        p.x *= uAspect;
        float d = length(p);
        gl_FragColor = vec4(mix(uInner, uOuter, smoothstep(0.0, 0.85, d)), 1.0);
      }`,
    depthTest: false,
    depthWrite: false,
  });
}

/** Pasada final: aberración cromática leve en los bordes y grano de película */
export const FinalShader = {
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uGrain: { value: 1 },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }`,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uGrain;
    varying vec2 vUv;
    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }
    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);
      vec2 off = c * r2 * 0.0035;
      vec3 col;
      col.r = texture2D(tDiffuse, vUv + off).r;
      col.g = texture2D(tDiffuse, vUv).g;
      col.b = texture2D(tDiffuse, vUv - off).b;
      col += (hash(vUv * 900.0 + fract(uTime) * 37.0) - 0.5) * 0.022 * uGrain;
      gl_FragColor = vec4(col, 1.0);
    }`,
};

/** Profundidad para las sombras: respeta el frente de materialización (lo que aún no existe no proyecta sombra) */
export function createDepthMaterial(uniforms: SceneUniforms) {
  const m = new THREE.MeshDepthMaterial({ depthPacking: THREE.RGBADepthPacking });
  m.onBeforeCompile = (shader) => {
    shader.uniforms.uReveal = uniforms.uReveal;
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", "#include <common>\nvarying vec3 vWorld;")
      .replace("#include <begin_vertex>", "#include <begin_vertex>\nvWorld = (modelMatrix * vec4(transformed, 1.0)).xyz;");
    shader.fragmentShader = shader.fragmentShader
      .replace("#include <common>", "#include <common>\nuniform float uReveal;\nvarying vec3 vWorld;")
      .replace("#include <clipping_planes_fragment>", "#include <clipping_planes_fragment>\nif (vWorld.y > uReveal) discard;");
  };
  m.customProgramCacheKey = () => "adami-depth-v1";
  return m;
}
