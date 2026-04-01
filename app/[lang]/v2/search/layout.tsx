import { type Locale } from 'shared/config';
import { getDictionary } from '../../dictionaries';
import { SearchGnbV2 } from 'widgets/search-gnb';

interface SearchV2LayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function SearchV2Layout({ children, params }: SearchV2LayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className='min-h-screen overflow-x-clip bg-white'>
      <SearchGnbV2 dict={dict} />
      <main>{children}</main>
    </div>
  );
}
