/**
 * 카테고리 타입에 따라 해당하는 SVG 배경 경로를 반환합니다.
 * 기본값은 EYES SVG입니다.
 */
export function getCategoryBackgroundSvg(categoryType: string): string {
  const svgMap: Record<string, string> = {
    EYES: '/shared/ui/category-button/assets/shining_effect_1_eyes.svg',
    NOSE: '/shared/ui/category-button/assets/shining_effect_2_nose.svg',
    LIFTING: '/shared/ui/category-button/assets/shining_effect_3_lifting.svg',
    FACIAL_CONTOURING: '/shared/ui/category-button/assets/shining_effect_4_face.svg',
    BREAST: '/shared/ui/category-button/assets/shining_effect_5_breast.svg',
    LIPOSUCTION: '/shared/ui/category-button/assets/shining_effect_6_body.svg',
    HAIR_TRANSPLANT: '/shared/ui/category-button/assets/shining_effect_7_hair.svg',
    STEM_CELL: '/shared/ui/category-button/assets/shining_effect_8_cell.svg',
    DERMATOLOGY: '/shared/ui/category-button/assets/shining_effect_9_derma.svg',
    DENTAL: '/shared/ui/category-button/assets/shining_effect_10_dental.svg',
  };

  return svgMap[categoryType] || svgMap.EYES;
}

