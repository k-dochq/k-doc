import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * LIPOSUCTION 또는 BODY 카테고리를 가진 병원에 BODY_LINE 카테고리를 추가하는 스크립트
 *
 * - 기존 카테고리는 유지하고 BODY_LINE만 새로 추가
 * - 이미 BODY_LINE이 있는 병원은 스킵
 */
async function addBodyLineToHospitals() {
  console.log('🚀 BODY_LINE 카테고리 추가 스크립트 시작...\n');

  // 1. BODY_LINE MedicalSpecialty 레코드 조회
  const bodyLineSpecialty = await prisma.medicalSpecialty.findFirst({
    where: { specialtyType: 'BODY_LINE' },
    select: { id: true, name: true },
  });

  if (!bodyLineSpecialty) {
    throw new Error('❌ BODY_LINE MedicalSpecialty 레코드가 없습니다. DB에 먼저 추가해주세요.');
  }

  console.log(`✅ BODY_LINE specialty 확인: ${bodyLineSpecialty.id}`);

  // 2. LIPOSUCTION 또는 BODY를 가진 병원 ID 목록 조회
  const targetHospitalSpecialties = await prisma.hospitalMedicalSpecialty.findMany({
    where: {
      MedicalSpecialty: {
        specialtyType: { in: ['LIPOSUCTION', 'BODY'] },
      },
    },
    select: {
      hospitalId: true,
      MedicalSpecialty: { select: { specialtyType: true } },
    },
  });

  const targetHospitalIds = Array.from(new Set(targetHospitalSpecialties.map((s) => s.hospitalId)));
  console.log(`\n📋 LIPOSUCTION 또는 BODY 카테고리를 가진 병원 수: ${targetHospitalIds.length}개`);

  if (targetHospitalIds.length === 0) {
    console.log('대상 병원이 없습니다. 종료합니다.');
    return;
  }

  // 3. 이미 BODY_LINE을 가진 병원 제외
  const alreadyHasBodyLine = await prisma.hospitalMedicalSpecialty.findMany({
    where: {
      hospitalId: { in: targetHospitalIds },
      medicalSpecialtyId: bodyLineSpecialty.id,
    },
    select: { hospitalId: true },
  });

  const alreadyIds = new Set(alreadyHasBodyLine.map((s) => s.hospitalId));
  const hospitalsToUpdate = targetHospitalIds.filter((id) => !alreadyIds.has(id));

  console.log(`  - 이미 BODY_LINE 있는 병원: ${alreadyIds.size}개 (스킵)`);
  console.log(`  - 새로 추가할 병원: ${hospitalsToUpdate.length}개\n`);

  if (hospitalsToUpdate.length === 0) {
    console.log('추가할 병원이 없습니다. 종료합니다.');
    return;
  }

  // 4. BODY_LINE 카테고리 일괄 추가
  const newRecords = hospitalsToUpdate.map((hospitalId) => ({
    id: uuidv4(),
    hospitalId,
    medicalSpecialtyId: bodyLineSpecialty.id,
    createdAt: new Date(),
  }));

  const result = await prisma.hospitalMedicalSpecialty.createMany({
    data: newRecords,
    skipDuplicates: true,
  });

  console.log(`✅ BODY_LINE 카테고리 추가 완료: ${result.count}개 병원\n`);

  // 5. 결과 확인
  const verifyCount = await prisma.hospitalMedicalSpecialty.count({
    where: {
      medicalSpecialtyId: bodyLineSpecialty.id,
    },
  });

  console.log(`📊 현재 BODY_LINE 카테고리를 가진 전체 병원 수: ${verifyCount}개`);
}

addBodyLineToHospitals()
  .then(() => {
    console.log('\n🎉 스크립트 완료!');
    process.exit(0);
  })
  .catch((error) => {
    console.error('\n💥 스크립트 실행 실패:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
