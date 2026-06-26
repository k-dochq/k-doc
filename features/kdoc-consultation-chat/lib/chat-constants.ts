export type KdocChatCategory =
  | 'PLASTIC_SURGERY'
  | 'DERMATOLOGY_AESTHETIC'
  | 'CONCIERGE_RESERVATION'
  | 'OTHER_INQUIRY';

export type KdocChatPhase =
  | 'main_menu'
  | 'free_input'
  | 'faq_subtree'
  | 'guest_form'
  | 'guest_submitted'
  | 'chat';

export const CATEGORY_KEYS: KdocChatCategory[] = [
  'PLASTIC_SURGERY',
  'DERMATOLOGY_AESTHETIC',
  'CONCIERGE_RESERVATION',
  'OTHER_INQUIRY',
];
