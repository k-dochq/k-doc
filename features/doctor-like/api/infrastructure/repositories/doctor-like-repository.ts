import 'server-only';

import { prisma } from 'shared/lib/prisma';
import { v4 as uuidv4 } from 'uuid';

/**
 * 의사 좋아요 레포지토리
 */
export class DoctorLikeRepository {
  /**
   * 의사 존재 여부 확인
   */
  async doctorExists(doctorId: string): Promise<boolean> {
    const doctor = await prisma.doctor.findUnique({
      where: { id: doctorId },
      select: { id: true },
    });

    return !!doctor;
  }

  /**
   * 사용자와 의사로 좋아요 찾기
   */
  async findLikeByUserAndDoctor(userId: string, doctorId: string) {
    return await prisma.doctorLike.findUnique({
      where: {
        userId_doctorId: {
          userId,
          doctorId,
        },
      },
    });
  }

  /**
   * 좋아요 생성
   */
  async createLike(userId: string, doctorId: string) {
    return await prisma.doctorLike.create({
      data: {
        id: uuidv4(),
        userId,
        doctorId,
      },
    });
  }

  /**
   * 좋아요 삭제
   */
  async deleteLike(likeId: string) {
    return await prisma.doctorLike.delete({
      where: { id: likeId },
    });
  }

  /**
   * 의사별 좋아요 수 조회
   */
  async countLikesByDoctor(doctorId: string): Promise<number> {
    return await prisma.doctorLike.count({
      where: { doctorId },
    });
  }

  /**
   * 사용자가 좋아요한 의사 목록 조회 (페이지네이션)
   */
  async findLikedDoctorsByUser(
    userId: string,
    options: {
      skip?: number;
      take?: number;
      orderBy?: 'createdAt' | 'name';
      orderDirection?: 'asc' | 'desc';
    } = {},
  ) {
    const { skip = 0, take = 20, orderBy = 'createdAt', orderDirection = 'desc' } = options;

    return await prisma.doctorLike.findMany({
      where: { userId },
      include: {
        Doctor: {
          include: {
            Hospital: {
              select: {
                id: true,
                name: true,
              },
            },
            DoctorImage: {
              where: { isActive: true },
              orderBy: { order: 'asc' },
              take: 1,
            },
            DoctorMedicalSpecialty: {
              include: {
                MedicalSpecialty: true,
              },
            },
          },
        },
      },
      orderBy: {
        [orderBy === 'name' ? 'Doctor' : orderBy]:
          orderBy === 'name' ? { name: orderDirection } : orderDirection,
      },
      skip,
      take,
    });
  }

  /**
   * 사용자가 좋아요한 의사 수 조회
   */
  async countLikedDoctorsByUser(userId: string): Promise<number> {
    return await prisma.doctorLike.count({
      where: { userId },
    });
  }
}
