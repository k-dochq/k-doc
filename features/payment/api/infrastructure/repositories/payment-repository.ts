import { type Prisma, type Payment } from '@prisma/client';
import { prisma } from 'shared/lib/prisma';

export interface IPaymentRepository {
  findByTid(tid: string): Promise<Payment | null>;
  create(data: Prisma.PaymentCreateInput, tx: Prisma.TransactionClient): Promise<Payment>;
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
   * Payment 생성 (트랜잭션 내부에서 실행)
   */
  async create(data: Prisma.PaymentCreateInput, tx: Prisma.TransactionClient): Promise<Payment> {
    return tx.payment.create({ data });
  }
}
