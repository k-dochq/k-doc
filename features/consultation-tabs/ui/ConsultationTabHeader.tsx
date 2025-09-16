'use client';

import { cn } from 'shared/lib/utils';

interface Tab {
  id: number;
  label: string;
}

interface ConsultationTabHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function ConsultationTabHeader({ tabs, activeTab, onTabClick }: ConsultationTabHeaderProps) {
  return (
    <div className='flex border-b border-gray-200 bg-white'>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(index)}
          className={cn(
            'flex-1 px-4 py-3 text-center text-sm font-semibold transition-colors',
            'border-b-2 border-transparent',
            activeTab === index
              ? 'border-primary text-primary'
              : 'text-neutral-400 hover:text-neutral-600',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
