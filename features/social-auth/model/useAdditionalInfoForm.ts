'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface AdditionalInfoFormData {
  passportName: string;
  nationality: string;
  gender: string;
  countryCode: string;
  phoneNumberOnly: string;
  birthDate: string;
}

interface AdditionalInfoFormErrors {
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

    // 여권 영문 이름 검증 (필수)
    if (!formData.passportName.trim()) {
      newErrors.passportName =
        dict.auth?.signup?.errors?.passportNameRequired ||
        'Treatment access may be limited without passport name in English.';
    } else if (formData.passportName.trim().length < 2) {
      newErrors.passportName =
        dict.auth?.signup?.errors?.passportNameTooShort ||
        'Passport name should be at least 2 characters.';
    } else if (!/^[a-zA-Z\s]+$/.test(formData.passportName)) {
      newErrors.passportName =
        dict.auth?.signup?.errors?.passportNameInvalid ||
        'Passport name should only contain English letters.';
    }

    // 성별 검증 (선택)
    // Gender는 선택사항이므로 검증하지 않음

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = (): boolean => {
    return formData.passportName.trim() !== '';
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
