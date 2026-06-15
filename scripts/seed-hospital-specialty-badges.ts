import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/** 숨긴 레거시 카테고리 — 배지 대상에서 제외 */
const HIDDEN_SPECIALTY_TYPES = new Set(['LIPOSUCTION', 'BODY', 'ETC']);

/**
 * 예외 병원별 카테고리 배지 오버라이드 정의
 * - specialtyType: 상위 카테고리 타입 (EYES, NOSE 등)
 * - subSpecialtyNameKo: 하위 카테고리 ko_KR 이름 (절개, 비절개 등) — 지정 시 하위 카테고리에 적용
 * - badge: 적용할 배지 배열
 */
interface SpecialtyOverride {
  specialtyType: string;
  subSpecialtyNameKo?: string;
  badge: string[];
}

const HOSPITAL_BADGE_OVERRIDES: Record<string, SpecialtyOverride[]> = {
  '73f220a7-33bf-424c-a6fb-647563ffe6ba': [
    // 그날성형외과의원
    { specialtyType: 'EYES', badge: ['BEST'] },
    { specialtyType: 'NOSE', badge: ['BEST'] },
    { specialtyType: 'LIFTING', subSpecialtyNameKo: '절개', badge: ['HOT'] },
  ],
  '2ab8c3e5-16b8-4632-bdd0-19afa885ffd4': [
    // 아이루미성형외과의원
    { specialtyType: 'EYES', badge: ['HOT'] },
    { specialtyType: 'FACIAL_CONTOURING', badge: ['BEST'] },
  ],
  'aa19646d-16d2-429a-9646-a629a612082e': [
    // 원셀의원
    { specialtyType: 'EYES', badge: ['HOT'] },
    { specialtyType: 'NOSE', badge: ['HOT'] },
    { specialtyType: 'DERMATOLOGY', badge: ['HOT'] },
    { specialtyType: 'STEM_CELL', badge: ['BEST'] },
  ],
  '931403cf-cb53-4284-a8db-94aaaa628e6f': [
    // 스노우의원
    { specialtyType: 'EYES', badge: ['HOT'] },
    { specialtyType: 'BODY_LINE', badge: ['BEST'] },
  ],
};

async function seedHospitalSpecialtyBadges() {
  console.log('🚀 병원별 카테고리 배지 시딩 시작...\n');

  // 1. badge가 있는 모든 병원 조회 (빈 배열 병원 제외)
  const hospitals = await prisma.hospital.findMany({
    where: {
      badge: { isEmpty: false },
    },
    select: {
      id: true,
      name: true,
      badge: true,
      HospitalMedicalSpecialty: {
        include: {
          MedicalSpecialty: {
            select: {
              id: true,
              specialtyType: true,
              name: true,
              parentSpecialtyId: true,
            },
          },
        },
      },
    },
  });

  console.log(`📋 글로벌 배지가 있는 병원 수: ${hospitals.length}개\n`);

  let totalUpserted = 0;
  let exceptionHospitalCount = 0;

  for (const hospital of hospitals) {
    const hospitalName = (hospital.name as Record<string, string>)?.ko_KR ?? hospital.id;
    const globalBadge = hospital.badge;
    const overrides = HOSPITAL_BADGE_OVERRIDES[hospital.id];

    if (overrides) {
      exceptionHospitalCount++;
      console.log(`⭐ 예외 병원: ${hospitalName} (글로벌 배지: ${globalBadge.join(', ')})`);
    }

    for (const hms of hospital.HospitalMedicalSpecialty) {
      const specialty = hms.MedicalSpecialty;

      // 숨긴 레거시 카테고리는 스킵
      if (HIDDEN_SPECIALTY_TYPES.has(specialty.specialtyType)) {
        continue;
      }

      // 이 specialty에 적용할 배지 결정
      let badge = globalBadge;

      if (overrides) {
        const specialtyNameKo = (specialty.name as Record<string, string>)?.ko_KR;
        const isSubSpecialty = !!specialty.parentSpecialtyId;

        const matchedOverride = overrides.find((override) => {
          if (isSubSpecialty) {
            // 하위 카테고리: subSpecialtyNameKo로 매칭
            return (
              override.subSpecialtyNameKo !== undefined &&
              specialtyNameKo === override.subSpecialtyNameKo
            );
          } else {
            // 상위 카테고리: specialtyType으로 매칭 (subSpecialtyNameKo 없는 오버라이드)
            return (
              override.specialtyType === specialty.specialtyType &&
              override.subSpecialtyNameKo === undefined
            );
          }
        });

        if (matchedOverride) {
          badge = matchedOverride.badge;
          console.log(
            `  → ${specialtyNameKo} (${specialty.specialtyType}): ${badge.join(', ')} [오버라이드]`,
          );
        }
      }

      await prisma.hospitalSpecialtyBadge.upsert({
        where: {
          hospitalId_medicalSpecialtyId: {
            hospitalId: hospital.id,
            medicalSpecialtyId: specialty.id,
          },
        },
        create: {
          id: uuidv4(),
          hospitalId: hospital.id,
          medicalSpecialtyId: specialty.id,
          badge,
          updatedAt: new Date(),
        },
        update: {
          badge,
          updatedAt: new Date(),
        },
      });

      totalUpserted++;
    }
  }

  console.log(`\n✅ 완료`);
  console.log(`  - 처리 병원: ${hospitals.length}개 (예외 병원 ${exceptionHospitalCount}개 포함)`);
  console.log(`  - 생성/수정된 HospitalSpecialtyBadge: ${totalUpserted}개`);
}

seedHospitalSpecialtyBadges()
  .then(() => {
    console.log('\n🎉 시딩 완료!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 실패:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
