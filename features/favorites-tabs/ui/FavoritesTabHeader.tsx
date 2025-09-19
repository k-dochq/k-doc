import { TabHeader, type Tab } from 'shared/ui/tab-header';

interface FavoritesTabHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function FavoritesTabHeader({ tabs, activeTab, onTabClick }: FavoritesTabHeaderProps) {
  return <TabHeader tabs={tabs} activeTab={activeTab} onTabClick={onTabClick} />;
}
