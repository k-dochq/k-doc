import 'server-only';

import { prisma } from 'shared/lib/prisma';
import type { HospitalLike } from 'entities/hospital-like';

/**
 * 병원 좋아요 데이터 액세스 계층
 */
export class HospitalLikeRepository {
  /**
   * 사용자의 특정 병원 좋아요 상태 조회
   */
  async findLikeByUserAndHospital(
    userId: string,
    hospitalId: string,
  ): Promise<HospitalLike | null> {
    return await prisma.hospitalLike.findUnique({
      where: {
        userId_hospitalId: {
          userId,
          hospitalId,
        },
      },
    });
  }

  /**
   * 특정 병원의 총 좋아요 수 조회
   */
  async countLikesByHospital(hospitalId: string): Promise<number> {
    return await prisma.hospitalLike.count({
      where: {
        hospitalId,
      },
    });
  }

  /**
   * 좋아요 생성
   */
  async createLike(userId: string, hospitalId: string): Promise<HospitalLike> {
    return await prisma.hospitalLike.create({
      data: {
        id: crypto.randomUUID(),
        userId,
        hospitalId,
      },
    });
  }

  /**
   * 좋아요 삭제
   */
  async deleteLike(likeId: string): Promise<void> {
    await prisma.hospitalLike.delete({
      where: {
        id: likeId,
      },
    });
  }

  /**
   * 병원 존재 여부 확인
   */
  async hospitalExists(hospitalId: string): Promise<boolean> {
    const hospital = await prisma.hospital.findUnique({
      where: { id: hospitalId },
    });
    return !!hospital;
  }
}
