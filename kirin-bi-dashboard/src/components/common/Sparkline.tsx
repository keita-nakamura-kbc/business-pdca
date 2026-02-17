interface SparklineProps {
  data: number[];
  data2?: number[];
  width?: number;
  height?: number;
  color?: string;
  color2?: string;
}

export function Sparkline({ data, data2, width = 80, height = 24, color = 'var(--color-primary)', color2 = '#f57c00' }: SparklineProps) {
  const safeData = data?.filter(v => Number.isFinite(v));
  if (!safeData || safeData.length < 2) return null;

  const safeData2 = data2?.filter(v => Number.isFinite(v));
  const hasDual = safeData2 && safeData2.length >= 2;

  // Unified min/max across both series
  const allValues = hasDual ? [...safeData, ...safeData2] : safeData;
  const min = Math.min(...allValues);
  const max = Math.max(...allValues);
  const range = max - min || 1;
  const padding = 2;
  const plotW = width - padding * 2;
  const plotH = height - padding * 2;

  const toPoints = (d: number[]) =>
    d.map((v, i) => {
      const x = padding + (i / (d.length - 1)) * plotW;
      const y = padding + plotH - ((v - min) / range) * plotH;
      return `${x},${y}`;
    });

  const points = toPoints(safeData);
  const lastPoint = points[points.length - 1].split(',');

  // Area fill path for primary series
  const areaPath = `M${points[0]} ${points.slice(1).map(p => `L${p}`).join(' ')} L${lastPoint[0]},${height - padding} L${padding},${height - padding} Z`;

  const points2 = hasDual ? toPoints(safeData2) : null;
  const lastPoint2 = points2 ? points2[points2.length - 1].split(',') : null;

  return (
    <svg width={width} height={height} style={{ display: 'block' }} aria-hidden="true">
      <path d={areaPath} fill={color} opacity={0.1} />
      <polyline
        points={points.join(' ')}
        fill="none"
        stroke={color}
        strokeWidth={1.5}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
      <circle
        cx={lastPoint[0]}
        cy={lastPoint[1]}
        r={2.5}
        fill={color}
      />
      {points2 && lastPoint2 && (
        <>
          <polyline
            points={points2.join(' ')}
            fill="none"
            stroke={color2}
            strokeWidth={1.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            strokeDasharray="2,1"
          />
          <circle
            cx={lastPoint2[0]}
            cy={lastPoint2[1]}
            r={2}
            fill={color2}
          />
        </>
      )}
    </svg>
  );
}
