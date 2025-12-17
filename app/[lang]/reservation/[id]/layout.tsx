import { type Locale } from 'shared/config';

interface ReservationDetailLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale; id: string }>;
}

export default async function ReservationDetailLayout({ children }: ReservationDetailLayoutProps) {
  return (
    <div className='min-h-screen bg-white'>
      <main>{children}</main>
    </div>
  );
}
