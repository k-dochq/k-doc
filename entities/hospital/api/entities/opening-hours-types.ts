// 운영시간 관련 타입 정의

export interface DaySchedule {
  holiday?: boolean;
  openTime?: string;
  closeTime?: string;
}

export interface OpeningHours {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
  launchTime?: DaySchedule; // 점심시간
}
