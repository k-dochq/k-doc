/**
 * translation.xlsx 파일을 읽어 시트 구조와 내용을 출력하는 스크립트
 * 실행: pnpm exec tsx scripts/read-translation-xlsx.ts
 */

import * as XLSX from 'xlsx';
import path from 'path';
import fs from 'fs';

const PROJECT_ROOT = path.resolve(__dirname, '..');
const XLSX_PATH = path.join(PROJECT_ROOT, 'translation.xlsx');

function main() {
  if (!fs.existsSync(XLSX_PATH)) {
    console.error('❌ 파일을 찾을 수 없습니다:', XLSX_PATH);
    process.exit(1);
  }

  console.log('📂 읽는 파일:', XLSX_PATH);
  console.log('');

  const workbook = XLSX.readFile(XLSX_PATH);

  console.log('=== 시트 목록 ===');
  console.log('Sheet names:', workbook.SheetNames);
  console.log('');

  for (const sheetName of workbook.SheetNames) {
    const sheet = workbook.Sheets[sheetName];
    if (!sheet) continue;

    // 시트를 2차원 배열로 변환 (헤더 + 데이터)
    const rows = XLSX.utils.sheet_to_json<string[]>(sheet, {
      header: 1, // 배열의 배열로 반환 (첫 행 = 헤더)
      defval: '',
      raw: false, // 포맷된 문자열 사용
    }) as unknown as string[][];

    console.log(`\n=== 시트: "${sheetName}" ===`);
    console.log('총 행 수:', rows.length);
    console.log('');

    if (rows.length === 0) {
      console.log('(빈 시트)');
      continue;
    }

    // 첫 행 = 헤더
    const header = rows[0];
    console.log('컬럼 수:', header.length);
    console.log('');
    console.log('--- 헤더 (컬럼 인덱스 : 값) ---');
    header.forEach((cell, i) => {
      console.log(`  [${i}] ${cell}`);
    });
    console.log('');

    // 데이터 샘플: 상위 5행
    const sampleRows = 5;
    console.log(`--- 데이터 샘플 (상위 ${sampleRows}행) ---`);
    for (let r = 1; r <= Math.min(sampleRows, rows.length - 1); r++) {
      const row = rows[r];
      console.log(`\n  [행 ${r + 1}]`);
      header.forEach((colName, i) => {
        const val = row[i];
        const display = val != null && String(val).length > 60 ? String(val).slice(0, 60) + '...' : val;
        console.log(`    [${i}] ${colName}: ${display}`);
      });
    }

    if (rows.length > sampleRows + 1) {
      console.log(`\n  ... 외 ${rows.length - sampleRows - 1}행 더 있음`);
    }
  }

  console.log('\n=== 출력 완료 ===');
}

main();
