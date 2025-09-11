// Public API exports for auth utilities
export { isProtectedRoute, extractLocaleFromPathname } from './protected-routes';
export { getAuthPath, getRedirectAfterLoginPath, getRedirectAfterLogoutPath } from './route-guard';
export { useAuth } from './useAuth';

// Server-only exports (import separately to avoid client-side issues)
// export { authGuard } from './auth-middleware';
