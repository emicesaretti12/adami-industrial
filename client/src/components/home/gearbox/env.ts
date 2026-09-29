import * as THREE from "three";

/**
 * Entorno de estudio para los reflejos del metal: una sala oscura con tiras de luz.
 * Las tiras largas son las que dibujan esas franjas brillantes típicas de una pieza mecanizada.
 */
export function buildStudioEnv(renderer: THREE.WebGLRenderer) {
  const s = new THREE.Scene();
  const disposables: { dispose(): void }[] = [];

  // Sala con degradé (piso oscuro → horizonte azulado → techo claro): da tonos intermedios a los flancos del metal
  const roomMat = new THREE.ShaderMaterial({
    side: THREE.BackSide,
    depthWrite: false,
    vertexShader: /* glsl */ `
      varying vec3 vP;
      void main() {
        vP = normalize(position);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }`,
    fragmentShader: /* glsl */ `
      varying vec3 vP;
      void main() {
        float h = vP.y * 0.5 + 0.5;
        vec3 c = mix(vec3(0.012, 0.02, 0.03), vec3(0.10, 0.135, 0.18), smoothstep(0.0, 0.5, h));
        c = mix(c, vec3(0.22, 0.29, 0.38), smoothstep(0.5, 1.0, h));
        gl_FragColor = vec4(c, 1.0);
      }`,
  });
  const room = new THREE.Mesh(new THREE.SphereGeometry(14, 32, 16), roomMat);
  s.add(room);
  disposables.push(room.geometry, roomMat);

  const panel = (w: number, h: number, pos: [number, number, number], color: number, power: number) => {
    const m = new THREE.Mesh(
      new THREE.PlaneGeometry(w, h),
      new THREE.MeshBasicMaterial({ color: new THREE.Color(color).multiplyScalar(power), side: THREE.DoubleSide }),
    );
    m.position.set(...pos);
    m.lookAt(0, 0, 0);
    s.add(m);
    disposables.push(m.geometry, m.material as THREE.Material);
  };

  panel(8, 5, [0, 6.6, 1], 0xffffff, 1.6); // caja de luz superior
  panel(1.4, 8, [-9, 1, 4], 0xf4f8ff, 3.0); // tira vertical izquierda
  panel(1.1, 7, [9, 0.5, -3], 0x7fd8ff, 3.6); // contraluz cian
  panel(7, 1.0, [0, -5, 7], 0xffc98a, 1.1); // relleno cálido bajo
  panel(1.8, 5, [6, 3, 8], 0xffffff, 2.2); // tira frontal derecha

  const pmrem = new THREE.PMREMGenerator(renderer);
  const rt = pmrem.fromScene(s, 0.025);
  pmrem.dispose();
  disposables.forEach((d) => d.dispose());
  return rt.texture;
}
