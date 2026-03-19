/**
 * 각 locale JSON의 concierge.faq.items 를 읽어 CSV로 내보냅니다.
 *
 * 실행: pnpm export-faq
 * 출력: 프로젝트 루트 faq-export.csv
 *
 * 컬럼: # | ko_question | ko_answer | en_question | en_answer | th_question | ...
 * 구글 시트 업로드: 파일 → 가져오기 → 업로드 → faq-export.csv → 현재 시트 바꾸기
 */

import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'faq-export.csv');

const LOCALES = ['ko', 'en', 'th', 'zh-Hant', 'ja', 'hi', 'tl', 'ar', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

interface FaqItem {
  question: string;
  answer: string;
}

function loadFaqItems(locale: Locale): FaqItem[] {
  const filePath = path.join(DICTS_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${locale}.json 없음, 빈 값으로 처리`);
    return [];
  }
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  return (data?.concierge?.faq?.items ?? []) as FaqItem[];
}

function escapeCsv(value: string | number): string {
  const str = String(value);
  // 쉼표, 줄바꿈, 큰따옴표가 포함된 경우 큰따옴표로 감싸고 내부 큰따옴표는 두 번 escape
  if (str.includes(',') || str.includes('\n') || str.includes('"')) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

function main() {
  const localeData: Record<Locale, FaqItem[]> = {} as Record<Locale, FaqItem[]>;
  let maxItems = 0;

  for (const locale of LOCALES) {
    const items = loadFaqItems(locale);
    localeData[locale] = items;
    if (items.length > maxItems) maxItems = items.length;
  }

  if (maxItems === 0) {
    console.error('❌ FAQ 항목이 없습니다.');
    process.exit(1);
  }

  const lines: string[] = [];

  // 헤더 행
  const header = ['#', ...LOCALES.flatMap((locale) => [`${locale}_question`, `${locale}_answer`])];
  lines.push(header.map(escapeCsv).join(','));

  // 데이터 행
  for (let i = 0; i < maxItems; i++) {
    const row = [
      i + 1,
      ...LOCALES.flatMap((locale) => {
        const item = localeData[locale][i];
        return [item?.question ?? '', item?.answer ?? ''];
      }),
    ];
    lines.push(row.map(escapeCsv).join(','));
  }

  // UTF-8 BOM 추가 (구글 시트에서 한글/다국어 깨짐 방지)
  const bom = '\uFEFF';
  fs.writeFileSync(OUTPUT_PATH, bom + lines.join('\n'), 'utf-8');

  console.log('📂 출력:', OUTPUT_PATH);
  console.log(`📊 언어 수: ${LOCALES.length}, 항목 수: ${maxItems}`);
  console.log('✅ 완료');
  console.log('');
  console.log('👉 구글 시트: 파일 → 가져오기 → 업로드 → faq-export.csv → 현재 시트 바꾸기');
}

main();
