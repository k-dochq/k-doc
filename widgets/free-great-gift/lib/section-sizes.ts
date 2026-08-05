import 'server-only';

import path from 'node:path';

import { type ImageSize, readImageSize } from 'shared/lib/image-size';
import { type Locale } from 'shared/config';

import { SECTION_IDS } from '../model/sections';
import { getImageLocale } from './image-path';

/**
 * 현재 언어 섹션 이미지들의 실제 크기.
 *
 * 폭은 전 언어 같지만 **높이는 언어마다 다르다** — 번역문 길이가 다르면 시안 높이도 달라지는 것이
 * 자연스럽다고 보고 통일하지 않기로 했다(2026-08-05). 그 값을 코드에 적어두는 대신 파일에서 읽는다.
 * 디자인팀이 이미지를 교체해도 코드를 고칠 일이 없다.
 *
 * 서버에서 한 번 읽고 언어별로 캐시한다. 파일은 배포 중에 바뀌지 않으므로 프로세스 수명 동안 유효하다.
 */
const cache = new Map<Locale, Promise<ImageSize[]>>();

const PUBLIC_DIR = path.join(process.cwd(), 'public', 'images', 'event', 'free_great_gift');

export function getSectionSizes(lang: Locale): Promise<ImageSize[]> {
  const imageLocale = getImageLocale(lang);
  const cached = cache.get(imageLocale);
  if (cached) return cached;

  const loading = Promise.all(
    SECTION_IDS.map((id) => readImageSize(path.join(PUBLIC_DIR, imageLocale, `${id}.webp`))),
  ).catch((error) => {
    // 캐시에 실패를 남기면 이후 요청이 전부 같은 실패를 재사용한다
    cache.delete(imageLocale);
    throw error;
  });

  cache.set(imageLocale, loading);
  return loading;
}
