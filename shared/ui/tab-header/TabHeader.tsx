'use client';

import { cn } from 'shared/lib/utils';

export interface Tab {
  id: number;
  label: string;
}

interface TabHeaderProps {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
  className?: string;
}

export function TabHeader({ tabs, activeTab, onTabClick, className }: TabHeaderProps) {
  return (
    <div className={cn('flex border-b border-gray-200 bg-white/20', className)}>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(index)}
          className={cn(
            'flex-1 px-4 py-3 text-center text-sm font-semibold transition-colors',
            'border-b-2 border-transparent',
            activeTab === index
              ? 'border-primary text-primary'
              : 'text-primary/50 hover:text-primary/80',
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
