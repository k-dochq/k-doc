import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { parseLocalizedText, parsePriceInfo } from 'shared/model/types/common';
import { getUserDisplayName } from 'shared/lib';
import { type ReviewCardData } from 'entities/review';

interface RouteParams {
  params: Promise<{
    id: string;
  }>;
}

export async function GET(_request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = await params;

    // 의사 상세 정보 조회 (관련 데이터 포함)
    const doctor = await prisma.doctor.findUnique({
      where: {
        id,
      },
      include: {
        Hospital: {
          select: {
            id: true,
            name: true,
            address: true,
            phoneNumber: true,
            latitude: true,
            longitude: true,
            rating: true,
            prices: true,
            discountRate: true,
            ranking: true,
            displayLocationName: true,
            District: {
              select: {
                id: true,
                name: true,
                displayName: true,
                countryCode: true,
                level: true,
                order: true,
                parentId: true,
              },
            },
            HospitalImage: {
              where: {
                isActive: true,
              },
              orderBy: {
                order: 'asc',
              },
            },
            HospitalMedicalSpecialty: {
              include: {
                MedicalSpecialty: {
                  select: {
                    id: true,
                    name: true,
                    specialtyType: true,
                  },
                },
              },
            },
            _count: {
              select: {
                Review: true, // 실제 리뷰 수 계산
              },
            },
            Review: {
              select: {
                id: true,
                rating: true,
                title: true,
                content: true,
                isRecommended: true,
                viewCount: true,
                likeCount: true,
                createdAt: true,
                concerns: true,
                concernsMultilingual: true,
                commentCount: true,
                User: {
                  select: {
                    id: true,
                    name: true,
                    nickName: true,
                    profileImgUrl: true,
                  },
                },
                MedicalSpecialty: {
                  select: {
                    id: true,
                    name: true,
                    specialtyType: true,
                  },
                },
                ReviewImage: {
                  where: {
                    isActive: true,
                  },
                  orderBy: {
                    order: 'asc',
                  },
                },
              },
              orderBy: {
                createdAt: 'desc',
              },
              take: 10, // 최근 10개 리뷰만 가져오기
            },
          },
        },
        DoctorImage: {
          where: {
            isActive: true,
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
              },
            },
          },
        },
      },
    });

    if (!doctor) {
      return NextResponse.json({ error: '의사를 찾을 수 없습니다.' }, { status: 404 });
    }

    // 리뷰 데이터를 ReviewCardData 형식으로 변환
    const reviews: ReviewCardData[] = doctor.Hospital.Review.map((review) => {
      return {
        id: review.id,
        userId: review.User.id,
        rating: review.rating,
        title: review.title ? parseLocalizedText(review.title) : null,
        content: review.content ? parseLocalizedText(review.content) : null,
        concernsMultilingual: review.concernsMultilingual
          ? parseLocalizedText(review.concernsMultilingual as any)
          : null,
        createdAt: review.createdAt,
        viewCount: review.viewCount,
        likeCount: review.likeCount,
        commentCount: review.commentCount,
        likedUserIds: [], // ReviewLike 정보가 없으므로 빈 배열
        isLiked: false, // 기본값으로 false 설정
        isRecommended: review.isRecommended,
        user: {
          displayName: getUserDisplayName(review.User),
          nickName: review.User.nickName,
          name: review.User.name,
        },
        hospital: {
          id: doctor.Hospital.id,
          name: parseLocalizedText(doctor.Hospital.name),
          address: parseLocalizedText(doctor.Hospital.address),
          prices: parsePriceInfo(doctor.Hospital.prices),
          rating: doctor.Hospital.rating,
          reviewCount: doctor.Hospital._count.Review,
          thumbnailImageUrl:
            doctor.Hospital.HospitalImage.find((img) => img.imageType === 'MAIN')?.imageUrl ||
            doctor.Hospital.HospitalImage[0]?.imageUrl ||
            null,
          discountRate: doctor.Hospital.discountRate,
          ranking: doctor.Hospital.ranking,
          district: {
            name: doctor.Hospital.District
              ? parseLocalizedText(doctor.Hospital.District.name)
              : { ko_KR: '', en_US: '', th_TH: '' },
            displayName: doctor.Hospital.District?.displayName
              ? parseLocalizedText(doctor.Hospital.District.displayName)
              : null,
          },
          displayLocationName: doctor.Hospital.displayLocationName
            ? parseLocalizedText(doctor.Hospital.displayLocationName)
            : null,
        },
        medicalSpecialty: {
          name: parseLocalizedText(review.MedicalSpecialty.name),
          specialtyType: review.MedicalSpecialty.specialtyType,
        },
        images: {
          before: review.ReviewImage.filter((img) => img.imageType === 'BEFORE').map((img) => ({
            id: img.id,
            imageType: img.imageType,
            imageUrl: img.imageUrl,
            alt: img.alt,
            order: img.order,
          })),
          after: review.ReviewImage.filter((img) => img.imageType === 'AFTER').map((img) => ({
            id: img.id,
            imageType: img.imageType,
            imageUrl: img.imageUrl,
            alt: img.alt,
            order: img.order,
          })),
        },
      };
    });

    // 응답 데이터 구성
    const response = {
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
      hospital: {
        id: doctor.Hospital.id,
        name: parseLocalizedText(doctor.Hospital.name),
        address: parseLocalizedText(doctor.Hospital.address),
        phoneNumber: doctor.Hospital.phoneNumber,
        latitude: doctor.Hospital.latitude,
        longitude: doctor.Hospital.longitude,
        rating: doctor.Hospital.rating,
        reviewCount: doctor.Hospital._count.Review, // 실제 리뷰 수
        prices: doctor.Hospital.prices,
        discountRate: doctor.Hospital.discountRate,
        ranking: doctor.Hospital.ranking,
        displayLocationName: doctor.Hospital.displayLocationName
          ? parseLocalizedText(doctor.Hospital.displayLocationName)
          : null,
        district: doctor.Hospital.District
          ? {
              id: doctor.Hospital.District.id,
              name: parseLocalizedText(doctor.Hospital.District.name),
              displayName: doctor.Hospital.District.displayName,
              countryCode: doctor.Hospital.District.countryCode,
              level: doctor.Hospital.District.level,
              order: doctor.Hospital.District.order,
              parentId: doctor.Hospital.District.parentId,
            }
          : null,
        hospitalImages: doctor.Hospital.HospitalImage.map((image) => ({
          id: image.id,
          imageType: image.imageType,
          imageUrl: image.imageUrl,
          alt: image.alt,
          order: image.order,
        })),
        medicalSpecialties: doctor.Hospital.HospitalMedicalSpecialty.map((item) => ({
          id: item.MedicalSpecialty.id,
          name: parseLocalizedText(item.MedicalSpecialty.name),
          specialtyType: item.MedicalSpecialty.specialtyType,
        })),
        reviews,
      },
      doctorImages: doctor.DoctorImage.map((image) => ({
        id: image.id,
        imageType: image.imageType,
        imageUrl: image.imageUrl,
        alt: image.alt,
        order: image.order,
      })),
      medicalSpecialties: doctor.DoctorMedicalSpecialty.map((item) => ({
        id: item.MedicalSpecialty.id,
        name: parseLocalizedText(item.MedicalSpecialty.name),
        specialtyType: item.MedicalSpecialty.specialtyType,
      })),
      createdAt: doctor.createdAt,
      updatedAt: doctor.updatedAt,
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching doctor detail:', error);
    return NextResponse.json(
      { error: '의사 정보를 불러오는 중 오류가 발생했습니다.' },
      { status: 500 },
    );
  }
}
