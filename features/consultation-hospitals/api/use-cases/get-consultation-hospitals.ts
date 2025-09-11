import { ConsultationHospitalRepository } from '../infrastructure/repositories/consultation-hospital-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { ConsultationHospitalResponse } from '../entities/types';

export class GetConsultationHospitalsUseCase {
  constructor(
    private consultationHospitalRepository: ConsultationHospitalRepository,
    private authService: AuthService,
  ) {}

  async execute(): Promise<ConsultationHospitalResponse[]> {
    // 현재 사용자 인증 확인
    const user = await this.authService.getCurrentUser();

    return await this.consultationHospitalRepository.findConsultationHospitalsByUserId(user.id);
  }
}
