import 'server-only';
import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';

const dictionaries = {
  en: () => import('./dictionaries/en.json').then((module) => module.default),
  ko: () => import('./dictionaries/ko.json').then((module) => module.default),
  th: () => import('./dictionaries/th.json').then((module) => module.default),
  'zh-Hant': () => import('./dictionaries/zh-Hant.json').then((module) => module.default),
  ja: () => import('./dictionaries/ja.json').then((module) => module.default),
  hi: () => import('./dictionaries/hi.json').then((module) => module.default),
  tl: () => import('./dictionaries/tl.json').then((module) => module.default),
};

export const getDictionary = async (locale: Locale): Promise<Dictionary> => dictionaries[locale]();
