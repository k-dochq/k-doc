import { headers } from 'next/headers';
import { type HospitalCardData } from 'shared/model/types';

/**
 * 서버 컴포넌트에서 Best Hospitals 데이터를 prefetch하는 함수
 * Next.js Data Cache를 활용하여 15분간 캐싱됩니다.
 * App Router에서만 사용 가능합니다.
 */
export async function fetchBestHospitalsServer(): Promise<HospitalCardData[]> {
  try {
    // 현재 요청의 호스트 정보를 동적으로 가져오기
    const headersList = await headers();
    const host = headersList.get('host') || 'localhost:3000';
    const protocol = headersList.get('x-forwarded-proto') || 'http';
    const baseUrl = `${protocol}://${host}`;

    const response = await fetch(`${baseUrl}/api/hospitals/best?category=ALL&limit=5`, {
      next: {
        revalidate: 900, // 15분 캐싱
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch best hospitals');
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error('Server prefetch failed:', error);
    return []; // 실패 시 빈 배열 반환
  }
}
