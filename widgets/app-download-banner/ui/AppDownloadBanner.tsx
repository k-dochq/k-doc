'use client';

import { type Dictionary } from 'shared/model/types';
import { useAppDownloadBanner } from '../model/useAppDownloadBanner';
import { AppDownloadBannerView } from './AppDownloadBannerView';

interface AppDownloadBannerProps {
  dict: Dictionary;
}

export function AppDownloadBanner({ dict }: AppDownloadBannerProps) {
  const { visible, dismiss } = useAppDownloadBanner();

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
