'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ConsultationFormData, type ConsultationFormErrors } from './types';

const initialFormData: ConsultationFormData = {
  name: '',
  gender: 'MALE',
  ageGroup: '',
  phoneNumber: '',
  preferredDate: '',
  content: '',
  agreeToPrivacy: false,
};

export function useConsultationForm(lang: Locale, dict: Dictionary) {
  const [formData, setFormData] = useState<ConsultationFormData>(initialFormData);
  const [errors, setErrors] = useState<ConsultationFormErrors>({});

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

    if (!formData.phoneNumber.trim()) {
      newErrors.phoneNumber = getErrorMessage('phoneNumber', 'required');
    } else if (!/^01[0-9]-?[0-9]{4}-?[0-9]{4}$/.test(formData.phoneNumber.replace(/-/g, ''))) {
      newErrors.phoneNumber = getErrorMessage('phoneNumber', 'invalid');
    }

    if (!formData.preferredDate) {
      newErrors.preferredDate = getErrorMessage('preferredDate', 'required');
    }

    if (!formData.content.trim()) {
      newErrors.content = getErrorMessage('content', 'required');
    } else if (formData.content.length > 500) {
      newErrors.content = getErrorMessage('content', 'maxLength');
    }

    if (!formData.agreeToPrivacy) {
      newErrors.agreeToPrivacy = getErrorMessage('agreeToPrivacy', 'required');
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      console.log('상담신청 데이터:', formData);
      return true;
    }
    return false;
  };

  const isFormValid = () => {
    return (
      formData.name.trim() &&
      formData.ageGroup &&
      formData.phoneNumber.trim() &&
      formData.preferredDate &&
      formData.content.trim() &&
      formData.agreeToPrivacy
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
