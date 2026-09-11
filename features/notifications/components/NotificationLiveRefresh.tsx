'use client';

import { useEffect } from 'react';

import { useRouter } from 'next/navigation';

type NotificationLiveRefreshProps = {
  intervalMs?: number;
};

export function NotificationLiveRefresh({ intervalMs = 20_000 }: NotificationLiveRefreshProps) {
  const router = useRouter();

  useEffect(() => {
    let lastRefreshAt = 0;

    function refresh() {
      if (document.visibilityState !== 'visible') {
        return;
      }

      const now = Date.now();

      // Focus + visibilitychange can fire almost together.
      // Avoid refreshing twice for the same event.
      if (now - lastRefreshAt < 1500) {
        return;
      }

      lastRefreshAt = now;

      router.refresh();
    }

    const interval = window.setInterval(refresh, Math.max(intervalMs, 10_000));

    window.addEventListener('focus', refresh);

    document.addEventListener('visibilitychange', refresh);

    return () => {
      window.clearInterval(interval);

      window.removeEventListener('focus', refresh);

      document.removeEventListener('visibilitychange', refresh);
    };
  }, [intervalMs, router]);

  return null;
}
