export interface YoutubeVideoCategoryData {
  id: string;
  name: Record<string, unknown>;
  order: number | null;
}

export interface GetYoutubeVideoCategoriesResponse {
  categories: YoutubeVideoCategoryData[];
}

export async function getYoutubeVideoCategories(): Promise<GetYoutubeVideoCategoriesResponse> {
  const response = await fetch('/api/youtube-video-categories');

  if (!response.ok) {
    throw new Error('Failed to fetch youtube video categories');
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error('Failed to fetch youtube video categories');
  }

  return result.data;
}
