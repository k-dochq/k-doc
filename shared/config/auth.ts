// 보호된 경로 설정
export const PROTECTED_ROUTES = [
  '/favorites',
  '/consultation',
] as const;

// 인증 관련 설정
export const AUTH_CONFIG = {
  authPath: '/auth/login',
  signupPath: '/auth/signup',
  redirectAfterLogin: '/',
  redirectAfterLogout: '/',
} as const;
