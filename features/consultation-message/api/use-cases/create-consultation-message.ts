import { type Prisma, SenderType } from '@prisma/client';
import { type IConsultationMessageRepository } from '../infrastructure/repositories/consultation-message-repository';
import { type IAuthService } from 'shared/lib/auth/server';
import { type CreateConsultationMessageInput } from '../entities/schemas';
import { type CreateConsultationMessageResponse } from '../entities/types';

export interface ICreateConsultationMessageUseCase {
  execute(input: CreateConsultationMessageInput): Promise<CreateConsultationMessageResponse>;
}

export class CreateConsultationMessageUseCase implements ICreateConsultationMessageUseCase {
  constructor(
    private readonly consultationMessageRepository: IConsultationMessageRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(input: CreateConsultationMessageInput): Promise<CreateConsultationMessageResponse> {
    try {
      // 1. 사용자 인증 확인
      const currentUser = await this.authService.getCurrentUser();

      // 2. 메시지 생성 데이터 준비 (Prisma 타입 활용)
      const messageData: Omit<Prisma.ConsultationMessageCreateInput, 'id'> = {
        senderType: input.senderType as SenderType,
        content: input.content,
        User: {
          connect: { id: currentUser.id },
        },
        Hospital: {
          connect: { id: input.hospitalId },
        },
      };

      // 3. 메시지 생성
      const newMessage = await this.consultationMessageRepository.create(messageData);

      return {
        success: true,
        message: newMessage,
      };
    } catch (error) {
      console.error('Error in CreateConsultationMessageUseCase:', error);
      throw error instanceof Error ? error : new Error('Failed to create consultation message');
    }
  }
}
