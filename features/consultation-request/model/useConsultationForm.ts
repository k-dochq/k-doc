'use client';

import { useState, useEffect } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type UserProfile } from 'shared/model/types/user';
import { type ConsultationFormData, type ConsultationFormErrors } from './types';

const initialFormData: ConsultationFormData = {
  name: '',
  gender: 'MALE',
  ageGroup: '',
  countryCode: '',
  phoneNumberOnly: '',
  preferredDate: '',
  preferredDate2: '',
  content: '',
  agreeToPrivacy: true,
};

export function useConsultationForm(
  lang: Locale,
  dict: Dictionary,
  userProfile?: UserProfile | null,
) {
  const [formData, setFormData] = useState<ConsultationFormData>(initialFormData);
  const [errors, setErrors] = useState<ConsultationFormErrors>({});

  // 사용자 정보로 폼 자동 채우기
  useEffect(() => {
    if (userProfile) {
      const updates: Partial<ConsultationFormData> = {};

      // 여권 영문 이름 -> 이름 필드
      if (userProfile.raw_user_meta_data?.passport_name) {
        updates.name = userProfile.raw_user_meta_data.passport_name;
      }

      // 성별 매핑 (회원가입 시 'male'/'female' -> 상담 시 'MALE'/'FEMALE')
      if (userProfile.genderType) {
        updates.gender = userProfile.genderType;
      } else if (userProfile.raw_user_meta_data?.gender) {
        updates.gender = userProfile.raw_user_meta_data.gender.toUpperCase() as 'MALE' | 'FEMALE';
      }

      // 휴대폰번호 (국가번호 + 휴대폰번호)
      if (userProfile.raw_user_meta_data?.country_code) {
        updates.countryCode = userProfile.raw_user_meta_data.country_code;
      }
      if (userProfile.raw_user_meta_data?.phone_number) {
        updates.phoneNumberOnly = userProfile.raw_user_meta_data.phone_number;
      } else if (userProfile.phoneNumber) {
        // phoneNumber가 국가번호 포함인 경우 분리 시도
        const phoneMatch = userProfile.phoneNumber.match(/^(\+\d{1,3})?(.+)$/);
        if (phoneMatch) {
          if (phoneMatch[1] && !updates.countryCode) {
            updates.countryCode = phoneMatch[1];
          }
          updates.phoneNumberOnly = phoneMatch[2].replace(/^[-\s]/, '');
        } else {
          updates.phoneNumberOnly = userProfile.phoneNumber;
        }
      }

      // 폼 데이터 업데이트 (기존 값이 없을 때만)
      setFormData((prev) => ({
        ...prev,
        name: prev.name || updates.name || '',
        gender: prev.gender === 'MALE' ? updates.gender || prev.gender : prev.gender,
        countryCode: prev.countryCode || updates.countryCode || '',
        phoneNumberOnly: prev.phoneNumberOnly || updates.phoneNumberOnly || '',
      }));
    }
  }, [userProfile]);

  const updateField = <K extends keyof ConsultationFormData>(
    field: K,
    value: ConsultationFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const getErrorMessage = (field: string, type: string): string => {
    return (
      dict.consultation?.request?.form?.errors?.[
        field as keyof typeof dict.consultation.request.form.errors
      ]?.[type as keyof typeof dict.consultation.request.form.errors.name] || ''
    );
  };

  const validateForm = (): boolean => {
    const newErrors: ConsultationFormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = getErrorMessage('name', 'required');
    }

    if (!formData.ageGroup) {
      newErrors.ageGroup = getErrorMessage('ageGroup', 'required');
    }

    if (!formData.countryCode.trim()) {
      newErrors.countryCode = getErrorMessage('countryCode', 'required');
    }

    if (!formData.phoneNumberOnly.trim()) {
      newErrors.phoneNumberOnly = getErrorMessage('phoneNumberOnly', 'required');
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = getErrorMessage('preferredDate', 'required');
    }

    if (formData.content && formData.content.length > 500) {
      newErrors.content = getErrorMessage('content', 'maxLength');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (onSuccess?: () => void) => {
    if (validateForm()) {
      onSuccess?.();
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.ageGroup &&
      formData.countryCode.trim() &&
      formData.phoneNumberOnly.trim() &&
      formData.preferredDate
    );
  };

  return {
    formData,
    errors,
    updateField,
    handleSubmit,
    isFormValid: isFormValid(),
  };
}
