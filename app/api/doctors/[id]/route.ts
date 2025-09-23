import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { parseLocalizedText } from 'shared/model/types/common';

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
