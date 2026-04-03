import { prisma } from 'shared/lib/prisma';

export async function getInfluencerVideos() {
  return prisma.influencerVideo.findMany({
    where: { isActive: true },
    orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    select: {
      id: true,
      platform: true,
      handle: true,
      videoUrl: true,
      externalLink: true,
      title: true,
    },
  });
}
