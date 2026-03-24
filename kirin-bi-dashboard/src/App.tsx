import { useState, useEffect, useCallback } from 'react';
import type { TabId, DrilldownType, WaterfallSegment } from './types';
import { TopBar } from './components/layout/TopBar';
import { SlicerBar } from './components/layout/SlicerBar';
import { DrilldownPanel } from './components/layout/DrilldownPanel';
import { StepBar } from './components/layout/StepBar';
import { TrendsTab } from './components/tabs/TrendsTab';
import { DriversTab } from './components/tabs/DriversTab';
import { KpiDrilldown } from './components/drilldown/KpiDrilldown';
import { BrandDrilldown } from './components/drilldown/BrandDrilldown';
import { WaterfallView } from './components/drilldown/WaterfallView';
import { ChannelDrilldown } from './components/drilldown/ChannelDrilldown';
import { CostDrilldown } from './components/drilldown/CostDrilldown';
import { useSlicer } from './hooks/useSlicer';
import { useDrilldown } from './hooks/useDrilldown';
import { usePresentation } from './hooks/usePresentation';

function App() {
  const [activeTab, setActiveTab] = useState<TabId>('trends');
  const { slicer, togglePeriod, setSelectedMonth, setPeriod } = useSlicer();
  const { drilldown, open, close } = useDrilldown();
  const presentation = usePresentation();

  // Sync tab/slicer/drilldown on step change
  useEffect(() => {
    if (!presentation.isActive) return;
    const step = presentation.step;
    setActiveTab(step.tab);
    setPeriod(step.period);
    if (drilldown.isOpen) close();
  }, [presentation.isActive, presentation.currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  // Highlight focus area
  useEffect(() => {
    if (!presentation.isActive) return;
    const area = presentation.step.focusArea;
    // Remove previous highlights
    document.querySelectorAll('.presentation-highlight').forEach(el => el.classList.remove('presentation-highlight'));
    if (area) {
      const el = document.querySelector(`[data-area="${area}"]`);
      if (el) el.classList.add('presentation-highlight');
    }
    return () => {
      document.querySelectorAll('.presentation-highlight').forEach(el => el.classList.remove('presentation-highlight'));
    };
  }, [presentation.isActive, presentation.currentStep, presentation.step.focusArea]);

  // Keyboard: arrows for step nav, Esc for exit (drilldown close takes priority)
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (!presentation.isActive) return;
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      presentation.goNext();
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      presentation.goPrev();
    } else if (e.key === 'Escape') {
      if (drilldown.isOpen) return; // let DrilldownPanel handle it
      e.preventDefault();
      presentation.exit();
    }
  }, [presentation, drilldown.isOpen]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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
        return <WaterfallView segment={drilldown.data.segment as WaterfallSegment} slicer={slicer} />;
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
      <TopBar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        selectedMonth={slicer.selectedMonth}
        onStartPresentation={presentation.start}
        isPresentationActive={presentation.isActive}
      />
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

      {presentation.isActive && (
        <StepBar
          currentStep={presentation.currentStep}
          totalSteps={presentation.totalSteps}
          label={presentation.step.label}
          onPrev={presentation.goPrev}
          onNext={presentation.goNext}
          onGoTo={presentation.goToStep}
          onExit={presentation.exit}
        />
      )}

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
