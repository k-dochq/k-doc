/**
 * 지역 필터 관련 타입 정의
 */

export interface MultiLanguageName {
  ko_KR: string;
  th_TH: string;
  ja_JP: string;
  en_US: string;
}

export interface District {
  id: string;
  name: MultiLanguageName;
  displayName: string | null;
  countryCode: 'KR' | 'TH';
  level: number;
  order: number | null;
  parentId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface DistrictFilterState {
  selectedParentId: string | null;
  selectedChildIds: string[];
}

export interface DistrictFilterResult {
  parentDistrict: District | null;
  childDistricts: District[];
}
