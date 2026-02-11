import { type Locale } from 'shared/config';

interface DonationLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function DonationLayout({ children }: DonationLayoutProps) {
  return children;
}
