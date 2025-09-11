import type { IAuthService } from 'shared/lib/auth/server';
import type { ILikedHospitalsRepository } from '../infrastructure/repositories/liked-hospitals-repository';
import type { LikedHospitalsRequest, LikedHospitalsResult } from '../entities/types';

export interface IGetLikedHospitalsUseCase {
  execute(request: LikedHospitalsRequest): Promise<LikedHospitalsResult>;
}

export class GetLikedHospitalsUseCase implements IGetLikedHospitalsUseCase {
  constructor(
    private authService: IAuthService,
    private likedHospitalsRepository: ILikedHospitalsRepository,
  ) {}

  async execute(request: LikedHospitalsRequest): Promise<LikedHospitalsResult> {
    try {
      // 1. 사용자 인증 확인
      const user = await this.authService.getCurrentUser();
      if (!user) {
        return {
          success: false,
          hospitals: [],
          totalCount: 0,
          hasNextPage: false,
          nextPage: null,
          error: 'Unauthorized',
        };
      }

      // 2. 사용자가 좋아요한 병원 ID 목록 가져오기
      const hospitalIds = await this.likedHospitalsRepository.getLikedHospitalIds(user.id);

      if (hospitalIds.length === 0) {
        return {
          success: true,
          hospitals: [],
          totalCount: 0,
          hasNextPage: false,
          nextPage: null,
        };
      }

      // 3. 페이지네이션 계산
      const { page, limit } = request;
      const offset = (page - 1) * limit;
      const totalCount = hospitalIds.length;
      const hasNextPage = offset + limit < totalCount;
      const nextPage = hasNextPage ? page + 1 : null;

      // 4. 병원 상세 정보 가져오기
      const hospitals = await this.likedHospitalsRepository.getHospitalsByIds(
        hospitalIds,
        offset,
        limit,
      );

      return {
        success: true,
        hospitals,
        totalCount,
        hasNextPage,
        nextPage,
      };
    } catch (error) {
      console.error('Error in GetLikedHospitalsUseCase:', error);
      return {
        success: false,
        hospitals: [],
        totalCount: 0,
        hasNextPage: false,
        nextPage: null,
        error: error instanceof Error ? error.message : 'Unknown error',
      };
    }
  }
}
