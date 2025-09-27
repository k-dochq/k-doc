import { type Dictionary } from 'shared/model/types';

interface ContactPartnershipInquiryProps {
  dict: Dictionary;
}

export function ContactPartnershipInquiry({ dict }: ContactPartnershipInquiryProps) {
  return (
    <div className='mt-9'>
      {/* 입점 신청 상담 제목 */}
      <h2 className='text-2xl font-bold' style={{ color: '#AE33FB' }}>
        {dict.contact.partnershipInquiry.title}
      </h2>

      {/* 입점 신청하기 버튼 */}
      <div className='mt-6'>
        <a
          href='https://docs.google.com/forms/d/1HxiHa4hVG4lbTTaO7lW78FiAiMmQnTLlGjzPVYb9iZ8/edit'
          target='_blank'
          rel='noopener noreferrer'
          className='flex h-14 w-full items-center justify-center gap-2 rounded-xl px-10 text-base leading-6 font-medium text-white'
          style={{ backgroundColor: '#AE33FB' }}
        >
          {dict.contact.partnershipInquiry.button}
        </a>
      </div>
    </div>
  );
}
