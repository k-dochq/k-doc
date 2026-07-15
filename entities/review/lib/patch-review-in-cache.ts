import type { QueryClient } from '@tanstack/react-query';
import { type ReviewCardData } from '../model/types';

interface ReviewListPageLike {
  reviews: ReviewCardData[];
  [key: string]: unknown;
}

interface ReviewInfinitePageLike {
  pages: ReviewListPageLike[];
  [key: string]: unknown;
}

function patchReviewsArray(
  reviews: ReviewCardData[],
  reviewId: string,
  patch: (review: ReviewCardData) => ReviewCardData,
): ReviewCardData[] {
  let changed = false;
  const next = reviews.map((review) => {
    if (review.id !== reviewId) return review;
    changed = true;
    return patch(review);
  });
  return changed ? next : reviews;
}

/**
 * 캐시에 이미 올라와 있는 리뷰 목록/상세 데이터에서 해당 reviewId의
 * ReviewCardData를 찾는다 (여러 목록 캐시 중 어디든 먼저 발견되는 것을 반환).
 */
export function findReviewInCache(
  queryClient: QueryClient,
  reviewId: string,
): ReviewCardData | undefined {
  const queries = queryClient.getQueriesData<unknown>({
    predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'reviews',
  });

  for (const [, data] of queries) {
    if (!data || typeof data !== 'object') continue;

    if (Array.isArray((data as ReviewInfinitePageLike).pages)) {
      for (const page of (data as ReviewInfinitePageLike).pages) {
        const found = page?.reviews?.find((review) => review.id === reviewId);
        if (found) return found;
      }
      continue;
    }

    if (Array.isArray((data as ReviewListPageLike).reviews)) {
      const found = (data as ReviewListPageLike).reviews.find((review) => review.id === reviewId);
      if (found) return found;
      continue;
    }

    if ('id' in data && (data as ReviewCardData).id === reviewId) {
      return data as ReviewCardData;
    }
  }

  return undefined;
}

function isLikedOnlyQueryKey(queryKey: readonly unknown[]): boolean {
  const filters = queryKey[queryKey.length - 1];
  return Boolean(
    filters && typeof filters === 'object' && (filters as { likedOnly?: boolean }).likedOnly,
  );
}

/**
 * 찜(좋아요)한 리뷰만 모아 보여주는 목록(likedOnly 필터가 걸린 캐시)에서
 * 좋아요를 취소한 리뷰를 목록에서 즉시 제거한다.
 * (다른 일반 목록에서는 좋아요를 취소해도 리뷰가 그대로 남아있어야 하므로,
 * likedOnly 캐시에만 한정해서 동작한다.)
 */
