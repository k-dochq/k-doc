import 'server-only';

import { HospitalLikeRepository } from '../infrastructure/repositories/hospital-like-repository';
import { AuthService } from '../infrastructure/services/auth-service';
import type { HospitalLikeStatusRequest, HospitalLikeStatusResult } from '../entities/types';

/**
 * 병원 좋아요 상태 조회 Use Case
 */
export class GetHospitalLikeStatusUseCase {
  constructor(
    private hospitalLikeRepository: HospitalLikeRepository,
    private authService: AuthService,
  ) {}

  async execute(request: HospitalLikeStatusRequest): Promise<HospitalLikeStatusResult> {
    try {
      const { hospitalId, userId } = request;

      // 병원 존재 여부 확인
      const hospitalExists = await this.hospitalLikeRepository.hospitalExists(hospitalId);
      if (!hospitalExists) {
        return {
          success: false,
          isLiked: false,
          likeCount: 0,
          error: 'Hospital not found',
        };
      }

      // 사용자의 좋아요 상태 확인
      const existingLike = await this.hospitalLikeRepository.findLikeByUserAndHospital(
        userId,
        hospitalId,
      );

      // 전체 좋아요 수 조회
      const likeCount = await this.hospitalLikeRepository.countLikesByHospital(hospitalId);

      return {
        success: true,
        isLiked: !!existingLike,
        likeCount,
      };
    } catch (error) {
      console.error('Error in GetHospitalLikeStatusUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
