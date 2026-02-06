import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { PremiumServiceV2Title } from './PremiumServiceV2Title';
import { PremiumServiceCardV2 } from './PremiumServiceCardV2';

interface PremiumServiceV2ContainerProps {
  lang: Locale;
  dict: Dictionary;
}

export function PremiumServiceV2Container({ lang, dict }: PremiumServiceV2ContainerProps) {
  return (
    <div className='flex w-full flex-col gap-4 bg-[#F7F7F7] px-5 py-12'>
      <PremiumServiceV2Title lang={lang} dict={dict} />

      {/* 통역 서비스 카드 */}
      <PremiumServiceCardV2
        lang={lang}
        imageUrl='/images/figma/premium-service/premium-service-interpreter.png'
        imageAlt={dict.premiumService?.services?.interpreter?.title || '통역 서비스'}
        title={dict.premiumService?.services?.interpreter?.title || '통역 서비스 제공 가능'}
        description={
          dict.premiumService?.services?.interpreter?.description ||
          '전문 통역사가 1:1로 밀착 동행합니다.'
        }
      />

      {/* 차량 서비스 카드 */}
      <PremiumServiceCardV2
        lang={lang}
        imageUrl='/images/figma/premium-service/premium-service-vehicle.png'
        imageAlt={dict.premiumService?.services?.vehicle?.title || '차량 서비스'}
        title={dict.premiumService?.services?.vehicle?.title || '차량 서비스 제공 가능'}
        description={
          dict.premiumService?.services?.vehicle?.description ||
          '최고급 차량으로 편안하고 안전한 이동을 책임집니다.'
        }
      />
    </div>
  );
}
