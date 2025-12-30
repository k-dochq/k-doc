import * as fs from 'fs';
import * as path from 'path';
import { GOOGLE_TRANSLATE_API_KEY, GOOGLE_TRANSLATE_API_URL } from './constants';

// 파일 경로
const KO_JSON_FILE = path.join(__dirname, '../../../app/[lang]/dictionaries/ko.json');
const ZH_TW_JSON_FILE = path.join(__dirname, '../../../app/[lang]/dictionaries/zh-TW.json');
const PROGRESS_FILE = path.join(__dirname, 'output/translation-progress.json');

// Google Translate API 응답 타입
interface TranslateResponse {
  data: {
    translations: Array<{
      translatedText: string;
      detectedSourceLanguage?: string;
    }>;
  };
}

// 진행 상황 타입
interface TranslationProgress {
  processedKeys: string[];
  totalKeys: number;
  startTime: string;
  lastUpdateTime: string;
}

/**
 * JSON 객체에서 모든 문자열 키 경로를 수집하는 함수
 */
function collectStringPaths(obj: unknown, prefix = ''): string[] {
  const paths: string[] = [];

  if (typeof obj === 'string') {
    paths.push(prefix);
  } else if (Array.isArray(obj)) {
    obj.forEach((item, index) => {
      paths.push(...collectStringPaths(item, prefix ? `${prefix}[${index}]` : `[${index}]`));
    });
  } else if (obj !== null && typeof obj === 'object') {
    for (const [key, value] of Object.entries(obj)) {
      const newPrefix = prefix ? `${prefix}.${key}` : key;
      paths.push(...collectStringPaths(value, newPrefix));
    }
  }

  return paths;
}

/**
 * 경로를 사용하여 JSON 객체에서 값을 가져오는 함수
 */
function getValueByPath(obj: unknown, path: string): string | undefined {
  const keys = path.split(/[\.\[\]]/).filter((k) => k !== '');

  let current: unknown = obj;
  for (const key of keys) {
    if (Array.isArray(current)) {
      const index = parseInt(key, 10);
      if (isNaN(index)) return undefined;
      current = current[index];
    } else if (current !== null && typeof current === 'object') {
      current = (current as Record<string, unknown>)[key];
    } else {
      return undefined;
    }
  }

  return typeof current === 'string' ? current : undefined;
}

/**
 * 경로를 사용하여 JSON 객체에 값을 설정하는 함수
 */
function setValueByPath(obj: unknown, path: string, value: string): void {
  const keys = path.split(/[\.\[\]]/).filter((k) => k !== '');

  let current: unknown = obj;
  for (let i = 0; i < keys.length - 1; i++) {
    const key = keys[i];
    if (Array.isArray(current)) {
      const index = parseInt(key, 10);
      if (isNaN(index)) return;
      current = current[index];
    } else if (current !== null && typeof current === 'object') {
      current = (current as Record<string, unknown>)[key];
    } else {
      return;
    }
  }

  const lastKey = keys[keys.length - 1];
  if (Array.isArray(current)) {
    const index = parseInt(lastKey, 10);
    if (!isNaN(index) && typeof current[index] === 'string') {
      current[index] = value;
    }
  } else if (current !== null && typeof current === 'object') {
    (current as Record<string, unknown>)[lastKey] = value;
  }
}

/**
 * Google Translate API를 사용하여 텍스트를 번역하는 함수
 */
async function translateText(
  text: string,
  sourceLang: string,
  targetLang: string,
): Promise<string> {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: sourceLang,
        target: targetLang,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result: TranslateResponse = await response.json();

    if (result.data.translations && result.data.translations.length > 0) {
      return result.data.translations[0].translatedText;
    } else {
      throw new Error('No translation found in response');
    }
  } catch (error) {
    console.error(`Translation error (${sourceLang} → ${targetLang}):`, error);
    throw error;
  }
}

/**
 * 배치로 여러 텍스트를 번역하는 함수 (API 요청 횟수 절약)
 */
