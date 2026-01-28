import { type EventBannerLocale, type Prisma } from '@prisma/client';

type LoadingBannerImage = {
  locale: EventBannerLocale;
  imageUrl: string;
  alt: string | null;
};

type LoadingRibbonBanner = {
  id: string;
  title: Prisma.JsonValue;
  linkUrl: string | null;
  EventBannerImage: LoadingBannerImage[];
};

export const LOADING_RIBBON_BANNERS: LoadingRibbonBanner[] = [
  {
    id: '5b4db6fa-6975-4a3c-abca-dd5d579097df',
    title: { en: 'top banner 1', ko: 'top banner 1', th: 'top banner 1' },
    linkUrl: 'https://www.k-doc.kr/notices/988d8bf8-b00b-4830-afc2-4f9997fadef0',
    EventBannerImage: [
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/th/88710117-506c-4bd2-848c-488cb33b22bb.png', alt: 'TH_banner_top_1.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/en/59ea8d74-3a89-46af-ab3e-e82a7054a376.png', alt: 'KR_EN_banner_top_1.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/ja/72e57d51-b56f-450b-ba79-5cacc9f4f6ec.png', alt: 'JP_banner_top_1.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/hi/467765d3-e3e2-46ae-85d1-cafa739f34b0.png', alt: 'HI_banner_top_1.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/zh/d0663173-b8c8-4cfa-8a36-30eb7c45720c.png', alt: 'CN_banner_top_1.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/5b4db6fa-6975-4a3c-abca-dd5d579097df/tl/fbc41e12-f4bb-496e-90e4-044778edb2a3.png', alt: 'PH_banner_top_1.png' },
    ],
  },
  {
    id: '3db4bbee-efa1-47df-84d8-24e47e28acb0',
    title: { en: 'top banner 2', ko: 'top banner 2', th: 'top banner 2' },
    linkUrl: 'https://www.k-doc.kr/notices/5d4e6dc1-4af1-4afd-b457-83ec8030d5f1',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/ko/5edd83e8-c5f5-4505-ae89-f8844eb6ed18.png', alt: 'banner_top_2.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/en/c74b21a8-f709-4a05-a5d0-392ef4702ce6.png', alt: 'banner_top_2.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/th/e455b52c-9a2f-4a1d-b4f0-775ff834cc74.png', alt: 'TH_banner_top_2.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/zh/db86804d-1b3c-435c-b905-5063542d7b51.png', alt: 'CN_banner_top_2.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/ja/0b246981-c077-4649-8b55-4579c8d81a08.png', alt: 'JP_banner_top_2.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/tl/a6b50c23-e083-4160-b3d2-44221d091680.png', alt: 'PH_banner_top_2.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3db4bbee-efa1-47df-84d8-24e47e28acb0/hi/4fba2bc9-3c5a-48d9-90a7-ec3e8bbedc8a.png', alt: 'HI_banner_top_2.png' },
    ],
  },
  {
    id: '744e20c8-ce57-4005-8419-6d962d7664f5',
    title: { en: 'top banner 3', ko: 'top banner 3', th: 'top banner 3' },
    linkUrl: 'https://www.k-doc.kr/notices/4800eb2d-94fa-4d05-aaa3-5ac93c13aed1',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/ko/fa015fc3-897d-483a-8c0e-954f5c10fdc8.png', alt: 'banner_top_3.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/en/af41dcbd-cc47-42d6-9a10-7a7de6edd5eb.png', alt: 'banner_top_3.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/th/45a15de5-abce-4e83-a1c0-d55b2386656e.png', alt: 'TH_banner_top_3.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/tl/c05db7f5-d0e5-4248-acd0-3b82924c3b5b.png', alt: 'PH_banner_top_3.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/ja/d79441ba-e6b8-4a92-9ab8-a756ae38f79e.png', alt: 'JP_banner_top_3.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/hi/687bd375-45eb-49a1-9251-4f0ed6621adf.png', alt: 'HI_banner_top_3.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/744e20c8-ce57-4005-8419-6d962d7664f5/zh/22ad7044-e2b3-4b6b-8b03-157cf86679b4.png', alt: 'CN_banner_top_3.png' },
    ],
  },
];
