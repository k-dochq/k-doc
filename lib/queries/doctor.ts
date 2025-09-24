import { useQuery } from '@tanstack/react-query';
import { type LocalizedText } from 'shared/model/types';
import { type Prisma } from '@prisma/client';

export interface DoctorDetail {
  id: string;
  name: LocalizedText;
  position: LocalizedText;
  career: LocalizedText;
  description: string | null;
  genderType: 'MALE' | 'FEMALE';
  licenseNumber: string | null;
  licenseDate: Date | null;
  viewCount: number;
  bookmarkCount: number;
  hospital: {
    id: string;
    name: LocalizedText;
    address: LocalizedText;
    phoneNumber: string | null;
    latitude: number | null;
    longitude: number | null;
    rating: number;
    reviewCount: number;
    prices: Prisma.JsonValue;
    discountRate: number | null;
    displayLocationName: LocalizedText | null;
    district: {
      id: string;
      name: LocalizedText;
      displayName: string | null;
      countryCode: string;
      level: number;
      order: number | null;
      parentId: string | null;
    } | null;
    hospitalImages: Array<{
      id: string;
      imageType: string;
      imageUrl: string;
      alt: string | null;
      order: number | null;
    }>;
    medicalSpecialties: Array<{
      id: string;
      name: LocalizedText;
      specialtyType: string;
    }>;
    reviews: Array<{
      id: string;
      rating: number;
      title: LocalizedText | null;
      content: LocalizedText | null;
      isRecommended: boolean;
      viewCount: number;
      likeCount: number;
      createdAt: Date;
      concerns: string | null;
      concernsMultilingual: any;
      commentCount: number;
      user: {
        id: string;
        name: string | null;
        nickName: string | null;
        profileImgUrl: string | null;
      };
      medicalSpecialty: {
        id: string;
        name: LocalizedText;
        specialtyType: string;
      };
      reviewImages: Array<{
        id: string;
        imageType: string;
        imageUrl: string;
        alt: string | null;
        order: number | null;
      }>;
    }>;
  };
  doctorImages: Array<{
    id: string;
    imageType: 'PROFILE' | 'CAREER';
    imageUrl: string;
    alt: string | null;
    order: number | null;
  }>;
  medicalSpecialties: Array<{
    id: string;
    name: LocalizedText;
    specialtyType: string;
  }>;
  createdAt: Date;
  updatedAt: Date;
}

async function fetchDoctorDetail(doctorId: string): Promise<DoctorDetail> {
  const response = await fetch(`/api/doctors/${doctorId}`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || '의사 정보를 불러오는 중 오류가 발생했습니다.');
  }

  return response.json();
}

export function useDoctorDetail(doctorId: string) {
  return useQuery({
    queryKey: ['doctor', doctorId],
    queryFn: () => fetchDoctorDetail(doctorId),
    enabled: !!doctorId,
    staleTime: 5 * 60 * 1000, // 5분
    gcTime: 10 * 60 * 1000, // 10분
  });
}
