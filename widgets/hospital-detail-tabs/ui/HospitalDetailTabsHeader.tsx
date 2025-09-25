'use client';

import { cn } from 'shared/lib/utils';

interface Tab {
  id: number;
  label: string;
}

interface HospitalDetailTabsHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function HospitalDetailTabsHeader({
  tabs,
  activeTab,
  onTabClick,
}: HospitalDetailTabsHeaderProps) {
  return (
    <div className='flex border-b border-white/20 bg-transparent'>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(index)}
          className={cn(
            'flex-1 px-4 py-3 text-center text-sm font-medium transition-colors',
            activeTab === index
              ? 'border-primary text-primary border-b-2'
              : 'border-primary/50 text-primary/50 border-b-1',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
