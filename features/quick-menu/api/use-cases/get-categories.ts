import { prisma } from 'shared/lib/prisma';
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
    console.error('Error fetching categories:', error);

    // 더 구체적인 에러 메시지 제공
    if (error instanceof Error) {
      if (error.message.includes('connection')) {
        throw new Error('데이터베이스 연결에 실패했습니다. 잠시 후 다시 시도해주세요.');
      } else if (error.message.includes('timeout')) {
        throw new Error('요청 시간이 초과되었습니다. 잠시 후 다시 시도해주세요.');
      } else {
        throw new Error(`데이터를 불러오는 중 오류가 발생했습니다: ${error.message}`);
      }
    }

    throw new Error('알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해주세요.');
  }
}
