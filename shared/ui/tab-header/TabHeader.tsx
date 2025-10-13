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
    <div className={cn('flex border-t border-white/60 bg-white/20', className)}>
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
