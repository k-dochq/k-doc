import { type Locale } from 'shared/config';

interface V2DoctorDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2DoctorDetailLayout({ children }: V2DoctorDetailLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <main>{children}</main>
    </div>
  );
}
