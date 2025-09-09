/**
 * 템플릿 문자열에서 {{key}} 형태의 플레이스홀더를 실제 값으로 치환합니다.
 *
 * @param template - 치환할 템플릿 문자열 (예: "총 {{count}}개의 병원")
 * @param variables - 치환할 변수들 (예: { count: 5 })
 * @returns 치환된 문자열 (예: "총 5개의 병원")
 */
export function interpolateTemplate(
  template: string,
  variables: Record<string, string | number>,
): string {
  return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
    const value = variables[key];
    return value !== undefined ? String(value) : match;
  });
}
