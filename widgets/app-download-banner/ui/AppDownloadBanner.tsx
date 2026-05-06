'use client';

import { type Dictionary } from 'shared/model/types';
import { useAppDownloadBanner } from '../model/useAppDownloadBanner';
import { AppDownloadBannerView } from './AppDownloadBannerView';

interface AppDownloadBannerProps {
  dict: Dictionary;
}

// TODO: 임시 비활성화 — 정식 오픈 시점에 아래 `return null;` 한 줄 삭제하면 다시 노출됨.
const TEMPORARILY_DISABLED = true;

export function AppDownloadBanner({ dict }: AppDownloadBannerProps) {
  const { visible, dismiss } = useAppDownloadBanner();

  if (TEMPORARILY_DISABLED) return null;

  if (!visible) return null;

  return (
    <AppDownloadBannerView
      message={dict.appDownloadBanner.message}
      cta={dict.appDownloadBanner.cta}
      closeLabel={dict.appDownloadBanner.closeLabel}
      onClose={dismiss}
    />
  );
}
