import { PrismaClient } from '@prisma/client';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient({
  log: ['error'],
});

// 로케일별 sitemap 파일 경로
const SITEMAP_FILES = [
  { locale: 'ko', path: 'public/sitemap_ko.xml' },
  { locale: 'en', path: 'public/sitemap_en.xml' },
  { locale: 'th', path: 'public/sitemap_th.xml' },
  { locale: 'en', path: 'public/en/sitemap_en.xml' },
  { locale: 'th', path: 'public/th/sitemap_th.xml' },
] as const;

const BASE_URL = 'https://www.k-doc.kr';

/**
 * sitemap XML 파일에서 병원 URL 추출
 */
function extractHospitalUrlsFromSitemap(
  filePath: string,
  locale: string,
): Set<string> {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  파일이 존재하지 않습니다: ${filePath}`);
    return new Set();
  }

  const xmlContent = fs.readFileSync(fullPath, 'utf-8');
  const hospitalUrls = new Set<string>();
  
  // 정규식으로 병원 URL 추출
  const hospitalUrlPattern = new RegExp(
    `<loc>https://www\\.k-doc\\.kr/${locale}/hospital/([a-f0-9-]+)</loc>`,
    'g',
  );
  
  let match;
  while ((match = hospitalUrlPattern.exec(xmlContent)) !== null) {
    if (match[1]) {
      hospitalUrls.add(match[1]);
    }
  }

  return hospitalUrls;
}

/**
 * sitemap XML 파일 업데이트
 */
function updateSitemapFile(
  filePath: string,
  locale: string,
  dbHospitalIds: Set<string>,
): { added: number; removed: number } {
  const fullPath = path.join(process.cwd(), filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`⚠️  파일이 존재하지 않습니다: ${filePath}`);
    return { added: 0, removed: 0 };
  }

  const xmlContent = fs.readFileSync(fullPath, 'utf-8');
  
  // 기존 병원 URL 추출
  const existingHospitalIds = extractHospitalUrlsFromSitemap(filePath, locale);
  
  // XML을 라인별로 분할
  const lines = xmlContent.split('\n');
  const nonHospitalLines: string[] = [];
  const hospitalUrlBlocks: Array<{ id: string; lines: string[] }> = [];
  
  let currentUrlBlock: string[] = [];
  let inHospitalUrl = false;
  let currentHospitalId: string | null = null;
  
  // XML 파싱: 병원 URL 블록과 그 외 URL 블록 분리
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // 병원 URL 시작 감지
    const hospitalUrlMatch = line.match(
      new RegExp(`<loc>https://www\\.k-doc\\.kr/${locale}/hospital/([a-f0-9-]+)</loc>`),
    );
    
    if (hospitalUrlMatch) {
      inHospitalUrl = true;
      currentHospitalId = hospitalUrlMatch[1];
      currentUrlBlock = [line];
    } else if (inHospitalUrl) {
      currentUrlBlock.push(line);
      
      // URL 블록 종료 감지
      if (line.includes('</url>')) {
        if (currentHospitalId) {
          hospitalUrlBlocks.push({
            id: currentHospitalId,
            lines: currentUrlBlock,
          });
        }
        currentUrlBlock = [];
        inHospitalUrl = false;
        currentHospitalId = null;
      }
    } else {
      nonHospitalLines.push(line);
    }
  }
  
  // DB에 있는 병원 URL만 유지
  const keptHospitalBlocks = hospitalUrlBlocks.filter((block) =>
    dbHospitalIds.has(block.id),
  );
  
  // 제거된 병원 수 계산
  const removedIds = hospitalUrlBlocks.filter(
    (block) => !dbHospitalIds.has(block.id),
  );
  
  // DB에 있지만 sitemap에 없는 병원 URL 생성
  const today = new Date().toISOString().split('T')[0] + 'T00:00:00+00:00';
  const newHospitalBlocks: Array<{ id: string; lines: string[] }> = [];
  
  for (const hospitalId of dbHospitalIds) {
    if (!existingHospitalIds.has(hospitalId)) {
      newHospitalBlocks.push({
        id: hospitalId,
        lines: [
          `  <url>`,
          `    <loc>${BASE_URL}/${locale}/hospital/${hospitalId}</loc>`,
          `    <lastmod>${today}</lastmod>`,
          `    <priority>0.80</priority>`,
          `  </url>`,
        ],
      });
    }
  }
  
  // 병원 URL 블록을 ID 순으로 정렬
  const allHospitalBlocks = [...keptHospitalBlocks, ...newHospitalBlocks].sort(
    (a, b) => a.id.localeCompare(b.id),
  );
  
  // </urlset> 태그 찾기
  let urlsetEndIndex = -1;
  for (let i = nonHospitalLines.length - 1; i >= 0; i--) {
    if (nonHospitalLines[i].includes('</urlset>')) {
      urlsetEndIndex = i;
      break;
    }
  }
  
  // 새로운 XML 구성
  const updatedLines: string[] = [];
  
  if (urlsetEndIndex >= 0) {
    // </urlset> 태그 앞까지의 내용
    updatedLines.push(...nonHospitalLines.slice(0, urlsetEndIndex));
    
    // 병원 URL 블록 추가
    for (const block of allHospitalBlocks) {
      updatedLines.push(...block.lines);
    }
    
    // </urlset> 태그 추가
    updatedLines.push(nonHospitalLines[urlsetEndIndex]);
  } else {
    // </urlset> 태그를 찾을 수 없는 경우 전체 내용 유지
    updatedLines.push(...nonHospitalLines);
    for (const block of allHospitalBlocks) {
      updatedLines.push(...block.lines);
    }
  }
  
  // 파일 저장
  const updatedContent = updatedLines.join('\n');
  fs.writeFileSync(fullPath, updatedContent, 'utf-8');
  
  return {
    added: newHospitalBlocks.length,
    removed: removedIds.length,
  };
}

