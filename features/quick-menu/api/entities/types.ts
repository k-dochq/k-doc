import { type Prisma } from '@prisma/client';

export interface Category {
  id: string;
  name: Prisma.JsonValue;
  categoryType: 'PART' | 'PROCEDURE';
  description: string | null;
  order: number | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetCategoriesRequest {
  categoryType?: 'PART' | 'PROCEDURE';
  isActive?: boolean;
  limit?: number;
  offset?: number;
}

export interface GetCategoriesResponse {
  categories: Category[];
  total: number;
}
