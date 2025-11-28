import { type Locale } from 'shared/config';

interface PackageLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function PackageLayout({ children }: PackageLayoutProps) {
  return children;
}
