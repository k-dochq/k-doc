import { NextResponse } from 'next/server';
import { getInfluencerVideoSection } from 'entities/influencer-video/api/use-cases/get-influencer-video-section';

export async function GET() {
  try {
    const section = await getInfluencerVideoSection();
    return NextResponse.json({ success: true, data: section });
  } catch (error) {
    console.error('[influencer-video-section] Error:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch influencer video section' },
      { status: 500 },
    );
  }
}
