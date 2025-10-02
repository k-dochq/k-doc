import 'server-only';

import { DoctorLikeRepository } from '../infrastructure/repositories/doctor-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { DoctorLikeRequest, DoctorLikeResult } from '../entities/types';

/**
 * 의사 좋아요 토글 Use Case
 */
export class ToggleDoctorLikeUseCase {
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

      // 기존 좋아요 확인
      const existingLike = await this.doctorLikeRepository.findLikeByUserAndDoctor(
        userId,
        doctorId,
      );

      let isLiked: boolean;

      if (existingLike) {
        // 좋아요가 있으면 삭제
        await this.doctorLikeRepository.deleteLike(existingLike.id);
        isLiked = false;
      } else {
        // 좋아요가 없으면 추가
        await this.doctorLikeRepository.createLike(userId, doctorId);
        isLiked = true;
      }

      // 업데이트된 좋아요 수 조회
      const likeCount = await this.doctorLikeRepository.countLikesByDoctor(doctorId);

      return {
        success: true,
        isLiked,
        likeCount,
      };
    } catch (error) {
      console.error('Error in ToggleDoctorLikeUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
