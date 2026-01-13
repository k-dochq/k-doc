import { generateNickname } from './nickname-generator';

/**
 * 리뷰 작성일자 기준으로 닉네임을 결정하는 함수
 * - 2026년 1월 13일 이전 리뷰: 생성된 닉네임 사용
 * - 2026년 1월 13일 이후 리뷰: DB의 원래 닉네임 사용
 *
 * @param reviewId - 리뷰 ID (시드로 사용)
 * @param createdAt - 리뷰 작성일자
 * @param userNickName - DB의 사용자 닉네임
 * @param userDisplayName - DB의 사용자 표시명
 * @param userName - DB의 사용자 이름
 * @returns displayName과 nickName을 포함한 객체
 */
export async function getReviewNickname(
  reviewId: string,
  createdAt: Date,
  userNickName: string | null,
  userDisplayName: string | null,
  userName: string | null,
): Promise<{ displayName: string; nickName: string | null }> {
  const cutoffDate = new Date('2026-01-13T00:00:00Z');
  const shouldUseGeneratedNickname = createdAt < cutoffDate;

  if (shouldUseGeneratedNickname) {
    // 리뷰 ID를 시드로 사용하여 닉네임 생성
    const nicknameResult = await generateNickname({
      style: 'pascal',
      suffix: 'tag2',
      maxLength: 20,
      seed: reviewId, // 리뷰 ID를 시드로 사용하여 일관성 유지
      avoidAmbiguous: true,
    });
    return {
      displayName: nicknameResult.display,
      nickName: nicknameResult.display,
    };
  } else {
    // DB의 원래 닉네임 사용
    const displayName = userNickName || userDisplayName || userName || '익명';
    return {
      displayName,
      nickName: userNickName,
    };
  }
}
