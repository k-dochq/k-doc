import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PaymentSuccessContent } from './PaymentSuccessContent';

interface PaymentSuccessPageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    orderId?: string;
    tid?: string;
    resultMessage?: string;
    redirectUrl?: string;
  }>;
}

export default async function PaymentSuccessPage({
  params,
  searchParams,
}: PaymentSuccessPageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen'>
      <PaymentSuccessContent lang={lang} dict={dict} queryParams={queryParams} />
    </div>
  );
}
