import { prisma } from 'shared/lib/prisma';
import { type Prisma, SenderType } from '@prisma/client';
import { randomUUID } from 'crypto';
import { type ConsultationMessageWithUser } from '../../entities/types';

export interface IConsultationMessageRepository {
  findByHospitalAndUser(hospitalId: string, userId: string): Promise<ConsultationMessageWithUser[]>;
  findExistingWelcomeMessage(
    hospitalId: string,
    userId: string,
  ): Promise<ConsultationMessageWithUser | null>;
  create(
    data: Omit<Prisma.ConsultationMessageCreateInput, 'id'>,
  ): Promise<ConsultationMessageWithUser>;
}

export class ConsultationMessageRepository implements IConsultationMessageRepository {
  async findByHospitalAndUser(
    hospitalId: string,
    userId: string,
  ): Promise<ConsultationMessageWithUser[]> {
    try {
      const messages = await prisma.consultationMessage.findMany({
        where: {
          hospitalId,
          userId,
        },
        include: {
          User: {
            select: {
              id: true,
              displayName: true,
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      });

      return messages;
    } catch (error) {
      console.error('Error fetching consultation messages:', error);
      throw new Error('Failed to fetch consultation messages');
    }
  }

  async findExistingWelcomeMessage(
    hospitalId: string,
    userId: string,
  ): Promise<ConsultationMessageWithUser | null> {
    try {
      const existingMessage = await prisma.consultationMessage.findFirst({
        where: {
          hospitalId,
          userId,
          senderType: SenderType.ADMIN, // Prisma enum 사용
          content: {
            contains: '안녕하세요! 반갑습니다.',
          },
        },
        include: {
          User: {
            select: {
              id: true,
              displayName: true,
              name: true,
            },
          },
        },
      });

      return existingMessage;
    } catch (error) {
      console.error('Error checking existing welcome message:', error);
      throw new Error('Failed to check existing welcome message');
    }
  }

  async create(
    data: Omit<Prisma.ConsultationMessageCreateInput, 'id'>,
  ): Promise<ConsultationMessageWithUser> {
    try {
      const messageData: Prisma.ConsultationMessageCreateInput = {
        id: randomUUID(),
        ...data,
      };

      const newMessage = await prisma.consultationMessage.create({
        data: messageData,
        include: {
          User: {
            select: {
              id: true,
              displayName: true,
              name: true,
            },
          },
        },
      });

      return newMessage;
    } catch (error) {
      console.error('Error creating consultation message:', error);
      throw new Error('Failed to create consultation message');
    }
  }
}
