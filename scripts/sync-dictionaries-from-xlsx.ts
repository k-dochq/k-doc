/**
 * translation.xlsx 내용을 읽어 다국어 JSON 파일들(en, th, zh-Hant, ja, hi, tl, ar, ru)을 갱신합니다.
 * 실행: pnpm exec tsx scripts/sync-dictionaries-from-xlsx.ts
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const XLSX_PATH = path.join(PROJECT_ROOT, 'translation.xlsx');
const DICTS_DIR = path.join(PROJECT_ROOT, 'app/[lang]/dictionaries');

/** 엑셀 컬럼 인덱스 → locale 파일명 */
const COLUMN_TO_LOCALE: Record<number, string> = {
  2: 'en.json',
  3: 'th.json',
  4: 'zh-Hant.json',
  5: 'ja.json',
  6: 'hi.json',
  7: 'tl.json',
  8: 'ar.json',
  9: 'ru.json',
};

type JsonValue = string | number | boolean | null | JsonValue[] | { [key: string]: JsonValue };

/** obj 내부의 path(점 구분)에 value를 설정합니다. 중간 객체가 없으면 생성합니다. */
function setNested(obj: Record<string, JsonValue>, keyPath: string, value: string): void {
  const parts = keyPath.split('.');
  let current: Record<string, JsonValue> = obj;
  for (let i = 0; i < parts.length - 1; i++) {
    const key = parts[i];
    if (!(key in current) || typeof current[key] !== 'object' || current[key] === null) {
      current[key] = {};
    }
    const next = current[key];
    if (typeof next !== 'object' || next === null || Array.isArray(next)) {
      current[key] = {};
    }
    current = current[key] as Record<string, JsonValue>;
  }
  current[parts[parts.length - 1]!] = value;
}

function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.error('❌ 파일을 찾을 수 없습니다:', XLSX_PATH);
    process.exit(1);
  }
  if (!fs.existsSync(DICTS_DIR)) {
    console.error('❌ dictionaries 디렉토리를 찾을 수 없습니다:', DICTS_DIR);
    process.exit(1);
  }

  console.log('📂 엑셀:', XLSX_PATH);
  console.log('📁 출력:', DICTS_DIR);
  console.log('');

  const workbook = XLSX.readFile(XLSX_PATH);
  const sheetName = workbook.SheetNames[0];
  if (!sheetName) {
    console.error('❌ 시트가 없습니다.');
    process.exit(1);
  }

  const sheet = workbook.Sheets[sheetName];
  const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
    header: 1,
    defval: '',
    raw: false,
  }) as unknown as string[][];

  if (rows.length < 2) {
    console.log('⚠️ 데이터 행이 없습니다.');
    return;
  }

  const header = rows[0]!;
  const dataRows = rows.slice(1);

  // locale별로 기존 JSON 로드
  const localeToData: Record<string, Record<string, JsonValue>> = {};
  for (const localeFile of Object.values(COLUMN_TO_LOCALE)) {
    const filePath = path.join(DICTS_DIR, localeFile);
    if (!fs.existsSync(filePath)) {
      console.warn(`⚠️ ${localeFile} 없음, 건너뜀`);
      continue;
    }
    const content = fs.readFileSync(filePath, 'utf-8');
    try {
      localeToData[localeFile] = JSON.parse(content) as Record<string, JsonValue>;
    } catch (e) {
      console.error(`❌ ${localeFile} JSON 파싱 실패:`, e);
      process.exit(1);
    }
  }

  let updatedCount = 0;
  for (const row of dataRows) {
    const key = row[1]; // Key 컬럼
    if (!key || typeof key !== 'string' || !key.trim()) continue;

    const keyPath = key.trim();
    for (const [colStr, localeFile] of Object.entries(COLUMN_TO_LOCALE)) {
      const col = Number(colStr);
      const value = row[col];
      const strValue = value != null ? String(value).trim() : '';
      // 빈 값이면 해당 키는 덮어쓰지 않음(기존 값 유지)
      if (strValue === '') continue;

      const data = localeToData[localeFile];
      if (!data) continue;

      try {
        setNested(data, keyPath, strValue);
        updatedCount++;
      } catch (e) {
        console.warn(`⚠️ 키 "${keyPath}" (${localeFile}) 설정 실패:`, e);
      }
    }
  }

  // locale별 JSON 저장
  for (const [localeFile, data] of Object.entries(localeToData)) {
    const filePath = path.join(DICTS_DIR, localeFile);
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2) + '\n', 'utf-8');
    console.log('✅', localeFile);
  }

  console.log('');
  console.log(`완료: ${Object.keys(localeToData).length}개 파일 갱신, ${dataRows.length}개 키 처리`);
}

main();
