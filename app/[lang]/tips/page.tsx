import { type Locale } from 'shared/config';

interface TipsPageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function TipsPage({ params }: TipsPageProps) {
  const { lang } = await params;

  return (
    <div className='px-5 py-6'>
      {/* TODO: Tips 콘텐츠 구현 */}
    </div>
  );
}
