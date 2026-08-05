/**
 * Free Great Gift 이벤트 페이지 섹션 정의.
 *
 * 디자인팀 전달본(2026-08-05) 기준. 세로로 이어 붙이는 통 이미지 4장이다.
 *   1  히어로 + 혜택 선택 (두 옵션 소개)
 *   2  옵션별 상세 + 이용 약관
 *   3  이용 방법 5단계 + FAQ
 *   4  참여 유도 + 유의사항
 *
 * 이미지 크기는 여기 두지 않는다. 언어마다 높이가 달라 표로 관리하면 이미지 교체 때 어긋나기 쉽다.
 * 대신 lib/section-sizes.ts 가 실제 파일 헤더에서 읽는다.
 */

/** 섹션 순서 = 파일명. 위에서 아래로 이어진다. */
export const SECTION_IDS = ['1', '2', '3', '4'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** 섹션별 대체 텍스트 — 이미지 안의 문구는 언어별로 다르지만 내용 구분용이라 영문 고정 */
export const SECTION_ALTS: readonly string[] = [
  'Free Great Gift — Han-River yacht party or $100 Olive Young gift',
  'Benefit details and terms of use',
  'How to get your gift, and frequently asked questions',
  'Ready to take your gift — event notice',
];
