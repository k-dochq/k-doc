import { z } from 'zod';
import { SenderType } from '@prisma/client';

// Prisma enum을 Zod enum으로 변환하는 헬퍼
const SenderTypeValues = Object.values(SenderType) as [string, ...string[]];

// 상담 메시지 조회 스키마
export const GetConsultationMessagesSchema = z.object({
  hospitalId: z.string().uuid('Invalid hospital ID format'),
  userId: z.string().uuid('Invalid user ID format'),
});

// 상담 메시지 생성 스키마 (Prisma enum 사용)
export const CreateConsultationMessageSchema = z.object({
  hospitalId: z.string().uuid('Invalid hospital ID format'),
  content: z.string().min(1, 'Content is required').max(1000, 'Content too long'),
  senderType: z.enum(SenderTypeValues, {
    message: 'Invalid sender type',
  }),
});

// 환영 메시지 생성 스키마
export const CreateWelcomeMessageSchema = z.object({
  hospitalId: z.string().uuid('Invalid hospital ID format'),
});

// 타입 추출 (Prisma 타입과 일치)
export type GetConsultationMessagesInput = z.infer<typeof GetConsultationMessagesSchema>;
export type CreateConsultationMessageInput = z.infer<typeof CreateConsultationMessageSchema>;
export type CreateWelcomeMessageInput = z.infer<typeof CreateWelcomeMessageSchema>;
