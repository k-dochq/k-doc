import { PageHeader } from 'shared/ui/page-header';
import { type Locale } from 'shared/config';
import { getDictionary } from '../dictionaries';

interface ReviewsCreateLayoutProps {
  children: React.ReactNode;
  params: Promise<{ lang: Locale }>;
}

export default async function ReviewsCreateLayout({ children, params }: ReviewsCreateLayoutProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <>
      <PageHeader
        lang={lang}
        title={dict.reviewWrite.form.title}
        fallbackUrl={`/${lang}/reviews/select-hospital`}
        variant='light'
      />
      <main>{children}</main>
    </>
  );
}
