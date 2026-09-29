import * as THREE from "three";

const BURSTS = 8;

/**
 * Chispas de mecanizado calculadas 100 % en la GPU.
 * Cada partícula pertenece a una ráfaga (origen + instante); su posición sale de una
 * ecuación balística en el vertex shader, así que no hay nada que actualizar por frame en la CPU.
 */
export class Sparks {
  readonly points: THREE.Points;
  private readonly material: THREE.ShaderMaterial;
  private next = 0;

  constructor(perBurst: number, pixelRatio: number) {
    const count = BURSTS * perBurst;
    const position = new Float32Array(count * 3);
    const dir = new Float32Array(count * 3);
    const speed = new Float32Array(count);
    const life = new Float32Array(count);
    const burst = new Float32Array(count);
    const rand = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // dirección al azar en una esfera, con sesgo hacia arriba
      const u = Math.random() * 2 - 1;
      const a = Math.random() * Math.PI * 2;
      const s = Math.sqrt(1 - u * u);
      dir[i * 3] = Math.cos(a) * s;
      dir[i * 3 + 1] = Math.abs(u) * 0.6 + 0.35;
      dir[i * 3 + 2] = Math.sin(a) * s;
      speed[i] = 1.2 + Math.random() * 3.2;
      life[i] = 0.5 + Math.random() * 0.8;
      burst[i] = Math.floor(i / perBurst);
      rand[i] = Math.random();
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute("position", new THREE.BufferAttribute(position, 3));
    geo.setAttribute("aDir", new THREE.BufferAttribute(dir, 3));
    geo.setAttribute("aSpeed", new THREE.BufferAttribute(speed, 1));
    geo.setAttribute("aLife", new THREE.BufferAttribute(life, 1));
    geo.setAttribute("aBurst", new THREE.BufferAttribute(burst, 1));
    geo.setAttribute("aRand", new THREE.BufferAttribute(rand, 1));

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uSize: { value: 0.12 },
        uPixelRatio: { value: pixelRatio },
        uBurstO: { value: Array.from({ length: BURSTS }, () => new THREE.Vector3()) },
        uBurstT: { value: new Array(BURSTS).fill(-1000) },
      },
      vertexShader: /* glsl */ `
        attribute vec3 aDir;
        attribute float aSpeed;
        attribute float aLife;
        attribute float aBurst;
        attribute float aRand;
        uniform vec3 uBurstO[${BURSTS}];
        uniform float uBurstT[${BURSTS}];
        uniform float uTime;
        uniform float uSize;
        uniform float uPixelRatio;
        varying float vLife;
        void main() {
          int b = int(aBurst + 0.5);
          float t = uTime - uBurstT[b];
          if (t < 0.0 || t > aLife) {
            gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
            gl_PointSize = 0.0;
            vLife = 1.0;
            return;
          }
          vec3 p = uBurstO[b] + aDir * aSpeed * t + vec3(0.0, -1.0, 0.0) * 2.8 * t * t;
          vec4 mv = viewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          vLife = t / aLife;
          gl_PointSize = uSize * uPixelRatio * (1.0 - vLife * 0.6) * (0.6 + aRand * 0.8) * (320.0 / -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        varying float vLife;
        void main() {
          float d = length(gl_PointCoord - 0.5);
          if (d > 0.5) discard;
          float a = smoothstep(0.5, 0.0, d);
          vec3 hot = vec3(1.0, 0.86, 0.55);
          vec3 cool = vec3(1.0, 0.32, 0.08);
          vec3 col = mix(hot, cool, vLife);
          gl_FragColor = vec4(col * (2.6 * (1.0 - vLife) + 0.5), a * (1.0 - vLife));
        }`,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });

    this.points = new THREE.Points(geo, this.material);
    this.points.frustumCulled = false;
  }

  burst(origin: THREE.Vector3, time: number) {
    const k = this.next++ % BURSTS;
    (this.material.uniforms.uBurstO.value as THREE.Vector3[])[k].copy(origin);
    (this.material.uniforms.uBurstT.value as number[])[k] = time;
  }

  setTime(t: number) {
    this.material.uniforms.uTime.value = t;
  }

  setPixelRatio(r: number) {
    this.material.uniforms.uPixelRatio.value = r;
  }

  dispose() {
    this.points.geometry.dispose();
    this.material.dispose();
  }
}
