import 'server-only';

import { DoctorLikeRepository } from '../infrastructure/repositories/doctor-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { DoctorLikeRequest, DoctorLikeResult } from '../entities/types';

/**
 * 의사 좋아요 상태 조회 Use Case
 */
export class GetDoctorLikeStatusUseCase {
  constructor(
    private doctorLikeRepository: DoctorLikeRepository,
    private authService: AuthService,
  ) {}

  async execute(request: DoctorLikeRequest): Promise<DoctorLikeResult> {
    try {
      const { doctorId, userId } = request;

      // 의사 존재 여부 확인
      const doctorExists = await this.doctorLikeRepository.doctorExists(doctorId);
      if (!doctorExists) {
        return {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: 'Doctor not found',
        };
      }

      // 사용자의 좋아요 상태 확인
      const existingLike = await this.doctorLikeRepository.findLikeByUserAndDoctor(
        userId,
        doctorId,
      );

      // 전체 좋아요 수 조회
      const likeCount = await this.doctorLikeRepository.countLikesByDoctor(doctorId);

      return {
        success: true,
        isLiked: !!existingLike,
        likeCount,
      };
    } catch (error) {
      console.error('Error in GetDoctorLikeStatusUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
