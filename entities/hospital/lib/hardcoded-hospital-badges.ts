/**
 * 병원 배지 및 정렬 하드코딩 데이터
 * 기준: 배지_260615 (2026.06.15 업데이트)
 *
 * 이 파일은 임시 하드코딩입니다. 추후 어드민 기반 정식 설계로 대체 예정.
 */

type SpecialtyBadge = 'BEST' | 'HOT';

/**
 * 병원 ID → 카테고리(specialtyType) → 배지 매핑
 * 배지 없는 병원은 이 맵에 없거나 해당 specialtyType 키가 없음
 */
export const HARDCODED_BADGES: Record<string, Partial<Record<string, SpecialtyBadge>>> = {
  // 슈가성형외과의원
  '51f4c2ff-e0e6-4999-a1e1-9a0a81d4e223': { EYES: 'BEST' },
  // 마인드성형외과의원
  'b753dfd2-d560-433e-94f8-decc471ada73': { EYES: 'BEST', NOSE: 'BEST' },
  // 그날성형외과의원
  '73f220a7-33bf-424c-a6fb-647563ffe6ba': { EYES: 'BEST', NOSE: 'BEST', LIFTING: 'HOT' },
  // 지앤지병원
  '802a0a46-9c48-4e85-ab84-258d98ba22a2': { NOSE: 'BEST' },
  // 1%일퍼센트성형외과의원
  '5fcc9f87-40db-49f0-9d91-2d83689d0c5c': { FACIAL_CONTOURING: 'BEST' },
  // 마노성형외과의원
  '20c18c13-b80b-436c-b8c4-ddc914e1f8c1': { FACIAL_CONTOURING: 'BEST' },
  // 아이루미성형외과의원
  '2ab8c3e5-16b8-4632-bdd0-19afa885ffd4': { FACIAL_CONTOURING: 'BEST', EYES: 'HOT' },
  // 멜론성형외과의원
  '2904d7bd-27d8-476e-88e1-8bc59087e724': { BREAST: 'BEST' },
  // 카이성형외과의원
  '7678060f-ecc8-4497-9960-077c8a4e841a': { BREAST: 'BEST' },
  // 봉봉성형외과의원
  '7770d695-e625-47db-93db-2a94640db959': { BREAST: 'BEST' },
  // 밸런스랩성형외과의원
  '613de30c-dda9-466c-9013-79cd9607943f': { BODY_LINE: 'BEST', LIFTING: 'BEST' },
  // 스노우의원
  '931403cf-cb53-4284-a8db-94aaaa628e6f': { BODY_LINE: 'BEST', EYES: 'HOT' },
  // 라마르프리미어의원
  '1adc0654-0a68-41b0-a558-e36c4f24d711': { BODY_LINE: 'BEST', DERMATOLOGY: 'BEST' },
  // 모앤라인성형외과의원
  '87a12623-0b3e-427a-877b-f5e2678d1ffb': { HAIR_TRANSPLANT: 'BEST' },
  // 에이블룸성형외과의원
  'b7eb552c-0855-4aed-965d-f66bcb46b645': { DERMATOLOGY: 'BEST' },
  // V&MJ피부과의원
  'eca3cbc9-a2bb-4459-8966-a7091dd0678d': { DERMATOLOGY: 'BEST', LIFTING: 'HOT' },
  // 압구정미라클의원
  'ffda0620-c254-44db-8b13-ef4ef5d368e5': { LIFTING: 'BEST' },
  // 닥터송포유의원
  '78978a8f-57ca-41c2-9208-141b2bcc9ecb': { LIFTING: 'BEST' },
  // 청담쥬넥스의원
  'aa104f49-80b2-4ecc-9f1d-e7f640b8a083': { STEM_CELL: 'BEST' },
  // 원셀의원
  'aa19646d-16d2-429a-9646-a629a612082e': {
    STEM_CELL: 'BEST',
    EYES: 'HOT',
    NOSE: 'HOT',
    DERMATOLOGY: 'HOT',
  },
  // 셀이즈의원
  '57690891-90a9-43c2-935f-be59d81873d5': { STEM_CELL: 'BEST' },
  // 미니쉬치과병원
  'c9556a91-9a3d-4cc3-8bd0-9cd763b72a33': { DENTAL: 'BEST' },
  // 스마일러치과의원
  '9e028560-fa2e-4b00-8d25-cd54adbe5482': { DENTAL: 'BEST' },

  // ── HOT 배지 ──────────────────────────────────────────────────
  // 연세다인성형외과의원
  '20198317-7047-4dbd-b58b-78c8ef1a7373': { EYES: 'HOT', LIFTING: 'HOT' },
  // 에이비성형외과의원
  'fbda1a46-79f0-4679-b868-dfbef7f4da4d': { EYES: 'HOT' },
  // 티에스성형외과의원
  '1dafe158-2997-415d-9698-5b82714812a7': { EYES: 'HOT' },
  // 일미리성형외과의원
  '46581cee-d5df-4eff-9f45-2d145fa760ca': { EYES: 'HOT' },
  // 더난성형외과의원
  'fe28cbbd-c030-4407-83bb-3421c69a2192': { NOSE: 'HOT' },
  // 더도어성형외과의원
  '8adcf0ef-8d98-4bba-8fa4-3e7890d24b42': { NOSE: 'HOT' },
  // 위버스성형외과의원
  'c0dd6f33-f929-4492-b374-6c01860d8bfc': { NOSE: 'HOT' },
  // 첫단추의원
  'dc34294b-4bf7-4091-bef6-b4a130798f7a': { NOSE: 'HOT' },
  // 프라이빗성형외과의원
  '61209ed7-e4bd-4ab0-8e3e-0f3f4e7cd1b1': { NOSE: 'HOT' },
  // 히트성형외과의원
  'f6713cb2-35f4-4be9-84ed-526c9d18f90b': { NOSE: 'HOT' },
  // 서울페이스21치과병원
  'ed0225a2-8b62-405a-a264-b2e61a33f99f': { FACIAL_CONTOURING: 'HOT', DENTAL: 'HOT' },
  // 이유구강악안면외과치과의원
  '6e7a7ed3-0600-4675-850c-6b06d4312964': { FACIAL_CONTOURING: 'HOT' },
  // 타코성형외과의원
  '9b853f6b-d56e-43ef-9c0f-fe57ca6aceb9': { FACIAL_CONTOURING: 'HOT' },
  // 새김성형외과의원
  '9474b7fa-3783-4a17-8a33-9a8440772267': { FACIAL_CONTOURING: 'HOT' },
  // 본디성형외과의원
  '4c0e539f-5714-4ae8-9be8-ad6a276a9efa': { FACIAL_CONTOURING: 'HOT' },
  // 브라운성형외과의원
  '6338404f-d00e-454a-8272-05b1cd621c26': { FACIAL_CONTOURING: 'HOT' },
  // 우리성형외과의원
  '52786191-2d69-40f6-b18f-e1749a9755df': { FACIAL_CONTOURING: 'HOT' },
  // 노트성형외과의원
  '56eec8a8-3c11-43ab-ac9e-52e1b44d8e60': { BREAST: 'HOT' },
  // 물방울성형외과의원
  'b4d33dce-316d-4895-99c2-83537a5a5b33': { BREAST: 'HOT' },
  // 엠디외과의원
  '4c9a0fcc-5439-4d61-a8f5-faf79316a1b8': { BREAST: 'HOT' },
  // UBA성형외과의원
  '5708f9a5-8a3f-4582-bdcb-86e423bad9da': { BREAST: 'HOT' },
  // 라비앙성형외과의원
  '120acf81-af6a-442b-8640-18148fa5689b': { BREAST: 'HOT' },
  // 뷰성형외과의원
  '29fad1f1-e7ad-48e4-957a-c01e9fb7e452': { BREAST: 'HOT' },
  // 에이트성형외과의원
  'fb5711d5-9d88-4419-936b-1966ab779383': { BREAST: 'HOT' },
  // 허쉬성형외과의원
  '2ec5f65d-6d5a-40c0-b21a-0aade964a1de': { BODY_LINE: 'HOT' },
  // 플랜에스의원
  '92a06dc1-89de-429e-ae80-75802b002697': { BODY_LINE: 'HOT' },
  // 247클리닉
  'e85b8cd8-48ee-456e-99d2-1f56fe39d078': { BODY_LINE: 'HOT' },
  // 지우개의원
  'c21b9841-a94c-40c7-8ff1-a2943b986136': { BODY_LINE: 'HOT' },
  // G7클리닉
  'dc8b301c-dfa3-4e29-a1e1-4d5e513ef2ab': { BODY_LINE: 'HOT' },
  // 뽐나게빼의원
  'e3e4ea11-8d52-4632-af8e-fb0cd6ad38f1': { BODY_LINE: 'HOT' },
  // 초이스라인의원
  '0c3bf67f-b9d8-49be-afdc-16c36a594374': { BODY_LINE: 'HOT' },
  // 모제림성형외과의원
  '040b5e1f-4b9b-4b81-a993-206ac2735982': { HAIR_TRANSPLANT: 'HOT' },
  // 모플러스성형외과의원
  'afceb401-5c20-45d4-94e2-97dc4057c974': { HAIR_TRANSPLANT: 'HOT' },
  // 옥건헤어라인의원
  '1894e078-b36a-4a62-96b3-0d5aa910c3c6': { HAIR_TRANSPLANT: 'HOT' },
  // 강남로미모의원
  'c3112c9b-b97a-4047-85f6-073a88b10306': { HAIR_TRANSPLANT: 'HOT' },
  // 모디헤어플란트의원
  'c4427a81-1057-4b6d-b8bf-2a56d6ab7c95': { HAIR_TRANSPLANT: 'HOT' },
  // 모앤블레스의원
  '463c806d-57b8-47a3-86ff-82a1f5c2a17e': { HAIR_TRANSPLANT: 'HOT' },
  // 모우림의원
  '19c18bbb-a9c8-43c5-b92b-17b7d7db50df': { HAIR_TRANSPLANT: 'HOT' },
  // 청담잇츠미의원
  '55310de9-f592-4ed0-b1c4-561f1f03376d': { DERMATOLOGY: 'HOT' },
  // 르에이치의원
  'efce9a7a-1485-44b7-8adb-efa769ae7eeb': { DERMATOLOGY: 'HOT' },
  // 클래스원의원
  '0a63202b-716e-4c05-ad73-20d03bf65cf8': { DERMATOLOGY: 'HOT' },
  // 디캐럿의원
  '470a1116-1218-49df-9526-b721030e7874': { DERMATOLOGY: 'HOT' },
  // 문의원
  'edc77b17-0a1f-4337-91a9-256f2febeb40': { DERMATOLOGY: 'HOT' },
  // 리뉴얼의원
  '6b243fa3-99ca-417c-9145-1ccacaa46191': { DERMATOLOGY: 'HOT' },
  // 피그마리온의원
  '035d29cf-be68-48f4-b746-c09f72fbb8ee': { LIFTING: 'HOT' },
  // 밴셀의원
  'f2dcb79c-db05-4a22-8b07-ed09b4d4dc26': { STEM_CELL: 'HOT' },
  // 셀리크의원
  '657fcf1b-69e0-490d-95c4-fa608d1984f1': { STEM_CELL: 'HOT' },
  // 르메디크의원
  'f7785177-2531-4c85-8e2d-0795ad600fd2': { STEM_CELL: 'HOT' },
  // 강남세란의원
  'f6d03968-5334-424b-b464-984d3f1ef439': { STEM_CELL: 'HOT' },
  // 비올라셀성형외과의원
  '7592dfce-bc35-4da4-b6f6-e235f6ce9696': { STEM_CELL: 'HOT' },
  // 셀업성형외과의원
  '72ea54c8-1894-42c1-9fd3-5efdce79fdeb': { STEM_CELL: 'HOT' },
  // 청담셀의원
  '6794269f-5c04-4eef-a0db-b46b946c8ddb': { STEM_CELL: 'HOT' },
  // 뉴라인치과의원
  'dbc7a385-c39f-41c8-b987-bbcecc280cc7': { DENTAL: 'HOT' },
  // 더페이스치과의원
  '572a53d0-0021-4e49-9a18-cdffa32ee0a7': { DENTAL: 'HOT' },
  // 세라치과의원
  '89441eff-967a-491e-b251-d738b90f0269': { DENTAL: 'HOT' },
  // 임플란피아치과의원
  'b1c085d7-1f3d-468f-99b1-dd8fdaec6458': { DENTAL: 'HOT' },
  // 제아치과의원
  'a3882e8c-7a88-423b-9730-0e4f0af8b02a': { DENTAL: 'HOT' },
  // 청담라인치과의원
  '4eeea1bb-6ff2-4891-95f2-446c9a678907': { DENTAL: 'HOT' },
};

