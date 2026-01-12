import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { ArticleSection } from '../terms-of-service/ui/ArticleSection';

interface PrivacyPolicyContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PrivacyPolicyContentV2({ lang, dict }: PrivacyPolicyContentV2Props) {
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.footer.privacyPolicy}</h1>

      <div className='flex flex-col gap-10'>
        <div className='rounded-lg bg-neutral-100 p-5'>
          <p className='text-base leading-6 font-normal text-neutral-700'>
            {dict.privacyPolicy.intro}
          </p>
        </div>

        {/* 1. 개인정보의 수집 */}
        <ArticleSection title={dict.privacyPolicy.collectionOfPersonalInformation.title}>
          <div className='flex flex-col gap-4'>
            <p className='text-base leading-6 font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.content}
            </p>

            {/* 서비스 별 개인정보 수집 항목 */}
            <div className='flex flex-col gap-2'>
              <h3 className='text-lg font-semibold text-neutral-700'>
                {dict.privacyPolicy.collectionOfPersonalInformation.tableTitle}
              </h3>

              {/* 테이블 */}
              <div className='flex flex-col border-t border-neutral-400'>
                {/* 테이블 헤더 */}
                <div className='flex border-b border-neutral-200 bg-neutral-100'>
                  <div className='flex w-[122px] shrink-0 items-center px-3 py-4'>
                    <p className='text-sm leading-5 font-semibold text-neutral-700'>
                      {
                        dict.privacyPolicy.collectionOfPersonalInformation.table.headers
                          .serviceCategory
                      }
                    </p>
                  </div>
                  <div className='flex w-0 shrink-0 items-center justify-center'>
                    <div className='h-full w-px bg-neutral-200' />
                  </div>
                  <div className='flex flex-1 items-center px-3 py-4'>
                    <p className='text-sm leading-5 font-semibold text-neutral-700'>
                      {
                        dict.privacyPolicy.collectionOfPersonalInformation.table.headers
                          .collectedItems
                      }
                    </p>
                  </div>
                </div>

                {/* 테이블 본문 */}
                {dict.privacyPolicy.collectionOfPersonalInformation.table.rows.map((row, index) => (
                  <div key={index} className='flex border-b border-neutral-200'>
                    <div className='flex w-[122px] shrink-0 items-center px-3 py-4'>
                      <p className='text-sm leading-5 font-normal text-neutral-500'>
                        {row.serviceCategory}
                      </p>
                    </div>
                    <div className='flex w-0 shrink-0 items-center justify-center'>
                      <div className='h-full w-px bg-neutral-200' />
                    </div>
                    <div className='flex flex-1 items-center px-3 py-4'>
                      <div className='flex flex-col gap-1'>
                        {(() => {
                          const items = row.collectedItems;
                          // simple 타입 (단순 문자열)
                          if ('simple' in items) {
                            return (
                              <p className='text-sm leading-5 font-normal text-neutral-500'>
                                {items.simple}
                              </p>
                            );
                          }
                          // required/optional 타입
                          if ('required' in items || 'optional' in items) {
                            return (
                              <>
                                {items.required && (
                                  <p className='text-sm leading-5 font-normal text-neutral-500'>
                                    {
                                      dict.privacyPolicy.collectionOfPersonalInformation.tableLabels
                                        .required
                                    }{' '}
                                    {items.required}
                                  </p>
                                )}
                                {items.optional && (
                                  <p className='text-sm leading-5 font-normal text-neutral-500'>
                                    {
                                      dict.privacyPolicy.collectionOfPersonalInformation.tableLabels
                                        .optional
                                    }{' '}
                                    {items.optional}
                                  </p>
                                )}
                              </>
                            );
                          }
                          // applicant/applicationInfo 타입
                          if ('applicant' in items || 'applicationInfo' in items) {
                            return (
                              <>
                                {items.applicant && (
                                  <>
                                    <p className='text-sm leading-5 font-semibold text-neutral-500'>
                                      {items.applicant.label}
                                    </p>
                                    <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                      {
                                        dict.privacyPolicy.collectionOfPersonalInformation
                                          .tableLabels.required
                                      }{' '}
                                      {items.applicant.required}
                                    </p>
                                  </>
                                )}
                                {items.applicationInfo && (
                                  <>
                                    <p className='text-sm leading-5 font-semibold text-neutral-500'>
                                      {items.applicationInfo.label}
                                    </p>
                                    <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                      {
                                        dict.privacyPolicy.collectionOfPersonalInformation
                                          .tableLabels.required
                                      }{' '}
                                      {items.applicationInfo.required}
                                    </p>
                                  </>
                                )}
                              </>
                            );
                          }
                          // review 타입
                          if ('review' in items && items.review) {
                            return (
                              <>
                                <p className='text-sm leading-5 font-semibold text-neutral-500'>
                                  {items.review.label}
                                </p>
                                <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                  {
                                    dict.privacyPolicy.collectionOfPersonalInformation.tableLabels
                                      .required
                                  }{' '}
                                  {items.review.required}
                                </p>
                                {items.review.optional && (
                                  <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                    {
                                      dict.privacyPolicy.collectionOfPersonalInformation.tableLabels
                                        .optional
                                    }{' '}
                                    {items.review.optional}
                                  </p>
                                )}
                              </>
                            );
                          }
                          // individual/organization 타입
                          if ('individual' in items || 'organization' in items) {
                            return (
                              <>
                                {items.individual && (
                                  <>
                                    <p className='text-sm leading-5 font-semibold text-neutral-500'>
                                      {items.individual.label}
                                    </p>
                                    <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                      {
                                        dict.privacyPolicy.collectionOfPersonalInformation
                                          .tableLabels.required
                                      }{' '}
                                      {items.individual.required}
                                    </p>
                                  </>
                                )}
                                {items.organization && (
                                  <>
                                    <p className='text-sm leading-5 font-semibold text-neutral-500'>
                                      {items.organization.label}
                                    </p>
                                    <p className='pl-4 text-sm leading-5 font-normal text-neutral-500'>
                                      {
                                        dict.privacyPolicy.collectionOfPersonalInformation
                                          .tableLabels.required
                                      }{' '}
                                      {items.organization.required}
                                    </p>
                                  </>
                                )}
                              </>
                            );
                          }
                          return null;
                        })()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ArticleSection>

        {/* 개인정보 수집 방법 */}
        <div className='flex flex-col gap-6'>
          <h3 className='text-lg font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.collectionMethods.title}
          </h3>
          <div className='flex flex-col gap-2'>
            <p className='text-base leading-6 font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.collectionMethods.content}
            </p>
            <ul className='flex list-disc flex-col gap-2 pl-4'>
              {dict.privacyPolicy.collectionOfPersonalInformation.collectionMethods.items.map(
                (item, index) => (
                  <li key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* 자동 수집 및 생성 정보 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-lg font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.autoCollection.title}
          </h3>
          <div className='flex flex-col gap-2'>
            <p className='text-base leading-6 font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.autoCollection.content}
            </p>
            <ul className='flex list-disc flex-col gap-2 pl-4'>
              {dict.privacyPolicy.collectionOfPersonalInformation.autoCollection.items.map(
                (item, index) => (
                  <li key={index} className='text-base leading-6 font-normal text-neutral-700'>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* 2. 개인정보의 이용 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.useOfPersonalInformation.title}
          </h3>
          <div className='flex flex-col gap-2'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.useOfPersonalInformation.content}
            </p>
            <ul className='flex list-disc flex-col gap-2 pl-4'>
              {dict.privacyPolicy.collectionOfPersonalInformation.useOfPersonalInformation.items.map(
                (item, index) => (
                  <li key={index} className='text-base font-normal text-neutral-700'>
                    {item}
                  </li>
                ),
              )}
            </ul>
          </div>
        </div>

        {/* 3. 개인정보의 제공 및 위탁 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment.title}
          </h3>
          <div className='flex flex-col gap-6'>
            {/* 개인정보 제3자 제공 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                    .thirdPartyProvision.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                    .thirdPartyProvision.content
                }
              </p>
            </div>

            {/* 개인정보 처리 위탁 */}
            <div className='flex flex-col gap-4'>
              <div className='flex flex-col gap-2'>
                <h4 className='text-lg font-semibold text-neutral-700'>
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                      .processingConsignment.title
                  }
                </h4>
                <p className='text-base font-normal text-neutral-700'>
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                      .processingConsignment.content
                  }
                </p>
              </div>

              {/* 개인정보 처리 위탁 현황(한국) */}
              <div className='flex flex-col gap-2'>
                <h5 className='text-lg font-semibold text-neutral-700'>
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                      .processingConsignment.koreaStatus.title
                  }
                </h5>
                <div className='flex flex-col border-t border-neutral-400'>
                  {/* 테이블 헤더 */}
                  <div className='flex border-b border-neutral-200 bg-neutral-100'>
                    <div className='flex w-[122px] shrink-0 items-center px-3 py-4'>
                      <p className='text-sm leading-5 font-semibold text-neutral-700'>
                        {
                          dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                            .processingConsignment.koreaStatus.table.headers.consignee
                        }
                      </p>
                    </div>
                    <div className='flex w-0 shrink-0 items-center justify-center'>
                      <div className='h-full w-px bg-neutral-200' />
                    </div>
                    <div className='flex flex-1 items-center px-3 py-4'>
                      <p className='text-sm leading-5 font-semibold text-neutral-700'>
                        {
                          dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                            .processingConsignment.koreaStatus.table.headers.workDetails
                        }
                      </p>
                    </div>
                  </div>

                  {/* 테이블 본문 */}
                  {dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment.processingConsignment.koreaStatus.table.rows.map(
                    (row, index) => (
                      <div key={index} className='flex border-b border-neutral-200'>
                        <div className='flex w-[122px] shrink-0 items-center px-3 py-4'>
                          <p className='text-sm leading-5 font-normal text-neutral-500'>
                            {row.consignee}
                          </p>
                        </div>
                        <div className='flex w-0 shrink-0 items-center justify-center'>
                          <div className='h-full w-px bg-neutral-200' />
                        </div>
                        <div className='flex flex-1 items-center px-3 py-4'>
                          <p className='text-sm leading-5 font-normal text-neutral-500'>
                            {row.workDetails}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 개인정보 처리 위탁 현황(한국 외 국가) */}
              <div className='flex flex-col gap-2'>
                <h5 className='text-lg font-semibold text-neutral-700'>
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment
                      .processingConsignment.overseasStatus.title
                  }
                </h5>
                <div className='flex flex-col border-t border-neutral-400'>
                  {dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment.processingConsignment.overseasStatus.table.rows.map(
                    (row, index) => (
                      <div key={index} className='flex border-b border-neutral-200'>
                        <div className='flex w-[106px] shrink-0 items-center border-b border-neutral-200 bg-neutral-100 px-3 py-4'>
                          <p className='text-sm leading-5 font-semibold text-neutral-700'>
                            {row.label}
                          </p>
                        </div>
                        <div className='flex w-0 shrink-0 items-center justify-center'>
                          <div className='h-full w-px bg-neutral-200' />
                        </div>
                        <div className='flex flex-1 items-center px-3 py-4'>
                          <p className='text-sm leading-5 font-normal text-neutral-500'>
                            {row.value}
                          </p>
                        </div>
                      </div>
                    ),
                  )}
                </div>
              </div>

              {/* 국외 이전 관련 안내 */}
              <div className='flex flex-col gap-2'>
                <ul className='flex list-disc flex-col gap-2 pl-4'>
                  {dict.privacyPolicy.collectionOfPersonalInformation.provisionAndConsignment.processingConsignment.overseasNotice.items.map(
                    (item, index) => (
                      <li key={index} className='text-base font-normal text-neutral-700'>
                        {item}
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
