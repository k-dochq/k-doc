'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface EmailLoginFormData {
  email: string;
  password: string;
}

interface EmailLoginFormErrors {
  email?: string;
  password?: string;
}

interface UseEmailLoginFormParams {
  lang: Locale;
  dict: Dictionary;
}

export function useEmailLoginForm({ lang, dict }: UseEmailLoginFormParams) {
  const [formData, setFormData] = useState<EmailLoginFormData>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<EmailLoginFormErrors>({});

  const updateField = <K extends keyof EmailLoginFormData>(
    field: K,
    value: EmailLoginFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: EmailLoginFormErrors = {};

    // 이메일 검증
    if (!formData.email.trim()) {
      newErrors.email = dict.auth?.login?.errors?.emailRequired || '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        dict.auth?.login?.errors?.emailInvalid || '올바른 이메일 주소를 입력해주세요.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password = dict.auth?.login?.errors?.passwordRequired || '비밀번호를 입력해주세요.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
  };
}
