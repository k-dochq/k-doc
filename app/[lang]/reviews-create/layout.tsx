import { type Locale } from 'shared/config';

interface ReviewWriteLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewWriteLayout({ children }: ReviewWriteLayoutProps) {
  return <div className='min-h-screen bg-white'>{children}</div>;
}
