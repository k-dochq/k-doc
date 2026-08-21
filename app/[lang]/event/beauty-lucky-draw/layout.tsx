import { type Locale } from 'shared/config';

interface BeautyLuckyDrawLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function BeautyLuckyDrawLayout({ children }: BeautyLuckyDrawLayoutProps) {
  return children;
}
