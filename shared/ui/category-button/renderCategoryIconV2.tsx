import { RecommendedIconV2 } from './RecommendedIconV2';
import { AllIconV2 } from './AllIconV2';
import {
  EyesIconV2Small,
  NoseIconV2Small,
  LiftingIconV2Small,
  FacialContouringIconV2Small,
  BreastIconV2Small,
  StemCellIconV2Small,
  LiposuctionIconV2Small,
  BodyIconV2Small,
  HairTransplantIconV2Small,
  DermatologyIconV2Small,
  DentalIconV2Small,
  OtherIconV2Small,
} from 'features/quick-menu/ui/icons';

interface RenderCategoryIconV2Props {
  categoryType: string;
  isActive: boolean;
  fallbackIcon?: () => React.ReactNode;
  variant?: 'recommend' | 'all';
}

const CATEGORY_ICON_MAP: Record<string, () => React.ReactNode> = {
  EYES: () => <EyesIconV2Small />,
  NOSE: () => <NoseIconV2Small />,
  LIFTING: () => <LiftingIconV2Small />,
  FACIAL_CONTOURING: () => <FacialContouringIconV2Small />,
  BREAST: () => <BreastIconV2Small />,
  STEM_CELL: () => <StemCellIconV2Small />,
  LIPOSUCTION: () => <LiposuctionIconV2Small />,
  BODY: () => <BodyIconV2Small />,
  HAIR_TRANSPLANT: () => <HairTransplantIconV2Small />,
  DERMATOLOGY: () => <DermatologyIconV2Small />,
  DENTAL: () => <DentalIconV2Small />,
  ETC: () => <OtherIconV2Small />,
  OTHER: () => <OtherIconV2Small />,
};

function CategoryIconCard({
  icon,
  isActive,
}: {
  icon: () => React.ReactNode;
  isActive: boolean;
}) {
  return (
    <div
      className='flex size-[50px] shrink-0 items-center justify-center rounded-2xl'
      style={{
        background: `linear-gradient(${isActive ? 'var(--color-primary-200)' : 'white'}, ${isActive ? 'var(--color-primary-200)' : 'white'}) padding-box, linear-gradient(90deg, #3E57E2 0%, #B133FF 40%, var(--color-sub-900) 100%) border-box`,
        border: `${isActive ? '2px' : '1px'} solid transparent`,
      }}
    >
      {icon()}
    </div>
  );
}

export function renderCategoryIconV2({
  categoryType,
  isActive,
  fallbackIcon,
  variant = 'recommend',
}: RenderCategoryIconV2Props): React.ReactNode {
  if (categoryType === 'all') {
    if (variant === 'all') {
      return <CategoryIconCard icon={() => <AllIconV2 />} isActive={isActive} />;
    }
    return <CategoryIconCard icon={() => <RecommendedIconV2 />} isActive={isActive} />;
  }

  const iconFn = CATEGORY_ICON_MAP[categoryType];
  if (iconFn) {
    return <CategoryIconCard icon={iconFn} isActive={isActive} />;
  }

  if (fallbackIcon) {
    return (
      <div className='flex h-[50px] w-[50px] items-center justify-center'>{fallbackIcon()}</div>
    );
  }

  return null;
}
