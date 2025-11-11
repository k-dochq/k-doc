import { Prisma, type Payment, type PaymentStatus } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';

export interface IPaymentRepository {
  findByTid(tid: string): Promise<Payment | null>;
  findByReservationId(reservationId: string): Promise<Payment | null>;
  create(data: Prisma.PaymentCreateInput, tx: Prisma.TransactionClient): Promise<Payment>;
  updateStatus(
    id: string,
    status: PaymentStatus,
    refundInfo: Prisma.InputJsonValue | null,
    tx: Prisma.TransactionClient,
  ): Promise<Payment>;
}

export class PaymentRepository implements IPaymentRepository {
  /**
   * tid로 Payment 조회 (중복 처리 방지용)
   */
  async findByTid(tid: string): Promise<Payment | null> {
    try {
      return await prisma.payment.findUnique({
        where: {
          tid: tid,
        },
      });
    } catch (error) {
      console.error('Error finding payment by tid:', error);
      throw new Error('Failed to find payment by tid');
    }
  }

  /**
   * reservationId로 Payment 조회 (결제 상태 확인용)
   */
  async findByReservationId(reservationId: string): Promise<Payment | null> {
    try {
      return await prisma.payment.findFirst({
        where: {
          reservationId: reservationId,
        },
        orderBy: {
          createdAt: 'desc',
        },
      });
    } catch (error) {
      console.error('Error finding payment by reservationId:', error);
      throw new Error('Failed to find payment by reservationId');
    }
  }

  /**
   * Payment 생성 (트랜잭션 내부에서 실행)
   */
  async create(data: Prisma.PaymentCreateInput, tx: Prisma.TransactionClient): Promise<Payment> {
    return tx.payment.create({ data });
  }

  /**
   * Payment 상태 업데이트 (트랜잭션 내부에서 실행)
   */
  async updateStatus(
    id: string,
    status: PaymentStatus,
    refundInfo: Prisma.InputJsonValue | null,
    tx: Prisma.TransactionClient,
  ): Promise<Payment> {
    return tx.payment.update({
      where: { id },
      data: {
        status,
        refundInfo: refundInfo ?? Prisma.JsonNull,
        updatedAt: new Date(),
      },
    });
  }
}
