/**
 * 구글 시트의 "다국어" 탭에서 컨시어지 텍스트를 내려받아 각 locale JSON을 업데이트합니다.
 * (FAQ 제외 — FAQ는 import-faq-from-sheets.ts 사용)
 *
 * 실행: pnpm import-concierge
 *
 * - 인증 불필요 (시트가 공개 접근 가능)
 * - concierge 하위 키만 업데이트합니다. 나머지 키(main, etc.)는 유지됩니다.
 * - concierge.faq.items 는 이 스크립트로 건드리지 않습니다.
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

// ── 구글 시트 정보 ────────────────────────────────────────────
const SPREADSHEET_ID = '1-dOcP5QBIa6FkZJrU0PBY-IWPTMFUggWH0tstNAe4iA';
const SHEET_GID = '1627468138'; // "다국어" 탭
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SPREADSHEET_ID}/export?format=csv&gid=${SHEET_GID}`;

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');

const LOCALES = ['ko', 'en', 'ja', 'zh-Hant', 'th', 'hi', 'ar', 'ru', 'tl'] as const;
type Locale = (typeof LOCALES)[number];

// ── CSV 다운로드 ──────────────────────────────────────────────
async function fetchCsv(): Promise<string> {
  console.log('🌐 구글 시트에서 데이터 다운로드 중...');
  const res = await fetch(CSV_URL);
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  return res.text();
}

// ── CSV 파싱: { path → { locale → value } } 형태로 반환 ───────
function parseCsv(csv: string): Map<string, Record<Locale, string>> {
  const workbook = XLSX.read(csv, { type: 'string' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, { header: 1 }) as string[][];

  if (rows.length < 2) throw new Error('시트에 데이터가 없습니다.');

  const header = rows[0].map((h) => String(h ?? '').trim());

  // 각 언어의 컬럼 인덱스 파악
  const localeColIndex: Record<Locale, number> = {} as Record<Locale, number>;
  for (const locale of LOCALES) {
    const idx = header.indexOf(locale);
    if (idx === -1) {
      console.warn(`⚠️  "${locale}" 컬럼을 찾을 수 없습니다.`);
    }
    localeColIndex[locale] = idx;
  }

  // "key" 컬럼 인덱스
  const keyCol = header.indexOf('key');
  if (keyCol === -1) throw new Error('"key" 컬럼이 없습니다. 헤더를 확인하세요.');

  const result = new Map<string, Record<Locale, string>>();

  const dataRows = rows.slice(1).filter((row) => row[keyCol]?.toString().trim());

  for (const row of dataRows) {
    const dotPath = String(row[keyCol] ?? '').trim();
    if (!dotPath) continue;

    const localeValues = {} as Record<Locale, string>;
    for (const locale of LOCALES) {
      const col = localeColIndex[locale];
      localeValues[locale] = col !== -1 ? String(row[col] ?? '').trim() : '';
    }
    result.set(dotPath, localeValues);
  }

  return result;
}

// ── dot-notation으로 nested 객체에 값 쓰기 ───────────────────
function setByPath(obj: Record<string, unknown>, dotPath: string, value: string): void {
  const parts = dotPath.split('.');
  let cur = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const part = parts[i];
    if (cur[part] == null || typeof cur[part] !== 'object') {
      cur[part] = {};
    }
    cur = cur[part] as Record<string, unknown>;
  }
  cur[parts[parts.length - 1]] = value;
}

// ── locale JSON 파일 업데이트 ────────────────────────────────
function updateLocaleFile(
  locale: Locale,
  dataMap: Map<string, Record<Locale, string>>,
) {
  const filePath = path.join(DICTS_DIR, `${locale}.json`);
  if (!fs.existsSync(filePath)) {
    console.warn(`⚠️  ${filePath} 없음, 건너뜀`);
    return;
  }

  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
  if (!data.concierge) data.concierge = {};

  let updated = 0;
  for (const [dotPath, localeValues] of dataMap) {
    const newValue = localeValues[locale];
    if (newValue === '') continue; // 빈 값은 건드리지 않음
    setByPath(data.concierge, dotPath, newValue);
    updated++;
  }

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
  console.log(`  ✅ ${locale}.json — ${updated}개 키 반영`);
}

// ── 메인 ─────────────────────────────────────────────────────
async function main() {
  const csv = await fetchCsv();
  const dataMap = parseCsv(csv);

  console.log(`📋 파싱된 항목: ${dataMap.size}개`);
  console.log('📝 locale JSON 업데이트 중...');

  for (const locale of LOCALES) {
    updateLocaleFile(locale, dataMap);
  }

  console.log('');
  console.log('✅ 완료 — 구글 시트 내용이 모든 locale JSON에 반영되었습니다.');
  console.log('   (FAQ는 별도로 pnpm import-faq 를 사용하세요)');
}

main().catch((err) => {
  console.error('❌ 오류:', err.message);
  process.exit(1);
});
