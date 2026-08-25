import 'server-only';

import { cache } from 'react';
import { prisma } from 'shared/lib/prisma';

/**
 * 활성화된 이벤트 페이지 한 건을 slug 로 찾는다. 어드민에서 비활성화하면 페이지가 내려간다.
 *
 * React cache 로 같은 요청 안에서의 중복 조회(메타데이터 + 본문)를 한 번으로 합친다.
 */
export const getActiveEventPage = cache(async (slug: string) => {
  // slug 형식(소문자·숫자·하이픈)이 아니면 조회 없이 404 로 보낸다
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(slug)) {
    return null;
  }

  return prisma.eventPage.findFirst({
    where: { slug, isActive: true },
    include: {
      images: { orderBy: [{ locale: 'asc' }, { order: 'asc' }] },
    },
  });
});

export type ActiveEventPage = NonNullable<Awaited<ReturnType<typeof getActiveEventPage>>>;
