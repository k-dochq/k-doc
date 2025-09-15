import { type Locale } from 'shared/config';

interface ConsultationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ConsultationLayout({ children }: ConsultationLayoutProps) {
  return <main className='py-8 pb-20'>{children}</main>;
}
