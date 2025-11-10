/**
 * 결제 관련 유틸리티 함수
 */

/**
 * UUID를 30자 이하로 변환
 * 하이픈을 제거하고 앞 30자만 사용
 *
 * @param customerId - UUID 형식의 customer ID
 * @param maxLength - 최대 길이 (기본값: 30)
 * @returns 30자 이하로 변환된 customer ID
 *
 * @example
 * truncateCustomerId('550e8400-e29b-41d4-a716-446655440000')
 * // => '550e8400e29b41d4a71644665544'
 */
export function truncateCustomerId(customerId: string, maxLength: number = 30): string {
  if (!customerId) return customerId;

  // 하이픈 제거
  const withoutHyphens = customerId.replace(/-/g, '');

  // 최대 길이로 자르기
  return withoutHyphens.substring(0, maxLength);
}
