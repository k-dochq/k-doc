import { type Locale } from 'shared/config';
import { MaxWidthLayout } from '@/widgets';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children }: HospitalsLayoutProps) {
  return <MaxWidthLayout>{children}</MaxWidthLayout>;
}
