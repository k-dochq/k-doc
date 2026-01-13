import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { getCompanyName, getCeoName } from 'shared/lib/company-info';
import { ArticleSection } from '../terms-of-service/ui/ArticleSection';

interface PrivacyPolicyContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function PrivacyPolicyContentV2({ lang, dict }: PrivacyPolicyContentV2Props) {
  const companyName = getCompanyName(lang);
  const ceoName = getCeoName(lang);
  return (
    <div className='px-5 pt-8 pb-20'>
      <h1 className='mb-8 text-3xl font-semibold text-neutral-700'>{dict.footer.privacyPolicy}</h1>

      <div className='flex flex-col gap-10'>
        <div className='rounded-lg bg-neutral-100 p-5'>
          <p className='text-base leading-6 font-normal text-neutral-700'>
            {(() => {
              // dict에서 intro 텍스트를 가져오되, 회사명만 언어에 따라 하드코딩으로 교체
              let introText = dict.privacyPolicy.intro;
              if (lang === 'ko') {
                // 한국어일 때는 한국어 회사명으로 교체
                introText = introText
                  .replace(/FILLMAN co?\.?,? Ltd\.?/gi, companyName)
                  .replace(/FILLMAN Inc\.?/gi, companyName)
                  .replace(/FILLMAN/gi, '필만');
              } else {
                // 한국어 외 모든 언어는 영어 회사명으로 교체
                // 한국어 패턴
                introText = introText
                  .replace(/주식회사 필만/gi, companyName)
                  .replace(/필만/gi, 'FILLMAN');
                // 중국어 패턴
                introText = introText
                  .replace(/必滿股份有限公司/gi, companyName)
                  .replace(/必滿/gi, 'FILLMAN');
                // 일본어 패턴
                introText = introText
                  .replace(/株式会社ピルマン/gi, companyName)
                  .replace(/ピルマン/gi, 'FILLMAN');
                // 이미 영어로 되어 있을 수도 있으므로 영어 패턴도 정규화
                introText = introText
                  .replace(/FILLMAN co?\.?,? Ltd\.?/gi, companyName)
                  .replace(/FILLMAN Inc\.?/gi, companyName)
                  .replace(/FILLMAN/gi, 'FILLMAN');
              }
              return introText;
            })()}
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
                        <div className='flex w-[106px] shrink-0 items-center bg-neutral-100 px-3 py-4'>
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

        {/* 4. 개인정보의 파기 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.destruction.title}
          </h3>
          <div className='flex flex-col gap-4'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.destruction.content}
            </p>

            {/* 파기 방법 */}
            <ul className='flex list-disc flex-col gap-2 pl-4'>
              <li className='text-base font-normal text-neutral-700'>
                {dict.privacyPolicy.collectionOfPersonalInformation.destruction.method.content}
              </li>
            </ul>

            {/* 내부 방침에 따라 일정기간 보관 후 파기하는 정보 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.destruction.internalPolicy
                    .title
                }
              </h4>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.destruction.internalPolicy.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 관계법령에 따른 개인정보 보관 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {dict.privacyPolicy.collectionOfPersonalInformation.destruction.legalBasis.title}
              </h4>
              <div className='flex flex-col border-t border-neutral-400'>
                {/* 테이블 헤더 */}
                <div className='flex border-b border-neutral-200 bg-neutral-100'>
                  <div className='flex w-[140px] shrink-0 items-center px-3 py-4'>
                    <p className='text-sm leading-5 font-semibold text-neutral-700'>
                      {
                        dict.privacyPolicy.collectionOfPersonalInformation.destruction.legalBasis
                          .table.headers.retentionItem
                      }
                    </p>
                  </div>
                  <div className='flex w-0 shrink-0 items-center justify-center'>
                    <div className='h-full w-px bg-neutral-200' />
                  </div>
                  <div className='flex flex-1 items-center px-3 py-4'>
                    <p className='text-sm leading-5 font-semibold text-neutral-700'>
                      {
                        dict.privacyPolicy.collectionOfPersonalInformation.destruction.legalBasis
                          .table.headers.legalBasis
                      }
                    </p>
                  </div>
                  <div className='flex w-0 shrink-0 items-center justify-center'>
                    <div className='h-full w-px bg-neutral-200' />
                  </div>
                  <div className='flex w-[70px] shrink-0 items-center px-3 py-4'>
                    <p className='text-sm leading-5 font-semibold text-neutral-700'>
                      {
                        dict.privacyPolicy.collectionOfPersonalInformation.destruction.legalBasis
                          .table.headers.retentionPeriod
                      }
                    </p>
                  </div>
                </div>

                {/* 테이블 본문 */}
                {dict.privacyPolicy.collectionOfPersonalInformation.destruction.legalBasis.table.rows.map(
                  (row, index) => (
                    <div key={index} className='flex border-b border-neutral-200'>
                      <div className='flex w-[140px] shrink-0 items-center px-3 py-4'>
                        <p className='text-sm leading-5 font-normal text-neutral-500'>
                          {row.retentionItem}
                        </p>
                      </div>
                      <div className='flex w-0 shrink-0 items-center justify-center'>
                        <div className='h-full w-px bg-neutral-200' />
                      </div>
                      <div className='flex flex-1 items-center px-3 py-4'>
                        <p className='text-sm leading-5 font-normal text-neutral-500'>
                          {row.legalBasis}
                        </p>
                      </div>
                      <div className='flex w-0 shrink-0 items-center justify-center'>
                        <div className='h-full w-px bg-neutral-200' />
                      </div>
                      <div className='flex w-[70px] shrink-0 items-center px-3 py-4'>
                        <p className='text-sm leading-5 font-normal text-neutral-500'>
                          {row.retentionPeriod}
                        </p>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>

        {/* 5. 이용자 및 법적대리인의 권리 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.userRights.title}
          </h3>
          <div className='flex flex-col gap-4'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.userRights.content}
            </p>
            <ol className='flex list-decimal flex-col gap-2 pl-6'>
              {dict.privacyPolicy.collectionOfPersonalInformation.userRights.items.map(
                (item, index) => (
                  <li key={index} className='text-base font-normal text-neutral-700'>
                    {item}
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        {/* 6. 개인정보 자동 수집 장치에 관한 사항 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice.title}
          </h3>
          <div className='flex flex-col gap-6'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice.content}
            </p>

            {/* 쿠키란 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .cookieDefinition.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .cookieDefinition.content
                }
              </p>
            </div>

            {/* 사용목적 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .usagePurpose.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .usagePurpose.content
                }
              </p>
            </div>

            {/* 쿠키 수집 거부 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .cookieRejection.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.autoCollectionDevice
                    .cookieRejection.content
                }
              </p>
            </div>
          </div>
        </div>

        {/* 7. 행태정보 수집 이용 및 거부 등에 관한 사항 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.behavioralInformation.title}
          </h3>
          <div className='flex flex-col gap-4'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.behavioralInformation.content}
            </p>

            {/* 테이블 */}
            <div className='flex flex-col border-t border-neutral-400'>
              {/* 테이블 헤더 */}
              <div className='flex border-b border-neutral-200 bg-neutral-100'>
                <div className='flex w-[140px] shrink-0 items-center px-3 py-4'>
                  <p className='text-sm leading-5 font-semibold text-neutral-700'>
                    {
                      dict.privacyPolicy.collectionOfPersonalInformation.behavioralInformation.table
                        .headers.category
                    }
                  </p>
                </div>
                <div className='flex w-0 shrink-0 items-center justify-center'>
                  <div className='h-full w-px bg-neutral-200' />
                </div>
                <div className='flex flex-1 items-center px-3 py-4'>
                  <p className='text-sm leading-5 font-semibold text-neutral-700'>
                    {
                      dict.privacyPolicy.collectionOfPersonalInformation.behavioralInformation.table
                        .headers.content
                    }
                  </p>
                </div>
              </div>

              {/* 테이블 본문 */}
              {dict.privacyPolicy.collectionOfPersonalInformation.behavioralInformation.table.rows.map(
                (row, index) => (
                  <div key={index} className='flex border-b border-neutral-200'>
                    <div className='flex w-[140px] shrink-0 items-center px-3 py-4'>
                      <p className='text-sm leading-5 font-normal text-neutral-500'>
                        {row.category}
                      </p>
                    </div>
                    <div className='flex w-0 shrink-0 items-center justify-center'>
                      <div className='h-full w-px bg-neutral-200' />
                    </div>
                    <div className='flex flex-1 items-center px-3 py-4'>
                      {Array.isArray(row.content) ? (
                        <div className='flex flex-col gap-1'>
                          {row.content.map((item, itemIndex) => (
                            <p
                              key={itemIndex}
                              className='text-sm leading-5 font-normal text-neutral-500'
                            >
                              {item}
                            </p>
                          ))}
                        </div>
                      ) : (
                        <p className='text-sm leading-5 font-normal text-neutral-500'>
                          {row.content}
                        </p>
                      )}
                    </div>
                  </div>
                ),
              )}
            </div>
          </div>
        </div>

        {/* 8. 개인정보의 안전성 확보 조치에 관한 사항 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.title}
          </h3>
          <div className='flex flex-col gap-6'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.content}
            </p>

            {/* 개인정보 암호화 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.encryption
                    .title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.encryption
                    .content
                }
              </p>
            </div>

            {/* 해킹 등에 대비한 대책 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures
                    .hackingPrevention.title
                }
              </h4>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.hackingPrevention.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 개인정보 처리 직원의 최소화 및 교육 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures
                    .staffMinimization.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures
                    .staffMinimization.content
                }
              </p>
            </div>

            {/* 개인정보 보호전담 인력의 운영 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures
                    .dedicatedPersonnel.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures
                    .dedicatedPersonnel.content
                }
              </p>
            </div>

            {/* 이용자 안내 */}
            <p className='text-base font-normal text-neutral-700'>
              {
                dict.privacyPolicy.collectionOfPersonalInformation.securityMeasures.userNotice
                  .content
              }
            </p>
          </div>
        </div>

        {/* 9. 개인 위치정보의 처리 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.title}
          </h3>
          <div className='flex flex-col gap-6'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.content}
            </p>

            {/* 개인위치정보 이용 목적 */}
            <div className='flex flex-col gap-2'>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                    .usagePurpose.content
                }
              </p>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.usagePurpose.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 위치정보 이용·제공사실 확인자료 보관 */}
            <p className='text-base font-normal text-neutral-700'>
              {
                dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                  .recordRetention.content
              }
            </p>

            {/* 개인위치정보 파기 방법 */}
            <div className='flex flex-col gap-2'>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                    .destructionMethod.content
                }
              </p>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.destructionMethod.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 개인위치정보 제3자 제공 시 통지 */}
            <div className='flex flex-col gap-2'>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                    .thirdPartyNotification.content
                }
              </p>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.thirdPartyNotification.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
            </div>

            {/* 8세 이하 아동 등의 보호의무자의 권리·의무 및 그 행사방법 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                    .guardianRights.title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation
                    .guardianRights.content
                }
              </p>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.guardianRights.items.map(
                  (item, index) => (
                    <li key={index} className='text-base font-normal text-neutral-700'>
                      {item}
                    </li>
                  ),
                )}
              </ul>
              {dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.guardianRights.additionalContent.map(
                (item, index) => (
                  <p key={index} className='text-base font-normal text-neutral-700'>
                    {item}
                  </p>
                ),
              )}
            </div>

            {/* 위치정보 관리책임자 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.manager
                    .title
                }
              </h4>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.manager
                    .content
                }
              </p>
              <div className='flex flex-col gap-1 pl-4'>
                <p className='text-base font-normal text-neutral-700'>• {ceoName}</p>
                <p className='text-base font-normal text-neutral-700'>
                  •{' '}
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.manager
                      .position
                  }
                </p>
                <p className='text-base font-normal text-neutral-700'>
                  •{' '}
                  {
                    dict.privacyPolicy.collectionOfPersonalInformation.locationInformation.manager
                      .contact
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 10. 개인정보 보호책임자 및 담당부서 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer.title}
          </h3>
          <div className='flex flex-col gap-6'>
            <p className='text-base font-normal text-neutral-700'>
              {dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer.content}
            </p>

            {/* 개인정보 관리담당자 */}
            <div className='flex flex-col gap-2'>
              <h4 className='text-lg font-semibold text-neutral-700'>
                {dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer.officer.title}
              </h4>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer.officer.items.map(
                  (item, index) => {
                    // dict에서 텍스트를 가져오되, 회사명과 대표이사 이름만 언어에 따라 하드코딩으로 교체
                    let processedItem = item;
                    if (lang === 'ko') {
                      // 한국어일 때는 한국어 회사명과 대표이사 이름으로 교체
                      processedItem = item
                        .replace(/FILLMAN co?\.?,? Ltd\.?/gi, companyName)
                        .replace(/FILLMAN Inc\.?/gi, companyName)
                        .replace(/FILLMAN/gi, '필만')
                        .replace(/Woo Jung Ho/gi, ceoName);
                    } else {
                      // 한국어 외 모든 언어는 영어 회사명과 대표이사 이름으로 교체
                      // 한국어 패턴
                      processedItem = item
                        .replace(/주식회사 필만/gi, companyName)
                        .replace(/필만/gi, 'FILLMAN')
                        .replace(/우정호/gi, ceoName);
                      // 중국어 패턴
                      processedItem = processedItem
                        .replace(/必滿股份有限公司/gi, companyName)
                        .replace(/必滿/gi, 'FILLMAN');
                      // 일본어 패턴
                      processedItem = processedItem
                        .replace(/株式会社ピルマン/gi, companyName)
                        .replace(/ピルマン/gi, 'FILLMAN')
                        .replace(/ウ・ジョンホ/gi, ceoName);
                      // 이미 영어로 되어 있을 수도 있으므로 영어 패턴도 정규화
                      processedItem = processedItem
                        .replace(/FILLMAN co?\.?,? Ltd\.?/gi, companyName)
                        .replace(/FILLMAN Inc\.?/gi, companyName)
                        .replace(/FILLMAN/gi, 'FILLMAN')
                        .replace(/Woo Jung Ho/gi, ceoName);
                    }
                    return (
                      <li key={index} className='text-base font-normal text-neutral-700'>
                        {processedItem}
                      </li>
                    );
                  },
                )}
              </ul>
            </div>

            {/* 기타 개인정보침해 신고/상담 기관 */}
            <div className='flex flex-col gap-2'>
              <p className='text-base font-normal text-neutral-700'>
                {
                  dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer
                    .otherOrganizations.title
                }
              </p>
              <ul className='flex list-disc flex-col gap-2 pl-4'>
                {dict.privacyPolicy.collectionOfPersonalInformation.privacyOfficer.otherOrganizations.items.map(
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

        {/* 11. 개정 전 고지의무 등 안내 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.revisionNotice.title}
          </h3>
          <div className='flex flex-col gap-4'>
            <ol className='flex list-decimal flex-col gap-2 pl-6'>
              {dict.privacyPolicy.collectionOfPersonalInformation.revisionNotice.items.map(
                (item, index) => (
                  <li key={index} className='text-base font-normal text-neutral-700'>
                    {item}
                  </li>
                ),
              )}
            </ol>
          </div>
        </div>

        {/* 12. 개정이력 */}
        <div className='flex flex-col gap-2'>
          <h3 className='text-2xl font-semibold text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.revisionHistory.title}
          </h3>
          <p className='text-base font-normal text-neutral-700'>
            {dict.privacyPolicy.collectionOfPersonalInformation.revisionHistory.content}
          </p>
        </div>
      </div>
    </div>
  );
}
