'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import {
  ContactTitleSectionV2,
  ContactOfficeMapV2,
  ContactOfficeInfoV2,
  ContactGradientTextV2,
  ContactButtonSectionV2,
} from 'features/contact/ui';

interface ContactContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function ContactContentV2({ lang, dict }: ContactContentV2Props) {
  // 하남 본사 정확한 좌표
  const hanamLatitude = 37.5609;
  const hanamLongitude = 127.1928;

  // 서울지사 정확한 좌표
  const seoulLatitude = 37.526145;
  const seoulLongitude = 127.038836;

  const hanamTitle = dict.contact?.subtitle || 'K-DOC 하남 본사';
  const hanamAddress = dict.contact?.address || '경기도 하남시 미사강변남로 103, 701-014호';

  const seoulTitle = dict.contact?.seoulOffice?.subtitle || 'K-DOC 서울 지사';
  const seoulAddress =
    dict.contact?.seoulOffice?.address || '서울 강남구 선릉로157길 14 한주빌딩 6층';

  return (
    <div>
      {/* ContactUs 섹션 */}
      <ContactTitleSectionV2 dict={dict} />

      {/* 하남본사 지도 영역 */}
      <ContactOfficeMapV2
        latitude={hanamLatitude}
        longitude={hanamLongitude}
        address={hanamAddress}
        dict={dict}
      />

      {/* 하남본사 정보 섹션 */}
      <ContactOfficeInfoV2 title={hanamTitle} address={hanamAddress} dict={dict} />

      {/* 서울지사 지도 영역 */}
      <div className='mt-8'>
        <ContactOfficeMapV2
          latitude={seoulLatitude}
          longitude={seoulLongitude}
          address={seoulAddress}
          dict={dict}
        />
      </div>

      {/* 서울지사 정보 섹션 */}
      <ContactOfficeInfoV2 title={seoulTitle} address={seoulAddress} dict={dict} />

      {/* 그라데이션 텍스트 섹션 */}
      <ContactGradientTextV2 dict={dict} />

      {/* 버튼 영역 */}
      <ContactButtonSectionV2 lang={lang} dict={dict} />

      <div className='h-[80px]' />
    </div>
  );
}
