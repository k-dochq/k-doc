import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PaymentReturnContent } from 'features/payment-return';

interface PaymentReturnPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    resultStatus?: string;
    resultCode?: string;
    resultMessage?: string;
    tid?: string;
    orderId?: string;
    mallReserved?: string;
    redirectUrl?: string;
  }>;
}

export default async function PaymentReturnPage({ params, searchParams }: PaymentReturnPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen'>
      <PaymentReturnContent lang={lang} dict={dict} queryParams={queryParams} />
    </div>
  );
}
