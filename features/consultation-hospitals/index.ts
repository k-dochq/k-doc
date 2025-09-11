// Public API exports
export type {
  ConsultationHospitalResponse,
  ConsultationHospitalsApiResponse,
} from './api/entities/types';

export { ConsultationHospitalRepository } from './api/infrastructure/repositories/consultation-hospital-repository';
export { GetConsultationHospitalsUseCase } from './api/use-cases/get-consultation-hospitals';