async function translateBatch(
  texts: string[],
  sourceLang: string,
  targetLang: string,
): Promise<string[]> {
  try {
    const response = await fetch(`${GOOGLE_TRANSLATE_API_URL}?key=${GOOGLE_TRANSLATE_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: texts,
        source: sourceLang,
        target: targetLang,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`HTTP error! status: ${response.status}, body: ${errorText}`);
    }

    const result: TranslateResponse = await response.json();

    if (result.data.translations && result.data.translations.length > 0) {
      return result.data.translations.map((t) => t.translatedText);
    } else {
      throw new Error('No translations found in response');
    }
  } catch (error) {
    console.error(`Batch translation error (${sourceLang} → ${targetLang}):`, error);
    throw error;
  }
}

/**
 * 진행 상황을 저장하는 함수
 */
function saveProgress(progress: TranslationProgress): void {
  const outputDir = path.dirname(PROGRESS_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(progress, null, 2));
}

/**
 * 진행 상황을 로드하는 함수
 */
function loadProgress(): TranslationProgress | null {
  try {
    if (fs.existsSync(PROGRESS_FILE)) {
      const data = fs.readFileSync(PROGRESS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error loading progress:', error);
  }
  return null;
}

/**
 * 번역 결과를 파일에 저장하는 함수
 */
function saveDictionary(result: Record<string, unknown>): void {
  const outputDir = path.dirname(ZH_TW_JSON_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(ZH_TW_JSON_FILE, JSON.stringify(result, null, 2));
}

/**
 * 메인 번역 함수
 */
async function translateDictionaryToZhTW() {
  try {
    console.log('🌐 다국어 사전 중국어 번체(zh-TW) 번역 작업 시작...');

    // ko.json 파일 읽기
    if (!fs.existsSync(KO_JSON_FILE)) {
      throw new Error(`한국어 사전 파일을 찾을 수 없습니다: ${KO_JSON_FILE}`);
    }

    const koData = JSON.parse(fs.readFileSync(KO_JSON_FILE, 'utf-8'));
    console.log('📁 한국어 사전 파일 로드 완료');

    // 기존 zh-TW.json 파일이 있으면 로드
    let zhTWData: Record<string, unknown> = {};
    if (fs.existsSync(ZH_TW_JSON_FILE)) {
      try {
        zhTWData = JSON.parse(fs.readFileSync(ZH_TW_JSON_FILE, 'utf-8'));
        console.log('📁 기존 중국어 번체 사전 파일 로드 완료');
      } catch (error) {
        console.warn('⚠️  기존 중국어 번체 사전 파일을 읽는 중 오류 발생, 새로 생성합니다.');
      }
    }

    // 모든 문자열 경로 수집
    const allPaths = collectStringPaths(koData);
    console.log(`📊 총 ${allPaths.length}개의 번역 항목 발견`);

    // 기존 진행 상황 로드
    let progress = loadProgress();
    const processedKeys = progress ? new Set(progress.processedKeys) : new Set<string>();

    // 번역이 필요한 경로 필터링
    const pathsToTranslate = allPaths.filter((path) => {
      // 이미 처리된 경로는 제외
      if (processedKeys.has(path)) {
        return false;
      }

      // 기존 zh-TW 데이터에 값이 있으면 제외
      const existingValue = getValueByPath(zhTWData, path);
      if (existingValue && existingValue.trim() !== '') {
        return false;
      }

      return true;
    });

    console.log(`📝 번역이 필요한 항목: ${pathsToTranslate.length}개`);

    if (pathsToTranslate.length === 0) {
      console.log('✅ 번역이 필요한 항목이 없습니다.');
      return;
    }

    if (!progress) {
      progress = {
        processedKeys: [],
        totalKeys: pathsToTranslate.length,
        startTime: new Date().toISOString(),
        lastUpdateTime: new Date().toISOString(),
      };
    }

    // 배치 크기 설정
    const BATCH_SIZE = 10;
    const TRANSLATION_BATCH_SIZE = 5;

    // zh-TW 데이터 초기화 (ko 데이터 구조 복사)
    if (Object.keys(zhTWData).length === 0) {
      zhTWData = JSON.parse(JSON.stringify(koData));
    }

    let processedCount = progress.processedKeys.length;

    while (processedCount < pathsToTranslate.length) {
      const batch = pathsToTranslate.slice(processedCount, processedCount + BATCH_SIZE);
      console.log(
        `\n📝 처리 중: ${processedCount + 1}-${Math.min(processedCount + BATCH_SIZE, pathsToTranslate.length)}/${pathsToTranslate.length}`,
      );

      // 배치별로 번역 처리
      for (let i = 0; i < batch.length; i += TRANSLATION_BATCH_SIZE) {
        const translationBatch = batch.slice(i, i + TRANSLATION_BATCH_SIZE);
        const texts = translationBatch.map((path) => getValueByPath(koData, path) || '');

        try {
          console.log(
            `  🔄 중국어 번체 번역 중... (ko → zh-TW) (${i + 1}-${Math.min(i + TRANSLATION_BATCH_SIZE, translationBatch.length)}/${translationBatch.length})`,
          );
          const zhTWTranslations = await translateBatch(texts, 'ko', 'zh-TW');

          // 결과 저장
          translationBatch.forEach((path, index) => {
            setValueByPath(zhTWData, path, zhTWTranslations[index]);
            progress.processedKeys.push(path);
          });

          // API 요청 간격 (Rate Limit 방지)
          await new Promise((resolve) => setTimeout(resolve, 100));
        } catch (error) {
          console.error(`배치 번역 실패:`, error);
          // 실패한 경우 개별 번역 시도
          for (const path of translationBatch) {
            try {
              const text = getValueByPath(koData, path);
              if (text) {
                const zhTWTranslation = await translateText(text, 'ko', 'zh-TW');
                setValueByPath(zhTWData, path, zhTWTranslation);
                progress.processedKeys.push(path);
                await new Promise((resolve) => setTimeout(resolve, 100));
              }
            } catch (individualError) {
              console.error(`개별 번역 실패 (${path}):`, individualError);
            }
          }
        }
      }

      // 진행 상황 업데이트
      progress.lastUpdateTime = new Date().toISOString();

      // 중간 결과 저장
      saveDictionary(zhTWData);
      saveProgress(progress);

      console.log(
        `✅ ${progress.processedKeys.length}/${pathsToTranslate.length} 완료 (${Math.round((progress.processedKeys.length / pathsToTranslate.length) * 100)}%)`,
      );

      processedCount += BATCH_SIZE;
    }

    console.log('\n🎉 모든 다국어 사전 중국어 번체 번역 완료!');
    console.log(`📁 결과 파일: ${ZH_TW_JSON_FILE}`);
    console.log(`📊 총 처리된 항목: ${progress.processedKeys.length}개`);

    // 완료 후 진행 상황 파일 삭제
    if (fs.existsSync(PROGRESS_FILE)) {
      fs.unlinkSync(PROGRESS_FILE);
    }
  } catch (error) {
    console.error('❌ 번역 작업 실패:', error);
    throw error;
  }
}

// 스크립트 실행
if (require.main === module) {
  translateDictionaryToZhTW()
    .then(() => {
      console.log('✅ 스크립트 실행 완료!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('💥 스크립트 실행 실패:', error);
      process.exit(1);
    });
}

export { translateDictionaryToZhTW };
