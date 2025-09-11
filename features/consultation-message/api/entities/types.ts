import { type Prisma, SenderType } from '@prisma/client';

// 도메인 엔티티 타입 정의 (Prisma 기반)
export type ConsultationMessage = Prisma.ConsultationMessageGetPayload<{
  include: {
    User: {
      select: {
        id: true;
        displayName: true;
        name: true;
      };
    };
    Hospital: {
      select: {
        id: true;
        name: true;
      };
    };
  };
}>;

export type ConsultationMessageWithUser = Prisma.ConsultationMessageGetPayload<{
  include: {
    User: {
      select: {
        id: true;
        displayName: true;
        name: true;
      };
    };
  };
}>;

// 요청/응답 타입 (Prisma 타입 활용)
export interface GetConsultationMessagesRequest {
  hospitalId: string;
  userId: string;
}

export interface GetConsultationMessagesResponse {
  success: true;
  messages: ConsultationMessageWithUser[];
}

export interface CreateConsultationMessageRequest {
  hospitalId: string;
  content: string;
  senderType: SenderType; // Prisma enum 타입 사용
}

export interface CreateConsultationMessageResponse {
  success: true;
  message: ConsultationMessageWithUser;
}

export interface CreateWelcomeMessageRequest {
  hospitalId: string;
}

export interface CreateWelcomeMessageResponse {
  success: true;
  data: ConsultationMessageWithUser;
  message?: string;
}

// 에러 응답 타입
export interface ApiErrorResponse {
  success: false;
  error: string;
  requestId?: string;
}

// 유니온 타입
export type ConsultationMessageApiResponse =
  | GetConsultationMessagesResponse
  | CreateConsultationMessageResponse
  | CreateWelcomeMessageResponse
  | ApiErrorResponse;
