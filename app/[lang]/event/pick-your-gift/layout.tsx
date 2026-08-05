import { type Locale } from 'shared/config';

interface PickYourGiftLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function PickYourGiftLayout({ children }: PickYourGiftLayoutProps) {
  return children;
}
