'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { resolveDrawer } from 'shared/lib/drawer';
import { ResetButton } from 'shared/ui/buttons';
import { ParentDistrictList } from 'features/district-filter/ui/ParentDistrictList';
import { ChildDistrictList } from 'features/district-filter/ui/ChildDistrictList';
import { DistrictFilterButton } from 'features/district-filter/ui/DistrictFilterButton';
import { useChildDistricts } from 'features/district-filter/model/useDistricts';
import { type useDistrictFilter } from 'features/district-filter/model/useDistrictFilter';
import type { District } from 'features/district-filter/model/types';

interface DistrictFilterDrawerV2Props {
  lang: Locale;
  dict: Dictionary;
  districtFilter: ReturnType<typeof useDistrictFilter>;
  parentDistricts: District[];
}

export function DistrictFilterDrawerV2({
  lang,
  dict,
  districtFilter,
  parentDistricts,
}: DistrictFilterDrawerV2Props) {
  // parentDistricts의 첫 번째 값을 기본값으로 설정
  const [selectedParentId, setSelectedParentId] = useState<string | null>(
    parentDistricts[0]?.id ?? null,
  );

  const { data: childDistricts = [] } = useChildDistricts(selectedParentId);

  const handleParentSelect = (parentId: string) => {
    setSelectedParentId(parentId);
    // 부모 지역 변경 시 해당 부모의 하위 지역들 중 이미 선택된 것들만 유지하지 않고 초기화
    // 필요하다면 나중에 개선할 수 있음
  };

  const handleChildToggle = (childId: string) => {
    districtFilter.toggleDistrict(childId);
  };

  const handleSelectAll = () => {
    districtFilter.selectAllDistricts(childDistricts.map((district) => district.id));
  };

  const handleDeselectAll = () => {
    // 현재 선택된 부모의 하위 지역들만 선택 해제
    const currentChildIds = childDistricts.map((district) => district.id);
    const otherSelectedIds = districtFilter.selectedDistrictIds.filter(
      (id) => !currentChildIds.includes(id),
    );
    districtFilter.setSelectedDistrictIds(otherSelectedIds);
  };

  const handleReset = () => {
    setSelectedParentId(null);
    districtFilter.resetDistrictFilter();
  };

  const handleComplete = () => {
    resolveDrawer();
  };

  return (
    <div className='w-full'>
      {/* 헤더 */}
      <div className='flex items-center justify-between border-b border-neutral-200 px-5 pb-3'>
        <div className='flex items-start gap-0.5'>
          <h2 className='text-lg leading-7 font-bold text-neutral-900'>
            {dict.districtFilter.title}
          </h2>
        </div>
        <ResetButton onClick={handleReset} dict={dict} />
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
          dict={dict}
          selectedParentId={selectedParentId}
          selectedChildIds={districtFilter.selectedDistrictIds}
          onChildToggle={handleChildToggle}
          onSelectAll={handleSelectAll}
          onDeselectAll={handleDeselectAll}
        />
      </div>

      {/* 하단 버튼 */}
      <DistrictFilterButton
        selectedChildIds={districtFilter.selectedDistrictIds}
        childDistricts={childDistricts}
        onComplete={handleComplete}
        dict={dict}
      />
    </div>
  );
}
