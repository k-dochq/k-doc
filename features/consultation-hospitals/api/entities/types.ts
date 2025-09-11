// 상담 병원 도메인 타입 정의
export interface ConsultationHospitalResponse {
  id: string;
  name: string;
  address: string | null;
  phoneNumber: string | null;
  profileImageUrl: string | null;
  lastMessageAt: Date;
}

export interface ConsultationHospitalsApiResponse {
  success: boolean;
  data: ConsultationHospitalResponse[];
  error?: string;
}
