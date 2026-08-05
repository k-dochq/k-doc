/**
 * Pick Your Gift 이벤트 페이지 섹션 정의.
 *
 * Figma(pick_your_gift_event_*)에서 언어별로 높이를 통일해 @2x PNG 로 export 한 뒤
 * WebP 로 변환한 이미지들이다. 9개 언어 모두 섹션별 크기가 동일하므로
 * 크기를 여기 한 곳에서만 관리한다.
 */

export interface EventSection {
  /** 파일명(확장자 제외) 겸 식별자 */
  id: string;
  /** 원본 intrinsic 크기 (@2x) — next/image 의 비율 계산·공간 예약용 */
  width: number;
  height: number;
  alt: string;
}

export const PICK_YOUR_GIFT_SECTIONS: EventSection[] = [
  { id: '1_main', width: 1500, height: 2120, alt: 'Choose your $100 gift' },
  { id: '2_benefit', width: 1500, height: 3032, alt: 'Event benefits' },
  {
    id: '3_option1',
    width: 1500,
    height: 3130,
    alt: 'Option 1 — K-Beauty shopping at Olive Young',
  },
  { id: '4_option2', width: 1500, height: 2804, alt: 'Option 2 — Korea Han-River experience' },
  { id: '5_option_notice', width: 1500, height: 2376, alt: 'Option terms of use' },
  { id: '6_how', width: 1500, height: 3142, alt: 'How to get your gift' },
  { id: '7_faq', width: 1500, height: 5684, alt: 'Frequently asked questions' },
  { id: '8_full_banner', width: 1500, height: 1300, alt: 'Ready to choose your gift' },
  { id: '9_final_notice', width: 1500, height: 2724, alt: 'Terms and conditions' },
];