/**
 * 메인 함수
 */
async function updateSitemapHospitals() {
  console.log('🚀 Sitemap 병원 데이터 업데이트 시작...\n');

  try {
    // 1. DB에서 승인상태가 REJECTED가 아닌 병원 ID 조회
    console.log('📊 DB에서 승인된 병원 데이터 조회 중...');
    const hospitals = await prisma.hospital.findMany({
      where: {
        approvalStatusType: {
          not: 'REJECTED',
        },
      },
      select: {
        id: true,
      },
    });

    const dbHospitalIds = new Set(hospitals.map((h) => h.id));
    console.log(`✅ DB에서 ${dbHospitalIds.size}개의 승인된 병원을 찾았습니다.\n`);

    // 2. 각 sitemap 파일 처리
    let totalAdded = 0;
    let totalRemoved = 0;

    for (const { locale, path: filePath } of SITEMAP_FILES) {
      console.log(`\n📝 처리 중: ${filePath} (${locale})`);

      // 기존 병원 URL 추출
      const existingHospitalIds = extractHospitalUrlsFromSitemap(
        filePath,
        locale,
      );
      console.log(`  - 기존 병원 URL: ${existingHospitalIds.size}개`);

      // sitemap 업데이트
      const { added, removed } = updateSitemapFile(
        filePath,
        locale,
        dbHospitalIds,
      );

      console.log(`  - 추가된 병원: ${added}개`);
      console.log(`  - 제거된 병원: ${removed}개`);

      totalAdded += added;
      totalRemoved += removed;
    }

    console.log('\n📊 전체 요약:');
    console.log(`  - DB 승인 병원 수: ${dbHospitalIds.size}개`);
    console.log(`  - 추가된 병원 URL: ${totalAdded}개`);
    console.log(`  - 제거된 병원 URL: ${totalRemoved}개`);

    // 3. 비교 결과 출력
    console.log('\n🔍 상세 비교 결과:');
    for (const { locale, path: filePath } of SITEMAP_FILES) {
      const existingHospitalIds = extractHospitalUrlsFromSitemap(
        filePath,
        locale,
      );

      const missingInSitemap = Array.from(dbHospitalIds).filter(
        (id) => !existingHospitalIds.has(id),
      );
      const extraInSitemap = Array.from(existingHospitalIds).filter(
        (id) => !dbHospitalIds.has(id),
      );

      if (missingInSitemap.length > 0) {
        console.log(`\n  ${filePath} (${locale}):`);
        console.log(`    - sitemap에 없지만 DB에 있는 병원: ${missingInSitemap.length}개`);
        if (missingInSitemap.length <= 10) {
          missingInSitemap.forEach((id) => console.log(`      • ${id}`));
        }
      }

      if (extraInSitemap.length > 0) {
        console.log(`\n  ${filePath} (${locale}):`);
        console.log(`    - sitemap에 있지만 DB에 없는 병원: ${extraInSitemap.length}개`);
        if (extraInSitemap.length <= 10) {
          extraInSitemap.forEach((id) => console.log(`      • ${id}`));
        }
      }
    }

    console.log('\n✅ Sitemap 업데이트 완료!');
  } catch (error) {
    console.error('❌ 업데이트 중 오류 발생:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
    console.log('\n🔌 데이터베이스 연결 종료');
  }
}

// 스크립트 실행
if (require.main === module) {
  updateSitemapHospitals()
    .then(() => {
      console.log('\n🎉 스크립트 실행 완료!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

export { updateSitemapHospitals };
