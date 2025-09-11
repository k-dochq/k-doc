import { type IConsultationMessageRepository } from '../infrastructure/repositories/consultation-message-repository';
import { type IAuthService } from '../infrastructure/services/auth-service';
import { type GetConsultationMessagesInput } from '../entities/schemas';
import { type GetConsultationMessagesResponse } from '../entities/types';

export interface IGetConsultationMessagesUseCase {
  execute(input: GetConsultationMessagesInput): Promise<GetConsultationMessagesResponse>;
}

export class GetConsultationMessagesUseCase implements IGetConsultationMessagesUseCase {
  constructor(
    private readonly consultationMessageRepository: IConsultationMessageRepository,
    private readonly authService: IAuthService,
  ) {}

  async execute(input: GetConsultationMessagesInput): Promise<GetConsultationMessagesResponse> {
    try {
      // 1. 사용자 인증 확인
      const currentUser = await this.authService.getCurrentUser();

      // 2. 사용자 권한 확인 (자신의 메시지만 조회 가능)
      if (!this.authService.validateUserAccess(currentUser.id, input.userId)) {
        throw new Error('Access denied: You can only view your own messages');
      }

      // 3. 상담 메시지 조회
      const messages = await this.consultationMessageRepository.findByHospitalAndUser(
        input.hospitalId,
        input.userId,
      );

      return {
        success: true,
        messages,
      };
    } catch (error) {
      console.error('Error in GetConsultationMessagesUseCase:', error);
      throw error instanceof Error ? error : new Error('Failed to get consultation messages');
    }
  }
}
