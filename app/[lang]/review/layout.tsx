import { type Locale } from 'shared/config';

interface ReviewLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewLayout({ children }: ReviewLayoutProps) {
  return <main>{children}</main>;
}
