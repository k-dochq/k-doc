import { type GetHospitalVideosResponse } from '../entities/hospital-video';

export async function getHospitalVideos(hospitalId: string): Promise<GetHospitalVideosResponse> {
  const response = await fetch(`/api/hospitals/${hospitalId}/videos`);

  if (!response.ok) {
    throw new Error(`Failed to fetch hospital videos: ${response.status}`);
  }

  const result = await response.json();

  if (!result.success) {
    throw new Error(result.error || 'Failed to fetch hospital videos');
  }

  return result.data as GetHospitalVideosResponse;
}
