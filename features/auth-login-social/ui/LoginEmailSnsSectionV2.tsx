'use client';

import { type Locale } from 'shared/config';
import { type Dictionary } from 'shared/model/types';
import { useGoogleSignIn } from 'features/google-auth/model/useGoogleSignIn';
import { useAppleSignIn } from 'features/apple-auth/model/useAppleSignIn';

interface LoginEmailSnsSectionV2Props {
  lang: Locale;
  dict: Dictionary;
  redirectTo?: string;
}

export function LoginEmailSnsSectionV2({ lang, dict, redirectTo }: LoginEmailSnsSectionV2Props) {
  const { isLoading: isGoogleLoading, handleGoogleSignIn } = useGoogleSignIn({
    lang,
    dict,
    redirectTo,
  });
  const { isLoading: isAppleLoading, handleAppleSignIn } = useAppleSignIn({
    lang,
    dict,
    redirectTo,
  });

  return (
    <div className='mt-11 flex flex-col items-center gap-4'>
      <p className='text-base leading-6 font-semibold text-[#404040]'>
        {dict.auth?.login?.socialLogin || 'SNS 계정으로 로그인'}
      </p>

      <div className='flex items-start gap-10'>
        {/* Google */}
        <div className='flex flex-col items-center gap-1'>
          <button
            type='button'
            className='flex size-[54px] items-center justify-center rounded-full border border-[#e5e5e5] bg-white'
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 20 20'
              fill='none'
            >
              <g clipPath='url(#clip0_1608_30763)'>
                <path
                  d='M19.5319 10.1871C19.5319 9.36767 19.4654 8.76973 19.3215 8.14966H9.96484V11.848H15.457C15.3463 12.7671 14.7484 14.1512 13.4196 15.0813L13.401 15.2051L16.3593 17.4969L16.5643 17.5174C18.4467 15.7789 19.5319 13.221 19.5319 10.1871Z'
                  fill='#4285F4'
                />
                <path
                  d='M9.96517 19.9313C12.6559 19.9313 14.9147 19.0454 16.5646 17.5174L13.4199 15.0813C12.5784 15.6682 11.4489 16.0779 9.96517 16.0779C7.32983 16.0779 5.09311 14.3395 4.29578 11.9366L4.17891 11.9466L1.10273 14.3273L1.0625 14.4391C2.70128 17.6945 6.06746 19.9313 9.96517 19.9313Z'
                  fill='#34A853'
                />
                <path
                  d='M4.29626 11.9366C4.08588 11.3166 3.96412 10.6521 3.96412 9.96565C3.96412 9.27908 4.08588 8.61473 4.28519 7.99466L4.27962 7.8626L1.16489 5.44366L1.06298 5.49214C0.387557 6.84305 0 8.36008 0 9.96565C0 11.5712 0.387557 13.0882 1.06298 14.4391L4.29626 11.9366Z'
                  fill='#FBBC05'
                />
                <path
                  d='M9.96517 3.85336C11.8365 3.85336 13.0988 4.66168 13.8185 5.33717L16.6311 2.59107C14.9037 0.985496 12.6559 0 9.96517 0C6.06746 0 2.70128 2.23672 1.0625 5.49214L4.28471 7.99466C5.09311 5.59183 7.32983 3.85336 9.96517 3.85336Z'
                  fill='#EB4335'
                />
              </g>
              <defs>
                <clipPath id='clip0_1608_30763'>
                  <rect width='19.542' height='20' fill='white' />
                </clipPath>
              </defs>
            </svg>
          </button>
          <span className='text-sm leading-[20px] font-medium text-[#404040]'>Google</span>
        </div>

        {/* Apple */}
        <div className='flex flex-col items-center gap-1'>
          <button
            type='button'
            className='flex size-[54px] items-center justify-center rounded-full bg-[#b2b2b2]'
            onClick={handleAppleSignIn}
            disabled={isAppleLoading}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
            >
              <path
                d='M17.8523 21.5878C16.7172 22.6882 15.4778 22.5144 14.2848 21.9932C13.0222 21.4604 11.8639 21.4372 10.5319 21.9932C8.86395 22.7113 7.98365 22.5028 6.98751 21.5878C1.33502 15.7615 2.16899 6.88898 8.58596 6.56465C10.1497 6.64573 11.2385 7.42179 12.1535 7.49129C13.5203 7.2133 14.8292 6.41407 16.2886 6.51832C18.0377 6.65732 19.3581 7.3523 20.2269 8.60326C16.613 10.7693 17.4701 15.5299 20.7828 16.8619C20.1226 18.5994 19.2655 20.3252 17.8408 21.5994L17.8523 21.5878ZM12.0377 6.49516C11.8639 3.91215 13.9605 1.78088 16.3697 1.57239C16.7056 4.5608 13.6593 6.78473 12.0377 6.49516Z'
                fill='white'
              />
            </svg>
          </button>
          <span className='text-sm leading-[20px] font-medium text-[#404040]'>Apple</span>
        </div>
      </div>
    </div>
  );
}
