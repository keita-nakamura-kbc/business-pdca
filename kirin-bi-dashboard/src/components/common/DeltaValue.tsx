interface DeltaValueProps {
  value: number | string;
  suffix?: string;
}

export function DeltaValue({ value, suffix = '' }: DeltaValueProps) {
  if (typeof value === 'string') {
    if (value.startsWith('-')) {
      return <span className="text-negative">{'\u25B3'}{value.slice(1)}{suffix}</span>;
    }
    return <>{value}{suffix}</>;
  }

  if (value < 0) {
    return (
      <span className="text-negative">
        {'\u25B3'}{Math.abs(value).toLocaleString()}{suffix}
      </span>
    );
  }

  if (value > 0) {
    return (
      <span className="text-positive">
        +{value.toLocaleString()}{suffix}
      </span>
    );
  }

  return <>{value.toLocaleString()}{suffix}</>;
}

/** Format a number as delta: negative→△, positive→+, zero→0 */
export function formatDelta(value: number, decimals?: number): string {
  const formatted = decimals !== undefined ? Math.abs(value).toFixed(decimals) : Math.abs(value).toLocaleString();
  if (value < 0) return `\u25B3${formatted}`;
  if (value > 0) return `+${formatted}`;
  return decimals !== undefined ? value.toFixed(decimals) : value.toLocaleString();
}
