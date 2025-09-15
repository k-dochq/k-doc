'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { ResetButton } from 'shared/ui/buttons';
import { ParentDistrictList } from './ParentDistrictList';
import { ChildDistrictList } from './ChildDistrictList';
import { DistrictFilterButton } from './DistrictFilterButton';
import { useChildDistricts } from '../model/useDistricts';

interface DistrictFilterDrawerProps {
  lang: Locale;
  onClose?: () => void;
}

export function DistrictFilterDrawer({ lang, onClose }: DistrictFilterDrawerProps) {
  const [selectedParentId, setSelectedParentId] = useState<string | null>(null);
  const [selectedChildIds, setSelectedChildIds] = useState<string[]>([]);

  const { data: childDistricts = [] } = useChildDistricts(selectedParentId);

  const handleParentSelect = (parentId: string) => {
    setSelectedParentId(parentId);
    setSelectedChildIds([]); // 부모 지역 변경 시 선택된 하위 지역 초기화
  };

  const handleChildToggle = (childId: string) => {
    setSelectedChildIds((prev) =>
      prev.includes(childId) ? prev.filter((id) => id !== childId) : [...prev, childId],
    );
  };

  const handleSelectAll = () => {
    setSelectedChildIds(childDistricts.map((district) => district.id));
  };

  const handleDeselectAll = () => {
    setSelectedChildIds([]);
  };

  const handleReset = () => {
    setSelectedParentId(null);
    setSelectedChildIds([]);
  };

  const handleComplete = () => {
    onClose?.();
  };

  return (
    <div className='w-full'>
      {/* 헤더 */}
      <div className='flex items-center justify-between border-b border-neutral-200 px-5 pb-3'>
        <div className='flex items-start gap-0.5'>
          <h2 className='text-lg leading-7 font-bold text-neutral-900'>지역</h2>
        </div>
        <ResetButton onClick={handleReset} />
      </div>

      {/* 메인 컨텐츠 */}
      <div className='flex h-[408px] w-full items-start justify-start overflow-hidden'>
        {/* 왼쪽: 상위 지역 리스트 */}
        <ParentDistrictList
          lang={lang}
          selectedParentId={selectedParentId}
          onParentSelect={handleParentSelect}
        />

        {/* 오른쪽: 하위 지역 체크박스 리스트 */}
        <ChildDistrictList
          lang={lang}
          selectedParentId={selectedParentId}
          selectedChildIds={selectedChildIds}
          onChildToggle={handleChildToggle}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
      </div>

      {/* 하단 버튼 */}
      <DistrictFilterButton
        selectedChildIds={selectedChildIds}
        childDistricts={childDistricts}
        onComplete={handleComplete}
      />
    </div>
  );
}
