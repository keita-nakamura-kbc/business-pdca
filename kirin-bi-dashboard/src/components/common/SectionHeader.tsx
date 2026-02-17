import type { ElementType } from 'react';
import { ArrowUpRight } from 'lucide-react';
import styles from './SectionHeader.module.css';

interface SectionHeaderProps {
  icon: ElementType;
  title: string;
  subtitle?: string;
  accentColor?: string;
  pageRef?: string;
  interactive?: boolean;
}

export function SectionHeader({ icon: Icon, title, subtitle, accentColor = 'var(--color-primary)', pageRef, interactive }: SectionHeaderProps) {
  return (
    <div className={styles.header}>
      <div className={styles.titleRow}>
        <span className={styles.iconBadge} style={{ backgroundColor: accentColor }}>
          <Icon size={13} color="#fff" />
        </span>
        <span className={styles.title}>{title}</span>
        {subtitle && <span className={styles.subtitle}>{subtitle}</span>}
        {interactive && (
          <span className={styles.drillBadge}>
            <ArrowUpRight size={10} />
            深堀
          </span>
        )}
        {pageRef && <span className={styles.pageRef}>P.{pageRef}</span>}
      </div>
      <div className={styles.accent} style={{ backgroundColor: accentColor }} />
    </div>
  );
}
