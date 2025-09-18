import { type Locale } from 'shared/config';

interface PageProps {
  params: Promise<{
    lang: Locale;
    id: string;
  }>;
}

export default async function ReviewImagesPage({ params }: PageProps) {
  const { lang, id } = await params;

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='mb-4 text-2xl font-bold'>리뷰 이미지 페이지</h1>
      <p>리뷰 ID: {id}</p>
      <p>언어: {lang}</p>
    </div>
  );
}
