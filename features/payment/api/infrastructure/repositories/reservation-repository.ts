import { type Prisma, type Reservation, type ReservationStatus } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import type { ReservationWithRelations } from '../../entities/types';

export interface IReservationRepository {
  findById(id: string): Promise<ReservationWithRelations | null>;
  updateStatus(
    id: string,
    status: ReservationStatus,
    cancelReason: string | null,
    tx: Prisma.TransactionClient,
  ): Promise<Reservation>;
}

export class ReservationRepository implements IReservationRepository {
  /**
   * ID로 Reservation 조회 (관계 포함)
   */
  async findById(id: string): Promise<ReservationWithRelations | null> {
    try {
      return await prisma.reservation.findUnique({
        where: { id },
        include: {
          User: true,
          Hospital: true,
          Payment: true,
          ReservationStatusHistory: true,
        },
      });
    } catch (error) {
      console.error('Error finding reservation by id:', error);
      throw new Error('Failed to find reservation by id');
    }
  }

  /**
   * Reservation 상태 업데이트 (트랜잭션 내부에서 실행)
   */
  async updateStatus(
    id: string,
    status: ReservationStatus,
    cancelReason: string | null,
    tx: Prisma.TransactionClient,
  ): Promise<Reservation> {
    return tx.reservation.update({
      where: { id },
      data: {
        status,
        cancelReason,
        updatedAt: new Date(),
      },
    });
  }
}
