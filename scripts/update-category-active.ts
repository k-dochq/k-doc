// import { PrismaClient } from '@prisma/client';

// const prisma = new PrismaClient();

// /**
//  * 지정된 카테고리들의 isActive를 true로 업데이트하는 스크립트
//  *
//  * 대상 카테고리 (ko_KR 기준):
//  * - 눈, 코, 안면윤곽, 가슴, 줄기세포, 지방성형, 리프팅, 모발이식, 치아, 입술
//  */
// async function updateCategoryActive() {
//   console.log('🚀 카테고리 활성화 업데이트 시작...');

//   // 대상 카테고리 이름들 (ko_KR 기준)
//   const targetCategories = [
//     '눈',
//     '코',
//     '안면윤곽',
//     '가슴',
//     '줄기세포',
//     '지방성형',
//     '리프팅',
//     '모발이식',
//     '치아',
//     '입술',
//   ];

//   try {
//     // 1. 모든 PART 카테고리 가져오기
//     console.log('\n📊 모든 PART 카테고리 조회 중...');
//     const allPartCategories = await prisma.category.findMany({
//       where: {
//         categoryType: 'PART',
//       },
//       select: {
//         id: true,
//         name: true,
//         isActive: true,
//       },
//     });

//     // 2. 대상 카테고리 필터링
//     const currentCategories = allPartCategories.filter((cat) => {
//       const name = (cat.name as any)?.ko_KR;
//       return name && targetCategories.includes(name);
//     });

//     console.log(
//       `\n📋 대상 카테고리 ${targetCategories.length}개 중 ${currentCategories.length}개 발견:`,
//     );
//     currentCategories.forEach((cat) => {
//       const name = (cat.name as any)?.ko_KR || 'Unknown';
//       console.log(`  - ${name}: ${cat.isActive ? '✅ 활성' : '❌ 비활성'}`);
//     });

//     // 3. 업데이트 실행 (개별 업데이트)
//     console.log('\n🔄 카테고리 활성화 업데이트 중...');

//     let updateCount = 0;
//     for (const category of currentCategories) {
//       await prisma.category.update({
//         where: { id: category.id },
//         data: {
//           isActive: true,
//           updatedAt: new Date(),
//         },
//       });
//       updateCount++;
//     }

//     console.log(`✅ ${updateCount}개 카테고리가 활성화되었습니다.`);

//     // 4. 업데이트 후 상태 확인
//     console.log('\n📊 업데이트 후 상태 확인...');
//     const updatedCategories = await prisma.category.findMany({
//       where: {
//         categoryType: 'PART',
//         id: {
//           in: currentCategories.map((cat) => cat.id),
//         },
//       },
//       select: {
//         id: true,
//         name: true,
//         isActive: true,
//         order: true,
//       },
//       orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
//     });

//     console.log('\n🎯 활성화된 카테고리 목록:');
//     updatedCategories.forEach((cat, index) => {
//       const name = (cat.name as any)?.ko_KR || 'Unknown';
//       const order = cat.order || 0;
//       console.log(
//         `  ${index + 1}. ${name} (order: ${order}) - ${cat.isActive ? '✅ 활성' : '❌ 비활성'}`,
//       );
//     });

//     // 4. 전체 PART 카테고리 중 활성화된 것들 확인
//     const activePartCategories = await prisma.category.count({
//       where: {
//         categoryType: 'PART',
//         isActive: true,
//       },
//     });

//     const totalPartCategories = await prisma.category.count({
//       where: {
//         categoryType: 'PART',
//       },
//     });

//     console.log(
//       `\n📈 전체 PART 카테고리: ${totalPartCategories}개 중 ${activePartCategories}개 활성화`,
//     );
//   } catch (error) {
//     console.error('❌ 업데이트 중 오류 발생:', error);
//     throw error;
//   } finally {
//     await prisma.$disconnect();
//     console.log('\n🔌 데이터베이스 연결 종료');
//   }
// }

// // 스크립트 실행
// if (require.main === module) {
//   updateCategoryActive()
//     .then(() => {
//       console.log('\n🎉 카테고리 활성화 업데이트 완료!');
//       process.exit(0);
//     })
//     .catch((error) => {
//       console.error('\n💥 스크립트 실행 실패:', error);
//       process.exit(1);
//     });
// }

// export { updateCategoryActive };
