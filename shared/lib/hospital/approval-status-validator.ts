import { prisma } from 'shared/lib/prisma';

/**
 * 병원 승인 상태를 검증합니다.
 * REJECTED 상태인 경우 에러를 throw하여 404 처리됩니다.
 *
 * @param hospitalId - 검증할 병원 ID
 * @throws {Error} 병원이 존재하지 않거나 REJECTED 상태인 경우
 */
export async function validateHospitalApprovalStatus(hospitalId: string): Promise<void> {
  const hospital = await prisma.hospital.findUnique({
    where: { id: hospitalId },
    select: { approvalStatusType: true },
  });

  if (!hospital) {
    throw new Error('Hospital not found');
  }

  if (hospital.approvalStatusType === 'REJECTED') {
    throw new Error('Hospital is rejected');
  }
}
