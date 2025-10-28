'use client';

import { useState, useCallback } from 'react';
import { type Dictionary } from 'shared/model/types';

export interface ReviewFormData {
  rating: number;
  procedureName: string;
  medicalSpecialtyId: string;
  content: string;
}

interface FormErrors {
  rating?: string;
  procedureName?: string;
  medicalSpecialtyId?: string;
  content?: string;
}

interface UseReviewWriteFormResult {
  formData: ReviewFormData;
  errors: FormErrors;
  isValid: boolean;
  updateField: <K extends keyof ReviewFormData>(field: K, value: ReviewFormData[K]) => void;
  validateForm: () => boolean;
  resetForm: () => void;
}

const initialFormData: ReviewFormData = {
  rating: 0,
  procedureName: '',
  medicalSpecialtyId: '',
  content: '',
};

export function useReviewWriteForm(dict: Dictionary): UseReviewWriteFormResult {
  const [formData, setFormData] = useState<ReviewFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  const updateField = useCallback(
    <K extends keyof ReviewFormData>(field: K, value: ReviewFormData[K]) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      // Clear error when field is updated
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    },
    [],
  );

  const validateForm = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    const validationMessages = dict.reviewWrite?.validation;

    if (!formData.rating || formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = validationMessages?.ratingRequired || 'Rating is required';
    }

    if (!formData.procedureName.trim()) {
      newErrors.procedureName =
        validationMessages?.procedureNameRequired || 'Procedure name is required';
    }

    if (!formData.medicalSpecialtyId) {
      newErrors.medicalSpecialtyId =
        validationMessages?.medicalSpecialtyRequired || 'Medical specialty is required';
    }

    if (!formData.content.trim()) {
      newErrors.content = validationMessages?.contentRequired || 'Content is required';
    } else if (formData.content.length > 500) {
      newErrors.content =
        validationMessages?.contentMaxLength || 'Content must be 500 characters or less';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData, dict]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
  }, []);

  const isValid =
    formData.rating > 0 &&
    formData.procedureName.trim().length > 0 &&
    formData.medicalSpecialtyId.length > 0 &&
    formData.content.trim().length > 0 &&
    formData.content.length <= 500;

  return {
    formData,
    errors,
    isValid,
    updateField,
    validateForm,
    resetForm,
  };
}
