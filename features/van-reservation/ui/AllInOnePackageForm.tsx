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
        <div
          className='flex items-start gap-3 rounded-xl border border-white p-4 shadow-[1px_1px_12px_0_rgba(76,25,168,0.12)]'
          style={{
            background: 'rgba(255, 255, 255, 0.50)',
          }}
        >
          <div className='flex-shrink-0'>
            <button
              type='button'
              onClick={() => updateField('hasPicketing', !formData.hasPicketing)}
              className='flex h-6 w-6 items-center justify-center rounded-full border-2 border-neutral-300 transition-all hover:border-[#DA47EF]'
              style={{
                backgroundColor: formData.hasPicketing ? '#DA47EF' : 'transparent',
                borderColor: formData.hasPicketing ? '#DA47EF' : '#D1D5DB',
              }}
            >
              {formData.hasPicketing && (
                <svg className='h-4 w-4 text-white' fill='currentColor' viewBox='0 0 20 20'>
                  <path
                    fillRule='evenodd'
                    d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                    clipRule='evenodd'
                  />
                </svg>
              )}
            </button>
          </div>
          <div className='flex-1'>
            <div
              onClick={() => updateField('hasPicketing', !formData.hasPicketing)}
              className='cursor-pointer text-sm font-medium text-neutral-900'
            >
              {dict.package?.vanReservation?.picketing?.label || '피켓팅 서비스'}
            </div>
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
