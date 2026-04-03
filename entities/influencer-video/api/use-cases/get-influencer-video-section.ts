import { prisma } from 'shared/lib/prisma';

export async function getInfluencerVideoSection() {
  return prisma.influencerVideoSection.findFirst({
    where: { isActive: true },
    select: {
      buttonLabel: true,
      buttonUrl: true,
    },
  });
}
