import type { CSSProperties, ReactNode } from "react";

/**
 * Pictogramas técnicos de cada sector, dibujados con trazo fino como un plano.
 * - Cada trazo tiene pathLength=1: con CSS (.dr) se "dibuja" solo al aparecer, escalonado por --i.
 * - Los movimientos propios (giro de turbina y rueda, órbitas, llama, granos) son CSS/SMIL y solo existen
 *   mientras el pictograma está montado, es decir, mientras su sector está activo.
 */
const S = (i: number) => ({ "--i": i }) as CSSProperties;

const circ = (cx: number, cy: number, r: number) =>
  `M${cx - r} ${cy}a${r} ${r} 0 1 0 ${2 * r} 0a${r} ${r} 0 1 0 ${-2 * r} 0`;
const ell = (cx: number, cy: number, rx: number, ry: number) =>
  `M${cx - rx} ${cy}a${rx} ${ry} 0 1 0 ${2 * rx} 0a${rx} ${ry} 0 1 0 ${-2 * rx} 0`;

function L({ d, i = 0, className = "", transform }: { d: string; i?: number; className?: string; transform?: string }) {
  return <path d={d} pathLength={1} transform={transform} className={`dr ${className}`} style={S(i)} />;
}

function Frame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 240 240"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="butt"
      strokeLinejoin="round"
      className="h-full w-full overflow-visible"
      aria-hidden="true"
    >
      {/* Guías de plano: círculo de referencia y marcas de ejes */}
      <g opacity={0.28}>
        <L d={circ(120, 120, 114)} />
        <L d="M120 2V18M120 222V238M2 120H18M222 120H238" i={1} />
      </g>
      {children}
    </svg>
  );
}

/** Agroindustria: silo con escalera y granos que caen */
export function Silo() {
  return (
    <Frame>
      <L d="M74 98L120 58L166 98Z" i={2} />
      <L d="M120 58V44M112 44H128" i={3} />
      <L d="M84 98V182M156 98V182" i={4} />
      <L d="M84 120H156M84 142H156M84 164H156" i={5} />
      <L d="M84 182H156M92 182L87 204M148 182L153 204M78 204H162" i={6} />
      <L d="M174 104V204M184 104V204M174 118H184M174 134H184M174 150H184M174 166H184M174 182H184" i={7} />
      <L d="M120 182V192M114 192H126" i={8} />
      {[0, 1, 2].map((k) => (
        <circle key={k} cx={120} cy={196} r={2.3} fill="currentColor" stroke="none" className="picto-drop" style={S(k)} />
      ))}
    </Frame>
  );
}

const bottle = (x: number) =>
  `M${x - 13} 178V144Q${x - 13} 131 ${x - 5} 125V108H${x + 5}V125Q${x + 13} 131 ${x + 13} 144V178Z`;

/** Alimenticia: línea de envasado con cinta, botellas y dosificador */
export function Bottling() {
  return (
    <Frame>
      <L d="M50 180H190a9 9 0 0 1 0 18H50a9 9 0 0 1 0-18Z" i={2} />
      <L d="M80 198V216M160 198V216M70 216H90M150 216H170" i={3} />
      <L d={bottle(78)} i={4} />
      <L d={bottle(120)} i={5} />
      <L d={bottle(162)} i={6} />
      <L d="M72 104H84M114 104H126M156 104H168" i={7} />
      <L d="M65 154H91M65 168H91M107 154H133M107 168H133M149 154H175M149 168H175" i={8} />
      <L d="M90 40H150V64H90Z" i={9} />
      <L d="M120 64V76M112 76H128L124 90H116Z" i={10} />
      <g className="picto-late">
        <path d="M58 189H182" className="picto-belt" opacity={0.7} />
      </g>
      <circle cx={120} cy={96} r={2.4} fill="currentColor" stroke="none" className="picto-drop" style={S(0)} />
    </Frame>
  );
}

/** Aeroespacial: cohete con llama y un satélite en órbita */
export function Rocket() {
  const orbit = ell(120, 120, 112, 34);
  return (
    <Frame>
      <g transform="rotate(-24 120 120)">
        <L d={orbit} i={2} className="opacity-60" />
        <g className="picto-late">
          <circle r={4.5} fill="currentColor" stroke="none">
            <animateMotion dur="7s" repeatCount="indefinite" path={orbit} />
          </circle>
        </g>
      </g>
      <L d="M120 34C142 60 148 94 148 128V160H92V128C92 94 98 60 120 34Z" i={3} />
      <L d={circ(120, 100, 10)} i={4} />
      <L d="M92 128H148" i={5} />
      <L d="M92 132L68 164V186L92 168M148 132L172 164V186L148 168" i={6} />
      <L d="M104 160L100 174H140L136 160" i={7} />
      <L d="M44 62h8M48 58v8M196 190h8M200 186v8M206 60h6M209 57v6" i={8} className="opacity-50" />
      <g className="picto-late">
        <g className="picto-flame">
          <path d="M108 178Q120 214 132 178" />
          <path d="M114 180Q120 200 126 180" />
        </g>
      </g>
    </Frame>
  );
}

