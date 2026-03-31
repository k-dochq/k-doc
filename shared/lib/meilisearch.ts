const MEILISEARCH_URL = process.env.MEILISEARCH_URL!;
const MEILISEARCH_SEARCH_KEY = process.env.MEILISEARCH_SEARCH_KEY!;
const INDEX_UID = 'K-DOC';

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
