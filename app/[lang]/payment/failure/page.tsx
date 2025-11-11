import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { PaymentFailureContent } from './PaymentFailureContent';

interface PaymentFailurePageProps {
  params: Promise<{ lang: Locale }>;
  searchParams: Promise<{
    resultCode?: string;
    resultMessage?: string;
    orderId?: string;
  }>;
}

export default async function PaymentFailurePage({
  params,
  searchParams,
}: PaymentFailurePageProps) {
  const { lang } = await params;
  const queryParams = await searchParams;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen'>
      <PaymentFailureContent lang={lang} dict={dict} queryParams={queryParams} />
    </div>
  );
}
