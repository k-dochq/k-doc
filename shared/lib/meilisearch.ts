import { type Locale } from 'shared/config';

const MEILISEARCH_URL = process.env.MEILISEARCH_URL!;
const MEILISEARCH_SEARCH_KEY = process.env.MEILISEARCH_SEARCH_KEY!;
const INDEX_UID = 'hospitals';

const LOCALE_TO_SUFFIX: Record<Locale, string> = {
  ko: 'kokr',
  en: 'enus',
  th: 'thth',
  'zh-Hant': 'zhtw',
  ja: 'jajp',
  hi: 'hiin',
  tl: 'tlph',
  ar: 'arsa',
  ru: 'ruru',
};

/**
 * Meilisearch에서 검색어와 매칭되는 병원 ID 목록을 반환
 * - 모든 언어 필드(name_*, specialties_*) 대상으로 검색
 * - 최대 1000개 ID 반환 (인덱스 전체 크기 내)
 */
export async function searchHospitalIds(query: string): Promise<string[]> {
  const response = await fetch(`${MEILISEARCH_URL}/indexes/${INDEX_UID}/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MEILISEARCH_SEARCH_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      limit: 1000,
      attributesToRetrieve: ['id'],
    }),
  });

  if (!response.ok) {
    throw new Error(`Meilisearch search failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { hits: { id: string }[] };
  return data.hits.map((hit) => hit.id);
}

/**
 * Meilisearch에서 검색어와 매칭되는 리뷰 ID 목록을 반환
 * - title_*, content_*, concerns_*, hospital_name_*, specialty_name_* 필드 대상 검색
 * - 최대 1000개 ID 반환
 */
export async function searchReviewIds(query: string): Promise<string[]> {
  const response = await fetch(`${MEILISEARCH_URL}/indexes/reviews/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MEILISEARCH_SEARCH_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      limit: 1000,
      attributesToRetrieve: ['id'],
    }),
  });

  if (!response.ok) {
    throw new Error(`Meilisearch review search failed: ${response.status} ${response.statusText}`);
  }

  const data = (await response.json()) as { hits: { id: string }[] };
  return data.hits.map((hit) => hit.id);
}

/**
 * 자동완성용 — 검색어와 매칭되는 병원 이름 목록 반환 (locale별)
 */
export async function searchHospitalSuggestions(query: string, locale: Locale): Promise<string[]> {
  const suffix = LOCALE_TO_SUFFIX[locale];
  const nameField = `name_${suffix}`;

  const response = await fetch(`${MEILISEARCH_URL}/indexes/${INDEX_UID}/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MEILISEARCH_SEARCH_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      limit: 10,
      attributesToRetrieve: [nameField],
    }),
  });

  if (!response.ok) {
    throw new Error(`Meilisearch suggestions failed: ${response.status}`);
  }

  const data = (await response.json()) as { hits: Record<string, string>[] };
  return data.hits.map((hit) => hit[nameField]).filter(Boolean);
}
