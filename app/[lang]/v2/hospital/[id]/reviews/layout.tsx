import { type Locale } from 'shared/config';

interface V2HospitalReviewsLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function V2HospitalReviewsLayout({ children }: V2HospitalReviewsLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <main>{children}</main>
    </div>
  );
}
