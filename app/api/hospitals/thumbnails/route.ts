import { NextRequest, NextResponse } from 'next/server';
import { prisma } from 'shared/lib/prisma';
import { getHospitalThumbnailImageUrl } from 'entities/hospital/lib/image-utils';

// GET /api/hospitals/thumbnails?ids=id1,id2,id3
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const idsParam = searchParams.get('ids');

  if (!idsParam) {
    return NextResponse.json({});
  }

  const ids = idsParam.split(',').filter(Boolean);
  if (ids.length === 0) {
    return NextResponse.json({});
  }

  const hospitals = await prisma.hospital.findMany({
    where: { id: { in: ids } },
    select: {
      id: true,
      HospitalImage: {
        where: { isActive: true },
        orderBy: [{ imageType: 'asc' }, { order: 'asc' }],
        select: { imageType: true, imageUrl: true },
      },
    },
  });

  const result: Record<string, string | null> = {};
  for (const h of hospitals) {
    result[h.id] = getHospitalThumbnailImageUrl(h.HospitalImage);
  }

  return NextResponse.json(result);
}
