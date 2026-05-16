interface TornEdgeProps {
  fill: string;
  fromColor?: string;
  flip?: boolean;
  className?: string;
}

const TILE_W = 360;

// 360px-wide paths that start and end at the same y so they tile seamlessly with repeat-x
const PATHS = [
  // A – dramatic peaks
  'M0,40 L15,25 L28,35 L42,15 L55,30 L68,20 L82,38 L95,18 L110,30 L122,10 L136,26 L150,36 L162,16 L178,28 L192,20 L206,36 L220,12 L234,28 L248,22 L262,36 L278,16 L292,30 L306,20 L320,38 L334,12 L348,26 L360,40 L360,56 L0,56 Z',
  // B – finer teeth
  'M0,36 L14,24 L26,34 L38,18 L52,28 L64,16 L76,30 L90,20 L104,34 L116,12 L130,26 L142,22 L156,36 L170,14 L184,26 L198,18 L212,34 L226,22 L240,10 L254,28 L268,20 L282,34 L296,16 L310,26 L324,18 L338,32 L352,22 L360,36 L360,56 L0,56 Z',
  // C – mixed/uneven
  'M0,38 L18,22 L32,34 L46,12 L58,26 L72,16 L86,36 L100,18 L116,30 L130,8 L144,24 L160,34 L174,14 L188,28 L202,20 L218,36 L232,10 L246,26 L260,36 L274,14 L288,28 L302,20 L318,36 L332,8 L346,24 L360,38 L360,56 L0,56 Z',
];

let pathIndex = 0;

function makeBgImage(path: string, fill: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${TILE_W} 56"><path d="${path}" fill="${fill}"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}

export function TornEdge({ fill, fromColor, flip = false, className = '' }: TornEdgeProps) {
  const path = PATHS[pathIndex % PATHS.length];
  pathIndex++;

  return (
    <div
      className={`w-full pointer-events-none ${className}`}
      style={{
        height: '56px',
        marginTop: '-1px',
        marginBottom: '-1px',
        backgroundColor: fromColor ?? 'transparent',
        backgroundImage: makeBgImage(path, fill),
        backgroundRepeat: 'repeat-x',
        backgroundSize: `${TILE_W}px 56px`,
        backgroundPosition: 'left bottom',
        ...(flip ? { transform: 'scaleY(-1)' } : {}),
      }}
      aria-hidden="true"
    />
  );
}
