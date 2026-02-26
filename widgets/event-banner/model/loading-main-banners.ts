import { type EventBannerLocale, type Prisma } from '@prisma/client';

type LoadingBannerImage = {
  locale: EventBannerLocale;
  imageUrl: string;
  alt: string | null;
};

type LoadingMainBanner = {
  id: string;
  title: Prisma.JsonValue;
  linkUrl: string | null;
  EventBannerImage: LoadingBannerImage[];
};

export const LOADING_MAIN_BANNERS: LoadingMainBanner[] = [
  {
    id: '3b1e2f60-832f-47b9-bc96-acc772c1334a',
    title: { en: 'abloom', ko: 'abloom', th: 'abloom' },
    linkUrl: 'https://www.k-doc.kr/hospital/b7eb552c-0855-4aed-965d-f66bcb46b645',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/ko/5ec7d359-37b5-406e-9c95-16971a7893e8.png', alt: 'KR_banner_main_abloom.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/en/0855b923-040a-497d-b517-886c0d4ec108.png', alt: 'EN_banner_main_abloom.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/th/2f03487f-d79a-4e4c-bd17-f95527f43b10.png', alt: 'TH_banner_main_abloom.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/zh/19b7e226-fd21-460f-a1aa-24d1c8846d6c.png', alt: 'CN_banner_main_abloom.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/ja/0bdc54eb-5385-41f8-90d3-ac83556277dc.png', alt: 'JP_banner_main_abloom.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/hi/776f34cd-1a23-4111-bea9-a3728ddd6920.png', alt: 'HI_banner_main_abloom.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/tl/78600cab-d35a-464c-a24e-474e44dafd83.png', alt: 'PH_banner_main_abloom.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/ar/306b0e4b-975c-47a6-a140-5ea1e4950e0f.png', alt: 'AR_banner_main_abloom.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/3b1e2f60-832f-47b9-bc96-acc772c1334a/ru/469a9151-2d7c-4efa-af8e-d1f0f85fde72.png', alt: 'RU_banner_main_abloom.png' },
    ],
  },
  {
    id: 'f56bee28-4591-4313-b1ec-84d3629d152b',
    title: { en: 'Premium Medical Packages', ko: 'Premium Medical Packages', th: 'Premium Medical Packages' },
    linkUrl: 'https://www.k-doc.kr/event/package',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/ko/f0347654-aacb-493f-8dc1-eeb757a2ff0e.png', alt: 'KR_banner_main_2.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/en/059695b7-1e69-4525-b500-3aad9688c111.png', alt: 'EN_banner_main_2.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/th/7e4d1b10-987f-4738-ac1a-86b100bd0f2b.png', alt: 'TH_banner_main_2.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/zh/c67ba062-7f83-4908-a5f8-b05db16db349.png', alt: 'CN_banner_main_premium.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/ja/91a534a0-9534-434b-9f5e-6257803c9b50.png', alt: 'JP_banner_main_premium.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/hi/ae0d06af-dc76-49c1-8cb8-c0cd5d61ad3e.png', alt: 'HI_banner_main_premium.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/tl/4cd60203-0f57-4b98-9742-48b816b12323.png', alt: 'PH_banner_main_premium.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/ar/d86bde60-7d68-4384-bc85-c516eb89d49d.png', alt: 'AR_banner_main_premium.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/f56bee28-4591-4313-b1ec-84d3629d152b/ru/21638ba6-af29-40d2-9a06-66dceb4eadac.png', alt: 'RU_banner_main_2.png' },
    ],
  },
  {
    id: 'd8911514-bcf2-4196-ad0d-3232923fa33f',
    title: { en: 'V&MJ', ko: 'V&MJ', th: 'V&MJ' },
    linkUrl: 'https://www.k-doc.kr/hospital/eca3cbc9-a2bb-4459-8966-a7091dd0678d',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/ko/caa63f20-6026-42f9-a3a6-dbe1d0b94259.png', alt: 'KR_banner_main_v&mj.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/en/f697ebe5-47b4-497f-b150-09567e39d75c.png', alt: 'EN_banner_main_v&mj.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/th/8d3bb033-f6ba-4dd3-8052-fffa48682562.png', alt: 'TH_banner_main_v&mj.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/zh/507f3884-e7cd-43f5-b086-68db090b9989.png', alt: 'CN_banner_main_v&mj.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/ja/2bbbdee8-7e44-48f4-800d-d25fa0a1dfc9.png', alt: 'JP_banner_main_v&mj.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/hi/60f38c06-3e14-421a-a5f8-7252f515a16f.png', alt: 'HI_banner_main_v&mj.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/tl/95949ec3-3232-49a8-95d7-0e99a87cc9c8.png', alt: 'PH_banner_main_v&mj.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/ar/d6b4692e-51f8-49d6-84aa-9ae36febf89d.png', alt: 'AR_banner_main_v&mj.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d8911514-bcf2-4196-ad0d-3232923fa33f/ru/4df9cab7-2ab4-46d2-afa0-d0d80f25ef6a.png', alt: 'RU_banner_main_v&mj.png' },
    ],
  },
  {
    id: 'd0a12786-6605-4219-8b50-51f89be00425',
    title: { en: 'Apgujeong Miracle Clinic', ko: 'Apgujeong Miracle Clinic', th: 'Apgujeong Miracle Clinic' },
    linkUrl: 'https://www.k-doc.kr/hospital/ffda0620-c254-44db-8b13-ef4ef5d368e5',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/ko/aa830d3d-0bb6-4b5c-bb2a-6ad4facd23ee.png', alt: 'KR_banner_main_miracle.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/en/5345203c-6810-431a-81d5-95f4c2b56609.png', alt: 'EN_banner_main_miracle.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/th/caa303f2-7a17-4981-a10c-aaaf1c82b170.png', alt: 'TH_banner_main_miracle.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/zh/ed37df78-683a-47a1-bb78-14c2fe191c4d.png', alt: 'CN_banner_main_miracle.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/ja/4593a4e5-4218-40b3-9d1f-140b56aa42b0.png', alt: 'JP_banner_main_miracle.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/hi/9e291311-4596-48e2-be79-5b3860879b7a.png', alt: 'HI_banner_main_miracle.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/tl/f2da1a25-b6bc-4d1b-97af-e5f53620b732.png', alt: 'PH_banner_main_miracle.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/ar/a39c75f1-315e-4742-b948-d47ecbd19c45.png', alt: 'AR_banner_main_miracle.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/d0a12786-6605-4219-8b50-51f89be00425/ru/634144ec-3667-4cf5-87e7-a6812693d469.png', alt: 'RU_banner_main_miracle.png' },
    ],
  },
  {
    id: 'e5bc67e6-e339-48b0-aa1e-49d83b0a93f8',
    title: { en: '1% plastic surgery', ko: '1% plastic surgery', th: '1% plastic surgery' },
    linkUrl: 'https://www.k-doc.kr/hospital/5fcc9f87-40db-49f0-9d91-2d83689d0c5c',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/ko/2064e8df-b38d-4fea-9660-fb2e7def0917.png', alt: 'KR_banner_main_3.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/en/513b4f84-49b7-4c89-9a91-7990859b3f02.png', alt: 'EN_banner_main_3.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/th/45f04baa-3872-4de7-854a-e78a76e04bdd.png', alt: 'TH_banner_main_3.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/zh/91d77dc2-e876-40b0-8f61-ee8d12fa9428.png', alt: 'CN_banner_main_1%.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/ja/56435c7e-ebbc-4d70-a01f-59cd5a9d6716.png', alt: 'JP_banner_main_1%.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/hi/c6100366-1afe-4de7-9e24-6701bfa9b857.png', alt: 'HI_banner_main_1%.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/tl/2708b703-8ede-4c16-bdae-1a37ea1b8f52.png', alt: 'PH_banner_main_1%.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/ar/346a7660-ce60-4a6e-a95a-ce66ec6270a7.png', alt: 'AR_banner_main_1%.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e5bc67e6-e339-48b0-aa1e-49d83b0a93f8/ru/3de8da53-361f-4ad0-be11-c7a7d22a1e16.png', alt: 'RU_banner_main_3.png' },
    ],
  },
  {
    id: '67bac4c4-40f7-4780-b60f-4e7786526157',
    title: { en: 'Premium Concierge', ko: 'Premium Concierge', th: 'Premium Concierge' },
    linkUrl: null,
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/ko/0759a028-3be5-47d2-bd4d-2c21d064d32a.png', alt: 'EN_banner_mian_5.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/en/62e40e98-b0b7-469b-9b21-a8ec1bc24e50.png', alt: 'EN_banner_mian_5.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/th/546eeb5e-36ce-4c3d-a037-e62e31ee5c94.png', alt: 'TH_banner_mian_5.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/zh/1966047b-9253-46f9-a060-1e7be3ba57b3.png', alt: 'CN_banner_mian_concierge.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/ja/ee7a609c-88d8-40da-bb70-12006c3cca9f.png', alt: 'JP_banner_mian_concierge.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/hi/5e371afa-745f-4f9a-aa6b-f3f313f2b379.png', alt: 'HI_banner_mian_concierge.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/tl/d6616d20-e04c-4d27-b712-3359375c1b5c.png', alt: 'PH_banner_mian_concierge.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/ar/5d72803e-de7f-412b-b283-3d22344ab929.png', alt: 'AR_banner_mian_concierge.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/67bac4c4-40f7-4780-b60f-4e7786526157/ru/e51008ae-52d0-4158-ad4f-bea7c8f06431.png', alt: 'RU_banner_mian_5.png' },
    ],
  },
  {
    id: 'e2583eb3-e797-40d1-8ed0-37a24d71e925',
    title: { en: 'mind', ko: 'mind', th: 'mind' },
    linkUrl: 'https://www.k-doc.kr/hospital/b753dfd2-d560-433e-94f8-decc471ada73',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/ko/f71695f6-badd-4217-ac2c-159b2dd53064.png', alt: 'KR_banner_main_mind.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/en/6f7efcb1-bb59-49a3-a816-18e4e392592d.png', alt: 'EN_banner_main_mind.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/th/1ae0aeed-23b0-4991-a414-778a991317ca.png', alt: 'TH_banner_main_mind.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/zh/5eb96778-dedc-4c32-8d70-93b20fa7d6b5.png', alt: 'CN_banner_main_mind.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/ja/79076654-4569-47cb-b59a-6d83ebdf4863.png', alt: 'JP_banner_main_mind.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/hi/ea21df20-c646-465e-896b-82b966f1f06d.png', alt: '힌디어.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/tl/de7c27a7-46d1-49ea-93b8-9ba16501900a.png', alt: 'PH.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/ar/8eff31a1-4b95-4745-809d-26681a18574c.png', alt: 'AR_banner_main_mind.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/e2583eb3-e797-40d1-8ed0-37a24d71e925/ru/b9435d8c-7aa7-4691-929b-08d3ab135a54.png', alt: 'RU_banner_main_mind.png' },
    ],
  },
  {
    id: '6a989ad3-c3b4-47c0-bde2-7822362e6eb3',
    title: { en: 'Minish Dental Hospital', ko: 'Minish Dental Hospital', th: 'Minish Dental Hospital' },
    linkUrl: 'https://www.k-doc.kr/hospital/c9556a91-9a3d-4cc3-8bd0-9cd763b72a33',
    EventBannerImage: [
      { locale: 'ko', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/ko/ffbdabf3-e255-4fc5-91b4-cfffba1c6e90.png', alt: 'KR_banner_mian_1.png' },
      { locale: 'en', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/en/3405e8a5-9b81-478a-bab9-a3d670c770b8.png', alt: 'EN_banner_mian_1.png' },
      { locale: 'th', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/th/e1eea8b0-9903-40e3-9528-f21069655c10.png', alt: 'TH_banner_mian_1.png' },
      { locale: 'zh', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/zh/56a1cfd7-6831-4d34-a632-a0eb35dd6b4f.png', alt: 'CN_banner_mian_minish.png' },
      { locale: 'ja', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/ja/e217b839-560c-49a5-b544-10a0110ab82c.png', alt: 'JP_banner_mian_minish.png' },
      { locale: 'hi', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/hi/c0fd68d5-a0f7-45f1-9d38-a003e620ca44.png', alt: 'HI_banner_mian_minish.png' },
      { locale: 'tl', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/tl/4cd69505-5f77-49c8-a124-ec9e222a4449.png', alt: 'PH_banner_mian_minish.png' },
      { locale: 'ar', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/ar/ae6d6b20-0c2a-4cf1-82e3-4c3d81e58f55.png', alt: 'AR_banner_mian_minish.png' },
      { locale: 'ru', imageUrl: 'https://hmzwblmwusrxbyqcvtlu.supabase.co/storage/v1/object/public/kdoc-storage/event-banners/6a989ad3-c3b4-47c0-bde2-7822362e6eb3/ru/f7701842-435b-42ec-84a5-32314a972faf.png', alt: 'RU_banner_mian_1.png' },
    ],
  },
];
