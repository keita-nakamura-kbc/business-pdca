import { TrendingUp, Search, Calendar } from 'lucide-react';
import type { TabId } from '../../types';
import styles from './TopBar.module.css';

interface TopBarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
}

const tabs: { id: TabId; label: string; icon: typeof TrendingUp }[] = [
  { id: 'trends', label: '業績トレンド', icon: TrendingUp },
  { id: 'drivers', label: '要因分析', icon: Search },
];

export function TopBar({ activeTab, onTabChange }: TopBarProps) {
  return (
    <header className={styles.topBar}>
      <div className={styles.logoArea}>
        <span className={styles.logoMark}>K</span>
        <span className={styles.logoText}>KIRIN BEVERAGE</span>
      </div>
      <nav className={styles.tabs} role="tablist" aria-label="ダッシュボードタブ">
        {tabs.map(tab => (
          <button
            key={tab.id}
            id={`tab-${tab.id}`}
            role="tab"
            aria-selected={activeTab === tab.id}
            aria-controls={`tabpanel-${tab.id}`}
            className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
            onClick={() => onTabChange(tab.id)}
          >
            <tab.icon size={14} />
            {tab.label}
          </button>
        ))}
      </nav>
      <div className={styles.date}>
        <Calendar size={13} />
        2025年11月度
      </div>
    </header>
  );
}
