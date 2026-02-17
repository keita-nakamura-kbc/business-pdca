import { useConditionalFormat } from '../../hooks/useConditionalFormat';
import styles from './DataTable.module.css';

interface Column {
  key: string;
  label: string;
  width?: string;
  align?: 'left' | 'center' | 'right';
}

interface DataTableProps {
  columns: Column[];
  rows: Record<string, unknown>[];
  onRowClick?: (row: Record<string, unknown>, index: number) => void;
  formatters?: Record<string, (value: unknown, row: Record<string, unknown>) => React.ReactNode>;
  ratioKey?: string;
}

function formatNegative(value: unknown): React.ReactNode {
  if (typeof value === 'number' && value < 0) {
    return <span className="text-negative">{'\u25B3'}{Math.abs(value).toLocaleString()}</span>;
  }
  if (typeof value === 'number') {
    return value.toLocaleString();
  }
  if (typeof value === 'string' && value.startsWith('-')) {
    return <span className="text-negative">{'\u25B3'}{value.slice(1)}</span>;
  }
  return value as React.ReactNode;
}

function CfCell({ value, ratio, align, formatter, row }: {
  value: unknown;
  ratio?: number;
  align?: string;
  formatter?: (value: unknown, row: Record<string, unknown>) => React.ReactNode;
  row: Record<string, unknown>;
}) {
  const level = useConditionalFormat(ratio);
  const cfClass =
    level === 'achieved' ? 'cf-achieved' :
    level === 'warning' ? 'cf-warning' :
    level === 'missed' ? 'cf-missed' : '';

  return (
    <td
      className={`${styles.cell} ${cfClass}`}
      style={{ textAlign: (align as React.CSSProperties['textAlign']) || 'right' }}
    >
      {formatter ? formatter(value, row) : formatNegative(value)}
    </td>
  );
}

export function DataTable({ columns, rows, onRowClick, formatters, ratioKey }: DataTableProps) {
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {columns.map(col => (
              <th
                key={col.key}
                className={styles.th}
                style={{
                  width: col.width,
                  textAlign: (col.align as React.CSSProperties['textAlign']) || (col.key === 'label' ? 'left' : 'right'),
                }}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => {
            const isTotal = row.isTotal === true;
            const isSubtotal = row.isSubtotal === true;
            const rowRatio = ratioKey ? (row[ratioKey] as number | undefined) : undefined;

            return (
              <tr
                key={idx}
                className={`
                  ${styles.row}
                  ${isTotal ? styles.totalRow : ''}
                  ${isSubtotal ? styles.subtotalRow : ''}
                  ${onRowClick ? styles.clickable : ''}
                `}
                onClick={() => onRowClick?.(row, idx)}
              >
                {columns.map(col => (
                  <CfCell
                    key={col.key}
                    value={row[col.key]}
                    ratio={col.key === ratioKey ? undefined : rowRatio}
                    align={col.align || (col.key === 'label' ? 'left' : 'right')}
                    formatter={formatters?.[col.key]}
                    row={row}
                  />
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
