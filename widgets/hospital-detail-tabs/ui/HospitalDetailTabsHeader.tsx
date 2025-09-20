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
            'border-b-2 border-transparent',
            activeTab === index ? 'border-white text-white' : 'text-white/70 hover:text-white/90',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
