import { generateNickname } from './nickname-generator';

const ADMIN_GENERATED_EMAIL_SUFFIXES = ['@example.com', '@dummy.com'] as const;

/**
 * 리뷰 작성자 이메일 기준으로 닉네임을 결정하는 함수
 * - 관리자 생성 사용자(@example.com, @dummy.com): 생성된 닉네임 사용
 * - 실제 사용자: DB의 원래 닉네임 사용
 *
 * @param reviewId - 리뷰 ID (시드로 사용)
 * @param userEmail - 사용자 이메일
 * @param userNickName - DB의 사용자 닉네임
 * @param userDisplayName - DB의 사용자 표시명
 * @param userName - DB의 사용자 이름
 * @returns displayName과 nickName을 포함한 객체
 */
export async function getReviewNickname(
  reviewId: string,
  userEmail: string | null,
  userNickName: string | null,
  userDisplayName: string | null,
  userName: string | null,
): Promise<{ displayName: string; nickName: string | null }> {
  const isAdminGenerated =
    !!userEmail &&
    ADMIN_GENERATED_EMAIL_SUFFIXES.some((suffix) =>
      userEmail.toLowerCase().endsWith(suffix),
    );

  if (isAdminGenerated) {
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
