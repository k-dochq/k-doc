// 좋아요한 병원 관련 도메인 타입 정의
import type { Hospital } from 'entities/hospital/api/entities/types';

export interface LikedHospitalsRequest {
  page: number;
  limit: number;
}

export interface LikedHospitalsResult {
  success: boolean;
  hospitals: LikedHospital[];
  totalCount: number;
  hasNextPage: boolean;
  nextPage: number | null;
  error?: string;
}

// Hospital 타입을 확장하여 isLiked 속성 추가
export interface LikedHospital extends Hospital {
  isLiked: boolean;
  district?: HospitalDistrict | null;
}

export interface HospitalSpecialty {
  id: string;
  name: Record<string, string>;
  specialtyType: string;
}

export interface HospitalDistrict {
  id: string;
  name: Record<string, string>;
  countryCode: string;
}