/**
 * 카테고리별 병원 표시 순서 (추천 탭 기준, 2026.06.15)
 * BEST 배지 병원 → HOT 배지 병원 → 배지없음 순으로 정렬될 때
 * 동일 배지 그룹 내 세부 순서를 결정하는 데 사용됨
 */
export const HARDCODED_SORT_ORDER: Record<string, string[]> = {
  EYES: [
    '51f4c2ff-e0e6-4999-a1e1-9a0a81d4e223', // 슈가성형외과의원 (BEST)
    'b753dfd2-d560-433e-94f8-decc471ada73', // 마인드성형외과의원 (BEST)
    '931403cf-cb53-4284-a8db-94aaaa628e6f', // 스노우의원 (HOT)
    'aa19646d-16d2-429a-9646-a629a612082e', // 원셀의원 (HOT)
    '2ab8c3e5-16b8-4632-bdd0-19afa885ffd4', // 아이루미성형외과의원 (HOT)
    '20198317-7047-4dbd-b58b-78c8ef1a7373', // 연세다인성형외과의원 (HOT)
    '73f220a7-33bf-424c-a6fb-647563ffe6ba', // 그날성형외과의원 (BEST)
  ],
  NOSE: [
    '802a0a46-9c48-4e85-ab84-258d98ba22a2', // 지앤지병원 (BEST)
    'b753dfd2-d560-433e-94f8-decc471ada73', // 마인드성형외과의원 (BEST)
    'aa19646d-16d2-429a-9646-a629a612082e', // 원셀의원 (HOT)
    '73f220a7-33bf-424c-a6fb-647563ffe6ba', // 그날성형외과의원 (BEST)
    'fe28cbbd-c030-4407-83bb-3421c69a2192', // 더난성형외과의원 (HOT)
    '8adcf0ef-8d98-4bba-8fa4-3e7890d24b42', // 더도어성형외과의원 (HOT)
    'c0dd6f33-f929-4492-b374-6c01860d8bfc', // 위버스성형외과의원 (HOT)
  ],
  FACIAL_CONTOURING: [
    '5fcc9f87-40db-49f0-9d91-2d83689d0c5c', // 1%일퍼센트성형외과의원 (BEST)
    '20c18c13-b80b-436c-b8c4-ddc914e1f8c1', // 마노성형외과의원 (BEST)
    '2ab8c3e5-16b8-4632-bdd0-19afa885ffd4', // 아이루미성형외과의원 (BEST)
    'ed0225a2-8b62-405a-a264-b2e61a33f99f', // 서울페이스21치과병원 (HOT)
    '6e7a7ed3-0600-4675-850c-6b06d4312964', // 이유구강악안면외과치과의원 (HOT)
    '9b853f6b-d56e-43ef-9c0f-fe57ca6aceb9', // 타코성형외과의원 (HOT)
    '9474b7fa-3783-4a17-8a33-9a8440772267', // 새김성형외과의원 (HOT)
  ],
  BREAST: [
    '2904d7bd-27d8-476e-88e1-8bc59087e724', // 멜론성형외과의원 (BEST)
    '7678060f-ecc8-4497-9960-077c8a4e841a', // 카이성형외과의원 (BEST)
    '7770d695-e625-47db-93db-2a94640db959', // 봉봉성형외과의원 (BEST)
    '56eec8a8-3c11-43ab-ac9e-52e1b44d8e60', // 노트성형외과의원 (HOT)
    'b4d33dce-316d-4895-99c2-83537a5a5b33', // 물방울성형외과의원 (HOT)
    '4c9a0fcc-5439-4d61-a8f5-faf79316a1b8', // 엠디외과의원 (HOT)
    '5708f9a5-8a3f-4582-bdcb-86e423bad9da', // UBA성형외과의원 (HOT)
  ],
  BODY_LINE: [
    '613de30c-dda9-466c-9013-79cd9607943f', // 밸런스랩성형외과의원 (BEST)
    '931403cf-cb53-4284-a8db-94aaaa628e6f', // 스노우의원 (BEST)
    '1adc0654-0a68-41b0-a558-e36c4f24d711', // 라마르프리미어의원 (BEST)
    '2ec5f65d-6d5a-40c0-b21a-0aade964a1de', // 허쉬성형외과의원 (HOT)
    '92a06dc1-89de-429e-ae80-75802b002697', // 플랜에스의원 (HOT)
    'e85b8cd8-48ee-456e-99d2-1f56fe39d078', // 247클리닉 (HOT)
    'c21b9841-a94c-40c7-8ff1-a2943b986136', // 지우개의원 (HOT)
  ],
  HAIR_TRANSPLANT: [
    '87a12623-0b3e-427a-877b-f5e2678d1ffb', // 모앤라인성형외과의원 (BEST)
    '040b5e1f-4b9b-4b81-a993-206ac2735982', // 모제림성형외과의원 (HOT)
    'afceb401-5c20-45d4-94e2-97dc4057c974', // 모플러스성형외과의원 (HOT)
    '1894e078-b36a-4a62-96b3-0d5aa910c3c6', // 옥건헤어라인의원 (HOT)
    'c3112c9b-b97a-4047-85f6-073a88b10306', // 강남로미모의원 (HOT)
    'c4427a81-1057-4b6d-b8bf-2a56d6ab7c95', // 모디헤어플란트의원 (HOT)
    '463c806d-57b8-47a3-86ff-82a1f5c2a17e', // 모앤블레스의원 (HOT)
  ],
  DERMATOLOGY: [
    'b7eb552c-0855-4aed-965d-f66bcb46b645', // 에이블룸성형외과의원 (BEST)
    'eca3cbc9-a2bb-4459-8966-a7091dd0678d', // V&MJ피부과의원 (BEST)
    '55310de9-f592-4ed0-b1c4-561f1f03376d', // 청담잇츠미의원 (HOT)
    'aa19646d-16d2-429a-9646-a629a612082e', // 원셀의원 (HOT)
    '1adc0654-0a68-41b0-a558-e36c4f24d711', // 라마르프리미어의원 (BEST)
    'efce9a7a-1485-44b7-8adb-efa769ae7eeb', // 르에이치의원 (HOT)
    '0a63202b-716e-4c05-ad73-20d03bf65cf8', // 클래스원의원 (HOT)
  ],
  LIFTING: [
    'ffda0620-c254-44db-8b13-ef4ef5d368e5', // 압구정미라클의원 (BEST)
    '613de30c-dda9-466c-9013-79cd9607943f', // 밸런스랩성형외과의원 (BEST)
    '035d29cf-be68-48f4-b746-c09f72fbb8ee', // 피그마리온의원 (HOT)
    '78978a8f-57ca-41c2-9208-141b2bcc9ecb', // 닥터송포유의원 (BEST)
    '73f220a7-33bf-424c-a6fb-647563ffe6ba', // 그날성형외과의원 (HOT)
    'eca3cbc9-a2bb-4459-8966-a7091dd0678d', // V&MJ피부과의원 (HOT)
    '20198317-7047-4dbd-b58b-78c8ef1a7373', // 연세다인성형외과의원 (HOT)
  ],
  STEM_CELL: [
    'aa104f49-80b2-4ecc-9f1d-e7f640b8a083', // 청담쥬넥스의원 (BEST)
    'aa19646d-16d2-429a-9646-a629a612082e', // 원셀의원 (BEST)
    '57690891-90a9-43c2-935f-be59d81873d5', // 셀이즈의원 (BEST)
    'f2dcb79c-db05-4a22-8b07-ed09b4d4dc26', // 밴셀의원 (HOT)
    '657fcf1b-69e0-490d-95c4-fa608d1984f1', // 셀리크의원 (HOT)
    'f7785177-2531-4c85-8e2d-0795ad600fd2', // 르메디크의원 (HOT)
    'f6d03968-5334-424b-b464-984d3f1ef439', // 강남세란의원 (HOT)
  ],
  DENTAL: [
    'c9556a91-9a3d-4cc3-8bd0-9cd763b72a33', // 미니쉬치과병원 (BEST)
    '9e028560-fa2e-4b00-8d25-cd54adbe5482', // 스마일러치과의원 (BEST)
    'ed0225a2-8b62-405a-a264-b2e61a33f99f', // 서울페이스21치과병원 (HOT)
    'dbc7a385-c39f-41c8-b987-bbcecc280cc7', // 뉴라인치과의원 (HOT)
    '572a53d0-0021-4e49-9a18-cdffa32ee0a7', // 더페이스치과의원 (HOT)
    '89441eff-967a-491e-b251-d738b90f0269', // 세라치과의원 (HOT)
    'b1c085d7-1f3d-468f-99b1-dd8fdaec6458', // 임플란피아치과의원 (HOT)
  ],
};

