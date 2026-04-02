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

function parseConcerns(raw: string): string[] {
  if (raw.includes('#')) {
    return raw.split('#').map((s) => s.trim()).filter(Boolean);
  }
  if (raw.includes(',')) {
    return raw.split(',').map((s) => s.trim()).filter(Boolean);
  }
  return raw.trim() ? [raw.trim()] : [];
}

/**
 * 자동완성용 — 검색어와 매칭되는 리뷰 concern 목록 반환 (언어 무관 매칭, 중복 제거)
 * - attributesToSearchOn 제한 없이 전체 필드 검색
 * - 각 hit에서 실제 쿼리가 포함된 언어 필드의 값을 우선 반환
 */
export async function searchConcernSuggestions(query: string, locale: Locale): Promise<string[]> {
  const allConcernFields = Object.values(LOCALE_TO_SUFFIX).map((s) => `concerns_${s}`);
  const localeConcernField = `concerns_${LOCALE_TO_SUFFIX[locale]}`;

  const response = await fetch(`${MEILISEARCH_URL}/indexes/reviews/search`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${MEILISEARCH_SEARCH_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      q: query,
      limit: 50,
      attributesToRetrieve: allConcernFields,
    }),
  });

  if (!response.ok) {
    throw new Error(`Meilisearch concern suggestions failed: ${response.status}`);
  }

  const data = (await response.json()) as { hits: Record<string, string>[] };
  const queryLower = query.toLowerCase();
  const seen = new Set<string>();
  const suggestions: string[] = [];

  for (const hit of data.hits) {
    // 1순위: locale 필드에서 쿼리 매칭
    // 2순위: 쿼리가 실제로 포함된 다른 언어 필드
    const fieldsToCheck = [
      localeConcernField,
      ...allConcernFields.filter((f) => f !== localeConcernField),
    ];

    for (const field of fieldsToCheck) {
      const raw = hit[field];
      if (!raw) continue;

      for (const item of parseConcerns(raw)) {
        const key = item.toLowerCase();
        if (key.includes(queryLower) && !seen.has(key)) {
          seen.add(key);
          suggestions.push(item);
          if (suggestions.length >= 5) return suggestions;
        }
      }
      // 쿼리가 일치하는 필드를 찾으면 이 hit는 종료
      if (parseConcerns(raw).some((item) => item.toLowerCase().includes(queryLower))) break;
    }
  }

  return suggestions;
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
