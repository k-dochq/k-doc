// Public API exports for auth utilities
export { isProtectedRoute, extractLocaleFromPathname } from './protected-routes';
export { getAuthPath, getRedirectAfterLoginPath, getRedirectAfterLogoutPath } from './route-guard';
export { authGuard } from './auth-middleware';
