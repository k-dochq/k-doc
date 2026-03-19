/**
 * 구글 시트에서 FAQ 데이터를 내려받아 각 locale JSON을 업데이트합니다.
 *
 * 실행: pnpm import-faq
 *
 * - 인증 불필요 (시트가 공개 접근 가능)
 * - concierge.faq.items 만 덮어씁니다. 나머지 키는 유지됩니다.
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const SPREADSHEET_ID = '1-dOcP5QBIa6FkZJrU0PBY-IWPTMFUggWH0tstNAe4iA';
const SHEET_GID = '2121590223';
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');

const LOCALES = ['ko', 'en', 'th', 'zh-Hant', 'ja', 'hi', 'tl', 'ar', 'ru'] as const;
type Locale = (typeof LOCALES)[number];

interface FaqItem {
  question: string;
  answer: string;
}

async function fetchCsv(): Promise<string> {
  console.log('🌐 구글 시트에서 데이터 다운로드 중...');
  const res = await fetch(CSV_URL);
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  }
  return res.text();
}

function parseCsv(csv: string): Record<Locale, FaqItem[]> {
  const workbook = XLSX.read(csv, { type: 'string' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][];

  if (rows.length < 2) throw new Error('시트 데이터가 없습니다.');

  const header = rows[0];
  const dataRows = rows.slice(1).filter((row) => row.some((cell) => cell !== '' && cell != null));

  const result = {} as Record<Locale, FaqItem[]>;
  for (const locale of LOCALES) {
    const qCol = header.indexOf(`${locale}_question`);
    const aCol = header.indexOf(`${locale}_answer`);
    if (qCol === -1 || aCol === -1) {
      console.warn(`⚠️  ${locale} 컬럼을 찾을 수 없습니다. 건너뜀`);
      result[locale] = [];
      continue;
    }
    result[locale] = dataRows
      .map((row) => ({
        question: String(row[qCol] ?? '').trim(),
        answer: String(row[aCol] ?? '').trim(),
      }))
      .filter((item) => item.question !== '');
  }

  return result;
}

function updateLocaleFile(locale: Locale, items: FaqItem[]) {
  const filePath = path.join(DICTS_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} 없음, 건너뜀`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!data.concierge) data.concierge = {};
  if (!data.concierge.faq) data.concierge.faq = {};
  data.concierge.faq.items = items;

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✅ ${locale}.json — ${items.length}개 항목 반영`);
}

async function main() {
  const csv = await fetchCsv();
  const faqByLocale = parseCsv(csv);

  console.log('📝 locale JSON 업데이트 중...');
  for (const locale of LOCALES) {
    updateLocaleFile(locale, faqByLocale[locale]);
  }

  console.log('');
  console.log('✅ 완료 — 구글 시트 FAQ가 모든 locale JSON에 반영되었습니다.');
}

main().catch((err) => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
