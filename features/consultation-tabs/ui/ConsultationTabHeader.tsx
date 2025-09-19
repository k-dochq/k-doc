import { TabHeader, type Tab } from 'shared/ui/tab-header';

interface ConsultationTabHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function ConsultationTabHeader({ tabs, activeTab, onTabClick }: ConsultationTabHeaderProps) {
  return <TabHeader tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />;
}
