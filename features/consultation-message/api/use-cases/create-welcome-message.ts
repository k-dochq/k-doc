import { type Prisma, SenderType } from '@prisma/client';
import { type IConsultationMessageRepository } from '../infrastructure/repositories/consultation-message-repository';
import { type IAuthService } from 'shared/lib/auth/server';
import { type CreateWelcomeMessageInput } from '../entities/schemas';
import { type CreateWelcomeMessageResponse } from '../entities/types';

export interface ICreateWelcomeMessageUseCase {
  execute(input: CreateWelcomeMessageInput): Promise<CreateWelcomeMessageResponse>;
}

export class CreateWelcomeMessageUseCase implements ICreateWelcomeMessageUseCase {
  constructor(
    private readonly consultationMessageRepository: IConsultationMessageRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(input: CreateWelcomeMessageInput): Promise<CreateWelcomeMessageResponse> {
    try {
      // 1. 사용자 인증 확인
      const currentUser = await this.authService.getCurrentUser();

      // 2. 기존 환영 메시지 확인
      const existingWelcomeMessage =
        await this.consultationMessageRepository.findExistingWelcomeMessage(
          input.hospitalId,
          currentUser.id,
        );

      if (existingWelcomeMessage) {
        return {
          success: true,
          data: existingWelcomeMessage,
          message: 'Welcome message already exists',
        };
      }

      // 3. 환영 메시지 생성 데이터 준비 (Prisma 타입 활용)
      const welcomeMessageData: Omit<Prisma.ConsultationMessageCreateInput, 'id'> = {
        senderType: SenderType.ADMIN, // Prisma enum 사용
        content: '안녕하세요! 반갑습니다. 성형과 관련된 무엇이든 물어보세요.',
        User: {
          connect: { id: currentUser.id },
        },
        Hospital: {
          connect: { id: input.hospitalId },
        },
      };

      // 4. 환영 메시지 생성
      const welcomeMessage = await this.consultationMessageRepository.create(welcomeMessageData);

      return {
        success: true,
        data: welcomeMessage,
      };
    } catch (error) {
      console.error('Error in CreateWelcomeMessageUseCase:', error);
      throw error instanceof Error ? error : new Error('Failed to create welcome message');
    }
  }
}
