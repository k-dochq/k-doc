/**
 * app/[lang]/dictionaries/ 내 9개 locale JSON을 읽어 엑셀 한 파일로 내보냅니다.
 *
 * 실행: pnpm export-dicts  또는  pnpm exec tsx scripts/export-dictionaries-to-xlsx.ts
 * 출력: 프로젝트 루트 translation-export.xlsx
 *
 * - 한 시트에 모든 키를 Key 기준 정렬하여 출력 (탭/섹션 분리 없음).
 * - 컬럼: Key | ko | en | th | zh-Hant | ja | hi | tl | ar | ru
 * - 문자열 리프만 export (중첩 객체/배열은 키로 내보내지 않음).
 *
 * 재반영(import): sync-dictionaries-from-xlsx.ts는 첫 시트만 사용하며 ko 미포함.
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');
const OUTPUT_PATH = path.join(PROJECT_ROOT, 'translation-export.xlsx');

const LOCALE_FILES = [
  'ko.json',
  'en.json',
  'th.json',
  'zh-Hant.json',
  'ja.json',
  'hi.json',
  'tl.json',
  'ar.json',
  'ru.json',
] as const;

const COLUMNS = ['Key', 'ko', 'en', 'th', 'zh-Hant', 'ja', 'hi', 'tl', 'ar', 'ru'] as const;

type JsonValue =
  | string
  | number
  | boolean
  | null
  | JsonValue[]
  | { [key: string]: JsonValue };

/**
 * 중첩 객체를 점 경로 키 → 문자열 값 맵으로 만듦. 문자열 리프만 수집.
 */
function flattenDict(obj: Record<string, JsonValue>, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(obj)) {
    const pathKey = prefix ? `${prefix}.${key}` : key;
    if (typeof value === 'string') {
      out[pathKey] = value;
    } else if (value !== null && typeof value === 'object' && !Array.isArray(value)) {
      Object.assign(out, flattenDict(value as Record<string, JsonValue>, pathKey));
    }
  }
  return out;
}

function main() {
  if (!fs.existsSync(DICTS_DIR)) {
    console.error('❌ dictionaries 디렉토리를 찾을 수 없습니다:', DICTS_DIR);
    process.exit(1);
  }

  const localeToFlat: Record<string, Record<string, string>> = {};
  const allKeys = new Set<string>();

  for (const localeFile of LOCALE_FILES) {
    const filePath = path.join(DICTS_DIR, localeFile);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ ${localeFile} 없음, 건너뜀`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    let data: Record<string, JsonValue>;
    try {
      data = JSON.parse(content) as Record<string, JsonValue>;
    } catch (e) {
      console.error(`❌ ${localeFile} JSON 파싱 실패:`, e);
      process.exit(1);
    }
    const flat = flattenDict(data);
    localeToFlat[localeFile] = flat;
    for (const k of Object.keys(flat)) {
      allKeys.add(k);
    }
  }

  if (allKeys.size === 0) {
    console.error('❌ 수집된 키가 없습니다.');
    process.exit(1);
  }

  const sortedKeys = [...allKeys].sort();

  const rows: (string | number)[][] = [COLUMNS.slice()];
  for (const key of sortedKeys) {
    const row: (string | number)[] = [key];
    for (let i = 1; i < COLUMNS.length; i++) {
      const colName = COLUMNS[i];
      const localeFile = `${colName}.json` as (typeof LOCALE_FILES)[number];
      const flat = localeToFlat[localeFile];
      const value = flat?.[key] ?? '';
      row.push(value);
    }
    rows.push(row);
  }

  const workbook = XLSX.utils.book_new();
  const sheet = XLSX.utils.aoa_to_sheet(rows);
  XLSX.utils.book_append_sheet(workbook, sheet, 'Translations');

  XLSX.writeFile(workbook, OUTPUT_PATH);
  console.log('📂 출력:', OUTPUT_PATH);
  console.log('📊 전체 키 수:', sortedKeys.length);
  console.log('✅ 완료');
}

main();
