'use client';

import { type Dictionary } from 'shared/model/types';
import { type Locale } from 'shared/config';
import { useAllInOnePackageForm } from '../model/useAllInOnePackageForm';
import { VAN_TYPES, MAX_PASSENGERS, MAX_LUGGAGE } from '../model/van-types';
import { VanTypeCard } from './VanTypeCard';
import { ServiceTypeSelector } from './ServiceTypeSelector';
import { PriceCalculator } from './PriceCalculator';
import { FormInput } from 'shared/ui/form-input';
import { FormButton } from 'shared/ui/form-button';
import { DatePicker } from 'shared/ui/simple-date-picker';
import { Select } from 'shared/ui/select';

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

    // 결제 기능은 준비중
    alert(dict.package?.vanReservation?.buttons?.paymentComingSoon || '결제 기능은 준비중입니다');
  };

  // Generate time options (30 minute intervals)
  const timeOptions = [];
  for (let hour = 0; hour < 24; hour++) {
    for (let minute = 0; minute < 60; minute += 30) {
      const timeValue = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
      timeOptions.push(timeValue);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='space-y-6 p-5'>
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

      {/* Pickup Location */}
      <FormInput
        label={
          <>
            {dict.package?.vanReservation?.form?.pickupLocation?.label || '픽업 장소'}{' '}
            <span className='text-red-500'>*</span>
          </>
        }
        placeholder={dict.package?.vanReservation?.form?.pickupLocation?.placeholder}
        value={formData.pickupLocation}
        onChange={(e) => updateField('pickupLocation', e.target.value)}
        error={errors.pickupLocation}
      />

      {/* Dropoff Location (only for one-way) */}
      {formData.serviceType === 'oneWay' && (
        <FormInput
          label={
            <>
              {dict.package?.vanReservation?.form?.dropoffLocation?.label || '도착 장소'}{' '}
              <span className='text-red-500'>*</span>
            </>
          }
          placeholder={dict.package?.vanReservation?.form?.dropoffLocation?.placeholder}
          value={formData.dropoffLocation}
          onChange={(e) => updateField('dropoffLocation', e.target.value)}
          error={errors.dropoffLocation}
        />
      )}

      {/* Pickup Date */}
      <div className='flex w-full flex-col gap-2'>
        <label className='text-sm leading-5 font-medium text-neutral-900'>
          {dict.package?.vanReservation?.form?.pickupDate?.label || '픽업 날짜'}{' '}
          <span className='text-red-500'>*</span>
        </label>
        <DatePicker
          value={formData.pickupDate ? new Date(formData.pickupDate) : undefined}
          onChange={(date: Date | undefined) =>
            updateField('pickupDate', date ? date.toISOString().split('T')[0] : '')
          }
          placeholder={dict.package?.vanReservation?.form?.pickupDate?.placeholder}
          locale={lang}
          dict={dict}
          disabled={(date: Date) => {
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            return date < today;
          }}
          error={errors.pickupDate}
          required
        />
        {errors.pickupDate && <p className='text-sm leading-5 text-red-500'>{errors.pickupDate}</p>}
      </div>

      {/* Pickup Time */}
      <Select
        label={
          <>
            {dict.package?.vanReservation?.form?.pickupTime?.label || '픽업 시간'}{' '}
            <span className='text-red-500'>*</span>
          </>
        }
        value={formData.pickupTime}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          updateField('pickupTime', e.target.value)
        }
        error={errors.pickupTime}
      >
        <option value=''>
          {dict.package?.vanReservation?.form?.pickupTime?.placeholder || '시간을 선택하세요'}
        </option>
        {timeOptions.map((time) => (
          <option key={time} value={time}>
            {time}
          </option>
        ))}
      </Select>

      {/* Passenger Count */}
      <Select
        label={
          <>
            {dict.package?.vanReservation?.form?.passengerCount?.label || '탑승 인원'}{' '}
            <span className='text-red-500'>*</span>
          </>
        }
        value={formData.passengerCount}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          updateField('passengerCount', e.target.value)
        }
        error={errors.passengerCount}
      >
        <option value=''>
          {dict.package?.vanReservation?.form?.passengerCount?.placeholder || '인원을 선택하세요'}
        </option>
        {Array.from({ length: MAX_PASSENGERS }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num.toString()}>
            {num} {num === 1 ? 'person' : 'people'}
          </option>
        ))}
      </Select>

      {/* Luggage */}
      <Select
        label={dict.package?.vanReservation?.form?.luggage?.label || '수하물 개수'}
        value={formData.luggage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          updateField('luggage', e.target.value)
        }
      >
        <option value=''>
          {dict.package?.vanReservation?.form?.luggage?.placeholder || '수하물 개수를 선택하세요'}
        </option>
        {Array.from({ length: MAX_LUGGAGE }, (_, i) => i + 1).map((num) => (
          <option key={num} value={num.toString()}>
            {num} {num === 1 ? 'piece' : 'pieces'}
          </option>
        ))}
      </Select>

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
              {dict.package?.vanReservation?.picketing?.price || '+$5'}
            </p>
          </div>
        </div>
      )}

      {/* Contact Information */}
      <div className='space-y-4 rounded-xl border border-neutral-200 bg-white p-4'>
        <h3 className='text-base font-bold text-neutral-900'>
          {dict.package?.vanReservation?.form?.contactInfo?.label || '연락처 정보'}
        </h3>

        <FormInput
          label={
            <>
              {dict.package?.vanReservation?.form?.contactInfo?.name || '이름'}{' '}
              <span className='text-red-500'>*</span>
            </>
          }
          placeholder={dict.package?.vanReservation?.form?.contactInfo?.namePlaceholder}
          value={formData.name}
          onChange={(e) => updateField('name', e.target.value)}
          error={errors.name}
        />

        <FormInput
          label={
            <>
              {dict.package?.vanReservation?.form?.contactInfo?.phone || '전화번호'}{' '}
              <span className='text-red-500'>*</span>
            </>
          }
          type='tel'
          placeholder={dict.package?.vanReservation?.form?.contactInfo?.phonePlaceholder}
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          error={errors.phone}
        />

        <FormInput
          label={
            <>
              {dict.package?.vanReservation?.form?.contactInfo?.email || '이메일'}{' '}
              <span className='text-red-500'>*</span>
            </>
          }
          type='email'
          placeholder={dict.package?.vanReservation?.form?.contactInfo?.emailPlaceholder}
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          error={errors.email}
        />
      </div>

      {/* Price Calculator */}
      <PriceCalculator priceBreakdown={priceBreakdown} dict={dict} />

      {/* Submit Button */}
      <FormButton type='submit' disabled={!isFormValid}>
        {dict.package?.vanReservation?.buttons?.payment || '결제하기'}
      </FormButton>
    </form>
  );
}
