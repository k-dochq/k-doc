'use client';

import { useEffect, useState } from 'react';
import { isExpoWebView } from 'shared/lib/webview-detection';
import { isDismissedToday, setDismissedToday } from '../lib/dismissalStorage';
import { isMobilePhone } from '../lib/isMobilePhone';

export function useAppDownloadBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isExpoWebView()) return;
    if (!isMobilePhone()) return;
    if (isDismissedToday()) return;
    setVisible(true);
  }, []);

  const dismiss = () => {
    setDismissedToday();
    setVisible(false);
  };

  return { visible, dismiss };
}
