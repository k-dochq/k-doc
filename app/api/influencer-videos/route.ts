import { NextResponse } from 'next/server';
import { getInfluencerVideos } from 'entities/influencer-video';

export async function GET() {
  try {
    const videos = await getInfluencerVideos();
    return NextResponse.json({ success: true, data: videos });
  } catch (error) {
    console.error('[influencer-videos] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch influencer videos' },
      { status: 500 },
    );
  }
}
