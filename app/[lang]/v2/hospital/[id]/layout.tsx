import { type Locale } from 'shared/config';

interface V2HospitalDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2HospitalDetailLayout({
  children,
  params,
}: V2HospitalDetailLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <main>{children}</main>
    </div>
  );
}
