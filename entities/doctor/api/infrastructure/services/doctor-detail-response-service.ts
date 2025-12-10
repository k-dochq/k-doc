import { type DoctorDetail } from '@/lib/queries/doctor';
import { type ReviewCardData } from 'entities/review';
import { parseLocalizedText } from 'shared/model/types/common';
import { type PrismaDoctorWithRelations } from '../../use-cases/get-doctor-detail';

/**
 * Doctor 기본 정보 변환
 */
function transformDoctorBasicInfo(
  doctor: PrismaDoctorWithRelations,
): Pick<
  DoctorDetail,
  | 'id'
  | 'name'
  | 'position'
  | 'career'
  | 'description'
  | 'genderType'
  | 'licenseNumber'
  | 'licenseDate'
  | 'viewCount'
  | 'bookmarkCount'
  | 'createdAt'
  | 'updatedAt'
> {
  return {
    id: doctor.id,
    name: parseLocalizedText(doctor.name),
    position: parseLocalizedText(doctor.position),
    career: parseLocalizedText(doctor.career),
    description: doctor.description,
    genderType: doctor.genderType,
    licenseNumber: doctor.licenseNumber,
    licenseDate: doctor.licenseDate,
    viewCount: doctor.viewCount,
    bookmarkCount: doctor.bookmarkCount,
    createdAt: doctor.createdAt,
    updatedAt: doctor.updatedAt,
  };
}

/**
 * District 정보 변환
 */
function transformDistrict(
  district: PrismaDoctorWithRelations['Hospital']['District'],
): DoctorDetail['hospital']['district'] {
  if (!district) {
    return null;
  }

  return {
    id: district.id,
    name: parseLocalizedText(district.name),
    displayName: district.displayName as string | null,
    countryCode: district.countryCode,
    level: district.level,
    order: district.order,
    parentId: district.parentId,
  };
}

/**
 * Hospital 정보 변환
 */
function transformDoctorHospitalInfo(
  hospital: PrismaDoctorWithRelations['Hospital'],
  reviews: ReviewCardData[],
): DoctorDetail['hospital'] {
  return {
    id: hospital.id,
    name: parseLocalizedText(hospital.name),
    address: parseLocalizedText(hospital.address),
    badge: hospital.badge ?? [],
    phoneNumber: hospital.phoneNumber,
    latitude: hospital.latitude,
    longitude: hospital.longitude,
    rating: hospital.rating,
    reviewCount: hospital._count.Review,
    prices: hospital.prices,
    discountRate: hospital.discountRate,
    ranking: hospital.ranking,
    displayLocationName: hospital.displayLocationName
      ? parseLocalizedText(hospital.displayLocationName)
      : null,
    district: transformDistrict(hospital.District),
    hospitalImages: hospital.HospitalImage.map((image) => ({
      id: image.id,
      imageType: image.imageType,
      imageUrl: image.imageUrl,
      alt: image.alt,
      order: image.order,
    })),
    medicalSpecialties: hospital.HospitalMedicalSpecialty.map((item) => ({
      id: item.MedicalSpecialty.id,
      name: parseLocalizedText(item.MedicalSpecialty.name),
      specialtyType: item.MedicalSpecialty.specialtyType,
    })),
    reviews,
  };
}

/**
 * DoctorImage 변환
 */
function transformDoctorImages(
  doctorImages: PrismaDoctorWithRelations['DoctorImage'],
): DoctorDetail['doctorImages'] {
  return doctorImages.map((image) => ({
    id: image.id,
    imageType: image.imageType as 'PROFILE' | 'CAREER',
    imageUrl: image.imageUrl,
    alt: image.alt,
    order: image.order,
  }));
}

/**
 * MedicalSpecialties 변환
 */
function transformMedicalSpecialties(
  doctorMedicalSpecialties: PrismaDoctorWithRelations['DoctorMedicalSpecialty'],
): DoctorDetail['medicalSpecialties'] {
  return doctorMedicalSpecialties.map((item) => ({
    id: item.MedicalSpecialty.id,
    name: parseLocalizedText(item.MedicalSpecialty.name),
    specialtyType: item.MedicalSpecialty.specialtyType,
  }));
}

/**
 * Prisma Doctor 데이터를 DoctorDetail 응답 형식으로 변환
 */
export function transformDoctorDetailResponse(
  doctor: PrismaDoctorWithRelations,
  reviews: ReviewCardData[],
): DoctorDetail {
  const basicInfo = transformDoctorBasicInfo(doctor);
  const hospitalInfo = transformDoctorHospitalInfo(doctor.Hospital, reviews);
  const doctorImages = transformDoctorImages(doctor.DoctorImage);
  const medicalSpecialties = transformMedicalSpecialties(doctor.DoctorMedicalSpecialty);

  return {
    ...basicInfo,
    hospital: hospitalInfo,
    doctorImages,
    medicalSpecialties,
  };
}
