import { getDictionary } from 'app/[lang]/dictionaries';
import { type Locale } from 'shared/config';
import { SelectHospitalContent } from './SelectHospitalContent';

interface SelectHospitalPageProps {
  params: Promise<{
    lang: Locale;
  }>;
}

export default async function SelectHospitalPage({ params }: SelectHospitalPageProps) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  return (
    <div className=''>
      <SelectHospitalContent lang={lang} dict={dict} />
    </div>
  );
}

// 메타데이터 생성
export async function generateMetadata({ params }: SelectHospitalPageProps) {
  const { lang } = await params;

  try {
    const dict = await getDictionary(lang);

    return {
      title: dict.reviewWrite?.selectHospital?.title || 'Select Hospital',
      description:
        dict.reviewWrite?.selectHospital?.description || 'Select a hospital to write a review.',
    };
  } catch (error) {
    console.error('Error generating metadata for select hospital page:', error);
    return {
      title: '병원 선택',
      description: '시술후기를 작성할 병원을 선택하세요.',
    };
  }
}
