'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

interface NoticesContentV2Props {
  lang: Locale;
  dict: Dictionary;
}

export function NoticesContentV2({ lang: _lang, dict: _dict }: NoticesContentV2Props) {
  return <div>{/* 컨텐츠 영역은 추후 추가 예정 */}</div>;
}
