import { Prisma } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { routeErrorLogger } from 'shared/lib';

const ENDPOINT = '/api/hospitals/[id]/videos';
const METHOD = 'GET';

interface HospitalVideoAsset {
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  alt: string | null;
}

interface HospitalVideosResponse {
  thumbnail: HospitalVideoAsset | null;
  video: HospitalVideoAsset | null;
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
): Promise<NextResponse> {
  const { id } = await params;

  try {
    const images = await prisma.hospitalImage.findMany({
      where: {
        hospitalId: id,
        isActive: true,
        imageType: {
          in: ['VIDEO_THUMBNAIL', 'VIDEO'],
        },
      },
      orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
    });

    const thumbnailImage = images.find((img) => img.imageType === 'VIDEO_THUMBNAIL') || null;
    const videoImage = images.find((img) => img.imageType === 'VIDEO') || null;

    const response: HospitalVideosResponse = {
      thumbnail: thumbnailImage
        ? {
            localizedLinks: (thumbnailImage.localizedLinks as Prisma.JsonValue | null) ?? null,
            fallbackUrl: thumbnailImage.imageUrl ?? null,
            alt: thumbnailImage.alt ?? null,
          }
        : null,
      video: videoImage
        ? {
            localizedLinks: (videoImage.localizedLinks as Prisma.JsonValue | null) ?? null,
            fallbackUrl: videoImage.imageUrl ?? null,
            alt: videoImage.alt ?? null,
          }
        : null,
    };

    return NextResponse.json(
      {
        success: true,
        data: response,
      },
      { status: 200 },
    );
  } catch (error) {
    const requestId = routeErrorLogger.logError({
      error: error as Error,
      endpoint: ENDPOINT,
      method: METHOD,
      request,
    });

    return NextResponse.json(
      {
        success: false,
        error: 'Failed to fetch hospital videos',
        requestId,
      },
      { status: 500 },
    );
  }
}
