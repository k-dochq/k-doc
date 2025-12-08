import { type Locale } from 'shared/config';
import { getDictionary } from '../../../dictionaries';
import { PageHeaderV2 } from 'shared/ui/page-header';

interface V2HospitalDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2HospitalDetailLayout({
  children,
  params,
}: V2HospitalDetailLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen bg-white'>
      <PageHeaderV2 />
      <main>{children}</main>
    </div>
  );
}
