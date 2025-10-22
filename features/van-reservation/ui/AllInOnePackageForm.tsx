'use client';

import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { useAllInOnePackageForm } from '../model/useAllInOnePackageForm';
import { VAN_TYPES } from '../model/van-types';
import { VanTypeCard } from './VanTypeCard';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import { FloatingPaymentButton } from './FloatingPaymentButton';

interface AllInOnePackageFormProps {
  lang: Locale;
  dict: Dictionary;
}

export function AllInOnePackageForm({ lang, dict }: AllInOnePackageFormProps) {
  const { formData, errors, priceBreakdown, updateField, validateForm, isFormValid } =
    useAllInOnePackageForm(dict);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = Object.values(errors)[0];
      if (firstError) {
        alert(firstError);
      }
      return;
    }
  };

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-5 pb-24'>
      {/* Title */}
      <div>
        <h1 className='text-2xl font-bold text-neutral-900'>
          {dict.package?.allInOnePackage?.title || '올인원패키지 예약'}
        </h1>
        <p className='mt-2 text-sm text-neutral-600'>
          {dict.package?.allInOnePackage?.subtitle ||
            '차량, 통역 등 모든 서비스를 한 번에 예약하세요'}
        </p>
      </div>

      {/* Van Type Selection */}
      <div className='space-y-3'>
        <label className='text-sm leading-5 font-medium text-neutral-900'>
          {dict.package?.allInOnePackage?.vanSelection || '차량 선택'} *
        </label>
        <div className='space-y-3'>
          {VAN_TYPES.map((vanInfo) => (
            <VanTypeCard
              key={vanInfo.id}
              vanInfo={vanInfo}
              isSelected={formData.vanType === vanInfo.id}
              onSelect={(vanType) => updateField('vanType', vanType)}
              dict={dict}
            />
          ))}
        </div>
        {errors.vanType && <p className='text-sm leading-5 text-red-500'>{errors.vanType}</p>}
      </div>

      {/* Service Type Selection */}
      <ServiceTypeSelector
        selectedType={formData.serviceType}
        onSelect={(type) => updateField('serviceType', type)}
        dict={dict}
      />
      {errors.serviceType && <p className='text-sm leading-5 text-red-500'>{errors.serviceType}</p>}

      {/* Picketing Service (only for one-way) */}
      {formData.serviceType === 'oneWay' && (
        <div className='flex items-start gap-3 rounded-xl border border-neutral-200 bg-white p-4'>
          <input
            type='checkbox'
            id='picketing'
            checked={formData.hasPicketing}
            onChange={(e) => updateField('hasPicketing', e.target.checked)}
            className='mt-1 h-5 w-5 rounded border-neutral-300 text-[#DA47EF] focus:ring-2 focus:ring-[#DA47EF]'
          />
          <div className='flex-1'>
            <label
              htmlFor='picketing'
              className='cursor-pointer text-sm font-medium text-neutral-900'
            >
              {dict.package?.vanReservation?.picketing?.label || '피켓팅 서비스'}
            </label>
            <p className='mt-1 text-xs text-neutral-600'>
              {dict.package?.vanReservation?.picketing?.description ||
                '공항에서 이름표를 들고 마중'}
            </p>
            <p className='mt-1 text-sm font-bold text-[#DA47EF]'>
              {dict.package?.vanReservation?.picketing?.price || '+$4'}
            </p>
          </div>
        </div>
      )}

      {/* Floating Payment Button */}
      <FloatingPaymentButton
        priceBreakdown={priceBreakdown}
        isFormValid={isFormValid}
        onSubmit={() => {
          if (validateForm()) {
            // 결제 기능은 준비중
            alert('결제 기능은 준비중입니다');
          }
        }}
        dict={dict}
      />
    </form>
  );
}
