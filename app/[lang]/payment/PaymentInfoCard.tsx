import { type Locale } from 'shared/config';
import type { Dictionary } from 'shared/model/types';

interface PaymentInfoCardProps {
  lang: Locale;
  dict: Dictionary;
  productName: string;
  amount: number;
  currency: string;
  orderId: string;
}

export function PaymentInfoCard({
  lang,
  dict,
  productName,
  amount,
  currency,
  orderId,
}: PaymentInfoCardProps) {
  return (
    <div className='mx-auto max-w-md rounded-xl border border-gray-200 bg-white p-6 shadow-sm'>
      <h2 className='mb-4 text-lg font-semibold text-gray-900'>{dict.payment.info.title}</h2>
      <div className='space-y-3'>
        <div className='flex justify-between'>
          <span className='text-sm text-gray-600'>{dict.payment.info.productName}</span>
          <span className='text-sm font-medium text-gray-900'>{productName}</span>
        </div>
        <div className='flex justify-between'>
          <span className='text-sm text-gray-600'>{dict.payment.info.orderId}</span>
          <span className='text-sm font-medium text-gray-900'>{orderId}</span>
        </div>
        <div className='flex justify-between border-t border-gray-200 pt-3'>
          <span className='text-base font-semibold text-gray-900'>{dict.payment.info.amount}</span>
          <span className='text-lg font-bold text-gray-900'>
            {new Intl.NumberFormat(lang === 'ko' ? 'ko-KR' : lang === 'th' ? 'th-TH' : 'en-US', {
              style: 'currency',
              currency: currency,
            }).format(amount)}
          </span>
        </div>
      </div>
    </div>
  );
}
