import Image from 'next/image';
import { type Locale } from 'shared/config';

interface HomePageProps {
  params: Promise<{ lang: Locale }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const { lang } = await params;

  const messages = {
    ko: {
      logoAlt: 'K-DOC 로고',
      comingSoonAlt: 'Coming Soon',
    },
    en: {
      logoAlt: 'K-DOC Logo',
      comingSoonAlt: 'Coming Soon',
    },
    th: {
      logoAlt: 'โลโก้ K-DOC',
      comingSoonAlt: 'เร็วๆ นี้',
    },
  };

  const dict = messages[lang];

  return (
    <main className='flex min-h-screen items-center justify-center bg-black text-white'>
      <div className='w-full text-center'>
        <div className='flex items-center justify-center space-x-6'>
          <div className='relative h-32 w-32'>
            <Image
              src='/kdoc_logo.png'
              alt={dict.logoAlt}
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>

        <div className='mt-8 flex justify-center'>
          <div className='relative h-16 w-48'>
            <Image
              src='/coming_soon.png'
              alt={dict.comingSoonAlt}
              fill
              className='object-contain'
              priority
            />
          </div>
        </div>
      </div>
    </main>
  );
}
