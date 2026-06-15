import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

/**
 * LIPOSUCTION 또는 BODY 카테고리를 가진 리뷰에 BODY_LINE 카테고리를 추가하는 스크립트
 *
 * - 기존 카테고리는 유지하고 BODY_LINE만 새로 추가
 * - 이미 BODY_LINE이 있는 리뷰는 스킵
 */
async function addBodyLineToReviews() {
  console.log('🚀 BODY_LINE 카테고리 추가 스크립트 시작 (리뷰)...\n');

  // 1. BODY_LINE MedicalSpecialty 레코드 조회
  const bodyLineSpecialty = await prisma.medicalSpecialty.findFirst({
    where: { specialtyType: 'BODY_LINE' },
    select: { id: true },
  });

  if (!bodyLineSpecialty) {
    throw new Error('❌ BODY_LINE MedicalSpecialty 레코드가 없습니다. DB에 먼저 추가해주세요.');
  }

  console.log(`✅ BODY_LINE specialty 확인: ${bodyLineSpecialty.id}`);

  // 2. LIPOSUCTION 또는 BODY를 가진 리뷰 ID 목록 조회
  //    - Review.medicalSpecialtyId 직접 컬럼 (메인 카테고리)
  //    - ReviewMedicalSpecialty 조인 테이블 (다중 카테고리)
  const [reviewsByDirectField, reviewsByJoinTable] = await Promise.all([
    prisma.review.findMany({
      where: {
        MedicalSpecialty: {
          specialtyType: { in: ['LIPOSUCTION', 'BODY'] },
        },
      },
      select: { id: true },
    }),
    prisma.reviewMedicalSpecialty.findMany({
      where: {
        MedicalSpecialty: {
          specialtyType: { in: ['LIPOSUCTION', 'BODY'] },
        },
      },
      select: { reviewId: true },
    }),
  ]);

  const allTargetIds = [
    ...reviewsByDirectField.map((r) => r.id),
    ...reviewsByJoinTable.map((r) => r.reviewId),
  ];
  const targetReviewIds = Array.from(new Set(allTargetIds));

  console.log(`  - Review.medicalSpecialtyId 기준: ${reviewsByDirectField.length}개`);
  console.log(`  - ReviewMedicalSpecialty 조인 테이블 기준: ${reviewsByJoinTable.length}개`);
  console.log(`\n📋 LIPOSUCTION 또는 BODY 카테고리를 가진 리뷰 수: ${targetReviewIds.length}개`);

  if (targetReviewIds.length === 0) {
    console.log('대상 리뷰가 없습니다. 종료합니다.');
    return;
  }

  // 3. 이미 BODY_LINE을 가진 리뷰 제외
  const alreadyHasBodyLine = await prisma.reviewMedicalSpecialty.findMany({
    where: {
      reviewId: { in: targetReviewIds },
      medicalSpecialtyId: bodyLineSpecialty.id,
    },
    select: { reviewId: true },
  });

  const alreadyIds = new Set(alreadyHasBodyLine.map((s) => s.reviewId));
  const reviewsToUpdate = targetReviewIds.filter((id) => !alreadyIds.has(id));

  console.log(`  - 이미 BODY_LINE 있는 리뷰: ${alreadyIds.size}개 (스킵)`);
  console.log(`  - 새로 추가할 리뷰: ${reviewsToUpdate.length}개\n`);

  if (reviewsToUpdate.length === 0) {
    console.log('추가할 리뷰가 없습니다. 종료합니다.');
    return;
  }

  // 4. BODY_LINE 카테고리 일괄 추가
  const newRecords = reviewsToUpdate.map((reviewId) => ({
    id: uuidv4(),
    reviewId,
    medicalSpecialtyId: bodyLineSpecialty.id,
    createdAt: new Date(),
  }));

  const result = await prisma.reviewMedicalSpecialty.createMany({
    data: newRecords,
    skipDuplicates: true,
  });

  console.log(`✅ BODY_LINE 카테고리 추가 완료: ${result.count}개 리뷰\n`);

  // 5. 결과 확인
  const verifyCount = await prisma.reviewMedicalSpecialty.count({
    where: { medicalSpecialtyId: bodyLineSpecialty.id },
  });

  console.log(`📊 현재 BODY_LINE 카테고리를 가진 전체 리뷰 수: ${verifyCount}개`);
}

addBodyLineToReviews()
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
