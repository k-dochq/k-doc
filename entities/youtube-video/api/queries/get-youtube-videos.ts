import {
  getYoutubeVideos,
  type GetYoutubeVideosParams,
  type GetYoutubeVideosResponse,
} from '../use-cases/get-youtube-videos';

export { getYoutubeVideos, type GetYoutubeVideosParams, type GetYoutubeVideosResponse };

export async function fetchYoutubeVideos(
  params: GetYoutubeVideosParams = {},
): Promise<GetYoutubeVideosResponse> {
  return getYoutubeVideos(params);
}
