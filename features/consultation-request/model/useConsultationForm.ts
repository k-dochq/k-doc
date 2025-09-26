'use client';

import { useState } from 'react';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { type ConsultationFormData, type ConsultationFormErrors } from './types';

const initialFormData: ConsultationFormData = {
  name: '',
  gender: 'MALE',
  ageGroup: '',
  countryCode: '',
  phoneNumberOnly: '',
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

    if (!formData.countryCode.trim()) {
      newErrors.countryCode = getErrorMessage('countryCode', 'required');
    }

    if (!formData.phoneNumberOnly.trim()) {
      newErrors.phoneNumberOnly = getErrorMessage('phoneNumberOnly', 'required');
    } else if (!/^[0-9-+\s()]{7,15}$/.test(formData.phoneNumberOnly.trim())) {
      newErrors.phoneNumberOnly = getErrorMessage('phoneNumberOnly', 'invalid');
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
