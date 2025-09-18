import { type LocalizedText } from 'shared/lib/localized-text';

export interface Comment {
  id: string;
  content: LocalizedText;
  userId: string;
  reviewId: string;
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
  user: {
    id: string;
    displayName: string | null;
    name: string | null;
    nickName: string | null;
  };
}

export interface CreateCommentData {
  content: LocalizedText;
  reviewId: string;
}

export interface CommentListResponse {
  success: boolean;
  data: {
    comments: Comment[];
    total: number;
    hasMore: boolean;
    nextCursor?: string;
  };
  error?: string;
}

export interface CreateCommentResponse {
  success: boolean;
  data?: Comment;
  error?: string;
}

export interface CommentQueryParams {
  cursor?: string;
  limit?: number;
}
