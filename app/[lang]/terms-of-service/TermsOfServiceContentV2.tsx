import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

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
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article1.title}
          </h2>
          <p className='text-base leading-6 font-normal text-neutral-700'>
            {dict.termsOfService.article1.content}
          </p>
        </div>

        {/* 제2조 (정의) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article2.title}
          </h2>
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
        </div>

        {/* 제3조 (약관의 게시와 개정) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article3.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article3.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        {/* 제4조 (약관 외 준칙 및 관련법령과의 관계) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article4.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article4.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        {/* 제5조 (이용 계약의 성립) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article5.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article5.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제6조 (이용 계약의 종료) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article6.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article6.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else if (item.title && item.subItems) {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-semibold text-neutral-700'>
                      {item.title}
                    </p>
                    <div className='flex flex-col gap-1 pl-4'>
                      {item.subItems.map((subItem, subIndex) => {
                        if (typeof subItem === 'string') {
                          return (
                            <p
                              key={subIndex}
                              className='text-base leading-6 font-normal text-neutral-700'
                            >
                              {subIndex + 1}) {subItem}
                            </p>
                          );
                        } else if (subItem.content && subItem.subSubItems) {
                          return (
                            <div key={subIndex} className='flex flex-col gap-1'>
                              <p className='text-base leading-6 font-normal text-neutral-700'>
                                {subIndex + 1}) {subItem.content}
                              </p>
                              <div className='flex flex-col gap-1 pl-4'>
                                {subItem.subSubItems.map((subSubItem, subSubIndex) => (
                                  <p
                                    key={subSubIndex}
                                    className='text-base leading-6 font-normal text-neutral-700'
                                  >
                                    {String.fromCharCode(65 + subSubIndex)}. {subSubItem}
                                  </p>
                                ))}
                              </div>
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>

        {/* 제7조 (회원의 ID 및 비밀번호에 대한 의무) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article7.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article7.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        {/* 제8조 (회원, 이용자의 의무) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article8.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article8.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제9조 (회사의 의무) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article9.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article9.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        {/* 제10조 (개인정보의 보호 및 사용) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article10.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article10.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제11조 (이용신청의 승낙과 제한) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article11.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article11.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제12조 (책임제한) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article12.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article12.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제13조 (회원에 대한 통지) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article13.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article13.items.map((item, index) => (
              <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                {index + 1}. {item}
              </p>
            ))}
          </div>
        </div>

        {/* 제14조 (서비스의 제공 및 변경) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article14.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article14.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>

        {/* 제15조 (구매) */}
        <div className='flex flex-col gap-4'>
          <h2 className='text-2xl font-semibold text-neutral-700'>
            {dict.termsOfService.article15.title}
          </h2>
          <div className='flex flex-col gap-2'>
            {dict.termsOfService.article15.items.map((item, index) => {
              if (typeof item === 'string') {
                return (
                  <p key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {index + 1}. {item}
                  </p>
                );
              } else {
                return (
                  <div key={index} className='flex flex-col gap-2'>
                    <p className='text-base leading-6 font-normal text-neutral-700'>
                      {index + 1}. {item.content}
                    </p>
                    {item.subItems && (
                      <div className='flex flex-col gap-1 pl-4'>
                        {item.subItems.map((subItem, subIndex) => (
                          <p
                            key={subIndex}
                            className='text-base leading-6 font-normal text-neutral-700'
                          >
                            {subIndex + 1}) {subItem}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
