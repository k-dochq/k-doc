/**
 * Beauty Lucky Draw 이벤트 페이지 섹션 정의.
 *
 * 디자인팀 전달본(2026-08-20) 기준. 세로로 이어 붙이는 통 이미지 4장이다.
 *   1  히어로 + 스폰서(압구정미라클의원)
 *   2  이달의 경품 (1·2·3등 시술 소개)
 *   3  럭키드로우 참여 방법 4단계
 *   4  FAQ + 유의사항
 *
 * 이미지 크기는 여기 두지 않는다. lib/section-sizes.ts 가 실제 파일 헤더에서 읽는다.
 */

/** 섹션 순서 = 파일명. 위에서 아래로 이어진다. */
export const SECTION_IDS = ['1', '2', '3', '4'] as const;

export type SectionId = (typeof SECTION_IDS)[number];

/** 섹션별 대체 텍스트 — 이미지 안의 문구는 언어별로 다르지만 내용 구분용이라 영문 고정 */
export const SECTION_ALTS: readonly string[] = [
  'K-DOC Beauty Lucky Draw — 8 winners get a free treatment in September',
  'Monthly prizes — thread lift, stem cell therapy, Rejuran with skin botox',
  'How to participate in the lucky draw',
  'Frequently asked questions and event terms',
];
