/**
 * 닉네임 마스킹 유틸리티 함수
 *
 * 마스킹 규칙:
 * - 3자 이상: 첫 3자만 표시하고 나머지는 ***로 마스킹 (예: MercuryFestivai_88 -> Mer***)
 * - 3자 이하: 첫 글자만 표시하고 나머지는 **로 마스킹 (예: 쥴리콩 -> 쥴**)
 *
 * @param nickname - 마스킹할 닉네임
 * @returns 마스킹된 닉네임
 */
export function maskNickname(nickname: string): string {
  if (!nickname || nickname.length === 0) {
    return nickname;
  }

  // 3자 이상인 경우: 첫 3자 + *** (예: MercuryFestivai_88 -> Mer***)
  if (nickname.length >= 3) {
    return nickname.substring(0, 3) + '***';
  }

  // 3자 이하인 경우: 첫 글자 + ** (예: 쥴리콩 -> 쥴**)
  return nickname.substring(0, 1) + '**';
}
