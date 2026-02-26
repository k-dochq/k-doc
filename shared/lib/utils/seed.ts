/**
 * 랜덤 seed 문자열 생성
 * 추천순 정렬 시 일관된 랜덤 순서를 위해 사용
 * 
 * @returns 12자리 랜덤 문자열 (예: "x7k9m2p4q8n1")
 */
export function generateRandomSeed(): string {
  return Math.random().toString(36).substring(2, 14);
}
