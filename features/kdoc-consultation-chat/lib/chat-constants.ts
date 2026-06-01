export type KdocChatCategory =
  | 'PLASTIC_SURGERY'
  | 'DERMATOLOGY_AESTHETIC'
  | 'CONCIERGE_RESERVATION'
  | 'OTHER_INQUIRY';

export type KdocChatPhase = 'category' | 'guest_form' | 'guest_submitted' | 'chat';

export const CATEGORIES: { key: KdocChatCategory; label: string }[] = [
  { key: 'PLASTIC_SURGERY', label: '성형 상담' },
  { key: 'DERMATOLOGY_AESTHETIC', label: '피부 시술 상담' },
  { key: 'CONCIERGE_RESERVATION', label: '컨시어지 문의' },
  { key: 'OTHER_INQUIRY', label: '기타' },
];
