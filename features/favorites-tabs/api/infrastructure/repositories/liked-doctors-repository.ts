import 'server-only';

import { prisma } from 'shared/lib/prisma';
import type { LikedDoctor } from '../../entities/types';

/**
 * 좋아요한 의사 리스트 Repository
 */
export class LikedDoctorsRepository {
  /**
   * 사용자가 좋아요한 의사 목록 조회
   */
  async findLikedDoctorsByUser(
    userId: string,
    page: number,
    limit: number,
  ): Promise<{ doctors: LikedDoctor[]; totalCount: number }> {
    const offset = (page - 1) * limit;

    // 좋아요한 의사 목록 조회 (관계 데이터 포함)
    const likedDoctors = await prisma.doctorLike.findMany({
      where: {
        userId,
      },
      include: {
        Doctor: {
          include: {
            Hospital: {
              select: {
                id: true,
                name: true,
                address: true,
                phoneNumber: true,
                rating: true,
                reviewCount: true,
                bookmarkCount: true,
                viewCount: true,
              },
            },
            DoctorImage: {
              where: {
                isActive: true,
                imageType: 'PROFILE',
              },
              orderBy: {
                order: 'asc',
              },
            },
            DoctorMedicalSpecialty: {
              include: {
                MedicalSpecialty: {
                  select: {
                    id: true,
                    name: true,
                    specialtyType: true,
                    description: true,
                    order: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                  },
                },
              },
            },
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      skip: offset,
      take: limit,
    });

    // 전체 좋아요한 의사 수 조회
    const totalCount = await prisma.doctorLike.count({
      where: {
        userId,
      },
    });

    // 데이터 변환 - HospitalDoctor 타입과 호환되도록 변환
    const doctors: LikedDoctor[] = likedDoctors.map((like) => ({
      id: like.Doctor.id,
      name: like.Doctor.name,
      position: like.Doctor.position,
      description: like.Doctor.description || undefined,
      genderType: like.Doctor.genderType,
      hospital: {
        id: like.Doctor.Hospital.id,
        name: like.Doctor.Hospital.name,
      },
      medicalSpecialties: like.Doctor.DoctorMedicalSpecialty.map((specialty) => ({
        id: specialty.MedicalSpecialty.id,
        name: specialty.MedicalSpecialty.name,
        specialtyType: specialty.MedicalSpecialty.specialtyType,
        description: specialty.MedicalSpecialty.description,
        order: specialty.MedicalSpecialty.order,
        isActive: specialty.MedicalSpecialty.isActive,
        createdAt: specialty.MedicalSpecialty.createdAt,
        updatedAt: specialty.MedicalSpecialty.updatedAt,
      })),
      doctorImages: like.Doctor.DoctorImage.map((image) => ({
        id: image.id,
        doctorId: image.doctorId,
        imageType: 'PROFILE' as const,
        imageUrl: image.imageUrl,
        alt: image.alt || null,
        order: image.order || null,
        isActive: image.isActive,
        createdAt: image.createdAt,
        updatedAt: image.updatedAt,
      })),
      order: like.Doctor.order || undefined,
      createdAt: like.Doctor.createdAt,
      updatedAt: like.Doctor.updatedAt,
      isLiked: true, // 좋아요한 의사이므로 항상 true
    }));

    return { doctors, totalCount };
  }
}
