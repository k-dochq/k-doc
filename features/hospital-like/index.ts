// 클라이언트 사이드 exports만 포함
export * from './model/useHospitalLike';
export * from './ui/HospitalLikeButton';

// API 계층은 서버 전용이므로 별도 export 파일 사용
// ./api/index.ts에서 직접 import 필요