/**
 * 추천 탭에 노출될 병원 순서 (엑셀 추천 리스트 기준, 2026.06.15)
 * 정렬: BEST 배지 병원 먼저 → HOT 배지 병원 → 배지없음
 * 동일 배지 그룹 내에서는 각 카테고리 추천 리스트에서의 첫 등장 순서를 따름
 *
 * BEST 그룹 (각 카테고리 중 하나라도 BEST 배지가 있는 병원)
 */
export const HARDCODED_RECOMMEND_ORDER: string[] = [
  // ── 고정 1등 ─────────────────────────────────────────────────
  'ffda0620-c254-44db-8b13-ef4ef5d368e5', // 압구정미라클의원 (무조건 1순위)

  // ── BEST 그룹 ────────────────────────────────────────────────
  '51f4c2ff-e0e6-4999-a1e1-9a0a81d4e223', // 슈가성형외과의원
  'b753dfd2-d560-433e-94f8-decc471ada73', // 마인드성형외과의원
  '931403cf-cb53-4284-a8db-94aaaa628e6f', // 스노우의원 (바디라인 BEST)
  'aa19646d-16d2-429a-9646-a629a612082e', // 원셀의원 (줄기세포 BEST)
  '2ab8c3e5-16b8-4632-bdd0-19afa885ffd4', // 아이루미성형외과의원 (안면윤곽 BEST)
  '73f220a7-33bf-424c-a6fb-647563ffe6ba', // 그날성형외과의원
  '802a0a46-9c48-4e85-ab84-258d98ba22a2', // 지앤지병원
  '5fcc9f87-40db-49f0-9d91-2d83689d0c5c', // 1%일퍼센트성형외과의원
  '20c18c13-b80b-436c-b8c4-ddc914e1f8c1', // 마노성형외과의원
  '2904d7bd-27d8-476e-88e1-8bc59087e724', // 멜론성형외과의원
  '7678060f-ecc8-4497-9960-077c8a4e841a', // 카이성형외과의원
  '7770d695-e625-47db-93db-2a94640db959', // 봉봉성형외과의원
  '613de30c-dda9-466c-9013-79cd9607943f', // 밸런스랩성형외과의원
  '1adc0654-0a68-41b0-a558-e36c4f24d711', // 라마르프리미어의원
  '87a12623-0b3e-427a-877b-f5e2678d1ffb', // 모앤라인성형외과의원
  'b7eb552c-0855-4aed-965d-f66bcb46b645', // 에이블룸성형외과의원
  'eca3cbc9-a2bb-4459-8966-a7091dd0678d', // V&MJ피부과의원
  '78978a8f-57ca-41c2-9208-141b2bcc9ecb', // 닥터송포유의원
  'aa104f49-80b2-4ecc-9f1d-e7f640b8a083', // 청담쥬넥스의원
  '57690891-90a9-43c2-935f-be59d81873d5', // 셀이즈의원
  'c9556a91-9a3d-4cc3-8bd0-9cd763b72a33', // 미니쉬치과병원
  '9e028560-fa2e-4b00-8d25-cd54adbe5482', // 스마일러치과의원

  // ── HOT 그룹 ─────────────────────────────────────────────────
  '20198317-7047-4dbd-b58b-78c8ef1a7373', // 연세다인성형외과의원
  'fe28cbbd-c030-4407-83bb-3421c69a2192', // 더난성형외과의원
  '8adcf0ef-8d98-4bba-8fa4-3e7890d24b42', // 더도어성형외과의원
  'c0dd6f33-f929-4492-b374-6c01860d8bfc', // 위버스성형외과의원
  'ed0225a2-8b62-405a-a264-b2e61a33f99f', // 서울페이스21치과병원
  '6e7a7ed3-0600-4675-850c-6b06d4312964', // 이유구강악안면외과치과의원
  '9b853f6b-d56e-43ef-9c0f-fe57ca6aceb9', // 타코성형외과의원
  '9474b7fa-3783-4a17-8a33-9a8440772267', // 새김성형외과의원
  '56eec8a8-3c11-43ab-ac9e-52e1b44d8e60', // 노트성형외과의원
  'b4d33dce-316d-4895-99c2-83537a5a5b33', // 물방울성형외과의원
  '4c9a0fcc-5439-4d61-a8f5-faf79316a1b8', // 엠디외과의원
  '5708f9a5-8a3f-4582-bdcb-86e423bad9da', // UBA성형외과의원
  '2ec5f65d-6d5a-40c0-b21a-0aade964a1de', // 허쉬성형외과의원
  '92a06dc1-89de-429e-ae80-75802b002697', // 플랜에스의원
  'e85b8cd8-48ee-456e-99d2-1f56fe39d078', // 247클리닉
  'c21b9841-a94c-40c7-8ff1-a2943b986136', // 지우개의원
  '040b5e1f-4b9b-4b81-a993-206ac2735982', // 모제림성형외과의원
  'afceb401-5c20-45d4-94e2-97dc4057c974', // 모플러스성형외과의원
  '1894e078-b36a-4a62-96b3-0d5aa910c3c6', // 옥건헤어라인의원
  'c3112c9b-b97a-4047-85f6-073a88b10306', // 강남로미모의원
  'c4427a81-1057-4b6d-b8bf-2a56d6ab7c95', // 모디헤어플란트의원
  '463c806d-57b8-47a3-86ff-82a1f5c2a17e', // 모앤블레스의원
  '55310de9-f592-4ed0-b1c4-561f1f03376d', // 청담잇츠미의원
  'efce9a7a-1485-44b7-8adb-efa769ae7eeb', // 르에이치의원
  '0a63202b-716e-4c05-ad73-20d03bf65cf8', // 클래스원의원
  '035d29cf-be68-48f4-b746-c09f72fbb8ee', // 피그마리온의원
  'f2dcb79c-db05-4a22-8b07-ed09b4d4dc26', // 밴셀의원
  '657fcf1b-69e0-490d-95c4-fa608d1984f1', // 셀리크의원
  'f7785177-2531-4c85-8e2d-0795ad600fd2', // 르메디크의원
  'f6d03968-5334-424b-b464-984d3f1ef439', // 강남세란의원
  'dbc7a385-c39f-41c8-b987-bbcecc280cc7', // 뉴라인치과의원
  '572a53d0-0021-4e49-9a18-cdffa32ee0a7', // 더페이스치과의원
  '89441eff-967a-491e-b251-d738b90f0269', // 세라치과의원
  'b1c085d7-1f3d-468f-99b1-dd8fdaec6458', // 임플란피아치과의원
];

