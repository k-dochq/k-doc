import { prisma } from 'shared/lib/prisma';
import { handleDatabaseError } from 'shared/lib';
import { type Category } from '../entities/types';

export async function getCategories(): Promise<Category[]> {
  try {
    const categories = await prisma.category.findMany({
      where: {
        categoryType: 'PART',
        isActive: true,
      },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });

    return categories;
  } catch (error) {
    throw handleDatabaseError(error, 'getCategories');
  }
}
