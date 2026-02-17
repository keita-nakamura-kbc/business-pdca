import type { ConditionalFormatLevel } from '../../types';

interface StatusIconProps {
  level: ConditionalFormatLevel;
  size?: number;
}

const colorMap: Record<ConditionalFormatLevel, string> = {
  achieved: 'var(--color-achieved)',
  warning: 'var(--color-warning)',
  missed: 'var(--color-missed)',
  none: 'var(--color-border)',
};

export function StatusIcon({ level, size = 8 }: StatusIconProps) {
  return (
    <span
      style={{
        display: 'inline-block',
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: colorMap[level],
        marginRight: 6,
        verticalAlign: 'middle',
        flexShrink: 0,
      }}
    />
  );
}
