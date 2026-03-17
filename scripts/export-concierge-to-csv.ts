/**
 * 컨시어지 페이지 다국어 텍스트를 CSV로 내보냅니다. (FAQ 제외)
 *
 * 실행: pnpm export-concierge
 * 출력: 프로젝트 루트 concierge-export.csv
 *
 * 구글 시트 업로드:
 *   파일 → 가져오기 → 업로드 → concierge-export.csv → 현재 시트 바꾸기
 *
 * 컬럼: section | key | description | ko | en | ja | zh-Hant | th | hi | ar | ru | tl
 */

import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'concierge-export.csv');

const LOCALES = ['ko', 'en', 'ja', 'zh-Hant', 'th', 'hi', 'ar', 'ru', 'tl'] as const;

// 내보낼 필드 정의 (section: 시트에서 시각적 그룹, path: JSON 내 점표기법 경로)
const FIELDS = [
  // ─── 히어로 카드 ───────────────────────────────────────────
  { section: '히어로 카드', path: 'heroCard1Line1', desc: '카드1 첫째줄 (VIP)' },
  { section: '히어로 카드', path: 'heroCard1Line2', desc: '카드1 둘째줄 (Transportation)' },
  { section: '히어로 카드', path: 'heroCard2Line1', desc: '카드2 첫째줄 (Medical)' },
  { section: '히어로 카드', path: 'heroCard2Line2', desc: '카드2 둘째줄 (Interpreter)' },
  { section: '히어로 카드', path: 'heroCard3Line1', desc: '카드3 첫째줄 (K-DOC)' },
  { section: '히어로 카드', path: 'heroCard3Line2', desc: '카드3 둘째줄 (Recovery Care)' },

  // ─── 섹션 2: 차량 ──────────────────────────────────────────
  { section: '섹션2: 차량', path: 'section2Title', desc: '섹션 제목' },

  // ─── 섹션 3: 서비스 플랜 ───────────────────────────────────
  { section: '섹션3: 서비스 플랜', path: 'section3Title', desc: '섹션 제목 (\\n = 줄바꿈)' },
  { section: '섹션3: 서비스 플랜', path: 'section3Description', desc: '섹션 설명' },
  { section: '섹션3: 서비스 플랜', path: 'planCard.recommended', desc: '플랜 카드 - 추천 배지' },
  { section: '섹션3: 서비스 플랜', path: 'planCard.planTitle', desc: '플랜 카드 - 플랜명' },
  { section: '섹션3: 서비스 플랜', path: 'planCard.startingAt', desc: '플랜 카드 - Starting at 문구' },
  { section: '섹션3: 서비스 플랜', path: 'planCard.price', desc: '플랜 카드 - 가격' },
  { section: '섹션3: 서비스 플랜', path: 'planCard.ctaButton', desc: '플랜 카드 - 버튼 텍스트' },
  { section: '섹션3: 서비스 플랜', path: 'notice.noticeTitle', desc: '안내사항 제목' },
  { section: '섹션3: 서비스 플랜', path: 'notice.noticeLine1', desc: '안내사항 1번째 줄' },
  { section: '섹션3: 서비스 플랜', path: 'notice.noticeLine2', desc: '안내사항 2번째 줄' },

  // ─── 섹션 4: 플랜 비교표 ───────────────────────────────────
  { section: '섹션4: 플랜 비교표', path: 'section4Title', desc: '섹션 제목' },
  { section: '섹션4: 플랜 비교표', path: 'section4Description', desc: '섹션 설명' },
  { section: '섹션4: 플랜 비교표', path: 'planBasic', desc: 'Basic 플랜 컬럼명' },
  { section: '섹션4: 플랜 비교표', path: 'planPlus', desc: 'Plus 플랜 컬럼명' },
  { section: '섹션4: 플랜 비교표', path: 'planPremium', desc: 'Premium 플랜 컬럼명' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.quickConsultation', desc: '기능 - 빠른 상담' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.fastHospitalBooking', desc: '기능 - 빠른 병원 예약' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.medicalInterpreter', desc: '기능 - 의료 통역사' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.scheduleCoordination', desc: '기능 - 일정 조율' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.airportPickup', desc: '기능 - 공항 픽업' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.hospitalTransfer', desc: '기능 - 병원 이동' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.dedicatedManager', desc: '기능 - 전담 매니저' },
  { section: '섹션4: 플랜 비교표', path: 'planCard.features.recoveryPackage', desc: '기능 - 회복 케어' },

  // ─── 섹션 5: 리뷰 ──────────────────────────────────────────
  { section: '섹션5: 리뷰', path: 'section5Title', desc: '섹션 제목 (\\n = 줄바꿈)' },
  { section: '섹션5: 리뷰', path: 'reviews.sectionTitle', desc: '캐러셀 소제목' },
  { section: '섹션5: 리뷰', path: 'review1Author', desc: '리뷰1 작성자' },
  { section: '섹션5: 리뷰', path: 'reviews.review1Title', desc: '리뷰1 제목' },
  { section: '섹션5: 리뷰', path: 'reviews.review1Body', desc: '리뷰1 본문' },
  { section: '섹션5: 리뷰', path: 'review2Author', desc: '리뷰2 작성자' },
  { section: '섹션5: 리뷰', path: 'reviews.review2Title', desc: '리뷰2 제목' },
  { section: '섹션5: 리뷰', path: 'reviews.review2Body', desc: '리뷰2 본문' },
  { section: '섹션5: 리뷰', path: 'review3Author', desc: '리뷰3 작성자' },
  { section: '섹션5: 리뷰', path: 'reviews.review3Title', desc: '리뷰3 제목' },
  { section: '섹션5: 리뷰', path: 'reviews.review3Body', desc: '리뷰3 본문' },
  { section: '섹션5: 리뷰', path: 'review4Author', desc: '리뷰4 작성자' },
  { section: '섹션5: 리뷰', path: 'reviews.review4Title', desc: '리뷰4 제목' },
  { section: '섹션5: 리뷰', path: 'reviews.review4Body', desc: '리뷰4 본문' },
  { section: '섹션5: 리뷰', path: 'review5Author', desc: '리뷰5 작성자' },
  { section: '섹션5: 리뷰', path: 'reviews.review5Title', desc: '리뷰5 제목' },
  { section: '섹션5: 리뷰', path: 'reviews.review5Body', desc: '리뷰5 본문' },

  // ─── 섹션 6: Why K-DOC ─────────────────────────────────────
  { section: '섹션6: Why K-DOC', path: 'section6Title', desc: '섹션 제목 (\\n = 줄바꿈)' },
  { section: '섹션6: Why K-DOC', path: 'section6Description', desc: '섹션 설명' },
  { section: '섹션6: Why K-DOC', path: 'section6NoticeTitle', desc: '안내 제목' },
  { section: '섹션6: Why K-DOC', path: 'section6NoticeBody', desc: '안내 본문' },

  // ─── 섹션 7: 의료관광 ──────────────────────────────────────
  { section: '섹션7: 의료관광', path: 'section7TitleLine1', desc: '제목 1행' },
  { section: '섹션7: 의료관광', path: 'section7TitleLine2Italic', desc: '제목 2행 이탤릭 부분' },
  { section: '섹션7: 의료관광', path: 'section7TitleLine2Normal', desc: '제목 2행 일반 부분' },
  { section: '섹션7: 의료관광', path: 'section7Description', desc: '섹션 설명' },

  // ─── 플로팅 버튼 ───────────────────────────────────────────
  { section: '플로팅 버튼', path: 'floatingButtonText', desc: '하단 CTA 버튼 텍스트' },
] as const;

type FieldPath = (typeof FIELDS)[number]['path'];

// dot-notation 경로로 concierge 객체에서 값 읽기
function getByPath(concierge: Record<string, unknown>, dotPath: FieldPath): string {
  const parts = dotPath.split('.');
  let cur: unknown = concierge;
  for (const part of parts) {
    if (cur == null || typeof cur !== 'object') return '';
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === 'string' ? cur : '';
}

function escapeCsv(value: string): string {
  if (value.includes(',') || value.includes('\n') || value.includes('"')) {
    return `"${value.replace(/"/g, '""')}"`;
  }
  return value;
}

function main() {
  // 각 locale의 concierge 객체 로드
  const conciergeByLocale: Record<string, Record<string, unknown>> = {};
  for (const locale of LOCALES) {
    const filePath = path.join(DICTS_DIR, `${locale}.json`);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️  ${locale}.json 없음`);
      conciergeByLocale[locale] = {};
      continue;
    }
    const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    conciergeByLocale[locale] = data?.concierge ?? {};
  }

  const lines: string[] = [];

  // 헤더
  const header = ['섹션', 'key', '설명', ...LOCALES];
  lines.push(header.map(escapeCsv).join(','));

  // 데이터 행
  for (const field of FIELDS) {
    const values = LOCALES.map((locale) =>
      getByPath(conciergeByLocale[locale], field.path),
    );
    const row = [field.section, field.path, field.desc, ...values];
    lines.push(row.map(escapeCsv).join(','));
  }

  // UTF-8 BOM (구글 시트 한글 깨짐 방지)
  const bom = '\uFEFF';
  fs.writeFileSync(OUTPUT_PATH, bom + lines.join('\n'), 'utf-8');

  console.log('📂 출력:', OUTPUT_PATH);
  console.log(`📊 항목 수: ${FIELDS.length}개 / 언어 수: ${LOCALES.length}개`);
  console.log('');
  console.log('👉 구글 시트: 파일 → 가져오기 → 업로드 → concierge-export.csv → 현재 시트 바꾸기');
}

main();
