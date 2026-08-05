import { type Locale } from 'shared/config';

interface FreeGreatGiftLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function FreeGreatGiftLayout({ children }: FreeGreatGiftLayoutProps) {
  return children;
}
