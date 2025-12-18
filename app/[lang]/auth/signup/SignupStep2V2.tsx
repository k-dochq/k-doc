'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type SignupFormData } from 'features/email-auth/model/useSignupForm';

interface SignupStep2V2Props {
  lang: Locale;
  dict: Dictionary;
  formData: SignupFormData;
}

export function SignupStep2V2({ lang, dict, formData }: SignupStep2V2Props) {
  return <div />;
}
