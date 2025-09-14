'use client';

import { useEffect, useState } from 'react';

interface UseHospitalAddressProps {
  latitude: number;
  longitude: number;
}

interface UseHospitalAddressReturn {
  address: string;
  isLoading: boolean;
  error: string | null;
}

/**
 * 위도/경도를 통해 병원 주소를 조회하는 커스텀 훅
 */
export function useHospitalAddress({
  latitude,
  longitude,
}: UseHospitalAddressProps): UseHospitalAddressReturn {
  const [address, setAddress] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!latitude || !longitude) return;

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://dapi.kakao.com/v2/local/geo/coord2address.json?x=${longitude}&y=${latitude}`,
          {
            headers: {
              Authorization: 'KakaoAK 9cf5b056daae8c60a4d598770ea9aa22',
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.documents && data.documents.length > 0) {
          const addressData = data.documents[0];
          // 도로명 주소가 있으면 도로명 주소를, 없으면 지번 주소를 사용
          const roadAddress = addressData.road_address?.address_name;
          const jibunAddress = addressData.address?.address_name;
          setAddress(roadAddress || jibunAddress || '주소 정보를 찾을 수 없습니다.');
        } else {
          setAddress('주소 정보를 찾을 수 없습니다.');
        }
      } catch (error) {
        console.error('주소 정보를 가져오는 데 실패했습니다:', error);
        const errorMessage =
          error instanceof Error ? error.message : '주소 정보를 가져오는 데 실패했습니다.';
        setError(errorMessage);
        setAddress('주소 정보를 가져오는 데 실패했습니다.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddress();
  }, [latitude, longitude]);

  return {
    address,
    isLoading,
    error,
  };
}
