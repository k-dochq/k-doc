import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ArticleSection } from './ui/ArticleSection';
import { ArticleItems } from './ui/ArticleItems';

interface TermsOfServiceContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function TermsOfServiceContentV2({ lang, dict }: TermsOfServiceContentV2Props) {
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.footer.termsOfService}</h1>

      <div className='flex flex-col gap-10'>
        {/* 제1조 (목적) */}
        <ArticleSection title={dict.termsOfService.article1.title}>
          <p className='text-base leading-6 font-normal text-neutral-700'>
            {dict.termsOfService.article1.content}
          </p>
        </ArticleSection>

        {/* 제2조 (정의) */}
        <ArticleSection title={dict.termsOfService.article2.title}>
          <div className='flex flex-col gap-2'>
            <p className='text-base leading-6 font-normal text-neutral-700'>
              {dict.termsOfService.article2.intro}
            </p>
            {dict.termsOfService.article2.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </ArticleSection>

        {/* 제3조 (약관의 게시와 개정) */}
        <ArticleSection title={dict.termsOfService.article3.title}>
          <ArticleItems items={dict.termsOfService.article3.items} />
        </ArticleSection>

        {/* 제4조 (약관 외 준칙 및 관련법령과의 관계) */}
        <ArticleSection title={dict.termsOfService.article4.title}>
          <ArticleItems items={dict.termsOfService.article4.items} />
        </ArticleSection>

        {/* 제5조 (이용 계약의 성립) */}
        <ArticleSection title={dict.termsOfService.article5.title}>
          <ArticleItems items={dict.termsOfService.article5.items} />
        </ArticleSection>

        {/* 제6조 (이용 계약의 종료) */}
        <ArticleSection title={dict.termsOfService.article6.title}>
          <ArticleItems items={dict.termsOfService.article6.items} />
        </ArticleSection>

        {/* 제7조 (회원의 ID 및 비밀번호에 대한 의무) */}
        <ArticleSection title={dict.termsOfService.article7.title}>
          <ArticleItems items={dict.termsOfService.article7.items} />
        </ArticleSection>

        {/* 제8조 (회원, 이용자의 의무) */}
        <ArticleSection title={dict.termsOfService.article8.title}>
          <ArticleItems items={dict.termsOfService.article8.items} />
        </ArticleSection>

        {/* 제9조 (회사의 의무) */}
        <ArticleSection title={dict.termsOfService.article9.title}>
          <ArticleItems items={dict.termsOfService.article9.items} />
        </ArticleSection>

        {/* 제10조 (개인정보의 보호 및 사용) */}
        <ArticleSection title={dict.termsOfService.article10.title}>
          <ArticleItems items={dict.termsOfService.article10.items} />
        </ArticleSection>

        {/* 제11조 (이용신청의 승낙과 제한) */}
        <ArticleSection title={dict.termsOfService.article11.title}>
          <ArticleItems items={dict.termsOfService.article11.items} />
        </ArticleSection>

        {/* 제12조 (책임제한) */}
        <ArticleSection title={dict.termsOfService.article12.title}>
          <ArticleItems items={dict.termsOfService.article12.items} />
        </ArticleSection>

        {/* 제13조 (회원에 대한 통지) */}
        <ArticleSection title={dict.termsOfService.article13.title}>
          <ArticleItems items={dict.termsOfService.article13.items} />
        </ArticleSection>

        {/* 제14조 (서비스의 제공 및 변경) */}
        <ArticleSection title={dict.termsOfService.article14.title}>
          <ArticleItems items={dict.termsOfService.article14.items} />
        </ArticleSection>

        {/* 제15조 (구매) */}
        <ArticleSection title={dict.termsOfService.article15.title}>
          <ArticleItems items={dict.termsOfService.article15.items} />
        </ArticleSection>

        {/* 제16조 (구매계약의 성립) */}
        <ArticleSection title={dict.termsOfService.article16.title}>
          <ArticleItems items={dict.termsOfService.article16.items} />
        </ArticleSection>

        {/* 제17조 (결제 방법) */}
        <ArticleSection title={dict.termsOfService.article17.title}>
          <ArticleItems items={dict.termsOfService.article17.items} />
        </ArticleSection>

        {/* 제18조 (구매신청 및 결제확인 통지 등) */}
        <ArticleSection title={dict.termsOfService.article18.title}>
          <ArticleItems items={dict.termsOfService.article18.items} />
        </ArticleSection>

        {/* 제19조 (미리결제의 이용) */}
        <ArticleSection title={dict.termsOfService.article19.title}>
          <ArticleItems items={dict.termsOfService.article19.items} />
        </ArticleSection>

        {/* 제20조 (할인권) */}
        <ArticleSection title={dict.termsOfService.article20.title}>
          <ArticleItems items={dict.termsOfService.article20.items} />
        </ArticleSection>

        {/* 제21조 (포인트) */}
        <ArticleSection title={dict.termsOfService.article21.title}>
          <ArticleItems items={dict.termsOfService.article21.items} />
        </ArticleSection>

        {/* 제22조 (환급) */}
        <ArticleSection title={dict.termsOfService.article22.title}>
          <ArticleItems items={dict.termsOfService.article22.items} />
        </ArticleSection>

        {/* 제23조 (청약철회) */}
        <ArticleSection title={dict.termsOfService.article23.title}>
          <ArticleItems items={dict.termsOfService.article23.items} />
        </ArticleSection>

        {/* 제24조 (청약철회 등의 효과) */}
        <ArticleSection title={dict.termsOfService.article24.title}>
          <ArticleItems items={dict.termsOfService.article24.items} />
        </ArticleSection>
      </div>
    </div>
  );
}
