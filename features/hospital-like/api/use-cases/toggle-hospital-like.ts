import 'server-only';

import { HospitalLikeRepository } from '../infrastructure/repositories/hospital-like-repository';
import { AuthService } from 'shared/lib/auth/server';
import type { HospitalLikeRequest, HospitalLikeResult } from '../entities/types';

/**
 * 병원 좋아요 토글 Use Case
 */
export class ToggleHospitalLikeUseCase {
  constructor(
    private hospitalLikeRepository: HospitalLikeRepository,
    private authService: AuthService,
  ) {}

  async execute(request: HospitalLikeRequest): Promise<HospitalLikeResult> {
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

      // 기존 좋아요 확인
      const existingLike = await this.hospitalLikeRepository.findLikeByUserAndHospital(
        userId,
        hospitalId,
      );

      let isLiked: boolean;

      if (existingLike) {
        // 좋아요가 있으면 삭제
        await this.hospitalLikeRepository.deleteLike(existingLike.id);
        isLiked = false;
      } else {
        // 좋아요가 없으면 추가
        await this.hospitalLikeRepository.createLike(userId, hospitalId);
        isLiked = true;
      }

      // 업데이트된 좋아요 수 조회
      const likeCount = await this.hospitalLikeRepository.countLikesByHospital(hospitalId);

      return {
        success: true,
        isLiked,
        likeCount,
      };
    } catch (error) {
      console.error('Error in ToggleHospitalLikeUseCase:', error);
      return {
        success: false,
        isLiked: false,
        likeCount: 0,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
