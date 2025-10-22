'use client';

import { useState } from 'react';
import { type VanType, type ServiceType } from './van-types';
import { calculatePrice, type PriceBreakdown } from './pricing';
import { type Dictionary } from 'shared/model/types';

export interface AllInOnePackageFormData {
  vanType: VanType | null;
  serviceType: ServiceType | null;
  pickupLocation: string;
  dropoffLocation: string;
  pickupDate: string;
  pickupTime: string;
  passengerCount: string;
  luggage: string;
  hasPicketing: boolean;
  name: string;
  phone: string;
  email: string;
}

export interface AllInOnePackageFormErrors {
  vanType?: string;
  serviceType?: string;
  pickupLocation?: string;
  dropoffLocation?: string;
  pickupDate?: string;
  pickupTime?: string;
  passengerCount?: string;
  name?: string;
  phone?: string;
  email?: string;
}

const initialFormData: AllInOnePackageFormData = {
  vanType: null,
  serviceType: null,
  pickupLocation: '',
  dropoffLocation: '',
  pickupDate: '',
  pickupTime: '',
  passengerCount: '',
  luggage: '',
  hasPicketing: false,
  name: '',
  phone: '',
  email: '',
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

    if (!formData.pickupLocation.trim()) {
      newErrors.pickupLocation =
        dict.package?.vanReservation?.validation?.pickupLocationRequired ||
        '픽업 장소를 입력해주세요';
    }

    if (formData.serviceType === 'oneWay' && !formData.dropoffLocation.trim()) {
      newErrors.dropoffLocation =
        dict.package?.vanReservation?.validation?.dropoffLocationRequired ||
        '도착 장소를 입력해주세요';
    }

    if (!formData.pickupDate) {
      newErrors.pickupDate =
        dict.package?.vanReservation?.validation?.pickupDateRequired || '픽업 날짜를 선택해주세요';
    }

    if (!formData.pickupTime) {
      newErrors.pickupTime =
        dict.package?.vanReservation?.validation?.pickupTimeRequired || '픽업 시간을 선택해주세요';
    }

    if (!formData.passengerCount) {
      newErrors.passengerCount =
        dict.package?.vanReservation?.validation?.passengerCountRequired ||
        '탑승 인원을 선택해주세요';
    }

    if (!formData.name.trim()) {
      newErrors.name =
        dict.package?.vanReservation?.validation?.nameRequired || '이름을 입력해주세요';
    }

    if (!formData.phone.trim()) {
      newErrors.phone =
        dict.package?.vanReservation?.validation?.phoneRequired || '전화번호를 입력해주세요';
    }

    if (!formData.email.trim()) {
      newErrors.email =
        dict.package?.vanReservation?.validation?.emailRequired || '이메일을 입력해주세요';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email =
        dict.package?.vanReservation?.validation?.emailInvalid ||
        '유효한 이메일 주소를 입력해주세요';
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
    return (
      !!formData.vanType &&
      !!formData.serviceType &&
      !!formData.pickupLocation.trim() &&
      (formData.serviceType !== 'oneWay' || !!formData.dropoffLocation.trim()) &&
      !!formData.pickupDate &&
      !!formData.pickupTime &&
      !!formData.passengerCount &&
      !!formData.name.trim() &&
      !!formData.phone.trim() &&
      !!formData.email.trim() &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    );
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
