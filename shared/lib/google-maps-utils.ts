import type { Libraries } from '@react-google-maps/api';

/**
 * Google Maps API 키
 */
export const GOOGLE_MAPS_API_KEY = 'AIzaSyCGfVF5cf_1o_s29v-cx2iRBUYAh57L1Ow';

/**
 * Google Maps 라이브러리 로드 옵션
 */
export const googleMapsLibraries: Libraries = ['places'];

/**
 * Google Maps 지도 기본 옵션
 * 줌 컨트롤만 표시하고 나머지 컨트롤은 숨김
 */
export const defaultMapOptions: google.maps.MapOptions = {
  zoomControl: true,
  streetViewControl: false,
  mapTypeControl: false,
  fullscreenControl: false,
  rotateControl: false,
  scaleControl: false,
  panControl: false,
  gestureHandling: 'cooperative',
};

/**
 * Google Maps 외부 링크 생성
 * @param latitude 위도
 * @param longitude 경도
 * @param placeName 장소 이름 (선택)
 * @returns Google Maps URL
 */
export function getGoogleMapsUrl(latitude: number, longitude: number, placeName?: string): string {
  const baseUrl = 'https://www.google.com/maps';
  const query = placeName
    ? `?q=${encodeURIComponent(placeName)}&ll=${latitude},${longitude}`
    : `?q=${latitude},${longitude}`;
  return `${baseUrl}${query}`;
}
