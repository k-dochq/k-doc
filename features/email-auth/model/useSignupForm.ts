'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface SignupFormData {
  email: string;
  password: string;
  confirmPassword: string;
  passportName: string;
  nationality: string;
  gender: string;
  countryCode: string;
  phoneNumberOnly: string;
  birthDate: string;
}

interface SignupFormErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  passportName?: string;
  nationality?: string;
  gender?: string;
  countryCode?: string;
  phoneNumberOnly?: string;
  birthDate?: string;
}

interface UseSignupFormParams {
  lang: Locale;
  dict: Dictionary;
}

export function useSignupForm({ lang, dict }: UseSignupFormParams) {
  const [formData, setFormData] = useState<SignupFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    passportName: '',
    nationality: '',
    gender: '',
    countryCode: '',
    phoneNumberOnly: '',
    birthDate: '',
  });
  const [errors, setErrors] = useState<SignupFormErrors>({});

  const updateField = <K extends keyof SignupFormData>(field: K, value: SignupFormData[K]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: SignupFormErrors = {};

    // 이메일 검증
    if (!formData.email.trim()) {
      newErrors.email = dict.auth?.signup?.errors?.emailRequired || '이메일을 입력해주세요.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        dict.auth?.signup?.errors?.emailInvalid || '올바른 이메일 주소를 입력해주세요.';
    }

    // 비밀번호 검증
    if (!formData.password) {
      newErrors.password =
        dict.auth?.signup?.errors?.passwordRequired || '비밀번호를 입력해주세요.';
    } else if (formData.password.length < 6) {
      newErrors.password =
        dict.auth?.signup?.errors?.passwordTooShort || '비밀번호는 최소 6자 이상이어야 합니다.';
    }

    // 비밀번호 확인 검증
    if (!formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.auth?.signup?.errors?.confirmPasswordRequired || '비밀번호 확인을 입력해주세요.';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword =
        dict.auth?.signup?.errors?.passwordMismatch || '비밀번호가 일치하지 않습니다.';
    }

    // 여권 영문 이름 검증 (필수)
    if (!formData.passportName.trim()) {
      newErrors.passportName =
        dict.auth?.signup?.errors?.passportNameRequired ||
        '여권상의 영문 이름을 입력하지 않으면 치료 이용이 제한될 수 있습니다.';
    }

    // 성별 검증 (선택)
    // Gender는 선택사항이므로 검증하지 않음

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isFormValid = () => {
    return (
      formData.email.trim() &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword &&
      formData.password.length >= 6 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.passportName.trim()
      // gender는 선택사항이므로 검증에서 제외
    );
  };

  return {
    formData,
    errors,
    updateField,
    validateForm,
    isFormValid: isFormValid(),
  };
}
