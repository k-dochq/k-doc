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
  title: Prisma.JsonValue | null;
}

interface HospitalProcedureImage {
  id: string;
  localizedLinks: Prisma.JsonValue | null;
  fallbackUrl: string | null;
  order: number | null;
  alt: string | null;
}

interface HospitalVideosResponse {
  thumbnail: HospitalVideoAsset | null;
  video: HospitalVideoAsset | null;
  thumbnails: HospitalVideoAsset[]; // 모든 썸네일 이미지 (alt 기반 필터링용)
  videos: HospitalVideoAsset[]; // 모든 비디오 이미지 (alt 기반 필터링용)
  procedures: HospitalProcedureImage[];
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
          in: ['VIDEO_THUMBNAIL', 'VIDEO', 'PROCEDURE_DETAIL'],
        },
      },
      orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
    });

    // alt 기반 필터링을 위해 모든 이미지를 배열로 반환
    const thumbnailImages = images.filter((img) => img.imageType === 'VIDEO_THUMBNAIL');
    const videoImages = images.filter((img) => img.imageType === 'VIDEO');
    const procedureImages = images.filter((img) => img.imageType === 'PROCEDURE_DETAIL');

    // 첫 번째 이미지 (하위 호환성 유지)
    const thumbnailImage = thumbnailImages[0] || null;
    const videoImage = videoImages[0] || null;

    const response: HospitalVideosResponse = {
      thumbnail: thumbnailImage
        ? {
            localizedLinks: (thumbnailImage.localizedLinks as Prisma.JsonValue | null) ?? null,
            fallbackUrl: thumbnailImage.imageUrl ?? null,
            alt: thumbnailImage.alt ?? null,
            title: thumbnailImage.title ?? null,
          }
        : null,
      video: videoImage
        ? {
            localizedLinks: (videoImage.localizedLinks as Prisma.JsonValue | null) ?? null,
            fallbackUrl: videoImage.imageUrl ?? null,
            alt: videoImage.alt ?? null,
            title: videoImage.title ?? null,
          }
        : null,
      thumbnails: thumbnailImages.map((img) => ({
        localizedLinks: (img.localizedLinks as Prisma.JsonValue | null) ?? null,
        fallbackUrl: img.imageUrl ?? null,
        alt: img.alt ?? null,
        title: img.title ?? null,
      })),
      videos: videoImages.map((img) => ({
        localizedLinks: (img.localizedLinks as Prisma.JsonValue | null) ?? null,
        fallbackUrl: img.imageUrl ?? null,
        alt: img.alt ?? null,
        title: img.title ?? null,
      })),
      procedures: procedureImages.map((img) => ({
        id: img.id,
        localizedLinks: (img.localizedLinks as Prisma.JsonValue | null) ?? null,
        fallbackUrl: img.imageUrl ?? null,
        order: img.order ?? null,
        alt: img.alt ?? null,
      })),
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