export function removeReviewFromLikedOnlyLists(queryClient: QueryClient, reviewId: string): void {
  queryClient.setQueriesData<unknown>(
    {
      predicate: (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey[0] === 'reviews' &&
        isLikedOnlyQueryKey(query.queryKey),
    },
    (oldData: unknown) => {
      if (!oldData || typeof oldData !== 'object') return oldData;

      if (Array.isArray((oldData as ReviewInfinitePageLike).pages)) {
        const data = oldData as ReviewInfinitePageLike;
        return {
          ...data,
          pages: data.pages.map((page) =>
            Array.isArray(page?.reviews)
              ? { ...page, reviews: page.reviews.filter((review) => review.id !== reviewId) }
              : page,
          ),
        };
      }

      if (Array.isArray((oldData as ReviewListPageLike).reviews)) {
        const data = oldData as ReviewListPageLike;
        return { ...data, reviews: data.reviews.filter((review) => review.id !== reviewId) };
      }

      return oldData;
    },
  );
}

function upsertReviewAtFront(reviews: ReviewCardData[], review: ReviewCardData): ReviewCardData[] {
  const withoutExisting = reviews.filter((r) => r.id !== review.id);
  return [review, ...withoutExisting];
}

/**
 * 찜(좋아요)한 리뷰만 모아 보여주는 목록(likedOnly 필터가 걸린 캐시)에
 * 새로 찜한 리뷰를 "최근에 찜한 순" 맨 앞에 즉시 추가한다.
 * (다른 페이지에서 좋아요를 눌러도, 찜 탭에 진입했을 때 새로고침 없이
 * 바로 반영되도록 하기 위함)
 */
export function addReviewToLikedOnlyLists(queryClient: QueryClient, review: ReviewCardData): void {
  queryClient.setQueriesData<unknown>(
    {
      predicate: (query) =>
        Array.isArray(query.queryKey) &&
        query.queryKey[0] === 'reviews' &&
        isLikedOnlyQueryKey(query.queryKey),
    },
    (oldData: unknown) => {
      if (!oldData || typeof oldData !== 'object') return oldData;

      // 무한 스크롤 목록 캐시: 새 리뷰는 항상 첫 페이지 맨 앞에 추가하고,
      // 뒤쪽 페이지에 같은 리뷰가 남아있다면 중복이 생기지 않도록 제거한다.
      if (Array.isArray((oldData as ReviewInfinitePageLike).pages)) {
        const data = oldData as ReviewInfinitePageLike;
        if (data.pages.length === 0) return data;

        return {
          ...data,
          pages: data.pages.map((page, index) => {
            if (!Array.isArray(page?.reviews)) return page;
            if (index === 0) {
              return { ...page, reviews: upsertReviewAtFront(page.reviews, review) };
            }
            return { ...page, reviews: page.reviews.filter((r) => r.id !== review.id) };
          }),
        };
      }

      // 단일 목록 응답 캐시: { reviews: [...] }
      if (Array.isArray((oldData as ReviewListPageLike).reviews)) {
        const data = oldData as ReviewListPageLike;
        return { ...data, reviews: upsertReviewAtFront(data.reviews, review) };
      }

      return oldData;
    },
  );
}

/**
 * 좋아요/추천 토글 시 리뷰 목록 전체를 invalidate/refetch하지 않고,
 * 캐시에 이미 올라와 있는 리뷰 목록·상세 데이터에서 해당 리뷰만 직접 갱신한다.
 *
 * 전체 목록을 invalidate하면 (특히 추천순 랜덤 정렬 조합에서) 목록 전체가
 * 다시 fetch되며 화면이 리로드되는 것처럼 보이는 문제가 있어, 이를 방지하기 위해
 * 리뷰 리스트/무한스크롤/상세 캐시를 직접 patch하는 방식을 사용한다.
 */
export function patchReviewInCache(
  queryClient: QueryClient,
  reviewId: string,
  patch: (review: ReviewCardData) => ReviewCardData,
): void {
  queryClient.setQueriesData<unknown>(
    { predicate: (query) => Array.isArray(query.queryKey) && query.queryKey[0] === 'reviews' },
    (oldData: unknown) => {
      if (!oldData || typeof oldData !== 'object') return oldData;

      // 무한 스크롤 목록 캐시: { pages: [{ reviews: [...] }], pageParams }
      if (Array.isArray((oldData as ReviewInfinitePageLike).pages)) {
        const data = oldData as ReviewInfinitePageLike;
        return {
          ...data,
          pages: data.pages.map((page) =>
            Array.isArray(page?.reviews)
              ? { ...page, reviews: patchReviewsArray(page.reviews, reviewId, patch) }
              : page,
          ),
        };
      }

      // 단일 목록 응답 캐시: { reviews: [...] }
      if (Array.isArray((oldData as ReviewListPageLike).reviews)) {
        const data = oldData as ReviewListPageLike;
        return { ...data, reviews: patchReviewsArray(data.reviews, reviewId, patch) };
      }

      // 리뷰 상세 캐시: ReviewCardData 그 자체
      if ('id' in oldData && (oldData as ReviewCardData).id === reviewId) {
        return patch(oldData as ReviewCardData);
      }

      return oldData;
    },
  );
}

/**
 * likedUserIds/likeCount를 낙관적으로(optimistic) 토글한다.
 */
export function toggleLikedState(
  review: ReviewCardData,
  userId: string,
  isLiked: boolean,
): ReviewCardData {
  const alreadyLiked = review.likedUserIds.includes(userId);

  if (isLiked === alreadyLiked) {
    return review;
  }

  return {
    ...review,
    isLiked,
    likedUserIds: isLiked
      ? [...review.likedUserIds, userId]
      : review.likedUserIds.filter((id) => id !== userId),
    likeCount: Math.max(0, review.likeCount + (isLiked ? 1 : -1)),
  };
}

/**
 * recommendedUserIds/recommendCount를 낙관적으로(optimistic) 토글한다.
 */
export function toggleRecommendedState(
  review: ReviewCardData,
  userId: string,
  isRecommended: boolean,
): ReviewCardData {
  const alreadyRecommended = review.recommendedUserIds.includes(userId);

  if (isRecommended === alreadyRecommended) {
    return review;
  }

  return {
    ...review,
    recommendedUserIds: isRecommended
      ? [...review.recommendedUserIds, userId]
      : review.recommendedUserIds.filter((id) => id !== userId),
    recommendCount: Math.max(0, review.recommendCount + (isRecommended ? 1 : -1)),
  };
}