/** Aeronáutica: turbina de avión vista de frente, con las paletas girando */
export function Turbofan() {
  const blade = "M117 96C113 76 111 56 114 36H126C129 56 127 76 123 96Z";
  return (
    <Frame>
      <L d={circ(120, 120, 98)} i={2} />
      <L d={circ(120, 120, 90)} i={3} />
      <g className="picto-spin">
        {Array.from({ length: 16 }, (_, k) => (
          <L key={k} d={blade} i={4 + k * 0.45} transform={`rotate(${k * 22.5} 120 120)`} />
        ))}
        <L d={circ(120, 120, 24)} i={12} />
        <L d={circ(120, 120, 11)} i={13} />
      </g>
    </Frame>
  );
}

/** Automotriz: rueda con banda de rodamiento fija y llanta que gira */
export function Wheel() {
  const tread = Array.from({ length: 28 }, (_, k) => {
    const a = (k / 28) * Math.PI * 2;
    const c = Math.cos(a);
    const s = Math.sin(a);
    return `M${(120 + c * 90).toFixed(1)} ${(120 + s * 90).toFixed(1)}L${(120 + c * 98).toFixed(1)} ${(120 + s * 98).toFixed(1)}`;
  }).join("");
  const spoke = "M113 104L108 62Q120 56 132 62L127 104Z";
  return (
    <Frame>
      <L d={circ(120, 120, 98)} i={2} />
      <L d={circ(120, 120, 88)} i={3} />
      <L d={tread} i={4} />
      <g className="picto-spin" style={{ animationDuration: "12s" }}>
        <L d={circ(120, 120, 68)} i={5} />
        <L d={circ(120, 120, 62)} i={6} />
        {Array.from({ length: 5 }, (_, k) => (
          <L key={k} d={spoke} i={7 + k * 0.6} transform={`rotate(${k * 72} 120 120)`} />
        ))}
        <L d={circ(120, 120, 18)} i={11} />
        {Array.from({ length: 5 }, (_, k) => {
          const a = ((-90 + k * 72) * Math.PI) / 180;
          return <L key={k} d={circ(120 + Math.cos(a) * 10.5, 120 + Math.sin(a) * 10.5, 2.4)} i={12} />;
        })}
      </g>
    </Frame>
  );
}

/** Nuclear: átomo con tres órbitas y un electrón en cada una */
export function Atom() {
  const orbit = ell(120, 120, 106, 38);
  return (
    <Frame>
      {[0, 60, 120].map((a, k) => (
        <g key={a} transform={`rotate(${a} 120 120)`}>
          <L d={orbit} i={2 + k} />
          <g className="picto-late">
            <circle r={4.5} fill="currentColor" stroke="none">
              <animateMotion dur={`${5 + k * 1.3}s`} repeatCount="indefinite" path={orbit} />
            </circle>
          </g>
        </g>
      ))}
      <L d={circ(120, 120, 10)} i={6} />
      <g className="picto-late">
        <circle cx={120} cy={120} r={4.5} fill="currentColor" stroke="none" />
      </g>
    </Frame>
  );
}

/** Minería: vagoneta cargada sobre rieles; ruedas que giran y durmientes que pasan */
export function MineCart() {
  const wheel = (cx: number) => (
    <g className="picto-spin-local">
      <L d={circ(cx, 170, 12)} i={9} />
      <L d={`M${cx - 12} 170H${cx + 12}M${cx} 158V182`} i={10} />
      <L d={circ(cx, 170, 3)} i={10} />
    </g>
  );
  return (
    <Frame>
      <L d="M60 106H180" i={2} />
      <L d="M66 106L78 158H162L174 106" i={3} />
      <L d="M72 132H168M84 106L90 158M150 106L144 158" i={4} className="opacity-60" />
      <L d="M70 106L82 88L96 96L110 80L126 92L140 82L154 94L170 106" i={5} />
      <L d="M96 96L104 106M126 92L120 106M140 82L146 94" i={6} className="opacity-60" />
      <L d="M40 184H200" i={7} />
      <L d="M40 190H200" i={8} className="opacity-70" />
      {wheel(100)}
      {wheel(140)}
      <g className="picto-late">
        <path d="M36 197H204" className="picto-ties" opacity={0.6} />
      </g>
      <L d="M178 40L206 68M170 56Q186 34 204 36Q196 50 190 60" i={11} className="opacity-70" />
    </Frame>
  );
}

/** Petróleo: bomba de balancín (cigüeñal girando, balancín que cabecea y vástago que sube y baja) */
export function PumpJack() {
  return (
    <Frame>
      <L d="M36 196H204" i={2} />
      <L d="M104 196L120 90L136 196M110 158H130" i={3} />
      <L d="M44 176H62V196H44ZM40 184H66" i={4} />
      <L d="M156 168H186V196H156Z" i={5} />
      <g className="pj-crank" style={{ transformOrigin: "171px 168px" }}>
        <L d="M171 168L171 146M171 146a9 9 0 1 0 0.01 0" i={6} />
      </g>
      <g className="pj-rod">
        <L d="M53 116V188" i={7} />
      </g>
      <g className="pj-beam" style={{ transformOrigin: "120px 88px" }}>
        <L d="M60 84H178V92H60Z" i={8} />
        <L d="M60 80H52Q40 98 52 118H60Z" i={9} />
        <L d="M172 92L171 146" i={10} />
        <L d={circ(120, 88, 4)} i={11} />
      </g>
    </Frame>
  );
}
