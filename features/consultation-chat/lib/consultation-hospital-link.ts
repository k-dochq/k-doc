import { K_DOC_HOSPITAL_ID } from 'shared/config/hospital-constants';

/** 상담채팅에서 병원 로고/헤더 클릭 시 이동할 병원상세 URL. K-DOC 병원은 예외로 undefined 반환. */
export function getConsultationHospitalDetailHref(hospitalId?: string): string | undefined {
  if (!hospitalId || hospitalId === K_DOC_HOSPITAL_ID) {
    return undefined;
  }
  return `/v2/hospital/${hospitalId}`;
}
