// API 서버 모듈 - 서버 사이드에서만 사용

// Entities
export type * from './api/entities/types';
export * from './api/entities/schemas';

// Infrastructure
export { AuthService } from 'shared/lib/auth/server';
export type { IAuthService } from 'shared/lib/auth/server';
export { LikedHospitalsRepository } from './api/infrastructure/repositories/liked-hospitals-repository';
export type { ILikedHospitalsRepository } from './api/infrastructure/repositories/liked-hospitals-repository';

// Use Cases
export { GetLikedHospitalsUseCase } from './api/use-cases/get-liked-hospitals';
export type { IGetLikedHospitalsUseCase } from './api/use-cases/get-liked-hospitals';
export { GetLikedReviewsUseCase } from './api-server/use-cases/get-liked-reviews';
export { LikedReviewsRepository } from './api-server/repositories/liked-reviews-repository';
export type * from './api/use-cases/types';
