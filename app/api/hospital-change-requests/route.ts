import { NextRequest, NextResponse } from 'next/server';
import {
  HospitalChangeRequesterType,
  HospitalChangeRequestType,
} from '@prisma/client';
import { prisma } from 'shared/lib/prisma';
import { createClient } from 'shared/lib/supabase/server';

interface CreateHospitalChangeRequestBody {
  requesterName?: string;
  requesterEmail?: string;
  requesterPhone?: string;
  content?: string;
  attachmentUrls?: string[];
  requestType?: 'UPDATE' | 'DELETE';
}

function normalizeRequestType(
  requestType: string | undefined,
  content: string,
): HospitalChangeRequestType {
  if (requestType === HospitalChangeRequestType.UPDATE) return HospitalChangeRequestType.UPDATE;
  if (requestType === HospitalChangeRequestType.DELETE) return HospitalChangeRequestType.DELETE;

  const normalized = content.toLowerCase();
  if (
    normalized.includes('삭제') ||
    normalized.includes('delete') ||
    normalized.includes('remove')
  ) {
    return HospitalChangeRequestType.DELETE;
  }

  return HospitalChangeRequestType.UPDATE;
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    const body = (await request.json()) as CreateHospitalChangeRequestBody;

    const requesterName = body.requesterName?.trim() ?? '';
    const requesterEmail = body.requesterEmail?.trim() ?? '';
    const requesterPhone = body.requesterPhone?.trim() ?? '';
    const content = body.content?.trim() ?? '';
    const attachmentUrls = Array.isArray(body.attachmentUrls)
      ? body.attachmentUrls.filter((url) => typeof url === 'string').slice(0, 10)
      : [];

    if (!requesterName || !requesterEmail || !requesterPhone || !content) {
      return NextResponse.json(
        { success: false, error: 'MISSING_REQUIRED_FIELDS' },
        { status: 400 },
      );
    }

    if (content.length > 500) {
      return NextResponse.json(
        { success: false, error: 'CONTENT_TOO_LONG' },
        { status: 400 },
      );
    }

    const supabase = await createClient();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    const requesterUserId = session?.user?.id ?? null;
    const requesterType = requesterUserId
      ? HospitalChangeRequesterType.USER
      : HospitalChangeRequesterType.GUEST;

    const created = await prisma.hospitalChangeRequest.create({
      data: {
        id: crypto.randomUUID(),
        requesterType,
        requesterUserId,
        requestType: normalizeRequestType(body.requestType, content),
        requesterName,
        requesterEmail,
        requesterPhone,
        platform: 'WEB',
        content,
        attachmentUrls,
        updatedAt: new Date(),
      },
      select: { id: true },
    });

    return NextResponse.json({ success: true, id: created.id });
  } catch (error) {
    console.error('POST hospital-change-requests error:', error);
    return NextResponse.json(
      { success: false, error: 'INTERNAL_SERVER_ERROR' },
      { status: 500 },
    );
  }
}
