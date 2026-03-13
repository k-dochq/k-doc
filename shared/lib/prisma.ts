import { PrismaClient } from '@prisma/client';

// Avoid instantiating multiple PrismaClient instances in dev
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

export const prisma: PrismaClient =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: ['error'],
  });

globalForPrisma.prisma = prisma;
