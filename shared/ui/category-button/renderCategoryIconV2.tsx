import {
  RecommendedIconActive,
  RecommendedIconInactive,
  EyesIconActive,
  EyesIconInactive,
  NoseIconActive,
  NoseIconInactive,
  LiftingIconActive,
  LiftingIconInactive,
  FacialContouringIconActive,
  FacialContouringIconInactive,
  BreastIconActive,
  BreastIconInactive,
  StemCellIconActive,
  StemCellIconInactive,
  LiposuctionIconActive,
  LiposuctionIconInactive,
  BodyIconActive,
  BodyIconInactive,
  HairTransplantIconActive,
  HairTransplantIconInactive,
  DermatologyIconActive,
  DermatologyIconInactive,
  DentalIconActive,
  DentalIconInactive,
  OtherIconActive,
  OtherIconInactive,
} from './CategoryIconsV2';

interface RenderCategoryIconV2Props {
  categoryType: string;
  isActive: boolean;
  fallbackIcon?: () => React.ReactNode;
}

export function renderCategoryIconV2({
  categoryType,
  isActive,
  fallbackIcon,
}: RenderCategoryIconV2Props): React.ReactNode {
  const isRecommended = categoryType === 'all';

  if (isRecommended) {
    return isActive ? <RecommendedIconActive /> : <RecommendedIconInactive />;
  }

  if (categoryType === 'EYES') {
    return isActive ? <EyesIconActive /> : <EyesIconInactive />;
  }

  if (categoryType === 'NOSE') {
    return isActive ? <NoseIconActive /> : <NoseIconInactive />;
  }

  if (categoryType === 'LIFTING') {
    return isActive ? <LiftingIconActive /> : <LiftingIconInactive />;
  }

  if (categoryType === 'FACIAL_CONTOURING') {
    return isActive ? <FacialContouringIconActive /> : <FacialContouringIconInactive />;
  }

  if (categoryType === 'BREAST') {
    return isActive ? <BreastIconActive /> : <BreastIconInactive />;
  }

  if (categoryType === 'STEM_CELL') {
    return isActive ? <StemCellIconActive /> : <StemCellIconInactive />;
  }

  if (categoryType === 'LIPOSUCTION') {
    return isActive ? <LiposuctionIconActive /> : <LiposuctionIconInactive />;
  }

  if (categoryType === 'BODY') {
    return isActive ? <BodyIconActive /> : <BodyIconInactive />;
  }

  if (categoryType === 'HAIR_TRANSPLANT') {
    return isActive ? <HairTransplantIconActive /> : <HairTransplantIconInactive />;
  }

  if (categoryType === 'DERMATOLOGY') {
    return isActive ? <DermatologyIconActive /> : <DermatologyIconInactive />;
  }

  if (categoryType === 'DENTAL') {
    return isActive ? <DentalIconActive /> : <DentalIconInactive />;
  }

  if (categoryType === 'ETC' || categoryType === 'OTHER') {
    return isActive ? <OtherIconActive /> : <OtherIconInactive />;
  }

  // 기타 카테고리는 fallback 아이콘 사용
  if (fallbackIcon) {
    return (
      <div className='flex h-[50px] w-[50px] items-center justify-center'>{fallbackIcon()}</div>
    );
  }

  return null;
}
