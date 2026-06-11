'use client';

import { useQuery } from '@tanstack/react-query';

export interface CmsMenuItem {
  key: string;
  label: string;
  prompt: string;
  hasSubMenu: boolean;
  faqItems: CmsFaqItem[];
}

export interface CmsFaqItem {
  id: string;
  order: number;
  title: string;
  content: string;
  showConsultButton: boolean;
  showMenuButton: boolean;
}

export interface CmsContent {
  welcome: string;
  menus: CmsMenuItem[];
  completionMessages: {
    inHours: string;
    outOfHours: string;
  };
}

async function fetchCmsContent(locale: string): Promise<CmsContent> {
  const res = await fetch(`/api/chatbot-cms?locale=${encodeURIComponent(locale)}`);
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}

export function useKdocCmsContent(locale: string) {
  return useQuery({
    queryKey: ['chatbot-cms', locale],
    queryFn: () => fetchCmsContent(locale),
    staleTime: 1000 * 60 * 5,
    retry: 2,
  });
}
