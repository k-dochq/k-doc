/**
 * 각 locale JSON의 concierge.faq.items 를 읽어 엑셀로 내보냅니다.
 *
 * 실행: pnpm export-faq
 * 출력: 프로젝트 루트 faq-export.xlsx
 *
 * 컬럼: # | ko_question | ko_answer | en_question | en_answer | th_question | ...
 * 구글 시트에 가져오기: 파일 → 가져오기 → 업로드 → faq-export.xlsx 선택
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'faq-export.xlsx');

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

  // 헤더 행
  const header = ['#'];
  for (const locale of LOCALES) {
    header.push(`${locale}_question`, `${locale}_answer`);
  }

  // 데이터 행
  const rows: (string | number)[][] = [header];
  for (let i = 0; i < maxItems; i++) {
    const row: (string | number)[] = [i + 1];
    for (const locale of LOCALES) {
      const item = localeData[locale][i];
      row.push(item?.question ?? '', item?.answer ?? '');
    }
    rows.push(row);
  }

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);

  // 컬럼 너비 설정 (question: 40, answer: 60)
  sheet['!cols'] = [
    { wch: 4 }, // #
    ...LOCALES.flatMap(() => [{ wch: 40 }, { wch: 60 }]),
  ];

  XLSX.utils.book_append_sheet(workbook, sheet, 'FAQ');
  XLSX.writeFile(workbook, OUTPUT_PATH);

  console.log('📂 출력:', OUTPUT_PATH);
  console.log(`📊 언어 수: ${LOCALES.length}, 항목 수: ${maxItems}`);
  console.log('✅ 완료');
  console.log('');
  console.log('👉 구글 시트 업로드: 파일 → 가져오기 → 업로드 → faq-export.xlsx');
}

main();
