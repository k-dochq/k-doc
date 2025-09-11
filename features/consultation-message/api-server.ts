// 서버 전용 익스포트 (Route Handler에서 사용)
export { ConsultationMessageRepository } from './api/infrastructure/repositories/consultation-message-repository';
export { AuthService } from 'shared/lib/auth/server';
export { GetConsultationMessagesUseCase } from './api/use-cases/get-consultation-messages';
export { CreateConsultationMessageUseCase } from './api/use-cases/create-consultation-message';
export { CreateWelcomeMessageUseCase } from './api/use-cases/create-welcome-message';

// 타입 익스포트
export type {
  GetConsultationMessagesInput,
  CreateConsultationMessageInput,
  CreateWelcomeMessageInput,
} from './api/entities/schemas';

export type {
  GetConsultationMessagesResponse,
  CreateConsultationMessageResponse,
  CreateWelcomeMessageResponse,
  ApiErrorResponse,
} from './api/entities/types';
