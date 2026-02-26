'use client';

interface Tab {
  id: number;
  label: string;
}

interface HospitalDetailTabsHeaderV2Props {
  tabs: Tab[];
  activeTab: number;
  onTabClick: (index: number) => void;
}

export function HospitalDetailTabsHeaderV2({
  tabs,
  activeTab,
  onTabClick,
}: HospitalDetailTabsHeaderV2Props) {
  return (
    <div className='sticky top-[58px] z-40 flex items-center bg-white'>
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          onClick={() => onTabClick(index)}
          className={`flex h-full flex-1 items-center justify-center px-2 py-3 text-center text-sm leading-5 font-semibold transition-colors ${
            activeTab === index
              ? 'border-primary-900 text-primary-900 border-b-2'
              : 'border-b-1 border-neutral-200 text-neutral-400'
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
