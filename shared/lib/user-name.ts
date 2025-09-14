import { type User } from '@prisma/client';

/**
 * 사용자 표시명을 생성하는 유틸리티 함수
 * 우선순위: nickName > displayName > name > '익명'
 *
 * @param user - 사용자 객체 (User 타입 또는 user 필드를 포함한 객체)
 * @returns 표시할 사용자 이름
 */
export function getUserDisplayName(
  user:
    | User
    | { user: User }
    | { nickName?: string | null; displayName?: string | null; name?: string | null },
): string {
  // user.user 형태인 경우 user 필드 추출
  const userData = 'user' in user ? user.user : user;

  return userData.nickName || userData.displayName || userData.name || '익명';
}
