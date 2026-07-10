import { type Dictionary } from 'shared/model/types';

/** 여권 영문 이름 최소 길이 */
const MIN_LENGTH = 2;
/** 영문자와 공백만 허용 */
const ENGLISH_NAME_PATTERN = /^[a-zA-Z\s]+$/;

/**
 * 여권 영문 이름 검증 (선택 입력).
 *
 * - 빈 값(공백만 포함)은 허용한다. 입력하지 않아도 가입/저장이 가능하다.
 * - 값을 입력한 경우에만 형식(최소 길이, 영문자·공백만)을 검증한다.
 *
 * 회원가입(이메일/소셜), 프로필 수정에서 동일하게 사용한다.
 *
 * @returns 에러 메시지. 유효하면 undefined
 */
export function validatePassportName(value: string, dict: Dictionary): string | undefined {
  const trimmed = value.trim();

  // 선택 입력 — 빈 값은 통과
  if (!trimmed) {
    return undefined;
  }

  if (trimmed.length < MIN_LENGTH) {
    return (
      dict.auth?.signup?.errors?.passportNameTooShort ||
      'Passport name should be at least 2 characters.'
    );
  }

  if (!ENGLISH_NAME_PATTERN.test(trimmed)) {
    return (
      dict.auth?.signup?.errors?.passportNameInvalid ||
      'Passport name should only contain English letters.'
    );
  }

  return undefined;
}

/**
 * 저장용 값 정규화. 빈 값이면 undefined를 반환해 저장 대상에서 제외한다.
 */
export function normalizePassportName(value: string): string | undefined {
  return value.trim() || undefined;
}