/**
 * 추천 탭에서 표시할 배지를 결정
 * 해당 병원이 어느 카테고리에서든 BEST이면 'BEST', 아니면 HOT이면 'HOT', 없으면 null
 */
export function getRecommendBadge(hospitalId: string): SpecialtyBadge | null {
  const badges = HARDCODED_BADGES[hospitalId];
  if (!badges) return null;
  const values = Object.values(badges);
  if (values.includes('BEST')) return 'BEST';
  if (values.includes('HOT')) return 'HOT';
  return null;
}

/**
 * 배지 우선순위 (낮을수록 우선)
 * BEST=0, HOT=1, 없음=2
 */
function getBadgePriority(badge: SpecialtyBadge | undefined): number {
  if (badge === 'BEST') return 0;
  if (badge === 'HOT') return 1;
  return 2;
}

/**
 * 하드코딩된 배지와 정렬 기준으로 병원 목록을 정렬
 * 정렬 기준: 1순위 BEST → 2순위 HOT → 3순위 배지없음
 * 동일 배지 그룹 내에서는 HARDCODED_SORT_ORDER 순서를 따름
 */
export function sortHospitalsByHardcodedOrder<T extends { id: string }>(
  hospitals: T[],
  specialtyType: string,
): T[] {
  const sortOrder = HARDCODED_SORT_ORDER[specialtyType] ?? [];
  const sortIndexMap = new Map(sortOrder.map((id, idx) => [id, idx]));

  return [...hospitals].sort((a, b) => {
    const badgeA = HARDCODED_BADGES[a.id]?.[specialtyType];
    const badgeB = HARDCODED_BADGES[b.id]?.[specialtyType];

    const priorityDiff = getBadgePriority(badgeA) - getBadgePriority(badgeB);
    if (priorityDiff !== 0) return priorityDiff;

    const posA = sortIndexMap.get(a.id) ?? Infinity;
    const posB = sortIndexMap.get(b.id) ?? Infinity;
    if (posA !== posB) return posA - posB;

    return a.id.localeCompare(b.id);
  });
}
