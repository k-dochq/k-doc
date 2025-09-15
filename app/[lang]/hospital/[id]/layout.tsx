import { type Locale } from 'shared/config';

interface HospitalsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function HospitalsLayout({ children }: HospitalsLayoutProps) {
  return <>{children}</>;
}
