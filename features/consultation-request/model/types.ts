export interface ConsultationFormData {
  name: string;
  nationality: string;
  gender: 'MALE' | 'FEMALE';
  birthDate: string;
  countryCode: string;
  phoneNumberOnly: string;
  preferredDate: string;
  preferredDate2: string;
  content: string;
  agreeToPrivacy: boolean;
}

export interface ConsultationFormErrors {
  name?: string;
  nationality?: string;
  gender?: string;
  birthDate?: string;
  countryCode?: string;
  phoneNumberOnly?: string;
  preferredDate?: string;
  preferredDate2?: string;
  content?: string;
  agreeToPrivacy?: string;
}

export const GENDER_OPTIONS = [
  { value: 'MALE', label: '남성' },
  { value: 'FEMALE', label: '여성' },
] as const;
