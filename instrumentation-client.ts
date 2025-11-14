import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: 'https://f101c7496b99171823817d3066ee4df3@o4510191631466496.ingest.de.sentry.io/4510192293249104',
  sendDefaultPii: true,
});

export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
