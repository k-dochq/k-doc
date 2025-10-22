export type VanType = 'standard' | 'premium' | 'luxury';
export type ServiceType = 'oneWay' | 'hourlyCharter';

export interface VanTypeInfo {
  id: VanType;
  nameKey: string;
  descriptionKey: string;
  capacityKey: string;
  basePrice: {
    oneWay: number;
    oneWayWithPicketing: number;
    hourlyCharter: number;
  };
}

export const VAN_TYPES: VanTypeInfo[] = [
  {
    id: 'standard',
    nameKey: 'package.vanReservation.vanTypes.standard.name',
    descriptionKey: 'package.vanReservation.vanTypes.standard.description',
    capacityKey: 'package.vanReservation.vanTypes.standard.capacity',
    basePrice: {
      oneWay: 70,
      oneWayWithPicketing: 75,
      hourlyCharter: 150,
    },
  },
  {
    id: 'premium',
    nameKey: 'package.vanReservation.vanTypes.premium.name',
    descriptionKey: 'package.vanReservation.vanTypes.premium.description',
    capacityKey: 'package.vanReservation.vanTypes.premium.capacity',
    basePrice: {
      oneWay: 90,
      oneWayWithPicketing: 95,
      hourlyCharter: 200,
    },
  },
  {
    id: 'luxury',
    nameKey: 'package.vanReservation.vanTypes.luxury.name',
    descriptionKey: 'package.vanReservation.vanTypes.luxury.description',
    capacityKey: 'package.vanReservation.vanTypes.luxury.capacity',
    basePrice: {
      oneWay: 120,
      oneWayWithPicketing: 125,
      hourlyCharter: 280,
    },
  },
];

export const PICKETING_FEE = 5;
export const MAX_PASSENGERS = 7;
export const MAX_LUGGAGE = 10;
