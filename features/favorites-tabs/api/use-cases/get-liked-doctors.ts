import 'server-only';

import { AuthService } from 'shared/lib/auth/server';
import { LikedDoctorsRepository } from '../infrastructure/repositories/liked-doctors-repository';
import type { LikedDoctorsRequest, LikedDoctorsResult } from '../entities/types';

/**
 * 좋아요한 의사 목록 조회 Use Case
 */
export class GetLikedDoctorsUseCase {
  constructor(
    private authService: AuthService,
    private likedDoctorsRepository: LikedDoctorsRepository,
  ) {}

  async execute(request: LikedDoctorsRequest): Promise<LikedDoctorsResult> {
    try {
      // 사용자 인증 확인
      const currentUser = await this.authService.getCurrentUserOrNull();
      if (!currentUser) {
        return {
          success: false,
          doctors: [],
          totalCount: 0,
          hasNextPage: false,
          nextPage: null,
          error: 'Unauthorized',
        };
      }

      // 좋아요한 의사 목록 조회
      const { doctors, totalCount } = await this.likedDoctorsRepository.findLikedDoctorsByUser(
        currentUser.id,
        request.page,
        request.limit,
      );

      // 다음 페이지 존재 여부 계산
      const hasNextPage = request.page * request.limit < totalCount;
      const nextPage = hasNextPage ? request.page + 1 : null;

      return {
        success: true,
        doctors,
        totalCount,
        hasNextPage,
        nextPage,
      };
    } catch (error) {
      console.error('Error in GetLikedDoctorsUseCase:', error);
      return {
        success: false,
        doctors: [],
        totalCount: 0,
        hasNextPage: false,
        nextPage: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
