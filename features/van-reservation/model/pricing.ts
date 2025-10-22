import { VAN_TYPES, PICKETING_FEE, type VanType, type ServiceType } from './van-types';

export interface PriceBreakdown {
  basePrice: number;
  picketingFee: number;
  totalPrice: number;
}

export function calculatePrice(
  vanType: VanType | null,
  serviceType: ServiceType | null,
  hasPicketing: boolean,
): PriceBreakdown {
  if (!vanType || !serviceType) {
    return {
      basePrice: 0,
      picketingFee: 0,
      totalPrice: 0,
    };
  }

  const vanInfo = VAN_TYPES.find((v) => v.id === vanType);
  if (!vanInfo) {
    return {
      basePrice: 0,
      picketingFee: 0,
      totalPrice: 0,
    };
  }

  let basePrice = 0;

  if (serviceType === 'oneWay') {
    basePrice = hasPicketing ? vanInfo.basePrice.oneWayWithPicketing : vanInfo.basePrice.oneWay;
  } else if (serviceType === 'hourlyCharter') {
    basePrice = vanInfo.basePrice.hourlyCharter;
  }

  const picketingFee = hasPicketing && serviceType === 'oneWay' ? PICKETING_FEE : 0;
  const totalPrice = basePrice;

  return {
    basePrice: serviceType === 'oneWay' && hasPicketing ? basePrice - picketingFee : basePrice,
    picketingFee,
    totalPrice,
  };
}

export function formatPrice(price: number): string {
  return `$${price.toLocaleString()}`;
}
