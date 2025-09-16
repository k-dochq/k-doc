export interface ConsultationFormData {
  name: string;
  gender: 'MALE' | 'FEMALE';
  ageGroup: string;
  phoneNumber: string;
  preferredDate: string;
  content: string;
  agreeToPrivacy: boolean;
}

export interface ConsultationFormErrors {
  name?: string;
  gender?: string;
  ageGroup?: string;
  phoneNumber?: string;
  preferredDate?: string;
  content?: string;
  agreeToPrivacy?: string;
}

export const AGE_GROUPS = [
  { value: '10s', label: '10대' },
  { value: '20s', label: '20대' },
  { value: '30s', label: '30대' },
  { value: '40s', label: '40대' },
  { value: '50s', label: '50대' },
  { value: '60s', label: '60대 이상' },
] as const;

export const GENDER_OPTIONS = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
] as const;
