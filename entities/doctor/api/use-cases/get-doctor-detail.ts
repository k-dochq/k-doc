import { type Prisma } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { validateHospitalApprovalStatus } from 'shared/lib/hospital/approval-status-validator';

/**
 * Prisma Doctor 쿼리 결과 타입
 */
export type PrismaDoctorWithRelations = Prisma.DoctorGetPayload<{
  include: {
    Hospital: {
      select: {
        id: true;
        name: true;
        address: true;
        badge: true;
        phoneNumber: true;
        latitude: true;
        longitude: true;
        rating: true;
        prices: true;
        discountRate: true;
        ranking: true;
        displayLocationName: true;
        District: {
          select: {
            id: true;
            name: true;
            displayName: true;
            countryCode: true;
            level: true;
            order: true;
            parentId: true;
          };
        };
        HospitalImage: true;
        HospitalMedicalSpecialty: {
          include: {
            MedicalSpecialty: {
              select: {
                id: true;
                name: true;
                specialtyType: true;
              };
            };
          };
        };
        _count: {
          select: {
            Review: true;
          };
        };
        Review: {
          select: {
            id: true;
            userId: true;
            rating: true;
            title: true;
            content: true;
            isRecommended: true;
            viewCount: true;
            likeCount: true;
            createdAt: true;
            concerns: true;
            concernsMultilingual: true;
            commentCount: true;
            User: {
              select: {
                displayName: true;
                nickName: true;
                name: true;
              };
            };
            MedicalSpecialty: {
              select: {
                name: true;
                specialtyType: true;
              };
            };
            ReviewImage: {
              select: {
                id: true;
                imageType: true;
                imageUrl: true;
                alt: true;
                order: true;
              };
              where: {
                isActive: true;
              };
              orderBy: {
                order: 'asc';
              };
            };
            ReviewLike: {
              select: {
                userId: true;
              };
            };
            _count: {
              select: {
                ReviewLike: true;
              };
            };
          };
          orderBy: {
            createdAt: 'desc';
          };
          take: 10;
        };
      };
    };
    DoctorImage: true;
    DoctorMedicalSpecialty: {
      include: {
        MedicalSpecialty: {
          select: {
            id: true;
            name: true;
            specialtyType: true;
          };
        };
      };
    };
  };
}>;

export interface GetDoctorDetailRequest {
  id: string;
}

export interface GetDoctorDetailResponse {
  doctor: PrismaDoctorWithRelations;
}

/**
 * 의사 상세 정보를 조회합니다.
 */
export async function getDoctorDetail(
  request: GetDoctorDetailRequest,
): Promise<GetDoctorDetailResponse> {
  try {
    const { id } = request;

    console.log(`[${new Date().toISOString()}] 의사 상세 조회: ${id}`);

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
            badge: true,
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
              where: {
                // isActive가 false인 리뷰는 제외 (null과 true는 포함)
                isActive: { not: false },
              },
              select: {
                id: true,
                userId: true,
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
                    displayName: true,
                    nickName: true,
                    name: true,
                  },
                },
                MedicalSpecialty: {
                  select: {
                    name: true,
                    specialtyType: true,
                  },
                },
                ReviewImage: {
                  select: {
                    id: true,
                    imageType: true,
                    imageUrl: true,
                    alt: true,
                    order: true,
                  },
                  where: {
                    isActive: true,
                  },
                  orderBy: {
                    order: 'asc',
                  },
                },
                ReviewLike: {
                  select: {
                    userId: true,
                  },
                },
                _count: {
                  select: {
                    ReviewLike: true,
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
      throw new Error(`Doctor not found with id: ${id}`);
    }

    // 소속 병원 승인 상태 검증 (REJECTED인 경우 에러 throw)
    await validateHospitalApprovalStatus(doctor.Hospital.id);

    return {
      doctor,
    };
  } catch (error) {
    console.error('Error fetching doctor detail:', error);
    throw handleDatabaseError(error, 'getDoctorDetail');
  }
}
