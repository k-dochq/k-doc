import { type Dictionary } from 'shared/model/types';

interface ContactEmailInquiryProps {
  dict: Dictionary;
}

export function ContactEmailInquiry({ dict }: ContactEmailInquiryProps) {
  return (
    <div className='mt-9'>
      {/* 이메일 문의 제목 */}
      <h2 className='text-primary text-2xl font-bold'>{dict.contact.emailInquiry.title}</h2>

      {/* 설명 텍스트 */}
      <div className='mt-2'>
        <p className='text-sm leading-5 font-normal text-[#525252]'>
          {dict.contact.emailInquiry.description}
        </p>
      </div>

      {/* 이메일 문의하기 버튼 */}
      <div className='mt-6'>
        <a
          href='mailto:cs@k-doc.kr'
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-[#DA47EF] px-10 text-base leading-6 font-medium text-white'
        >
          {dict.contact.emailInquiry.button}
        </a>
      </div>
    </div>
  );
}
