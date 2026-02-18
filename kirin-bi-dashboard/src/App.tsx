import { useState } from 'react';
import type { TabId, DrilldownType } from './types';
import { TopBar } from './components/layout/TopBar';
import { SlicerBar } from './components/layout/SlicerBar';
import { DrilldownPanel } from './components/layout/DrilldownPanel';
import { TrendsTab } from './components/tabs/TrendsTab';
import { DriversTab } from './components/tabs/DriversTab';
import { KpiDrilldown } from './components/drilldown/KpiDrilldown';
import { BrandDrilldown } from './components/drilldown/BrandDrilldown';
import { PlRowDrilldown } from './components/drilldown/PlRowDrilldown';
import { ChannelDrilldown } from './components/drilldown/ChannelDrilldown';
import { CostDrilldown } from './components/drilldown/CostDrilldown';
import { useSlicer } from './hooks/useSlicer';
import { useDrilldown } from './hooks/useDrilldown';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('trends');
  const { slicer, togglePeriod, setSelectedMonth } = useSlicer();
  const { drilldown, open, close } = useDrilldown();

  const handleDrilldown = (type: DrilldownType, title: string, data: Record<string, unknown>) => {
    open(type, title, data);
  };

  const renderDrilldownContent = () => {
    switch (drilldown.type) {
      case 'kpi':
        return <KpiDrilldown data={drilldown.data} slicer={slicer} />;
      case 'brand':
        return <BrandDrilldown data={drilldown.data} slicer={slicer} />;
      case 'waterfall':
        return <PlRowDrilldown data={drilldown.data} slicer={slicer} />;
      case 'channel':
        return <ChannelDrilldown data={drilldown.data} slicer={slicer} />;
      case 'cost':
        return <CostDrilldown data={drilldown.data} slicer={slicer} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: 1920, height: 1080, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      <TopBar activeTab={activeTab} onTabChange={setActiveTab} selectedMonth={slicer.selectedMonth} />
      <SlicerBar slicer={slicer} onTogglePeriod={togglePeriod} onMonthChange={setSelectedMonth} />

      <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
        {activeTab === 'trends' && (
          <div id="tabpanel-trends" role="tabpanel" aria-labelledby="tab-trends" style={{ height: '100%' }}>
            <TrendsTab slicer={slicer} onDrilldown={handleDrilldown} />
          </div>
        )}
        {activeTab === 'drivers' && (
          <div id="tabpanel-drivers" role="tabpanel" aria-labelledby="tab-drivers" style={{ height: '100%' }}>
            <DriversTab slicer={slicer} onDrilldown={handleDrilldown} />
          </div>
        )}
      </main>

      <DrilldownPanel
        isOpen={drilldown.isOpen}
        onClose={close}
        title={drilldown.title}
      >
        {renderDrilldownContent()}
      </DrilldownPanel>
    </div>
  );
}

export default App;
