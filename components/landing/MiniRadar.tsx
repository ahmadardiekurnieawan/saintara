interface MiniRadarProps {
  scores: number[] // 6 values, 0..100
  size?: number
  showLabels?: boolean
  labels?: string[]
  dark?: boolean
  className?: string
}

const DEFAULT_LABELS = ['Linguistik', 'Logis', 'Spasial', 'Kinestetik', 'Musikal', 'Interpersonal']

/**
 * Lightweight, dependency-free SVG hexagon radar.
 * Used for crisp product mockups where we don't want to ship a chart lib.
 */
export default function MiniRadar({ scores, size = 240, showLabels = false, labels = DEFAULT_LABELS, dark = false, className }: MiniRadarProps) {
  const gridStroke = dark ? 'rgba(255,255,255,0.16)' : '#E2E5EA'
  const labelFill = dark ? 'rgba(255,255,255,0.6)' : '#64748B'
  const cx = size / 2
  const cy = size / 2
  const radius = size * (showLabels ? 0.34 : 0.42)
  const axes = scores.length

  const point = (value: number, i: number) => {
    const angle = (-90 + (360 / axes) * i) * (Math.PI / 180)
    const r = (Math.max(0, Math.min(100, value)) / 100) * radius
    return [cx + r * Math.cos(angle), cy + r * Math.sin(angle)] as const
  }

  const vertex = (i: number, scale = 1) => {
    const angle = (-90 + (360 / axes) * i) * (Math.PI / 180)
    return [cx + radius * scale * Math.cos(angle), cy + radius * scale * Math.sin(angle)] as const
  }

  const rings = [0.25, 0.5, 0.75, 1]
  const dataPoints = scores.map((v, i) => point(v, i))
  const dataPath = dataPoints.map((p) => p.join(',')).join(' ')

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%" className={className} role="img" aria-label="Profil kecerdasan">
      <defs>
        <radialGradient id="miniRadarFill" cx="50%" cy="50%" r="65%">
          <stop offset="0" stopColor="#D4A843" stopOpacity="0.55" />
          <stop offset="1" stopColor="#C59830" stopOpacity="0.28" />
        </radialGradient>
      </defs>

      {rings.map((scale, ri) => (
        <polygon
          key={ri}
          points={Array.from({ length: axes }, (_, i) => vertex(i, scale).join(',')).join(' ')}
          fill="none"
          stroke={gridStroke}
          strokeWidth={1}
          strokeDasharray={scale === 1 ? undefined : '3 4'}
        />
      ))}

      {Array.from({ length: axes }, (_, i) => {
        const [x, y] = vertex(i)
        return <line key={i} x1={cx} y1={cy} x2={x} y2={y} stroke={gridStroke} strokeWidth={1} />
      })}

      <polygon points={dataPath} fill="url(#miniRadarFill)" stroke="#C59830" strokeWidth={2.5} strokeLinejoin="round" />

      {dataPoints.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={3.4} fill="#C59830" stroke="#fff" strokeWidth={1.5} />
      ))}

      {showLabels &&
        Array.from({ length: axes }, (_, i) => {
          const [x, y] = vertex(i, 1.2)
          return (
            <text
              key={i}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={size * 0.04}
              fontFamily="Montserrat, sans-serif"
              fontWeight={600}
              fill={labelFill}
            >
              {labels[i]}
            </text>
          )
        })}
    </svg>
  )
}
