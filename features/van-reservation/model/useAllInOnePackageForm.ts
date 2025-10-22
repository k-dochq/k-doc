'use client';

import { useState } from 'react';
import { type VanType, type ServiceType } from './van-types';
import { calculatePrice, type PriceBreakdown } from './pricing';
import { type Dictionary } from 'shared/model/types';

export interface AllInOnePackageFormData {
  vanType: VanType | null;
  serviceType: ServiceType | null;
  hasPicketing: boolean;
}

export interface AllInOnePackageFormErrors {
  vanType?: string;
  serviceType?: string;
}

const initialFormData: AllInOnePackageFormData = {
  vanType: null,
  serviceType: null,
  hasPicketing: false,
};

export function useAllInOnePackageForm(dict: Dictionary) {
  const [formData, setFormData] = useState<AllInOnePackageFormData>(initialFormData);
  const [errors, setErrors] = useState<AllInOnePackageFormErrors>({});

  const updateField = <K extends keyof AllInOnePackageFormData>(
    field: K,
    value: AllInOnePackageFormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user updates the field
    if (errors[field as keyof AllInOnePackageFormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: AllInOnePackageFormErrors = {};

    if (!formData.vanType) {
      newErrors.vanType =
        dict.package?.vanReservation?.validation?.vanTypeRequired || '차량 타입을 선택해주세요';
    }

    if (!formData.serviceType) {
      newErrors.serviceType =
        dict.package?.vanReservation?.validation?.serviceTypeRequired ||
        '서비스 유형을 선택해주세요';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const priceBreakdown: PriceBreakdown = calculatePrice(
    formData.vanType,
    formData.serviceType,
    formData.hasPicketing,
  );

  const isFormValid = (): boolean => {
    return !!formData.vanType && !!formData.serviceType;
  };

  return {
    formData,
    errors,
    priceBreakdown,
    updateField,
    validateForm,
    isFormValid: isFormValid(),
  };
}
