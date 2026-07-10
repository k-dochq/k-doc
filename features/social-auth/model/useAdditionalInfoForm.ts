'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { validatePassportName } from 'shared/lib/validation/passport-name';

export interface AdditionalInfoFormData {
  passportName: string;
  nationality: string;
  gender: string;
  countryCode: string;
  phoneNumberOnly: string;
  birthDate: string;
}

export interface AdditionalInfoFormErrors {
  passportName?: string;
  nationality?: string;
  gender?: string;
  countryCode?: string;
  phoneNumberOnly?: string;
  birthDate?: string;
}

interface UseAdditionalInfoFormParams {
  lang: Locale;
  dict: Dictionary;
}

export function useAdditionalInfoForm({ lang, dict }: UseAdditionalInfoFormParams) {
  const [formData, setFormData] = useState<AdditionalInfoFormData>({
    passportName: '',
    nationality: '',
    gender: '',
    countryCode: '',
    phoneNumberOnly: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState<AdditionalInfoFormErrors>({});

  const updateField = <K extends keyof AdditionalInfoFormData>(
    field: K,
    value: AdditionalInfoFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AdditionalInfoFormErrors = {};

    // 여권 영문 이름 검증 (선택) — 빈 값 허용, 입력한 경우에만 형식 검증
    const passportNameError = validatePassportName(formData.passportName, dict);
    if (passportNameError) {
      newErrors.passportName = passportNameError;
    }

    // 성별 검증 (선택)
    // Gender는 선택사항이므로 검증하지 않음

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    // 필수 항목 없음. passportName은 비어 있어도 되고, 입력했다면 형식이 올바라야 함
    return !validatePassportName(formData.passportName, dict);
    // gender는 선택사항이므로 검증에서 제외
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    isFormValid,
  };
}
