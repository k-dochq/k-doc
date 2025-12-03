export interface YoutubeVideoData {
  id: string;
  categoryId: string;
  title: Record<string, unknown>;
  description: Record<string, unknown> | null;
  videoUrl: Record<string, unknown>;
  order: number | null;
  thumbnails: Array<{
    id: string;
    locale: string;
    imageUrl: string;
    alt: string | null;
  }>;
  category: {
    id: string;
    name: Record<string, unknown>;
  };
}

export interface GetYoutubeVideosResponse {
  videos: YoutubeVideoData[];
}

export interface GetYoutubeVideosParams {
  categoryId?: string | null;
  limit?: number;
}

export async function getYoutubeVideos(
  params: GetYoutubeVideosParams = {},
): Promise<GetYoutubeVideosResponse> {
  const { categoryId, limit = 10 } = params;

  const searchParams = new URLSearchParams();
  if (categoryId) {
    searchParams.set('categoryId', categoryId);
  }
  if (limit) {
    searchParams.set('limit', limit.toString());
  }

  const response = await fetch(`/api/youtube-videos?${searchParams.toString()}`);

  if (!response.ok) {
    throw new Error('Failed to fetch youtube videos');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch youtube videos');
  }

  return result.data;
}
